import { swap, sleep } from "./helpers";

export default async function bubbleSort(recs, setRectangles) {
  for (let i = 0; i < recs.length; i++) {
    let swapped = false;
    for (let j = 0; j < recs.length - i - 1; j++) {
      document.getElementById(`${j}`).className = "rectangle rectangle-current";
      await sleep(recs.length);
      if (recs[j] > recs[j + 1]) {
        await swap(recs, j, j + 1);
      }
      setRectangles([...recs]);
      swapped = true;
      document.getElementById(`${j}`).className = "rectangle";
    }

    if (!swapped) break;
  }
}
