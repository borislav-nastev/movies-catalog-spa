export async function loadPartials() {
    return {
        header: await this.load('./views/common/header.hbs'),
        footer: await this.load('./views/common/footer.hbs')
    }
}