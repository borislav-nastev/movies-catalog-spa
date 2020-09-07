import { loadPartials } from '../helpers.js';
import { loginUser } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export default async function loginGet() {

    this.partials = await loadPartials.call(this);

    this.partial('../views/users/login.hbs');
}

export async function loginPost() {

    const username = this.params.username;
    const password = this.params.password;

    try {

        showLoading();
        const response = await loginUser(username, password);

        if (response.hasOwnProperty('message')) {
            throw new Error(response.message);
        }

        localStorage.setItem('username', response.username);
        localStorage.setItem('userToken', response['user-token']);
        localStorage.setItem('userId', response.objectId);

        this.app.userData.loggedIn = true;
        this.app.userData.username = localStorage.getItem('username');

        showNotification('infoEl', 'Login successful!');
        this.redirect('#/home');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}