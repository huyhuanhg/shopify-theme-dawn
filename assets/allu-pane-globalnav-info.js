class GlobalNavNoti extends HTMLElement {
  constructor() {
    super();
    this.globalWrap = this.querySelector(".pane-globalnav-info");
    this.fetchGlobalNavNoti()
  }

  fetchGlobalNavNoti() {
    fetch(this.dataset.url, 
      {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.renderNoti(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderNoti(notifications) {
    notifications.forEach((notification) => {
      this.globalWrap.innerHTML += `<a href="${notification.link}"><div class="pane-globalnav-info-text">${notification.title}</div></a>`;
    });
  }
}

customElements.define("global-nav-noti", GlobalNavNoti);
