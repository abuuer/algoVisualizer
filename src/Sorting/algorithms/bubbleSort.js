export default async function bubbleSort(recs, setRectangles) {
  for (let i = 0; i < recs.length; i++) {
    let swapped = false;
    for (let j = 0; j < recs.length - i - 1; j++) {
      document.getElementById(`${j}`).className = "rectangle rectangle-current";

      await swapWithDelay(recs, j, j + 1);
      setRectangles([...recs]);
      swapped = true;
      document.getElementById(`${j}`).className = "rectangle";
    }

    if (!swapped) break;
  }
}

const swapWithDelay = async (recs, i, j) => {
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
