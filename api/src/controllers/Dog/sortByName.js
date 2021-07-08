/* eslint-disable consistent-return */
module.exports = {
  sortByName: (breedsList, sort) => {
    if (sort === 'asc') {
      return breedsList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (sort === 'desc') {
      return breedsList.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    }
  },
};
