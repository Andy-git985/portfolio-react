export const groupByProj = (arr) => {
  let tempArr = [];
  return arr.reduce((acc, curr, i, a) => {
    if (i === 0) {
      tempArr.push(curr);
    } else if (
      i === a.length - 1 &&
      curr.project !== a[i - 1].project &&
      tempArr.length
    ) {
      acc.push(tempArr);
      acc.push([curr]);
    } else if (
      i === a.length - 1 &&
      curr.project !== a[i - 1].project &&
      tempArr.length === 0
    ) {
      acc.push([curr]);
    } else if (i === a.length - 1 && curr.project === a[i - 1].project) {
      tempArr.push(curr);
      acc.push(tempArr);
    } else if (curr.project === a[i - 1].project) {
      tempArr.push(curr);
    } else if (curr.project !== a[i - 1].project) {
      acc.push(tempArr);
      tempArr = [];
      tempArr.push(curr);
    }
    return acc;
  }, []);
};
