export const groupByProj = (arr) => {
  let obj = {};
  let tempArr = [];
  return arr.reduce((acc, curr, i, a) => {
    if (i === 0) {
      // first item
      obj.id = `${curr.project}-${i}`;
      obj.start = i;
      obj.title = curr.project;
      tempArr.push(curr);
    } else if (
      i === a.length - 1 &&
      curr.project !== a[i - 1].project &&
      tempArr.length
    ) {
      // last item, non matching, and temp is not empty
      obj.values = tempArr;
      acc.push(obj);
      obj = {};
      obj.id = `${curr.project}-${i}`;
      obj.start = i;
      obj.title = curr.project;
      obj.values = [curr];
      acc.push(obj);
    } else if (
      i === a.length - 1 &&
      curr.project !== a[i - 1].project &&
      tempArr.length === 0
    ) {
      // last item, non matching, and temp is empty
      obj.id = `${curr.project}-${i}`;
      obj.start = i;
      obj.title = curr.project;
      obj.values = [curr];
      acc.push(obj);
    } else if (i === a.length - 1 && curr.project === a[i - 1].project) {
      // last item and matching
      tempArr.push(curr);
      obj.values = tempArr;
      acc.push(obj);
      obj = {};
    } else if (curr.project === a[i - 1].project) {
      // matching
      tempArr.push(curr);
    } else if (curr.project !== a[i - 1].project) {
      // non matching
      obj.values = tempArr;
      acc.push(obj);
      obj = {};
      obj.id = `${curr.project}-${i}`;
      obj.start = i;
      obj.title = curr.project;
      tempArr = [];
      tempArr.push(curr);
    }
    return acc;
  }, []);
};
