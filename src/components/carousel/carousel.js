class Carousel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './src/components/carousel/carousel.css');
    
        this.shadowRoot.appendChild(linkElement);

        fetch('https://gradistore-spi.herokuapp.com/products/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log('Data received:', data.products.nodes);
                this.products = data.products.nodes
                this.render()
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML += `
            ${this.products.map(product => `
                    <div key=${product.id}>
                        <h1>${product.title}</h1>
                    </div>
                `
            )}
        `
    }
}

customElements.define('my-carousel', Carousel);