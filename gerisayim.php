<?php
$hedefTarih = strtotime("24 June 2023 15:00:00");
$simdikiZaman = time();
$geriSayim = $hedefTarih - $simdikiZaman;

$gunler = floor($geriSayim / (60 * 60 * 24));
$saatler = floor(($geriSayim % (60 * 60 * 24)) / (60 * 60));
$dakikalar = floor(($geriSayim % (60 * 60)) / 60);
$saniyeler = $geriSayim % 60;

$geriSayimVerisi = array(
    'gunler' => $gunler,
    'saatler' => $saatler,
    'dakikalar' => $dakikalar,
    'saniyeler' => $saniyeler
);

echo json_encode($geriSayimVerisi);
?>
