export function renderizarTarefas(tarefas) {

    const listaAfazer =
        document.querySelector("#lista-afazer");

    const listaAndamento =
        document.querySelector("#lista-andamento");

    const listaRevisao =
        document.querySelector("#lista-revisao");

    const listaConcluida =
        document.querySelector("#lista-concluida");


    listaAfazer.replaceChildren();
    listaAndamento.replaceChildren();
    listaRevisao.replaceChildren();
    listaConcluida.replaceChildren();


    tarefas.forEach(function(tarefa) {

        const li =
            document.createElement("li");

        const article =
            document.createElement("article");


        const titulo =
            document.createElement("h3");

        titulo.textContent =
            tarefa.titulo;


        const projeto =
            document.createElement("p");

        projeto.textContent =
            `Projeto: ${tarefa.projeto}`;


        const responsavel =
            document.createElement("p");

        responsavel.textContent =
            `Responsável: ${tarefa.responsavel}`;


        const prazo =
            document.createElement("p");

        prazo.textContent =
            `Prazo: ${tarefa.prazo}`;


        const prioridade =
            document.createElement("p");

        prioridade.textContent =
            `Prioridade: ${tarefa.prioridade}`;


        article.appendChild(titulo);
        article.appendChild(projeto);
        article.appendChild(responsavel);
        article.appendChild(prazo);
        article.appendChild(prioridade);


        li.appendChild(article);


        if (tarefa.status === "afazer") {

            listaAfazer.appendChild(li);

        } else if (tarefa.status === "andamento") {

            listaAndamento.appendChild(li);

        } else if (tarefa.status === "revisao") {

            listaRevisao.appendChild(li);

        } else if (tarefa.status === "concluida") {

            listaConcluida.appendChild(li);
        }

    });
}