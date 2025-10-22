let tasks = []; //Array to holds all tasks

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("add-task-btn");

addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim(); //Get the value from input field

    if (taskText === "") return; // if input is empty, do nothing

    tasks.push(taskText) //Add the new task to the end of the tasks array
    
    displayTasks(); //call function to create and display the task

    taskInput.value = ""; //Clear the input field
});

//Function to display all tasks
function displayTasks() {
    taskList.innerHTML = ""; //clear existing tasks

    //Loop through tasks array and create list items
    tasks.forEach(add => {
        const listItem = document.createElement("li"); //Create new list item
        listItem.textContent = add;  //set the text of the list item
        taskList.appendChild(listItem); // Add the list item to the task list
    });
    
}