const appId = '29D059B3-8277-A6F9-FF57-ECBF3728D000';
const apiKey = '9977FF22-A082-4B83-8100-EB10ABC2DB94';

const host = function (endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies'
}

function createHeaders(method, data) {

    const userToken = localStorage.getItem('userToken');
    let headers;

    if (method === 'POST' || method === 'PUT') {
        headers = {
            'Content-Type': 'application/json',
            'user-token': userToken
        }
        return { method, headers, body: JSON.stringify(data) };
    }

    headers = {
        'user-token': userToken
    }

    return { method, headers };
}

async function makeRequest(url, method, data) {
    const response = await fetch(url, createHeaders(method, data));
    return response.json();
}

async function registerUser(username, password) {
    const response = await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

async function loginUser(username, password) {
    const response = await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'login': username,
            password
        })
    });
    return response.json();
}

async function logoutUser() {
    const response = await fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': localStorage.getItem('userToken')
        }
    });
    return response;
}

async function addMovie(movie) {
    const response = await makeRequest(host(endpoints.MOVIES), 'POST', movie);
    return response;
}

async function getAllMovies(genre) {
    let response;

    if (genre) {
        response = await makeRequest(host(endpoints.MOVIES + `?where=genres%20LIKE%20%27%25${genre}%25%27`), 'GET');
    } else {
        response = await makeRequest(host(endpoints.MOVIES), 'GET');
    }

    return response;
}

async function getUserMovies(userId) {
    const response = await makeRequest(host(endpoints.MOVIES + `?where=ownerId%3D%27${userId}%27`), 'GET');
    return response;
}

async function getMovieById(id) {
    const response = await makeRequest(host(endpoints.MOVIES + `/${id}`), 'GET');
    return response;
}

async function deleteMovie(id) {
    return await makeRequest(host(endpoints.MOVIES + `/${id}`), 'DELETE');
}

async function updateMovie(id, updatedMovie) {
    const response = await makeRequest(host(endpoints.MOVIES + `/${id}`), 'PUT', updatedMovie);
    return response;
}

export {
    registerUser,
    loginUser,
    logoutUser,
    addMovie,
    getAllMovies,
    getUserMovies,
    getMovieById,
    deleteMovie,
    updateMovie,
}