class App extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <h1>Home page</h1>
        `
    }
}

customElements.define('my-app', App);