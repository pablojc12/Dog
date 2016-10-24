/* global respuestaJSONUser, respuestaJSONTipos, respuestaJSONRazas, respuestaJSONServicios, respuestaJSONMascotas, respuestaJSONEmpleados, server, form */
var selectEmpleadoGlobal = null;
var idDetalleGlobal = null;
var idMascotaGlobal = null;
var idEmpleadoGlobal = null;
var fechaInicioGlobal = null;
var fechaTerminoGlobal = null;
var comentarioGlobal = null;
var cargaGlobal = null;
/**
 * Accion que tomara el boton de agregar mascota
 * @returns {undefined}
 */
function buttonAgregarMascota()
{
    $("#imageMascota").hide();
    var formAgregarMascota = document.getElementById("formMascota");
    var form = "";
    var selecRaza = "";
    var raza = null;
    
    var lengthRaza = Object.keys(respuestaJSONRazas).length;
    var lengthTipos = Object.keys(respuestaJSONTipos).length;
    
    for (var r = 1; lengthRaza >= r; r++)
    {
        for (var t = 1; lengthTipos >= t; t++)
        {
            if(respuestaJSONRazas[r].idTipo === respuestaJSONTipos[t].idTipo)
            {
                raza = respuestaJSONRazas[r].nombreRaza + ": " + respuestaJSONTipos[t].tamano;
                selecRaza += "<option value='";
                selecRaza += respuestaJSONRazas[r].idRaza;
                selecRaza += "'>";
                selecRaza += raza;
                selecRaza += "</option>";
            }
        }
    }
    
    //Etiqueta de nomre de mascota
    form += "<ul class='alt'>";
    form += "   <li>";
    form += "       <input type='text' name='nombreMa' id='nombreMa' autocomplete='off'";
    form += "           onblur='validaText(this.value, textLlenarNombre(), textErrorNombre())'/>";
    form += "       <label for='nombreMa' id='nombreMa'>Nombre</label>";
    form += "   </li>";
    
    //select de Raza de mascota
    form += "   <li>";
    form += "       <select name='idRaza' id='idRaza' onblur='validaText(this.value, textLlenarRaza())'>";
    form += "           <option value=''>- Selecciona Raza -</option>";
    form += selecRaza;
    form += "       </select>";
    form += "       <label for='idRaza'>Raza</label>";
    form += "   </li>";
    form += "</ul>";
   
    //Botones
    form += "<ul class='actions'>";
    form += "    <li><input type='button' value='Guardar' class='special' onclick='agregarMascota()'/></li>";
    form += "    <li><input type='reset' value='Borrar Campos' /></li>";
    form += "</ul>";
    
    formAgregarMascota.innerHTML = form;
    btnCancelar("buttonAgregarMascota", "buttonCancelarMascota()");
}

/**
 * Funcion para retornar la ruta de la imagen de la mascota
 * @param {type} idMascota
 * @returns {respuestaJSON.user.archivo.foto|respuestaJSONUser@arr;archivo.foto}
 */
function buscaFoto(idMascota)
{
    var foto = null;
    
    for(var m = 1; Object.keys(respuestaJSONUser.mascota).length >= m; m++)
    {
        if(respuestaJSONUser.mascota[m].idMascota === idMascota)
        {
            if(respuestaJSONUser.mascota[m].idArchivo !== null)
                foto = respuestaJSONUser.archivo[m].foto;
        }
    }
    
    return foto;
}
/**
 * Funcion para editar la mascota seleccionada en base a su id
 * @param {text} idMascota
 * @returns {undefined}
 */
