/* global form, lee, objetoJSON, tipoUsuario, tipoMascota, tipoCita, server, alertify */

window.onload = function ()
{
    objetoJSON = {
        "file": "consultaDatosUser"
    };
    traerDatos(objetoJSON);
};

var respuestaJSONUser;
var respuestaJSONEmpleados;
var respuestaJSONMascotas;
var respuestaJSONServicios;
var respuestaJSONRazas;
var respuestaJSONTipos;

/**
 * Accion que tomara el boton de editar perfil
 * @returns {undefined}
 */
function buttonEditarPerfil() {
    mostrarEdicionPerfil();
}

/**
 * Accion que tomara el boton de cancelar la edicion de perfil
 * @returns {undefined}
 */
function buttonCalcelar()
{
    restartUser();
    cargarDatos();
}

/**
 * Funcion para restablecer la lsta del usuario
 * @returns {undefined}
 */
function restartUser()
{
    document.getElementById("buttonEditarUser").setAttribute("onclick", "buttonEditarPerfil()");
    document.getElementById("buttonEditarUser").innerHTML = "Editar";
    document.getElementById("buttonEditarUser").setAttribute("class", "button special fit small");
    document.getElementById("button").innerHTML = "";
}
/**
 * Funcion para restablecer el html
 * @returns {undefined}
 */
function restart() {
    objetoJSON = {
        "file": "consultaDatosUser"
    };
    traerDatos(objetoJSON);
    restartUser();
    buttonCancelarMascota();
    buttonCancelarCita();
}
/**
 * Funcion para restablecer el codigo escrito en html
 * @returns {undefined}
 */
function buttonCancelarMascota()
{
    $("#imageMascota").hide();
    document.getElementById("formMascota").innerHTML = "";
    document.getElementById("buttonAgregarMascota").setAttribute("onclick", "buttonAgregarMascota()");
    document.getElementById("buttonAgregarMascota").innerHTML = "Agregar";
    document.getElementById("buttonAgregarMascota").setAttribute("class", "button special fit small");
}

/**
 * Funcion para restablecer el codigo escrito en html
 * @returns {undefined}
 */
function buttonCancelarCita()
{
    document.getElementById("formCita").innerHTML = "";
    document.getElementById("buttonAgregarCita").setAttribute("onclick", "buttonAgregarCita()");
    document.getElementById("buttonAgregarCita").innerHTML = "Agregar";
    document.getElementById("buttonAgregarCita").setAttribute("class", "button special fit small");
}

/**
 * Funcion para eliminar la mascota seleccionada en base a su id
 * @param {text} idMascota
 * @returns {undefined}
 */
function buttonEliminarMascota(idMascota)
{
    var nombre = null;
    var lengthMascotas = null;

    objetoJSON = {
        "file": "actionMascota",
        "action": textBorrar(),
        "idMascota": idMascota
    };

    lengthMascotas = Object.keys(respuestaJSONUser.mascota).length;

    for (var m = 1; lengthMascotas >= m; m++)
    {
        if (respuestaJSONUser.mascota[m].idMascota === idMascota)
            nombre = respuestaJSONUser.mascota[m].nombreMa;
    }
    //console.log(objetoJSON);
    alertify.confirm("<p class='black'>Realmente quieres eliminar a " + nombre + "?</p>", function (e) {
        if (e) {
            ajaxLoad(objetoJSON, true);
        } else {
        }
    });
}
/**
 * Funcion para eliminar la reservacion seleccionada en base a su id
 * @param {text} idDetalle
 * @returns {undefined}
 */
function buttonEliminarCita(idDetalle)
{
    var fecha = null;
    var idReservacion = null;

    for (var m = 1; Object.keys(respuestaJSONMascotas).length >= m; m++)
    {
        for (var r = 1; Object.keys(respuestaJSONMascotas["mas" + m].detalle).length >= r; r++)
        {
            if (idDetalle === respuestaJSONMascotas["mas" + m].detalle["det" + r].idDetalle)
            {
                fecha = respuestaJSONMascotas["mas" + m].reservacion["res" + r].fechaTermino;
                idReservacion = respuestaJSONMascotas["mas" + m].reservacion["res" + r].idReservacion;
            }
        }
    }

    if (validaBorradoPFecha(fecha))
    {
        objetoJSON = {
            "file": "actionEvento",
            "action": textBorrar(),
            "idDetalle": idDetalle,
            "idReservacion": idReservacion
        };

        alertify.confirm("<p class='black'>Realmente quieres eliminar esta Reservación?</p>", function (e) {
            if (e) {
                //console.log(objetoJSON);
                ajaxLoad(objetoJSON, true);
            } else {
            }
        });
    } else
        alerta(textFechaMenor());
}
/**
 * Funcion para hacer la actulizacion del usuario 
 * @returns {undefined}
 */
