<?php

// Suppress deprecation warnings (PHP 8.5 compatibility)
error_reporting(E_ALL & ~E_DEPRECATED);

// Force debug mode to see the real error
$_ENV['APP_DEBUG'] = 'true';
putenv('APP_DEBUG=true');

// Forward requests to the standard Laravel index file
require __DIR__ . '/../public/index.php';
