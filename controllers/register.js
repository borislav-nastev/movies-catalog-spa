import { loadPartials } from '../helpers.js';
import { registerUser } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export default async function registerGet() {

    this.partials = await loadPartials.call(this);
    this.partial('../views/users/register.hbs');
}

export async function registerPost() {

    const username = this.params.username;
    const password = this.params.password;
    const rePassword = this.params.repeatPassword;

    try {

        if (username.length < 3) {
            throw new Error('Username should be more than 3 characters!')
        }

        if (password.length < 6) {
            throw new Error('Password should be more than 6 characters!')
        }

        if (password !== rePassword) {
            throw new Error('Password and repeat password do not match!')
        }

        showLoading();

        const response = await registerUser(username, password);

        if (response.hasOwnProperty('message')) {
            throw new Error(response.message);
        }

        showNotification('infoEl', 'User registration successful!');
        this.redirect('#/login');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}