export async function carregarTarefas() {

    const resposta = await fetch("../dados.json");

    if (!resposta.ok) {
        throw new Error(`HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (!dados || !Array.isArray(dados.tarefas)) {
        throw new SyntaxError("O arquivo JSON não possui uma lista de tarefas válida.");
    }

    return dados.tarefas;
}