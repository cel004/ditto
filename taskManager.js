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

        li.appendChild(deleteButton);
        li.appendChild(taskContent);
        taskList.appendChild(li);
        
        taskInput.value = ''; // resets input
        editTask(taskContent);
        deleteTask(deleteButton, taskContent);
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

function editTask(taskContent) {
    taskContent.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskContent.textContent;
        input.style.border = 'none';
        input.style.outline = 'none';

        input.style.fontSize = 'inherit';
        input.style.background = 'transparent';
        input.style.boxSizing = 'border-box';

        const parent = taskContent.parentElement;
        parent.replaceChild(input, taskContent);
        input.focus();

        function saveEdit() {
            taskContent.textContent = input.value.trim() || 'New Task';
            parent.replaceChild(taskContent, input);
        }

        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
        input.addEventListener('blur', saveEdit);
    });
}

    
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        addTask();
    }
});