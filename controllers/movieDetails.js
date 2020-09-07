import { loadPartials } from '../helpers.js';
import { getMovieById } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export default async function movieDetails() {

    this.partials = await loadPartials.call(this);

    try {

        showLoading();

        const movie = await getMovieById(this.params.id);

        if (movie.hasOwnProperty('errorData')) {
            throw new Error(movie.message);
        }

        const context = Object.assign({ movie }, this.app.userData);
        this.partial('../views/movies/details.hbs', context);

        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}