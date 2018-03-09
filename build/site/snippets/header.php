<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon/favicon-16x16.png">
  <link rel="manifest" href="assets/images/favicon/site.webmanifest">
  <link rel="mask-icon" href="assets/images/favicon/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="assets/images/favicon/favicon.ico">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="msapplication-config" content="assets/images/favicon/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

  <meta property="og:type" content="website" />
  <meta property="og:title" content="<?= $site->title()->html() ?>"/>
  <meta property="og:url" content="http://orkaonline.com" />
  <meta property="og:description" content="<?= $site->title()->html() ?>" />
  <meta property="og:image" content="assets/images/orka-card.jpg" />

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:creator" content="">
  <meta name="twitter:title" content="<?= $site->title()->html() ?>">
  <meta name="twitter:description" content="<?= $site->title()->html() ?>">
  <meta name="twitter:image" content="assets/images/orka-card.jpg">

  <?= css('assets/css/main.css') ?>

</head>
<body>