//archivo de constantes para los mensajes del sistema 
//______________________________________________________________________________
//Constantes generales
/**
 * Variable para hacer la seleccion de componentes del 
 * formulario general dentro del html
 * @form formulario general
 */
const form = document["form"];

/**
 * almacenamieto de la ruta hacia el servidor 
 * "assets/server/server.php"
 * @param {text} server
 */
const server = "assets/server/server.php";

/**
 * Contantes para las acciones de ajax
 */
const registrado = "registrado";
const guardado = "guardado";
const noGuardado = "noGuardado";
const actualizado = "actualizado";
const borrado = "borrado";
const err = "error";
const evento = "evento";

//______________________________________________________________________________
// Mensajes de error 
/**
 * Contraseñas diferentes
 * @returns {String}
 */
function textErrorPassword() { return "Contraseñas diferentes";}
/**
 * Contraseña menor de 6 digitos
 * @returns {String}
 */
function textErrorPassword1() { return "Contraseña menor de 6 digitos";}
/**
 * Correo electonico invalido
 * @returns {String}
 */
function textErrorMail() { return "Correo electonico invalido";}
/**
 * "Nombre Incorrecto"
 * @returns {String}
 */
function textErrorNombre() { return "Nombre Incorrecto";}
/**
 * Apellido Paterno Incorrecto
 * @returns {String}
 */
function textErrorAPaterno() { return "Apellido Paterno Incorrecto";}
/**
 * Apellido Materno Incorrecto
 * @returns {String}
 */
function textErrorAMaterno() { return "Apellido Materno Incorrecto";}
/**
 * Formato de facha Incorrecto
 * @returns {String}
 */
function textErrorFNacimiento() { return "Formato de facha Incorrecto";}
/**
 * La variable de carga no se encuentra entre las opciones
 * @returns {String}
 */
function textErrorSeleccion() { return "La variable de carga no se encuentra entre las opciones";}
/**
 * Formato de texto Incorrecto
 * @returns {String}
 */
function textErrorComentario() { return "Formato de texto Incorrecto";}
/**
 * La fecha ingresada no pede ser hoy ni de antes
 * @returns {String}
 */
function textErrorFMenor() { return "La fecha ingresada no pede ser hoy ni de antes";}
/**
 * La fecha de termino no puede ser menor a la fecha de Inicio
 * @returns {String}
 */
function textFechaUnoMayor() { return "La fecha de termino no puede ser menor a la fecha de Inicio";}
/**
 * La fecha de la reservacion esta proxima, por tal motivo no puedes eliminar esta reservacion
 * @returns {String}
 */
function textFechaMenor() { return "La fecha de reservacion es hoy o ya paso, por tal motivo no puedes eliminar esta reservación";}
/**
 * La fecha de reservacion es hoy o ya paso, por tal motivo no puedes modificar esta reservación
 * @returns {String}
 */
function textFechaMenorA() { return "La fecha de reservacion es hoy o ya paso, por tal motivo no puedes modificar esta reservación";}
/**
 * El correo o la contraseña son incorrectos
 * @returns {String}
 */
function textCorreoOPasInv() { return "El correo o la contraseña son incorrectos";}
//______________________________________________________________________________
// Mensajes de campos vacios
/**
 * Falta contraseña
 * @returns {String}
 */
function textLlenarPas() {return "Falta contraseña";}
/**
 * Falta repetir contraseña
 * @returns {String}
 */
function textLlenarPas1() {return "Falta repetir contraseña";}
/**
 * Falta Nombre
 * @returns {String}
 */
function textLlenarNombre() {return "Falta Nombre";}
/**
 * Falta Apellido Paterno
 * @returns {String}
 */
function textLlenarAPaterno() {return "Falta Apellido Paterno";}
/**
 * Falta Apellido Materno
 * @returns {String}
 */
function textLlenarAMaterno() {return "Falta Apellido Materno";}
/**
 * Falta Fecha de Nacimiento
 * @returns {String}
 */
function textLlenarFechaN() {return"Falta Fecha de Nacimiento";}
/**
 * Falta Correo Electronico
 * @returns {String}
 */
function textLlenarMail() {return "Falta Correo Electronico";}
/**
 * Antes de continuar, le solicitamos terminar el registro
 * @returns {String}
 */
function textLlenarPerfil() { return "Antes de continuar, le solicitamos terminar el registro de sus datos personales";}
/**
 * Selecciona Raza
 * @returns {String}
 */
