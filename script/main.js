async function showResults(keyword) {
    try {
        const result = await fetch('https://api.github.com/search/users?q=' + 
        encodeURIComponent(keyword + ' in:login type:user'), {
            headers: new Headers({
                'accept': 'application/vnd.github+json',
                'User-Agent': 'index'
            })
        })
        const resultJson = await result.json();
        const resultArray = await resultJson.items;
        clearScreen();
        //show first user
        showUser(resultArray[0].url, 0);

        //show many users
        //resultArray.forEach(function(user, i) {showUser(user.url, i);})
    } catch (error) {
        console.error(error);
    }
}

function showUser(url, i) {
    fetch(url, {
        headers: new Headers({
            'accept': 'application/vnd.github+json',
            'User-Agent': 'index'
        })
    })
    .then(response=> response.json())
    .then(data=> {
        if (i%2 == 0) {
            //if user cannot fit in previous row, create new row
            userNewRow(data, i);
        } else {
            //if user can still fit in row, call the previous row then append
            userPrevRow(data, i);
        }
    })
    .catch(error=> console.error(error));
}

function clearScreen() {
    const searchResults = document.querySelector('#search-results');
    searchResults.innerHTML = "";
}

function userNewRow(data, i) {
    const searchResults = document.querySelector('#search-results');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.id = `row${Math.floor(i/2)}`;

    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    const img = document.createElement('img');
    img.src = data.avatar_url;

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    const name = document.createElement('p');
    name.classList.add('name');
    name.innerHTML = data.name;

    const login = document.createElement('p');
    login.classList.add('login');
    login.innerHTML = data.login;

    const bio = document.createElement('p');
    bio.classList.add('bio');
    bio.innerHTML = data.bio;

    const otherData = document.createElement('div');
    otherData.classList.add('other-data');

    const locationSpan = document.createElement('span');
    locationSpan.innerHTML = `${data.location}&nbsp;&nbsp;&#183;&nbsp;`;

    const reposIcon = document.createElement('iconify-icon');
    reposIcon.icon = 'iconoir:repository';
    reposIcon.classList.add('details-icon');

    const reposSpan = document.createElement('span');
    reposSpan.innerHTML = `${data.public_repos}&nbsp;&nbsp;&#183;&nbsp;`;

    const followersIcon = document.createElement('iconify-icon');
    followersIcon.icon = 'octicon:people-16';
    followersIcon.classList.add('details-icon');

    const followersSpan = document.createElement('span');
    followersSpan.innerHTML = data.followers;

    otherData.appendChild(locationSpan);
    otherData.appendChild(reposIcon);
    otherData.appendChild(reposSpan);
    otherData.appendChild(followersIcon);
    otherData.appendChild(followersSpan);

    detailsContainer.appendChild(name);
    detailsContainer.appendChild(login);
    detailsContainer.appendChild(bio);
    detailsContainer.appendChild(otherData);

    userContainer.appendChild(img);
    userContainer.appendChild(detailsContainer);

    newRow.appendChild(userContainer);

    searchResults.appendChild(newRow);
}

function userPrevRow(data, i) {
    const searchResults = document.querySelector('#search-results');
    const prevRow = document.querySelector(`#row${Math.floor(i/2)}`);
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    const img = document.createElement('img');
    img.src = data.avatar_url;

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    const name = document.createElement('p');
    name.classList.add('name');
    name.innerHTML = data.name;

    const login = document.createElement('p');
    login.classList.add('login');
    login.innerHTML = data.login;

    const bio = document.createElement('p');
    bio.classList.add('bio');
    bio.innerHTML = data.bio;

    const otherData = document.createElement('div');
    otherData.classList.add('other-data');

    const locationSpan = document.createElement('span');
    locationSpan.innerHTML = `${data.location}&nbsp;&nbsp;&#183;&nbsp;`;

    const reposIcon = document.createElement('iconify-icon');
    reposIcon.icon = 'iconoir:repository';
    reposIcon.classList.add('details-icon');

    const reposSpan = document.createElement('span');
    reposSpan.innerHTML = `${data.public_repos}&nbsp;&nbsp;&#183;&nbsp;`;

    const followersIcon = document.createElement('iconify-icon');
    followersIcon.icon = 'octicon:people-16';
    followersIcon.classList.add('details-icon');

    const followersSpan = document.createElement('span');
    followersSpan.innerHTML = data.followers;

    otherData.appendChild(locationSpan);
    otherData.appendChild(reposIcon);
    otherData.appendChild(reposSpan);
    otherData.appendChild(followersIcon);
    otherData.appendChild(followersSpan);

    detailsContainer.appendChild(name);
    detailsContainer.appendChild(login);
    detailsContainer.appendChild(bio);
    detailsContainer.appendChild(otherData);

    userContainer.appendChild(img);
    userContainer.appendChild(detailsContainer);

    prevRow.appendChild(userContainer);
}

function toggleTheme() {
    const body = document.querySelector('body');
    body.classList.toggle('light-theme');
    const iconTheme = document.querySelector('#icon-theme');
    if (iconTheme.icon === 'fa-solid:sun') {
        iconTheme.icon = 'fa-solid:moon';
    } else {
        iconTheme.icon = 'fa-solid:sun';
    }
    
}

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('#searchbar');
const themeBtn = document.querySelector('#btn-theme');
searchBtn.addEventListener('click', function(e) {showResults(searchBar.value)});
searchBar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
})
themeBtn.addEventListener('click', function(e) {toggleTheme()});