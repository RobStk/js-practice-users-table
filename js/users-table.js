class UsersTable {

  /**
   * Function exist only for standarization. You can use the constructor instead.
   * @param {HTMLTableElement} usersDOMTable  DOM users table refrence.
   * @param {Array<Object>} usersArr          Users data array. Each user has his own index.
   * @returns {UsersTable}                    New instance of class.
   */
  static async create(usersDOMTable, usersArr) {
    return new UsersTable(usersDOMTable, usersArr);
  }

  /**
   * UsersTable constructor.
   * @param {HTMLTableElement} usersDOMTable    DOM users table refrence.
   * @param {Array<Object>} usersArr            Users data array. Each user has his own index.
   */
  constructor(usersDOMTable, usersArr) {
    this.#DOMTable = usersDOMTable;
    this.#usersArr = usersArr;
    this.#createTable();
  }

  /**
   * UsersTable properties.
   * @private
   * @param {HTMLTableElement} DOMTable   DOM users table refrence.
   * @private
   * @param {usersArr} usersArr           Users data array. Each user has his own index.
   */
  #DOMTable;
  #usersArr;

  /**
   * Private method creating a table. Any existing table is replaced.
   * @private
   */
  #createTable() {
    let oldTabBody = this.#DOMTable.querySelector('tbody');
    if (oldTabBody == null || oldTabBody == undefined) {
      oldTabBody = document.createElement('tbody');
      this.#DOMTable.appendChild(oldTabBody);
    }
    const newTabBody = document.createElement('tbody');
    this.#usersArr.forEach(user => {
      const row = document.createElement('tr');

      const id = document.createElement('td');
      id.innerText = user.id;
      row.appendChild(id);

      const firstName = document.createElement('td');
      firstName.innerText = user.first_name;
      row.appendChild(firstName);

      const lastName = document.createElement('td');
      lastName.innerText = user.last_name;
      row.appendChild(lastName);

      const email = document.createElement('td');
      email.innerText = user.email;
      row.appendChild(email);

      const gender = document.createElement('td');
      gender.innerText = user.gender;
      row.appendChild(gender);

      const ip_address = document.createElement('td');
      ip_address.innerText = user.ip_address;
      row.appendChild(ip_address);

      newTabBody.appendChild(row);
    });
    this.#DOMTable.replaceChild(newTabBody, oldTabBody);
  };
}

export { UsersTable };