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
            <section class="subscribe">
                <div class="subscribe__content">
                    <h2>Join the green revolution without commitment</h2>
                    <p>If you are missing something and don't want to miss future promotions or our future products</p>
                    <form>
                        <input type="email" placeholder="Your Email" />
                        <button value="Send">Send</button>
                    </form>
                </div>
            </section>
        `
    }
}

customElements.define('my-subscribe', Suscribe);

