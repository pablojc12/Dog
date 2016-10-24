<?php
require_once 'conection.php';

function main()
{
    $pagina = $_POST["pagina"];
    
    if(isset($_SESSION["tokenSession"]))
    {
        return caseOk($pagina); 
    }
    else
    {
        return caseNoOK($pagina);
    }
}
/**
 * Funcion para caso de que no este iniciada una sesion
 * @param String $pagina
 * @return array
 */
function caseNoOK($pagina)
{
    $return = null;
    switch ($pagina) 
    {
        case "index.html":
            $return = array("estado" => "noOk", "redireccion" => false, "pagina" => "");
            break;
        case "login.html":
            $return = array("estado" => "noOk", "redireccion" => false, "pagina" => "");
            break;
        case "register.html":
            $return = array("estado" => "noOk", "redireccion" => false, "pagina" => "");
            break;
        case "profile.html":
            $return = array("estado" => "noOk", "redireccion" => true, "pagina" => "index.html");
            break;
        default :
            $return = array("estado" => "noOk", "redireccion" => true, "pagina" => "index.html");
    }
    return $return;
}
/**
 * Funcion para caso de que este iniciada una sesion
 * @param String $pagina
 * @return array
 */
function caseOk($pagina) 
{
    $return = null;
    switch ($pagina) 
    {
        case "index.html":
            $return = array("estado" => "ok", "redireccion" => false, "pagina" => "");
            break;
        case "login.html":
            $return = array("estado" => "ok", "redireccion" => true, "pagina" => "profile.html");
            break;
        case "register.html":
            $return = array("estado" => "ok", "redireccion" => true, "pagina" => "profile.html");
            break;
        case "profile.html":
            $return = array("estado" => "ok", "redireccion" => false, "pagina" => "");
            break;
        default :
            $return = array("estado" => "ok", "redireccion" => true, "pagina" => "index.html");
    }
    return $return;
}
