<hr>
<h1 class="my-4">Client Testimonials</h1>

<div class="row">
    <?php

      $ret="SELECT * FROM tms_feedback where f_status ='Published' ORDER BY RAND() LIMIT 3 "; //get all feedbacks
      $stmt= $mysqli->prepare($ret) ;
      $stmt->execute() ;//ok
      $res=$stmt->get_result();
      $cnt=1;
      while($row=$res->fetch_object())
    {
    ?>
    <div class="col-lg-6 mb-4">
        <div class="card h-100">
            <h4 class="card-header"><?php echo $row->f_uname;?></h4>
            <div class="card-body">
                <p class="card-text"><?php echo $row->f_content;?></p>
            </div>
        </div>
    </div>
    <?php }?>
</div>


<!-- <td><?php echo $row->v_driver;?></td> -->