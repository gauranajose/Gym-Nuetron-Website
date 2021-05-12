if (!localStorage.getItem('memberID')) location.href = 'login.html';
const memberId = localStorage.getItem('memberID');
const logoutBtn = document.getElementById('logout-btn');
const weeklyBtn = document.getElementById('btn-1');
const monthlyBtn = document.getElementById('btn-2');
const annuallyBtn = document.getElementById('btn-3');
const closeModalBtn = document.getElementById('close-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

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
  if (responseData.message.localeCompare('Membership Extended') === 0) {
    element.innerHTML = 'Succesfully Extended Membership!';
    element.style.color = '#019B67';
  }
  else {
    element.innerHTML = 'Failed to Extend Membership!';
    element.style.color = '#cf2c2c';
  }
  closeModalBtn.style.display = 'block';
  document.querySelector('#confirmation-modal .loader').style.display = 'none';
  console.log(document.querySelector('#confirmation-modal .loader'));
  document.getElementById('confirmation-modal').insertAdjacentElement('beforeend', element);
  console.log(responseData);
}

weeklyBtn.addEventListener('click', async () => {
  openModal();
  const data = {
    memberID: memberId,
    membership: 'Weekly',
  };
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/extend_membership.php',
    data
  );
  showResult(responseData);
});

monthlyBtn.addEventListener('click', async () => {
  openModal();
  const data = {
    memberID: memberId,
    membership: 'Monthly',
  };
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/extend_membership.php',
    data
  );
  showResult(responseData);
});

annuallyBtn.addEventListener('click', async () => {
  openModal();
  const data = {
    memberID: memberId,
    membership: 'Annually',
  };
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/extend_membership.php',
    data
  );
  showResult(responseData);
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('memberID');
  location.href = 'index.html';
})

closeModalBtn.addEventListener('click', hideModal);
