import Fuse from 'fuse.js';

export const searchSpareParts = (queryParams, data) => {
  const fuseOptions = {
    includeScore: true,
    keys: ['name', 'brand', 'price', 'sn'],
    threshold: 0.3, 
  };

  const fuse = new Fuse(data, fuseOptions);

  let query = '';
  

  Object.keys(queryParams).forEach(key => {
    query += `${key}:${queryParams[key]} `;
  });


  const results = fuse.search(query).map(result => result.item);
  return results;
};