function textLlenarRaza() { return "Selecciona Raza";}
/**
 * Seleccione Tipo de Raza
 * @returns {String}
 */
function textLlenarTipo() { return "Selecciona Tipo de Raza";}
/**
 * Seleccionar servicio
 * @returns {String}
 */
function textLlenarServicio() { return "Selecciona servicio";}
/**
 * Selecciona empleado
 * @returns {String}
 */
function textLlenarEmpleado() { return "Selecciona empleado";}
/**
 * Selecciona mascota
 * @returns {String}
 */
function textLlenarMascota() { return "Selecciona mascota";}
/**
 * Selecciona fecha de reservacion
 * @returns {String}
 */
function textLlenarFechaR() { return "Selecciona fecha de reservacion";}
/**
 * Seleccione fecha de Inicio
 * @returns {String}
 */
function textLlenarFInicio() { return "Selecciona fecha de Inicio";}
/**
 * Seleccione fecha de Termino
 * @returns {String}
 */
function textLlenarFTermino() { return "Selecciona fecha de Termino";}
/**
 * Deja un comentario
 * @returns {String}
 */
function textLlenarComentario() { return "Deja un comentario";}
//______________________________________________________________________________
//mensajes de ajaxLoad (base de datos)
/**
 * Los datos se almacenaron Corectamente
 * @returns {String}
 */
function textGuardado() {return "Informacion almacenada Corectamente";}
/**
 * Sin respuesta del servidor
 * @returns {String}
 */
function textSinRespuesta() {return "Sin respuesta del servidor";}
/**
 * Los datos no se pudieron almacenar
 * @returns {String}
 */
function textNoGuardado() {return "Los datos no se pudieron almacenar";}
/**
 * Los datos fueron actualizados
 * @returns {String}
 */
function textActualizado() {return "Datos actualizados con exito";}
/**
 * ENVIANDO
 * @returns {String}
 */
function textEnviando() {return "ENVIANDO";}
/**
 * Los datos se Borraron con exito
 * @returns {String}
 */
function textBorrado() {return "Datos borrados con exito";}
/**
 * Respuesta invalida del servidor
 * @returns {String}
 */
function textRespInvalida() {return "Respuesta invalida del servidor";}
/**
 * El correo ya a sido regstrado con anterioridad
 * @returns {String}
 */
function textUseRegistrado() {return "El correo ya a sido registrado con anterioridad";}
/**
 * La mascota cuenta con una fecha de reservacion proxima, no puedes agregar otra
 * @returns {String}
 */
function textMasRegRes() { return "La mascota cuenta con una fecha de reservacion proxima, no puedes agregar otra";}
/**
 * La mascota que quiere eliminar tiene un evento pendiente, por tal motivo no se eliminara
 * @returns {String}
 */
function textCitaRegistrada() { return "La mascota que quiere eliminar tiene citas registradas, por tal motivo no se eliminara";}
//______________________________________________________________________________
//Nombres y acciones de ajax para el abcc de la base de datos
/**
 * guardar
 * @returns {String}
 */
function textGuardar() {return "guardar";}
/**
 * borrar
 * @returns {String}
 */
function textBorrar() {return "borrar";}
/**
 * actualizar
 * @returns {String}
 */
function textActualizar() {return "actualizar";}
/**
 * consultar
 * @returns {String}
 */
function textConsultar() {return "consultar";}
/**
 * Error interno de php para la comunicacion con la base de datos
 * @returns {String}
 */
function textErrorInterno() {return "Error interno del servidor para la comunicacion con la base de datos";}
//______________________________________________________________________________
//Campos de los label de html
/**
 * Nombre(s)
 * @returns {String}
 */
function textNombres() { return "Nombre(s)";}
/**
 * Apellido Paterno
 * @returns {String}
 */
function textAPaterno() { return "Apellido Paterno";}
/**
 * Apellido Materno
 * @returns {String}
 */
function textAMaterno() { return "Apellido Materno";}
/**
 * Fecha de Nacimiento
 * @returns {String}
 */
function textFNacimiento() { return "Fecha de Nacimiento";}
/**
 * Correo
 * @returns {String}
 */
function textCorreo() { return "Correo";}
/**
 * No hay mascotas registradas
 * @returns {String}
 */
function textNoMascotas() { return "No hay mascotas registradas";}
/**
 * Ho hay eventos pendientes
 * @returns {String}
 */
function textNoCitas() { return "Ho hay eventos pendientes";}


