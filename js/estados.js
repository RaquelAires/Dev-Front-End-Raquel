export function renderizarEstado(estadoAtual, dados = {}) {

    const elementoStatus =
        document.querySelector("#status");


    if (estadoAtual === "carregando") {

        elementoStatus.textContent =
            "Carregando tarefas...";

        return;
    }


    if (estadoAtual === "erro") {

        elementoStatus.textContent =
            dados.mensagem;

        return;
    }


    if (estadoAtual === "vazio") {

        elementoStatus.textContent =
            "Não há tarefas cadastradas na origem de dados.";

        return;
    }


    if (estadoAtual === "sem-resultados") {

        elementoStatus.textContent =
            "Nenhuma tarefa corresponde aos critérios. Altere ou limpe os filtros.";

        return;
    }


    if (estadoAtual === "sucesso") {

        elementoStatus.textContent =
            `${dados.quantidade} de ${dados.total} tarefas.`;

        return;
    }
}