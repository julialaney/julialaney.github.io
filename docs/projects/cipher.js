// --------------------
// Caesar Cipher
// --------------------

function caesar(text, key) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";

  key = ((key % 26) + 26) % 26;
  const numKey = key % 10;

  let result = "";

  for (let char of text.toLowerCase()) {

    if (alphabet.includes(char)) {
      const index = alphabet.indexOf(char);
      result += alphabet[(index + key) % 26];

    } else if (numbers.includes(char)) {
      const index = numbers.indexOf(char);
      result += numbers[(index + numKey) % 10];

    } else {
      result += char;
    }
  }

  return result;
}


// --------------------
// Atbash Cipher
// --------------------

function atbash(text) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const reverseAlphabet = "zyxwvutsrqponmlkjihgfedcba";

  const numbers = "1234567890";
  const reverseNumbers = "0987654321";

  let result = "";

  for (let char of text.toLowerCase()) {

    if (alphabet.includes(char)) {
      result += reverseAlphabet[alphabet.indexOf(char)];

    } else if (numbers.includes(char)) {
      result += reverseNumbers[numbers.indexOf(char)];

    } else {
      result += char;
    }
  }

  return result;
}


// --------------------
// Morse Code
// --------------------

const morseEncodeMap = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",

  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",

  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--.."
};

const morseDecodeMap =
  Object.fromEntries(
    Object.entries(morseEncodeMap)
      .map(([character, morse]) => [morse, character])
  );


function morseEncode(text) {
  let result = "";

  for (let char of text.toLowerCase()) {

    if (morseEncodeMap[char]) {
      result += morseEncodeMap[char] + "/";

    } else {
      result += char + "/";
    }
  }

  return result;
}


function morseDecode(text) {

  return text
    .split("/")
    .map(code => {

      if (morseDecodeMap[code]) {
        return morseDecodeMap[code];
      }

      return code;

    })
    .join("");
}


// --------------------
// Widget controls
// --------------------

function encodeMessage() {

  const message =
    document.getElementById("cipher-input").value;

  const cipher =
    document.getElementById("cipher-type").value;

  const key =
    parseInt(document.getElementById("cipher-key").value) || 0;

  let result;

  if (cipher === "caesar") {
    result = caesar(message, key);

  } else if (cipher === "atbash") {
    result = atbash(message);

  } else if (cipher === "morse") {
    result = morseEncode(message);
  }

  document.getElementById("cipher-output").textContent = result;
}


function decodeMessage() {

  const message =
    document.getElementById("cipher-input").value;

  const cipher =
    document.getElementById("cipher-type").value;

  const key =
    parseInt(document.getElementById("cipher-key").value) || 0;

  let result;

  if (cipher === "caesar") {
    result = caesar(message, -key);

  } else if (cipher === "atbash") {
    result = atbash(message);

  } else if (cipher === "morse") {
    result = morseDecode(message);
  }

  document.getElementById("cipher-output").textContent = result;
}


function toggleKey() {

  const cipher =
    document.getElementById("cipher-type").value;

  const keyContainer =
    document.getElementById("key-container");

  if (cipher === "caesar") {
    keyContainer.style.display = "block";
  } else {
    keyContainer.style.display = "none";
  }
}


document.getElementById("encode-button").addEventListener("click", encodeMessage);
document.getElementById("decode-button").addEventListener("click", decodeMessage);
document.getElementById("cipher-type").addEventListener("change", toggleKey);