class Header extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './src/components/header/header.css');
    
        this.shadowRoot.appendChild(linkElement);
    }


    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML += `
            <header>
                <h3>Gratis verzending vanaf €30</h3>
            </header>
        `
    }
}

customElements.define('my-header', Header);