/**
 * Testes para o TaskFlow - Gerenciador de Tarefas
 * 
 * Utiliza o Node.js Test Runner nativo (disponível no Node 18+)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
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
} from '../taskManager.js';

describe('TaskFlow - Gerenciador de Tarefas', () => {
  
  describe('addTask', () => {
    it('deve adicionar uma tarefa com prioridade padrão', () => {
      const tasks = [];
      const newTasks = addTask(tasks, 'Nova tarefa');
      
      assert.equal(newTasks.length, 1);
      assert.equal(newTasks[0].description, 'Nova tarefa');
      assert.equal(newTasks[0].priority, 'média');
      assert.equal(newTasks[0].completed, false);
    });
    
    it('deve adicionar uma tarefa com prioridade especificada', () => {
      const tasks = [];
      const newTasks = addTask(tasks, 'Tarefa urgente', 'alta');
      
      assert.equal(newTasks[0].priority, 'alta');
    });
    
    it('deve manter as tarefas existentes ao adicionar nova tarefa', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      
      assert.equal(tasks.length, 2);
    });
    
    it('deve lançar erro para descrição vazia', () => {
      const tasks = [];
      
      assert.throws(() => addTask(tasks, ''), {
        message: 'Descrição da tarefa é obrigatória'
      });
    });
    
    it('deve lançar erro para prioridade inválida', () => {
      const tasks = [];
      
      assert.throws(() => addTask(tasks, 'Tarefa', 'urgente'), {
        message: 'Prioridade inválida. Use: alta, média ou baixa'
      });
    });
    
    it('não deve modificar o array original', () => {
      const tasks = [];
      const newTasks = addTask(tasks, 'Tarefa');
      
      assert.equal(tasks.length, 0);
      assert.equal(newTasks.length, 1);
    });
  });
  
  describe('toggleTaskCompletion', () => {
    it('deve marcar uma tarefa como concluída', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa teste');
      const taskId = tasks[0].id;
      
      const updatedTasks = toggleTaskCompletion(tasks, taskId);
      
      assert.equal(updatedTasks[0].completed, true);
    });
    
    it('deve desmarcar uma tarefa concluída', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa teste');
      const taskId = tasks[0].id;
      
      tasks = toggleTaskCompletion(tasks, taskId, true);
      tasks = toggleTaskCompletion(tasks, taskId, false);
      
      assert.equal(tasks[0].completed, false);
    });
    
    it('não deve modificar tarefas com IDs diferentes', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      
      const updatedTasks = toggleTaskCompletion(tasks, tasks[0].id);
      
      assert.equal(updatedTasks[0].completed, true);
      assert.equal(updatedTasks[1].completed, false);
    });
  });
  
  describe('filterByStatus', () => {
    it('deve filtrar tarefas pendentes', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      tasks = toggleTaskCompletion(tasks, tasks[0].id);
      
      const pending = filterByStatus(tasks, false);
      
      assert.equal(pending.length, 1);
      assert.equal(pending[0].description, 'Tarefa 2');
    });
    
    it('deve filtrar tarefas concluídas', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      tasks = toggleTaskCompletion(tasks, tasks[0].id);
      
      const completed = filterByStatus(tasks, true);
      
      assert.equal(completed.length, 1);
      assert.equal(completed[0].description, 'Tarefa 1');
    });
  });
  
  describe('filterByPriority', () => {
    it('deve filtrar tarefas por prioridade alta', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'alta');
      tasks = addTask(tasks, 'Tarefa 2', 'baixa');
      tasks = addTask(tasks, 'Tarefa 3', 'alta');
      
      const highPriority = filterByPriority(tasks, 'alta');
      
      assert.equal(highPriority.length, 2);
    });
    
    it('deve filtrar tarefas por prioridade média', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'média');
      tasks = addTask(tasks, 'Tarefa 2', 'baixa');
      
      const mediumPriority = filterByPriority(tasks, 'média');
      
      assert.equal(mediumPriority.length, 1);
    });
  });
  
  describe('getPendingTasks', () => {
    it('deve retornar apenas tarefas pendentes', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      tasks = toggleTaskCompletion(tasks, tasks[0].id);
      
      const pending = getPendingTasks(tasks);
      
      assert.equal(pending.length, 1);
      assert.equal(pending[0].completed, false);
    });
  });
  
  describe('getCompletedTasks', () => {
    it('deve retornar apenas tarefas concluídas', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      tasks = toggleTaskCompletion(tasks, tasks[0].id);
      
      const completed = getCompletedTasks(tasks);
      
      assert.equal(completed.length, 1);
      assert.equal(completed[0].completed, true);
    });
  });
  
  describe('sortByPriority', () => {
    it('deve ordenar tarefas por prioridade (alta -> baixa)', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'baixa');
      tasks = addTask(tasks, 'Tarefa 2', 'alta');
      tasks = addTask(tasks, 'Tarefa 3', 'média');
      
      const sorted = sortByPriority(tasks);
      
      assert.equal(sorted[0].priority, 'alta');
      assert.equal(sorted[1].priority, 'média');
      assert.equal(sorted[2].priority, 'baixa');
    });
    
    it('não deve modificar o array original', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'baixa');
      tasks = addTask(tasks, 'Tarefa 2', 'alta');
      
      const sorted = sortByPriority(tasks);
      
      assert.equal(tasks[0].priority, 'baixa');
      assert.equal(sorted[0].priority, 'alta');
    });
  });
  
  describe('sortByDate', () => {
    it('deve ordenar tarefas por data (mais recentes primeiro)', () => {
      // Criar tarefas com timestamps artificialmente diferentes para testar ordenação
      const task1 = {
        id: 1,
        description: 'Tarefa Antiga',
        priority: 'média',
        completed: false,
        createdAt: '2024-01-01T10:00:00.000Z'
      };
      
      const task2 = {
        id: 2,
        description: 'Tarefa Recente',
        priority: 'alta',
        completed: false,
        createdAt: '2024-12-01T10:00:00.000Z'
      };
      
      const tasks = [task1, task2];
      const sorted = sortByDate(tasks);
      
      assert.equal(sorted[0].description, 'Tarefa Recente');
      assert.equal(sorted[1].description, 'Tarefa Antiga');
    });
  });
  
  describe('removeTask', () => {
    it('deve remover uma tarefa pelo ID', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      const taskId = tasks[0].id;
      
      const updated = removeTask(tasks, taskId);
      
      assert.equal(updated.length, 1);
      assert.equal(updated[0].description, 'Tarefa 2');
    });
    
    it('não deve modificar se ID não existe', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      
      const updated = removeTask(tasks, 99999);
      
      assert.equal(updated.length, 1);
    });
  });
  
  describe('getTaskStats', () => {
    it('deve calcular estatísticas corretamente', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'alta');
      tasks = addTask(tasks, 'Tarefa 2', 'média');
      tasks = addTask(tasks, 'Tarefa 3', 'alta');
      tasks = toggleTaskCompletion(tasks, tasks[0].id);
      
      const stats = getTaskStats(tasks);
      
      assert.equal(stats.total, 3);
      assert.equal(stats.completed, 1);
      assert.equal(stats.pending, 2);
      assert.equal(stats.completionRate, '33.3');
      assert.equal(stats.byPriority.alta, 2);
      assert.equal(stats.byPriority.média, 1);
    });
    
    it('deve retornar estatísticas para lista vazia', () => {
      const tasks = [];
      const stats = getTaskStats(tasks);
      
      assert.equal(stats.total, 0);
      assert.equal(stats.completionRate, 0);
    });
  });
  
  describe('getTasksByPriority', () => {
    it('deve retornar todas as tarefas ordenadas por prioridade', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'baixa');
      tasks = addTask(tasks, 'Tarefa 2', 'alta');
      
      const sorted = getTasksByPriority(tasks);
      
      assert.equal(sorted[0].priority, 'alta');
    });
    
    it('deve retornar tarefas pendentes ordenadas por prioridade', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1', 'baixa');
      tasks = addTask(tasks, 'Tarefa 2', 'alta');
      tasks = toggleTaskCompletion(tasks, tasks[1].id);
      
      const sorted = getTasksByPriority(tasks, false);
      
      assert.equal(sorted.length, 1);
      assert.equal(sorted[0].priority, 'baixa');
    });
  });
  
  describe('searchTasks', () => {
    it('deve buscar tarefas por termo', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Implementar autenticação');
      tasks = addTask(tasks, 'Criar documentação');
      tasks = addTask(tasks, 'Implementar pagamentos');
      
      const results = searchTasks(tasks, 'implementar');
      
      assert.equal(results.length, 2);
    });
    
    it('deve ser case-insensitive', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Implementar Feature');
      
      const results = searchTasks(tasks, 'IMPLEMENTAR');
      
      assert.equal(results.length, 1);
    });
    
    it('deve retornar todas as tarefas para termo vazio', () => {
      let tasks = [];
      tasks = addTask(tasks, 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      
      const results = searchTasks(tasks, '');
      
      assert.equal(results.length, 2);
    });
  });
});
