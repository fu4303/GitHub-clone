const menuButton = document.querySelector('#menu');
const dropdownMenu = document.querySelector('#dropdownMenu');
const emoticonText = document.querySelector('#emoticon-text');
const emoticon = document.querySelector('#emoticon');
const usernameQuery = document.querySelector('#username');
const loader = document.querySelector('#loader');
const searchBtn = document.querySelector('#btn');
const resultPage = document.querySelector('#result__page');
const searchPage = document.querySelector('#search__page');
const profileImageWrapper = document.querySelector('#profileImage');
const dropdownProfileImageWrapper = document.querySelector(
  '#dropdownProfileImage'
);
const userDetailsWrapper = document.querySelector('#userDetails');
const repoCountWrapper = document.querySelector('#repoCount');
const repoListWrapper = document.querySelector('#repoList');
const errorWrapper = document.querySelector('#error');

const githubUrl = 'https://api.github.com/graphql';
const githubToken = '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';

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

menuButton.addEventListener('click', function () {
  if (dropdownMenu.classList.contains('navbar__open')) {
    dropdownMenu.classList.remove('navbar__open');
  } else {
    dropdownMenu.classList.add('navbar__open');
  }
});

emoticon.addEventListener('mouseover', function () {
  emoticonText.classList.remove('hide__text');
  emoticonText.classList.add('show__text');
});

emoticon.addEventListener('mouseout', function () {
  emoticonText.classList.remove('show__text');
  emoticonText.classList.add('hide__text');
});

function generateQuery(username) {
  return `
{
  user(login: "${username}") {
    name
    avatarUrl
    bio
    company
    location
    websiteUrl
    twitterUsername
    status {
      emojiHTML
      message
    }
    followers(first: 1) {
      totalCount
    }
    following(first: 1) {
      totalCount
    }
    starredRepositories(first: 1) {
      totalCount
    }
    repositories(first: 20) {
      totalCount
      nodes {
        name
        url
        description
        isFork
        parent {
          nameWithOwner
        }
        primaryLanguage {
          name
          color
        }
        stargazerCount
        forkCount
        updatedAt
      }
    }
  }
}
`;
}

function handleSearch(e) {
  e.preventDefault();
  searchBtn.classList.add('hide');
  loader.classList.add('show');
  getRepositories(githubUrl, generateQuery(usernameQuery.value))
    .then((response) => {
      console.log(response.data);
      loader.classList.remove('show');
      searchBtn.classList.remove('hide');
      if (response.data.user) {
        searchPage.classList.remove('show');
        searchPage.classList.add('hide');
        resultPage.classList.remove('hide');

        generateProfileImage(response.data.user.avatarUrl);
        generateDropdownProfileImage(response.data.user.avatarUrl);
        generateUserDetails(response.data.user);
        generateRepoTab(response.data.user.repositories.totalCount);
        generateRepoList(response.data.user.repositories.nodes);
      } else {
        errorWrapper.classList.remove('hide__error');
        setTimeout(() => errorWrapper.classList.add('hide__error'), 5000);
      }
    })
    .catch((error) => {
      console.warn(error);
    });
}

