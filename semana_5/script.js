class Tarefa {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = 'pendente';
    }

    concluir() {
        this.status = 'concluída';
    }

    detalhes() {
        return `Nome: ${this.nome}\nDescrição: ${this.descricao}\nStatus: ${this.status}`;
    }
}

class GerenciadorDeTarefas {
    #tarefas;

    constructor() {
        this.#tarefas = [];
    }

    adicionarTarefa(tarefa) {
        this.#tarefas.push(tarefa);
        this.listarTarefas();
    }

    listarTarefas() {
        const tarefasList = document.getElementById('tarefasList');
        tarefasList.innerHTML = '';

        this.#tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            const tarefaNome = document.createElement('span');
            tarefaNome.textContent = `${tarefa.nome} - ${tarefa.status}`;
            
            if (tarefa.status === 'concluída') {
                tarefaNome.classList.add('concluida');
            }

            const detalhesBtn = document.createElement('button');
            detalhesBtn.textContent = 'Detalhes';
            detalhesBtn.onclick = () => this.visualizarDetalhes(index);

            const concluirBtn = document.createElement('button');
            concluirBtn.textContent = 'Concluir';
            concluirBtn.onclick = () => this.marcarComoConcluida(index);

            const removerBtn = document.createElement('button');
            removerBtn.textContent = 'Remover';
            removerBtn.onclick = () => this.removerTarefa(index);

            li.appendChild(tarefaNome);
            li.appendChild(detalhesBtn);
            li.appendChild(concluirBtn);
            li.appendChild(removerBtn);
            tarefasList.appendChild(li);
        });
    }

    marcarComoConcluida(index) {
        if (this.#tarefas[index]) {
            this.#tarefas[index].concluir();
            this.listarTarefas();
        }
    }

    removerTarefa(index) {
        if (this.#tarefas[index]) {
            this.#tarefas.splice(index, 1);
            this.listarTarefas();
        }
    }

    visualizarDetalhes(index) {
        if (this.#tarefas[index]) {
            alert(this.#tarefas[index].detalhes());
        }
    }
}

const gerenciador = new GerenciadorDeTarefas();

document.getElementById('tarefaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    gerenciador.adicionarTarefa(new Tarefa(nome, descricao));
    document.getElementById('tarefaForm').reset();
});
