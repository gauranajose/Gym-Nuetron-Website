if (!localStorage.getItem('memberID')) location.href = '../login/login.html';
const memberId = localStorage.getItem('memberID');
const updateDetailsBtn = document.getElementById('update-details-btn');
const updatePassBtn = document.getElementById('update-pass-btn');
const closeModalBtn = document.getElementById('close-btn');
const logoutBtn = document.getElementById('logout-btn');
let userDetails;

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const fetchDetails = async () => {
  const data = {
    memberID: memberId,
  };
  const responseData = await sendHttpRequest( 
    'POST',
    'https://project-website-php.000webhostapp.com/api/load_member.php',
    data
  );
  const memberDetails = responseData.member_details[0];
  console.log(memberDetails);
  userDetails = {
    email: memberDetails.email,
    firstName: memberDetails.first_name, 
    lastName: memberDetails.last_name,
    mobileNum: memberDetails.mobile_number,
    password: memberDetails.password,
  };
  document.getElementById('firstName').value = userDetails.firstName;
  document.getElementById('lastName').value = userDetails.lastName;
  document.getElementById('email').value = userDetails.email;
  document.getElementById('contact_number').value = userDetails.mobileNum;
};

const hideModal = () => {
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('backdrop').style.display = 'none';
}

const openModal = () => {
  document.getElementById('confirmation-modal').style.display = 'flex';
  document.getElementById('backdrop').style.display = 'block';
  document.querySelector('#confirmation-modal .loader').style.display = 'flex';
  document.querySelector('#confirmation-modal h3').innerHTML = '';
}

const showResult = (responseData, message) => {
  const element = document.querySelector('#confirmation-modal h3');
  if (responseData.message.localeCompare('Member Editted!') === 0) {
    element.innerHTML = `Succesfully Edited ${message}!`;
    element.style.color = '#019B67';
  }
  else {
    element.innerHTML = `Failed to Edit ${message}!`;
    element.style.color = '#cf2c2c';
  }
  closeModalBtn.style.display = 'block';
  document.querySelector('#confirmation-modal .loader').style.display = 'none';
  console.log(document.querySelector('#confirmation-modal .loader'));
  document.getElementById('confirmation-modal').insertAdjacentElement('beforeend', element);
  console.log(responseData);
}

updateDetailsBtn.addEventListener('click', async (event) => {
  openModal();
  event.preventDefault();
  const data = {
    oldEmail: userDetails.email,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    mobileNum: document.getElementById('contact_number').value,
    Email: document.getElementById('email').value,
    password: userDetails.password,
  };
  console.log(data);
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/edit_member.php',
    data
  );
  showResult(responseData, 'Information');
});

updatePassBtn.addEventListener('click', async (event) => {
  openModal();
  event.preventDefault();
  let responseData;
  if (document.getElementById('password').value != userDetails.password) {
    responseData = await sendHttpRequest('POST', 'https://project-website-php.000webhostapp.com/api/edit_member.php');
  }
  else {
    userDetails.password = document.getElementById('newpassword').value;
    const data = {
      oldEmail: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      mobileNum: userDetails.mobileNum,
      Email: userDetails.email,
      password: userDetails.password,
    };
    responseData = await sendHttpRequest(
      'POST',
      'https://project-website-php.000webhostapp.com/api/edit_member.php',
      data
    );
  }
  showResult(responseData, 'Password');
});

closeModalBtn.addEventListener('click', hideModal);

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('memberID');
  location.href = '../../index.html';
})
 
fetchDetails();
