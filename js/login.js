
/* global form, server */

window.onload = function(){
    document.onkeypress = checkButton;
};
function checkButton(evObject){
    if(typeof evObject !== "undefined" && typeof evObject !== ""){
        if(evObject.keyCode === 13)
            iniciar();// metodo que se ejecutara con enter 
    }
}
/**
 * Funcion para iniciar sesion
 * @returns {undefined}
 */
function iniciar()
{
    var usuario = lee(form["usuario"]);
    var password = lee(form["contrasena"]);
    
    if(validaEmail(usuario, "usuario") && campoVacio(password, textLlenarPas(), "contrasena"))
    {
        objetoJSON = {
            "file": "login",
            "correo": usuario,
            "contrasena": password
        };
        consultarBase(objetoJSON);
    }   
}

/**
 * Funcion para consultar en la base de datos si existe el usuario
 * @param {object} objetoJSON
 * @returns {undefined}
 */
function consultarBase(objetoJSON)
{
    //console.log(objetoJSON);
    $.ajax({
        url: server,
        type: "post",
        dataType: "json",
        data: objetoJSON
    }).done(function(respuestaJSON){
            console.log(respuestaJSON);
            
            if(typeof respuestaJSON.estado !== "undefined" && respuestaJSON.estado !== "" 
                    && respuestaJSON.estado !== null)
            {
                switch (respuestaJSON.estado)
                {
                    case "ninguno":
                        error(textCorreoOPasInv());
                        break;
                    case "registrado":
                        location.href="profile.html";
                        break;
                    default :
                        error(textRespInvalida());                         
                        break;
                }
            }   
            else 
                error(textSinRespuesta());
        })
    .fail(function (data) 
        {
            error(textSinRespuesta());
            console.log(data);
        });
}