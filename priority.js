//////////////////////////////////////////////////////////////////// TODO JS
let skillDisplayWrap = document.getElementById('todo_wrap_skills');               // skills outer wrapper
let projectDisplayWrap = document.getElementById('todo_wrap_projects');           // projects outer wrapper

let skillInput = document.getElementById('todo_name_skills');                     // skills input field
let projectInput = document.getElementById('todo_name_projects');                 // projects input field

let skillsAddTodo = document.getElementById('skills_add_todo');                   // skills add button
let projectsAddTodo = document.getElementById('projects_add_todo');               // projects add button

let wrapperSkills = document.getElementById('wrapperSkills');                     // skills inner wrapper
let wrapperProjects = document.getElementById('wrapperProjects');                 // projects inner wrapper

let skillsNextTodo = document.getElementById('skills_next_todo');                 // skills next button
let projectsNextTodo = document.getElementById('projects_next_todo');             // projects next button

let skillsHideTodo = document.getElementById('skills_hide_todo');                 // skills hide button
let projectsHideTodo = document.getElementById('projects_hide_todo');             // projects hide button

let skillsDisplay = document.getElementById('skills_display');                    // skills display
let projectsDisplay = document.getElementById('projects_display');                // projects display

// respective button containers
let skillsButtonContainer = document.getElementById('skills_button_container');
let projectsButtonContainer = document.getElementById('projects_button_container');

// initialize empty arrays to store todos
let skillStore = [];
let projectStore = [];

// define boolean hide variables
let skillsHidden;
let projectsHidden;


// function to add a new item to the list
const addTodoItem = (getInputValue, listType, new_or_old) => {
    if (getInputValue.trim() !== '') {                                            // trim any whitespace

        // determine which wrapper and list to use based on list type
        const whichWrap = listType === 'skills' ? wrapperSkills : listType === 'projects' ? wrapperProjects : null;
        const whichList = listType === 'skills' ? skillStore : listType === 'projects' ? projectStore : null;
        const whichDisplay = listType === 'skills' ? skillsDisplay : listType === 'projects' ? projectsDisplay : null;
        const whichInput = listType === 'skills' ? skillInput : listType === 'projects' ? projectInput : null;

        // add old or new items to HTML
        if (new_or_old === 'old') {                                               // BEGIN ADDING OLD ITEMS

            // begin creating new HTML item to be displayed
            let oldItemDiv = document.createElement('div');
            oldItemDiv.className = 'item';
            oldItemDiv.textContent = getInputValue;

            // include item in HTML inner wrapper
            whichWrap.appendChild(oldItemDiv);

            // create respective delete button for HTML item
            let delete_todo = document.createElement('div');
            delete_todo.className = 'delete';
            delete_todo.innerHTML = "X";
            oldItemDiv.appendChild(delete_todo);

            // functionality for individual delete buttons
            delete_todo.addEventListener('click', () => {
                let index = Array.from(whichWrap.children).indexOf(oldItemDiv);
                oldItemDiv.parentNode.removeChild(oldItemDiv);
                whichList.splice(index, 1);
                if (index === 0) {
                    if (whichWrap.children.length > 0) {
                        whichDisplay.textContent = whichWrap.children[0].textContent.slice(0, -1);
                    } else {
                        whichDisplay.textContent = '';
                    }
                }
            });

            // empty display
            whichInput.value = '';

            // display added item if the display is already empty
            if (whichDisplay.textContent === '') {
                whichDisplay.textContent = oldItemDiv.textContent.slice(0, -1);
            }
        } else if (new_or_old === 'new') {                                        // BEGIN ADDING NEW ITEMS

            // populate specific arrays
            if (listType == 'skills') {
                skillStore.push({text: getInputValue, type: 'skills'});
            }
            if (listType == 'projects') {
                projectStore.push({text: getInputValue, type: 'projects'});
            }

            // begin creating new HTML item to be displayed
            let newItemDiv = document.createElement('div');
            newItemDiv.className = 'item';
            newItemDiv.textContent = getInputValue;

            // include item in HTML inner wrapper
            whichWrap.appendChild(newItemDiv);

            // create respective delete button for HTML item
            let delete_todo = document.createElement('div');
            delete_todo.className = 'delete';
            delete_todo.innerHTML = "X";
            newItemDiv.appendChild(delete_todo);

            // functionality for individual delete buttons
            delete_todo.addEventListener('click', () => {
                let index = Array.from(whichWrap.children).indexOf(newItemDiv);
                newItemDiv.parentNode.removeChild(newItemDiv);
                whichList.splice(index, 1);
                if (index === 0) {
                    if (whichWrap.children.length > 0) {
                        whichDisplay.textContent = whichWrap.children[0].textContent.slice(0, -1);
                    } else {
                        whichDisplay.textContent = '';
                    }
                }
            });

            // empty display
            whichInput.value = '';

            // display added item if the display is already empty
            if (whichDisplay.textContent === '') {
                whichDisplay.textContent = newItemDiv.textContent.slice(0, -1);
            }
        }
    }
};

