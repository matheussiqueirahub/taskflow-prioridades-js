/**
 * Exemplos práticos de uso do TaskFlow
 * 
 * Este arquivo contém exemplos simples e diretos de como usar
 * cada funcionalidade do gerenciador de tarefas.
 */

import {
  addTask,
  toggleTaskCompletion,
  filterByStatus,
  filterByPriority,
  getPendingTasks,
  getCompletedTasks,
  sortByPriority,
  removeTask,
  getTaskStats,
  searchTasks
} from './taskManager.js';

// ============================================================
// Exemplo 1: Criar e gerenciar tarefas básicas
// ============================================================
console.log('\n📌 Exemplo 1: Criar e gerenciar tarefas básicas\n');

let tasks = [];

// Adicionar tarefas
tasks = addTask(tasks, 'Estudar JavaScript', 'alta');
tasks = addTask(tasks, 'Fazer compras', 'baixa');
tasks = addTask(tasks, 'Revisar código', 'média');

console.log('Tarefas criadas:', tasks.length);

// Marcar primeira tarefa como concluída
tasks = toggleTaskCompletion(tasks, tasks[0].id);
console.log('Primeira tarefa marcada como concluída');

// ============================================================
// Exemplo 2: Filtrar tarefas
// ============================================================
console.log('\n📌 Exemplo 2: Filtrar tarefas\n');

// Ver apenas tarefas pendentes
const pendentes = getPendingTasks(tasks);
console.log('Tarefas pendentes:', pendentes.map(t => t.description));

// Ver apenas tarefas concluídas
const concluidas = getCompletedTasks(tasks);
console.log('Tarefas concluídas:', concluidas.map(t => t.description));

// Filtrar por prioridade alta
const altaPrioridade = filterByPriority(tasks, 'alta');
console.log('Tarefas de alta prioridade:', altaPrioridade.map(t => t.description));

// ============================================================
// Exemplo 3: Ordenar tarefas por prioridade
// ============================================================
console.log('\n📌 Exemplo 3: Ordenar tarefas por prioridade\n');

const ordenadas = sortByPriority(tasks);
console.log('Tarefas ordenadas por prioridade:');
ordenadas.forEach((task, i) => {
  console.log(`  ${i + 1}. [${task.priority.toUpperCase()}] ${task.description}`);
});

// ============================================================
// Exemplo 4: Buscar tarefas
// ============================================================
console.log('\n📌 Exemplo 4: Buscar tarefas\n');

const resultados = searchTasks(tasks, 'código');
console.log('Resultados da busca por "código":', resultados.map(t => t.description));

// ============================================================
// Exemplo 5: Estatísticas
// ============================================================
console.log('\n📌 Exemplo 5: Estatísticas\n');

const stats = getTaskStats(tasks);
console.log(`Total: ${stats.total}`);
console.log(`Concluídas: ${stats.completed}`);
console.log(`Pendentes: ${stats.pending}`);
console.log(`Taxa de conclusão: ${stats.completionRate}%`);

// ============================================================
// Exemplo 6: Remover tarefas
// ============================================================
console.log('\n📌 Exemplo 6: Remover tarefas\n');

const tarefasAntes = tasks.length;
tasks = removeTask(tasks, tasks[1].id);
console.log(`Tarefas antes: ${tarefasAntes}, depois: ${tasks.length}`);

// ============================================================
// Exemplo 7: Workflow completo de um sprint
// ============================================================
console.log('\n📌 Exemplo 7: Workflow completo de um sprint\n');

// Limpar tarefas e começar novo sprint
tasks = [];

// Adicionar tarefas do sprint
tasks = addTask(tasks, 'Implementar API de usuários', 'alta');
tasks = addTask(tasks, 'Criar testes unitários', 'alta');
tasks = addTask(tasks, 'Atualizar documentação', 'média');
tasks = addTask(tasks, 'Revisar PRs pendentes', 'média');
tasks = addTask(tasks, 'Limpar código legado', 'baixa');

console.log('Sprint iniciado com', tasks.length, 'tarefas');

// Durante o sprint: marcar tarefas como concluídas
tasks = toggleTaskCompletion(tasks, tasks[0].id);
tasks = toggleTaskCompletion(tasks, tasks[1].id);

// Ver progresso
const progresso = getTaskStats(tasks);
console.log(`\nProgresso do Sprint:`);
console.log(`  ✓ Concluídas: ${progresso.completed}/${progresso.total}`);
console.log(`  ○ Pendentes: ${progresso.pending}`);
console.log(`  📊 Progresso: ${progresso.completionRate}%`);

// Ver próximas tarefas prioritárias
const proximas = sortByPriority(getPendingTasks(tasks));
console.log(`\nPróximas tarefas (por prioridade):`);
proximas.slice(0, 3).forEach((task, i) => {
  console.log(`  ${i + 1}. [${task.priority.toUpperCase()}] ${task.description}`);
});

console.log('\n✨ Exemplos concluídos!\n');
