export default function bubbleSort(recs) {
  let animationArray = [];

  let shallowrec = getValue(recs);
  console.log(shallowrec);
  for (let i = 0; i < shallowrec.length; i++) {
    let swapped = false;
    for (let j = 0; j < shallowrec.length - i - 1; j++) {
      if (shallowrec[j] > shallowrec[j + 1]) {
        // console.log(shallowrec);
        let temp = shallowrec[j];
        shallowrec[j] = shallowrec[j + 1];
        shallowrec[j + 1] = temp;
        animationArray.push({
          currntRecIndx: j,
          currntRec: temp,
          round: i,
          swappedRecs: [
            { height: shallowrec[j] },
            { height: shallowrec[j + 1] },
          ],
        });
        swapped = true;
      }
    }
    if (swapped === false) break;
  }
  //   console.log(shallowrec);
  //   console.log(animationArray);

  return animationArray;
}

const getValue = (recs) => {
  return recs.map((obj) => obj.height);
};
