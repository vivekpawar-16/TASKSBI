// let expenses =[]
// let totalAmount = 0;
// const categorySelect = document.getElementById('category_select')
// const amountInput = document.getElementById('amount_input')
// const InfoInput = document.getElementById('info')
// const dateInput = document.getElementById('date_input')
// const addBtn = document.getElementById('add_btn')
// const expenseTableBody = document.getElementById('expense-table-body')
// const totalAmountCell = document.getElementById('total-amount')

// addBtn.addEventListener('click',function(){
//     const category=categorySelect.value;
//     const info=InfoInput.value;
//     const amount =Number(amountInput.value);
//     const date = dateInput.value;

//     if(category ===''){
//         alert('please select a category');
//         return;
//     }
//     if(isNaN(amount) || amount<=0){
//         alert('please enter a valid amount');
//         return;
//     }
//     if(info ===''){
//         alert('please enter a valid amount info');
//         return;
//     }
//     if(date ===''){
//         alert('please select a date');
//         return;
//     }
//     expenses.push({category,amount,info,date})
//     if(category === 'Income'){
//         totalAmount+=amount;
//     }
//     if(category === 'Expense'){
//         totalAmount-=amount;
//     }
//      totalAmountCell.textContent = totalAmount;

//      const newRow = expenseTableBody.insertRow();

//      const categoryCell = newRow.insertCell();
//      const AmountCell = newRow.insertCell();
//      const InfoCell = newRow.insertCell();
//      const dateCell = newRow.insertCell();
//      const deleteCell = newRow.insertCell();

//      const deleteBtn = document.createElement('button');
//      deleteBtn.textContent ='Delete';
//      deleteBtn.classList.add('delete-btn');
//      deleteBtn.addEventListener('click', function(){
//         expenses.splice(expenses.indexOf(expense),1);
//         if(category === 'Income'){
//             totalAmount-=amount;
//         }
//         if(category === 'Expense'){
//             totalAmount+=amount;
//         }

//         totalAmountCell.textContent=totalAmount;
//         expenseTableBody.removeChild(newRow)
//      })
//      const expense = expenses[expenses.length-1];
//      categoryCell.textContent=expense.category;
//      AmountCell.textContent=expense.amount;
//      InfoCell.textContent=expense.info;
//      dateCell.textContent=expense.date;
//      deleteCell.appendChild(deleteBtn);


// });
// for(const expense of expenses){
//     if(category === 'Income'){
//         totalAmount+=amount;
//     }
//     if(category === 'Expense'){
//         totalAmount-=amount;
//     }
//      totalAmountCell.textContent = totalAmount;

//      const newRow = expenseTableBody.insertRow();

//      const categoryCell = newRow.insertCell();
//      const AmountCell = newRow.insertCell();
//      const InfoCell = newRow.insertCell();
//      const dateCell = newRow.insertCell();
//      const deleteCell = newRow.insertCell();

//      const deleteBtn = document.createElement('button');
//      deleteBtn.textContent ='Delete';
//      deleteBtn.classList.add('delete-btn');
//      deleteBtn.addEventListener('click', function(){
//         expenses.splice(expenses.indexOf(expense),1);
//         if(category === 'Income'){
//             totalAmount-=amount;
//         } 
//         if(category === 'Expense'){
//             totalAmount+=amount;
//         }

//         totalAmountCell.textContent=totalAmount;
//         expenseTableBody.removeChild(new Row)
//      })
//      const expense = expenses[expenses.length-1];
//      categoryCell.textContent=expense.category;
//      AmountCell.textContent=expense.amount;
//      InfoCell.textContent=expense.info;
//      dateCell.textContent=expense.date;
//      deleteCell.appendChild(deleteBtn);
// }
let expenses = [];
let totalAmount = 0;
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const InfoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const info = InfoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter valid information');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Add the expense to the expenses array (for client-side display)
    expenses.push({ category, amount, info, date });

    // Calculate the total amount
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }

    // Update the total amount displayed
    totalAmountCell.textContent = totalAmount;

    // Create a new expense object to send to the server
    const newExpense = {
        category: category,
        amount: amount,
        info: info,
        date: date
    };

    // Send an AJAX request to the server to add the expense to the database
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Expense added:', data);
            // You can update the UI if needed based on the server response
        })
        .catch(error => {
            console.error('Error adding expense:', error);
            // Handle the error, e.g., display an error message to the user
        });

    // Clear the input fields after adding the expense
    categorySelect.value = '';
    amountInput.value = '';
    InfoInput.value = '';
    dateInput.value = '';
});
