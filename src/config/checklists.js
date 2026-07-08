export const CHECKLIST_CATEGORIES = {
  lagertechnik: {
    id: "lagertechnik",
    title: "Lagertechnik inkl. Schubmaststapler",
    description: "Komplette Geräteaufnahme",

    schema: {
      meta: {
        fields: [
          { id: "kunde", label: "Kunde" },
          { id: "Arbeitsauftrag", label: "Arbeitsauftrag"},
          { id: "hersteller",
            label: "Hersteller",
            type: "select",
            options: [
              "Linde",
              "Still",
              "Jungheinrich",
              "Yale",
              "Heli",
              "Hangcha"
            ]
          },
          
          {
            id: "typ",
            label: "Typ",
            type: "select",
            dependsOn: "hersteller",
            optionsByParent: {
          
              Linde: [
                // Niederhubwagen
                "T14",
                "T16",
                "T18",
                "T20",
                "T25",
                "MT15",
          
                // Hochhubwagen
                "L10",
                "L12",
                "L14",
                "L16",
                "L20",
          
                // Schubmaststapler
                "R10",
                "R14",
                "R16",
                "R20",
                "R25",
          
                // Kommissionierer
                "N20",
                "N20 XL",
                "V08",
                "V10",
          
                // Schmalgangstapler
                "K"
              ],
          
              Still: [
                // Niederhubwagen
                "EXU16",
                "EXU18",
                "EXU20",
                "EXU22",
                "EXH14",
                "EXH20",
                "EXH25",
          
                // Hochhubwagen
                "EXV10",
                "EXV12",
                "EXV14",
                "EXV16",
                "EXD18",
          
                // Schubmaststapler
                "FM-X10",
                "FM-X12",
                "FM-X14",
                "FM-X17",
                "FM-X20",
                "FM-X25",
          
                // Kommissionierer
                "OPX20",
                "OPX25",
                "OPX-L20",
          
                // Schmalgangstapler
                "MX-X"
              ],
          
              Jungheinrich: [
                // Niederhubwagen
                "EJE112",
                "EJE116",
                "EJE118",
                "EJE120",
                "EJE225",
          
                // Hochhubwagen
                "EJC110",
                "EJC112",
                "EJC214",
                "ERC212",
                "ERC214",
                "ERC216",
          
                // Schubmaststapler
                "ETM214",
                "ETV214",
                "ETV216",
                "ETV216i",
                "ETV318",
                "ETV320",
          
                // Kommissionierer
                "ECE220",
                "ECE225",
                "EKS110",
                "EKS215a",
          
                // Schmalgangstapler
                "EKX410",
                "EKX513"
              ],
          
              Yale: [
                "MP16",
                "MP18",
                "MP20",
                "MS10",
                "MS12",
                "MS16",
                "MR14",
                "MR16",
                "MR20",
                "MO20",
                "MO25"
              ],
          
              Heli: [
                "CBD15",
                "CBD20",
                "CBD25",
                "CDD12",
                "CDD16",
                "CDD20",
                "CQD16",
                "CQD20",
                "CQD25",
                "CSD16"
              ],
          
              Hangcha: [
                "CBD15",
                "CBD20",
                "CBD25",
                "CDD12",
                "CDD16",
                "CDD20",
                "CQD16",
                "CQD20",
                "CQD25",
                "A Series Reach Truck",
                "X Series Reach Truck"
              ]
          
            }
          },
        { id: "internnummer", label: "Internnummer", required: true },
        { id: "seriennummer", label: "Seriennummer"}
          
        ]
      },

      sections: [
        {
          title: "Sichtprüfung - Rahmen",
          items: [
            { label: "Fahrersitz" },
            { label: "Kabine & Scheibe" },
            { label: "Durchgreifschutz" },
            { label: "Aufkleber (Pieckert, aktuelle UVV, ...)", required: true },
            { label: "Typenschild", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Hydraulikpumpe",
          items: [
            { label: "Ölstand" },
            { label: "Motortypenschild", required: true },
            { label: "Motorseriennummer" }
          ]
        },

        {
          title: "Sichtprüfung - Bereifung",
          items: [
            { label: "Reifen" },
            { label: "Reifenart" },
            { label: "Reifengröße" },
            { label: "Stückzahl" }
          ]
        },

        {
          title: "Sichtprüfung - Hydraulik",
          items: [
            { label: "Hydraulikschläuche" }
          ]
        },

        {
          title: "Sichtprüfung - Mast",
          items: [
            { label: "Mastart" },
            { label: "Mastnummer", required: true },
            { label: "Gabelzinken" },
            {label: "Hubzylinder"}
          ]
        },

        {
          title: "Sichtprüfung - Reinigung",
          items: [
            { label: "Gerät sauber", required: true }
          ]
        },

        {
          title: "Funktionstest - Bremse",
          items: [
            { label: "Betriebsbremse", required: true },
            { label: "Feststellbremse" }
          ]
        },

        {
          title: "Funktionstest - Elektrik",
          items: [
            { label: "Zündschloss" },
            { label: "Hupe" },
            { label: "Beleuchtungsanlage"}
          ]
        },

        {
          title: "Funktionstest - Probefahrt",
          items: [
            { label: "Bremsen bei leichter Steigung" },
            { label: "Lenkung während Probefahrt" },
            { label: "Hub ohne Last" },
            { label: "Funktionstest", required: true }
          ]
        }
      ]
    }
},

verbrenner: {
  id: "verbrenner",
  title: "Verbrenner",
  description: "Diesel / Gas Stapler",

  schema: {
    
meta: {
  fields: [
    { id: "kunde", label: "Kunde" },
    { id: "Arbeitsauftrag", label: "Arbeitsauftrag"},
    {
      id: "hersteller",
      label: "Hersteller",
      type: "select",
      options: [
        "Linde",
        "Still",
        "Jungheinrich",
        "Yale",
        "Heli",
        "Hangcha",
        "Kalmar",
        "Bulmor"
      ]
    },

    {
      id: "typ",
      label: "Typ",
      type: "select",

          dependsOn: "hersteller",
          optionsByParent: {
        
            Linde: [
              "H14",
              "H16",
              "H18",
              "H20",
              "H20 EVO",
              "H25",
              "H25 EVO",
              "H30",
              "H30 EVO",
              "H35",
              "H35 EVO",
              "H40",
              "H45",
              "H50",
              "H60",
              "H70",
              "H80",
              "H100",
              "HT100",
              "HT120",
              "HT160"
            ],
        
            Still: [
              "R70-16",
              "R70-18",
              "R70-20",
              "R70-25",
              "R70-30",
              "R70-35",
              "R70-40",
              "R70-45",
              "RX70-16",
              "RX70-18",
              "RX70-20",
              "RX70-25",
              "RX70-30",
              "RX70-35",
              "RX70-40",
              "RX70-45",
              "RX70-50",
              "RX70-60",
              "RX70-70",
              "RX70-80"
            ],
        
            Jungheinrich: [
              "TFG316",
              "TFG320",
              "TFG425",
              "TFG430",
              "TFG435",
              "TFG540",
              "TFG545",
              "DFG316",
              "DFG320",
              "DFG425",
              "DFG430",
              "DFG435",
              "DFG540",
              "DFG545"
            ],
        
            Yale: [
              "GLP16",
              "GLP18",
              "GLP20",
              "GLP25",
              "GLP30",
              "GLP35",
              "GLP40",
              "GLP45",
              "GDP16",
              "GDP18",
              "GDP20",
              "GDP25",
              "GDP30",
              "GDP35",
              "GDP40",
              "GDP45"
            ],
        
            Heli: [
              "CPQD15",
              "CPQD18",
              "CPQD20",
              "CPQD25",
              "CPQD30",
              "CPQD35",
              "CPQD40",
              "CPQD50",
              "CPCD20",
              "CPCD25",
              "CPCD30",
              "CPCD35",
              "CPCD40",
              "CPCD50",
              "CPCD70",
            ],
        
            Hangcha: [
              "CPQD15",
              "CPQD18",
              "CPQD20",
              "CPQD25",
              "CPQD30",
              "CPQD35",
              "CPQD40",
              "CPQD50",
              "CPCD20",
              "CPCD25",
              "CPCD30",
              "CPCD35",
              "CPCD40",
              "CPCD50",
              "CPCD70",
            ],
        
            Kalmar: [
              "DCG50",
              "DCG60",
              "DCG70",
              "DCG80",
              "DCG90",
              "DCG100",
              "DCG120",
              "DCG160",
            ],
        
            Bulmor: [
              "DQ40",
              "DQ50",
              "DQ60",
              "DQ70",
              "DQ80",
              "DQ100",
            ]
        
          }
        },

      { id: "internnummer", label: "Internnummer", required: true },
      { id: "seriennummer", label: "Seriennummer"}
      ]
    },

      sections: [
        {
          title: "Sichtprüfung - Motor",
          items: [
            { label: "Motorhaube" },
            { label: "Ölstand" },
            { label: "Motortypenschild", required: true },
            { label: "Motorkennzeichen" },
            { label: "Motorseriennummer", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Rahmen",
          items: [
            { label: "Fahrersitz" },
            { label: "Kabine & Scheiben" },
            { label: "Aufkleber (Pieckert, aktuelle UVV, ...)", required: true },
            { label: "Typenschild", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Bereifung",
          items: [
            { label: "Reifen" },
            { label: "Reifenart" },
            { label: "Reifengröße" },
            { label: "Stückzahl" }
          ]
        },

        {
          title: "Sichtprüfung - Hydraulik",
          items: [
            { label: "Hydraulikschläuche" },
            { label: "Hydrauliktank" }
          ]
        },

        {
          title: "Sichtprüfung - Mast",
          items: [
            { label: "Mastart" },
            { label: "Mastnummer", required: true },
            { label: "Gabelzinken" }
          ]
        },

        {
          title: "Sichtprüfung - Reinigung",
          items: [
            { label: "Gerät sauber", required: true }
          ]
        },

        {
          title: "Funktionstest - Bremse",
          items: [
            { label: "Betriebsbremse", required: true },
            { label: "Feststellbremse" }
          ]
        },

        {
          title: "Funktionstest - Motorlauf",
          items: [
            { label: "Startverhalten" },
            { label: "Leerlauf" },
            { label: "Max. Geschwindigkeit" }            
          ]
        },

        {
          title: "Funktionstest - Elektrik",
          items: [
            { label: "Zündschloss" },
            { label: "Hupe" },
            { label: "Scheibenwischer" },
            { label: "Display- Datum % Uhrzeit einstellen", required: true },
            { label: "Servicecode", required: true },
            { label: "Beleuchtungsanlage", required: true }
          ]
        },


        {
          title: "Funktionstest - Probefahrt",
          items: [
            { label: "Bremsen bei leichter Steigung" },
            { label: "Lenkung während Probefahrt" },
            { label: "Hub ohne Last" },
            { label: "Funktionstest", required: true }
          ]
        }
      ]
    }
  },

  elektro: {
    id: "elektro",
    title: "Elektro",
    description: "Elektrostapler",
  
    schema: {
      meta: {
    fields: [
      { id: "kunde", label: "Kunde" },
      { id: "Arbeitsauftrag", label: "Arbeitsauftrag"},
      {
        id: "hersteller",
  label: "Hersteller",
  type: "select",
  options: [
    "Linde",
    "Still",
    "Jungheinrich",
    "Yale",
    "Heli",
    "Hangcha",
    "Kalmar",
    "Bulmor"
  ]
},

{
  id: "typ",
  label: "Typ",
  type: "select",
  dependsOn: "hersteller",
  optionsByParent: {

    Linde: [
      "E14",
      "E16",
      "E18",
      "E20",
      "E20P",
      "E25",
      "E30",
      "E35",
      "E40",
      "E45",
      "E50",
      "E60",
      "E70",
      "E80",
      "Xi10",
      "Xi14",
      "Xi16",
      "Xi20",
      "Xi25",
      "Xi35"
    ],

    Still: [
      "RX20-14",
      "RX20-16",
      "RX20-18",
      "RX20-20",
      "RX20-25",
      "RX20-30",
      "RX60-25",
      "RX60-30",
      "RX60-35",
      "RX60-40",
      "RX60-45",
      "RX60-50",
      "RX60-60",
      "RX60-70",
      "RX60-80"
    ],

    Jungheinrich: [
      "EFG213",
      "EFG216",
      "EFG218",
      "EFG220",
      "EFG316",
      "EFG318",
      "EFG320",
      "EFG425",
      "EFG430",
      "EFG435",
      "EFG540",
      "EFG545",
      "EFG550",
      "EFG560"
    ],

    Yale: [
      "ERP16",
      "ERP18",
      "ERP20",
      "ERP25",
      "ERP30",
      "ERP35",
      "ERP40",
      "ERP45",
      "ERP50",
      "ERP55",
      "ERP60",
      "ERP70",
      "ERP80",
    ],

    Heli: [
      "CPD15",
      "CPD18",
      "CPD20",
      "CPD25",
      "CPD30",
      "CPD35",
      "CPD40",
      "CPD45",
      "CPD50",
      "CPD60",
      "CPD70",
    ],

    Hangcha: [
      "CPD15",
      "CPD18",
      "CPD20",
      "CPD25",
      "CPD30",
      "CPD35",
      "CPD40",
      "CPD45",
      "CPD50",
      "CPD60",
    ],

    Kalmar: [
      "ECG50",
      "ECG70",
      "ECG90",
      "ECG100",
      "ECG120",
      "ECG140",
      "ECG160"
    ],

    Bulmor: [
      "EQ40",
      "EQ50",
      "EQ60",
      "EQ70",
      "EQ80"
    ]

  }
},
  
      { id: "internnummer", label: "Internnummer", required: true },
      { id: "seriennummer", label: "Seriennummer"}
    ]
  },

      sections: [
        {
          title: "Sichtprüfung - Batterie",
          items: [
            { label: "Batteriemaße", required: true },
            { label: "Batteriezustand" },
            { label: "Ladestecker" },
            { label: "Ladegerät" },
            { label: "Batterieleistung(Volt,Ah)"}
          ]
        },

        {
          title: "Sichtprüfung - Rahmen",
          items: [
            { label: "Kabel" },
            { label: "Steuerung" },
            { label: "Aufkleber (Pieckert, aktuelle UVV, ...)", required: true },
            { label: "Typenschild", required: true },
            {label: "Kabine & Scheiben"}
          ]
        },

        {
          title: "Sichtprüfung - Bereifung",
          items: [
            { label: "Reifen" },
            { label: "Reifenart" },
            { label: "Reifengröße" },
            { label: "Stückzahl" }
          ]
        },

        {
          title: "Sichtprüfung - Mast",
          items: [
            { label: "Mastart" },
            { label: "Mastnummer", required: true },
            { label: "Gabelzinken" }
          ]
        },

        {
          title: "Sichtprüfung - Reinigung",
          items: [
            { label: "Gerät sauber", required: true }
          ]
        },

        {
          title: "Funktionstest - Bremse",
          items: [
            { label: "Betriebsbremse", required: true },
            { label: "Feststellbremse" }
          ]
        },

        {
          title: "Funktionstest - Elektrik",
          items: [
            { label: "Zündschloss" },
            { label: "Hupe" },
            { label: "Scheibenwischer" },
            { label: "Display- Datum % Uhrzeit einstellen", required: true },
            { label: "Servicecode", required: true },
            { label: "Beleuchtungsanlage", required: true }
          ]
        },

        {
          title: "Funktionstest - Probefahrt",
          items: [
            { label: "Bremsen bei leichter Steigung" },
            { label: "Lenkung während Probefahrt" },
            { label: "Hub ohne Last" },
            { label: "Funktionstest", required: true }
          ]
        }
      ]
    }
  }
};