// function to save todos to local storage
const saveTodos = () => {

    // define items from both wrappers
    const skillWrapItems = wrapperSkills.querySelectorAll('.item');
    const projectWrapItems = wrapperProjects.querySelectorAll('.item');

    // arrays to process new order of items
    const skillsReorderArray = [];
    const projectsReorderArray = [];

    // append items in order from wrappers to the respective arrays
    skillWrapItems.forEach(itemInWrap => {
        let itemValue = itemInWrap.textContent.slice(0, -1).trim();
        skillsReorderArray.push(itemValue);
    });
    projectWrapItems.forEach(itemInWrap => {
        let itemValue = itemInWrap.textContent.slice(0, -1).trim();
        projectsReorderArray.push(itemValue);
    });

    // empty the current storage arrays
    skillStore = [];
    projectStore = [];

    // append items in new order from reorder arrays to storage arrays
    skillsReorderArray.forEach(itemInArray => {
        skillStore.push({text: itemInArray, type: 'skills'});
    });
    projectsReorderArray.forEach(itemInArray => {
        projectStore.push({text: itemInArray, type: 'projects'});
    });

    localStorage.setItem('skillsKey', JSON.stringify(skillStore));                // save skillStore array with key 'skillsKey'
    localStorage.setItem('projectsKey', JSON.stringify(projectStore));            // save projectStore array with key 'projectsKey'
};

// function to load todos from local storage
const loadTodos = () => {

    const skillsTodosString = localStorage.getItem('skillsKey');                  // retrieve skillStore array with key 'skillsKey'
    const projectsTodosString = localStorage.getItem('projectsKey');              // retrieve projectsStore array with key 'projectsKey'

    if (skillsTodosString) {
        skillStore = JSON.parse(skillsTodosString);                               // convert string to JS object
        repopulateLists(skillStore, 'skills');                                    // repopulate skill wrapper using array and list type
    }

    if (projectsTodosString) {
        projectStore = JSON.parse(projectsTodosString);                           // convert string to JS object
        repopulateLists(projectStore, 'projects');                                // repopulate project wrapper using array and list type
    }
};

// function to repopulate the list
const repopulateLists = (todoArray, arrayType) => {
    // clear the existing list before repopulating it
    const whichWrap = arrayType === 'skills' ? wrapperSkills : arrayType === 'projects' ? wrapperProjects : null;
    whichWrap.innerHTML = '';

    // repopulate respective list with each todo item
    todoArray.forEach(todoItem => {
        todoItemString = todoItem.text;
        addTodoItem(todoItemString, arrayType, 'old');                            // iteratively repopulate
    });
};

// checks boolean hide variables
const checkVisibility = () => {

    // load booleans for hidden/visible inner wrappers
    const skillsHiddenProx = JSON.parse(localStorage.getItem('skillsHide'));
    const projectsHiddenProx = JSON.parse(localStorage.getItem('projectsHide'));

    // hide respective list if hidden on page unload
    if (skillsHiddenProx === true) {
        wrapperSkills.classList.add('hidden');                                          // hide skills inner wrapper
        // change height values for HTML elements
        skillDisplayWrap.style.height = "250px";
        skillsDisplay.style.marginTop = "10px";
        skillsDisplay.style.marginBottom = "10px";
        skillsButtonContainer.style.height = "115px";
        skillInput.style.height = "70px";
    } else {
        wrapperSkills.classList.remove('hidden');                                      // show skills inner wrapper
        // change height values for HTML elements
        skillDisplayWrap.style.height = "400px";
        skillsDisplay.style.marginTop = "5px";
        skillsDisplay.style.marginBottom = "5px";
        skillsButtonContainer.style.height = "70px";
        skillInput.style.height = "40px";
    }
    if (projectsHiddenProx === true) {
        wrapperProjects.classList.add('hidden');                                       // hide projects inner wrapper
        // change height values for HTML elements
        projectDisplayWrap.style.height = "250px";
        projectsDisplay.style.marginTop = "10px";
        projectsDisplay.style.marginBottom = "10px";
        projectsButtonContainer.style.height = "115px";
        projectInput.style.height = "70px";
    } else {
        wrapperProjects.classList.remove('hidden');                                    // show projects inner wrapper
        // change height values for HTML elements
        projectDisplayWrap.style.height = "400px";
        projectsDisplay.style.marginTop = "5px";
        projectsDisplay.style.marginBottom = "5px";
        projectsButtonContainer.style.height = "70px";
        projectInput.style.height = "40px";
    }
};


// event listeners for respective add buttons
skillsAddTodo.addEventListener('click', () => {addTodoItem(skillInput.value, 'skills', 'new')});
projectsAddTodo.addEventListener('click', () => {addTodoItem(projectInput.value, 'projects', 'new')});

// event listeners for pressing Enter key to add items
skillInput.addEventListener('keypress', (event) => {                              // keypress skills
    if (event.key === 'Enter') {
        addTodoItem(skillInput.value, 'skills', 'new');
    }
});
projectInput.addEventListener('keypress', (event) => {                            // keypress projects
    if (event.key === 'Enter') {
        addTodoItem(projectInput.value, 'projects', 'new');
    }
});

