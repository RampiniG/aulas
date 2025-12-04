let notas = [];
let notaSelecionada = null;

function listarNotas() {
    const lista = document.getElementById("listaNotas");
    lista.innerHTML = "";

    notas.forEach((nota, index) => {
        const item = document.createElement("li");
        item.textContent = nota.titulo;
        item.onclick = () => abrirNota(index);
        lista.appendChild(item);
    });
}

function criarNota() {
    const titulo = prompt("Título da nota:");
    const texto = prompt("Texto da nota:");

    if (!titulo || !texto) return;

    notas.push({ titulo, texto });
    listarNotas();
}

function abrirNota(index) {
    notaSelecionada = index;
    alert("Título: " + notas[index].titulo + "\n\n" + notas[index].texto);
}

function editarNota() {
    if (notaSelecionada === null) return alert("Nenhuma nota aberta.");

    const novaNota = prompt("Novo texto:", notas[notaSelecionada].texto);
    if (!novaNota) return;

    notas[notaSelecionada].texto = novaNota;
    listarNotas();
}

function excluirNota() {
    if (notaSelecionada === null) return alert("Nenhuma nota aberta.");

    if (confirm("Excluir esta nota?")) {
        notas.splice(notaSelecionada, 1);
        notaSelecionada = null;
        listarNotas();
    }
}
