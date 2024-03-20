let inputField = document.querySelector('.input-field'),
    addButton = document.querySelector('.add'),
    userPlans = document.querySelector('.user-plans');

    let planSet = [];

    addButton.addEventListener('click', function(){
        
        let newPlan = {
            planText: inputField.value,
            checked: false
        };

        planSet.push(newPlan);
        showPlan();
    });

    function showPlan(){
        let showPlan = '';
        planSet.forEach(function(item, i){
            showPlan += `
            <li>
                <input type='checkbox' id='item_${i}'
                <label for='item_${i}'>${item.planText}</label>
            </li>
            `;
            userPlans.innerHTML = showPlan;
        });

    }