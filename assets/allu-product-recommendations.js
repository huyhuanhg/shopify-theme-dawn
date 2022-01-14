class AlluProductRecommendations extends HTMLElement {
    constructor() {
      super();
      this.listProductRecommendations = this.querySelector('ul.block-thumbnail-h')
      this.fetchProductRecommendations()
    }
    
  
    fetchProductRecommendations() {
      fetch(
        this.dataset.url,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          this.renderProductRecommendations(json.products);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  
    renderProductRecommendations(productRecommendations) {
        productRecommendations.forEach((productRecommendation) => {
        this.listProductRecommendations.innerHTML += `
        <li>
        <dl class="block-thumbnail-h--goods js-enhanced-ecommerce-item">
          <dt class="block-thumbnail-h--goods-image">
            <a href="/products/${productRecommendation.title}"
              title="${productRecommendation.title}"
              class="js-enhanced-ecommerce-image">
              <figure class="img-center"><img alt="${productRecommendation.featured_image}"
                  src="${productRecommendation.featured_image}"></figure>
            </a></dt>
          <dd class="block-thumbnail-h--goods-description">
            <div class="block-thumbnail-h--brand-name">ディオール</div>
            <div class="block-thumbnail-h--goods-name"><a
                href="/products/${productRecommendation.title}"
                title="${productRecommendation.title}"
                class="js-enhanced-ecommerce-goods-name">${productRecommendation.title}</a></div>
            <div class="block-thumbnail-h--price-infos">
              <div class="block-thumbnail-h--price-items">
                <div class="block-thumbnail-t--price price js-enhanced-ecommerce-goods-price">${productRecommendation.price.toLocaleString('en-US')}
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </li>`;
      });
    }
  }
  
  customElements.define("allu-product-recommendations", AlluProductRecommendations);
  