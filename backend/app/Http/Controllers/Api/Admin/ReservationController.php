<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateReservationStatusRequest;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;

class ReservationController extends Controller
{
    public function index(): JsonResponse
    {
        $reservations = Reservation::query()
            ->with('car')
            ->latest()
            ->get()
            ->map(fn (Reservation $reservation): array => $this->transformReservation($reservation));

        return response()->json([
            'statuses' => Reservation::STATUSES,
            'reservations' => $reservations,
        ]);
    }

    public function updateStatus(
        UpdateReservationStatusRequest $request,
        Reservation $reservation
    ): JsonResponse {
        $reservation->update([
            'status' => $request->validated('status'),
        ]);

        $reservation->load('car');

        return response()->json([
            'message' => 'Reservation status updated successfully.',
            'reservation' => $this->transformReservation($reservation),
        ]);
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
