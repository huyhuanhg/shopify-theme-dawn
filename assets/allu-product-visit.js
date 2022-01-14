class ProductVisit extends HTMLElement {
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
        this.renderProductRate(json.visit_count);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderProductRate(visitCount) {
    this.innerHTML = `
    <div class="goods-detail-watch">
      <p>
        <span class="icon icon-eye"></span>
        <em>${visitCount}</em>人が検討しています。
      </p>
    </div>`;
  }
}

customElements.define("product-visit", ProductVisit);
