import { sleep } from "./helpers";

export default async function mergeSort(recs, startIdx, endIdx, setRectangles) {
  if (startIdx >= endIdx) {
    return;
  }

  let middleIdx = startIdx + parseInt((endIdx - startIdx) / 2);
  await mergeSort(recs, startIdx, middleIdx, setRectangles);
  await mergeSort(recs, middleIdx + 1, endIdx, setRectangles);
  await merge(recs, startIdx, middleIdx, endIdx, setRectangles);
}

async function merge(recs, startIdx, middleIdx, endIdx, setRectangles) {
  let leftRecs = recs.slice(startIdx, middleIdx + 1);
  let rightRecs = recs.slice(middleIdx + 1, endIdx + 1);
  let i = startIdx;
  let l = 0;
  let r = 0;
  document.getElementById(`${middleIdx}`).className =
    "rectangle rectangle-pivot";
  while (l < leftRecs.length && r < rightRecs.length) {
    document.getElementById(`${i}`).className = "rectangle rectangle-current";
    document.getElementById(`${i}`).className = "rectangle rectangle-current";
    await sleep(recs.length);
    if (leftRecs[l] <= rightRecs[r]) {
      recs[i] = leftRecs[l];
      l++;
    } else {
      recs[i] = rightRecs[r];
      r++;
    }
    document.getElementById(`${i}`).className = "rectangle";
    i++;

    setRectangles([...recs]);
  }
  while (l < leftRecs.length) {
    recs[i] = leftRecs[l];
    l++;
    i++;
    setRectangles([...recs]);
  }
  while (r < rightRecs.length) {
    recs[i] = rightRecs[r];
    r++;
    i++;
    setRectangles([...recs]);
  }
  document.getElementById(`${middleIdx}`).className = "rectangle";
}
