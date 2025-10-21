import React, { useState, useRef } from 'react';
import "../assets/styles/board.css";
const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Learn React', description: 'Study React hooks and components' },
        { id: 2, title: 'Build Kanban Board', description: 'Create a drag-and-drop task manager' }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        { id: 3, title: 'Design UI', description: 'Create beautiful user interface' }
      ]
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 4, title: 'Project Setup', description: 'Initialize React project' }
      ]
    }
  });

  const [nextTaskId, setNextTaskId] = useState(5);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskColumn, setNewTaskColumn] = useState('todo');

  const dragItem = useRef();
  const dragOverItem = useRef();

  const addTask = (columnId, title, description = '') => {
    const newTask = {
      id: nextTaskId,
      title,
      description
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask]
      }
    }));

    setNextTaskId(prev => prev + 1);
  };

  const updateTask = (taskId, columnId, title, description) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.map(task =>
          task.id === taskId ? { ...task, title, description } : task
        )
      }
    }));
  };

  const deleteTask = (taskId, columnId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(task => task.id !== taskId)
      }
    }));
  };

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    if (fromColumnId === toColumnId) return;

    const taskToMove = columns[fromColumnId].tasks.find(task => task.id === taskId);
    if (!taskToMove) return;

    setColumns(prev => {
      const newColumns = { ...prev };
      
      newColumns[fromColumnId] = {
        ...newColumns[fromColumnId],
        tasks: newColumns[fromColumnId].tasks.filter(task => task.id !== taskId)
      };

      newColumns[toColumnId] = {
        ...newColumns[toColumnId],
        tasks: [...newColumns[toColumnId].tasks, taskToMove]
      };

      return newColumns;
    });
  };

  const openAddModal = (columnId = 'todo') => {
    setEditingTask(null);
    setNewTaskColumn(columnId);
    setIsModalOpen(true);
  };

  const openEditModal = (task, columnId) => {
    setEditingTask({ ...task, columnId });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();

    if (!title) {
      alert('Please enter a task title');
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, editingTask.columnId, title, description);
    } else {
      addTask(newTaskColumn, title, description);
    }

    closeModal();
  };

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
    e.dataTransfer.setData('text/plain', ''); 
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask && draggedFromColumn !== columnId) {
      moveTask(draggedTask.id, draggedFromColumn, columnId);
    }
  };

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>Kanban Board</h1>
        <button 
          className="add-task-btn"
          onClick={() => openAddModal()}
        >
          + Add Task
        </button>
      </header>

      <div className="kanban-board">
        {Object.values(columns).map(column => (
          <div 
            key={column.id}
            className="kanban-column"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="column-header">
              <h2 className="column-title">{column.title}</h2>
              <span className="task-count">{column.tasks.length}</span>
            </div>
            
            <div className="tasks-container">
              {column.tasks.length === 0 ? (
                <div className="empty-state">No tasks</div>
              ) : (
                column.tasks.map(task => (
                  <div
                    key={task.id}
                    className="task"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="task-title">{task.title}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-actions">
                      <button 
                        className="task-action-btn edit-btn"
                        onClick={() => openEditModal(task, column.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="task-action-btn delete-btn"
                        onClick={() => deleteTask(task.id, column.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button 
              className="add-to-column-btn"
              onClick={() => openAddModal(column.id)}
            >
              + Add to {column.title}
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              {!editingTask && (
                <div className="form-group">
                  <label htmlFor="column">Column</label>
                  <select 
                    id="column"
                    name="column"
                    value={newTaskColumn}
                    onChange={(e) => setNewTaskColumn(e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input 
                  type="text" 
                  id="title"
                  name="title"
                  defaultValue={editingTask?.title || ''}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description"
                  name="description"
                  defaultValue={editingTask?.description || ''}
                  rows="4"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingTask ? 'Update Task' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;