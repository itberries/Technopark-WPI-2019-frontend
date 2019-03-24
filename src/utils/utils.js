class Utils {
  makeMapFromArray(array) {
    const map = new Map();
    array.forEach((elem) => {
      map.set(elem.id, elem);
    });
    return map;
  }
}

export default new Utils();