function actualizarPerfil() {
    var nombre = lee(form["nombre"]).toUpperCase();
    var aPaterno = lee(form["aPaterno"]).toUpperCase();
    var aMaterno = lee(form["aMaterno"]).toUpperCase();
    var fNacimiento = lee(form["fNacimiento"]);

    if (validaText(nombre, textLlenarNombre(), textErrorNombre(), "nombre") &&
            validaText(aPaterno, textLlenarAPaterno(), textErrorAPaterno(), "aPaterno") &&
            validaText(aMaterno, textLlenarAMaterno(), textErrorAMaterno(), "aMaterno") &&
            validarFormatoFecha(fNacimiento, "fNacimiento"))
    {
        var apellidoCL = aPaterno + "," + aMaterno;
        objetoJSON = {
            "file": "actionClient",
            "action": textActualizar(),
            "nombre": nombre,
            "apellidosCl": apellidoCL,
            "fNacimiento": fNacimiento
        };

        //console.log(objetoJSON);
        ajaxLoad(objetoJSON, true);
    }
}
/**
 * Funcion para verificar si la mascota tiene reservaciones
 * @param {type} idMascota
 * @returns {Boolean}
 */
function revisaMascotaReservacion(idMascota)
{
    var lengthMascota = Object.keys(respuestaJSONMascotas).length;
    var retorno = true;
    for (var m = 1; lengthMascota >= m; m++)
    {
        var lengthRes = Object.keys(respuestaJSONMascotas["mas" + m].detalle).length;
        for (var r = 1; lengthRes >= r; r++)
        {
            if (respuestaJSONMascotas["mas" + m].detalle["det" + r].idMascota === idMascota)
            {
                if(validaBorradoPFecha(respuestaJSONMascotas["mas" + m].reservacion["res" + r].fechaInicio))
                    retorno = false;
            }

        }
    }

    return retorno;
}

/**
 * Funcion para agregar una cita 
 * @returns {undefined}
 */
function agregarEventoPaseo()
{
    actionEventoPaseo(textGuardar(), "", "");
}

function agregarEventoGuarderia()
{
    actionEventoGuarderia(textGuardar(), "", "");
}
/**
 * Funcion para actualizar la reservacion del boton guardar del form
 * @param {number} idDetalle
 * @returns {undefined}
 */
function editarEventoPaseo(idDetalle)
{
    var idReservacion = null;
    var fecha = null;
    idDetalle = idDetalle.toString();

    for (var m = 1; Object.keys(respuestaJSONMascotas).length >= m; m++)
    {
        for (var d = 1; Object.keys(respuestaJSONMascotas["mas" + m].detalle).length >= d; d++)
        {
            if (respuestaJSONMascotas["mas" + m].detalle["det" + d].idDetalle === idDetalle)
            {
                idReservacion = respuestaJSONMascotas["mas" + m].detalle["det" + d].idReservacion;
                fecha = respuestaJSONMascotas["mas" + m].reservacion["res" + d].fechaTermino;
            }
        }
    }

    if (validaBorradoPFecha(fecha))
    {
        actionEventoPaseo(textActualizar(), idDetalle, idReservacion);
    } else
        alerta(textFechaMenorA());
}

/**
 * Funcion para actualizar la reservacion del boton guardar del form
 * @param {number} idDetalle
 * @returns {undefined}
 */
