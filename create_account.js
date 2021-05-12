const createBtn = document.getElementById('create-btn');
console.log(createBtn);

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then(response => {
    return response.json();
  })
}

const createPost = () => {
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

  sendHttpRequest('POST', 'https://project-website-php.000webhostapp.com/api/create_member.php', post);
};

createBtn.addEventListener('click', (event) => {
  event.preventDefault();
  createPost();
});
