class CreateOrder extends HTMLElement {
  constructor() {
    super();
    const btnCreateOrder = this.querySelector('button.btn-custom');
    btnCreateOrder.addEventListener('click', this.fetchSetOrder.bind(this));
  }

  fetchSetOrder(e) {
    e.preventDefault();
    fetch(this.dataset.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({order: {
        customer: { email: this.dataset.customerEmail },
        line_items: [
          {
            variant_id: this.dataset.variantId,
            quantity: this.dataset.quantity,
          },
        ],
      }})
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

customElements.define('create-order', CreateOrder);
