function addTask() {
    let taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('tasks');
    const taskText = taskInput.value.trim();

    const heart = document.createElement('img');
    heart.src = './assets/heart.png';
    heart.width = 15;
    heart.height = 15;

    // const filledHeart = document.createElement('img');
    // filledHeart.src = './assets/filled_heart.png';
    // filledHeart.width = 15;
    // filledHeart.height = 15;

    if (taskText) {
        // li = list item
        const li = document.createElement('li');

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
        deleteTask(deleteButton, taskContent);
    }
}
function deleteTask(deleteButton, taskContent) {
    deleteButton.addEventListener('click', function () {
        if (taskContent.style.textDecoration === 'line-through') {
            deleteButton.style.userSelect = 'none';
            taskContent.style.textDecoration = 'none';
            taskContent.style.opacity = '1';
            // heart.src = './assets/heart.png';
        } else {
            deleteButton.style.userSelect = 'none';
            taskContent.style.textDecoration = 'line-through';
            taskContent.style.opacity = '0.5';
            // heart.src = './assets/filled_heart.png'
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