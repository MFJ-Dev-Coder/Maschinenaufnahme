export const CHECKLIST_CATEGORIES = {
  lagertechnik: {
    id: "lagertechnik",
    title: "Lagertechnik inkl. Schubmaststapler",
    description: "Geräteaufnahme von Niederhubwagen, Hochhubwagen, Kommissionierern, Schubmaststaplern und weiterer Lagertechnik. Alle relevanten Baugruppen, Batterie-, Mast- und Zustandsdaten erfassen.",

    schema: {
      meta: {
        fields: [
          { id: "kunde", label: "Kunde" },
          { id: "arbeitsauftrag", label: "Arbeitsauftrag"},
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
            //   Niederhubwagen
                "MT12",
                "MT15",
                "T14",
                "T16",
                "T18",
                "T20",
                "T20AP",
                "T20SP",
                "T20SF",
                "T20SR",
                "T20R",
                "T25",
                "T30",
                "T33",
                "T50",

             //   Doppelstock-Niederhubwagen
                "D06",
                "D08",
                "D10",
                "D12",
                "D12HP",
                "D14",
                "D14AP",
                "D14HP",

           //     Hochhubwagen
                "L10",
                "L10B",
                "L12",
                "L12B",
                "L14",
                "L14AP",
                "L14C",
                "L16",
                "L16AP",
                "L16AC",
                "L20",
                "L20AP",

               // Schubmaststapler
                "R10",
                "R12",
                "R14",
                "R16",
                "R17",
                "R20",
                "R20HD",
                "R25",
                "R14X",
                "R20G",
                "R25G",
                
             //   Kommissionierer
                "N20",
                "N20B",
                "N20HP",
                "N20D",
                "N20DHP",
                "N20XL",
                "N20L",
                "N20LoL",
                "N16Li",

               // Schmalgangstapler (VNA)
                "K",
                "K-M",
                "K-L",
                "V10",
                "V12"
              ],
          
              Still: [
               //Niederhubwagen
                "EXH14C",
                "EXH16",
                "EXH16C",
                "EXH20",
                "EXH20C",
                "EXH25",
                "EXH30",
                "EXH-L16",
                "EXH-L20",
                "EXH-S20",
                "EXH-S25",
                "EXH-SF16C",
                "EXH-SF20",
                "EXH-SF20C",
                "EXH-SF25",
                "FXH20",
                "FXH20N",
                "FXH25",
                "FXH25N",
                "FXH33",

               // Doppelstock-Niederhubwagen
                "EXD18",
                "EXD18C",
                "EXD20",
                "EXD20C",
                "SXD20",

                //Hochhubwagen
                "EXV10C",
                "EXV12C",
                "EXV14",
                "EXV14i",
                "EXV16",
                "EXV16C",
                "EXV16i",
                "EXV20",
                "EXV20i",
                "EXV-SF14",
                "EXV-SF16",
                "EXV-SF20",
                "EXV-CB10",
                "EXV-CB12",
                "EXV-CB14",
                "EXV-CB16",
                "SXV-CB10",
                "SXV-CB12",
                "SXV-CB14",
                "SXV-CB16",

                //Schubmaststapler
                "FM-X10",
                "FM-X10N",
                "FM-X12",
                "FM-X12N",
                "FM-X14",
                "FM-X14N",
                "FM-X17",
                "FM-X17N",
                "FM-X20",
                "FM-X20N",
                "FM-XSE14",
                "FM-XSE20",
                "FM-4W20",
                "FM-4W25",
                "FXV14",
                "FXV16",
                "FXV16N",

               // Kommissionierer
                "OPX20Plus",
                "OPX25",
                "OPX25Plus",
                "OPX-L12",
                "OPX-L16",
                "OPX-L20",
                "OPX-L20S",
                "OPX-D20",
                "OXV07",
                "OXV08",
                "OXV10",

                //Schmalgangstapler (VNA)
                "MX-X",
                "NXV",
                "PXV",
                "PXV-M",
                "EK-X10",

              ],
          
              Jungheinrich: [
                // Niederhubwagen
                "AME15",
                "AME20",
                "EJE114",
                "EJE116",
                "EJE118",
                "EJE120",
                "EJE222",
                "EJE225",
                "EJE230",
                "EJE235",
                "EJEC20",
                "EJEC20i",

                //Doppelstock-Niederhubwagen
                "EJD118i",
                "EJD120",
                "EJD120i",
                "EJD220",
                "EJD222",
                "ECD320",

               // Hochhubwagen
                "EJC112i",
                "EJC110zi",
                "EJC112zi",
                "EJC212",
                "EJC214",
                "EJC216",
                "EJC220",
                "EJC212z",
                "EJC214z",
                "EJC216z",
                "EJC220z",

              //  Schubmaststapler
                "ETM214",
                "ETM216",
                "ETV214i",
                "ETV216i",
                "ETV214",
                "ETV216",
                "ETV214i",
                "ETV216i",
                "ETV318",
                "ETV320",
                "ETV325",
                "ETV314i",
                "ETV316i",
                "ETV320i",
                "ETV325i",
                "ETVC16",
                "ETVC20",
                "ETVQ20",
                "ETVQ25",

            //    Kommissionierer
                "ECE220",
                "ECE225",
                "ECE227",
                "ECE230",
                "ECE310",
                "ECE320",
                "EKS110",
                "EKS210",
                "EKS310",
                "EKS310s",
                "EKS412",
                "EKS412s",
                "EKM202",

          //      Schmalgangstapler (VNA)
                "EKX410",
                "EKX412",
                "EKX514",
                "EKX516",
                "EFX411",
                "EFX414"

              ],
          
              Yale: [
                "MPC14",
                "MPC15",
                "MP16",
                "MP18",
                "MP20",
                "MP22",
                "MP25",
                "MP30",
                "MP20DL",
                "MP20XUX",
                "MP20T",
                "MP25T",
                "MP20X",
                "MP30X",
                "MP25HD",
                "MP30HD",
                "MSC10",
                "MS10E",
                "MS12E",
                "MS10",
                "MS12",
                "MS14",
                "MS16",
                "MS20",
                "MS12X",
                "MS14XIL",
                "MS12XIL",
                "MS15X",
                "MS16IL",
                "MS16SL",
                "MC10",
                "MC12",
                "MC15",
                "MR10",
                "MR12",
                "MR14",
                "MR16",
                "MR20",
                "MRO16",
                "MRO20",
                "MO10E",
                "MO20",
                "MO20S",
                "MO20F",
                "MO25",
                "MO25P",
                "MO25T",
                "MO50T",
                "MT70",
                "MT80",
                "MTC10",
                "MTC13",
                "MTC15"

              ],
          
              Heli: [
             //  Niederhubwagen
                "CBD15-18-20J-LI-S",
                "CBD15-18-20J-LI3",
                "CBD15-20-A-BLIH",
                "CBD16/20-C2LiH",
                "CBD20-25J-R",
                "CBD20-A2SZLIH",
                "CBD20/25-491",
                "CBD20/25/30-URD",
                "CBD20J-H",

                //Hochhubwagen
                "CDD10-12RD-S",
                "CDD12-15J-LI",
                "CDD12JD",
                "CDD15-20J-S",
                "CDD15-ZSM",
                "CDD16-950",
                "CDD16/20-A2LIH",
                "CDD20J-LI",
                "CDD20R",

                //Schubmaststapler
                "CQD14",
                "CQD16",
                "G2 Reach",

                //Kommissionierer
                "OPSM"

              ],
          
              Hangcha: [
               // Niederhubwagen
                "CBD15-WS",
                "CBD15-A3MC2-I",


              //  Hochhubwagen
                "CDD12",
                "CDD14",
                "CDD16",
                "CDD20"
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
            { label: "Fahrersitz", required: true },
            { label: "Kabine & Scheibe", required: true },
            { label: "Durchgreifschutz", required: true },
            { label: "Aufkleber (Pieckert, aktuelle UVV, ...)", required: true },
            { label: "Typenschild", required: true }
          ]
        },

                {
          title: "Sichtprüfung - Batterie",
          items: [
            { label: "Batteriemaße", measurements: ["Länge", "Breite", "Höhe"], required: true },
            { label: "Batteriezustand", required: true },
            { label: "Ladestecker", measurements: ["Typ, Größe"], required: true },
            { label: "Ladegerät", measurements: ["Leistung", "Seriennummer"], required: true },
            { label: "Batterieleistung", measurements: ["Volt", "Ah"], required: true },
            { label: "Aquamatic", required: true },
            { label: "EUW", required: true }
          ]
        },
        
        {
          title: "Sichtprüfung - Hydraulikpumpe",
          items: [
            { label: "Ölstand", required: true },
            { label: "Motortypenschild", required: true },
            { label: "Motorseriennummer", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Bereifung",
          items: [
            { label: "Reifen", required: true },
            { label: "Reifenart", required: true },
            { label: "Reifengröße", measurements: ["VA", "HA"], required: true },
            { label: "Reifenanzahl", measurements: ["Antriebsrad", "Stützrad", "Lastrolle"], required: true }
          ]
        },
          {
  title: "Sichtprüfung - Hydraulik",
  items: [
    { label: "Hydraulikschläuche", required: true }
  ]
},

{
  title: "Sichtprüfung - Mast",
          items: [
            { label: "Mastart", required: true },
            { label: "Mastnummer", required: true },
            { label: "Gabelzinken", required: true },
            {label: "Hubzylinder", required: true},
            { label: "Anbaugerät", measurements: ["Hersteller", "Typ", "Seriennummer"], requiresImage: true, required: true}
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
            { label: "Feststellbremse", required: true }
          ]
        },

        {
          title: "Funktionstest - Elektrik",
          items: [
            { label: "Zündschloss", required: true },
            { label: "Hupe", required: true },
            { label: "Beleuchtungsanlage", required: true}
          ]
        },

        {
          title: "Funktionstest - Probefahrt",
          items: [
            { label: "Bremsen bei leichter Steigung", required: true },
            { label: "Lenkung während Probefahrt", required: true },
            { label: "Hub ohne Last", required: true },
            { label: "Funktionstest", required: true },
            { label: "Alle Verschraubungen geprüft (Fester Sitz/Leckage)", required: true },
            { label: "Gerät abgeschmiert", required: true }
          ]
        }
      ]
    }
},

verbrenner: {
  id: "verbrenner",
  title: "Verbrenner",
  description: "Geräteaufnahme von Diesel- und Treibgasstaplern. Motor, Hydraulik, Mast, Bereifung und allgemeiner Gerätezustand vollständig dokumentieren.",

  schema: {
    
meta: {
  fields: [
    { id: "kunde", label: "Kunde" },
    { id: "arbeitsauftrag", label: "Arbeitsauftrag"},
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
            { label: "Motorhaube", required: true },
            { label: "Ölstand", required: true },
            { label: "Motortypenschild", required: true },
            { label: "Motorkennzeichen", required: true },
            { label: "Motorseriennummer", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Rahmen",
          items: [
            { label: "Fahrersitz", required: true },
            { label: "Kabine & Scheiben", required: true },
            { label: "Aufkleber (Pieckert, aktuelle UVV, ...)", required: true },
            { label: "Typenschild", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Bereifung",
          items: [
            { label: "Reifen", required: true },
            { label: "Reifenart", required: true },
            { label: "Reifengröße", measurements: ["VA", "HA"], required: true },
            { label: "Reifenanzahl", measurements: ["VA", "HA"], required: true }
          ]
        },

        {
          title: "Sichtprüfung - Hydraulik",
          items: [
            { label: "Hydraulikschläuche", required: true },
            { label: "Hydrauliktank", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Mast",
          items: [
            { label: "Mastart", required: true },
            { label: "Mastnummer", required: true },
            { label: "Gabelzinken", required: true },
            { label: "Hubzylinder", required: true},
            { label: "Anbaugerät", measurements: ["Hersteller", "Typ", "Seriennummer"], requiresImage: true, required: true}
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
            { label: "Feststellbremse", required: true }
          ]
        },

        {
          title: "Funktionstest - Motorlauf",
          items: [
            { label: "Startverhalten", required: true },
            { label: "Leerlauf", required: true },
            { label: "Max. Geschwindigkeit", required: true }            
          ]
        },

        {
          title: "Funktionstest - Elektrik",
          items: [
            { label: "Zündschloss", required: true },
            { label: "Hupe", required: true },
            { label: "Scheibenwischer", required: true },
            { label: "Display- Datum & Uhrzeit einstellen", required: true },
            { label: "Verwendeter Servicecode", required: true },
            { label: "Beleuchtungsanlage", required: true }
          ]
        },


        {
          title: "Funktionstest - Probefahrt",
          items: [
            { label: "Bremsen bei leichter Steigung", required: true },
            { label: "Lenkung während Probefahrt", required: true },
            { label: "Hub ohne Last", required: true },
            { label: "Funktionstest", required: true },
            { label: "Alle Verschraubungen geprüft (Fester Sitz/Leckage)", required: true },
            { label: "Gerät abgeschmiert", required: true }
          ]
        }
      ]
    }
  },

  elektro: {
    id: "elektro",
    title: "Elektro",
    description: "Geräteaufnahme von Elektrostaplern. Batterie, Motor, Hydraulik, Mast, Bereifung und allgemeiner Gerätezustand vollständig dokumentieren.",
  
    schema: {
      meta: {
    fields: [
      { id: "kunde", label: "Kunde" },
      { id: "arbeitsauftrag", label: "Arbeitsauftrag"},
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
            { label: "Batteriemaße", measurements: ["Länge", "Breite", "Höhe"], required: true },
            { label: "Batteriezustand", required: true },
            { label: "Ladestecker", measurements: ["Typ, Größe"], required: true },
            { label: "Ladegerät", measurements: ["Leistung", "Seriennummer"], required: true },
            { label: "Batterieleistung", measurements: ["Volt", "Ah"], required: true },
            { label: "Aquamatic", required: true },
            { label: "EUW", required: true }
          ]
        },

        {
          title: "Sichtprüfung - Rahmen",
          items: [
            { label: "Kabel", required: true },
            { label: "Steuerung", required: true },
            { label: "Aufkleber (Pieckert, aktuelle UVV, ...)", required: true },
            { label: "Typenschild", required: true },
            {label: "Kabine & Scheiben", required: true}
          ]
        },

        {
          title: "Sichtprüfung - Bereifung",
          items: [
            { label: "Reifen", required: true },
            { label: "Reifenart", required: true },
            { label: "Reifengröße", measurements: ["VA", "HA"], required: true },
            { label: "Reifenanzahl", measurements: ["VA", "HA"], required: true }
          ]
        },

        {
          title: "Sichtprüfung - Mast",
          items: [
            { label: "Mastart", required: true },
            { label: "Mastnummer", required: true },
            { label: "Gabelzinken", required: true },
            { label: "Hubzylinder", required: true},
            { label: "Anbaugerät", measurements: ["Hersteller", "Typ", "Seriennummer"], requiresImage: true, required: true}
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
            { label: "Feststellbremse", required: true }
          ]
        },

        {
          title: "Funktionstest - Elektrik",
          items: [
            { label: "Zündschloss", required: true },
            { label: "Hupe", required: true },
            { label: "Scheibenwischer", required: true },
            { label: "Display- Datum & Uhrzeit einstellen", required: true },
            { label: "Verwendeter Servicecode", required: true },
            { label: "Beleuchtungsanlage", required: true }
          ]
        },

        {
          title: "Funktionstest - Probefahrt",
          items: [
            { label: "Bremsen bei leichter Steigung", required: true },
            { label: "Lenkung während Probefahrt", required: true },
            { label: "Hub ohne Last", required: true },
            { label: "Funktionstest", required: true },
            { label: "Alle Verschraubungen geprüft (Fester Sitz/Leckage)", required: true },
            { label: "Gerät abgeschmiert", required: true }
          ]
        }
      ]
    }
  }
};
