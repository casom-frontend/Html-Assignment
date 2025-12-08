
// ================== BOSSE VISDOM ==================//

// Hämtar element från HTML-sidan och sparar dem i variabler
// så att JavaScript kan styra dem.
const sniffSound = document.getElementById("sniffSound");   // ljudet som spelar när man klickar
const noseBtn = document.getElementById("noseBtn");         // "Nosa här!"-knappen
const bosseMessage = document.getElementById("bosseMessage"); // själva popup-rutan med visdom
const closeBosseMsg = document.getElementById("closeBosseMsg"); // X-knappen för att stänga rutan
const wisdomText = document.getElementById("wisdomText");   // texten där visdomsordet ska visas

// En lista (array) med olika visdomsord.
// När användaren klickar slumpas ett av dem fram.
const bosseWisdoms = [
  "Ekorrar är luftburna terrorister. Min enda uppgift är att hålla dem på marken, där de hör hemma.",
  "Våga nosa på det okända – där gömmer sig godbitarna.",
  "Livet är enklare om man äter först och oroar sig sen.",
  "Ingen dag är dålig om man börjar den med en promenad.",
  "Mina öron är inte bara mjuka, de är utformade för att svepa rent köksgolvet efter middagen.",
  "Var snäll. Och om du inte kan vara snäll, var fluffig.",
  "Alla problem känns mindre efter en bra kli bakom örat.",
  "Om du inte får uppmärksamhet… lägg dig mitt i vägen.",
  "Ta inte ansvar för ekorrar. De är hopplösa.",
  "Allt blir bättre med ostbågar. Det är vetenskap."
];

// När man klickar på "Nosa här!"-knappen körs denna funktion.
noseBtn.addEventListener("click", () => {

  // Startar sniff-ljudet från början och spelar det
  sniffSound.currentTime = 0;
  sniffSound.play();

  // Slumpar ett visdomsord från listan ovan
  const randomIndex = Math.floor(Math.random() * bosseWisdoms.length);
  wisdomText.textContent = bosseWisdoms[randomIndex];

  // Visar popup-rutan med visdomsord
  bosseMessage.style.display = "block";

  // Ändrar knappens text och färg efter att man klickat
  noseBtn.textContent = "Nosa igen!";
  noseBtn.style.backgroundColor = "#2f6f6f";

  // När man klickar på knappen ska tooltipen försvinna
  const tooltip = document.querySelector(".nose-tooltip");
  tooltip.style.opacity = 0;
});

// När man klickar på X i popup-rutan stängs den
closeBosseMsg.addEventListener("click", () => {
  bosseMessage.style.display = "none";

  // Knappen återgår till ursprungligt läge
  noseBtn.textContent = "Nosa här!";
  noseBtn.style.backgroundColor = "darkslategrey";
});


// ================== HUNDFAKTA (API + EGNA FAKTA) ==================//

// Hämtar elementen för faktatyp och faktatext
const factFilter = document.getElementById("factFilter");  // dropdown-menyn
const factText = document.getElementById("factOutput");    // textfältet där fakta visas

// Egna kategorier med fakta (ifall man inte använder API)
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

// Lyssnar på när användaren väljer något i dropdown-menyn
factFilter.addEventListener("change", () => {
  const value = factFilter.value; // värdet från dropdown (api, cocker, humor)

  // Om användaren väljer "api" ska extern hundfakta hämtas
  if (value === "api") {
    fetch("https://dogapi.dog/api/v2/facts")  // hämtar data från API
      .then(res => res.json())                // gör om svaret till JSON
      .then(data => {
        // plockar ut första faktan från API-svaret
        const fact = data.data[0].attributes.body;
        factText.textContent = fact;  // visar faktan på sidan
      })
      .catch(() => {
        // om något går fel
        factText.textContent = "Kunde inte hämta fakta just nu 🐾";
      });
    return; // stoppar funktionen här
  }

  // Om användaren valde en av våra egna faktakategorier
  if (localFacts[value]) {
    const randomFact =
      localFacts[value][Math.floor(Math.random() * localFacts[value].length)];

    factText.textContent = randomFact; // visningsfaktan
    return;
  }

  // Om inget är valt
  factText.textContent = "Välj en kategori för att se fakta";
});


// ========== SIDOPANEL FÖR BOSSES VÄNNER ==========

// Hämtar elementen i sidopanelen
const fpToggle = document.querySelector(".friendpanel-toggle"); // knappen som öppnar panelen
const fpPanel = document.querySelector(".friendpanel");         // själva sidopanelen
const fpClose = document.querySelector(".friendpanel-close");   // X-knappen för att stänga panelen

// När man klickar på öppna-panel-knappen
fpToggle.addEventListener("click", () => {
  fpPanel.classList.add("open"); // lägger till klassen "open" som visar panelen
});

// När man klickar på X-knappen i panelen
fpClose.addEventListener("click", () => {
  fpPanel.classList.remove("open"); // tar bort klassen "open" → panelen stängs
});
