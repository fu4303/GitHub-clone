import { formatDate, formatNumber } from './helpers.js';

export function generateErrorMessage(htmlElement, username) {
  htmlElement.innerHTML =
    username === ''
      ? 'Please enter a username'
      : `Could not find the User with the username '${username}'.`;
}

export function generateProfileImage(htmlElement, photoURL) {
  htmlElement.innerHTML = `
    <img src="${photoURL}" alt="profile" />
    <span
      class="iconify"
      data-icon="octicon:triangle-down-16"
      data-inline="false"> 
    </span>
  `;
}

export function generateDropdownProfileImage(htmlElement, photoURL, username) {
  htmlElement.innerHTML = `
    <img src="${photoURL}" alt="profile" />
    ${username}
  `;
}

export function generateRepoTab(htmlElement, repoNum) {
  htmlElement.innerHTML = `
    <span
      class="iconify"
      data-icon="octicon:repo-16"
      data-inline="false">
    </span>
      Repositories
    <span class="counter">${repoNum}</span>
    `;
}

export function generateUserDetails(htmlElement, user, username) {
  htmlElement.innerHTML = `
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
        <span>${username}</span>
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

export function generateRepoList(htmlElement, repos, username) {
  if (repos.length < 1) {
    htmlElement.innerHTML = `
      <div class="repo__empty">
        ${username} doesn’t have any public repositories yet.
      </div>
    `;
  } else {
    let results = ``;
    repos.map(
      (repo) =>
        (results += `
        <div class="repo">
          <div class="repo__details">
            <a href="${repo.url}" class="repo__name">${repo.name}</a>
            ${
              repo.isFork
                ? `<a href="${repo.parent.url}" class="repo__forked">
              Forked from <span>${repo.parent.nameWithOwner}</span>
            </a>`
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

    htmlElement.innerHTML = results;
  }
}