function buttonEditarMascota(idMascota)
{
    $("#imageMascota").show();
    var formAgregarMascota = document.getElementById("formMascota");
    var campFoto = document.getElementById("imgMascota");
    var foto = buscaFoto(idMascota);
    var form = "";
    var idTipo = null;
    var idRaza = null;
    var nombreMa = null;
    var selecRaza = "";
    var raza = null;
    
    var lengthRaza = Object.keys(respuestaJSONRazas).length;
    var lengthTipos = Object.keys(respuestaJSONTipos).length;
    var lengthMascota = Object.keys(respuestaJSONUser.mascota).length;
    
    if(foto !== null)
    {
        campFoto.setAttribute("src", foto);
        campFoto.setAttribute("name", foto + "?" + idMascota + "?" + "mascota");
    }
    else
    {
        campFoto.setAttribute("src", "images/pic03_1.png");
        campFoto.setAttribute("name", "sin foto?"+ idMascota + "?" + "mascota");
    }
    
    for(var m = 1; lengthMascota >= m; m++)
    {
        if(respuestaJSONUser.mascota[m].idMascota === idMascota)
        {
            idRaza = respuestaJSONUser.mascota[m].idRaza;
            nombreMa = respuestaJSONUser.mascota[m].nombreMa;
        }
    }
    
    for (var r = 1; lengthRaza >= r; r++)
    {
        for(var t = 1; lengthTipos >= t; t++)
        {
            if (respuestaJSONRazas[r].idTipo === respuestaJSONTipos[t].idTipo)
            {
                raza = respuestaJSONRazas[r].nombreRaza + ": " + respuestaJSONTipos[t].tamano;
                if (respuestaJSONRazas[r].idRaza === idRaza)
                {
                    selecRaza += "<option selected value='";
                    selecRaza += respuestaJSONRazas[r].idRaza;
                    selecRaza += "'>";
                    selecRaza += raza;
                    selecRaza += "</option>";

                    idTipo = respuestaJSONRazas[r].idTipo;
                } else
                {
                    selecRaza += "<option value='";
                    selecRaza += respuestaJSONRazas[r].idRaza;
                    selecRaza += "'>";
                    selecRaza += raza;
                    selecRaza += "</option>";
                }
            }
        }
    }
    
    //Etiqueta de nombre de mascota
    form += "<ul class='alt'>";
    form += "   <li>";
    form += "       <input type='text' name='nombreMa' value='" + nombreMa + "' id='nombreMa' autocomplete='off'";
    form += "           onblur='validaText(this.value, textLlenarNombre(), textErrorNombre())'/>";
    form += "       <label for='nombreMa' id='nombreMa'>Nombre</label>";
    form += "   </li>";
    
    
    //select de Raza de mascota
    form += "   <li>";
    form += "       <select name='idRaza' id='idRaza' onblur='validaText(this.value, textLlenarRaza())'>";
    form += "           <option value=''>- Selecciona Raza -</option>";
    form += selecRaza;
    form += "       </select>";
    form += "       <label for='idRaza'>Raza</label>";
    form += "   </li>";
    
    //Botones
    form += "<ul class='actions'>";
    form += "  	<li><input type='button' value='Actualizar' class='special' onclick='editarMascota(" + idMascota + ")'/></li>";
    form += "   <li><input type='reset' value='Restablecer' /></li>";
    form += "</ul>";
    
    formAgregarMascota.innerHTML = form;
    btnCancelar("buttonAgregarMascota", "buttonCancelarMascota()");
}

/**
 * Funcion para botnes cancelar
 * @param {text} button id del boton a cargar con la funcion event
 * @param {text} event funcion para el boton
 * @returns {undefined}
 */
function btnCancelar(button, event)
{
    document.getElementById(button).setAttribute("onclick", event);
    document.getElementById(button).innerHTML = "Cancelar";
    document.getElementById(button).setAttribute("class", "button fit small");
}

/**
 * Funcion para agregar los campos de la reservacion
 * @returns {undefined}
 */
function buttonAgregarCita()
{
    var formAgregarCita = document.getElementById("formCita");
    var form = "";
    var selectServicio = null;
    var selectMascota = null;
   
    var lengthMascotas = Object.keys(respuestaJSONUser.mascota).length;
    var lengthServicio = Object.keys(respuestaJSONServicios).length;
    
    for(var s = 1; lengthServicio >= s; s++)
    {
        var servicio = respuestaJSONServicios[s].nombreSe + ": COSTO $" + respuestaJSONServicios[s].costoSe;
        selectServicio += "<option value='";
        selectServicio += respuestaJSONServicios[s].idServicio;
        selectServicio += "'>";
        selectServicio += servicio;
        selectServicio += "</option>";
    }
    
    for(var m = 1; lengthMascotas >= m; m++)
    {
        var nombre = respuestaJSONUser.mascota[m].nombreMa;
        selectMascota += "<option value='";
        selectMascota += respuestaJSONUser.mascota[m].idMascota;
        selectMascota += "'>";
        selectMascota += nombre;
        selectMascota += "</option>";
    }
    
    //select de Mascota
    form += "<div class='6u 12u$(small)'>";
    form += "   <select name='idMascota' id='idMascota' onblur='validaText(this.value, textLlenarMascota())'>";
    form += "       <option value=''>- Selecciona Mascota -</option>";
    form += selectMascota;
    form += "   </select>";
    form += "   <label for='idMascota'>Mascota</label>";
    form += "</div>";
    
    //select de Servicio
    form += "<div class='6u$ 12u$(small)'>";
    form += "   <select name='idServicio' id='idServicio' onblur='validaText(this.value, textLlenarServicio())'>";
    form += "       <option value=''>- Selecciona Servicio -</option>";
    form += selectServicio;
    form += "   </select>";
    form += "   <label for='idServicio'>Servicio</label>";
    form += "</div>";
    
    form += "<div class='12u$' id='procesaCarga'>";
    form += "<p class='blue'>Selecciona un servicio para cargar el formulario</p>";
    form += "<hr>";
    form += "</div>";
    
    formAgregarCita.innerHTML = form;
    
    document.getElementById("idServicio").addEventListener("input", procesaCargaAgregar, false);
    btnCancelar("buttonAgregarCita", "buttonCancelarCita()");
}
/**
 * Funcion para seleccionar el servicio adecuado
 * @returns {undefined}
 */
