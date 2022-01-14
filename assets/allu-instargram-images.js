class InstagramImages extends HTMLElement {
  constructor() {
    super();
    this.imageList = this.querySelector('ul.ecbn-selection-snap');
    this.fetchInstagramImages()
  }
  

  fetchInstagramImages() {
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
        this.innerHTML = text;
        var splide = new Splide('.splide', {
          height: '277px',
          focus: 'left',
          autoWidth: true,
          pagination: false
        });

        splide.mount();
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

customElements.define("instagram-images", InstagramImages);
