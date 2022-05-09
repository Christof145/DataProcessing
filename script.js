const userAction = async () => {
    // Search value
    const country1  = document.getElementById('idCountry1').value;
    const country2  = document.getElementById('idCountry2').value;

    // XML Calls
    const addressHappyness  = "http://localhost:3000/worldHappyness/countryHappyness/" + country1;
        const responseHappyness = await fetch(addressHappyness , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': 'application/xml'
                }
            });

    const addressAlcohol  = "http://localhost:3000/worldAlcohol/countryalcohol/" + country1;
    const responseAlcohol = await fetch(addressAlcohol , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml'
        }
    });
    
    const addressGDP  = "http://localhost:3000/worldGDP/countrygdp/" + country1;
    const responseGDPXml = await fetch(addressGDP , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml'
        }
    });
    // XML Calls 2
    const addressHappynessCountry2  = "http://localhost:3000/worldHappyness/countryHappyness/" + country2;
        const responseHappynessCountry2 = await fetch(addressHappynessCountry2 , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': 'application/xml'
                }
            });

    const addressAlcoholCountry2  = "http://localhost:3000/worldAlcohol/countryalcohol/" + country2;
    const responseAlcoholCountry2 = await fetch(addressAlcoholCountry2 , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml'
        }
    });
    
    const addressGDPCountry2  = "http://localhost:3000/worldGDP/countrygdp/" + country2;
    const responseGDPXmlCountry2 = await fetch(addressGDPCountry2 , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml'
        }
    });
    

    //Json
    const addressHappynessJson  = "http://localhost:3000/worldHappyness/countryHappyness/" + country2;
    const responseHappynessJson = await fetch(addressHappynessJson , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const addressAlcoholJson  = "http://localhost:3000/worldAlcohol/countryalcohol/" + country2;
    const responseAlcoholJson = await fetch(addressAlcoholJson , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const addressGDPJson  = "http://localhost:3000/worldGDP/countrygdp/" + country2;
    const responseGDPJson = await fetch(addressGDPJson , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    // Correct -> var json = await responseHappyness.text();
// ADD cors extention to documentation\


// Responses
var happynessJson = await responseHappynessJson.json();
var AlcoholJson = await responseAlcoholJson.json();
var GDPJson = await responseGDPJson.json();


// Data from responses
const familyRate = await happynessJson[0]['Family'];
const totalAlchol = await AlcoholJson[0]['total_liters_of_alcohol'];
const suicideRate2016 = await GDPJson[0]['Suicide_Rate_2016'];


// XML Text
var GDPXmlCountry1 = await responseGDPXml.text();
var AlcoholXmlCountry1 = await responseAlcohol.text();
var happynessXmlCountry1 = await responseHappyness.text();

var GDPXmlCountry2 = await responseGDPXmlCountry2.text();
var AlcoholXmlCountry2 = await responseAlcoholCountry2.text();
var happynessXmCountry2 = await responseHappynessCountry2.text();

// XML text parsers
let parserGDPCountry1 = new DOMParser();
let parserHappynessCountry1 = new DOMParser();
let parserAlcoholCountry1 = new DOMParser();

let parserGDPCountry2 = new DOMParser();
let parserHappynessCountry2 = new DOMParser();
let parserAlcoholCountry2 = new DOMParser();

// Parsed strings
let xmlDocH = await parserHappynessCountry1.parseFromString(happynessXmlCountry1,"text/xml");
let xmlDocG = await parserGDPCountry1.parseFromString(GDPXmlCountry1,"text/xml");
let xmlDocA = await parserAlcoholCountry1.parseFromString(AlcoholXmlCountry1,"text/xml");

let xmlDocH2 = await parserHappynessCountry2.parseFromString(happynessXmCountry2,"text/xml");
let xmlDocG2 = await parserGDPCountry2.parseFromString(GDPXmlCountry2,"text/xml");
let xmlDocA2 = await parserAlcoholCountry2.parseFromString(AlcoholXmlCountry2,"text/xml");

// Get specific elements in xml
var Srate = xmlDocG.getElementsByTagName("Suicide_Rate_2016")[0].textContent;
var AlcoholTotal = xmlDocA.getElementsByTagName("total_liters_of_alcohol")[0].textContent;
var familyValue = xmlDocH.getElementsByTagName("Family")[0].textContent;

var Srate2 = xmlDocG2.getElementsByTagName("Suicide_Rate_2016")[0].textContent;
var AlcoholTotal2 = xmlDocA2.getElementsByTagName("total_liters_of_alcohol")[0].textContent;
var familyValue2 = xmlDocH2.getElementsByTagName("Family")[0].textContent;

// console.log(happynessXml);
// console.log(AlcoholXml);
// console.log(GDPXml);

// console.log(xmlDocH);
console.log(xmlDocG);
console.log(xmlDocG2);
// console.log(xmlDocAlcohol);

// console.log(Srate);
// console.log(familyValue);
// console.log(AlcoholTotal);


var xValues = ["Total liters of Alcohol", "Family Rate", "Suicide Rate"];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: [AlcoholTotal,familyValue, Srate],
      borderColor: "red",
      fill: false,
      labels: country1,
    },{
      data: [AlcoholTotal2, familyValue2, Srate2],
      borderColor: "green",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});
}

