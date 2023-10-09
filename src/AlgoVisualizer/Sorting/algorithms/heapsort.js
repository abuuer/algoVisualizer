import { sleep, swap } from "./helpers";

export default async function heapSort(recs, setRectangles) {
  for (let i = Math.floor(recs.length / 2) - 1; i >= 0; i--) {
    await heapify(recs, i, recs.length, setRectangles);
  }
  for (let i = recs.length - 1; i > 0; i--) {
    await swap(recs, 0, i);
    setRectangles([...recs]);
    await heapify(recs, 0, i, setRectangles);
    setRectangles([...recs]);
  }
}

const heapify = async (recs, root, end, setRectangles) => {
  let largest = root;
  const leftChild = 2 * root + 1;
  const rightChild = 2 * root + 2;

  if (leftChild < end && recs[leftChild] > recs[largest]) {
    largest = leftChild;
  }
  if (rightChild < end && recs[rightChild] > recs[largest]) {
    largest = rightChild;
  }

  if (largest !== root) {
    document.getElementById(`${largest}`).className =
      "rectangle rectangle-current";
    document.getElementById(`${root}`).className = "rectangle rectangle-red";
    await sleep(recs.length);
    await swap(recs, root, largest);
    setRectangles([...recs]);
    document.getElementById(`${largest}`).className = "rectangle";
    document.getElementById(`${root}`).className = "rectangle";
    await heapify(recs, largest, end, setRectangles);
  }
};
