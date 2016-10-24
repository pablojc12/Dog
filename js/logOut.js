/* global server, pagina */

function logOut()
{
    objetoJSON = {
        "file": "logOut"
    };
    
    console.log(objetoJSON);
    $.ajax({
        url: server,
        type: "post",
        dataType: "json",
        data: objetoJSON
    }).done(function(respuestaJSON){
        window.location.reload();
    })
    .fail(function (data) 
        {
            error(textSinRespuesta());
            console.log(data);
        });
}


