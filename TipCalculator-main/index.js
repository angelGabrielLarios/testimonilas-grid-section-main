// Errors
let billError = document.getElementById('b-error-message');
let peopleError = document.getElementById('p-error-message');

// Inputs
let billTotal = document.getElementById('bill-total');
let peopleTotal = document.getElementById('people-total');
let customTip = document.getElementById('custom-tip');

// Buttons
let button = document.querySelectorAll('.tip-btn');
let resetButton = document.querySelector('.reset');
let current = document.querySelector('.current');
let defaultButton = document.querySelector('.default');

// Totals
let tipTotal = document.getElementById('tip-total');
let tipAmount = document.getElementById('tip-amount');

// Bill total event handling


billTotal.addEventListener("click", () => {
    peopleTotal.value = '';
    customTip.value = '';
    billTotal.style.border = '';
    return;

});

    

// People total event handling
peopleTotal.addEventListener("click", () => {

    peopleTotal.style.border = '';
    customTip.value = '';
    return;

});

    
// Catch number of people or bill total === 0
function isError(value, inputElement, errorElement) {

    if(Number(value) <= 0) {

        errorElement.textContent = "Number > 0";
        inputElement.style.border = "2px solid red";
        return false;

    }

    errorElement.textContent = "";
    inputElement.style.border = "2px solid transparent";
    return true;
};

// Button event listener / validation
button.forEach((tipPercentage) => {

    tipPercentage.addEventListener('click', () => {

        let percent = Number(tipPercentage.textContent.replace('%', "")) / 100;

        // Set current button to button clicked
        current.classList.remove('current');
        tipPercentage.classList.add('current');
        current = tipPercentage;

        customTip.value = '';

        if(isError(billTotal.value, billTotal, billError) && isError(peopleTotal.value, peopleTotal, peopleError)) {

            getResult(percent);

            return;
        }

        return;
    });

});


customTip.addEventListener("input", () => {

    let cTip = Number(customTip.value) / 100;

    current.classList.remove("current");
    current = customTip;

    if(isError(billTotal.value, billTotal, billError) && isError(peopleTotal.value, peopleTotal, peopleError)) {

        getResult(cTip);
        return;

    }

    return;
});

function getResult(percentage) {

    let bill = Number(billTotal.value);
    let people = Number(peopleTotal.value);
    

    if(bill > 0 && people > 0) {

        let tip = ((bill * percentage) / people).toFixed(2);

        let totalAmount = ((bill / people) + Number(tip)).toFixed(2);
        
        tipAmount.textContent = `$${tip}`;
        tipTotal.textContent = `$${totalAmount}`;

    }


    return;
};

resetButton.addEventListener('click', () => {

    tipAmount.textContent = "$0.00";
    tipTotal.textContent = "$0.00";

    billError.textContent = "";
    peopleError.textContent = "";

    billTotal.value = '';
    peopleTotal.value = '';

    billTotal.style.border = '';
    peopleTotal.style.border = '';

    current.classList.remove('current');
    defaultButton.classList.add('current');
    current = defaultButton;

});
