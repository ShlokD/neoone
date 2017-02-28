export const fetchData = (url, options) => fetch(url, options).then(response => response.json());

export default fetchData;
