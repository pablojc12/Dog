/* global form, selector, objetoJSON */
/**
 * Evento enter para las funciones del formulario
 * @returns {undefined}
 */
window.onload = function(){
    document.onkeypress = checkButton;
};
function checkButton(evObject){
    if(typeof evObject !== "undefined" && typeof evObject !== ""){
        if(evObject.keyCode === 13)
            enviar();// metodo que se ejecutara con enter 
    }
}
/**
 * Funcion para realizar el registro del usuario
 */
function enviar()
{
    var correo = lee(form["correo"]);
    var pass1 = lee(form["contrasena"]);
    var pass2 = lee(form["rContrasena"]);
    
    if(validaEmail(correo, "correo") && 
            comparaPassword(pass1, pass2, "contrasena", "rContrasena"))
    {   
        objetoJSON = {
            "file": "actionClient",
            "action": textGuardar(),
            "correo": correo,
            "contrasena": pass1
        };

        ajaxLoad(objetoJSON);
        window.location = "login.html";
    }
}


