if (!localStorage.getItem('user')) location.href = '../login/admin_login.html';
const logoutBtn = document.getElementById('logout-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const fetchAllMembers = async () => {
  const responseData = await sendHttpRequest(
    'GET',
    'https://project-website-php.000webhostapp.com/api/load_all_members.php'
  );
  console.log(responseData);
  updateUI(responseData);
};

const updateUI = (responseData) => {
  document.querySelector('.loader').style.display = 'none';
  const members = responseData.member_details;
  const membersUI = members.map((member) => {
    const memUntil = member.membership_end.split(' ');
    const element = document.createElement('div');
    element.className = 'row';
    element.innerHTML = `
    <p>${member.id}</p>
    <p>${member.first_name}</p>
    <p>${member.last_name}</p>
    <p>${member.mobile_number}</p>
    <p>${memUntil[0]}</p>
    `;
    return element;
  });
  membersUI.forEach((memberUI) => {
    document
      .getElementById('table-body')
      .insertAdjacentElement('beforeend', memberUI);
  });
};

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  location.href = '../../index.html';
});

fetchAllMembers();
