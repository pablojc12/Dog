<?php
require_once 'conection.php';

/**
 * Funcion principal para la recoleccion de datos 
 * @return array coleccion de datos recolectados
 */
function main()
{
    if (/*isset($_SESSION["tokenSession"])*/ true) 
    {
        $sesion = $_SESSION["tokenSession"];
        $data = array();
        $arregloAuxiliar = null;
        $arregloMascota = null;
        
        $data["user"]["usuario"] = extraeUsuario($sesion);
        $data["user"]["usuarioFoto"] = extraeArchivo($data["user"]["usuario"]["idArchivo"]);
        $data["user"]["mascota"] = extraeMascotas($data["user"]["usuario"]["idCliente"]);
        $data["empleados"] = extraeEmpleado ();
        $data["servicio"] = extraeServicio();
        $data["tipos"] = extraeTipos();
        $data["razas"] = extraeRazas();
        
        for ($r = 1; $r <= count($data["user"]["mascota"]); $r ++) 
        {
            $data["user"]["raza"][$r] = extraeRaza($data["user"]["mascota"][$r]["idRaza"]);
            $data["user"]["tipo"][$r] = extraeTipo($data["user"]["raza"][$r]["idTipo"]);
            $data["user"]["archivo"][$r] = extraeArchivo($data["user"]["mascota"][$r]["idArchivo"]);
            
            $nomMascota = $data["user"]["mascota"][$r]["nombreMa"];
            $arregloMascota = extraeDetalle($data["user"]["mascota"][$r]["idMascota"]); 
            
            for($m = 1; count($arregloMascota) >= $m; $m++)
            {
                $arregloAuxiliar["res$m"] = extraeReservacion($arregloMascota["det$m"]["idReservacion"]);
            }
            
            $data["mascota"]["mas$r"] = ["detalle" => $arregloMascota, "reservacion" => $arregloAuxiliar, "nombre" => $nomMascota];
            
            $arregloMascota = null;
            $arregloAuxiliar = null;
        }
    
        $_SESSION["tokenIDUser"] = $data["user"]["usuario"]["idCliente"];
        return $data;
    } else 
    {
        return array("estado" => "sinSesion");
    }
}
/**
 * Funcion para recolectar los datos del usuario en base a una sesion activa
 * @param String $sesion contenido de la sesion activa
 * @return Object con los datos recolectados y parseados con utf8_encode()
 */
function extraeUsuario($sesion)
{
    $link = conection();    
    
    $query = "select * from Cliente where sesion like '$sesion'";
    $result = mysqli_query($link, $query);
    $aPaterno = "";
    $aMaterno = "";
    
    $array = mysqli_fetch_assoc($result);
    $space = explode(",", $array["apellidosCl"]);
    
    if(count($space) === 2)
    {
        $aMaterno = utf8_encode($space[1]);
        $aPaterno = utf8_encode($space[0]);
    }
    
    $parseUTF8 = ["nombre" => utf8_encode($array["nombreCl"]), "aPaterno" => $aPaterno,
                  "aMaterno" => $aMaterno, "fNacimiento" => utf8_encode($array["fn"]),
                  "idCliente" => $array["idCliente"], "idArchivo" => $array["idArchivo"],
                  "correo" => utf8_encode($array["correo"])];
    
    mysqli_close($link);
    return $parseUTF8;
}

/**
 * Funcion para recolectar los datos de Mascota en base a su id
 * @param String $idCliente
 * @return Object con los datos recolectados y parseados con utf8_encode()
 */
function extraeMascotas($idCliente)
{
    $link = conection();
    $return = array();
    $contador = null;
    
    $query = "select * from Mascota where idCliente = '$idCliente'";
    $result = mysqli_query($link, $query);
    
    $rows = mysqli_num_rows($result);
    
    if($rows > 0)
    {
        while ($rows = mysqli_fetch_assoc($result))
        {
            $contador  ++;
            // Nota: esto se hace para validar los acentos, si no de lo 
            // contrario marca horrores con las tildes o acentos al momento 
            // retornar los datos recolectados
            $return[$contador] = ["idMascota" => $rows["idMascota"], 
                                  "nombreMa" => utf8_encode($rows["nombreMa"]),
                                  "idRaza" => $rows["idRaza"],
                                  "idCliente" => $rows["idCliente"],
                                  "idArchivo" => $rows["idArchivo"]];
        }
    }
    
    mysqli_close($link);
    return $return;
}
/**
 * Funcion para recolectar los datos de Raza en base a su id
 * @param String $idRaza
 * @return Object con los datos recolectado y parseados con utf8_encode()
 */
function extraeRaza($idRaza)
{
    $link = conection();
    
    $query = "select * from Raza where idRaza = '$idRaza'";
    $result = mysqli_query($link, $query);
    
    $array = (mysqli_fetch_assoc($result));
    
    $parseUTF8 = ["idRaza" => $array["idRaza"], 
                  "nombreRa" => utf8_encode($array["nombreRa"]),
                  "idTipo" => $array["idTipo"]];
    mysqli_close($link);
    
    return $parseUTF8;
}
/**
 * Funcion para extraer la info de todas las razas
 * @return Object con los datos recolectado y parseados con utf8_encode()
 */
function extraeRazas()
{
    $link = conection();
    $parseUTF8 = array();
    $contador = null;
    
    $query = "select * from Raza";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_num_rows($result);
    
    if($array > 0)
    {
        while ($rows = mysqli_fetch_assoc($result))
        {
            $contador ++;
            
            $parseUTF8 [$contador] = ["idRaza" => $rows["idRaza"],
                "nombreRaza" => utf8_encode($rows["nombreRa"]),
                "idTipo" => $rows["idTipo"]];
        }
    }
    
    mysqli_close($link);
    
    return $parseUTF8;
}
/**
 * Funcion paa extraer la info de todos los tipos de razas
 * @return Object con los datos recolectado y parsados con utf8_encode()
 */
