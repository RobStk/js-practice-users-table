import { UsersBrowser } from "./users-browser.js";

const defaultQueryOpts = {
  url: 'http://localhost:3000/users',
  sortColumn: 'id',
  sortOrder: 'asc',
  page: 1,
}

const filtersIDs = {
  id: '#formId',
  first_name: '#formName',
  last_name: '#formSurname',
  email: '#formEmail',
  gender: '#formGender',
  ip_adress: '#formIp'
}

async function main() {
  const serachingForm = document.querySelector('.form');
  const usersTable = document.querySelector('.tab');
  const paginationBar = document.querySelector('.tab-buttons');
  const usersBrowser = await UsersBrowser.create(serachingForm, usersTable, paginationBar, defaultQueryOpts, filtersIDs);
}

main();
