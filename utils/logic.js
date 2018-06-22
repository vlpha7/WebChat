export const findInMap = (theMap, theKey) => {
  let findMap;
  // TODO better algorithm
  theMap.forEach((value, key) => {
    const myArray = theMap.get(key);
    myArray.forEach((element) => {
      if (element === theKey) {
        findMap = key;
      }
    });
  });
  return theMap.get(findMap);
};
