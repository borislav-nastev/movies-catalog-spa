import { getMovieById, updateMovie } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export default async function buyTicket() {

    try {

        showLoading();

        const movie = await getMovieById(this.params.id);

        if (movie.hasOwnProperty('errorData')) {
            throw new Error(movie.message);
        }

        if (movie.tickets - 1 < 0) {
            throw new Error('Can not buy ticket for this movie!');
        }

        movie.tickets--;
        const updatedMovie = await updateMovie(this.params.id, movie);

        if (updatedMovie.hasOwnProperty('errorData')) {
            throw new Error(updatedMovie.message);
        }

        showNotification('infoEl', `Successfully bought ticket for ${updatedMovie.title}!`);
        window.history.back();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}