function addTask(){
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('tasks');
    const taskText = taskInput.value.trim();

    if(taskText){
        // li = list item
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

document.getElementById('addTaskButton').addEventListener('click', addTask);