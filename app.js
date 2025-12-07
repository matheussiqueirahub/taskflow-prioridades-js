/**
 * TaskMaster Pro - Core Logic
 */

// State
let tarefas = [];

// DOM Elements
const taskDescInput = document.getElementById('taskDesc');
const taskPriorityInput = document.getElementById('taskPriority');
const btnAddTask = document.getElementById('btnAddTask');
const taskListElement = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');
const pendingCountLabel = document.getElementById('pendingCount');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
    renderizarTarefas();

    // Event Listeners
    btnAddTask.addEventListener('click', handleAddTask);
    taskDescInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddTask();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filter logic
            const filterType = e.target.dataset.filter;
            aplicarFiltro(filterType);
        });
    });
});

// --- Core Logic ---

function adicionarTarefa(descricao, prioridade) {
    if (!descricao.trim()) return alert("Por favor, insira uma descrição.");

    const novaTarefa = {
        id: Date.now(),
        descricao: descricao,
        prioridade: prioridade,
        concluida: false,
        dataCriacao: new Date().toISOString()
    };

    tarefas.push(novaTarefa);
    salvarTarefas();
    renderizarTarefas();
    taskDescInput.value = '';
    taskDescInput.focus();
}

function concluirTarefa(id) {
    tarefas = tarefas.map(t => {
        if (t.id === id) {
            return { ...t, concluida: !t.concluida };
        }
        return t;
    });
    salvarTarefas();
    // Re-render based on current active filter to maintain view context
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    aplicarFiltro(activeFilter);
}

function listarPorPrioridade(prioridade) {
    return tarefas.filter(t => t.prioridade === prioridade);
}

function listarConcluidas() {
    return tarefas.filter(t => t.concluida);
}

// --- Persistence ---

function salvarTarefas() {
    localStorage.setItem('taskmaster_arr', JSON.stringify(tarefas));
    atualizarContador();
}

function carregarTarefas() {
    const data = localStorage.getItem('taskmaster_arr');
    if (data) {
        tarefas = JSON.parse(data);
    }
}

// --- UI Rendering ---

function renderizarTarefas(listaParaRenderizar = tarefas) {
    taskListElement.innerHTML = '';

    // Priority weight map
    const priorityWeight = { 'alta': 3, 'média': 2, 'baixa': 1 };

    // Sort: Non-completed first, then by Priority (High>Low), then by Date (newest first)
    const listaOrdenada = [...listaParaRenderizar].sort((a, b) => {
        // 1. Completion status (Active first)
        if (a.concluida !== b.concluida) {
            return a.concluida ? 1 : -1;
        }

        // 2. Priority (High to Low)
        const weightA = priorityWeight[a.prioridade] || 0;
        const weightB = priorityWeight[b.prioridade] || 0;
        if (weightA !== weightB) {
            return weightB - weightA;
        }

        // 3. Date (Newest first)
        return new Date(b.dataCriacao) - new Date(a.dataCriacao);
    });

    if (listaOrdenada.length === 0) {
        taskListElement.innerHTML = '<li style="text-align:center; color: var(--text-secondary); padding: 1rem;">Nenhuma tarefa encontrada.</li>';
        return;
    }

    listaOrdenada.forEach(t => {
        const li = document.createElement('li');
        li.className = `task-item priority-${t.prioridade} ${t.concluida ? 'concluida' : ''}`;

        const dateFormatted = new Date(t.dataCriacao).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        });

        li.innerHTML = `
            <div class="task-content">
                <div class="task-text">${t.descricao}</div>
                <small class="task-date">${dateFormatted} • ${t.prioridade.toUpperCase()}</small>
            </div>
            <div class="task-actions">
                <button onclick="concluirTarefa(${t.id})" title="Concluir/Reabrir">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${t.concluida ? '#22c55e' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </button>
            </div>
        `;
        taskListElement.appendChild(li);
    });
    atualizarContador();
}

function aplicarFiltro(tipo) {
    let filtradas = [];
    switch (tipo) {
        case 'all':
            filtradas = tarefas;
            break;
        case 'p-alta':
            filtradas = listarPorPrioridade('alta');
            break;
        case 'p-media':
            filtradas = listarPorPrioridade('média');
            break;
        case 'p-baixa':
            filtradas = listarPorPrioridade('baixa');
            break;
        case 'completed':
            filtradas = listarConcluidas();
            break;
        default:
            filtradas = tarefas;
    }
    renderizarTarefas(filtradas);
}

function handleAddTask() {
    const desc = taskDescInput.value;
    const prio = taskPriorityInput.value;
    adicionarTarefa(desc, prio);
}

function atualizarContador() {
    const pendentes = tarefas.filter(t => !t.concluida).length;
    pendingCountLabel.textContent = `${pendentes} pendente${pendentes !== 1 ? 's' : ''}`;
}

// Make functions global for inline HTML handlers if needed (though we use event listeners for most)
window.concluirTarefa = concluirTarefa;
