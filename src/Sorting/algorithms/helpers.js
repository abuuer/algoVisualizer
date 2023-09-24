export const swap = async (recs, i, j) => {
  let temp = recs[i];
  recs[i] = recs[j];
  recs[j] = temp;
};

const getDelay = (recsNumber) => {
  if (recsNumber <= 10) return 1500;
  else if (recsNumber <= 220) return 8000 / recsNumber;
  else if (recsNumber <= 340) return 3000 / recsNumber;
  else if (recsNumber <= 440) return 2000 / recsNumber;
  else return 1;
};

export const sleep = async (recsNumber) => {
  return new Promise((resolve) => setTimeout(resolve, getDelay(recsNumber)));
};
