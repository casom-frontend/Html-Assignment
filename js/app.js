
// ================== BOSSE VISDOM ==================//

// Hämtar element från HTML-sidan och sparar dem i variabler så att JavaScript kan styra dem.
const sniffSound = document.getElementById("sniffSound");   // ljudet som spelar när man klickar
const noseBtn = document.getElementById("noseBtn");         // "Nosa här!"-knappen
const bosseMessage = document.getElementById("bosseMessage"); // själva popup-rutan med visdom
const closeBosseMsg = document.getElementById("closeBosseMsg"); // X-knappen för att stänga rutan
const wisdomText = document.getElementById("wisdomText");   // texten där visdomsordet ska visas

// En lista med olika visdomsord. När användaren klickar slumpas ett av dem fram.
const bosseWisdoms = [
  "Ekorrar är luftburna terrorister. Min enda uppgift är att hålla dem på marken, där de hör hemma.",
  "Våga nosa på det okända – där gömmer sig godbitarna.",
  "Livet är enklare om man äter först och oroar sig sen.",
  "Jag lyssnar inte på order, jag tar emot förslag.",
  "Mina öron är inte bara mjuka, de är utformade för att svepa rent köksgolvet efter middagen.",
  "Min sanna talang är att se ut som att jag svälter, 5 minuter efter middagen.",
  "Alla problem känns mindre efter en bra kli bakom örat.",
  "Om du inte får uppmärksamhet… lägg dig mitt i vägen.",
  "Mattes skor är inte skor. De är min officiella luktdagbok.",
  "Allt blir bättre med ostbågar. Det är vetenskap."
];

// När man klickar på "Nosa här!"-knappen körs denna funktion.När användaren klickar på knappen, kör allt som ligger inuti klamrarna { }.
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
  // querySelector(".nose-tooltip") letar upp första elementet med den klassen
  const tooltip = document.querySelector(".nose-tooltip");

  // opacity = 0 gör elementet helt osynligt (transparent)
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

// Egna kategorier med fakta (ifall man inte använder API:N)
// localFacts är ett objekt med flera kategorier som innehåller listor (arrayer) av fakta.
const localFacts = {
  cocker: [
    "Cocker spaniels har otroligt uttrycksfulla ögon.",
    "Cockrar har ett av de vänligaste temperamenten bland sällskapshundar.",
    "De är extremt sociala och vill alltid vara nära sin familj.",
    "Rasen är känd för sina långa, mjuka öron som samlar dofter när de spårar.",
    "De viftar med hela kroppen när de blir glada, inte bara svansen.",
    "Cocker spaniels har ett starkt luktsinne och älskar nosarbete.",
    "Rasen är ofta matmotiverad och älskar godis – perfekt för träning."
  ],
  humor: [
    "Ekorrar? Nej tack, säger Bosse.",
    "Bosse har doktorerat i soffliggning.",
    "Bosse kan höra en ostbit falla på 30 meters avstånd."
  ]
};

// Lyssnar på när användaren väljer något i dropdown-menyn
// "change" betyder att funktionen körs varje gång användaren gör ett annat val.
factFilter.addEventListener("change", () => {

  const value = factFilter.value; // värdet från dropdown (api, cocker, Bosse)

  // Om användaren väljer "api" ska extern hundfakta hämtas
  if (value === "api") {

    // fetch hämtar data från internet.
    fetch("https://dogapi.dog/api/v2/facts")

      // När vi får ett svar måste vi först göra om det till JSON-format
      .then(res => res.json())

      // här får vi den färdiga JSON-datan från API:t som vi nu kan använda
      .then(data => {

      // plockar ut faktatexten från API-datan
        const fact = data.data[0].attributes.body;

        // visar faktan på sidan
        factText.textContent = fact;
      })

      .catch(() => {

        // Visas om API:t inte går att nå
        factText.textContent = "Kunde inte hämta fakta just nu.";
      });

    return; // stoppar funktionen här så resten inte körs
  }

  // Om användaren valde en av mina egna faktakategorier
  if (localFacts[value]) {

    // Slumpar en rad från rätt lista
    const randomFact =
      localFacts[value][Math.floor(Math.random() * localFacts[value].length)];

    factText.textContent = randomFact;
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

  // classList.add("open") lägger till klassen 'open'. I CSS gör denna klass att panelen glider in i bild.
  fpPanel.classList.add("open");
});

// När man klickar på X-knappen i panelen
fpClose.addEventListener("click", () => {

  // classList.remove("open") tar bort klassen 'open' så panelen stängs igen
  fpPanel.classList.remove("open");
});