function editarEventoOtros(idDetalle)
{
    var idReservacion = null;
    var fecha = null;
    idDetalle = idDetalle.toString();

    for (var m = 1; Object.keys(respuestaJSONMascotas).length >= m; m++)
    {
        for (var d = 1; Object.keys(respuestaJSONMascotas["mas" + m].detalle).length >= d; d++)
        {
            if (respuestaJSONMascotas["mas" + m].detalle["det" + d].idDetalle === idDetalle)
            {
                idReservacion = respuestaJSONMascotas["mas" + m].detalle["det" + d].idReservacion;
                fecha = respuestaJSONMascotas["mas" + m].reservacion["res" + d].fechaTermino;
            }
        }
    }

    if (validaBorradoPFecha(fecha))
    {
        actionEventoGuarderia(textActualizar(), idDetalle, idReservacion);
    } else
        alerta(textFechaMenorA());
}

/**
 * Funcion para guardar o realizar una actualizacion para las reservaciones o eventos
 * @param {text} action accion para guardar o actualizar 
 * @param {type} idDetalle 
 * @param {type} idReservacion description
 * @returns {undefined}
 */
function actionEventoPaseo(action, idDetalle, idReservacion)
{
    var idMascota = lee(form["idMascota"]);
    var idEmpleado = lee(form["idEmpleado"]);
    var idServicio = lee(form["idServicio"]);
    var comentario = lee(form["comentario"]);
    var fReservacion = lee(form["fInicio"]);
    var fInicio = null;
    var costo = null;

    if (campoVacio(idMascota, textLlenarMascota(), "idMascota") &&
            campoVacio(idServicio, textLlenarServicio(), "idServicio") &&
            campoVacio(idEmpleado, textLlenarEmpleado(), "idEmpleado") &&
            validarFormatoFecha(fReservacion, "fInicio") && 
            booleanoCMensajeYFoco(validaBorradoPFecha(fReservacion), "fInicio", textErrorFMenor()) &&
            validaText(comentario, textLlenarComentario(), textErrorComentario(), "comentario"))
    {
        if (revisaMascotaReservacion(idMascota) || action === textActualizar())
        {
            fInicio = fReservacion;
            var lengthServicio = Object.keys(respuestaJSONServicios).length;

            for (var s = 1; lengthServicio >= s; s++)
                if (respuestaJSONServicios[s].idServicio === idServicio)
                    costo = respuestaJSONServicios[s].costoSe;


            objetoJSON = {
                "file": "actionEvento",
                "action": action,
                "idMascota": idMascota,
                "idServicio": idServicio,
                "idEmpleado": idEmpleado,
                "fechaTermino": fReservacion,
                "fechaInicio": fInicio,
                "idDetalle": idDetalle,
                "idReservacion": idReservacion,
                "comentario": comentario,
                "costo": costo
            };
            //console.log(objetoJSON);
            ajaxLoad(objetoJSON, true);
        }
        else
            alerta(textMasRegRes()); 

    }
}

/**
 * Funcion para guardar o realizar una actualizacion para las reservaciones o eventos
 * @param {text} action accion para guardar o actualizar 
 * @param {type} idDetalle 
 * @param {type} idReservacion description
 * @returns {undefined}
 */
function actionEventoGuarderia(action, idDetalle, idReservacion)
{
    var idMascota = lee(form["idMascota"]);
    var idEmpleado = lee(form["idEmpleado"]);
    var idServicio = lee(form["idServicio"]);
    var comentario = lee(form["comentario"]);
    var fInicio = lee(form["fInicio"]);
    var fTermino = lee(form["fTermino"]);
    var costo = null;

    if (campoVacio(idMascota, textLlenarMascota(), "idMascota") &&
            campoVacio(idServicio, textLlenarServicio(), "idServicio") &&
            campoVacio(idEmpleado, textLlenarEmpleado(), "idEmpleado") &&
            validarFormatoFecha(fInicio, "fInicio") && 
            booleanoCMensajeYFoco(validaBorradoPFecha(fInicio), "fInicio", textErrorFMenor()) &&
            validarFormatoFecha(fTermino, "fTermino") &&
            booleanoCMensajeYFoco(comparaDosFechas(fInicio, fTermino), "fInicio", textFechaUnoMayor()) &&
            validaText(comentario, textLlenarComentario(), textErrorComentario(), "comentario"))
    {
        if (revisaMascotaReservacion(idMascota) || action === textActualizar())
        {
            var lengthServicio = Object.keys(respuestaJSONServicios).length;

            for (var s = 1; lengthServicio >= s; s++)
                if (respuestaJSONServicios[s].idServicio === idServicio)
                    costo = respuestaJSONServicios[s].costoSe;


            objetoJSON = {
                "file": "actionEvento",
                "action": action,
                "idMascota": idMascota,
                "idServicio": idServicio,
                "idEmpleado": idEmpleado,
                "fechaTermino": fTermino,
                "fechaInicio": fInicio,
                "idDetalle": idDetalle,
                "idReservacion": idReservacion,
                "comentario": comentario,
                "costo": costo
            };
            //console.log(objetoJSON);
            ajaxLoad(objetoJSON, true);    
        }
        else
            alerta(textMasRegRes()); 
        
    }
}
/**
 * Funcion para guardar una mascota nueva
 * @returns {undefined}
 */
