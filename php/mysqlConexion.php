<?php
    function mysql_proyecto(){
        $connection = new mysqli("localhost", "root", "", "proyecto") or die('Error al conectar'. mysqli_errno($connect));
        $connection ->set_charset("utf8");
        $connection->autocommit(FALSE);
        return $connection;
    }
?>