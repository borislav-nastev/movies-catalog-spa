import home from './controllers/home.js';
import loginGet, { loginPost } from './controllers/login.js';
import registerGet, { registerPost } from './controllers/register.js';
import logout from './controllers/logout.js';
import loadMovies from './controllers/renderMovies.js';
import { createMovieGet, createMoviePost } from './controllers/createMovie.js';
import loadUserMovies from './controllers/renderMyMovies.js';
import movieDetails from './controllers/movieDetails.js';
import { deleteMovieGet, deleteMoviePost } from './controllers/deleteMovie.js';
import { editMovieGet, editMoviePost } from './controllers/editMovie.js';
import buyTicket from './controllers/buyTicket.js';

window.addEventListener('load', function () {

    const app = Sammy('#container', function () {

        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: localStorage.getItem('username') ? true : false,
            username: localStorage.getItem('username') || ''
        }

        this.get('index.html', home);
        this.get('/', home);
        this.get('#/home', home);

        this.get('#/login', loginGet);
        this.post('#/login', context => { loginPost.call(context) });

        this.get('#/register', registerGet);
        this.post('#/register', context => { registerPost.call(context) });

        this.get('#/logout', logout);

        this.get('#/cinema', loadMovies);

        this.get('#/create', createMovieGet);
        this.post('#/create', context => { createMoviePost.call(context) });

        this.get('#/my_movies', loadUserMovies);

        this.get('#/details/:id', movieDetails);

        this.get('#/delete/:id', deleteMovieGet);
        this.post('#/delete/:id', context => { deleteMoviePost.call(context) });

        this.get('#/edit/:id', editMovieGet);
        this.post('#/edit/:id', context => { editMoviePost.call(context) });

        this.get('#/buy_ticket/:id', buyTicket);
    });

    app.run();
});