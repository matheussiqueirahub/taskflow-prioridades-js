# TaskFlow - Gerenciador de Tarefas com Prioridades

Sistema profissional de gerenciamento de tarefas em JavaScript puro, demonstrando programação funcional e manipulação avançada de arrays. Perfeito para portfólio técnico.

## 🎯 Características

- ✅ **Funções Puras**: Todas as operações são implementadas como funções puras, sem efeitos colaterais
- 🔄 **Imutabilidade**: Os arrays originais nunca são modificados
- 🎨 **Array Methods**: Uso extensivo de `filter`, `map`, `sort`, `reduce`
- 🏗️ **Arquitetura Funcional**: Código organizado e modular
- 📊 **Prioridades**: Suporte a três níveis de prioridade (alta, média, baixa)
- 🔍 **Filtros e Busca**: Filtragem por status, prioridade e busca por texto
- 📈 **Estatísticas**: Análise detalhada das tarefas

## 🚀 Funcionalidades

### Operações Básicas
- Adicionar tarefas com prioridades
- Marcar tarefas como concluídas/pendentes
- Remover tarefas
- Buscar tarefas por texto

### Filtros Avançados
- Filtrar por status (concluídas/pendentes)
- Filtrar por prioridade (alta/média/baixa)
- Combinar filtros e ordenação

### Ordenação
- Ordenar por prioridade (alta → baixa)
- Ordenar por data de criação

### Estatísticas
- Total de tarefas
- Taxa de conclusão
- Distribuição por prioridade

## 📦 Instalação e Uso

### Requisitos
- Node.js 18+ (para suporte ao Test Runner nativo)

### Executar o projeto

```bash
# Executar demonstração
npm start

# Executar testes
npm test
```

## 💡 Exemplos de Uso

```javascript
import {
  addTask,
  toggleTaskCompletion,
  sortByPriority,
  getPendingTasks,
  getTaskStats
} from './taskManager.js';

// Inicializar lista de tarefas
let tasks = [];

// Adicionar tarefas
tasks = addTask(tasks, 'Implementar autenticação', 'alta');
tasks = addTask(tasks, 'Criar documentação', 'média');
tasks = addTask(tasks, 'Atualizar dependências', 'baixa');

// Marcar tarefa como concluída
tasks = toggleTaskCompletion(tasks, tasks[0].id);

// Ordenar por prioridade
const sortedTasks = sortByPriority(tasks);

// Obter apenas tarefas pendentes
const pending = getPendingTasks(tasks);

// Obter estatísticas
const stats = getTaskStats(tasks);
console.log(`Taxa de conclusão: ${stats.completionRate}%`);
```

## 🏗️ Estrutura do Projeto

```
taskflow-prioridades-js/
├── taskManager.js       # Módulo principal com todas as funções
├── index.js             # Demonstração do sistema
├── test/
│   └── taskManager.test.js  # Testes unitários
├── package.json
└── README.md
```

## 🧪 Testes

O projeto inclui testes abrangentes para todas as funcionalidades:

- ✓ Adição de tarefas com validações
- ✓ Marcação de conclusão
- ✓ Filtros por status e prioridade
- ✓ Ordenação por prioridade e data
- ✓ Remoção de tarefas
- ✓ Cálculo de estatísticas
- ✓ Busca por texto
- ✓ Imutabilidade dos arrays

```bash
npm test
```

## 🎓 Conceitos Demonstrados

### Programação Funcional
- **Funções Puras**: Sem efeitos colaterais, mesmo input → mesmo output
- **Imutabilidade**: Uso de spread operator e métodos que retornam novos arrays
- **Higher-Order Functions**: Funções que recebem ou retornam outras funções

### Array Methods
- **filter()**: Filtragem de tarefas por critérios
- **map()**: Transformação de dados (ex: marcar como concluída)
- **sort()**: Ordenação por prioridade e data
- **reduce()**: Agregação para estatísticas

### ES6+ Features
- ES Modules (import/export)
- Spread operator (...)
- Arrow functions
- Template literals
- Object destructuring
- Default parameters

## 📊 Modelo de Dados

Cada tarefa possui a seguinte estrutura:

```javascript
{
  id: 1701234567890,           // Timestamp único
  description: "Tarefa...",     // Descrição da tarefa
  priority: "alta",             // alta | média | baixa
  completed: false,             // true | false
  createdAt: "2024-12-07T..."  // ISO string
}
```

## 🔧 API Completa

### Funções Principais

| Função | Descrição | Parâmetros |
|--------|-----------|------------|
| `addTask(tasks, description, priority)` | Adiciona nova tarefa | tasks[], string, 'alta'\|'média'\|'baixa' |
| `toggleTaskCompletion(tasks, taskId, completed)` | Marca/desmarca como concluída | tasks[], number, boolean |
| `removeTask(tasks, taskId)` | Remove tarefa | tasks[], number |
| `filterByStatus(tasks, completed)` | Filtra por status | tasks[], boolean |
| `filterByPriority(tasks, priority)` | Filtra por prioridade | tasks[], string |
| `sortByPriority(tasks)` | Ordena por prioridade | tasks[] |
| `sortByDate(tasks)` | Ordena por data | tasks[] |
| `searchTasks(tasks, searchTerm)` | Busca por texto | tasks[], string |
| `getTaskStats(tasks)` | Retorna estatísticas | tasks[] |
| `getPendingTasks(tasks)` | Retorna pendentes | tasks[] |
| `getCompletedTasks(tasks)` | Retorna concluídas | tasks[] |
| `getTasksByPriority(tasks, completed)` | Filtra e ordena | tasks[], boolean\|null |

## 📄 Licença

MIT

## 👨‍💻 Autor

Projeto desenvolvido para demonstrar domínio de JavaScript funcional e manipulação de arrays.
