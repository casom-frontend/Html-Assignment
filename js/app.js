
// ================== BOSSE VISDOM ==================//

const sniffSound = document.getElementById("sniffSound");
const noseBtn = document.getElementById("noseBtn");
const bosseMessage = document.getElementById("bosseMessage");
const closeBosseMsg = document.getElementById("closeBosseMsg");
const wisdomText = document.getElementById("wisdomText");

// VISDOMSLISTA
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

// KLICK PÅ "NOSA HÄR!"
noseBtn.addEventListener("click", () => {

  // spela sniff-ljud
  sniffSound.currentTime = 0;
  sniffSound.play();

  // slumpa visdom
  const randomIndex = Math.floor(Math.random() * bosseWisdoms.length);
  wisdomText.textContent = bosseWisdoms[randomIndex];

  // visa rutan
  bosseMessage.style.display = "block";

  // ändra knappens stil och text
  noseBtn.textContent = "Nosa igen!";
  noseBtn.style.backgroundColor = "#2f6f6f";

  // göm tooltip direkt vid klick
  const tooltip = document.querySelector(".nose-tooltip");
  tooltip.style.opacity = 0;
});

//  KLICK PÅ X (STÄNG RUTA)
closeBosseMsg.addEventListener("click", () => {
  bosseMessage.style.display = "none";

  // återställ knapp
  noseBtn.textContent = "Nosa här!";
  noseBtn.style.backgroundColor = "darkslategrey";
});


// ================== HUNDFAKTA (API + EGNA FAKTA) ==================//

const factFilter = document.getElementById("factFilter");
const factText = document.getElementById("factOutput");

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

  // EXTERNT API (hundfakta)
  if (value === "api") {
    fetch("https://dogapi.dog/api/v2/facts")
      .then(res => res.json())
      .then(data => {
        const fact = data.data[0].attributes.body;
        factText.textContent = fact;
      })
      .catch(() => {
        factText.textContent = "Kunde inte hämta fakta just nu 🐾";
      });
    return;
  }

  // EGNA FAKTA
  if (localFacts[value]) {
    const randomFact =
      localFacts[value][Math.floor(Math.random() * localFacts[value].length)];
    factText.textContent = randomFact;
    return;
  }

  // DEFAULT
  factText.textContent = "Välj en kategori för att se fakta";
});

// ========== SIDOPANEL FÖR BOSSES VÄNNER ==========
const fpToggle = document.querySelector(".friendpanel-toggle");
const fpPanel = document.querySelector(".friendpanel");
const fpClose = document.querySelector(".friendpanel-close");

// Öppna panel
fpToggle.addEventListener("click", () => {
  fpPanel.classList.add("open");
});

// Stäng panel
fpClose.addEventListener("click", () => {
  fpPanel.classList.remove("open");
});
