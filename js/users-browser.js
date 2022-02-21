import { UsersQuery } from "./users-query.js";
import { UsersTable } from "./users-table.js";
import { PaginationBar } from "./pagination-bar.js";
import { SearchingForm } from "./searching-form.js";

class UsersBrowser {
  /**
   * Static async function creating new UsersBrowser instance.
   * @param {HTMLFormElement} DOMSearchingForm    Refrence to DOM form element.
   * @param {HTMLTableElement} DOMTableForUsers   Users HTML table refrence.
   * @param {HTMLElement} DOMPaginationBar        Refrence to HTML Element containing pagination.
   * @param {Object} queryOpts                    API query options. Check your API for details.
   * @param {Object} filtersIDs                   HTML IDs of filters inputs.
   * @returns {UsersBrowser}                      New UsersBrowser instance.
   */
  static async create(DOMSearchingForm, DOMTableForUsers, DOMPaginationBar, queryOpts, filtersIDs) {
    const usersQuery = await UsersQuery.create(queryOpts);
    return new UsersBrowser(usersQuery, DOMSearchingForm, DOMTableForUsers, DOMPaginationBar, queryOpts, filtersIDs);
  }
  /**
   * Constructor
   * @param {UsersQuery} usersQuery             Object containing data of json-server query.
   * @param {HTMLFormElement} DOMSearchingForm  DOM form element refrence.
   * @param {HTMLTableElement} DOMTableForUsers DOM table element refrence.
   * @param {HTMLElement} DOMPaginationBar      DOM pagination element refrence.
   * @param {Object} queryOpts                  API query options. Check your API for details.
   * @param {Object} filtersIDs                 HTML IDs of filters inputs.
   * @returns {UsersBrowser}                    New instance of class.
   */
  constructor(usersQuery, DOMSearchingForm, DOMTableForUsers, DOMPaginationBar, queryOpts, filtersIDs) {
    if (!(usersQuery instanceof UsersQuery)) {
      return console.error('Instance of UsersBrowser must be create by "create()" static async function.');
    }
    this.#usersQuery = usersQuery;
    this.#pages = usersQuery.pages;
    this.#DOMSearchingForm = DOMSearchingForm;
    this.#DOMTable = DOMTableForUsers;
    this.#DOMPaginationBar = DOMPaginationBar;
    this.#queryOpts = queryOpts;
    this.#filtersIDs = filtersIDs;
    this.#usersTable = new UsersTable(DOMTableForUsers, usersQuery.usersArr);
    this.#paginationBar = new PaginationBar(this.#DOMPaginationBar, this.#pages)
    this.#paginationBar.prevButton.addEventListener('click', this.#goToPrevPage.bind(this));
    this.#paginationBar.nextButton.addEventListener('click', this.#goToNextPage.bind(this));
    this.#searchingForm = new SearchingForm(this.#DOMSearchingForm, this.#filtersIDs);
    this.#DOMSearchingForm.addEventListener('submit', this.#filter.bind(this));
    this.#DOMSearchingForm.addEventListener('reset', this.#reset.bind(this));
    this.#addSorting();
  }
  #queryOpts;
  #filtersIDs;
  #usersQuery;
  #pages;
  #searchingForm;
  #paginationBar;
  #usersTable;
  #DOMSearchingForm;
  #DOMTable;
  #DOMPaginationBar;

  #disablePolyline() {
    const polylines = this.#DOMTable.querySelectorAll('polyline');
    polylines.forEach(polyline => {
      polyline.style = 'pointer-events: none';
    })
  }

  async #changeSorting(event) {
    if (event.target.classList.contains('arrow')) {
      if (this.#queryOpts.sortColumn != event.target.closest('th').dataset.id) {
        this.#queryOpts.sortOrder = 'asc';
      } else if (this.#queryOpts.sortOrder == 'asc') {
        this.#queryOpts.sortOrder = 'desc';
      } else {
        this.#queryOpts.sortOrder = 'asc';
      }
      this.#queryOpts.sortColumn = event.target.closest('th').dataset.id;
      await this.#update();
    }
  }

  async #goToPrevPage() {
    if ((this.#pages.numbers.prev != undefined) && (this.#pages.numbers.prev != null) && (this.#pages.numbers.prev != "")) {
      this.#queryOpts.page = this.#pages.numbers.prev;
      await this.#update();
    }
  }

  async #goToNextPage() {
    if ((this.#pages.numbers.next != undefined) && (this.#pages.numbers.next != null) && (this.#pages.numbers.next != "")) {
      this.#queryOpts.page = this.#pages.numbers.next;
      await this.#update();
    }
  }

  #filter(event) {
    event.preventDefault();
    this.#queryOpts.page = 1;
    this.#queryOpts.filters = this.#searchingForm.getFilters();
    this.#update();
  }

  #reset(event) {
    this.#queryOpts.page = 1;
    this.#queryOpts.filters = {};
    this.#update();
  }

  // Zaimplementować obsługę przypadków nieznalezienia elementów DOM
  #addSorting() {
    this.#disablePolyline();
    const ths = this.#DOMTable.querySelectorAll('th');
    ths.forEach(th => {
      th.addEventListener("click", this.#changeSorting.bind(this));
    });
  }

  async #update() {
    this.#usersQuery = await UsersQuery.create(this.#queryOpts);
    this.#pages = this.#usersQuery.pages;
    this.#usersTable = new UsersTable(this.#DOMTable, this.#usersQuery.usersArr);
    this.#paginationBar = new PaginationBar(this.#DOMPaginationBar, this.#pages);
    this.#searchingForm = new SearchingForm(this.#DOMSearchingForm, this.#filtersIDs);
  }
}

export { UsersBrowser };