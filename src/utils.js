import firebase from "firebase/app";

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
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


export function dateRange() {
  const currentDate =  firebase.firestore.Timestamp.now().toDate();
  const monday = new Date((new Date(currentDate.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7))).setHours(0,0,0,0));

  return {start: monday, end: monday.addDays(7)}
}