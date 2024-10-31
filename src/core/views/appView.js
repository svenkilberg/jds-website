import '../../css/layouts/app.css';

export default (pageView) => {
    return `
    <header aria-hidden="true"></header>
    <main>${ pageView }</main>
    <footer></footer>
    `;
}