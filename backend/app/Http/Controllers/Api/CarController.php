<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\JsonResponse;

class CarController extends Controller
{
    public function index(): JsonResponse
    {
        $cars = Car::query()
            ->orderBy('price_per_day')
            ->orderBy('name')
            ->get()
            ->map(fn (Car $car): array => $this->transformCar($car));

        return response()->json([
            'cars' => $cars,
        ]);
    }

    public function show(Car $car): JsonResponse
    {
        $car->load([
            'reservations' => fn ($query) => $query
                ->active()
                ->orderBy('start_date'),
        ]);

        return response()->json([
            'car' => [
                ...$this->transformCar($car),
                'booked_ranges' => $car->reservations->map(fn ($reservation): array => [
                    'start_date' => $reservation->start_date->toDateString(),
                    'end_date' => $reservation->end_date->toDateString(),
                    'status' => $reservation->status,
                ])->values(),
            ],
        ]);
    }

    private function transformCar(Car $car): array
    {
        return [
            'id' => $car->id,
            'name' => $car->name,
            'price_per_day' => (float) $car->price_per_day,
        ];
    }
}
