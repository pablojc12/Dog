<?php
session_start();
define("guardar", "guardar");
define("actualizar", "actualizar");
define("borrar", "borrar");
define("consultar", "consultar");

function conection()
{
	$link = mysqli_connect('localhost','root','','dog')
	or die(error());

	return $link;
}

function error(){
    return array("estado" => "error");
}