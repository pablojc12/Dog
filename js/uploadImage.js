/* global server */

/**
 * Funcion anonima para subir la imagen del usuario
 * @returns {undefined}
 */
$(function() {
    // Botón para subir la imagen
    $('#loader1').hide();
    var imagen1 = $('#img1'), interval;

    new AjaxUpload('#img1', {
        action: "assets/server/uploadImagen.php",
        onSubmit: function (file, ext) {
            if (!(ext && /^(jpg|png)$/.test(ext))) {
                // extensiones permitidas
                alerta('<p class="black">Solo se permiten Imagenes .jpg o .png</p>', "");
                // cancela upload
                return false;
            } else {
                $('#loader1').show();
                this.disable();
            }
        },
        onComplete: function (file, response) 
        {
            var respuesta = $.parseJSON(response);
            var nombreAnterior = $("#img1").attr("name");

            if (respuesta.respuesta === 'done')
            {
                imagenComplete(nombreAnterior, respuesta.fileName);

                $('#img1').removeAttr('src');
                $('#img1').removeAttr('name');
                $('#img1').attr('src', 'images/upload/' + respuesta.fileName);
                $('#img1').attr('name', respuesta.fileName);
                $('#loader1').hide();
            } else {
                alerta('<p class="black">' + respuesta.mensaje + '</p>', "");
            }
            $('#loader1').hide();
            this.enable();
        }
    });
});

/**
 * Funcion anonima para subir la imagen de la mascota
 * @returns {undefined}
 */
$(function() {
    $('#loaderMascota').hide();
    var imagen1 = $('#imgMascota'), interval;

    new AjaxUpload('#imgMascota', {
        action: "assets/server/uploadImagen.php",
        onSubmit: function (file, ext) {
            if (!(ext && /^(jpg|png)$/.test(ext))) {
                // extensiones permitidas
                alerta('<p class="black">Solo se permiten Imagenes .jpg o .png</p>', "");
                // cancela upload
                return false;
            } else {
                $('#loaderMascota').show();
                this.disable();
            }
        },
        onComplete: function (file, response) {
            var respuesta = $.parseJSON(response);
            /**
             * esta variable contiene el id de la mascota y la ubicacion de la imagen 
             * @type jQuery
             */
            var nombreAnterior = $("#imgMascota").attr("name");

            if (respuesta.respuesta === 'done')
                imagenComplete(nombreAnterior, respuesta.fileName);
            else {
                alerta('<p class="black">' + respuesta.mensaje + '</p>', "");
            }
            $('#loaderMascota').hide();
            this.enable();
        }
    });
});

function imagenComplete(imagenVieja, imagenNueva)
{
    
    var array = imagenVieja.split("?");
    var id = array[1];
    var tabla = array[2];
    imagenVieja = array[0];
    array = imagenVieja.split("/");
    imagenVieja = array[Object.keys(array).length - 1];
    
    var objetoJSON = {
        "file": "checkImage",
        "imagenVieja": imagenVieja,
        "imagenNueva": imagenNueva,
        "id": id,
        "tabla": tabla
    };

    $.ajax({
        url: server,
        type: "post",
        dataType: "json",
        data: objetoJSON,
        success:
                function (data) {
                    restart();
                },
        error: function (data) {
            error(textErrorInterno());
            console.log(data);
        }
    });
    
}