function procesaCargaAgregar()
{
    var servicio = lee(form["idServicio"]);
    
    switch (servicio)
    {
        case "1":
            cargaPaseoAgregar();
            break;
        case "2":
            cargaGuarderiaAgregar();
            break;
        case "3":
            cargaHospedajeAgregar();
            break;
        default :
            document.getElementById("procesaCarga").innerHTML = "<p class='blue'>Selecciona un servicio para cargar el formulario</p><hr>";
    }
}
/**
 * Funcion para cargar los datos del servicio de paseo
 * @returns {undefined}
 */
function cargaPaseoAgregar()
{
    var form = "";
    var selectEmpleado = null;
    var procesaCarga = document.getElementById("procesaCarga");
    
    var lengthEmpleado = Object.keys(respuestaJSONEmpleados).length;
    
    for(var e = 1; lengthEmpleado >= e; e++)
    {
        var nombre = respuestaJSONEmpleados[e].nombreEm + " " + respuestaJSONEmpleados[e].aPaterno;
        selectEmpleado += "<option value='";
        selectEmpleado += respuestaJSONEmpleados[e].idEmpleado;
        selectEmpleado += "'>";
        selectEmpleado += nombre;
        selectEmpleado += "</option>";
    }
    
    //Etiqueta de fecha de reservacion
    form += "<div class='12u$'>";
    form += "   <input type='date' name='fInicio' id='fInicio' autocomplete='off' min='" + dateSystem() + "'";
    form += "       onblur='validaText(this.value, textLlenarFechaR())'/>";
    form += "   <label for='fInicio'>Fecha de reservacion</label>";
    form += "</div>";
    console.log(dateSystem());
    
    //select de Empleado
    form += "<div class='12u$'>";
    form += "   <select name='idEmpleado' id='idEmpleado' onblur='validaText(this.value, textLlenarEmpleado())'>";
    form += "       <option value=''>- Selecciona Empleado -</option>";
    form += selectEmpleado;
    form += "   </select>";
    form += "   <label for='idEmpleado'>Empleado</label>";
    form += "</div>";
    
    //Etiqueta de comentario
    form += "<div class='12u$'>";
    form += "   <textarea name='comentario' id='comentario' autocomplete='off' rows='2'";
    form += "       onblur='validaText(this.value, textLlenarComentario())'></textarea>";
    form += "   <label for='comentario'>Comentario</label>";
    form += "</div>";
    
    //Botones
    form += "<div class='12u$'>";
    form += "	<ul class='actions vertical'>";
    form += "		<li><a class='button special fit' onclick='agregarEventoPaseo()'/>Agregar</a></li>";
    form += "	</ul>";
    form += "</div>";
    
    //separador
    form += "<div class='12u$'>";
    form += "<hr>";
    form += "</div>";
    form += "<div class='12u$'>";
    form += "";
    form += "</div>";
    
    procesaCarga.innerHTML = form;
}
/**
 * Funcion para hacer la carga de los datos del servicio de guarderia
 * @returns {undefined}
 */
