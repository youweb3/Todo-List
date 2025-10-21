const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("add-task-btn");

addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim(); //Get the value from input field
    
    if (taskText === "") return; // if input is empty, do nothing

    const listItem = document.createElement("li"); //Create new list item
    listItem.textContent = taskText; //set the text of the list item
    taskList.appendChild(listItem); //Add the list item to the task list

    taskInput.value = ""; //Clear the input field

});