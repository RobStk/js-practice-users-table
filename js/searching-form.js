class SearchingForm {
  /**
   * Function exist only for standarization. You can use the constructor instead.
   * @param {HTMLFormElement} DOMSearchingForm  DOM form element refrence.
   * @param {Object} filtersIDs                 HTML IDs of filters inputs.
   * @returns {SearchingForm}                   New instance of class.
   */
  static async create(DOMSearchingForm, filtersIDs) {
    return new SearchingForm(DOMSearchingForm, filtersIDs);
  }
  /**
   * SearchingForm constructor.
   * @param {HTMLFormElement} DOMSearchingForm  DOM form element refrence.
   * @param {Object} filtersIDs                 HTML filters inputs IDs.
   */
  constructor(DOMSearchingForm, filtersIDs) {
    this.#DOMSearchingForm = DOMSearchingForm;
    this.#filtersIDs = filtersIDs;
  }
  #DOMSearchingForm;
  #filtersIDs;

  /**
   * Public method to getting filters from DOM form element.
   * @returns {Object}  Object containing current filters from DOM form.
   */
  getFilters() {
    const filters = {}
    for (const [key, val] of Object.entries(this.#filtersIDs)) {
      if (val != "" && val != null) {
        const input = this.#DOMSearchingForm.querySelector(val);
        if (input == null) {
          console.error(`"${val}" not found. Check your filters IDs.`);
        } else {
          filters[key] = input.value;
        }
      }
    }
    return filters;
  }
}

export { SearchingForm };