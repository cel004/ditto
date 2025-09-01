function addTask() {
    let taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('tasks');
    const taskText = taskInput.value.trim();

    if (taskText) {
        // li = list item
        const li = document.createElement('li');

        const heart = document.createElement('img');
        heart.src = './assets/heart.png';
        heart.width = 15;
        heart.height = 15;
        const completeButton = heart;

        // create delete button
        const deleteButton = document.createElement('span');
        deleteButton.style.color = '#642C14';
        deleteButton.innerHTML  = '';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.marginLeft = '10px';

        // create task content (task text)
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.style.color = '#642C14';

        li.appendChild(heart);
        li.appendChild(taskContent);
        taskList.appendChild(li);
        
        taskInput.value = ''; // resets input
        
        editTask(taskContent);
        deleteTask(completeButton, taskContent);
    }
}

function deleteTask(completeButton, taskContent) {
    completeButton.addEventListener('click', function () {
        if (taskContent.style.textDecoration === 'line-through') {
            completeButton.style.userSelect = 'none';
            taskContent.style.textDecoration = 'none';
            taskContent.style.opacity = '1';
            completeButton.src = './assets/heart.png';
        } else {
            completeButton.style.userSelect = 'none';
            taskContent.style.textDecoration = 'line-through';
            taskContent.style.opacity = '0.5';
            completeButton.src = './assets/filled_heart.png';
            completeButton.style.opacity = '0.8';
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
        input.style.marginLeft = taskContent.style.marginLeft || '10px';

        input.style.fontSize = 'inherit';
        input.style.background = 'transparent';
        input.style.boxSizing = 'border-box';

        input.style.padding = '0';
        input.style.width = 'auto';
        input.style.lineHeight = '1.2';
        input.style.display = 'inline';

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

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    
    if (taskInput.style.display == 'none' || taskInput.style.display == '') {
        taskInput.style.display = 'block';
    } else {
        taskInput.style.display = 'none';
    }
});


    
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        addTask();
    }
});