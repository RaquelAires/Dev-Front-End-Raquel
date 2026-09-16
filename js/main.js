import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { renderizarTarefas } from "./renderizacao.js";

const estado = {

    tarefas: [],

    busca: "",

    status: "todos",

    prioridade: "todas",

    ordenacao: "nenhuma",

    carregamento: "carregando",

    erro: null
};

const campoBusca =
    document.querySelector("#busca");

const filtroStatus =
    document.querySelector("#filtro-status");

const filtroPrioridade =
    document.querySelector("#filtro-prioridade");

const filtroOrdenacao =
    document.querySelector("#ordenacao");

const botaoLimpar =
    document.querySelector("#limpar-filtros");

function derivarTarefas(estado) {

    let tarefasVisiveis = [...estado.tarefas];

    if (estado.busca !== "") {

        const termo =
            estado.busca.toLowerCase();

        tarefasVisiveis =
            tarefasVisiveis.filter(function(tarefa) {

                return tarefa.titulo
                    .toLowerCase()
                    .includes(termo);

            });
    }

    if (estado.status !== "todos") {

        tarefasVisiveis =
            tarefasVisiveis.filter(function(tarefa) {

                return tarefa.status === estado.status;

            });
    }

    if (estado.prioridade !== "todas") {

        tarefasVisiveis =
            tarefasVisiveis.filter(function(tarefa) {

                return tarefa.prioridade === estado.prioridade;

            });
    }

    if (estado.ordenacao === "mais-proximo") {

        tarefasVisiveis.sort(function(a, b) {

            return new Date(a.prazo) -
                   new Date(b.prazo);

        });
    }


    if (estado.ordenacao === "mais-distante") {

        tarefasVisiveis.sort(function(a, b) {

            return new Date(b.prazo) -
                   new Date(a.prazo);

        });
    }


    return tarefasVisiveis;
}

function atualizarTela() {

    const tarefasVisiveis =
        derivarTarefas(estado);

    if (estado.carregamento === "carregando") {

        renderizarEstado("carregando");

        return;
    }


    if (estado.carregamento === "erro") {

        renderizarEstado("erro", {
            mensagem: estado.erro
        });

        return;
    }

    if (estado.tarefas.length === 0) {

        renderizarTarefas([]);

        renderizarEstado("vazio");

        return;
    }

    if (tarefasVisiveis.length === 0) {

        renderizarTarefas([]);

        renderizarEstado("sem-resultados", {
            total: estado.tarefas.length
        });

        return;
    }

    renderizarTarefas(tarefasVisiveis);

    renderizarEstado("sucesso", {

        quantidade:
            tarefasVisiveis.length,

        total:
            estado.tarefas.length

    });
}

campoBusca.addEventListener("input", function() {

    estado.busca =
        campoBusca.value;

    atualizarTela();

});

filtroStatus.addEventListener("change", function() {

    estado.status =
        filtroStatus.value;

    atualizarTela();

});

filtroPrioridade.addEventListener("change", function() {

    estado.prioridade =
        filtroPrioridade.value;

    atualizarTela();

});

filtroOrdenacao.addEventListener("change", function() {

    estado.ordenacao =
        filtroOrdenacao.value;

    atualizarTela();

});

botaoLimpar.addEventListener("click", function() {

    estado.busca = "";

    estado.status = "todos";

    estado.prioridade = "todas";

    estado.ordenacao = "nenhuma";


    campoBusca.value = "";

    filtroStatus.value = "todos";

    filtroPrioridade.value = "todas";

    filtroOrdenacao.value = "nenhuma";


    atualizarTela();

});

async function iniciarAplicacao() {

    estado.carregamento =
        "carregando";

    estado.erro =
        null;


    atualizarTela();


    try {

        const tarefas =
            await carregarTarefas();

        estado.tarefas =
            tarefas;


        estado.carregamento =
            "concluido";

        estado.erro =
            null;


        atualizarTela();


    } catch (erro) {

        estado.carregamento =
            "erro";


        if (erro.name === "TypeError") {

            estado.erro =
                "Erro de rede. Não foi possível acessar os dados.";

        } else if (erro.name === "SyntaxError") {

            estado.erro =
                "Erro de formato. O arquivo JSON está inválido.";

        } else if (
            typeof erro.message === "string" &&
            erro.message.startsWith("HTTP")
        ) {

            estado.erro =
                `Erro de protocolo: ${erro.message}.`;

        } else {

            estado.erro =
                "Ocorreu um erro inesperado ao carregar as tarefas.";

        }


        atualizarTela();
    }
}


iniciarAplicacao();