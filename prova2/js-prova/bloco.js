// Lista de notas (carrega do localStorage)
let notas = JSON.parse(localStorage.getItem("notas")) || [];

// Nota atualmente aberta
let notaAtual = null;

// Atualiza a lista no painel esquerdo
function atualizarLista() {
    const lista = document.getElementById("notas");
    lista.innerHTML = "";

    notas.forEach((nota, index) => {
        const item = document.createElement("div");
        item.className = "nota-item";
        item.textContent = nota.titulo || "Nota sem título";

        // Abrir a nota ao clicar
        item.addEventListener("click", () => abrirNota(index));

        lista.appendChild(item);
    });
}

// Abre uma nota no editor
function abrirNota(index) {
    notaAtual = index;
    const nota = notas[index];

    document.getElementById("tituloNota").textContent = nota.titulo;
    document.getElementById("conteudo").value = nota.conteudo;
}

// Salva alterações da nota atual
function salvarNota() {
    if (notaAtual === null) return;

    const conteudo = document.getElementById("conteudo").value;

    // Primeira linha vira o título
    const primeiraLinha = conteudo.split("\n")[0];

    notas[notaAtual] = {
        titulo: primeiraLinha || "Nota sem título",
        conteudo: conteudo
    };

    salvarLocalStorage();
    atualizarLista();
}

// Salva no localStorage
function salvarLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

// Criar nova nota
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

// Salvar
document.getElementById("salvar").addEventListener("click", salvarNota);

// Excluir com confirmação
document.getElementById("excluir").addEventListener("click", () => {
    if (notaAtual === null) return;

    const certeza = confirm("Tem certeza que deseja excluir esta nota?");
    if (!certeza) return;

    notas.splice(notaAtual, 1); // remove a nota
    salvarLocalStorage();
    atualizarLista();

    // Limpa o editor
    notaAtual = null;
    document.getElementById("tituloNota").textContent = "";
    document.getElementById("conteudo").value = "";
});

// Inicializa a aplicação
atualizarLista();
