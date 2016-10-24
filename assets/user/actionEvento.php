<?php
require_once 'conection.php';

function main()
{
    if (isset($_POST["action"])) {
        $data = array();
        $metod = $_POST["action"];
        
        switch ($metod){
            case guardar:
                $data [0] = $_POST["fechaInicio"];
                $data [1] = $_POST["fechaTermino"];
                $data [2] = $_POST["idEmpleado"] ;
                $data [3] = $_POST["idMascota"];
                $data [4] = $_POST["idServicio"];
                $data [5] = utf8_decode($_POST["comentario"]);
                $data [6] = utf8_decode($_POST["costo"]);
                break;
            case actualizar:
                $data [0] = utf8_decode($_POST["comentario"]);
                $data [1] = utf8_decode($_POST["costo"]);
                $data [2] = $_POST["fechaInicio"];
                $data [3] = $_POST["fechaTermino"];
                $data [4] = $_POST["idEmpleado"];
                $data [5] = $_POST["idMascota"];
                $data [6] = $_POST["idServicio"];
                $data [7] = $_POST["idDetalle"];
                $data [8] = $_POST["idReservacion"];
                break;
            case borrar:
                $data [0] = $_POST["idDetalle"];
                $data [1] = $_POST["idReservacion"];
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
 * Funcion para guardar la reservacion
 * @param array $data
 */
function guardar($data)
{
    $link = conection();
    $return = array("estado" => "error");
    $campRes = "fechaInicio, fechaTermino, total";
    $valRes = "'$data[0]', '$data[1]', '$data[6]'";
    
    $query = "insert into Reservacion($campRes) values($valRes)";
    mysqli_query($link, $query);
    
    if(mysqli_affected_rows($link))
    {
        $id = mysqli_insert_id($link);
        mysqli_close($link);
        $return["estado"] = insertDetalle($data, $id);
    }
    else
    {
        $return["estado"] = "noGuardado";
    }
    return $return;
}

/**
 * Funcion para insertar el detalle de la reservacion
 * @param type $data
 */
function insertDetalle($data, $id) {
    $link = conection();

    $campDet = "comentario, idEmpleado, idServicio, idReservacion, idMascota";
    $valDet = "'$data[5]', '$data[2]', '$data[4]', '$id', '$data[3]'";

    $query = "insert into Detalle($campDet) values($valDet)";
    mysqli_query($link, $query);

    if (mysqli_affected_rows($link)) {
            mysqli_close($link);
         return  "guardado";
    } else {
        return  "noGuardado";
    }
    
}

/**
 * Funcion para hacer el borrado de la reservacion y detalle de la reservacion
 * @param array $data
 * @return string
 */
function borrar($data)
{
    $link = conection();
    $return = array("estado" => "error");
    
    $query = "delete from Detalle where idDetalle = '$data[0]'";
    mysqli_query($link, $query);
    
    if(mysqli_affected_rows($link) > 0)
    {
        mysqli_close($link);
        $link = conection();
        
        $query = "delete from Reservacion where idReservacion = '$data[1]'";
        mysqli_query($link, $query);
        
        if (mysqli_affected_rows($link) > 0) {
            $return["estado"] = "borrado";
        } else {
            $return["estado"] = "error";
        }
    }else{
        $return["estado"] = "error";
    }
    
    mysqli_close($link);
    
    return $return;
}

/**
 * Funcion para hacer la actualizacion 
 * @param array $data
 */
function actualizar($data)
{
    $link = conection();
    $link2 = conection();
    $return = array("estado" => "error");
    $campRes = "fechaInicio = '$data[2]', fechaTermino = '$data[3]', total = '$data[1]'";
    $campDet = "comentario = '$data[0]', idEmpleado = '$data[4]', idServicio = '$data[6]', idReservacion = '$data[8]', idMascota = '$data[5]'";
    
    $queryRes = "update Reservacion set $campRes where idReservacion = '$data[8]'";
    $queryDet = "update Detalle set $campDet where idDetalle = '$data[7]'";
    
    mysqli_query($link, $queryRes);
    $resultRes = mysqli_affected_rows($link);
    mysqli_close($link);
    
    mysqli_query($link2, $queryDet);
    $resultDet = mysqli_affected_rows($link2);
    mysqli_close($link2);
    
    if($resultRes > 0 || $resultDet > 0)
    {
        $return["estado"] = "actualizado";
    }else{
        $return["estado"] = "noGuardado";
    }
    
    return $return;
}
