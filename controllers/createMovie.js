import { loadPartials } from '../helpers.js';
import { addMovie } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export async function createMovieGet() {

    this.partials = Object.assign({}, await loadPartials.call(this));
    this.partial('../views/movies/create.hbs', this.app.userData);
}

export async function createMoviePost() {

    const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    const title = this.params.title;
    const imageUrl = this.params.imageUrl;
    const description = this.params.description;
    const tickets = Number(this.params.tickets);
    let genres = this.params.genres;

    try {

        if (!title) {
            throw new Error('Movie title is required!');
        }

        if (!urlPattern.test(imageUrl)) {
            throw new Error('Invalid image URL!');
        }

        if (!description) {
            throw new Error('Movie description is required!');
        }

        if (tickets < 0) {
            throw new Error('Movie tickets can not be negative number!');
        }

        if (!genres) {
            throw new Error('Movie genres can not be empty!');
        }

        showLoading();
        genres = genres.toLowerCase();
        const movie = await addMovie({ title, imageUrl, description, tickets, genres });

        if (movie.hasOwnProperty('errorData')) {
            throw new Error(movie.message);
        }

        showNotification('infoEl', 'Movie created successfully.');
        this.redirect('#/home');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}