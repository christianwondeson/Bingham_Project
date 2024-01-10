<?php
  session_start();
  include('admin/vendor/inc/config.php');
  //include('vendor/inc/checklogin.php');
  //check_login();
  //$aid=$_SESSION['a_id'];
?>
<!DOCTYPE html>
<html lang="en">
<!--Head-->
<?php include("vendor/inc/head.php");?>

<body>

    <!-- Navigation -->
    <?php include("vendor/inc/nav.php");?>
    <!--End Navigation-->

    <header>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

            <div class="carousel-inner" role="listbox">
                <!-- Slide One - Set the background image for this slide in the line below -->
                <div class="carousel-item active"
                    style="background-image: url('vendor/img/2019_honda_accord_angularfront.jpg')">
                </div>
                <!-- Slide Two - Set the background image for this slide in the line below -->
                <div class="carousel-item" style="background-image: url('vendor/img/buscch.jpg')">
                </div>
                <!-- Slide Three - Set the background image for this slide in the line below -->
                <div class="carousel-item" style="background-image: url('vendor/img/Subaru_Legacy_Premium_2022_2.jpg')">
                </div>

            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
    </header>

    <!-- Page Content -->
    <div class="container">

        <h1 class="my-4">Welcome to Bingham Vehicle Booking System</h1>

        <!-- Marketing Icons Section -->
        <div class="row">
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <h4 class="card-header">Why Us</h4>
                    <div class="card-body">
                        <p class="card-text">Welcome to Bingham Academy's Vehicle Booking System! Our streamlined and
                            reliable system is your go-to solution for hassle-free transportation. At Bingham, we
                            prioritize your safety and convenience, offering a user-friendly platform that allows you to
                            effortlessly book well-maintained vehicles tailored to your needs.</p>
                    </div>

                </div>
            </div>
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <h4 class="card-header">Core Values</h4>
                    <div class="card-body">
                        <p class="card-text">
                            Our commitment to excellence extends beyond the classroom, ensuring transparent pricing,
                            24/7 support, and a worry-free experience. Trust Bingham Academy's Vehicle Booking System
                            for a seamless journey, letting you focus on what truly matters – the educational adventures
                            that lie ahead.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.row -->
        <hr>
        <!-- Portfolio Section -->
        <h2 class="center">Most Booked Vehicles</h2>
        <!--Portfolio Section -->
        <hr>
        <div class="row">
            <div class="col-lg-4 col-sm-6 portfolio-item">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src="vendor/img/Nissan_Rogue_SV_2021.jpg" alt=""></a>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 portfolio-item">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src="vendor/img/2019_honda_accord_angularfront.jpg"
                            alt=""></a>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 portfolio-item">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src="vendor/img/Subaru_Legacy_Premium_2022_2.jpg" alt=""></a>
                </div>
            </div>

        </div>
        <!-- /.row -->


    </div>
    <!-- /.container -->
    <?php include("vendor/inc/footer.php");?>
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


</body>

</html>