async function getRepositories(url = '', query) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query: query,
    }),
    headers: {
      Authorization: 'bearer ' + githubToken,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

function formatDate(date) {
  const d = new Date(date);
  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${monthName} ${day}, ${year}`;
}

function formatNumber(num) {
  if (num < 1000) {
    return num;
  }
  return `${(num / 1000).toFixed(1)}k`;
}

function generateProfileImage(photoURL) {
  profileImageWrapper.innerHTML = `
    <img src="${photoURL}" alt="profile" />
    <span
      class="iconify"
      data-icon="octicon:triangle-down-16"
      data-inline="false"> 
    </span>
  `;
}

function generateDropdownProfileImage(photoURL) {
  dropdownProfileImageWrapper.innerHTML = `
    <img src="${photoURL}" alt="profile" />
    ${usernameQuery.value}
  `;
}

function generateRepoTab(repoNum) {
  repoCountWrapper.innerHTML = `
    <span
      class="iconify"
      data-icon="octicon:repo-16"
      data-inline="false">
    </span>
      Repositories
    <span class="counter">${repoNum}</span>
    `;
}

function generateUserDetails(user) {
  userDetailsWrapper.innerHTML = `
    <div class="user">
      <div id="emoticon">
        ${
          user.status
            ? `<span
            class="iconify"
          >${user.status.emojiHTML}</span>
          <p id="emoticon-text" class="hide__text">${user.status.message}</p>`
            : `<span
          class="iconify"
          data-icon="octicon:smiley-16"
          data-inline="false"
        ></span>
        <p id="emoticon-text" class="hide__text">Set status</p>`
        }
        
      </div>
      <img src="${user.avatarUrl}" />
      <p>
        ${user.name ? user.name : ''}
        <span>${usernameQuery.value}</span>
      </p>
    </div>
    <div class="meta">
      <button class="follow__btn">Follow</button>

      ${
        user.status
          ? `<div class="emoji__wrapper">${
              user.status.emojiHTML
                ? user.status.emojiHTML
                : `<span
            class="iconify"
            data-icon="octicon:smiley-16"
            data-inline="false"
          ></span>`
            } ${user.status.message}</div>`
          : ``
      }
      ${user.bio ? `<p class="bio">${user.bio}</p>` : ''}

      <p class="follow__stats">
        <span>
          <span
            class="iconify"
            data-icon="octicon:people-16"
            data-inline="false"
          ></span>
          <span> ${formatNumber(user.followers.totalCount)} </span>
          followers
        </span>
        .
        <span> <span>${formatNumber(
          user.following.totalCount
        )}</span> following </span>
        .
        <span>
          <span
            class="iconify"
            data-icon="octicon:star-16"
            data-inline="false"
          ></span>
          <span>${formatNumber(user.starredRepositories.totalCount)}</span>
        </span>
      </p>


        ${
          user.company
            ? `<p class="meta__detail-item company">
          <span class="iconify" data-icon="octicon:organization-16" data-inline="false"></span>
          ${user.company}
        </p>`
            : ``
        }
        
        ${
          user.location
            ? `<p class="meta__detail-item location">
          <span class="iconify" data-icon="octicon:location-16" data-inline="false"></span>
          ${user.location}
        </p>`
            : ``
        }

        ${
          user.websiteUrl
            ? `
          <p class="meta__detail-item">
          <span class="iconify" data-icon="octicon:link-16" data-inline="false"></span>
          <a target="_blank" class="url" href="${user.websiteUrl}">${user.websiteUrl}</a>
        </p>
          `
            : ``
        }

        ${
          user.twitterUsername
            ? `<p class="meta__detail-item twitter">
          <span class="iconify" data-icon="bi:twitter" data-inline="false"></span>
          @${user.twitterUsername}
        </p>`
            : ``
        }

    </div>
  `;
}

function generateRepoList(repos) {
  let results = ``;
  repos.map(
    (repo) =>
      (results += `
        <div class="repo">
          <div class="repo__details">
            <a href="${repo.url}" class="repo__name">${repo.name}</a>
            ${
              repo.isFork
                ? `<p class="repo__forked">
              Forked from <span>${repo.parent.nameWithOwner}</span>
            </p>`
                : ''
            }
            
            ${
              repo.description
                ? `<p class="repo__desc">${repo.description}</p>`
                : ''
            }
            
            <div class="repo__stats">
              ${
                repo.primaryLanguage
                  ? `<p><span style="background-color: ${repo.primaryLanguage.color};" class="circle"></span>${repo.primaryLanguage.name}</p>`
                  : ''
              }
              
              <p>
                <span
                  class="iconify"
                  data-icon="octicon:star-16"
                  data-inline="false"
                ></span>
                ${repo.stargazerCount}
              </p>
              <p>
                <span
                  class="iconify"
                  data-icon="octicon:repo-forked-16"
                  data-inline="false"
                ></span>
                ${repo.forkCount}
              </p>
              <p>Updated on ${formatDate(repo.updatedAt)}</p>
            </div>
          </div>
        <div class="star__wrapper">
          <div>
            <span
              class="iconify"
              data-icon="octicon:star-16"
              data-inline="false"
            ></span>
            Star
          </div>
        </div>
      </div>
      `)
  );

  repoListWrapper.innerHTML = results;
}
