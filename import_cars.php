<?php

use App\Models\Car;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
    // Extract make and model
    $modelAndPrice = $data['Car Model and Price'] ?? '';
    if (!$modelAndPrice) continue;
    
    $parts = explode(' - ', $modelAndPrice);
    $makeModel = trim($parts[0]);
    $makeModelParts = explode(' ', $makeModel, 2);
    
    $make = ucfirst(strtolower($makeModelParts[0] ?? 'Unknown'));
    $model = ucfirst(strtolower($makeModelParts[1] ?? 'Model'));

    // Extract price
    $priceStr = $data['Price Per Day'] ?? '0';
    $priceStr = str_replace(['€', ' ', ','], ['', '', '.'], $priceStr);
    $price = (float) $priceStr;
    if ($price == 0) $price = 50.0;

    $carId = $index + 1;
    $car = Car::find($carId);
    
    if (!$car) {
        $car = new Car();
        $car->id = $carId;
        $car->license_plate = strtoupper(substr($make, 0, 2)) . '-' . rand(1000, 9999) . '-' . chr(rand(65, 90));
    }
    
    $car->make = $make;
    $car->model = $model;
    $car->year = rand(2020, 2024);
    $car->price_per_day = $price;
    $car->mileage = rand(10000, 50000);
    $car->transmission = 'automatic';
    $car->seats = 5;
    $car->description = 'Premium ' . $make . ' ' . $model . ' available for rental.';
    
    $fuelIcon = strtolower($data['Fuel Type Icon'] ?? '');
    $car->fuel_type = str_contains($fuelIcon, 'diesel') ? 'diesel' : 'gasoline';
    
    $car->save();

    // Download Image
    $imageUrl = $data['Car Image'] ?? '';
    if ($imageUrl) {
        $imageContent = @file_get_contents($imageUrl);
        if ($imageContent) {
            $ext = pathinfo(parse_url($imageUrl, PHP_URL_PATH), PATHINFO_EXTENSION);
            if (!$ext || !in_array($ext, ['png', 'jpg', 'jpeg', 'webp'])) {
                $ext = 'png';
            }
            
            $filename = Str::slug($make . '_' . $model) . '.' . $ext;
            
            // Laravel default storage path for public files
            $dir = storage_path('app/public/files/car/' . $car->id . '/image');
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
            
            $filePath = $dir . '/' . $filename;
            file_put_contents($filePath, $imageContent);
            
            // Update the files table mapping
            DB::table('files')->where('fileable_id', $car->id)->where('fileable_type', Car::class)->delete();
            
            DB::table('files')->insert([
                'original_name' => Str::slug($make . '_' . $model),
                'filename' => $filename,
                'path' => 'files/car/' . $car->id . '/image/' . $filename,
                'mime_type' => 'image/' . ($ext == 'jpg' ? 'jpeg' : $ext),
                'size' => filesize($filePath),
                'collection' => 'image',
                'fileable_id' => $car->id,
                'fileable_type' => Car::class
            ]);
            
            echo "Imported: $make $model\n";
        } else {
            echo "Failed to download image for: $make $model\n";
        }
    }
}

echo "Cars imported successfully!\n";
