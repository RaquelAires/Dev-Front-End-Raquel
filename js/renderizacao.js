export function renderizarTarefas(tarefas) {

    const listas = {

        "a-fazer":
            document.querySelector("#lista-afazer"),

        "em-andamento":
            document.querySelector("#lista-andamento"),

        "em-revisao":
            document.querySelector("#lista-revisao"),

        "concluida":
            document.querySelector("#lista-concluida")

    };

    Object.values(listas).forEach(lista => {

        lista.textContent = "";

    });

    tarefas.forEach(tarefa => {

        const lista = listas[tarefa.status];

        if (!lista) {
            return;
        }

        const li = document.createElement("li");

        const article = document.createElement("article");

        article.setAttribute(
            "aria-labelledby",
            `tarefa-${tarefa.id}-titulo`
        );

        const h3 = document.createElement("h3");

        h3.id = `tarefa-${tarefa.id}-titulo`;

        h3.textContent = tarefa.titulo;

        const dl = document.createElement("dl");

        const dtProjeto = document.createElement("dt");

        dtProjeto.textContent = "Projeto";

        const ddProjeto = document.createElement("dd");

        ddProjeto.textContent = tarefa.projeto;

        const dtResponsavel = document.createElement("dt");

        dtResponsavel.textContent = "Responsável";

        const ddResponsavel = document.createElement("dd");

        ddResponsavel.textContent = tarefa.responsavel;

        const dtPrazo = document.createElement("dt");

        dtPrazo.textContent = "Prazo";

        const ddPrazo = document.createElement("dd");

        const time = document.createElement("time");

        time.textContent = tarefa.prazo;

        ddPrazo.appendChild(time);

        const dtPrioridade = document.createElement("dt");

        dtPrioridade.textContent = "Prioridade";

        const ddPrioridade = document.createElement("dd");

        ddPrioridade.textContent =
            tarefa.prioridade;

        dl.appendChild(dtProjeto);
        dl.appendChild(ddProjeto);

        dl.appendChild(dtResponsavel);
        dl.appendChild(ddResponsavel);

        dl.appendChild(dtPrazo);
        dl.appendChild(ddPrazo);

        dl.appendChild(dtPrioridade);
        dl.appendChild(ddPrioridade);

        article.appendChild(h3);

        article.appendChild(dl);

        li.appendChild(article);

        lista.appendChild(li);

    });
}