function agregarMascota()
{
    actionMascota(textGuardar(), "");
}

/**
 * Funcion para actualizar una mascota ya registrada
 * @param {text} idMascota 
 * @returns {undefined}
 */
function editarMascota(idMascota)
{
    actionMascota(textActualizar(), idMascota);
}

/**
 * Accion para el almacenado o actualizado de la mascota
 * @param {text} action
 * @param {text} idMascota 
 * @returns {undefined}
 */
function actionMascota(action, idMascota)
{
    var id = idMascota;
    var nombreMa = lee(form["nombreMa"]).toUpperCase();
    var raza = lee(form["idRaza"]);

    if (validaText(nombreMa, textLlenarNombre(), textErrorNombre(), "nombreMa")
            && campoVacio(raza, textLlenarRaza(), "idRaza"))
    {
        objetoJSON = {
            "file": "actionMascota",
            "action": action,
            "id": id,
            "nombreMa": nombreMa,
            "idRaza": raza
        };

        //console.log(objetoJSON);
        ajaxLoad(objetoJSON, true);
    }
}
/**
 * Funcion para traer los datos desde el servidor principal
 * @param {ObjectJSON} objetoJSON datos a enviar al php
 * @returns {undefined}
 */
function traerDatos(objetoJSON)
{
    $.ajax({
        url: server,
        type: "post",
        dataType: "json",
        data: objetoJSON
    }).done(function (respuestaJSON) {
        //console.log(respuestaJSON);
        respuestaJSONUser = respuestaJSON.user;
        respuestaJSONMascotas = respuestaJSON.mascota;
        respuestaJSONEmpleados = respuestaJSON.empleados;
        respuestaJSONServicios = respuestaJSON.servicio;
        respuestaJSONRazas = respuestaJSON.razas;
        respuestaJSONTipos = respuestaJSON.tipos;
        cargarDatos();
    })
            .fail(function (data)
            {
                error(textSinRespuesta());
                console.log(data);
            });
}

/**
 * Funcion para hacer la carga de los datos en modo bloqueado
 * @returns {undefined}
 */
