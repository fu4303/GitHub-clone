const menuButton = document.querySelector('#menu');

const dropdownMenu = document.querySelector('#dropdownMenu');

menuButton.addEventListener('click', function () {
  if (dropdownMenu.classList.contains('navbar__open')) {
    dropdownMenu.classList.remove('navbar__open');
  } else {
    dropdownMenu.classList.add('navbar__open');
  }
});

const url = 'https://api.github.com/graphql';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}

postData(url, { answer: 42 }).then((data) => {
  console.log(data);
});
