class Carousel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './src/components/carousel/carousel.css');
    
        this.shadowRoot.appendChild(linkElement);
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