function cargaGuarderiaAgregar()
{
    var form = "";
    var selectEmpleado = null;
    var procesaCarga = document.getElementById("procesaCarga");
    
    var lengthEmpleado = Object.keys(respuestaJSONEmpleados).length;
    
    for(var e = 1; lengthEmpleado >= e; e++)
    {
        var nombre = respuestaJSONEmpleados[e].nombreEm + " " + respuestaJSONEmpleados[e].aPaterno;
        selectEmpleado += "<option value='";
        selectEmpleado += respuestaJSONEmpleados[e].idEmpleado;
        selectEmpleado += "'>";
        selectEmpleado += nombre;
        selectEmpleado += "</option>";
    }
    
    //Etiqueta de fecha de inicio
    form += "<div class='12u$'>";
    form += "   <input type='date' name='fInicio' id='fInicio' autocomplete='off' min='" + dateSystem() + "'";
    form += "       onblur='validaText(this.value, textLlenarFInicio(),igualarFecha(this.value))'/>";
    form += "   <label for='fInicio'>Fecha de Inicio</label>";
    form += "</div>";
    
    //Etiqueta de fecha de Termino
    form += "<div class='12u$'>";
    form += "   <input disabled type='date' name='fTermino' id='fTermino' autocomplete='off'/>";
    form += "   <label for='fTermino'>Fecha de Termino</label>";
    form += "</div>";
    
    //select de Empleado
    form += "<div class='12u$'>";
    form += "   <select name='idEmpleado' id='idEmpleado' onblur='validaText(this.value, textLlenarEmpleado())'>";
    form += "       <option value=''>- Selecciona Empleado -</option>";
    form += selectEmpleado;
    form += "   </select>";
    form += "   <label for='idEmpleado'>Empleado</label>";
    form += "</div>";
    
    //Etiqueta de comentario
    form += "<div class='12u$'>";
    form += "   <textarea name='comentario' id='comentario' autocomplete='off' rows='2'";
    form += "       onblur='validaText(this.value, textLlenarComentario())'></textarea>";
    form += "   <label for='comentario'>Comentario</label>";
    form += "</div>";
    
    //Botones
    form += "<div class='12u$'>";
    form += "	<ul class='actions vertical'>";
    form += "		<li><a class='button special fit' onclick='agregarEventoGuarderia()'/>Agregar</a></li>";
    form += "	</ul>";
    form += "</div>";
    
    //separador
    form += "<div class='12u$'>";
    form += "<hr>";
    form += "</div>";
    form += "<div class='12u$'>";
    form += "";
    form += "</div>";
    
    procesaCarga.innerHTML = form;
}
/**
 * Funcion para cargar la fecha de termino
 * @param {type} fecha
 * @returns {undefined}
 */
function igualarFecha(fecha)
{
    form["fTermino"].setAttribute("value", fecha);
}
/**
 * Funcion para hacer la carga de los componentes para el servicio de Hospedaje
 * @returns {undefined}
 */
function cargaHospedajeAgregar()
{
    var form = "";
    var selectEmpleado = null;
    var procesaCarga = document.getElementById("procesaCarga");
    
    var lengthEmpleado = Object.keys(respuestaJSONEmpleados).length;
    
    for(var e = 1; lengthEmpleado >= e; e++)
    {
        var nombre = respuestaJSONEmpleados[e].nombreEm + " " + respuestaJSONEmpleados[e].aPaterno;
        selectEmpleado += "<option value='";
        selectEmpleado += respuestaJSONEmpleados[e].idEmpleado;
        selectEmpleado += "'>";
        selectEmpleado += nombre;
        selectEmpleado += "</option>";
    }
    
    //Etiqueta de fecha de inicio
    form += "<div class='12u$'>";
    form += "   <input type='date' name='fInicio' id='fInicio' autocomplete='off' min='" + dateSystem() + "'";
    form += "       onblur='validaText(this.value, textLlenarFInicio())'/>";
    form += "   <label for='fInicio'>Fecha de Inicio</label>";
    form += "</div>";
    
    //Etiqueta de fecha de Termino
    form += "<div class='12u$'>";
    form += "   <input type='date' name='fTermino' id='fTermino' autocomplete='off'";
    form += "       onblur='validaText(this.value, textLlenarFTermino())'/>";
    form += "   <label for='fTermino'>Fecha de Termino</label>";
    form += "</div>";
    
    //select de Empleado
    form += "<div class='12u$'>";
    form += "   <select name='idEmpleado' id='idEmpleado' onblur='validaText(this.value, textLlenarEmpleado())'>";
    form += "       <option value=''>- Selecciona Empleado -</option>";
    form += selectEmpleado;
    form += "   </select>";
    form += "   <label for='idEmpleado'>Empleado</label>";
    form += "</div>";
    
    //Etiqueta de comentario
    form += "<div class='12u$'>";
    form += "   <textarea name='comentario' id='comentario' autocomplete='off' rows='2'";
    form += "       onblur='validaText(this.value, textLlenarComentario())'></textarea>";
    form += "   <label for='comentario'>Comentario</label>";
    form += "</div>";
    
    //Botones
    form += "<div class='12u$'>";
    form += "	<ul class='actions vertical'>";
    form += "		<li><a class='button special fit' onclick='agregarEventoGuarderia()'/>Agregar</a></li>";
    form += "	</ul>";
    form += "</div>";
    
    //separador
    form += "<div class='12u$'>";
    form += "<hr>";
    form += "</div>";
    form += "<div class='12u$'>";
    form += "";
    form += "</div>";
    
    procesaCarga.innerHTML = form;
}
/**
 * Funcion para cargar los input cargados con la informacion de la reservacion
 * @param {text} idDetalle
 * @returns {undefined}
 */
