let tasks = []; //Array to holds all tasks

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("add-task-btn");

addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim(); //Get the value from input field

    if (taskText === "") return; // if input is empty, do nothing

    tasks.push(taskText); //Add the new task to the end of the tasks array

    displayTasks(); //call function to create and display the task

    taskInput.value = ""; //Clear the input field
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
            listItem.classList.toggle("completed", this.checked);
        });

        //create span to hold task text not affected by checkbox
        const textSpan = document.createElement("span");
        textSpan.textContent = task; // put text inside the span


        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            const newTask = prompt("edit your task:", task);
            if (newTask) {
                tasks[index] = newTask.trim();
                displayTasks();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            displayTasks();
        });


        listItem.appendChild(checkbox); //Add the checkbox to the list item
        listItem.appendChild(textSpan); // Add the text span to the list item like: <li><input type="checkbox"><span>Task Text</span></li>
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        //Add li to the task list ul like: <ul><li>...</li></ul>
        taskList.appendChild(listItem);
    });
}
