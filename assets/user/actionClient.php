<?php
require_once 'conection.php';
require_once 'antesDeGuardar.php';

function main()
{
    if (isset($_POST["action"])) {
        $data = array();
        $metod = $_POST["action"];
        
        switch ($metod){
            case guardar:
                $data [0] = $_POST["contrasena"];
                $data [1] = $_POST["correo"];
                $data [2] = md5(sha1($data [1]));
            
                if(!antesDeGuardar($data[1]))
                {
                    return array("estado" => "registrado");
                }
                break;
            case actualizar:
                $data [0] = $_POST["nombre"];
                $data [1] = $_POST["apellidosCl"];
                $data [2] = $_POST["fNacimiento"];
                $data [3] = $_SESSION["tokenIDUser"];;
                break;
            default :
                return array("estado" => "error");
        } 
        return $metod($data);
        
    } else {
        return array("estado" => "error");
    }
}

/**
 * Funcion para guardar el usuario antes del registro final
 * @param array $data
 * @return string
 */
function guardar($data){
    $link = conection();
    $return = array("estado" => "error");
    
    $camp = "correo, contrasena, sesion";
    $val = "'$data[1]', '$data[0]', '$data[2]'";
    
    $query = "insert into Cliente($camp) values($val)";
    mysqli_query($link, $query);
    
    if(mysqli_affected_rows($link) > 0)
    {
        $return["estado"] = "guardado";
    }
    else{
        $return["estado"] = "noGuardado";
    }
    
    return $return;
}

/**
 * funcion para guardad al usuario cuando complete su registro
 * @param type $data
 * @return string
 */
function actualizar($data){
    $link = conection();
    $return = array("estado" => "error");
    $camp = "nombreCl = '$data[0]', apellidosCl = '$data[1]', fn = '$data[2]'";
    
    $query = "update Cliente set $camp where idCliente like '$data[3]'";
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
