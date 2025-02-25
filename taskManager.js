function addTask() {
    let taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('tasks');
    const taskText = taskInput.value.trim();

    if (taskText) {
        // li = list item
        const li = document.createElement('li');

        // create delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '♡';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.marginLeft = '10px';

        // create task content (task text)
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        // append delete button first, then task content
        li.appendChild(deleteButton);
        li.appendChild(taskContent);

        // append the li to the task list
        taskList.appendChild(li);

        // clear the input field
        taskInput.value = '';

        // call deleteTask function
        deleteTask(deleteButton, li);
    }
}

function deleteTask(deleteButton, taskContent) {
    deleteButton.addEventListener('click', function () {
        if (taskContent.style.textDecoration === 'line-through') {
            deleteButton.style.userSelect = 'none';
            taskContent.style.textDecoration = 'none';
            taskContent.style.opacity = '1';
        } else {
            deleteButton.style.userSelect = 'none';
            taskContent.style.textDecoration = 'line-through';
            taskContent.style.opacity = '0.5';
        }
    });
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
