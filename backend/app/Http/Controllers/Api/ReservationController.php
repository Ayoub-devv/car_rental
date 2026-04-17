<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Models\Car;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function store(StoreReservationRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $startDate = Carbon::parse($validated['start_date'])->startOfDay();
        $endDate = Carbon::parse($validated['end_date'])->startOfDay();

        $reservation = DB::transaction(function () use ($validated, $startDate, $endDate) {
            $car = Car::query()
                ->lockForUpdate()
                ->findOrFail($validated['car_id']);

            $hasOverlap = $car->reservations()
                ->lockForUpdate()
                ->active()
                ->overlapping($startDate->toDateString(), $endDate->toDateString())
                ->exists();

            if ($hasOverlap) {
                throw ValidationException::withMessages([
                    'dates' => ['The selected dates are not available for this car.'],
                ]);
            }

            $numberOfDays = $startDate->diffInDays($endDate) + 1;

            return Reservation::query()->create([
                'car_id' => $car->id,
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
                'total_price' => $numberOfDays * (float) $car->price_per_day,
                'status' => Reservation::STATUS_PENDING,
            ]);
        });

        $reservation->load('car');

        return response()->json([
            'message' => 'Reservation created successfully.',
            'reservation' => $this->transformReservation($reservation),
        ], 201);
    }

    private function transformReservation(Reservation $reservation): array
    {
        return [
            'id' => $reservation->id,
            'customer_name' => $reservation->customer_name,
            'customer_phone' => $reservation->customer_phone,
            'start_date' => $reservation->start_date->toDateString(),
            'end_date' => $reservation->end_date->toDateString(),
            'total_price' => (float) $reservation->total_price,
            'status' => $reservation->status,
            'car' => [
                'id' => $reservation->car->id,
                'name' => $reservation->car->name,
                'price_per_day' => (float) $reservation->car->price_per_day,
            ],
        ];
    }
}
