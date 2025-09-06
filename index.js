const crazyTrain = require("./riffs/crazyTrain.json");

// 6 strings with a large number of dashes representing beats
const guitar = Array.from(Array(6), () => Array(150).join("-"));

const riff = guitar.map((str, index) => {
  // map over strings and get notes that match the string number
  return crazyTrain.reduce((acc, cur) => {
    // get previous notes on string and add spacing
    var first = acc.substring(0, cur.beat * 3);
    var last = acc.substring(cur.beat * 3);
    // apply new fret note on beat
    return first + (cur.string == index + 1 ? cur.fret : "-") + last;
  }, str);
});
console.log(riff);
