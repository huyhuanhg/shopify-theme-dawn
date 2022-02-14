class TopBanner extends HTMLElement {
  constructor() {
    super();
    this.fetchTopBanner();
  }

  fetchTopBanner() {
    fetch(this.dataset.url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.renderTopBanner(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderTopBanner(topBanner) {
    this.innerHTML = `
  <div class="block-header-top-banner-repeat" style="background-image: url(${topBanner.background_image});">
    <a href="${topBanner.link_to}">
      <img src="${topBanner.img_src}" alt="${topBanner.img_alt}"></a>
  </div>`;
  }
}

customElements.define('top-banner', TopBanner);
