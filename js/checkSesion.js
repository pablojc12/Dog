/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global server */

var URLActual = window.location.toString();
var pagina = URLActual.split("/");
pagina = pagina[Object.keys(pagina).length - 1];
var menuMaster = document.getElementById("menuMaster");

var objetoSON = {
    "file": "checkSesion",
    "pagina": pagina
};

$.ajax({
    url: server,
    type: "post",
    dataType: "json",
    data: objetoSON
}).done(function (respuestaJSON) {
    console.log(respuestaJSON);

    if (typeof respuestaJSON.estado !== "undefined" && respuestaJSON.estado !== ""
            && respuestaJSON.estado !== null)
    {
        if (respuestaJSON.redireccion)
            window.location = respuestaJSON.pagina;
        else if (respuestaJSON.estado === "ok")
            selectorOK();
        else if (respuestaJSON.estado === "noOk")
            selectorNoOK();
        else
            error(textRespInvalida());
    } else
        error(textSinRespuesta());
})
        .fail(function (data)
        {
            error(textSinRespuesta());
            console.log(data);
        });

/**
 * Seleccion en caso de que la sesion este cerrada
 * @returns {undefined}
 */
function selectorNoOK()
{
    switch (pagina)
    {
        case "index.html":
            menuIndexNoOK();
            break;
        case "register.html":
            menuRegisterNoOK();
            break;
        case "login.html":
            menuLoginNoOK();
            break;
    }
}
/**
 * Menu del index con sesion cerrada
 * @returns {undefined}
 */
function menuIndexNoOK()
{
    var menu = "";
    menu += "<li><a href='register.html'>Registrate</a></li>";
    menu += "<li><a href='login.html'>Inicia Sesion</a></li>";
    menuMaster.innerHTML = menu;
}
/**
 * Menu del registro con sesion cerrada
 * @returns {undefined}
 */
function menuRegisterNoOK()
{
    var menu = "";
    menu += "<li><a href='index.html'>Inicio</a></li>";
    menu += "<li><a href='login.html'>Inicia Sesion</a></li>";
    menuMaster.innerHTML = menu;
}
/**
 * Menu del login con sesion cerrada
 * @returns {undefined}
 */
function menuLoginNoOK()
{
    var menu = "";
    menu += "<li><a href='index.html'>Inicio</a></li>";
    menu += "<li><a href='register.html'>Registrate</a></li>";
    menuMaster.innerHTML = menu;
}
/**
 * Seleccion del menu con la sesion abierta
 * @returns {undefined}
 */
function selectorOK()
{
    switch (pagina)
    {
        case "index.html":
            menuIndexOK();
            break;
        case "profile.html":
            menuProfileOK();
            break;
    }
}
/**
 * Menu de inicio con la sesion abierta
 * @returns {undefined}
 */
function menuIndexOK()
{
    var menu = "";
    menu += "<li><a href='profile.html'>Mi Perfil</a></li>";
    menu += "<li><a href='#' onclick='logOut()'>Cerrar Sesion</a></li>";
    menuMaster.innerHTML = menu;
}
/**
 * Menu de perfil con la sesion abierta
 * @returns {undefined}
 */
function menuProfileOK()
{
    var menu = "";
    menu += "<li><a href='index.html'>Inicio</a></li>";
    menu += "<li><a onclick='logOut()'>Cerrar Sesion</a></li>";
    menuMaster.innerHTML = menu;
}