function buttonEditarCita(idDetalle)
{   
    idDetalleGlobal = idDetalle;
    var formAgregarCita = document.getElementById("formCita");
    var form = "";
    var selectServicio = null;
    var selectMascota = null;
    var selectEmpleado = null;
    var idServicio = null;
    var idMascota = null;
    var idEmpleado = null;
    var fechaInicio = null;
    var fechaTermino = null;
    var comentario = null;
    
    var lengthMascotas = Object.keys(respuestaJSONUser.mascota).length;
    var lengthServicio = Object.keys(respuestaJSONServicios).length;
    var lengthEmpleado = Object.keys(respuestaJSONEmpleados).length;
    
    //recorrido de la tabla de detalles
    for(var m = 1; Object.keys(respuestaJSONMascotas).length >= m; m++)
    {
        for(var d = 1; Object.keys(respuestaJSONMascotas["mas" + m].detalle).length >= d; d++)
        {
            if(respuestaJSONMascotas["mas" + m].detalle["det" + d].idDetalle === idDetalle)
            {
                idServicio = respuestaJSONMascotas["mas" + m].detalle["det" + d].idServicio;
                idMascota = respuestaJSONMascotas["mas" + m].detalle["det" + d].idMascota;
                idEmpleado = respuestaJSONMascotas["mas" + m].detalle["det" + d].idEmpleado;
                fechaInicio = respuestaJSONMascotas["mas" + m].reservacion["res" + d].fechaInicio;
                fechaTermino = respuestaJSONMascotas["mas" + m].reservacion["res" + d].fechaTermino;
                comentario = respuestaJSONMascotas["mas" + m].detalle["det" + d].comentario;
            }
        }
    }
    
    /**
    *length para el recorrido de los servicios
    */
    for(var s = 1; lengthServicio >= s; s++)
    {
        var servicio = respuestaJSONServicios[s].nombreSe + " $" + respuestaJSONServicios[s].costoSe;
        
        if(idServicio === respuestaJSONServicios[s].idServicio)
        {
            selectServicio += "<option selected value='";
            selectServicio += respuestaJSONServicios[s].idServicio;
            selectServicio += "'>";
            selectServicio += servicio;
            selectServicio += "</option>";
        }else
        {
            selectServicio += "<option value='";
            selectServicio += respuestaJSONServicios[s].idServicio;
            selectServicio += "'>";
            selectServicio += servicio;
            selectServicio += "</option>";
        }
    }
    //nombre de la mascota para el select
    for(var m = 1; lengthMascotas >= m; m++)
    {
        var nombre = respuestaJSONUser.mascota[m].nombreMa;
        
        if(respuestaJSONUser.mascota[m].idMascota === idMascota)
        {
            selectMascota += "<option selected value='";
            selectMascota += respuestaJSONUser.mascota[m].idMascota;
            selectMascota += "'>";
            selectMascota += nombre;
            selectMascota += "</option>";
        } else
        {
            selectMascota += "<option value='";
            selectMascota += respuestaJSONUser.mascota[m].idMascota;
            selectMascota += "'>";
            selectMascota += nombre;
            selectMascota += "</option>";
        }
    }
    
    //Recorrido de empleados para armar el select
    for(var e = 1; lengthEmpleado >= e; e++)
    {
        var nombre = respuestaJSONEmpleados[e].nombreEm + " " + respuestaJSONEmpleados[e].aPaterno;
        
        if(respuestaJSONEmpleados[e].idEmpleado === idEmpleado)
        {
            selectEmpleado += "<option selected value='";
            selectEmpleado += respuestaJSONEmpleados[e].idEmpleado;
            selectEmpleado += "'>";
            selectEmpleado += nombre;
            selectEmpleado += "</option>";
        } else
        {
            selectEmpleado += "<option value='";
            selectEmpleado += respuestaJSONEmpleados[e].idEmpleado;
            selectEmpleado += "'>";
            selectEmpleado += nombre;
            selectEmpleado += "</option>";
        }
    }
    //select de Mascota
    form += "<div class='6u 12u$(small)'>";
    form += "   <select disabled name='idMascota' id='idMascota' onblur='validaText(this.value, textLlenarMascota())'>";
    form += "       <option value=''>- Selecciona Mascota -</option>";
    form += selectMascota;
    form += "   </select>";
    form += "   <label for='idMascota'>Mascota</label>";
    form += "</div>";
    
    //select de Servicio
    form += "<div class='6u$ 12u$(small)'>";
    form += "   <select name='idServicio' id='idServicio' onblur='validaText(this.value, textLlenarServicio())'>";
    form += "       <option value=''>- Selecciona Servicio -</option>";
    form += selectServicio;
    form += "   </select>";
    form += "   <label for='idServicio'>Servicio</label>";
    form += "</div>";
    
    form += "<div class='12u$' id='procesaCarga'>";
    form += "<p class='blue'>Selecciona un servicio para cargar el formulario</p>";
    form += "<hr>";
    form += "</div>";
    
    selectEmpleadoGlobal = selectEmpleado;
    idMascotaGlobal = idMascota;
    idEmpleadoGlobal = idEmpleado;
    fechaInicioGlobal = fechaInicio;
    fechaTerminoGlobal = fechaTermino;
    comentarioGlobal = comentario;
    idServicioGlobal = idServicio;
    
    formAgregarCita.innerHTML = form;
    cargaGlobal = true;
    procesaCargaEditar();
    document.getElementById("idServicio").addEventListener("input", procesaCargaEditar, false);
    cargaGlobal = false;
    btnCancelar("buttonAgregarCita", "buttonCancelarCita()");
}

