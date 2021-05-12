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
  // openModal();
  const post = {
    email: document.getElementById('username').value,
    password: document.getElementById('password').value, 
  };

  console.log(post);

  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/check_login.php',
    post
  );
  console.log(responseData.message);
};

loginBtn.addEventListener('click', createPost);