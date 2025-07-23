const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const span = document.createElement('span');
        span.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? '✅' : '✔️';
        completeBtn.onclick = () => toggleComplete(index);

        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.onclick = () => deleteTask(index);

        actions.append(completeBtn, editBtn, delBtn);
        li.append(span, actions);
        taskList.appendChild(li);
    });
}

function addTask(text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
    }
});

renderTasks();