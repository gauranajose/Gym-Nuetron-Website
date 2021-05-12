const loginBtn = document.getElementById('login-btn');
const closeModalBtn = document.getElementById('close-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const createPost = async () => {
  openModal();
  const post = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value, 
  };

  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/check_login.php',
    post
  );
  showResult(responseData);
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
  if (responseData.memberID) {
    localStorage.setItem('memberID', responseData.memberID);
    location.href = 'member_profile.html';
  }
  else {
    const element = document.createElement('h3');
    element.innerHTML = 'Account not valid!';
    element.style.color = '#cf2c2c';
    closeModalBtn.style.display = 'block';
    document.querySelector('#confirmation-modal .loader').style.display = 'none';
    console.log(document.querySelector('#confirmation-modal .loader'));
    document.getElementById('confirmation-modal').insertAdjacentElement('beforeend', element);
  }
}

closeModalBtn.addEventListener('click', hideModal);

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  createPost();
});
