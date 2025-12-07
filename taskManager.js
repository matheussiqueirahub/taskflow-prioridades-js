/**
 * TaskFlow - Gerenciador de Tarefas com Prioridades
 * 
 * Sistema funcional para gerenciamento de tarefas com suporte a:
 * - Adição de tarefas com prioridades (alta, média, baixa)
 * - Marcação de tarefas como concluídas
 * - Filtragem por status e prioridade
 * - Ordenação por prioridade
 * 
 * Utiliza apenas funções puras e métodos de array do JavaScript.
 */

/**
 * Mapeia prioridades para valores numéricos para facilitar ordenação
 */
const PRIORITY_VALUES = {
  alta: 3,
  média: 2,
  baixa: 1
};

/**
 * Gera um ID único baseado em timestamp e aleatoriedade
 * @returns {number} ID único para a tarefa
 */
function generateTaskId(existingTasks) {
  // Usa timestamp + número aleatório para evitar colisões
  // Em um ambiente real, crypto.randomUUID() seria preferível
  let id;
  do {
    id = Date.now() + Math.floor(Math.random() * 1000);
  } while (existingTasks.some(task => task.id === id));
  return id;
}

/**
 * Adiciona uma nova tarefa à lista
 * @param {Array} tasks - Lista atual de tarefas
 * @param {string} description - Descrição da tarefa
 * @param {string} priority - Prioridade da tarefa (alta, média, baixa)
 * @returns {Array} Nova lista de tarefas com a tarefa adicionada
 */
export function addTask(tasks, description, priority = 'média') {
  if (!description || typeof description !== 'string' || description.trim() === '') {
    throw new Error('Descrição da tarefa é obrigatória');
  }

  const validPriorities = ['alta', 'média', 'baixa'];
  if (!validPriorities.includes(priority)) {
    throw new Error('Prioridade inválida. Use: alta, média ou baixa');
  }

  const newTask = {
    id: generateTaskId(tasks),
    description: description.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };

  return [...tasks, newTask];
}

/**
 * Marca uma tarefa como concluída ou não concluída
 * @param {Array} tasks - Lista de tarefas
 * @param {number} taskId - ID da tarefa a ser marcada
 * @param {boolean} completed - Status de conclusão (padrão: true)
 * @returns {Array} Nova lista com a tarefa atualizada
 */
export function toggleTaskCompletion(tasks, taskId, completed = true) {
  return tasks.map(task => 
    task.id === taskId 
      ? { ...task, completed } 
      : task
  );
}

/**
 * Filtra tarefas por status de conclusão
 * @param {Array} tasks - Lista de tarefas
 * @param {boolean} completed - Filtrar por tarefas concluídas (true) ou pendentes (false)
 * @returns {Array} Lista filtrada de tarefas
 */
export function filterByStatus(tasks, completed) {
  return tasks.filter(task => task.completed === completed);
}

/**
 * Filtra tarefas por prioridade
 * @param {Array} tasks - Lista de tarefas
 * @param {string} priority - Prioridade desejada (alta, média, baixa)
 * @returns {Array} Lista filtrada de tarefas
 */
export function filterByPriority(tasks, priority) {
  return tasks.filter(task => task.priority === priority);
}

/**
 * Obtém apenas tarefas pendentes
 * @param {Array} tasks - Lista de tarefas
 * @returns {Array} Lista de tarefas pendentes
 */
export function getPendingTasks(tasks) {
  return filterByStatus(tasks, false);
}

/**
 * Obtém apenas tarefas concluídas
 * @param {Array} tasks - Lista de tarefas
 * @returns {Array} Lista de tarefas concluídas
 */
export function getCompletedTasks(tasks) {
  return filterByStatus(tasks, true);
}

/**
 * Ordena tarefas por prioridade (alta -> baixa)
 * @param {Array} tasks - Lista de tarefas
 * @returns {Array} Nova lista ordenada por prioridade
 */
export function sortByPriority(tasks) {
  return [...tasks].sort((a, b) => 
    PRIORITY_VALUES[b.priority] - PRIORITY_VALUES[a.priority]
  );
}

/**
 * Ordena tarefas por data de criação (mais recentes primeiro)
 * @param {Array} tasks - Lista de tarefas
 * @returns {Array} Nova lista ordenada por data
 */
export function sortByDate(tasks) {
  return [...tasks].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/**
 * Remove uma tarefa da lista
 * @param {Array} tasks - Lista de tarefas
 * @param {number} taskId - ID da tarefa a ser removida
 * @returns {Array} Nova lista sem a tarefa removida
 */
export function removeTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}

/**
 * Obtém estatísticas sobre as tarefas
 * @param {Array} tasks - Lista de tarefas
 * @returns {Object} Objeto com estatísticas das tarefas
 */
export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  
  const byPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  return {
    total,
    completed,
    pending,
    completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0,
    byPriority
  };
}

/**
 * Filtra e ordena tarefas por prioridade (função composta)
 * @param {Array} tasks - Lista de tarefas
 * @param {boolean} completed - Filtrar por status (opcional)
 * @returns {Array} Lista filtrada e ordenada
 */
export function getTasksByPriority(tasks, completed = null) {
  let filteredTasks = tasks;
  
  if (completed !== null) {
    filteredTasks = filterByStatus(tasks, completed);
  }
  
  return sortByPriority(filteredTasks);
}

/**
 * Busca tarefas por termo na descrição
 * @param {Array} tasks - Lista de tarefas
 * @param {string} searchTerm - Termo a ser buscado
 * @returns {Array} Lista de tarefas que contêm o termo
 */
export function searchTasks(tasks, searchTerm) {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return tasks;
  }
  
  const term = searchTerm.toLowerCase().trim();
  return tasks.filter(task => 
    task.description.toLowerCase().includes(term)
  );
}
