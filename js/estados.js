export function renderizarEstado(estado, dados = {}) {

    const status = document.querySelector("#status");

    status.textContent = "";

    const caixa = document.createElement("div");

    caixa.className = "estado";

    const titulo = document.createElement("h2");

    const mensagem = document.createElement("p");

    if (estado === "carregando") {

        caixa.classList.add("estado--carregando");

        titulo.textContent = "Carregando tarefas...";

        mensagem.textContent =
            "Aguarde enquanto os dados são carregados.";

    }

    else if (estado === "sucesso") {

        caixa.classList.add("estado--sucesso");

        titulo.textContent = "Tarefas carregadas";

        mensagem.textContent =
            `${dados.quantidade} tarefa(s) carregada(s) com sucesso.`;

    }

    else if (estado === "vazio") {

        caixa.classList.add("estado--vazio");

        titulo.textContent = "Nenhuma tarefa encontrada";

        mensagem.textContent =
            "Não existem tarefas cadastradas no momento.";

    }

    else if (estado === "erro") {

        caixa.classList.add("estado--erro");

        titulo.textContent =
            "Não foi possível carregar as tarefas";

        mensagem.textContent =
            dados.mensagem || "Ocorreu um erro inesperado.";

    }

    caixa.appendChild(titulo);

    caixa.appendChild(mensagem);

    status.appendChild(caixa);
}