import { swap, sleep } from "./helpers";

export default async function selectionSort(recs, setRectangles) {
  let i, j, min_idx;

  for (i = 0; i < recs.length - 1; i++) {
    document.getElementById(`${i}`).className = "rectangle rectangle-current";
    min_idx = i;
    for (j = i + 1; j < recs.length; j++) {
      document.getElementById(`${j}`).className = "rectangle rectangle-red";
      await sleep(recs.length);
      if (recs[j] < recs[min_idx]) {
        min_idx = j;
      }
      document.getElementById(`${j}`).className = "rectangle";
    }
    await sleep(recs.length);
    await swap(recs, min_idx, i);
    setRectangles([...recs]);
    document.getElementById(`${i}`).className = "rectangle";
  }
}
