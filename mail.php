<?php
$recepient = "deonarius@gmail.com";


$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$comment = trim($_POST["comment"]);
$eol = "\n";

$header  = 'From: '.$email.$eol;
$header .= 'Reply-To: '.$email.$eol;
$header .= 'MIME-Version: 1.0'.$eol;
$header .= 'Content-Type: text/html; charset="utf-8"'.$eol;
$header .= 'X-Mailer: PHP v'.phpversion().$eol;

$pagetitle = "Review \"$sitename\"";
$message = "
Name: $name <br>
Email: $email<br>
Сomment: $comment<br>
";

mail($recepient, $pagetitle, $message, $header);
?>