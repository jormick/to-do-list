let inputField = document.querySelector('.input-field'),
    addButton = document.querySelector('.add'),
    userPlans = document.querySelector('.plans-container');

let planSet = [];

if (localStorage.getItem('todo')) {
    planSet = JSON.parse(localStorage.getItem('todo'));
    toDoListDisplay();
}

// Using the mouse and the “Enter” key to add a plan
addButton.addEventListener('click', function () {
    addPlan();
});

inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addPlan();
    }
});

function addPlan() {
    if (inputField.value !== '') {
        let newPlan = {
            planText: inputField.value,
            checked: false
        };

        planSet.push(newPlan);
        toDoListDisplay();
        localStorage.setItem('todo', JSON.stringify(planSet));
    } else {
        alert("Please, write your plan")
    }
    inputField.value = '';
};

// Add new plan
function toDoListDisplay() {
    let showPlan = '';
    planSet.forEach(function (item, i) {
        showPlan += `
           <li class="actual-plan">
                <div class="plan-text">
                    <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                    <div class="todo-item-text" for='item_${i}' id="${item.important ? 'important' : ''}">${item.planText}</div>
                </div>
                <button class="delete-button" id='item_${i}'>Del</button>
            </li>
            `;
    });
    userPlans.innerHTML = showPlan;

    document.querySelectorAll('.todo-item-text').forEach(function (planTextChange) {
        planTextChange.addEventListener('click', editPlan);
    });
}

function editPlan(event) {
    let planTextChange = event.target;
    let currentText = planTextChange.innerText;
    let input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('edit-input');
    planTextChange.replaceWith(input);
    input.focus();

    function saveEdit() {
        let newText = input.value;
        planTextChange.innerText = newText;
        input.replaceWith(planTextChange);
        let index = planTextChange.parentElement.parentElement.getAttribute('data-index');
        planSet[index].planText = newText;
        localStorage.setItem('todo', JSON.stringify(planSet));
    }

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            input.blur();
        }
    });
}

// Changing checkbox status and saving it in local storage
userPlans.addEventListener('change', function (event) {
    let valueLabel = userPlans.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
    planSet.forEach(function (item) {
        if (item.planText === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(planSet));
        }
    });
});

// Using "Del" button for delete current plan
userPlans.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        let index = event.target.getAttribute('data-index');
        planSet.splice(index, 1);
        toDoListDisplay();
        localStorage.setItem('todo', JSON.stringify(planSet));
    }
});

