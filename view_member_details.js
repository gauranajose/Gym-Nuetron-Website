if (!localStorage.getItem('user')) location.href = 'admin_login.html';
const submitBtn = document.getElementById('submit-btn');
const logoutBtn = document.getElementById('logout-btn');
console.log(submitBtn);

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const fetchMember = async () => {
  document.querySelector('.loader').style.display = 'flex';
  const memberId = document.getElementById('input_id').value;
  const data = {
    memberID: memberId,
  };
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/load_member.php',
    data
  );
  console.log(responseData);
  updateUI(responseData);
};

const updateUI = (responseData) => {
  document.querySelector('.loader').style.display = 'none';
  const memberDetails = responseData.member_details[0];
  let membership;
  if (memberDetails.membership_id.localeCompare('198231'))
    membership = 'Weekly';
  if (memberDetails.membership_id.localeCompare('198232'))
    membership = 'Monthly';
  if (memberDetails.membership_id.localeCompare('198232'))
    membership = 'Annuall';
  const memStart = memberDetails.membership_start.split(' ');
  const memEnd = memberDetails.membership_end.split(' ');
  const element = document.createElement('div');
  element.id = 'member-details';
  element.innerHTML = `
    <div id="member-details">
      <div class="profile-group">
        <h4>Member ID</h4>
        <p>${memberDetails.id}</p>
      </div>
      <div class="row">
        <div class="profile-group">
          <h4>First Name</h4>
          <p>${memberDetails.first_name}</p>
        </div>
        <div class="profile-group">
          <h4>Last Name</h4>
          <p>${memberDetails.last_name}</p>
        </div>
      </div>
      <div class="row">
        <div class="profile-group">
          <h4>Email</h4>
          <p>${memberDetails.email}</p>
        </div>
        <div class="profile-group">
          <h4>Mobile Number</h4>
          <p>${memberDetails.mobile_number}</p>
        </div>
      </div>
      <div class="profile-group">
        <h4>Membership Plan</h4>
        <p>${membership} Membership</p>
      </div>
      <div class="row">
        <div class="profile-group">
          <h4>Member Since</h4>
          <p>${memStart[0]}</p>
        </div>
        <div class="profile-group">
          <h4>Membership Ends</h4>
          <p>${memEnd[0]}</p>
        </div>
      </div>
    </div>
  `;
  document
    .getElementById('input-body')
    .insertAdjacentElement('afterend', element);
};

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  fetchMember();
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  location.href = 'index.html';
});