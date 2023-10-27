const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('BASE_URL', BASE_URL);
export const api = {
  getApi: `${BASE_URL}api/Product/Products`,
  saveApi: `${BASE_URL}`
};
