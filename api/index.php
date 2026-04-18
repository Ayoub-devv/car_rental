<?php

// Suppress deprecation warnings (PHP 8.5 compatibility)
error_reporting(E_ALL & ~E_DEPRECATED);

// Force debug mode to see the real error
$_ENV['APP_DEBUG'] = 'true';
putenv('APP_DEBUG=true');

// Handle Vercel's Read-Only Filesystem
$_ENV['APP_STORAGE'] = '/tmp/storage';
$_ENV['LOG_CHANNEL'] = 'stderr';
$_ENV['CACHE_STORE'] = 'array';
$_ENV['SESSION_DRIVER'] = 'cookie';
$_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';
$_ENV['DATA_CACHE_PATH'] = '/tmp/storage/framework/cache';

// Ensure the necessary directories exist in /tmp
if (!is_dir('/tmp/storage/framework/views')) {
    mkdir('/tmp/storage/framework/views', 0755, true);
}

// Forward requests to the standard Laravel index file
require __DIR__ . '/../public/index.php';
