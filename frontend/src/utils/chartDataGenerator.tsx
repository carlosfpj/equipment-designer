let data: {i:number, v:number}[] = [];

(function data1() {

  let v;
  const iterable = [0.614, 0.957, 1.278, 1.500, 1.939,
                    2.125, 2.323, 2.900, 3.826, 6.065,
                    7.981, 10.020, 11.938, 13.250, 15.250, 17.250]

  for (let d of iterable) {
    for(let i = 100; i< 100000;) {
      v = (0.012 * (i)) / (d ** 2);
      if(v < 50 || v > 0.5) {
        let point: { i: number, v: number } = { i, v };
        data.push(point);
        i = i + 100;
      } else break;
    }
  }
})();

export {data};

