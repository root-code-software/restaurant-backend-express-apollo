<?php
       //Reseteamos variables a 0.
       $nombre = $email = $subject = $mensaje = $para = NULL;

       if (isset($_POST['submit'])) {

          //Obtenemos valores input formulario
          $nombre   = $_POST['name'];
          $apellido = $_POST['lastname'];
          $email    = $_POST['email'];
          $para     = 'leonardonosx@gmail.com';


          //Compones nuestro correo electronico

          //Incluimos libreria PHPmailer (deberas descargarlo).
          require'class.phpmailer.php';

          //Nuevo correo electronico.
          $mail = new PHPMailer;
          //Caracteres.
          $mail->CharSet = 'UTF-8';

          //De dirección correo electrónico y el nombre
         $mail->From = "leonardonosx@gmail.com";
          $mail->FromName = "https://www.cookinat.com/";

          //Dirección de envio y nombre.
          $mail->addAddress($para, $nombre);
          //Dirección a la que responderá destinatario.
          $mail->addReplyTo("hello@cookinat.com","Agustin");

          //BCC ->  incluir copia oculta de email enviado.
          //$mail->addBCC("copia@tudominio.com");

          //Enviar codigo HTML o texto plano.
          $mail->isHTML(true);

          //Titulo email.
          $mail->Subject = "Lead formulario de contacto";
          //Cuerpo email con HTML.
          $mail->Body = "
                  Nombre: $nombre<br /> 
                  Apellido: $apellido<br/>
                  Email: $email <br />
                  Asunto: $subject <br />

          "; 

        //Comprobamos el envio.
        if(!$mail->send()) {                   
            echo "<script language='javascript'>
                alert('fallado');
             </script>";
        } else {
            echo "<script language='javascript'>
                alert('Mensaje enviado, muchas gracias.');
             </script>";
        } 
      }
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cookinat</title>
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/main.css">
  <link rel="stylesheet" href="./css/component.css">
  <!-- Global site tag (gtag.js) - Google Analytics --> <script async src="https://www.googletagmanager.com/gtag/js?id=G-RKFNKCCDCY"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(&apos;js&apos;, new Date()); gtag(&apos;config&apos;, &apos;G-RKFNKCCDCY&apos;); </script>
  <!-- Mediun API -->
  <script href="https://medium.com/m/oauth/authorize?client_id={{2efbd141a95be2de8c57ecc6cea7d31190f73e8a96cadcee79da9ff7f4e758246}}"></script>
</head>

<body>
<div class="page-wrap page-home">
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">
          <img src="./assets/images/logo.svg">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li class="nav-item nav-link active"><a href="./index.html">Diner <span class="sr-only">(current)</span></a></li>
            <li class="nav-item nav-link"><a href="./chef.html">Chef</a></li>
            <li class="nav-item nav-link"><a href="blog.html">Blog</a></li>
            <li class="nav-item nav-link"><a class="btn-default" href="#">Download App</a></li>
          </ul>
        </ul>
      </nav>
    </div>
  </header>
   <section class="banner">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 text-center" style="width: 100%;">
           <h2 style="font-size: 40px;font-weight: 200;margin-bottom: 50px;">  Thank you soon you will be contacted by our team </h2>
        </div>
        <div class="col-md-12 order-md-1 text-center">
          <img src="./assets/images/Chef.png" class="dinning-bg" style="width: 30%;margin: 0 auto;"/>
        </div>
        
      </div>
    </div>
  </section>
  
  <footer>
    <div class="footer-content">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <a href="#" class="footer-logo"><img src="./assets/images/logo.svg"></a>
            <div class="promotion">
              <form id="promotion-form" action="procesar_email.php" method="post">
                <p class="form-desc">Receive awesome promotions!</p>
                <div class="input-group">
                  <input type="email" name="email" placeholder="Your email" required>
                  <button type="submit" class="btn btn-submit">Send</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-3 offset-md-1">
            <ul>
              <li><a href="diner.html">Diners</a></li>
              <li><a href="chef.html">Chefs</a></li>
              <li><a href="blog.html">Blog</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="help.html">Help</a></li>
              <li><a href="termsandconditions.html">Terms & Conditions</a></li>
              <li>
                <div class="social-group">
                  <a href="#"><i class="fa fa-linkedin"></i></a>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                  <a href="#"><i class="fa fa-instagram"></i></a>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                  <a href="#"><i class="fa fa-youtube-play"></i></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

   <div class="container">
      <div class="footer-copyright text-center">All rights reserved. Copyright Cookinat 2019.</div>
    </div>
  </footer>
</div>

<!-- jQuery, Popper.js Bootstrap.js -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    crossorigin="anonymous"></script>
</body>
</html>
