
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

// ================= HUNDFAKTA: API + EGNA LISTOR =================

// Egna fakta-kategorier
const localFacts = {
  cocker: [
    "Cocker spaniels är kända för sina otroligt uttrycksfulla ögon.",
    "Bosse hävdar att han kan tre språk: Svenska, Godis och Kyckling.",
    "Cocker spaniels har mjuka öron som fungerar som naturliga huvudkuddar."
  ],
  humor: [
    "Bosse tror att ekorrar är organiserade småbrottslingar.",
    "Bosse har doktorerat i soffliggning och snacksstudier.",
    "Bosse kan höra en ostbit falla i köket – även i sömnen."
  ]
};

const factFilter = document.getElementById("factFilter");
const factText = document.getElementById("factText");

factFilter.addEventListener("change", () => {
  const value = factFilter.value;

  // Fetch från öppet API (ingen nyckel!)
  if (value === "api") {
    fetch("https://dog-api.kinduff.com/api/facts")
      .then(res => res.json())
      .then(data => {
        factText.textContent = data.facts[0];
      })
      .catch(() => {
        factText.textContent = "Kunde inte hämta fakta just nu 🐾";
      });
  }

  // Lokala kategorier
  else if (localFacts[value]) {
    const facts = localFacts[value];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factText.textContent = randomFact;
  }

  // Startläge
  else {
    factText.textContent = "Välj en kategori för att se fakta 🐶";
  }
});
