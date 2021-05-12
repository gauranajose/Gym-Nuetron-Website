if (!localStorage.getItem('user')) location.href = 'admin_login.html';
const addBtn = document.getElementById('add-btn');
const closeModalBtn = document.getElementById('close-btn');
const logoutBtn = document.getElementById('logout-btn');

console.log(addBtn);

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then(response => {
    return response.json();
  })
}

const hideModal = () => {
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('backdrop').style.display = 'none';
  location.reload();
  return false;
}

const openModal = () => {
  document.getElementById('confirmation-modal').style.display = 'flex';
  document.getElementById('backdrop').style.display = 'block';
}

const showResult = (responseData) => {
  const element = document.createElement('h3');
  if (responseData.message.localeCompare('Trainer Created!') === 0) {
    element.innerHTML = 'Succesfully Added Trainer!';
    element.style.color = '#019B67';
  }
  else {
    element.innerHTML = 'Failed to Add Trainer!';
    element.style.color = '#cf2c2c';
  }
  closeModalBtn.style.display = 'block';
  document.querySelector('#confirmation-modal .loader').style.display = 'none';
  console.log(document.querySelector('#confirmation-modal .loader'));
  document.getElementById('confirmation-modal').insertAdjacentElement('beforeend', element);
  console.log(responseData);
}

addBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  let schedule;
  if (document.getElementById('MWF').checked) schedule = 'MWF';
  if (document.getElementById('TTHS').checked) schedule = 'TTHS';
  if (document.getElementById('Weekends').checked) schedule = 'Weekends';
  const data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    mobileNum: document.getElementById('mobileNum').value,
    email: document.getElementById('email').value,
    schedule: schedule,
    password: '00000000000',
  };
  console.log(data);
  openModal();
  const responseData = await sendHttpRequest('POST', 'https://project-website-php.000webhostapp.com/api/create_trainer.php', data);
  showResult(responseData);
});

closeModalBtn.addEventListener('click', hideModal);

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  location.href = 'index.html';
});

