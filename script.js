document.addEventListener("DOMContentLoaded", () => {
    
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //Initialize tasks array from localStorage or empty array

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Get refrences to Dom elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("add-task-btn");
const clearAllButton = document.getElementById("clear-tasks-btn");

//Add task
addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim(); //Get the value from input field

    if (taskText === "") return; // if input is empty, do nothing

    const today = new Date();//Get today's date
    const Options = {year: "numeric", month: "short", day: "numeric"};
    const formattedDate = today.toLocaleDateString("en-GB", Options);

    tasks.push({
        text:taskText,
        dueDate: formattedDate,
        completed: false
    }); //Add the new task to the end of the tasks array
    
    saveTasksToLocalStorage(); //Save updated tasks array to localStorage
    displayTasks(); //call function to create and display the task
    taskInput.value = ""; //Clear the input field
    updateClearAllButtonState();//Update the state of the clear all button
});

//Function to display all tasks
function displayTasks() {
    taskList.innerHTML = ""; //clear existing tasks

    //Loop through tasks array and create list items
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li"); //Create new list item

        //create checkbox to mark tasks as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            task.completed = this.checked; //Update task completion status
            listItem.classList.toggle("completed", this.checked);
            saveTasksToLocalStorage();
        });

        //create span to hold task text not affected by checkbox
        const textSpan = document.createElement("span");
        textSpan.textContent = task.text; // put text inside the span
        checkbox.checked = task.completed; //Set checkbox state based on task completion
        if (task.completed) {
            listItem.classList.add("completed"); //Add completed class if task is marked as completed
        }

        //create span to hold due date
        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` ${task.dueDate}`;
        dateSpan.classList.add("due-date");
        listItem.appendChild(dateSpan);

        //Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            const newTask = prompt("Edit your task:", task.text);
            if (newTask) {
                tasks[index].text = newTask.trim();
                saveTasksToLocalStorage();
                displayTasks();
            }
        });

        //Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasksToLocalStorage();
            displayTasks();
            updateClearAllButtonState()
        });

        //Append elements to list item
        listItem.appendChild(checkbox); //Add the checkbox to the list item
        listItem.appendChild(textSpan); // Add the text span to the list item like: <li><input type="checkbox"><span>Task Text</span></li>
        listItem.appendChild(dateSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        //Add li to the task list ul like: <ul><li>...</li></ul>
        taskList.appendChild(listItem);
    });
}

//clear all tasks
clearAllButton.addEventListener("click", function () {
    if (tasks.length === 0) return; //if no tasks, do nothing

    const confirmed = confirm ("Are you sure you want to clear all tasks?");
    if (!confirmed) return;

    tasks = []; //Clear the tasks array
    saveTasksToLocalStorage(); //Update localStorage, clear from the localStorage
    displayTasks();//Refresh the task list display
    updateClearAllButtonState();
})

function updateClearAllButtonState() {
    clearAllButton.disabled = tasks.length === 0;
}
updateClearAllButtonState();
displayTasks(); //Display tasks on page load
});

////////////// Dark Mode Toggle //////////////////
const themeToggleBtn = document.getElementById("theme-toggle-btn");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    themeToggleBtn.textContent = isDarkMode ? "☀️" : "🌙";

    //update localStorage and aria-pressed attribute
    localStorage.setItem("theme", isDarkMode? "dark" : "light");
        themeToggleBtn.setAttribute("aria-pressed", isDarkMode? "true" : "false");
})

//On page load, set the theme based on localStorage
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn.setAttribute("aria-pressed", "true");
    themeToggleBtn.textContent = "☀️";
} else {
    themeToggleBtn.textContent = "🌙";
    themeToggleBtn.setAttribute("aria-pressed", "false");
}