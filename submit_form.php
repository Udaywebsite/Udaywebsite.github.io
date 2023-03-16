<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if (!empty($name) && !empty($email) && !empty($message)) {
        $name = filter_var($name, FILTER_SANITIZE_STRING);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $message = filter_var($message, FILTER_SANITIZE_STRING);

        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Replace with your mail server
            $mail->SMTPAuth = true;
            $mail->Username = 'UdayAlbataineh1@gmail.com'; // Replace with your email username
            $mail->Password = 'pjANDluna!!'; // Replace with your email password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom($email, $name);
            $mail->addAddress('UdayAlbataineh1@gmail.com', 'Uday Albataineh'); // Replace with your email address and name

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Contact Form Submission';
            $mail->Body    = nl2br($message);

            $mail->send();
            echo 'Email sent successfully!';
        } catch (Exception $e) {
            echo "Error: Email not sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo 'Error: All fields are required.';
    }
} else {
    echo 'Error: Invalid form submission.';
}
?>

