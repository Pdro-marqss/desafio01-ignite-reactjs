import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return;
    //imutabilidade, criando um "estado temporario" para armazenar as informações pedidas na interface, que vao para a array do estado.
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }
    //esse old task é ele pegando tudo que ja tem no estado task e mantendo la usando o spredOperator, e adicionando o novo valor em newTask.
    setTasks(oldTask => [...oldTask, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // essa variavel pega a array tasks e mapeia. Cada task dentro dela passa por verificação de id pra ver se é igual ao selecionado. Se o id for igual ao selecionado, ele puxa pro objeto os ites de task com ..task e edita o isComplete para o inverso do valor atual. Caso o id seja diferente ele só retorna o item como estava antes.
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //essa variavel armazena o resultado de um filtro em tasks que devolve todas as tasks que nao tem o mesmo ID do item selecionado.
    const filteredTasks = tasks.filter(task => task.id !== id);

    //salva o novo array de tasks que sao diferentes da com id selecionado. Ou seja, salva tudo menos a que foi removida.
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}