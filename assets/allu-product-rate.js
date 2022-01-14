class ProductRate extends HTMLElement {
  constructor() {
    super();
    this.fetchArrivalDate()
  }

  fetchArrivalDate() {
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
        this.renderProductRate(json.rate);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderProductRate(rate) {
    this.innerHTML = `<img src="https://allu-official.com/img/filter/2/1//${rate}.png" alt="${rate}">`;
  }
}

customElements.define("product-rate", ProductRate);