function cargarDatos()
{
    $("#imageMascota").hide();
    var loadProfile = document.getElementById("loadProfile");
    var imagen = document.getElementById("img1");
    var writeHtml = "";

    if (respuestaJSONUser.usuarioFoto.foto !== "")
    {
        imagen.setAttribute("src", respuestaJSONUser.usuarioFoto.foto);
        imagen.setAttribute("name", respuestaJSONUser.usuarioFoto.foto + "?enElToken?" + "usuario");
    } else
    {
        imagen.setAttribute("src", "images/pic03_1.png");
        imagen.setAttribute("name", "sin foto?enElToken?" + "usuario");
    }

    if (respuestaJSONUser.usuario.nombre === "")
    {
        document.getElementById("titleProfile").innerHTML = textLlenarPerfil();
        document.getElementById("buttonAgregarMascota").setAttribute("onclick", "alerta(textLlenarPerfil())");
        document.getElementById("buttonAgregarCita").setAttribute("onclick", "alerta(textLlenarPerfil())");

        writeHtml += "  <ul class='alt'>";
        writeHtml += "      <li><strong>Nombre: </strong></li>";
        writeHtml += "      <li><strong>Apellido Paterno: </strong></li>";
        writeHtml += "      <li><strong>Apellido Materno: </strong></li>";
        writeHtml += "      <li><strong>Fecha de Nacimiento: </strong></li>";
        writeHtml += "      <li><strong>Correo: </strong>" + respuestaJSONUser.usuario.correo + "</li>";
        writeHtml += "  </ul>";
    } else
    {
        var nombreCl = respuestaJSONUser.usuario.nombre + " " + respuestaJSONUser.usuario.aPaterno;
        document.getElementById("titleProfile").innerHTML = nombreCl;

        writeHtml += "  <ul class='alt'>";
        writeHtml += "      <li><strong>Nombre: </strong>" + respuestaJSONUser.usuario.nombre + "</li>";
        writeHtml += "      <li><strong>Apellido Paterno: </strong>" + respuestaJSONUser.usuario.aPaterno + "</li>";
        writeHtml += "      <li><strong>Apellido Materno: </strong>" + respuestaJSONUser.usuario.aMaterno + "</li>";
        writeHtml += "      <li><strong>Fecha de Nacimiento: </strong>" + respuestaJSONUser.usuario.fNacimiento + "</li>";
        writeHtml += "      <li><strong>Correo: </strong>" + respuestaJSONUser.usuario.correo + "</li>";
        writeHtml += "  </ul>";

        listarMascotas();
        listarCitas();
    }
    loadProfile.innerHTML = writeHtml;
}
/**
 * Funcion para ablilitar la edicion del formulario de lainformacion personal
 * @returns {undefined}
 */
function mostrarEdicionPerfil()
{
    document.getElementById("buttonEditarUser").setAttribute("onclick", 'buttonCalcelar()');
    document.getElementById("buttonEditarUser").innerHTML = "Cancelar";
    document.getElementById("buttonEditarUser").setAttribute("class", "button fit small");

    var loadProfile = document.getElementById("loadProfile");
    var loadButton = document.getElementById("button");
    var writeHtml = "";
    var button = "";

    writeHtml += "  <ul class='alt'>";
    writeHtml += "      <li><input type='text' name='nombre' id='nombre' autocomplete='off'";
    writeHtml += "          value='" + respuestaJSONUser.usuario.nombre + "'";
    writeHtml += "          onblur='validaText(this.value, textLlenarNombre(), textErrorNombre())'/>";
    writeHtml += "      <label for='nombre' id='nombreLabel'>Nombre(s)</label></li>";

    writeHtml += "      <li><input type='text' name='aPaterno' id='aPaterno' autocomplete='off'";
    writeHtml += "          value='" + respuestaJSONUser.usuario.aPaterno + "'";
    writeHtml += "          onblur='validaText(this.value, textLlenarAPaterno(), textErrorAPaterno())'/>";
    writeHtml += "      <label for='aPaterno' id='aPaternoLabel'>Apellido Paterno</label></li>";

    writeHtml += "      <li><input type='text' name='aMaterno' id='aMaterno' autocomplete='off'";
    writeHtml += "          value='" + respuestaJSONUser.usuario.aMaterno + "'";
    writeHtml += "          onblur='validaText(this.value, textLlenarAMaterno(), textErrorAMaterno())'/>";
    writeHtml += "      <label for='aMaterno' id='aMaternoLabel'>Apellido Materno</label></li>";

    writeHtml += "      <li><input type='date' name='fNacimiento' id='fNacimiento' autocomplete='off'";
    writeHtml += "          value='" + respuestaJSONUser.usuario.fNacimiento + "'";
    writeHtml += "          onblur='validarFormatoFecha(this.value)'/>";
    writeHtml += "      <label for='fNacimiento' id='fNacimeintoLabel'>Fecha de Nacimiento</label></li>";

    writeHtml += "      <li><input type='email' name='correo' id='correo' disabled";
    writeHtml += "          value='" + respuestaJSONUser.usuario.correo + "'/>";
    writeHtml += "      <label for='correo' id='correoLabel'>Correo Electronico</label></li>";
    writeHtml += "  </ul>";

    button += "  <ul class='actions vertical'>";
    button += "      <li><a class='button special fit' onclick='actualizarPerfil()' >Guardar</a></li>";
    button += "      <li><input class='button fit' type='reset' value='Restablecer' /></li>";
    button += "  </ul>";

    loadButton.innerHTML = button;
    loadProfile.innerHTML = writeHtml;
}
