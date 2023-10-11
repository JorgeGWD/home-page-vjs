class Carousel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const linkElementCss = document.createElement('link');
        linkElementCss.setAttribute('rel', 'stylesheet');
        linkElementCss.setAttribute('href', './src/components/carousel/carousel.css');

        this.shadowRoot.appendChild(linkElementCss);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML += `
            <h1>Home page</h1>
        `
    }
}

customElements.define('my-carousel', Carousel);