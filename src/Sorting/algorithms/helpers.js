export const swapNCompareWithDelay = async (recs, i, j) => {
  const delay = 5000 / recs.length;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (recs[i] > recs[j]) {
        let temp = recs[i];
        recs[i] = recs[j];
        recs[j] = temp;
      }
      resolve();
    }, delay);
  });
};

export const swapWithDelay = async (recs, i, j) => {
  const delay = 1000 / recs.length;
  return new Promise((resolve) => {
    setTimeout(() => {
      let temp = recs[i];
      recs[i] = recs[j];
      recs[j] = temp;
      resolve();
    }, delay);
  });
};
