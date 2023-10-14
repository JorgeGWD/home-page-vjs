class Carousel extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.currentIndex = 0;
  
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
          // Duplica los primeros 10 productos al final de la lista
          this.products = [...data.products.nodes, ...data.products.nodes.slice(0, 10)];
          this.render();
          this.addEventListeners();
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
    }
  
    render() {
      this.shadow.innerHTML += `
        <section class="carousel">
          <div class="carousel__top">
            <h2>Discover our <br> planet-friendly offer</h2>
            <div class="carousel__top-buttons">
                <my-button src="../../../src/assets/images/prev.png" class="__carousel carousel__button" data-action="prev"></my-button>
                <my-button src="../../../src/assets/images/next.png" class="__carousel carousel__button" data-action="next"></my-button>
            </div>
          </div>
          <div class="carousel__slider">
            ${this.products.map((product, index) => `
              <div class="carousel__slider-card" data-index=${index} key=${product.id}>
                <div class="carousel__slider-card-body">
                  <img src="${product.featuredImage.url}" />
                  <my-button text="See more" class="__secondary carousel__slider-card-button"></my-button>
                </div>
                <div class="carousel__slider-card-footer">
                  <p>${product.title}</p>
                  <div class="carousel__slider-card-footer-info">
                    <div class="carousel__slider-card-footer-info-ranking">
                      <span class="carousel__slider-card-footer-info-ranking-stars">
                        ${this.getStarRating(product.tags[0])}
                      </span>
                      (${product.tags[0]})
                    </div>
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
  
    addEventListeners() {
      const prevButton = this.shadow.querySelector('.carousel__button[data-action="prev"]');
      const nextButton = this.shadow.querySelector('.carousel__button[data-action="next"]');
  
      prevButton.addEventListener('click', () => this.showPrevious());
      nextButton.addEventListener('click', () => this.showNext());
    }
  
    showPrevious() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }
  
    showNext() {
        if (this.currentIndex < this.products.length - 1) {
            this.currentIndex++;
            this.updateSlider();
        }
    }
  
    updateSlider() {
        const slider = this.shadow.querySelector('.carousel__slider');
        const cardWidth = this.shadow.querySelector('.carousel__slider-card').offsetWidth;
    
        let newPosition;
        if (this.currentIndex === this.products.length - 1) {
            // Si estamos en el último producto, volvemos al principio sin animación
            newPosition = 0;
            slider.style.transition = 'none';
        } else {
            newPosition = -1 * this.currentIndex * cardWidth;
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
    
        slider.style.transform = `translateX(${newPosition}px)`;
    }
  
    getStarRating(starsPoints) {
        if (0 <= starsPoints && starsPoints <= 500) {
            const numberOfStars = Math.ceil(starsPoints / 100); // Calcula el número de estrellas necesarias
            const starImage = '<img src="../../../src/assets/images/star.png" alt="star">';
            return starImage.repeat(numberOfStars);
        } else {
            return "Puntuación fuera de rango";
        }
    }
}
  
  customElements.define('my-carousel', Carousel);
  