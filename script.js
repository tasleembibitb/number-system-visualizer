// Number System Visualizer — binary to decimal / octal / hexadecimal
// with step-by-step grouping, reverse conversion, and a practice quiz.
const HEX_DIGITS = "0123456789ABCDEF";
function cleanBinary(raw) {
  return raw.replace(/[^01]/g, "");
}
function padLeft(str, groupSize) {
  const rem = str.length % groupSize;
  if (rem === 0) return { padded: str, padCount: 0 };
  const padCount = groupSize - rem;
  return { padded: "0".repeat(padCount) + str, padCount };
}
function splitGroups(str, groupSize) {
  const groups = [];
  for (let i = 0; i < str.length; i += groupSize) {
    groups.push(str.slice(i, i + groupSize));
  }
  return groups;
}
function groupValue(group) {
  let value = 0;
  const weights = [];
  for (let i = 0; i < group.length; i++) {
    const w = Math.pow(2, group.length - 1 - i);
    weights.push(w);
    if (group[i] === "1") value += w;
  }
  return { value, weights };
}
function renderGroups(container, stepsBody, groups, padCount, digitFn) {
  container.innerHTML = "";
  groups.forEach((g, idx) => {
    const chip = document.createElement("div");
    chip.className = "group-chip";
    const { value } = groupValue(g);
    const paddedBits = idx === 0 && padCount > 0
      ? '<span class="pad">' + g.slice(0, padCount) + "</span>" + g.slice(padCount)
      : g;
    chip.innerHTML =
      '<span class="bits">' + paddedBits + "</span>" +
      '<span class="val">= ' + value + " = " + digitFn(value) + "</span>";
    container.appendChild(chip);
  });
  stepsBody.innerHTML = "";
  groups.forEach((g) => {
    const { value, weights } = groupValue(g);
    const parts = [];
    for (let i = 0; i < g.length; i++) {
      if (g[i] === "1") parts.push(weights[i]);
    }
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + g + "</td>" +
      "<td>" + (parts.length ? parts.join(" + ") : "0") + "</td>" +
      "<td>" + value + "</td>" +
      "<td>" + digitFn(value) + "</td>";
    stepsBody.appendChild(tr);
  });
}
function convert() {
  const input = document.getElementById("binInput");
  const raw = input.value.trim();
  const error = document.getElementById("binError");
  const clean = cleanBinary(raw);
  if (raw !== "" && clean !== raw) {
    error.hidden = false;
  } else {
    error.hidden = true;
  }
  if (clean === "") {
    document.getElementById("decOut").textContent = "—";
    document.getElementById("octOut").textContent = "—";
    document.getElementById("hexOut").textContent = "—";
    document.getElementById("hexGroups").innerHTML = "";
    document.getElementById("hexSteps").innerHTML = "";
    document.getElementById("octGroups").innerHTML = "";
    document.getElementById("octSteps").innerHTML = "";
    return;
  }
  const dec = BigInt("0b" + clean);
  document.getElementById("decOut").textContent = dec.toString();
  document.getElementById("octOut").textContent = dec.toString(8);
  document.getElementById("hexOut").textContent = dec.toString(16).toUpperCase();
  const hex = padLeft(clean, 4);
  renderGroups(
    document.getElementById("hexGroups"),
    document.getElementById("hexSteps"),
    splitGroups(hex.padded, 4),
    hex.padCount,
    (v) => HEX_DIGITS[v]
  );
  const oct = padLeft(clean, 3);
  renderGroups(
    document.getElementById("octGroups"),
    document.getElementById("octSteps"),
    splitGroups(oct.padded, 3),
    oct.padCount,
    (v) => String(v)
  );
}
function decToBin() {
  const raw = document.getElementById("decInput").value.trim();
  const out = document.getElementById("decToBin");
  if (!/^\d+$/.test(raw)) { out.textContent = "—"; return; }
  out.textContent = BigInt(raw).toString(2);
}
function hexToBin() {
  const raw = document.getElementById("hexInput").value.trim().toUpperCase();
  const out = document.getElementById("hexToBin");
  if (!/^[0-9A-F]+$/.test(raw)) { out.textContent = "—"; return; }
  out.textContent = raw.split("").map((c) =>
    parseInt(c, 16).toString(2).padStart(4, "0")
  ).join(" ").replace(/^0+(?=[01])/, "");
}
let quizAnswer = "";
let quizCorrect = 0;
let quizTotal = 0;
function newQuiz() {
  const bits = [8, 12, 16][Math.floor(Math.random() * 3)];
  let bin = "";
  for (let i = 0; i < bits; i++) {
    bin += i === 0 ? "1" : (Math.random() < 0.5 ? "0" : "1");
  }
  document.getElementById("quizBin").textContent = bin;
  quizAnswer = BigInt("0b" + bin).toString(16).toUpperCase();
  document.getElementById("quizAnswer").value = "";
  const fb = document.getElementById("quizFeedback");
  fb.textContent = "";
  fb.className = "quiz-feedback";
}
function checkQuiz() {
  const given = document.getElementById("quizAnswer").value.trim().toUpperCase();
  const fb = document.getElementById("quizFeedback");
  if (!given) { fb.textContent = "Type your answer first."; fb.className = "quiz-feedback bad"; return; }
  quizTotal++;
  if (given === quizAnswer) {
    quizCorrect++;
    fb.textContent = "Correct! " + quizAnswer + " is right.";
    fb.className = "quiz-feedback good";
  } else {
    fb.textContent = "Not quite — the answer is " + quizAnswer + ". Try the next one.";
    fb.className = "quiz-feedback bad";
  }
  document.getElementById("quizScore").textContent = quizCorrect + " / " + quizTotal;
}
const SAMPLES = [
  "10110110",
  "1011010111100101",
  "1100101110001111",
  "1001110010111010",
  "1111000010101010"
];
document.getElementById("binInput").addEventListener("input", convert);
document.getElementById("decInput").addEventListener("input", decToBin);
document.getElementById("hexInput").addEventListener("input", hexToBin);
document.getElementById("sampleBtn").addEventListener("click", () => {
  document.getElementById("binInput").value =
    SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
  convert();
});
document.getElementById("quizCheck").addEventListener("click", checkQuiz);
document.getElementById("quizAnswer").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkQuiz();
});
document.getElementById("quizNew").addEventListener("click", newQuiz);
convert();
newQuiz();
