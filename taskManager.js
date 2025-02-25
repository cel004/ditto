function addTask() {
    let taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('tasks');
    const addButton = document.getElementById('addTaskButton');

    if (!taskInput) {
        taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.id = 'taskInput';
        taskInput.placeholder = 'Enter new task';
        
        addButton.parentNode.insertBefore(taskInput, addButton); // Insert input above button

        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    }

    taskInput.style.display = 'block';
    taskInput.focus();

    const taskText = taskInput.value.trim();

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
