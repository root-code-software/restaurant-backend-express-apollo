<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
            <li class="nav-item nav-link"><a href="./index.html">Diner</a></li>
            <li class="nav-item nav-link active"><a href="./chef.html">Chef<span class="sr-only">(current)</span></a></li>
            <li class="nav-item nav-link"><a href="blog.html">Blog</a></li>
            <li class="nav-item nav-link"><a class="btn-primary" href="#">Download App</a></li>
          </ul>
        </ul>
      </nav>
    </div>
  </header>

  <section class="banner">
    <div class="container">
      <div class="row">
        <div class="col-md-6 order-md-2 text-center">
          <img src="./assets/images/chef-banner-bg.svg" class="banner-bg"/>
        </div>
        <div class="col-md-6 order-md-1">
          <h2>Today we present,</h2>
          <p>
            <h3>A new way to showcase your talent! At Cookinat, we'll connect you with diners interested in your menus so you can work on your schedule and choose your price range.</h3>
          </p>
          <div class="btn-group">
            <a href="#" class="btn-appstore-link"><img src="./assets/images/btn-app-store.png"/></a>
            <a href="#" class="btn-appstore-link"><img src="./assets/images/btn-google-play.png"/></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="intro-work content-block">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="video-container">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/tgbNymZ7vqY" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <div class="col-md-6 v-center">
          <h2 class="txt-heading-1">How it works</h2>
          <p class="txt-paragraph-1">Just download the app, tell us more about yourself, create a menu and set your price range.</p>
          <a class="btn-primary">Download App</a>
        </div>
      </div>
    </div>
  </section>

  <section class="intro-func content-block">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
           <img src="./assets/images/icon-style.svg">
           <h5 class="txt-heading-3">Create a menu</h5>
           <p class="txt-paragraph-1">Set a list of dishes you can prepare for your guests and its prices.</p>
        </div>
        <div class="col-md-4">
            <img src="./assets/images/icon-style.svg">
            <h5 class="txt-heading-3">Receive a reservation</h5>
            <p class="txt-paragraph-1">Get a reservation request -including date and number of diners- that you can either accept or reject.</p>
         </div>
         <div class="col-md-4">
            <img src="./assets/images/icon-style.svg">
            <h5 class="txt-heading-3">Confirm & Get ready</h5>
            <p class="txt-paragraph-1">You're all set! Manage your payments through the app and prep everything for the reservation.</p>
         </div>
      </div>
    </div>
  </section>

  <section class="intro content-block">
    <div class="container">
      <div class="row">
        <div class="col-md-3 text-center">
          <img src="./assets/images/screen4_chef.png">
        </div>
        <div class="col-md-3 text-bottom">
          <h2 class="txt-heading-1">As easy as it gets!</h2>
          <p class="txt-paragraph-1">You're all set! Manage your payments through the app and prep everything for the reservation.</p>
          <a href="#" class="txt-link-1">Get started!</a>
        </div>
        <div class="col-md-3 text-center">
          <img src="./assets/images/chef-screen1.png">
        </div>
        <div class="col-md-3">
          <h2 class="txt-heading-1">Still got questions?</h2>
          <p class="txt-paragraph-1">Use our in-app chat feature to talk with your guests about supplies, logistics or any other inquiry you got.</p>
          <a href="#" class="txt-link-1">Get started!</a>
        </div>
      </div>
    </div>
  </section>

  <section class="intro-book">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <img src="./assets/images/chef-screen2.svg">
        </div>
        <div class="col-md-7 v-center">
          <h2 class="txt-heading-1">Show your especiality and earn money</h2>
          <p class="txt-paragraph-1">At Cookinat, we believe in empowering our local talent, that's why we want you to have the possibility to show your skills whenever, wherever and however you want (and still get fairly paid for it!).</p>
        </div>
      </div>
    </div>
  </section>

  <section class="download">
    <div class="container">
      <div class="row">
        <div class="col-md-6 v-center">
          <h2 class="txt-heading-1">Ready for your guests?</h2>
          <p class="txt-paragraph-1">
            Download Cookinat and start a career as a private chef. The app is available for Android and iOS.
          </p>
          <a href="#" class="btn-primary">Download App</a>
        </div>
        <div class="col-md-6">
          <img src="./assets//images/screen3.png">
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
                  <a href="https://www.linkedin.com/company/cookinat/" target="_blank"><i class="fa fa-linkedin"></i></a>
                  <a href="https://twitter.com/Cookinat_Inc" target="_blank"><i class="fa fa-twitter"></i></a>
                  <a href="https://www.instagram.com/cookinat/" target="_blank"><i class="fa fa-instagram"></i></a>
                  <a href="https://www.facebook.com/cookinat/" target="_blank"><i class="fa fa-facebook"></i></a>
                  <a href="https://www.youtube.com/channel/UCrJeAeLvf5HR-l-ZWZX_g_g" target="_blank"><i class="fa fa-youtube-play"></i></a>
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
