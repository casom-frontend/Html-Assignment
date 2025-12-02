
const sniffSound = document.getElementById("sniffSound");
const wisdomOutput = document.getElementById("wisdomOutput");

const bosseWisdoms = [
  "Om du inte hittar svaret… ta en tupplur.",
  "Våga nosa på det okända – där gömmer sig godbitarna.",
  "Livet är enklare om man äter först och oroar sig sen.",
  "Ingen dag är dålig om man börjar den med en promenad.",
  "Nosa långsamt, lev långsamt – stress är för katter.",
  "Var snäll. Och om du inte kan vara snäll, var fluffig.",
  "Alla problem känns mindre efter en bra kli bakom örat.",
  "Vissa dörrar är stängda för en anledning. Testa köket istället.",
  "Om du inte får uppmärksamhet… lägg dig mitt i vägen.",
  "Ska det fixas? Ta en boll och tänk på det sen."
];

document.getElementById("noseBtn").addEventListener("click", function() {
  // Sniff-ljud
  sniffSound.currentTime = 0;
  sniffSound.play();

  // Slumpa citat
  const randomIndex = Math.floor(Math.random() * bosseWisdoms.length);
  wisdomOutput.textContent = bosseWisdoms[randomIndex];
});
