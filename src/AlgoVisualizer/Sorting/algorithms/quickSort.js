import { swap, sleep } from "./helpers";

export default async function quickSort(recs, startIdx, endIdx, setRectangles) {
  if (startIdx < endIdx) {
    let pivotIdx = await partition(recs, startIdx, endIdx, setRectangles);
    const promise1 = quickSort(recs, startIdx, pivotIdx - 1, setRectangles);
    const promise2 = quickSort(recs, pivotIdx + 1, endIdx, setRectangles);
    await Promise.all([promise1, promise2]);
  }
}

const partition = async (recs, startIdx, endIdx, setRectangles) => {
  let pivotIdx = startIdx;
  document.getElementById(`${endIdx}`).className = "rectangle rectangle-pivot";

  for (let i = startIdx; i < endIdx; i++) {
    document.getElementById(`${i}`).className = "rectangle rectangle-current";
    document.getElementById(`${pivotIdx}`).className =
      "rectangle rectangle-red";
    await sleep(recs.length);
    if (recs[i] < recs[endIdx]) {
      await swap(recs, pivotIdx, i);
      setRectangles([...recs]);
      document.getElementById(`${pivotIdx}`).className = "rectangle";
      pivotIdx++;
    }
    document.getElementById(`${i}`).className = "rectangle";
  }
  await swap(recs, pivotIdx, endIdx);
  setRectangles([...recs]);
  document.getElementById(`${pivotIdx}`).className = "rectangle";
  document.getElementById(`${endIdx}`).className = "rectangle";

  return pivotIdx;
};
