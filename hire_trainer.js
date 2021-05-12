if (!localStorage.getItem('memberID')) location.href = 'login.html';
const memberId = localStorage.getItem('memberID');
const logoutBtn = document.getElementById('logout-btn');
const hireBtn = document.getElementById('hire-btn');
const closeModalBtn = document.getElementById('close-btn');
let existingTrainers;

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const fetchTrainers = async () => {
  const responseData = await sendHttpRequest(
    'GET',
    'https://project-website-php.000webhostapp.com/api/load_all_trainers.php'
  );
  updateUI(responseData);
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
  existingTrainers = responseData.member_details[0].trainers;
  console.log(existingTrainers);
};

const updateUI = (responseData) => {
  const trainers = responseData.trainer_details;
  const unhiredTrainers = trainers.filter(
    (trainer) => !existingTrainers.includes(trainer.id)
  );
  document.querySelector('#select-trainer .loader').innerHTML = '';
  const traiersUI = unhiredTrainers.map((trainer) => {
    const element = document.createElement('div');
    element.className = 'trainer';
    element.innerHTML = `
      <img src="./images/trainer-profile.jpg"/>
      <p class="italic">tn# ${trainer.id}</p>
      <p class="text-primary text-bold">${trainer.first_name} ${trainer.last_name}</p>
      <p class="text-bold"><span class="text-black">Schedule:</span> MWF</p>
      <input type="radio" name="trainers" value="${trainer.id}">
      <div class="isSelected"></div>
    `;
    return element;
  });
  console.log(traiersUI);
  traiersUI.forEach((trainer) => {
    document
      .getElementById('trainers')
      .insertAdjacentElement('beforeend', trainer);
  });
};

const hideModal = () => {
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('backdrop').style.display = 'none';
  location.reload();
  return false;
};

const openModal = () => {
  document.getElementById('confirmation-modal').style.display = 'flex';
  document.getElementById('backdrop').style.display = 'block';
};

const showResult = (responseData) => {
  const element = document.createElement('h3');
  if (responseData.message.localeCompare('Trainer Hired') === 0) {
    element.innerHTML = 'Succesfully Hired Trainer!';
    element.style.color = '#019B67';
  } else {
    element.innerHTML = 'Failed to Hire Trainer!';
    element.style.color = '#cf2c2c';
  }
  closeModalBtn.style.display = 'block';
  document.querySelector('#confirmation-modal .loader').style.display = 'none';
  console.log(document.querySelector('#confirmation-modal .loader'));
  document
    .getElementById('confirmation-modal')
    .insertAdjacentElement('beforeend', element);
  console.log(responseData);
};

hireBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const trainers = document.querySelectorAll('input[type=radio]');
  let trainerId;
  for (trainer of trainers) {
    if (trainer.checked) trainerId = trainer.value;
  }
  const data = {
    memberID: memberId,
    trainerID: trainerId,
  };
  console.log(data);
  openModal();
  const responseData = await sendHttpRequest(
    'POST',
    'https://project-website-php.000webhostapp.com/api/hire_trainer.php',
    data
  );
  showResult(responseData);
});

closeModalBtn.addEventListener('click', hideModal);

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('memberID');
  location.href = 'index.html';
});

fetchDetails().then(() => {
  fetchTrainers();
});
