function addTask(){
    const taskInput = document.createElement('taskInput');
    const taskList = document.createElement('tasks');
    const taskText = taskInput.ariaValueMax.trim();

    if(taskText){
        // li = list item
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

document.getElementById('addTaskButton').addEventListener('click', addTask);