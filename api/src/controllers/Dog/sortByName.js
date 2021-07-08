/* eslint-disable consistent-return */
module.exports = {
  sortByName: (breeds, sort) => {
    if (sort === 'asc') {
      return breeds.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (sort === 'desc') {
      return breeds.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    }
  },
};
