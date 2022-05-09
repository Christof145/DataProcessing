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
var GDPXml = await responseGDPXml.text();
var AlcoholXml = await responseAlcohol.text();
var happynessXml = await responseHappyness.text();

// XML text parsers
let parserG = new DOMParser();
let parserH = new DOMParser();
let parserAlcohol = new DOMParser();

// Parsed strings
let xmlDocH = await parserH.parseFromString(happynessXml,"text/xml");
let xmlDocG = await parserG.parseFromString(GDPXml,"text/xml");
let xmlDocAlcohol = await parserAlcohol.parseFromString(AlcoholXml,"text/xml");

// Get specific elements in xml
var Srate = xmlDocG.getElementsByTagName("Suicide_Rate_2016")[0].textContent;
var AlcoholTotal = xmlDocAlcohol.getElementsByTagName("total_liters_of_alcohol")[0].textContent;
var familyValue = xmlDocH.getElementsByTagName("Family")[0].textContent;

// console.log(happynessXml);
// console.log(AlcoholXml);
// console.log(GDPXml);

// console.log(xmlDocH);
// console.log(xmlDocG);
// console.log(xmlDocAlcohol);

// console.log(Srate);
// console.log(familyValue);
// console.log(AlcoholTotal);



var xValues = ["Alcohol", "Family Rate", "Suicide Rate"];
var yValues = [AlcoholTotal, familyValue, Srate];
var barColors = ["red", "green","blue"];

new Chart("myChart", {
    type: "bar",
    data: {
    labels: xValues,
    datasets: [{
    backgroundColor: barColors,
    data: yValues
    }]
    },
    options: {
    legend: {display: false},
    title: {
    display: true,
    text: "Wlcome to comparing "
    }
    }
});
var xValues = ["Alcohol", "Family Rate", "Suicide Rate"];
var nameValues = "Hunagry"
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: [AlcoholTotal,familyValue, Srate],
      labels: "Hungry",
      borderColor: "red",
      fill: false,
      labels: country1,
    },{
      data: [15,17, 12],
      borderColor: "green",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});
}

