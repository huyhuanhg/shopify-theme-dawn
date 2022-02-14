class ProductFilter extends HTMLElement {
  constructor() {
    super();
    const isConvertLanguage = JSON.parse(this.dataset.isConvertLanguage);
    if (!isConvertLanguage) {
      this.initialization();
    }
    const filterForm = this.querySelector('form');
    this.toggleFilter(filterForm);

    filterForm.addEventListener(
      "input",
      this.preSubmitHandle.bind(this)
    );
  }

  preSubmitHandle(event) {
    event.stopPropagation();
    event.preventDefault();
    const getParentCategoriesList = (childCategory) => {
      let parentCategoriesList = childCategory.parentElement;
        while (!parentCategoriesList.classList.contains('categories-list')) {
          parentCategoriesList = parentCategoriesList.parentElement;
        }
        return parentCategoriesList.querySelector('input[name="filter.p.product_type"]');
    }

    if (event.target.checked && event.target.name === "filter.v.option.category") {
      getParentCategoriesList(event.target).checked = true;
    } else if (!event.target.checked && event.target.name === "filter.v.option.category"){
      const parentCategory = getParentCategoriesList(event.target)
      const isUnActiveAllChildCategories = Array.from(parentCategory.parentElement.parentElement.querySelectorAll('input[name="filter.v.option.category"]')).some(childCategory => childCategory.checked)
      if (!isUnActiveAllChildCategories) {
        parentCategory.checked = false;
      }
    }
    if (event.target.name === "filter.p.product_type") {
      const childCategoriesList = event.target.parentElement.parentElement.querySelectorAll('input[name="filter.v.option.category"]');
      if (!event.target.checked) {
        childCategoriesList.forEach(childCategory => {
          childCategory.checked = false;
        });
        event.target.parentElement.parentElement.classList.remove('open');
      } else {
        childCategoriesList.forEach(childCategory => {
          childCategory.checked = true;
        })
        event.target.parentElement.parentElement.classList.add('open');
      }
    }
    this.onSubmitHandler(event);
  }

  onSubmitHandler(event) {
    const formData = new FormData(event.target.closest("form"));
    const searchParams = new URLSearchParams(formData);
    const url = new URL(window.location.href);
    searchParams.append('keyword', url.searchParams.get('keyword'));
    searchParams.append('q', url.searchParams.get('q'));
    ProductFilter.updateURLHash(searchParams.toString())
    searchParams.append('section_id', this.dataset.sectionId)
    ProductFilter.renderSearchResultFetch(`${window.location.pathname}?${searchParams.toString()}`)
  }

  toggleFilter (form) {
    const filterItems = form.querySelectorAll('ul.filter-list > li.filter-item');
    filterItems.forEach(filterItem => {
      const toggleIcon = filterItem.querySelector('.toggle-icon')
      toggleIcon.onclick = (e) => {
        filterItem.classList.toggle('open');
        if(filterItem.classList.contains('open')) {
          toggleIcon.innerHTML = '-'
        } else {
          toggleIcon.innerHTML = '+'
        }
      }
    });
  }

  initialization () {
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get('keyword');
    const q = this.convertLanguage(keyword);
    url.searchParams.set('q', q);
    ProductFilter.updateURLHash(url.searchParams.toString())
    url.searchParams.append('section_id', this.dataset.sectionId)
    ProductFilter.renderSearchResultFetch(url.href)
  }

  static updateURLHash(searchParams) {
    history.pushState(
      { searchParams },
      "",
      `${window.location.pathname}${searchParams && "?".concat(searchParams)}`
    );
  }
  static renderSearchResultFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const parsedHTML = new DOMParser().parseFromString(responseText, "text/html");
        document.getElementById('product-grid').innerHTML = parsedHTML.getElementById('product-grid').innerHTML
        document.getElementById('search_results_count').innerHTML = parsedHTML.getElementById('search_results_count').innerHTML
        document.getElementById('search_keyword').value = parsedHTML.getElementById('search_keyword').value
      });
  }
  
  convertLanguage (languageInput){
    if(!languageInput) {
      return 'OR';
    }
    return `${languageInput.trim()} OR バーキン`;
  }
}

customElements.define("product-filter", ProductFilter);
