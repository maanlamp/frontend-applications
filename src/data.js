module.exports = {
  "Intercept": [
    {label: "Intercept", weight: -7.36863}
  ],
  "Geslacht": [
    {label: "Man", weight: -0.12611},
    {label: "Vrouw", weight: 0.00001}
  ],
  "Ouders": [
    {label: "Herkomst ouders", items: [
      {label: "Onbekend", weight: 0.00000},
      {label: "Beide ouders Nederlands", weight: -0.00001},
      {label: "Beide ouders niet Nederlands", weight: 0.16972},
      {label: "Een van de ouders Nederlands en de andere niet Nederlands", weight: -0.08943, good: true}
    ]},
    {label: "Relatie ouders", items: [
      {label: "Onbekend", weight: 0.00000},
      {label: "Ouders samen", weight: -0.00001, good: true},
      {label: "Gescheiden ouders", weight: 0.27683}
    ]},
    {label: "Werk vader", items: [
      {label: "Onbekend", weight: 0.23486},
      {label: "Werkend", weight: -0.23486},
      {label: "Geen werk en niet actief", weight: 0.33772}
    ]},
    {label: "Werk moeder", items: [
      {label: "Onbekend", weight: -0.95012},
      {label: "Werkend", weight: -0.01012},
      {label: "Geen werk en niet actief", weight: 0.36958}
    ]},
    {label: "Hoogst behaalde diploma vader", items: [
      {label: "Onbekend", weight: 0.88464},
      {label: "Vader vmbo b/k, mbo 1 en mbo 2", weight: -0.21630, good: true},
      {label: "Vader vmbo g/t, mbo 2 en mbo 3", weight: 0.67119},
      {label: "Vader vwo, Wo bachelor en Wo master", weight: -12.08995, good: true}
    ]},
    {label: "Hoogst behaalde diploma moeder", items: [
      {label: "Onbekend", weight: 0.03655},
      {label: "Moeder vmbo b/k, mbo 1 en mbo 2", weight: 0.15936},
      {label: "Moeder vmbo g/t, mbo 2 en mbo 3", weight: 0.03334},
      {label: "Moeder vwo, Wo bachelor en Wo master", weight: -13.03162, good: true}
    ]},
    {label: "Leeftijd moeder", items: [
      {label: "Onbekend", weight: 0.00000},
      {label: "Jonger dan 20 jaar", weight: 0.45150},
      {label: "20 tot 25 jaar", weight: 0.10852},
      {label: "25 tot 30 jaar", weight: -0.08841, good: true},
      {label: "35 tot 40 jaar", weight: 0.23988},
      {label: "40 jaar en ouder", weight: -0.11153, good: true},
    ]},
    {label: "Leeftijd vader", items: [
      {label: "Onbekend", weight: 0.00000},
      {label: "Jonger dan 25 jaar", weight: -0.00587, good: true},
      {label: "25 tot 30 jaar", weight: 0.03107},
      {label: "35 tot 40 jaar", weight: -0.21624, good: true},
      {label: "40 jaar of ouder", weight: -0.32645, good: true},
    ]},
    {label: "Verschil leeftijd ouders meer dan 5 jaar", weight: 0.28581},
    {label: "Vader of moeder verdacht", weight: 0.50027}
  ],
  "Onderwijs": [
    {label: "Soort onderwijs", items: [
      {label: "Onbekend", weight: -0.76957},
      {label: "Niet-regulier onderwijs", weight: -0.33031, good: true}
    ]},
    {label: "Voortijdig schoolverlaten", items: [
      {label: "Onbekend", weight: 0.80564},
      {label: "Voortijdig schoolverlaten", weight: 0.34684},
      {label: "Uit onderwijs met startkwalificatie", weight: -13.64193, good: true},
      {label: "Niet van toepassing", weight: 0.38736}
    ]}
  ],
  "Woning en huishouden": [
    {label: "Type woning", items: [
      {label: "Onbekend", weight: 2.40126},
      {label: "Huurwoning zonder huurtoeslag", weight: 0.40420},
      {label: "Huurwoning met huurtoeslag", weight: 0.38401}
    ]},
    {label: "Type huishouden", items: [
      {label: "Onbekend", weight: -13.81002},
      {label: "Overig huishouden", weight: 0.91365},
      {label: "Niet-gehuwd paar zonder kinderen", weight: -14.15530, good: true},
      {label: "Niet-gehuwd paar met kinderen", weight: 0.32694},
      {label: "Institutioneel huishouden", weight: 1.92321},
      {label: "Gehuwd paar zonder kinderen", weight: 1.06108},
      {label: "Eenouder-huishouden", weight: 0.49608},
      {label: "Eenpersoons huishouden", weight: 1.71859}
    ]}
  ],
  "Traject vooraf": [
    {label: "Jeugdhulp zonder verblijf gehad", weight: 1.52774}
  ],
  "Delicten": [
    {label: "Slachtoffer", weight: 0.23639},
    {label: "Kind verdacht", weight: 0.94738},
    {label: "Halt delict", weight: 0.36448}
  ],
  "Onderwijs": [
    {label: "Verandering onderwijs niveau", items: [
      {label: "Onbekend", weight: -1.11682},
      {label: "Geen verandering", weight: -1.11682},
      {label: "Afschalen", weight: 0.58732}
    ]},
    {label: "Actueel onderwijsniveau", items: [
      {label: "Onbekend", weight: 0.00000},
      {label: "Basisonderwijs", weight: 0.25232},
      {label: "Vmbo b/k, mbo 1 en mbo 2", weight: 0.87842},
      {label: "Vmbo g/t, mbo 3 en mbo 4", weight: 0.56882},
      {label: "Vwo en Wo bachelor", weight: -0.83566, good: true}
    ]}
  ]
};