import '../commons/button/button.js';

class Suscribe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './src/components/subscribe/subscribe.css');

        this.shadowRoot.appendChild(linkElement);
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    render() {
        this.shadowRoot.innerHTML += `
            <section class="subscribe">
                <div class="subscribe__content">
                    <h2>Join the green revolution without commitment</h2>
                    <p>If you are missing something and don't want to miss future promotions or our future products</p>
                    <form id="subscribeForm">
                        <input id="emailInput" type="email" placeholder="Your Email" />
                        <my-button text="Send" type="submit" class="__principal"></my-button>
                    </form>
                </div>
            </section>
            <div id="popup" class="popup">
                <p>Your email has been subscribed!</p>
                <my-button id="closePopup" text="Close" class="__principal"></my-button>
            </div>
            <div id="errorPopup" class="popup__error">
                <p>Please enter a valid email address.</p>
                <my-button id="closeErrorPopup" text="Close" class="__principal"></my-button>
            </div>
        `;
    }

    setupEvents() {
        const form = this.shadowRoot.getElementById('subscribeForm');
        const emailInput = this.shadowRoot.getElementById('emailInput');
        const popup = this.shadowRoot.getElementById('popup');
        const errorPopup = this.shadowRoot.getElementById('errorPopup');
        const closePopupButton = this.shadowRoot.getElementById('closePopup');
        const closeErrorPopupButton = this.shadowRoot.getElementById('closeErrorPopup');
        const myButton = this.shadowRoot.querySelector('my-button');

        myButton.addEventListener('my-button-click', (event) => {
            event.preventDefault();

            if (this.validateEmail(emailInput.value) && emailInput.value.trim() !== '') {
                popup.style.display = 'flex';
            } else {
                errorPopup.style.display = 'flex';
            }
        });

        closePopupButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        closeErrorPopupButton.addEventListener('click', () => {
            errorPopup.style.display = 'none';
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

customElements.define('my-subscribe', Suscribe);