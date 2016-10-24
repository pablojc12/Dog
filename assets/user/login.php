<?php
require_once 'conection.php';

function main()
{
    $return = array("estado" => "ninguno");
    $data = array();
    
    $data[0] = $_POST["correo"];
    $data[1] = $_POST["contrasena"];
    
    $respuesta = buscaUsuario($data);
    
    if ($respuesta["estado"] === "registrado") {
        if ($data[0] === $respuesta["correo"]) {
            if ($data[1] === $respuesta["contrasena"]) {
                $_SESSION["tokenSession"] = $respuesta["sesion"];
                $return["estado"] = "registrado";
            } else {
                $_SESSION["tokenSession"] = null;
            }
        } else {
            $_SESSION["tokenSession"] = null;
        }
    } else {
        $return["estado"] = "ninguno";
        $_SESSION["tokenSession"] = null;
    }

    return $return;
}

/**
 * Funcion para hacer la busqueda por correo
 * @param type $data
 * @return string
 */
function buscaUsuario($data)
{
    $link = conection();
    $array = null;
    $parseUTF8 = array();
    
    $query = "select * from Cliente where correo like '$data[0]'";
    $result = mysqli_query($link, $query);
    
    if(!$result)
    {
        var_dump( $parseUTF8["estado"] = "ninguno");
    }
    else 
    {
        $array = mysqli_fetch_assoc($result);
        
        $parseUTF8 = ["estado" => "registrado",
                      "correo" => utf8_encode($array["correo"]),
                      "contrasena" => utf8_encode($array["contrasena"]),
                      "sesion" => utf8_encode($array["sesion"])];
    
    }
    
    return $parseUTF8;
}