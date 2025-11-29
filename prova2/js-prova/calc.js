let display = document.getElementById("display");

    function pressionar(valor) {
        if (display.textContent === "0") {
            display.textContent = valor;
        } else {
            display.textContent += valor;
        }
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
            let resultado = eval(display.textContent);
            display.textContent = resultado;
        } catch {
            display.textContent = "Erro";
        }
    }