/**
 * funcion para el evento listener de la edicion de las reservaciones
 * @returns {undefined}
 */
function procesaCargaEditar()
{
    var servicio = lee(form["idServicio"]);
    
    if(cargaGlobal)
    {
        switch (idServicioGlobal)
        {
            case "1":
                cargaPaseoEditar();
                break;
            case "2":
                cargaGuarderiaEditar();
                break;
            case "3":
                cargaHospedajeEditar();
                break;
            default :
                document.getElementById("procesaCarga").innerHTML = "<p class='blue'>Selecciona un servicio para cargar el formulario</p><hr>";
        }
    }
    else
    {
        switch (servicio)
        {
            case "1":
                cargaPaseoEditar();
                break;
            case "2":
                cargaGuarderiaEditar();
                break;
            case "3":
                cargaHospedajeEditar();
                break;
            default :
                document.getElementById("procesaCarga").innerHTML = "<p class='blue'>Selecciona un servicio para cargar el formulario</p><hr>";
        }
    }
}

/**
 * Funcion para cargar la edicion del paseo
 * @returns {undefined}
 */
function cargaPaseoEditar()
{
    var procesaCarga = document.getElementById("procesaCarga");
    var form = "";
    
    //Etiqueta de fecha de reservacion
    form += "<div class='12u$'>";
    form += "   <input value='" + fechaInicioGlobal + "' type='date' name='fInicio' id='fInicio' autocomplete='off' min='" + dateSystem() + "'";
    form += "       onblur='validaText(this.value, textLlenarFechaR())'/>";
    form += "   <label for='fInicio'>Fecha de reservacion</label>";
    form += "</div>";
    
    //select de Empleado
    form += "<div class='12u$'>";
    form += "   <select name='idEmpleado' id='idEmpleado' onblur='validaText(this.value, textLlenarEmpleado())'>";
    form += "       <option value=''>- Selecciona Empleado -</option>";
    form += selectEmpleadoGlobal;
    form += "   </select>";
    form += "   <label for='idEmpleado'>Empleado</label>";
    form += "</div>";
    
    //Etiqueta de comentario
    form += "<div class='12u$'>";
    form += "   <textarea name='comentario' id='comentario' autocomplete='off' rows='2'";
    form += "       onblur='validaText(this.value, textLlenarComentario())'>" + comentarioGlobal + "</textarea>";
    form += "   <label for='comentario'>Comentario</label>";
    form += "</div>";
    
    //Botones
    form += "<div class='12u$'>";
    form += "	<ul class='actions vertical'>";
    form += "		<li><a class='button special fit' onclick='editarEventoPaseo(" + idDetalleGlobal + ")'/>Actualizar</a></li>";
    form += "	</ul>";
    form += "</div>";
    
    //separador
    form += "<div class='12u$'>";
    form += "<hr>";
    form += "</div>";
    form += "<div class='12u$'>";
    form += "";
    form += "</div>";
    
    procesaCarga.innerHTML = form;
}

