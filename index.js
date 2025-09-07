#!/usr/bin/env node
const inquirer = require("inquirer");

const fs = require("fs");
const path = require("path");

const tabDir = path.join(__dirname, "tabs");
const files = fs.readdirSync(tabDir);

const tuningOptions = require("./tuningOptions.json");

// console.log("tuning", tuningOptions);

// Fetch the local files
const parsedTabs = files
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(tabDir, f), "utf-8")));

// 6 strings with a large number of dashes representing beats
const rowLength = Math.floor(process.stdout.columns * 0.25);
const guitarString = Array(rowLength).join("---");

function getStringName(str, tuning) {
  var guitarTuning = tuningOptions.find((o) => o.key == tuning);
  return guitarTuning.strings.find((s) => s.guitarString == str).name;
}

function generateTab(tab, tuning) {
  if (!tuning) {
    tuning = 0;
  }
  const foundTab = parsedTabs.find((t) => t.name == tab);

  // find smallest beat duration, which would be the highest value in the array
  const smallestDuration = Math.max(
    ...foundTab.notes.map(({ duration }) => duration)
  );

  const guitar = Array.from(Array(6), () => {
    return [...guitarString]
      .map((x, i) => ((i + 1) % smallestDuration == 0 ? "|" : x))
      .join("");
  });

  const riff = guitar.map((str, index) => {
    const chars = str.split("");
    foundTab.notes
      .filter((n) => n.string == index + 1)
      .map((n) => {
        const position = n.beat * 3;
        chars[position] = " ";
        if (n.fret.length > 1) {
          chars[position + 1] = " ";
        }

        const frettedString = n.fret.toString();
        frettedString.split("").map((digit, di) => {
          chars[position + di] = digit;
        });
      });

    return getStringName(index, tuning) + ":--" + chars.join("");
  });
  // Rock n roll baby
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
