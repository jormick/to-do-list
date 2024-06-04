let inputField = document.querySelector('.input-field'),
    addButton = document.querySelector('.add'),
    userPlans = document.querySelector('.plans-container'),
    actualPlan = document.querySelector('.actual-plan');

let planSet = [];

if (localStorage.getItem('todo')) {
    planSet = JSON.parse(localStorage.getItem('todo'));
    toDoListDisplay();
}

addButton.addEventListener('click', function () {

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
});

function toDoListDisplay() {
    let showPlan = '';
    planSet.forEach(function (item, i) {
        showPlan += `
            <li class="actual-plan">
                <div class="plan-text">
                    <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                    <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.planText}</label>
                </div>
                <button class="delete-button" id='item_${i}'>Del</button>
            </li>
            `;
    });
    userPlans.innerHTML = showPlan;
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

userPlans.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        let index = event.target.getAttribute('data-index');
        planSet.splice(index, 1);
        toDoListDisplay();
        localStorage.setItem('todo', JSON.stringify(planSet));
    }
});

userPlans.addEventListener('click', function (event) {
    if (event.target.classList.contains()) {
        let index = event.target.getAttribute('data-index');
        planSet.splice(index, 1);
        toDoListDisplay();
        localStorage.setItem('todo', JSON.stringify(planSet));
    }
});

userPlans.addEventListener('click', function(event) {

});