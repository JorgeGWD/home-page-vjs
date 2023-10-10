class Suscribe extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './src/components/subscribe/subscribe.css');
    
        this.shadowRoot.appendChild(linkElement);
    }

    connectedCallback() {
        this.return();
    }

    return() {
        this.shadow.innerHTML += `
            <h1>subscribe</h1>
        `
    }
}

customElements.define('my-subscribe', Suscribe);

