
// Hämta elementen
const sniffSound = document.getElementById("sniffSound");
const noseBtn = document.getElementById("noseBtn");
const wisdomBubble = document.getElementById("wisdomBubble");
const bubbleText = document.getElementById("bubbleText");
const closeBubble = document.getElementById("closeBubble");

// Lista med citat
const bosseWisdoms = [
  "Om du inte hittar svaret… ta en tupplur.",
  "Våga nosa på det okända – där gömmer sig godbitarna.",
  "Livet är enklare om man äter först och oroar sig sen.",
  "Ingen dag är dålig om man börjar den med en promenad.",
  "Nosa långsamt, lev långsamt – stress är för katter.",
  "Var snäll. Och om du inte kan vara snäll, var fluffig.",
  "Alla problem känns mindre efter en bra kli bakom örat.",
  "Vissa dörrar är stängda av en anledning. Testa köket istället.",
  "Om du inte får uppmärksamhet… lägg dig mitt i vägen.",
  "Ska det fixas? Ta en boll och tänk på det sen."
];

// När man klickar på knappen
noseBtn.addEventListener("click", () => {

  sniffSound.currentTime = 0;
  sniffSound.play();

  // Slumpa citat och visa det i popupen
  const randomIndex = Math.floor(Math.random() * bosseWisdoms.length);
  bubbleText.textContent = bosseWisdoms[randomIndex];

  // Visa popupen
  wisdomBubble.classList.add("open");

  // Ändra knappens text
  noseBtn.textContent = "Sniffa vidare!";
});

// När popupen stängs
closeBubble.addEventListener("click", () => {
  wisdomBubble.classList.remove("open");
  noseBtn.textContent = "Nosa här!";
});
