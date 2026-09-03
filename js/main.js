import { carregarTarefas } from "./api.js";

import { renderizarEstado } from "./estados.js";

import { renderizarTarefas } from "./renderizacao.js";


async function iniciarAplicacao() {

    renderizarEstado("carregando");


    try {

        const tarefas = await carregarTarefas();

        if (tarefas.length === 0) {

            renderizarEstado("vazio");

            return;

        }

        renderizarTarefas(tarefas);

        renderizarEstado("sucesso", {

            quantidade: tarefas.length

        });

    }

    catch (erro) {

        console.error(erro);


        let mensagem;


        if (erro.name === "TypeError") {

            mensagem =
                "Erro de rede. Não foi possível acessar os dados.";

        }

        else if (erro.name === "SyntaxError") {

            mensagem =
                "Erro de formato. O arquivo JSON está inválido.";

        }

        else if (
            typeof erro.message === "string" &&
            erro.message.startsWith("HTTP")
        ) {

            mensagem =
                `Erro de protocolo: ${erro.message}.`;

        }

        else {

            mensagem =
                "Ocorreu um erro inesperado ao carregar as tarefas.";

        }

        renderizarEstado("erro", {

            mensagem: mensagem

        });

    }

}

iniciarAplicacao();