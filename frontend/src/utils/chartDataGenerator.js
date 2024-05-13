let data = [];
const parts = [];

(function data1() {

  let v;
  const iterable = [0.614, 0.957, 1.278, 1.500, 1.939,
                    2.125, 2.323, 2.900, 3.826, 6.065,
                    7.981, 10.020, 11.938, 13.250, 15.250, 17.250]

  for (let j=0; j<iterable.length; j++) {
    let d = iterable[j];
    for(let i = 100; i< 100000;) {
      v = (0.012 * (i)) / (d ** 2);
      if(v < 0.5 && v> 50){
        continue;
      } else {
        let point = { v, i };
        data.push(point);
        i = i + 100;
      }
    }
  }
  sliceData(data, 16);
})();

function sliceData(d, numParts) {

  // const filteredData1 = d.filter(d => d.v > 50);
  // const filteredData2 = filteredData1.filter(d => d.v < 50);

  const partLength = Math.floor(d.length / numParts);

  for(let i=0; i < numParts; i++) {
    const startIndex = i * partLength;
    const endIndex = startIndex + partLength;
    parts.push(d.slice(startIndex, endIndex));
  }
  return parts;
}

export {parts};
