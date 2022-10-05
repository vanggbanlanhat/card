<?php

require_once __DIR__ . '/src/TextToImage.php';
require_once __DIR__ . '/src/Text.php';

use Kensine\TextToImage\Text;
use Kensine\TextToImage\TextToImage;

function resize_image($file, $w, $h, $crop=FALSE) {
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        $newheight = $h;
        $newwidth = $w;
    }
    $src = imagecreatefromjpeg($file);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
} 
$ho = $_POST['ho'];
$ten = $_POST['ten'];
$ngaysinh = $_POST['ngaysinh'];
$gioitinh = $_POST['gioitinh'];

$DL  = Text::from('Text!')->position(485, 219)->font(19, __DIR__ .'/fonts/Arial-Bold.ttf')->color(162,47,46,255);
$Exp = Text::from('28/22/2024')->position(500, 263)->font(19, __DIR__ .'/fonts/Arial-Bold.ttf')->color(162,47,46,255);
$lastName = Text::from($ho)->position(485, 305)->font(19, __DIR__ .'/fonts/Arial-Bold.ttf')->color(13,11,49,255);
$firstName = Text::from($ten)->position(485, 338)->font(19, __DIR__ .'/fonts/Arial-Bold.ttf')->color(13,11,49,255);
$DOB = Text::from($ngaysinh)->position(500, 430)->font(19, __DIR__ .'/fonts/Arial-Bold.ttf')->color(162,47,46,255);
$gender = Text::from($gioitinh)->position(600, 546)->font(19, __DIR__ .'/fonts/Arial-Bold.ttf')->color(13,11,49,255);

$imageText = (new TextToImage(__DIR__ . '/CARDID.jpg'))->addTexts($DL, $Exp, $lastName, $firstName, $DOB, $gender)->render();
file_put_contents('true.jpg', $imageText);

$image = imagecreatefromjpeg('true.jpg');  
$avatar = resize_image('https://www.thispersondoesnotexist.com/image', 286, 359);
$stamp = imagecreatefrompng('stamp.png');
imagecopy($image, $avatar, 153, 164, 0, 0, imagesX($avatar), imagesY($avatar));
imagecopy($image, $stamp, 360, 180, 0, 0, imagesX($stamp), imagesY($stamp));

header('Content-Type: image/jpeg');
imagejpeg($image);

imagedestroy($image);
imagedestroy($avatar);