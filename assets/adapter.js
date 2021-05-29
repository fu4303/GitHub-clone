import { ACCESSTOKEN } from './apiKey.js';

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
          url
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

export async function fetchRepositories(user) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: generateQuery(user),
    }),
    headers: {
      Authorization: 'bearer ' + ACCESSTOKEN,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
