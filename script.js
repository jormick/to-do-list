let inputField = document.querySelector('.input-field'),
    addButton = document.querySelector('.add'),
    userPlans = document.querySelector('.user-plans'),
    deleteButton = document.querySelector('.delete-button');

let planSet = [];

if (localStorage.getItem('todo')) {
    planSet = JSON.parse(localStorage.getItem('todo'));
    toDoListDisplay();
}

addButton.addEventListener('click', function () {

    let newPlan = {
        planText: inputField.value,
        checked: false
    };

    planSet.push(newPlan);
    toDoListDisplay();
    localStorage.setItem('todo', JSON.stringify(planSet));
});

function toDoListDisplay() {
    let showPlan = '';
    planSet.forEach(function (item, i) {
        showPlan += `
            <li>
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.planText}</label>
                <button class="delete-button" id='item_${i}'>X</button>
            </li>
            `;
        userPlans.innerHTML = showPlan;
    });
};

userPlans.addEventListener('change', function (event) {
    let valueLabel = userPlans.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
    planSet.forEach(function (item) {
        if (item.planText === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(planSet));
        }
    });
});
