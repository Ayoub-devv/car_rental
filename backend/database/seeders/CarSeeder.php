<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;
use RuntimeException;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $catalogPath = database_path('data/cars-source.json');

        if (! file_exists($catalogPath)) {
            throw new RuntimeException('The car source catalog could not be found.');
        }

        $rows = json_decode((string) file_get_contents($catalogPath), true, flags: JSON_THROW_ON_ERROR);

        foreach ($rows as $row) {
            $name = $this->extractName($row['Car Model and Price'] ?? '');
            $price = $this->extractPricePerDay($row['Car Model and Price'] ?? '', $row['Price Per Day'] ?? '');

            if ($name === '' || $price === null) {
                continue;
            }

            Car::query()->updateOrCreate(
                ['name' => $name],
                ['price_per_day' => $price],
            );
        }
    }

    private function extractName(string $value): string
    {
        $name = preg_replace('/\s*-\s*A\s+PARTIR.*$/iu', '', $value) ?? '';

        return trim(preg_replace('/\s+/', ' ', $name) ?? '');
    }

    private function extractPricePerDay(string $headline, string $fallback): ?float
    {
        if (preg_match('/(\d+(?:[.,]\d+)?)\s*DH/iu', $headline, $matches) === 1) {
            return (float) str_replace(',', '.', $matches[1]);
        }

        if (preg_match('/(\d+(?:[.,]\d+)?)/', $fallback, $matches) === 1) {
            return (float) str_replace(',', '.', $matches[1]);
        }

        return null;
    }
}
