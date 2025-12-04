let milissegundos = 0;
let segundos = 0;
let minutos = 0;

let intervalo = null;
let rodando = false;

const display = document.getElementById("display");
const startStop = document.getElementById("startStop");
const reset = document.getElementById("reset");
const historico = document.getElementById("historico");

function atualizarDisplay() {
    let m = minutos < 10 ? "0" + minutos : minutos;
    let s = segundos < 10 ? "0" + segundos : segundos;
    let ms = milissegundos < 10 ? "0" + milissegundos : milissegundos;

    display.textContent = `${m}:${s}:${ms}`;
}

function iniciarCronometro() {
    milissegundos++;

    if (milissegundos === 100) {
        milissegundos = 0;
        segundos++;
    }

    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }

    atualizarDisplay();
}

startStop.addEventListener("click", function () {
    if (!rodando) {
        intervalo = setInterval(iniciarCronometro, 10);
        startStop.textContent = "Parar";
        rodando = true;
    } else {
        clearInterval(intervalo);
        startStop.textContent = "Iniciar";
        rodando = false;
        let timestamp = display.textContent;
        console.log("Tempo registrado: " + timestamp);
        const item = document.createElement("li");
        item.textContent = timestamp;
        historico.appendChild(item);
    }
});

reset.addEventListener("click", function () {
    clearInterval(intervalo);
    milissegundos = 0;
    segundos = 0;
    minutos = 0;
    atualizarDisplay();
    startStop.textContent = "Iniciar";
    rodando = false;
});
atualizarDisplay();