function extraeTipos()
{
    $link = conection();
    $parseUTF8 = array();
    $contador = null;
    
    $query = "select * from Tipo_Raza";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_num_rows($result);
    
    if($array > 0)
    {
        while ($rows = mysqli_fetch_assoc($result))
        {
            $contador ++;
            
            $parseUTF8 [$contador] = ["idTipo" => $rows["idTipo"],
                "tamano" => utf8_encode($rows["tamano"])];
        }
    }
    
    mysqli_close($link);
    
    return $parseUTF8;
}
/**
 * Funcion para recolectar los datos de Tipo en base a su id
 * @param String $idTipo
 * @return Object con los datos recolectados y parseados con utf8_encode()
 */
function extraeTipo($idTipo)
{
    $link = conection();
    
    $query = "select * from Tipo_Raza where idTipo = '$idTipo'";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_fetch_assoc($result);
    
    $parseUTF8 = ["idTipo" => $array["idTipo"],
                  "tamano" => utf8_encode($array["tamano"])];
    
    mysqli_close($link);
    return $parseUTF8;
}
/**
 * Funcion para recolectar los datos de Archivo en base a su id
 * @param type $idArchivo
 * @return Object con los datos recolectados y parseados con utf8_encode()
 */
function extraeArchivo($idArchivo)
{
    $link = conection();
    
    $query = "select * from Archivo where idArchivo = '$idArchivo'";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_fetch_assoc($result);
    
    $parseUTF8 = ["idArchivo" => $array["idArchivo"],
                  "foto" => utf8_encode($array["foto"])];
    
    mysqli_close($link);
    
    return $parseUTF8;
}
/**
 * Funcion para extraer info de la tabla detalle en base al id de la mascota
 * En base a estos datos se extraeran los de las otras tablas
 * @param type $idMascota
 * @return Object con los datos recolectados y parseados con utf8_encode()
 */
function extraeDetalle($idMascota)
{
    $link = conection();
    $return = array();
    $contador = null;
    
    $query = "select * from Detalle where idMascota = $idMascota";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_num_rows($result);
    
    if ($array > 0)
    {
        while ($rows = mysqli_fetch_assoc($result))
        {
             $contador ++;
             $return["det".$contador] = ["idDetalle" => $rows["idDetalle"],"comentario" => utf8_encode($rows["comentario"]),
                                   "idEmpleado" => $rows["idEmpleado"],"idServicio" => $rows["idServicio"],
                                   "idReservacion" => $rows["idReservacion"],"idMascota" => $rows["idMascota"]];
        }
    }
    
    mysqli_close($link);
    return $return;
}
/**
 * Funcion para extraer la info del empleado en base a su id
 * @return Object con los datos recolectado y parseados con utf8_encode()
 */
function extraeEmpleado()
{
    $link = conection();
    $parseUTF8 = array();
    $contador = null;
    $aMaterno = null;
    $aPaterno = null;
    
    $query = "select * from Empleado";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_num_rows($result);  
    
    if($array > 0)
    {
        while ($rows = mysqli_fetch_assoc($result)) 
        {
            $contador ++;

            $space = explode(",", $rows["apellidosEm"]);

            if (count($space) === 2) 
            {
                $aMaterno = utf8_encode($space[1]);
                $aPaterno = utf8_encode($space[0]);
            }

            $parseUTF8[$contador] = ["idEmpleado" => $rows["idEmpleado"], "nombreEm" => utf8_encode($rows["nombreEm"]),
                "aPaterno" => $aPaterno, "aMaterno" => $aMaterno,
                "telefonoEm" => utf8_encode($rows["telefonoEm"]), "idRol" => $rows["idRol"],
                "idArchivo" => $rows["idArchivo"]];
        }
    }
    mysqli_close($link);
    return $parseUTF8;
}

/**
 * Funcion para extraer la info de la tabla de Reservacion
 * @param type $idReservacion
 * @return Object con los datos recolectador y parseados con utf8_encode()
 */
function extraeReservacion($idReservacion)
{
    $link = conection();
    
    $query = "select * from Reservacion where idReservacion = $idReservacion";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_fetch_assoc($result);
    
    $parseUTF8 = ["idReservacion" => $array["idReservacion"],
                  "fechaInicio" => utf8_encode($array["fechaInicio"]),
                  "fechaTermino" => utf8_encode($array["fechaTermino"]),
                  "total" => utf8_encode($array["total"])];
    mysqli_close($link);
    
    return $parseUTF8;
}
                  
/**
 * Funcion para ectraer la info de la tabla Servicio
 * @return Object con los datos recolectados y parseados con utf8_encode()
 */
function extraeServicio()
{
    $link = conection();
    $parseUTF8 = array();
    $contador = null;
    
    $query = "select * from Servicio";
    $result = mysqli_query($link, $query);
    
    $array = mysqli_num_rows($result);  
    
    if($array > 0)
    {
        while ($rows = mysqli_fetch_assoc($result))
        {
            $contador ++;
            
            $parseUTF8[$contador] = ["idServicio" => $rows["idServicio"], "nombreSe" => strtoupper(utf8_encode($rows["nombreSe"])),
                                     "costoSe" => utf8_decode($rows["costoSe"]),"descripcion" => strtoupper(utf8_encode($rows["descripcion"]))];
        }
    }
    
    return $parseUTF8;
}