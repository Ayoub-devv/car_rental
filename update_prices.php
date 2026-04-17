<?php
use App\Models\Car;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$json = file_get_contents('cars.json');
$carsData = json_decode($json, true);

if (!$carsData) {
    die("Could not parse cars.json\n");
}

foreach ($carsData as $index => $data) {
    $modelAndPrice = $data['Car Model and Price'] ?? '';
    if (!$modelAndPrice) continue;
    
    if (preg_match('/(\d+)\s*DH/i', $modelAndPrice, $matches)) {
        $price = (float) $matches[1];
        
        $carId = $index + 1;
        $car = Car::find($carId);
        
        if ($car) {
            $car->price_per_day = $price;
            $car->save();
            echo "Updated Car ID $carId price to $price DH\n";
        }
    }
}
echo "Prices updated successfully!\n";
