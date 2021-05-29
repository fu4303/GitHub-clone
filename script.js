import { fetchRepositories } from './assets/adapter.js';
import {
  generateDropdownProfileImage,
  generateErrorMessage,
  generateProfileImage,
  generateRepoList,
  generateRepoTab,
  generateUserDetails,
} from './assets/generateHTML.js';

const menuButton = document.querySelector('#menu');
const dropdownMenu = document.querySelector('#dropdownMenu');
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

menuButton.addEventListener('click', function () {
  if (dropdownMenu.classList.contains('navbar__open')) {
    dropdownMenu.classList.remove('navbar__open');
  } else {
    dropdownMenu.classList.add('navbar__open');
  }
});

searchBtn.addEventListener('click', function () {
  handleSearch();
});

window.onpopstate = function () {
  alert('clicked back button');
};
history.pushState({}, '');

function handleSearch() {
  // e.preventDefault();
  searchBtn.classList.add('hide');
  loader.classList.add('show');
  fetchRepositories(usernameQuery.value)
    .then((response) => {
      // console.log(response.data);
      loader.classList.remove('show');
      searchBtn.classList.remove('hide');
      if (response.data.user) {
        searchPage.classList.remove('show');
        searchPage.classList.add('hide');
        resultPage.classList.remove('hide');

        generateProfileImage(profileImageWrapper, response.data.user.avatarUrl);
        generateDropdownProfileImage(
          dropdownProfileImageWrapper,
          response.data.user.avatarUrl,
          usernameQuery.value
        );
        generateUserDetails(
          userDetailsWrapper,
          response.data.user,
          usernameQuery.value
        );
        generateRepoTab(
          repoCountWrapper,
          response.data.user.repositories.totalCount
        );
        generateRepoList(
          repoListWrapper,
          response.data.user.repositories.nodes,
          usernameQuery.value
        );
      } else {
        generateErrorMessage(errorWrapper, usernameQuery.value);
        errorWrapper.classList.remove('hide__error');
        setTimeout(() => {
          errorWrapper.classList.add('hide__error');
        }, 5000);
      }
    })
    .catch((error) => {
      console.warn(error);
    });
}
