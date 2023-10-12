export default class MyButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', '../../../../src/components/commons/button/button.css');

        this.shadowRoot.appendChild(linkElement);
        this.button = document.createElement('button');
        this.shadowRoot.appendChild(this.button);
    }

    static get observedAttributes() {
        return ['text', 'class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text' || name === 'class') {
            this.updateButton();
        }
    }

    connectedCallback() {
        this.updateButton();
    }

    updateButton() {
        const text = this.getAttribute('text') || 'Send';
        const buttonClass = this.getAttribute('class') || '';

        this.button.textContent = text;
        this.button.className = buttonClass;
    }
}

customElements.define('my-button', MyButton);
