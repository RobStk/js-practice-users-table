class PaginationBar {

  /**
   * Function exist only for standarization. You can use the constructor instead.
   * @param {HTMLElement} DOMPaginationBar  DOM pagination element refrence.
   * @param {Object} pages                  Current pages data.
   * @returns {PaginationBar}               New instance of class.
   */
  static async create(DOMPaginationBar, pages) {
    return new PaginationBar(DOMPaginationBar, pages);
  }

  /**
   * Constructor. It creates pages wrapper in DOM and replace its childrens to current.
   * @param {HTMLElement} DOMPaginationBar  DOM pagination element refrence.
   * @param {Object} pages                  Current pages data.
   */
  constructor(DOMPaginationBar, pages) {
    this.#DOMPaginationBar = DOMPaginationBar;
    this.#pages = pages;
    this.#prevButton = this.#DOMPaginationBar.querySelector('#prev');
    if (this.#prevButton == null || this.#prevButton == undefined) {
      this.#prevButton = document.createElement('button');
      this.#prevButton.id = 'prev';
      this.#prevButton.textContent = 'prev';
      this.#DOMPaginationBar.prepend(this.#prevButton);
    }
    this.#nextButton = this.#DOMPaginationBar.querySelector('#next');
    if (this.#nextButton == null || this.#nextButton == undefined) {
      this.#nextButton = document.createElement('button');
      this.#nextButton.id = 'next';
      this.#nextButton.textContent = 'next';
      this.#DOMPaginationBar.append(this.#nextButton);
    }
    let pagesWrapper = this.#DOMPaginationBar.querySelector('.paginator-pagesWrapper');

    if (pagesWrapper == null) {
      pagesWrapper = document.createElement('div');
      const parent = this.#nextButton.parentElement;
      parent.insertBefore(pagesWrapper, this.#nextButton);
    }
    const newPagesWrapper = document.createElement('span');
    newPagesWrapper.classList.add("paginator-pagesWrapper");
    const currentPageField = document.createElement('span');
    currentPageField.classList.add("paginator-pageField");
    currentPageField.textContent = this.#pages.numbers.current;
    const slashField = document.createElement('span');
    slashField.classList.add("paginator-slashField");
    slashField.textContent = '/';
    const lastPageField = document.createElement('span');
    lastPageField.classList.add("paginator-pageField");
    lastPageField.textContent = this.#pages.numbers.last;
    newPagesWrapper.appendChild(currentPageField);
    newPagesWrapper.appendChild(slashField);
    newPagesWrapper.appendChild(lastPageField);
    const parent = pagesWrapper.parentElement;
    parent.replaceChild(newPagesWrapper, pagesWrapper);

    this.#pagesWrapper = newPagesWrapper;
    this.#currentPageField = currentPageField;
    this.#lastPageField = lastPageField;
    this.#createBar(this.#pages);
  }
  #DOMPaginationBar;
  #prevButton;
  #nextButton;
  #pagesWrapper;
  #currentPageField;
  #lastPageField
  #pages;

  /**
   * @returns {HTMLElement} DOM prev button element refrence. 
   */
  get prevButton() {
    return this.#prevButton;
  }

  /**
   * @returns {HTMLElement} DOM next button element refrence.
   */
  get nextButton() {
    return this.#nextButton;
  }

  #createBar(pages) {
    if (pages.links.next == null || pages.links.next == "") {
      this.#nextButton.disabled = true;
    } else {
      this.#nextButton.disabled = false;
    }
    if (pages.links.prev == null || pages.links.prev == "") {
      this.#prevButton.disabled = true;
    } else {
      this.#prevButton.disabled = false;
    }
    if (pages.links.last != undefined && pages.numbers.last != "" && pages.numbers.last != null) {
      this.#currentPageField.textContent = pages.numbers.current;
      this.#lastPageField.textContent = pages.numbers.last;
    }
  }
}

export { PaginationBar };