<?php
require_once 'conection.php';

function main()
{
    if (isset($_POST["action"])) {
        $data = array();
        $metod = $_POST["action"];
        
        switch ($metod){
            case guardar:
                $data [0] = utf8_decode($_POST["nombreMa"]);
                $data [1] = $_POST["idRaza"];
                $data [2] = $_SESSION["tokenIDUser"];
                break;
            case actualizar:
                $data [0] = utf8_decode($_POST["nombreMa"]);
                $data [1] = $_POST["idRaza"];
                $data [2] = $_SESSION["tokenIDUser"];
                $data [3] = $_POST["id"];
                break;
            case borrar:
                $data [0] = $_POST["idMascota"];
                break;
            default :
                return ["estado" => "error"];
        } 
        return $metod($data);
        
    } else {
        return array("estado" => "error");
    }
}
/**
 * Funcion para guardar una mascota
 * @param array $data
 * @return string
 */
function guardar($data)
{
    $link = conection();
    $return = array("estado" => "error");
    $camp = "nombreMa, idRaza, idCliente";
    $val = "'$data[0]', '$data[1]', '$data[2]'";  
    
    $query = "insert into Mascota($camp) values($val)";
    mysqli_query($link, $query);
    
    if(mysqli_affected_rows($link) > 0)
    {
        $return["estado"] = "guardado";
    }
    else{
        $return["estado"] = "noGuardado";
    }
    
    mysqli_close($link);
    return $return;
}
/**
 * Funcion para actualizar los datos de la mascota
 * @param array $data
 * @return string
 */
function actualizar($data)
{
    $link = conection();
    $return = array("estado" => "error");
    $camp = "nombreMa = '$data[0]', idRaza = '$data[1]', idCliente = '$data[2]'";
    
    $query = "update Mascota set $camp where idMascota like '$data[3]'";
    mysqli_query($link, $query);

    
    if(mysqli_affected_rows($link) > 0)
    {
        $return["estado"] = "actualizado";
    }
    else{
        $return["estado"] = "noGuardado";
    }
    
    mysqli_close($link);
    return $return;
}

/**
 * Funcion para eliminar una mascota
 * @param array $data posicion 0 es el id
 * @return string
 */
function borrar($data) {
    $link = conection();
    $return = array("estado" => "error");
    $idArchivo = extraeIdArchivo($data[0]);
    
    if($idArchivo !== null && $idArchivo !== "")
    {
        extraeFotoYBorra($idArchivo);
    }
    
    $query = "delete from Mascota where idMascota like '$data[0]'";
    
    if (checkEvent($data[0])) {
        mysqli_query($link, $query);

        if (mysqli_affected_rows($link) > 0) {
            $return["estado"] = "borrado";
        } else {
            $return["estado"] = "error";
        }
    } else {
        $return["estado"] = "evento";
    }
    
    mysqli_close($link);
    return $return;
}

/**
 * Funcion para comprobar si existen eventos pendientes antes de borrar la mascota
 * Si existen eventos retorna false
 * De lo contrario retorna true 
 * @param String $idMascota
 * @return boolean
 */
function checkEvent($idMascota)
{
    $query = "select * from Detalle where idMascota = '$idMascota'";
    $result = mysqli_query(conection(), $query);
    
    $rows = mysqli_num_rows($result);
    
    if ($rows > 0) {
        return false;
    } else {
        return true;
    }
}

/**
 * Funcion para extraer el id del archivo para su eliminacion
 * @param type $idMascota
 * @return type
 */
function extraeIdArchivo($idMascota)
{
    $link = conection();
    $query = "select * from Mascota where idMascota = '$idMascota'";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_fetch_assoc($result);
    mysqli_close($link);
    return $array["idArchivo"];
}

/**
 * Funcion para extraer la ubicacion de la foto y la borra fisicamente
 * @param String $idArchivo
 * @return array
 */
function extraeFotoYBorra($idArchivo)
{
    $link = conection();
    $query = "select * from Archivo where idArchivo = '$idArchivo'";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_fetch_assoc($result);
    mysqli_close($link);
    $ubicacion = "../../".$array["foto"];
    
    if(file_exists($ubicacion))
    {
        unlink($ubicacion);
    }
}