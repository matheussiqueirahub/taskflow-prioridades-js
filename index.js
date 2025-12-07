/**
 * TaskFlow - Demonstração do Gerenciador de Tarefas
 * 
 * Este arquivo demonstra o uso do sistema de gerenciamento de tarefas
 * com exemplos práticos de todas as funcionalidades disponíveis.
 */

import {
  addTask,
  toggleTaskCompletion,
  filterByStatus,
  filterByPriority,
  getPendingTasks,
  getCompletedTasks,
  sortByPriority,
  sortByDate,
  removeTask,
  getTaskStats,
  getTasksByPriority,
  searchTasks
} from './taskManager.js';

/**
 * Função auxiliar para exibir tarefas de forma formatada
 */
function displayTasks(tasks, title = 'Tarefas') {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${title.toUpperCase()}`);
  console.log(`${'='.repeat(60)}`);
  
  if (tasks.length === 0) {
    console.log('Nenhuma tarefa encontrada.');
    return;
  }
  
  tasks.forEach((task, index) => {
    const status = task.completed ? '✓' : '○';
    const priority = task.priority.toUpperCase();
    console.log(`${index + 1}. [${status}] [${priority}] ${task.description}`);
  });
  console.log('');
}

/**
 * Função auxiliar para exibir estatísticas
 */
function displayStats(stats) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('ESTATÍSTICAS DAS TAREFAS');
  console.log(`${'='.repeat(60)}`);
  console.log(`Total de tarefas: ${stats.total}`);
  console.log(`Concluídas: ${stats.completed}`);
  console.log(`Pendentes: ${stats.pending}`);
  console.log(`Taxa de conclusão: ${stats.completionRate}%`);
  console.log('\nPor prioridade:');
  Object.entries(stats.byPriority).forEach(([priority, count]) => {
    console.log(`  ${priority}: ${count}`);
  });
  console.log('');
}

/**
 * Demonstração completa do sistema
 */
function demonstrateTaskManager() {
  console.log('\n🚀 TASKFLOW - GERENCIADOR DE TAREFAS COM PRIORIDADES\n');
  
  // Inicializa lista vazia de tarefas
  let tasks = [];
  
  // 1. Adicionar tarefas
  console.log('📝 Adicionando tarefas...');
  tasks = addTask(tasks, 'Implementar autenticação de usuários', 'alta');
  tasks = addTask(tasks, 'Criar documentação da API', 'média');
  tasks = addTask(tasks, 'Configurar ambiente de testes', 'alta');
  tasks = addTask(tasks, 'Atualizar dependências do projeto', 'baixa');
  tasks = addTask(tasks, 'Revisar código do módulo de pagamentos', 'alta');
  tasks = addTask(tasks, 'Adicionar logs de auditoria', 'média');
  tasks = addTask(tasks, 'Corrigir bugs no formulário de contato', 'baixa');
  
  displayTasks(tasks, 'Todas as tarefas');
  
  // 2. Ordenar por prioridade
  const tasksByPriority = sortByPriority(tasks);
  displayTasks(tasksByPriority, 'Tarefas ordenadas por prioridade');
  
  // 3. Marcar algumas tarefas como concluídas
  console.log('✓ Marcando tarefas como concluídas...');
  tasks = toggleTaskCompletion(tasks, tasks[0].id);
  tasks = toggleTaskCompletion(tasks, tasks[3].id);
  tasks = toggleTaskCompletion(tasks, tasks[5].id);
  
  displayTasks(tasks, 'Tarefas após marcação');
  
  // 4. Filtrar tarefas pendentes
  const pendingTasks = getPendingTasks(tasks);
  displayTasks(pendingTasks, 'Tarefas pendentes');
  
  // 5. Filtrar tarefas concluídas
  const completedTasks = getCompletedTasks(tasks);
  displayTasks(completedTasks, 'Tarefas concluídas');
  
  // 6. Filtrar por prioridade alta
  const highPriorityTasks = filterByPriority(tasks, 'alta');
  displayTasks(highPriorityTasks, 'Tarefas de alta prioridade');
  
  // 7. Tarefas pendentes ordenadas por prioridade
  const pendingByPriority = getTasksByPriority(tasks, false);
  displayTasks(pendingByPriority, 'Tarefas pendentes ordenadas por prioridade');
  
  // 8. Buscar tarefas
  const searchResults = searchTasks(tasks, 'código');
  displayTasks(searchResults, 'Resultados da busca por "código"');
  
  // 9. Exibir estatísticas
  const stats = getTaskStats(tasks);
  displayStats(stats);
  
  // 10. Remover uma tarefa
  console.log('🗑️  Removendo tarefa...');
  tasks = removeTask(tasks, tasks[6].id);
  displayTasks(tasks, 'Tarefas após remoção');
  
  // Estatísticas finais
  const finalStats = getTaskStats(tasks);
  displayStats(finalStats);
  
  console.log('✨ Demonstração concluída!\n');
}

// Executar demonstração
demonstrateTaskManager();
