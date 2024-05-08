let data: {i:number, v:number}[] = [];

(function data1() {

  let v;
  let d = 0.614;


  for (let i = 100; i < 100000;) {
    v = (0.012 * (i)) / (d ** 2);
    let point: { i:number, v:number } = {i,v} ;
    data.push(point);
    i = i + 100;
  }
})();

export {data};

