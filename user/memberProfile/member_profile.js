if (!localStorage.getItem('memberID')) location.href = '../login/login.html';
const memberId = localStorage.getItem('memberID');
const logoutBtn = document.getElementById('logout-btn');
console.log(memberId);

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
  const data = {
    memberID: memberId,
  };
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/load_member.php',
    data
  );
  updateUI(responseData);
  console.log('hello');
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
      <div class="profile-group full">
          <h4>Trainers</h4>
          <ul id="trainers"></ul>
        </div>
    </div>
  `;

  const trainersEl = memberDetails.trainers.map((trainer) => {
    const el = document.createElement('p');
    el.innerHTML = `tn# ${trainer}`;
    return el;
  });

  document
    .getElementById('profile-header')
    .insertAdjacentElement('afterend', element);

  for(trainer of trainersEl) {
    document.getElementById('trainers').insertAdjacentElement('beforeend', trainer);
  }
};

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('memberID');
  location.href = '../../index.html';
});

fetchMember();
