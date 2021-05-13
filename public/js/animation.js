$(document).ready(function () {
    //Quitamos la animacion.
    function removeTitleAnimation() {
        $("#text_home").removeClass("text_home_animate")
    }

    //Agregamos la animacion a las palabras.
    function changeWords() {
        var word = $("#word").text();
        if (word == 'facil') {
            $("#word").text('rapido');
        }else if(word == 'rapido'){
            $("#word").text('seguro');
        }else{
            $("#word").text('facil');
        }
    }

    setInterval(changeWords,5000);
    setTimeout(removeTitleAnimation,10000);
});
