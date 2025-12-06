
// ================== BOSSE VISDOM ==================

const sniffSound = document.getElementById("sniffSound");
const noseBtn = document.getElementById("noseBtn");
const bosseMessage = document.getElementById("bosseMessage");

const bosseWisdoms = [
  "Om du inte hittar svaret… ta en tupplur.",
  "Våga nosa på det okända – där gömmer sig godbitarna.",
  "Livet är enklare om man äter först och oroar sig sen.",
  "Ingen dag är dålig om man börjar den med en promenad.",
  "Nosa långsamt, lev långsamt – stress är för katter.",
  "Var snäll. Och om du inte kan vara snäll, var fluffig.",
  "Alla problem känns mindre efter en bra kli bakom örat.",
  "Om du inte får uppmärksamhet… lägg dig mitt i vägen.",
  "Ta inte ansvar för ekorrar. De är hopplösa.",
  "Allt blir bättre med snacks. Det är vetenskap."
];

noseBtn.addEventListener("click", () => {
  sniffSound.currentTime = 0;
  sniffSound.play();

  const randomIndex = Math.floor(Math.random() * bosseWisdoms.length);
  bosseMessage.textContent = bosseWisdoms[randomIndex];

  bosseMessage.style.display = "block";
});


// ================== HUNDFAKTA (API + EGNA FAKTA) ==================

const factFilter = document.getElementById("factFilter");
const factText = document.getElementById("factText");

const localFacts = {
  cocker: [
    "Cocker spaniels har otroligt uttrycksfulla ögon.",
    "Bosse hävdar att han kan tre språk: Svenska, Godis & Kyckling.",
    "Cocker spaniels har mjuka öron – perfekta kuddar."
  ],
  humor: [
    "Ekorrar? Nej tack, säger Bosse.",
    "Bosse har doktorerat i soffliggning.",
    "Bosse kan höra en ostbit falla på 30 meters avstånd."
  ]
};

factFilter.addEventListener("change", () => {
  const value = factFilter.value;

  // API-fakta
  if (value === "api") {
    fetch("https://dog-api.kinduff.com/api/facts")
      .then(res => res.json())
      .then(data => factText.textContent = data.facts[0])
      .catch(() => factText.textContent = "Kunde inte hämta fakta 🐾");
  }

  // Egna kategorier
  else if (localFacts[value]) {
    const randomFact = localFacts[value][Math.floor(Math.random() * localFacts[value].length)];
    factText.textContent = randomFact;
  }

  // Default
  else {
    factText.textContent = "Välj en kategori för att se fakta 🐶";
  }
});
