import '../commons/button/button.js';

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
                console.log(data.products.nodes);
                this.products = data.products.nodes.slice(0, 6)
                this.render()
            })
            .catch(error => {
                console.error(error);
            });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML += `
            <section class="carousel">
                <div class="carousel__top">
                    <h2>Discover our <br> planet-friendly offer</h2>
                </div>
                <div class="carousel__slider">
                    ${this.products.map(product => `
                        <div class="carousel__slider-card" key=${product.id}>
                            <div class="carousel__slider-card-body" style="background-image:url(${product.featuredImage.url})">
                                <my-button text="See more" class="__secondary"></my-button>
                            </div>
                            <div class="carousel__slider-card-footer">
                                <p>${product.title}</p>
                                <div class="carousel__slider-card-footer-info">
                                    <span class="carousel__slider-card-footer-ranking">
                                        ${this.getStarRating(product.tag)} (${product.tags[0]})
                                    </span>
                                    <div class="carousel__slider-card-footer-info-offer">
                                        <span class="carousel__slider-card-footer-info-offer-max">${product.prices.max.amount}</span>
                                        <span class="carousel__slider-card-footer-info-offer-min">${product.prices.min.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="carousel__bottom">
                    <my-button text="Browse all products" class="__principal"></my-button>
                </div>
            </section>
        `;
    }

    getStarRating(puntuacion) {
        if (0 <= puntuacion <= 100) {
            return "⭐";
        } else if (100 < puntuacion <= 200) {
            return "⭐⭐";
        } else if (200 < puntuacion <= 300) {
            return "⭐⭐⭐";
        } else if (300 < puntuacion <= 400) {
            return "⭐⭐⭐⭐";
        } else if (400 < puntuacion <= 500) {
            return "⭐⭐⭐⭐⭐";
        } else {
            return "Puntuación fuera de rango";
        }
    }
}

customElements.define('my-carousel', Carousel);