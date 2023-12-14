const jugar = document.querySelector("#jugar");
var puntuación = 0;
var puntuacionMaxima = localStorage.getItem('puntuacionMaxima') || 0; 
var intervalo;
var comidaX;
var comidaY;
var serpienteX = 15;
var serpienteY = 15;
var direccionX = 0; 
var direccionY = 0; 
var crecimiento = [{ x: 15, y: 15 }];
var resultado = document.getElementById("resultado");
var resultado1 = document.getElementById("resultado1");

function crear() {
    resultado.textContent = "Puntuación: " + puntuación;
    resultado1.textContent = "Puntuación Máxima: " + puntuacionMaxima;
    var creacion = "<div id='comida' style='grid-area: " + comidaY + " / " + comidaX + "'></div>";
    crecimiento.forEach(segmento => {
        creacion += "<div class='serpiente' style='grid-area: " + segmento.y + " / " + segmento.x + "'></div>";
    });
    jugar.innerHTML = creacion;
}

function aleatorio() {
    comidaX = Math.floor(Math.random() * 30) + 1;
    comidaY = Math.floor(Math.random() * 30) + 1;
}

function moverSerpiente() {
    serpienteX += direccionX;
    serpienteY += direccionY;
    borrar();
    crear();
}

function iniciarMovimiento() {
    intervalo = setInterval(moverSerpiente, 200);
}

function detenerMovimiento() {
    clearInterval(intervalo);
}

function borrar() {
    var seguimiento = { x: serpienteX, y: serpienteY };
    crecimiento.unshift(seguimiento);

    if (comidaX === serpienteX && comidaY === serpienteY) {
        puntuación++;
        if (puntuación > puntuacionMaxima) {
            puntuacionMaxima = puntuación; 
            localStorage.setItem('puntuacionMaxima', puntuacionMaxima); 
        }
        resultado.textContent = "Puntuación: " + puntuación;
        resultado1.textContent = "Puntuación Máxima: " + puntuacionMaxima;

        aleatorio();
        var creacion = "<div id='comida' style='grid-area: " + comidaY + " / " + comidaX + "'></div>";
        jugar.innerHTML = creacion;

    } else{
        crecimiento.pop();
    }

    if (serpienteX >= 31 || serpienteX <= 0 || serpienteY >= 31 || serpienteY <= 0){
        window.alert("GAME OVER");
        detenerMovimiento();
        location.reload();
    }
    
    for (var i = 1; i < crecimiento.length; i++) {
        if (serpienteX === crecimiento[i].x && serpienteY === crecimiento[i].y) {
            window.alert("GAME OVER, chocaste con tu cuerpo");
            detenerMovimiento();
            location.reload();
        }
    }
}
document.addEventListener("keydown", function (evento) {
    if (evento.code === "ArrowLeft" && direccionX !== 1) {
        direccionX = -1;
        direccionY = 0;
    } else if (evento.code === "ArrowRight" && direccionX !== -1) {
        direccionX = 1;
        direccionY = 0;
    } else if (evento.code === "ArrowUp" && direccionY !== 1) {
        direccionX = 0;
        direccionY = -1;
    } else if (evento.code === "ArrowDown" && direccionY !== -1) {
        direccionX = 0;
        direccionY = 1;
    }
    
});
iniciarMovimiento();
aleatorio();
