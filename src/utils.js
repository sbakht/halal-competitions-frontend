export const find = function find(fn, arr, df) {
  if(df === undefined) {
    throw new Error();
  }

  const result = arr.find(fn)
  if (typeof result !== 'undefined') {
    return result;
  }
  return df
}

export const groupBy = function groupBy(arr, key) {
  if (!arr.length) {
    return {};
  }
  const obj = {};
  try {
    arr.forEach((item) => {
      const val = item[key];
      if (!obj[val]) {
        obj[val] = [];
      }
      obj[val].push(item);
    });
    return obj;
  } catch (e) {
    console.error(e);
  }
}