export const groupByProj = (arr) => {
  let obj = {};
  let tempArr = [];
  return arr.reduce((acc, curr, i, a) => {
    if (i === 0) {
      // first item
      obj.start = i;
      obj.project = curr.project;
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
      obj.start = i;
      obj.project = curr.project;
      obj.values = [curr];
      acc.push(obj);
    } else if (
      i === a.length - 1 &&
      curr.project !== a[i - 1].project &&
      tempArr.length === 0
    ) {
      // last item, non matching, and temp is empty
      obj.start = i;
      obj.project = curr.project;
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
      obj.start = i;
      obj.project = curr.project;
      tempArr = [];
      tempArr.push(curr);
    }
    return acc;
  }, []);
};
// export const groupByProj = (arr) => {
//   let tempArr = [];
//   return arr.reduce((acc, curr, i, a) => {
//     if (i === 0) {
//       tempArr.push(curr);
//     } else if (
//       i === a.length - 1 &&
//       curr.project !== a[i - 1].project &&
//       tempArr.length
//     ) {
//       acc.push(tempArr);
//       acc.push([curr]);
//     } else if (
//       i === a.length - 1 &&
//       curr.project !== a[i - 1].project &&
//       tempArr.length === 0
//     ) {
//       acc.push([curr]);
//     } else if (i === a.length - 1 && curr.project === a[i - 1].project) {
//       tempArr.push(curr);
//       acc.push(tempArr);
//     } else if (curr.project === a[i - 1].project) {
//       tempArr.push(curr);
//     } else if (curr.project !== a[i - 1].project) {
//       acc.push(tempArr);
//       tempArr = [];
//       tempArr.push(curr);
//     }
//     return acc;
//   }, []);
// };