// event listeners for respective next buttons
skillsNextTodo.addEventListener('click', () => {
    if (wrapperSkills.children.length > 0) {
        let firstItem = wrapperSkills.children[0];
        wrapperSkills.removeChild(firstItem);
        wrapperSkills.appendChild(firstItem);
        if (wrapperSkills.children.length > 0) {
            skillsDisplay.textContent = wrapperSkills.children[0].textContent.slice(0, -1);
        } else {
            skillsDisplay.textContent = '';
        }
    }
});
projectsNextTodo.addEventListener('click', () => {
    if (wrapperProjects.children.length > 0) {
        let firstItem = wrapperProjects.children[0];
        wrapperProjects.removeChild(firstItem);
        wrapperProjects.appendChild(firstItem);
        if (wrapperProjects.children.length > 0) {
            projectsDisplay.textContent = wrapperProjects.children[0].textContent.slice(0, -1);
        } else {
            projectsDisplay.textContent = '';
        }
    }
});

// event listeners for respective hide buttons
skillsHideTodo.addEventListener('click', () => {
    wrapperSkills.classList.toggle('hidden');                                     // hide skills list
    // toggle container height
    if (wrapperSkills.classList.contains('hidden')) {
        // keep lists hidden on page reload
        skillsHidden = true;
        localStorage.setItem('skillsHide', skillsHidden);
        // change height values for HTML elements
        skillDisplayWrap.style.height = "250px";
        skillsDisplay.style.marginTop = "10px";
        skillsDisplay.style.marginBottom = "10px";
        skillsButtonContainer.style.height = "115px";
        skillInput.style.height = "70px";
    } else {
        skillsHidden = false;
        localStorage.setItem('skillsHide', skillsHidden);
        // change height values for HTML elements
        skillDisplayWrap.style.height = "400px";
        skillsDisplay.style.marginTop = "5px";
        skillsDisplay.style.marginBottom = "5px";
        skillsButtonContainer.style.height = "70px";
        skillInput.style.height = "40px";
    }
});
projectsHideTodo.addEventListener('click', () => {
    wrapperProjects.classList.toggle('hidden');                                   // hide projects list
    // toggle container height
    if (wrapperProjects.classList.contains('hidden')) {
        // keep lists hidden on page reload
        projectsHidden = true;
        localStorage.setItem('projectsHide', projectsHidden);
        // change height values for HTML elements
        projectDisplayWrap.style.height = "250px";
        projectsDisplay.style.marginTop = "10px";
        projectsDisplay.style.marginBottom = "10px";
        projectsButtonContainer.style.height = "115px";
        projectInput.style.height = "70px";
    } else {
        projectsHidden = false;
        localStorage.setItem('projectsHide', projectsHidden);
        // change height values for HTML elements
        projectDisplayWrap.style.height = "400px";
        projectsDisplay.style.marginTop = "5px";
        projectsDisplay.style.marginBottom = "5px";
        projectsButtonContainer.style.height = "70px";
        projectInput.style.height = "40px";
    }
});

// event listeners for Sortable reorder
new Sortable(wrapperSkills, {
    animation: 300,
    onUpdate: function (evt) {
        skillsDisplay.textContent = wrapperSkills.children[0].textContent.slice(0, -1);
    }
});
new Sortable(wrapperProjects, {
    animation: 300,
    onUpdate: function (evt) {
        projectsDisplay.textContent = wrapperProjects.children[0].textContent.slice(0, -1);
    }
});

// load todos from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// load boolean hide values
document.addEventListener("DOMContentLoaded", checkVisibility);

// save todos to local storage before the page is closed
window.addEventListener('visibilitychange', saveTodos);



//////////////////////////////////////////////////////////////////// TIMER JS
// button variables
const workButton = document.getElementById('work');
const breakButton = document.getElementById('break');
const resetButton = document.getElementById('reset');

// 'timer' stores total seconds elapsed
// 'timeOption' stores which interval
// 'isRunning' stores if timer is running/not

function updateTime() {
    chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
        // const time = document.getElementById("timeDisplay");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");
        let minutesVal = `${res.timeOption - Math.ceil(res.timer / 60)}`;
        let secondsVal = "00"
        if (res.timer % 60 != 0) {
            secondsVal = `${60 - res.timer % 60}`.padStart(2, "0");
        }
        // time.textContent = `${minutes}:${seconds}`;
        minutes.textContent = minutesVal;
        seconds.textContent = secondsVal;
    })
}

// run function and set interval
updateTime();
setInterval(updateTime, 1000);

// work button functionality
workButton.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
	    timer: 0,
	    timeOption: 25,
            isRunning: !res.isRunning,
        }, () => {});
    })
});

// break button functionality
breakButton.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
	    timer: 0,
	    timeOption: 5,
            isRunning: !res.isRunning,
        }, () => {});
    })
});

// reset button functionality
resetButton.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    }, () => {});
});