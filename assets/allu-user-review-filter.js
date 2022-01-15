class ReviewFilters extends HTMLElement {
  constructor() {
    super();
    this.fetchReviewFilterList()
  }
  
  fetchReviewFilterList() {
    fetch(this.dataset.url)
      .then((response) => response.text())
      .then((text) => {
        this.innerHTML = text;
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

customElements.define("review-filters", ReviewFilters);
