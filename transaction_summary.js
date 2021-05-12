if (!localStorage.getItem('user')) location.href = 'admin_login.html';
const filterBtn = document.getElementById('filter-btn');
const logoutBtn = document.getElementById('logout-btn');
console.log(filterBtn);

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
}

const fetchTransactions = async () => {
  document.querySelector('.loader').style.display = 'flex';
  const data = {
    fromDate: document.getElementById('from').value,
    toDate: document.getElementById('to').value,
  };
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/load_transaction_summary.php',
    data
  );
  updateUI(responseData);
};

const updateUI = (responseData) => {
  document.querySelector('.loader').style.display = 'none';
  const transactions = responseData.transaction_list;
  let total = 0;
  console.log(transactions);
  const transactionsUI = transactions.map((transaction) => {
    let amount;
    if (transaction.membership_id.localeCompare('198231')) amount = 499.99;
    if (transaction.membership_id.localeCompare('198232')) amount = 1299.99;
    if (transaction.membership_id.localeCompare('198233')) amount = 13999.99;
    total += amount;
    const dateTime = transaction.purchase_date.split(' ');
    const element = document.createElement('div');
    element.className = 'row';
    element.innerHTML = `
      <p>${transaction.transaction_id}</p>
      <p>${transaction.member_id}</p>
      <p>P ${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
      <p>${dateTime[1]}</p>
      <p>${dateTime[0]}</p>
    `;
    return element;
  });

  const totalElement = document.createElement('div');
  totalElement.id = 'total';
  totalElement.innerHTML = `
  <h4>Total</h4>
  <p>P ${total.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
  `
  transactionsUI.forEach((transactionUI) => {
    document
      .getElementById('table-body')
      .insertAdjacentElement('beforeend', transactionUI);
  });

  document.getElementById('members-table').insertAdjacentElement('afterend', totalElement);
};

filterBtn.addEventListener('click', (event) => {
  event.preventDefault();
  fetchTransactions();
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  location.href = 'index.html';
})
