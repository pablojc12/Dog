<?php

if (isset($_POST["file"])) {
    //variales para la declaracion del las peticionesJSON
    $file = $_POST["file"];
    $metodo = "main";
    $respuesta = "";

    $ruta = "../user/" . $file . ".php";

    require_once $ruta;
    
    /* @var $respuestaJSON type */
    $respuestaJSON = $metodo();

    header('Content-type: application/json');
    echo json_encode($respuestaJSON);
} 
else 
{
    echo "SIN PARAMETROS";
}