function cargaGuarderiaEditar()
{
    var procesaCarga = document.getElementById("procesaCarga");
    var form = "";
    
    //Etiqueta de fecha de inicio
    form += "<div class='12u$'>";
    form += "   <input value='" + fechaInicioGlobal + "' type='date' name='fInicio' id='fInicio' autocomplete='off' min='" + dateSystem() + "'";
    form += "       onblur='validaText(this.value, textLlenarFInicio(),igualarFecha(this.value))'/>";
    form += "   <label for='fInicio'>Fecha de Inicio</label>";
    form += "</div>";
    
    //Etiqueta de fecha de Termino
    form += "<div class='12u$'>";
    form += "   <input disabled value='" + fechaInicioGlobal + "' type='date' name='fTermino' id='fTermino' autocomplete='off'/>";
    form += "   <label for='fTermino'>Fecha de Termino</label>";
    form += "</div>";
    
    //select de Empleado
    form += "<div class='12u$'>";
    form += "   <select name='idEmpleado' id='idEmpleado' onblur='validaText(this.value, textLlenarEmpleado())'>";
    form += "       <option value=''>- Selecciona Empleado -</option>";
    form += selectEmpleadoGlobal;
    form += "   </select>";
    form += "   <label for='idEmpleado'>Empleado</label>";
    form += "</div>";
    
    //Etiqueta de comentario
    form += "<div class='12u$'>";
    form += "   <textarea name='comentario' id='comentario' autocomplete='off' rows='2'";
    form += "       onblur='validaText(this.value, textLlenarComentario())'>" + comentarioGlobal + "</textarea>";
    form += "   <label for='comentario'>Comentario</label>";
    form += "</div>";
    
    //Botones
    form += "<div class='12u$'>";
    form += "	<ul class='actions vertical'>";
    form += "		<li><a class='button special fit' onclick='editarEventoOtros(" + idDetalleGlobal + ")'/>Actualizar</a></li>";
    form += "	</ul>";
    form += "</div>";
    
    //separador
    form += "<div class='12u$'>";
    form += "<hr>";
    form += "</div>";
    form += "<div class='12u$'>";
    form += "";
    form += "</div>";
    
    procesaCarga.innerHTML = form;
}

function cargaHospedajeEditar()
{
    var procesaCarga = document.getElementById("procesaCarga");
    var form = "";
    
    //Etiqueta de fecha de inicio
    form += "<div class='12u$'>";
    form += "   <input value='" + fechaInicioGlobal + "' type='date' name='fInicio' id='fInicio' autocomplete='off' min='" + dateSystem() + "'";
    form += "       onblur='validaText(this.value, textLlenarFInicio())'/>";
    form += "   <label for='fInicio'>Fecha de Inicio</label>";
    form += "</div>";
    
    //Etiqueta de fecha de Termino
    form += "<div class='12u$'>";
    form += "   <input value='" + fechaTerminoGlobal + "' type='date' name='fTermino' id='fTermino' autocomplete='off'";
    form += "       onblur='validaText(this.value, textLlenarFTermino())'/>";
    form += "   <label for='fTermino'>Fecha de Termino</label>";
    form += "</div>";
    
    //select de Empleado
    form += "<div class='12u$'>";
    form += "   <select name='idEmpleado' id='idEmpleado' onblur='validaText(this.value, textLlenarEmpleado())'>";
    form += "       <option value=''>- Selecciona Empleado -</option>";
    form += selectEmpleadoGlobal;
    form += "   </select>";
    form += "   <label for='idEmpleado'>Empleado</label>";
    form += "</div>";
    
    //Etiqueta de comentario
    form += "<div class='12u$'>";
    form += "   <textarea name='comentario' id='comentario' autocomplete='off' rows='2'";
    form += "       onblur='validaText(this.value, textLlenarComentario())'>" + comentarioGlobal + "</textarea>";
    form += "   <label for='comentario'>Comentario</label>";
    form += "</div>";
    
    //Botones
    form += "<div class='12u$'>";
    form += "	<ul class='actions vertical'>";
    form += "		<li><a class='button special fit' onclick='editarEventoOtros(" + idDetalleGlobal + ")'/>Actualizar</a></li>";
    form += "	</ul>";
    form += "</div>";
    
    //separador
    form += "<div class='12u$'>";
    form += "<hr>";
    form += "</div>";
    form += "<div class='12u$'>";
    form += "";
    form += "</div>";
    
    procesaCarga.innerHTML = form;
}
/**
 * Funcion para enlistar las mascotas
 * @returns {undefined}
 */
