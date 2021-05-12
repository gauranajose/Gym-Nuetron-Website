const createBtn = document.getElementById('create-btn');
const closeModalBtn = document.getElementById('close-btn');
let isCreated = false;
console.log(createBtn);

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
}

const createPost = async () => {
  openModal();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const contactNum = document.getElementById('contact_number').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const weekly = document.getElementById('weekly');
  const monthly = document.getElementById('monthly');
  const annually = document.getElementById('annually');
  let membership;
  if (weekly.checked) membership = weekly.value;
  if (monthly.checked) membership = monthly.value;
  if (annually.checked) membership = weekly.value;

  const post = {
    firstName: firstName,
    lastName: lastName,
    mobileNum: contactNum,
    Email: email,
    password: password,
    membership: membership,
  };

  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/create_member.php',
    post
  );
  const data = {
    memberID: responseData.memberID,
  }
  await sendHttpRequest('POST', 'https://project-website-php.000webhostapp.com/api/create_transaction.php', data);
  console.log(responseData);

  console.log(responseData);
  showResult(responseData);
};

const hideModal = () => {
  if (isCreated) {
    location.href = '../login/login.html';
  } else {
    document.getElementById('confirmation-modal').style.display = 'none';
    document.getElementById('backdrop').style.display = 'none';
    location.reload();
    return false;
  }
};

const openModal = () => {
  document.getElementById('confirmation-modal').style.display = 'flex';
  document.getElementById('backdrop').style.display = 'block';
};

const showResult = (responseData) => {
  const element = document.querySelector('#confirmation-modal h3');
  if (responseData.memberID) {
    element.innerHTML = `Account Succesfully Created!`;
    element.style.color = '#019B67';
    isCreated = true;
  } else {
    element.innerHTML = `Failed to Create an Account!`;
    element.style.color = '#cf2c2c';
  }
  closeModalBtn.style.display = 'block';
  document.querySelector('#confirmation-modal .loader').style.display = 'none';
  console.log(document.querySelector('#confirmation-modal .loader'));
  document
    .getElementById('confirmation-modal')
    .insertAdjacentElement('beforeend', element);
};

closeModalBtn.addEventListener('click', hideModal);

createBtn.addEventListener('click', (event) => {
  event.preventDefault();
  createPost();
});
