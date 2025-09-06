const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const tabDir = path.join(process.cwd(), "tabs");
const files = fs.readdirSync(tabDir);

// Fetch the local files
var parsedTabs = files
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(tabDir, f), "utf-8")));

// 6 strings with a large number of dashes representing beats
const guitar = Array.from(Array(6), () => Array(150).join("-"));

function generateTab(tab) {
  const riff = guitar.map((str, index) => {
    // map over strings and get notes that match the string number
    return parsedTabs
      .find((t) => t.name == tab)
      .notes.reduce((acc, cur) => {
        // get previous notes on string and add spacing
        var first = acc.substring(0, cur.beat * 3);
        var last = acc.substring(cur.beat * 3, str.length);
        // apply new fret note on beat
        return first + (cur.string == index + 1 ? cur.fret : "") + last;
      }, str);
  });
  console.log(riff);
}

function mount() {
  const prompt = inquirer.createPromptModule();
  prompt({
    message: "What song would you like to play?",
    type: "list",
    choices: parsedTabs.map((x) => x.name),
  }).then((ans) => generateTab(ans[""]));
}

mount();
