<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'conection.php';

function main()
{
    $data = array();
    
    $data[0] = $_POST["imagenVieja"];
    $data[1] = $_POST["imagenNueva"];
    $data[2] = $_POST["tabla"];
    $data[3] = null; // se cargara con el id dependiendo de la tabla
    $data[4] = null; // se cargara con el id de la imagen si es que no es nueva
    $data[5] = "images/upload/";

    if  ($data[2] === "usuario") 
    {
        $data[3] = $_SESSION["tokenIDUser"];
        if ($data[0] === "sin foto") 
        {
            return guardarFotoUsuario($data);
        } 
        else {
            $data[4] = extraeIdFoto($data[3], $data[2]);
            return actualizaFoto($data);
        }
    }
    else
    {
        $data[3] = $_POST["id"];
        if ($data[0] === "sin foto") 
        {
            return guardarFotoMascota($data);
        } 
        else {
            $data[4] = extraeIdFoto($data[3], $data[2]);
            return actualizaFoto($data);
        }
    }
}

/**
 * Funcion para guardar la foto de la mascota
 * @param array $data
 * @return array
 */
function guardarFotoMascota($data) 
{
    $link = conection();
    $return = null;
    
    $camp = "foto";
    $val = "'$data[5]$data[1]'";
    $idArchivo = null;
    
    $query = "insert into Archivo($camp) values($val)";
    mysqli_query($link, $query);
    
    if(mysqli_affected_rows($link) > 0)
    {
        $idArchivo = mysqli_insert_id($link);
        mysqli_close($link);
        $return["estado"] = guardaIdArchivoMas($idArchivo, $data[3]);
    }
    else{
        $return["estado"] = "noGuardado";
    }
    
    return $return;
}

/**
 * Funcion para guardar la foto de usuario
 * @param type $data
 * @return string
 */
function guardarFotoUsuario($data)
{
    $link = conection();
    $return = null;
    
    $camp = "foto";
    $val = "'$data[5]$data[1]'";
    $idArchivo = null;
    
    $query = "insert into Archivo($camp) values($val)";
    mysqli_query($link, $query);
    
    if(mysqli_affected_rows($link) > 0)
    {
        $idArchivo = mysqli_insert_id($link);
        mysqli_close($link);
        $return["estado"] = guardaIdArchivoUser($idArchivo, $data[3]);
    }
    else{
        $return["estado"] = "noGuardado";
    }
    
    return $return;
}

/**
 * Funcion para actualizar la foto d perfil
 * @param array $data
 * @return array
 */
function actualizaFoto($data)
{
    $link = conection();
    $return = array();
    $camp = "foto = '$data[5]$data[1]'";
    
    $query = "update Archivo set $camp where idArchivo = '$data[4]'";
    mysqli_query($link, $query);
    
    if (mysqli_affected_rows($link) > 0) {
        $return["estado"] = "actualizado";
        unlink("../../" . $data[5].$data[0]);
    } else {
        $return["estado"] = "noGuardado";
        unlink("../../" . $data[5].$data[1]);
    }
    mysqli_close($link);
    return $return;
}
/**
 * Funcion para extraer la 
 * @param String $id
 * @param String $tabla
 * @return String
 */
function extraeIdFoto($id, $tabla)
{
    $link = conection();
    $query = null;
    
    switch ($tabla)
    {
        case "usuario":
            $query = "select idArchivo from Cliente where idCliente = '$id'";
            break;
        case "mascota":
            $query = "select idArchivo from Mascota where idMascota = '$id'";
            break;
    }
    
    $result = mysqli_query($link, $query);
    $array = mysqli_fetch_assoc($result);
    
    return $array["idArchivo"];
}
/**
 * Funcion para atualizar el idArchivo en la tabla de usuario
 * @param String $idArchivo
 * @param String $idCliente
 * @return String
 */
function guardaIdArchivoUser($idArchivo, $idCliente)
{
    $link = conection();
    $return = null;
    $camp = "idArchivo = '$idArchivo'";
    $query = "update Cliente set $camp where idCliente = '$idCliente'";
    mysqli_query($link, $query);

    if (mysqli_affected_rows($link) > 0) {
        $return = "guardado";
    } else {
        $return = "noGuardado";
    }
    mysqli_close($link);
    return $return;
}

/**
 * Funcion para actualizar la foto de la tabla de mascotas
 * @param String $idArchivo
 * @param String $idMascota
 * @return String
 */
function guardaIdArchivoMas($idArchivo, $idMascota)
{
    $link = conection();
    $return = null;
    $camp = "idArchivo = '$idArchivo'";
    $query = "update Mascota set $camp where idMascota = '$idMascota'";
    mysqli_query($link, $query);

    if (mysqli_affected_rows($link) > 0) {
        $return = "guardado";
    } else {
        $return = "noGuardado";
    }
    mysqli_close($link);
    return $return;
}