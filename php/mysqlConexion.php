<?php
    function mysql_clientes(){
        $connection = new mysqli("localhost", "root", "", "proyecto");
        $connection ->set_charset("utf8");
        $connection->autocommit(FALSE);
        return $connection;
    }
?>