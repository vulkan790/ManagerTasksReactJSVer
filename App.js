import { useState } from 'react';
import './App.css';

/**
 * Компонент для отдельной задачи
 * @param {string} text - Текст задачи
 * @param {function} onDelete - Функция для удаления задачи
 * @returns {JSX.Element} - Элемент задачи
 */

function TaskItem({ text, onDelete }) {
  return (
    <div className='task-item'>
      <span>{text}</span>
      <button onClick={onDelete} className='delete-btn'>Удалить</button>
    </div>
  );
}

/**
 * Компонент для списка задач
 * @param {Array} tasks - Массив задач
 * @param {function} onDeleteTask - Функция для удаления задачи по ID
 * @returns {JSX.Element} - Элемент списка задач
 */

function TaskList({ tasks, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          text={task.text}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  );
}

/**
 * Компонент для формы добавления задачи
 * @param {function} onAddTask - Функция для добавления новой задачи
 * @returns {JSX.Element} - Элемент формы
 */

function AddTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim())
    {
      onAddTask({
        id: Date.now().toString(),
        text: newTask.trim()
      });
      setNewTask('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Введите новую задачу"
        className="task-input"
      />
      <button type="submit" className="add-btn">Добавить</button>
    </form>
  );
}

/**
 * Корневой компонент с управлением состоянием задач
 * @returns {JSX.Element} - Корневой элемент приложения
 */

function App() {
   const [tasks, setTasks] = useState([
    { id: '1', text: 'Почитать книгу' },
    { id: '2', text: 'Сходить в спортзал' }
  ]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app">
      <h1>Менеджер задач</h1>
      
      {/* Форма добавления новой задачи */}
      <AddTaskForm onAddTask={handleAddTask} />
      
      {/* Список задач */}
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      
      {/* Отображение количества задач */}
      <div className="task-counter">
        Всего задач: {tasks.length}
      </div>
    </div>
  );
}

export default App;
