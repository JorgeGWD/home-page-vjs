class Header extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <h1>Header</h1>
        `
    }
}

customElements.define('my-header', Header);