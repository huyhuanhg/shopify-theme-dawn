class ReviewContent extends HTMLElement {
  constructor() {
    super();
    this.fetchReviewContent()
  }
  

  fetchReviewContent() {
    fetch(
      this.dataset.url,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((text) => {
        this.innerHTML = text
      })
      .catch((e) => {
        console.error(e);
      });
  }

}

customElements.define("review-contents", ReviewContent);
