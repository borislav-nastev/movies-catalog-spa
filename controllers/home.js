import { loadPartials } from '../helpers.js';

export default async function home() {

    this.partials = await loadPartials.call(this);

    const context = Object.assign({}, this.app.userData);
    this.partial('../views/home.hbs', context);
}