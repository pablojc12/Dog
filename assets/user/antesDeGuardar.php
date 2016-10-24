<?php

/**
 * funciona internamente para revisar si e correo ya esta dado de alta
 * @param correo $data
 */
function antesDeGuardar($data){
    $link = conection();
    $return = false;
    
    $query = "select correo from Cliente where correo like '$data'";
    $result = mysqli_query($link, $query);
    
    $rows = mysqli_num_rows($result);
    
    if ($rows > 0)
    {
        $return = false;
    }
    else {
        $return = true;
    }
    
    return $return;
}