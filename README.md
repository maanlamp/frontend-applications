# Jeugdzorgrisicotaxatie-app

## Setup
Om deze gekke repo tot leven te wekken moet je 'm eerst downloaden.

Daarna typ je lekker in je command line
```shell
npm i
```
om alle dependencies te downloaden.

Vervolgens typ je
```shell
npm run build
```
en alles wordt voor je gedaan.

Helaas werkt het `move:images` script niet, geen idee waarom, dus moet je die helaas nog zelf uit `src` naar `dist` kopiëren.

## Demo
[Bekijk de app hier al werkend, zonder moeite!](https://blissful-keller-e69e88.netlify.com/)

## Devlog

### Dag 1 (8 oktober)
Vandaag was niet echt productief. Lekker een biertje gedaan met medestudenten. Wel leuk! :beer:

### Dag 2 (9 oktober)
Vandaag kwam Arjan langs om ons zijn idee en product te laten zien. Aan ons de taak om dat in elkaar te zetten.

Ook moesten we vandaag onze top 3 frameworks kiezen.
Ik heb gekozen voor
1. MithrilJS
2. VueJS
3. ChooJS

**(Edit note)** Terugkijkend had ik misschien nog MarkoJS willen invullen. In ieder geval had ik geen Choo erbij moeten zetten :sweat_smile:.

### Dag 3 (10 oktober)
Vandaag begon ik met Choo js. Ik had Choo in mijn top 3 gezet omdat het een van de kleinste, al de niet hét kleinste framework was dat werd aangeboden. Een van de _selling points_ was dat het even makkelijk te verwijderen was als dat het in te zetten was.

Het inzetten bleek echter wat moeilijk, omdat ik niet direct een script kon importeren in de HTML, maar ik moest gelijk CommonJS gebruiken voor requiring, en gelijk met Browserify aan de gang.

Ik had tot nu toe nooit Browserify gebruikt, dus dat was een gave verassing. Het bleek zo nuttig dat ik het wel vaker ga gebruiken in persoonlijke projecten.

Ik heb na veel geploeter Choo aan de praat gekregen met een build script via NPM.

### Dag 4 (11 oktober)
Vandaag heb ik me ingelezen in de components van Choo. Wat bleek was dat Choo eigenlijk een beetje tegen je aan het liegen is.

Ze zeggen wel dat het een mega kleine library is (en dat is het ook), maar als je er fatsoenlijk mee wil werken moet je andere dingen requiren, die technisch gezien geen onderdeel van Choo zijn. Dingen zoals nanohtml of nanocomponents. Toch niet zo heel klein dus.

Maar goed, daar kwam ik achter door even in de source van Choo te kijken (de docs van choo zijn echt ruk, niet overzichtelijk) en vervolgens de docs van nanohtml en nanocomponents te lezen.

Ze heb ik geleerd hoe ChooJS het renderen van componenten en html verwerkt, en op die manier heb ik mijn eigen componenten kunnen schrijven.

Door mijn achtergrond in game design bleek het erg makkelijk en herkenbaar om een component te maken met es6 classes, en de manier hoe elementen updaten werkte was ook erg intuitief.

Ik heb vandaag het grootste deel van mijn componenten gebouwd en geïmplementeerd. Het laten werken van deze componenten doe ik later.

### Dag 5 (12 oktober)
Vandaag ben ik de hele dag lekker aan de slag gegaan met CSS. Het enige dat ik heb geleerd is dat closing en opening containers vervelend zijn, en je er niet aan moet beginnen. Ik heb met `max-height` moeten werken, die ik met JavaScript dynamisch aanpas. Totale overkill.

Daarnaast kun je nog steeds door alle elementen heen tabben. Ik denk dat ik dat kan fixen door met JavaScript de `tabindex` attribute op `"0"` te zetten, maar dat is voor mij nu niet belangrijk.

### Dag 6 (15 oktober)
De dag begon met het gesprek met twee dames uit de zorg. Al met al was dat gesprek interessant omdat het een kijkje gaf in de wereld van de zorg, maar voor mijn app heb ik daar niks aan gehad. Aan het einde van het gesprek kreeg ik ruimte om wat vragen te stellen die voor mij nuttig waren, waardoor ik een nieuw idee had gekregen: het bijhouden van de meest invloedrijke factoren, zowel goed als slecht.

Vandaag heb ik de "Denk-hetjes" geïmplementeerd. Denk-hetjes zijn items in een lijst die aangeven dat je op een bepaalde vraag "Denk het wel" of "Denk het niet" hebt ingevuld. Ik wilde namelijk een makkelijke manier bieden voor zorgverleners om snel in te kunnen grijpen als hun intuïtie ze dat vertelt. Door ergens "Denk het wel" of "Denk het niet" op te antwoorden wordt het antwoord als ja of nee respectievelijk meegeteld, en zal het dus de risicofactor aanpassen. Daarbij wordt de vraag dus ook toegevoegd in een overzicht, zodat je er altijd aan herinnerd wordt dat je die vraag altijd moet proberen objectief in te vullen.

### Dag 7 (16 oktober)
Vandaag ben ik aan de slag gegaan met het implementeren van de 3 beste en slechtste factoren in de vragenlijst. Het werkt niet 100%, maar het werkt goed genoeg voor een concept.

Hier is een voorproefje:
```js
function getBestFrom (input) {
  return input.filter(item => Number(item.weight) <= 0 && item.value === "Ja")
    .concat(
      input.filter(item => Number(item.weight) >= 0 && item.value === "Nee")
    )
    .sort((a, b) => Math.abs(Number(a.weight)) > Math.abs(Number(b.weight)) ? 1 : -1)
    .slice(0, 3);
}
```

Ik verzamel alle items met negatieve factoren (dus die de kans op uithuisplaatsing verminderen) waarop positief geantwoord is, en die voeg ik samen met alle items met positieve factoren (die dus de kans op uithuisplaatsing verhogen).

Deze lijst sorteer ik vervolgens zodat de volgorde in de array beste naar minst goede factoren gaan, en daarvan pak ik de beste 3.

Voor de slechtste items doe ik ongeveer hetzelfde, maar dan andersom!

### Dag 8 (17 oktober)
Vandaag begon met het werkend krijgen van de formule die Arjan in zijn R-code had geïmplementeerd. Dit was niet heel veel moeite, maar ik weet vrij zeker dat het niet goed werkt :sweat_smile: (omdat ik niet alle factoren heb).

Vervolgens besloot ik het mezelf moeilijk te maken en heb ik een radial progress bar gemaakt met de `canvas` API. Daar had ik al ervaring mee dus het moeilijkste was om te zorgen dat de canvas updatete zodra een `render` event werd ge-`emit`.

Verder heb ik de laatste puntjes op de i gezet wat betrof de CSS.

### Dag 9 (18 oktober)
Één van de features die ik graag wilde implementeren als ik daar aan het eind nog tijd voor had was een zoekfunctie om het extra makkelijk te maken om de vragenlijst in te vullen.

De implementatie was niet erg speciaal: zoek door de `innerText` van alle items, en kijk of de value van de zoekbalk daar in zit. Zo ja: open dat element en scroll het in de window. Simpel!

Ook heb ik geprobeerd om mijn state op te slaan in localStorage (ook gekeken naar sessionStorage). Het opslaan en laden van die data werkte, maar het renderen van die data werkte alsmaar niet, omdat mijn code een beetje spaghetti aan het worden was. Veel van de logica die andere frameworks voor je doen, moet je zelf regelen bij ChooJS, dus ik kon mijn weg niet meer vinden in de code die ik een week lang aan het schrijven was (ondanks mijn vele moeite om te zorgen dat dat niet zou gebeuren). Vandaar dat ik dus mijn slechte implementatie van opslaan en laden heb besloten te laten vallen.

Verder heb ik de laatste build tools geconfigureerd zoals PostCSS (wat vet handig blijkt, dank voor de tip!).