function listarMascotas()
{
    var tbodyMascota = document.getElementById("tbodyMascota");
    var tfootMascota = document.getElementById("tfootMascota");
    var mascotas = "";
    var foto = "";
    var nombre = "";
    var loadImage = "";

    if (typeof respuestaJSONUser.mascota !== "undefined")
    {
        if (Object.keys(respuestaJSONUser.mascota).length >= 1)
        {
            for (var i = 1; Object.keys(respuestaJSONUser.mascota).length >= i; i++)
            {
                foto = respuestaJSONUser.archivo[i].foto;
                nombre = respuestaJSONUser.mascota[i].nombreMa;
                
                if(foto !== "")
                {
                    loadImage = "   <td><a class='image-popup-no-margins' href='" + foto + "' title='" + nombre + "'>";
                    loadImage += "       <img src='" + foto + "' width='35'></a></td>";
                }
                else
                    loadImage = "<td>Sin Foto</td>";
                    
                mascotas += "<tr>";
                mascotas += "   <td id=" + i + ">" + nombre + "</td>";
                mascotas += "   <td>" + respuestaJSONUser.raza[i].nombreRa + "</td>";
                mascotas += "   <td>" + respuestaJSONUser.tipo[i].tamano + "</td>";
                mascotas += loadImage;
                mascotas += "    <td>";
                mascotas += "        <span onclick='buttonEditarMascota(this.id)' id='" + respuestaJSONUser.mascota[i].idMascota + "' class='lsf symbol editarMargen' title='Editar' >edit</span>";
                mascotas += "        <span onclick='buttonEliminarMascota(this.id)' id='" + respuestaJSONUser.mascota[i].idMascota + "' class='lsf symbol borrar' title='Borrar'>delete</span>";
                mascotas += "    </td>";
                mascotas += "</tr>";
            }
            
            document.getElementById("buttonAgregarCita").setAttribute("onclick", "buttonAgregarCita()");
            tbodyMascota.innerHTML = mascotas;
            tfootMascota.innerHTML = "";
        } 
        else
            errListarmascotas(tbodyMascota, tfootMascota, mascotas);
    } 
    else
        errListarmascotas(tbodyMascota, tfootMascota, mascotas);
   imagen();
}
/**
 * Funcion para enlistar el error de mascotas cuando no hay registradas
 * @param {object} tbodyMascota
 * @param {object} tfootMascota
 * @param {text} mascotas
 * @returns {undefined}
 */
function errListarmascotas(tbodyMascota, tfootMascota, mascotas)
{
    mascotas = "<tr>";
    mascotas += "   <td colspan='5'>" + textNoMascotas() + "</td>";
    mascotas += "</tr>";

    document.getElementById("buttonAgregarCita").setAttribute("onclick", "alerta(textNoMascotas())");
    tbodyMascota.innerHTML = "";
    tfootMascota.innerHTML = mascotas;
}

/**
 * Funcion para enlistar las citas registradas
 * @returns {undefined}
 */
function listarCitas()
{
    var tbodyReservacion = document.getElementById("tbodyReservacion");
    var tfootReservacion = document.getElementById("tfootReservacion");

    var reservacion = "";
    var nombreMa = null;
    var servicioP = null;
    var servicio = null;

    if (typeof respuestaJSONMascotas !== "undefined")
    {
        if (Object.keys(respuestaJSONMascotas).length >= 1)
        {
            for (var m = 1; Object.keys(respuestaJSONMascotas).length >= m; m++)
            {
                nombreMa = respuestaJSONMascotas["mas" + m].nombre;

                for (var d = 1; Object.keys(respuestaJSONMascotas["mas" + m].detalle).length >= d; d++)
                {
                    servicioP = respuestaJSONMascotas["mas" + m].detalle["det" + d].idServicio;

                    reservacion += "<tr>";
                    reservacion += "    <td>" + nombreMa + "</td>";

                    for (var s = 1; Object.keys(respuestaJSONServicios).length >= s; s++)
                    {
                        servicio = respuestaJSONServicios[s].idServicio;
                        if (servicio === servicioP)
                        {
                            reservacion += "    <td>" + respuestaJSONServicios[s].nombreSe + "</td>";
                        }
                        servicio = null;
                    }

                    reservacion += "    <td>" + respuestaJSONMascotas["mas" + m].reservacion["res" + d].fechaTermino + "</td>";
                    reservacion += "    <td>$" + respuestaJSONMascotas["mas" + m].reservacion["res" + d].total + "</td>";
                    reservacion += "    <td>";
                    reservacion += "        <span onclick='buttonEditarCita(this.id)' id='" + respuestaJSONMascotas["mas" + m].detalle["det" + d].idDetalle + "' class='lsf symbol editarMargen' title='Editar'>edit</span>";
                    reservacion += "        <span onclick='buttonEliminarCita(this.id)' id='" + respuestaJSONMascotas["mas" + m].detalle["det" + d].idDetalle + "' class='lsf symbol borrar' title='Borrar'>delete</span>";
                    reservacion += "    </td>";
                    reservacion += "</tr>";
                }
            }
            tbodyReservacion.innerHTML = reservacion;
            tfootReservacion.innerHTML = "";
        } 
        else
            errLisarCitas(tbodyReservacion, tfootReservacion);
    } 
    else
        errLisarCitas(tbodyReservacion, tfootReservacion);
}
/**
 * Funcion para enlistar el error de eventos cuando no hay registrados
 * @param {object} tbodyReservacion
 * @param {object} tfootReservacion
 * @param {text} reservacion
 * @returns {undefined}
 */
function errLisarCitas(tbodyReservacion, tfootReservacion, reservacion)
{
    reservacion = "<tr>";
    reservacion += "   <td colspan='5'>" + textNoCitas() + "</td>";
    reservacion += "</tr>";
    tbodyReservacion.innerHTML = "";
    tfootReservacion.innerHTML = reservacion;
}
