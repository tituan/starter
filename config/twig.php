<?php

require_once 'config.php';
require_once '../vendor/autoload.php';

if (ENV == 'dev'){
  DEFINE('CACHE', false);
  DEFINE('DEBUG', true);
} else if (ENV == 'preprod'){
  DEFINE('CACHE', '../var/cache');
  DEFINE('DEBUG', false);
} else if (ENV == 'prod'){
  DEFINE('CACHE', '../var/cache');
  DEFINE('DEBUG', false);
}

$loader = new \Twig\Loader\FilesystemLoader('../templates/');
$twig = new \Twig\Environment($loader, [
  'cache' => CACHE,
  'debug' => DEBUG
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());
