let notas = JSON.parse(localStorage.getItem("notas")) || [];

let notaAtual = null;

function atualizarLista() {
    const lista = document.getElementById("notas");
    lista.innerHTML = "";

    notas.forEach((nota, index) => {
        const item = document.createElement("div");
        item.className = "nota-item";
        item.textContent = nota.titulo || "Nota sem título";

        item.addEventListener("click", () => abrirNota(index));

        lista.appendChild(item);
    });
}

function abrirNota(index) {
    notaAtual = index;
    const nota = notas[index];

    document.getElementById("tituloNota").textContent = nota.titulo;
    document.getElementById("conteudo").value = nota.conteudo;
}

function salvarNota() {
    if (notaAtual === null) return;

    const conteudo = document.getElementById("conteudo").value;

    const primeiraLinha = conteudo.split("\n")[0];

    notas[notaAtual] = {
        titulo: primeiraLinha || "Nota sem título",
        conteudo: conteudo
    };

    salvarLocalStorage();
    atualizarLista();
}

function salvarLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

document.getElementById("novaNota").addEventListener("click", () => {
    notas.push({
        titulo: "Nova nota",
        conteudo: ""
    });

    notaAtual = notas.length - 1;
    salvarLocalStorage();
    atualizarLista();
    abrirNota(notaAtual);
});

document.getElementById("salvar").addEventListener("click", salvarNota);

document.getElementById("excluir").addEventListener("click", () => {
    if (notaAtual === null) return;

    const certeza = confirm("Tem certeza que deseja excluir esta nota?");
    if (!certeza) return;

    notas.splice(notaAtual, 1); // remove a nota
    salvarLocalStorage();
    atualizarLista();

    notaAtual = null;
    document.getElementById("tituloNota").textContent = "";
    document.getElementById("conteudo").value = "";
});

atualizarLista();
