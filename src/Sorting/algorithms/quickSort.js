import { swapWithDelay } from "./helpers";

export default async function quickSort(recs, startIdx, endIdx, setRectangles) {
  if (startIdx < endIdx) {
    let pivotIdx = await partition(recs, startIdx, endIdx, setRectangles);
    await quickSort(recs, startIdx, pivotIdx - 1, setRectangles);
    await quickSort(recs, pivotIdx + 1, endIdx, setRectangles);
  }
}

const partition = async (recs, startIdx, endIdx, setRectangles) => {
  let pivotIdx = startIdx;
  document.getElementById(`${endIdx}`).className = "rectangle rectangle-pivot";
  for (let i = startIdx; i < endIdx; i++) {
    document.getElementById(`${i}`).className = "rectangle rectangle-current";
    if (recs[i] < recs[endIdx]) {
      await swapWithDelay(recs, pivotIdx, i);
      setRectangles([...recs]);

      pivotIdx++;
    }
    document.getElementById(`${i}`).className = "rectangle";
  }

  document.getElementById(`${pivotIdx}`).className = "rectangle rectangle-red";
  await swapWithDelay(recs, pivotIdx, endIdx);
  setRectangles([...recs]);
  document.getElementById(`${pivotIdx}`).className = "rectangle";
  document.getElementById(`${endIdx}`).className = "rectangle";

  return pivotIdx;
};
