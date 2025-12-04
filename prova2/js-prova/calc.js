 let display = document.getElementById("display");
 const operadores = "+-*/";

function pressionar(valor) {
    const operadores = "+-*/";

    if (display.textContent === "0" && !operadores.includes(valor)) {
        display.textContent = valor;
        return;
    }

    const ultimo = display.textContent.slice(-1);

    if (operadores.includes(ultimo) && operadores.includes(valor)) {
        display.textContent = display.textContent.slice(0, -1) + valor;
        return;
    }

    display.textContent += valor;
}

function limpar() {
    display.textContent = "0";
}

function apagar() {
    let texto = display.textContent;
    if (texto.length === 1) {
        display.textContent = "0";
    } else {
        display.textContent = texto.slice(0, -1);
    }
}

function calcular() {
    try {
        let expressao = display.textContent;
        let resultado = eval(expressao);
        display.textContent = resultado;
    } catch {
        display.textContent = "Erro";
    }
}