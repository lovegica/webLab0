<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <?php
    $lines=file("courses.tsv");
    $size=filesize("courses.tsv");
    ?>
    <p>
        Course list has <?= sizeof($lines)?> total courses
        and
        size of <?= $size?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
            $numberOfCourses = 3;
            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
                $temp = $listOfCourses;
                shuffle($temp);
                $resultArray=array_slice($temp,0,$numberOfCourses);
                return $resultArray;
            }
            if(isset($_GET["number_Of_Courses"]))
                $numberOfCourses=$_GET["number_Of_Courses"];
            if(isset($numberOfCourses)){
                if($numberOfCourses=="")
                    $numberOfCourses=3;
            } 
            $todaysCourses=getCoursesByNumber($lines,$numberOfCourses);  
          ?>

        <ol>
            <?php 
            foreach($todaysCourses as $todays){
                $temp=explode("\t",$todays);
                ?>
                <li><?=$temp[0]." - ".$temp[1]?></li>
            <?php
            } 
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
            $startCharacter='C';
            function getCoursesByCharacter($listOfCourses, $startCharacter){
                $resultArray = array();
                foreach($listOfCourses as $list){
                    $temp=explode("\t",$list);
                    $word=$temp[0];
                    if($word[0]==$startCharacter){
                        array_push($resultArray, $list);
                    }
                }
                return $resultArray;
            }

            if(isset($_GET["character"]))
                $startCharacter=$_GET["character"];

            if(isset($startCharacter)){
                if($startCharacter=="")
                    $startCharacter='C';
                
            }
            $searchedCourses=getCoursesByCharacter($lines, $startCharacter);
        ?>
        <p>
            Words that started by <strong>'<?=$startCharacter?>'</strong> are followings :
        </p>
        <ol>
            <?php
                foreach($searchedCourses as $search){
                    $temp=explode("\t",$search);
                    ?>
                    <li><?=$temp[0]." - ".$temp[1]?></li>
                <?php
                }
                ?>
        </ol>


    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
         <?php
            $orderby=0;
            // $alphabet = "alphabet order";
            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = $listOfCourses;
                if($orderby==0){
                    sort($resultArray);
                }
                else if($orderby==1){
                    rsort($resultArray);
                }
                return $resultArray;
            }


            if(isset($_GET["orderby"])){
                $orderby=$_GET["orderby"];
                }
            else if(isset($_GET["orderby"])==""){
                $orderby=0;
            }
            else 
                $orderby=0;

            $orderedCourses=getCoursesByOrder($lines,$orderby);
        ?>
        <p>
            All of Courses ordered by <strong>'<?=$orderby==0?"alphabet order":"alphabet reverse order" ?>'</strong> are followings :
        </p>
        <ol>
            <?php
                foreach($orderedCourses as $l){
                    $temp=explode("\t",$l);
                    if(strlen($temp[0])>20){
                        ?>
                    <li class="long"><?=$temp[0]." - ".$temp[1]?></li>
                    <?php
                    }
                    else{
                        ?>
                        <li><?=$temp[0]." - ".$temp[1]?></li>
                    <?php
                    }
                    ?>
                
            <?php
                }
            ?>  
            
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
        <?php
        if(isset($_GET["new_course"])&&isset($_GET["code_of_course"])){
            $newCourse=$_GET["new_course"];
            $codeOfCourse=$_GET["code_of_course"];
        }
        if(isset($newCourse)&&isset($codeOfCourse)){
        ?>    
        <p>Adding a course is success!</p>
        <?php
        }
        else{
        ?>
        <p>Input course or meaning of the course doesn't exist.</p>
        <?php
        }
        ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>
