class Suscribe extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.return();
    }

    return() {
        this.shadow.innerHTML = `
            <h1>subscribe</h1>
        `
    }
}

customElements.define('my-subscribe', Suscribe);

