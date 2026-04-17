<?php

$frontendUrl = env('FRONTEND_URL', 'http://127.0.0.1:5173');
$frontendUrlAlt = env('FRONTEND_URL_ALT', 'http://localhost:5173');

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [$frontendUrl, $frontendUrlAlt],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
