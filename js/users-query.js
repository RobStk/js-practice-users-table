class UsersQuery {
  /**
   * Static async function to create new instance of class.
   * @param {Object} queryOpts    API query options. Check your API for details.
   * @returns {UsersQuery|Error}  Constructor or Error if it fails.
   */
  static async create(queryOpts) {
    let query = `${queryOpts.url}?_sort=${queryOpts.sortColumn}&_order=${queryOpts.sortOrder}&_page=${queryOpts.page}`;

    if (queryOpts.filters == null) {
      queryOpts.filters = {};
    }
    for (const [key, val] of Object.entries(queryOpts.filters)) {
      if (val != "") {
        query += ('&' + key + '=' + val);
      }
    }

    try {
      const responseData = await fetch(query);
      if (responseData.ok == false) {
        throw new Error(`Http error: ${responseData.status}`);
      }
      const jsonData = await responseData.json();
      const isCreated = true;
      return new UsersQuery(responseData, jsonData, isCreated);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * This constructor is called by static async .create function. Do not use it.
   * @param {Object} responseData     Fetch result.
   * @param {Array<Object>} jsonData  Users array.
   * @param {Bool} isCreated          Flag to check if object is created by .create function.
   * @returns {UsersQuery}            New instance of class.
   */
  constructor(responseData, jsonData, isCreated) {
    if (isCreated !== true) {
      return console.error('Instance of UsersQuery must be create by "create()" static async function.');
    }
    this.#usersArr = jsonData;
    this.#responseData = responseData;
    this.#getPages();
  }

  #responseData;
  #usersArr
  #pages = {
    links: {
      current: "",
      prev: "",
      next: "",
      first: "",
      last: ""
    },
    numbers: {
      current: 1,
      prev: "",
      next: "",
      first: 1,
      last: 1
    }
  }
  /**
   * @returns {Array<Object>}   Users array.
   */
  get usersArr() {
    return this.#usersArr;
  }
  /**
   * @returns {Object}   Current pages data.
   */
  get pages() {
    return this.#pages;
  }

  #getPagesLinks() {
    const headerLink = this.#responseData.headers.get("Link");
    let linksObj = headerLink.split(', ').map(header => header.split('; '));
    linksObj = linksObj.map(arr => {
      const url = arr[0].slice(1, -1);
      const rel = arr[1].slice(5, -1);
      return [rel, url];
    });
    linksObj = Object.fromEntries(linksObj);
    linksObj.current = this.#responseData.url;
    return linksObj;
  }

  #getPageNumberFromLink(pageLink) {
    const arr = pageLink.split('?_').map(params => params.split('&_'));
    const paramArr = arr[1];
    let page = paramArr[2].split('&');
    page = page[0].slice(5);
    return page;
  }

  #getPagesNumbers() {
    const pagesLinks = this.#pages.links;
    const pagesNumbersObj = new Object;
    if (pagesLinks.current != undefined && pagesLinks.current != null) {
      pagesNumbersObj.current = this.#getPageNumberFromLink(pagesLinks.current);
    }
    if (pagesLinks.prev != undefined && pagesLinks.prev != null) {
      pagesNumbersObj.prev = this.#getPageNumberFromLink(pagesLinks.prev);
    }
    if (pagesLinks.next != undefined && pagesLinks.next != null) {
      pagesNumbersObj.next = this.#getPageNumberFromLink(pagesLinks.next);
    }
    if (pagesLinks.first != undefined && pagesLinks.first != null) {
      pagesNumbersObj.first = this.#getPageNumberFromLink(pagesLinks.first);
    }
    if (pagesLinks.last != undefined && pagesLinks.last != null) {
      pagesNumbersObj.last = this.#getPageNumberFromLink(pagesLinks.last);
    }
    return pagesNumbersObj;
  }

  #getPages() {
    const headerLink = this.#responseData.headers.get("Link");
    if (headerLink != "") {
      this.#pages.links = this.#getPagesLinks();
      this.#pages.numbers = this.#getPagesNumbers();
    }
  }
}

export { UsersQuery };