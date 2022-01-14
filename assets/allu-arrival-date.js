class EstimatedArrivalDate extends HTMLElement {
  constructor() {
    super();
    this.fetchArrivalDate();
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
        this.renderArrivalDate(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderArrivalDate(estimatedArrivals) {
    estimatedArrivals.forEach((estimatedArrival) => {
      this.innerHTML += `
                <div class="block-contact-stock-goods-info">
                  <dl class="block-contact-stock-shop">
                    <dt class="block-contact-stock-shop--title">取り寄せ可能店舗</dt>
                    <dd class="block-contact-stock-shop--value">${estimatedArrival.store_name}</dd>
                  </dl>
                  <dl class="block-contact-stock-shop-arrival-date">
                    <dt class="block-contact-stock-shop-arrival-date--title">取り寄せ商品到着予定日
                    </dt>
                    <dd class="block-contact-stock-shop-arrival-date--value">${estimatedArrival.arrival_date}</dd>
                  </dl>
                </div>
                `;
    });
  }
}

customElements.define("estimated-arrival-date", EstimatedArrivalDate);
