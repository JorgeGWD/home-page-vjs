class Button extends HTMLElement {
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
        return ['text', 'class', 'type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text' || name === 'class' || name === 'type') {
            this.updateButton();
        }
    }

    connectedCallback() {
        this.updateButton();
        this.setupEvents();
    }

    updateButton() {
        // Property types
        const text = this.getAttribute('text') || '';
        const buttonClass = this.getAttribute('class') || ''; 
        const buttonType = this.getAttribute('type') || 'button';

        this.button.textContent = text;
        this.button.className = buttonClass;
        this.button.type = buttonType;
    }

    setupEvents() {
        this.button.addEventListener('click', (event) => {
            // Propagate custom event 'my-button-click' instead of 'click'
            this.dispatchEvent(new CustomEvent('my-button-click', { bubbles: true }));
        });
    }
}

customElements.define('my-button', Button);
