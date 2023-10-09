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
        document.getElementById(`${min_idx}`).className = "rectangle";
        document.getElementById(`${i}`).className =
          "rectangle rectangle-current";
        min_idx = j;
        document.getElementById(`${min_idx}`).className =
          "rectangle rectangle-pivot";
        continue;
      }
      document.getElementById(`${j}`).className = "rectangle";
    }
    await sleep(recs.length);
    await swap(recs, min_idx, i);
    document.getElementById(`${min_idx}`).className = "rectangle";
    setRectangles([...recs]);
    document.getElementById(`${i}`).className = "rectangle";
  }
}
