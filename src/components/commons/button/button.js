class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './src/components/commons/button/button.css');

        this.shadowRoot.appendChild(linkElement);

        this.button = document.createElement('button');
        this.image = document.createElement('img'); // Add an image element

        this.shadowRoot.appendChild(this.button);
        this.shadowRoot.appendChild(this.image); // Append the image element to the shadow DOM
    }

    static get observedAttributes() {
        return ['text', 'class', 'type', 'src']; // Add 'src' to the observed attributes
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text' || name === 'class' || name === 'type' || name === 'src') {
            this.updateButton();
        }
    }

    connectedCallback() {
        this.updateButton();
        this.setupEvents();
    }

    updateButton() {
        const text = this.getAttribute('text') || '';
        const buttonClass = this.getAttribute('class') || '';
        const buttonType = this.getAttribute('type') || 'button';
        const src = this.getAttribute('src') || ''; // Get the image source

        this.button.textContent = text;
        this.button.className = buttonClass;
        this.button.type = buttonType;

        // Set the image source
        if (src) {
            this.image.src = src;
            this.image.style.display = 'block'; // Show the image
        } else {
            this.image.style.display = 'none'; // Hide the image
        }

        // You may need to add additional styling or attributes for the image
    }

    setupEvents() {
        this.button.addEventListener('click', (event) => {
            this.dispatchEvent(new CustomEvent('my-button-click', { bubbles: true }));
        });
    }
}

customElements.define('my-button', Button);
