import { loadPartials } from '../helpers.js';
import { getMovieById, updateMovie } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export async function editMovieGet() {

    this.partials = await loadPartials.call(this);

    try {

        showLoading();

        const movie = await getMovieById(this.params.id);

        if (movie.hasOwnProperty('errorData')) {
            throw new Error(movie.message);
        }

        const context = Object.assign({ movie }, this.app.userData);
        this.partial('../views/movies/edit.hbs', context);

        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}

export async function editMoviePost() {

    const title = this.params.title;
    const imageUrl = this.params.imageUrl;
    const description = this.params.description;
    const tickets = Number(this.params.tickets);
    const genres = this.params.genres;

    try {

        if (!title) {
            throw new Error('Movie title is required!');
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

        const response = await updateMovie(this.params.id, { title, imageUrl, description, tickets, genres });

        if (response.hasOwnProperty('errorData')) {
            throw new Error(response.message);
        }

        showNotification('infoEl', 'Movie updated successfully!');
        this.redirect('#/my_movies');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}