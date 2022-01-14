class InstagramType extends HTMLElement {
  constructor() {
    super();
    this.typeList = this.querySelector('ul.ecbn-selection-page-tabs');
    this.fetchInstagramType()
  }
  

  fetchInstagramType() {
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
        this.renderInstagramType(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderInstagramType(instagramTypes) {
    this.typeList.innerHTML = '<li class="ecbn-selection-page-tabs--item not-bind ecbn-selection-page-tabs--active">ALL</li>';
    instagramTypes.forEach((instagramType) => {
      this.typeList.innerHTML += `<li class="ecbn-selection-page-tabs--item not-bind"><a href="javascript:void(0);" class="ecbn-selection-page-tabs--link">${instagramType.type}</a></li>`;
    });
  }
}

customElements.define("instagram-type", InstagramType);
