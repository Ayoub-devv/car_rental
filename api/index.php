<?php

// Suppress deprecation warnings (PHP 8.5 compatibility)
error_reporting(E_ALL & ~E_DEPRECATED);

// Forward requests to the standard Laravel index file
require __DIR__ . '/../public/index.php';
