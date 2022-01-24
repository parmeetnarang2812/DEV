/*
    ->The purpose of this project is to extract the information of Tokyo Olympics 2020 from ESPN
      and present that in the perform of excel and pdfs.
    ->The real purpose is to learn how to extract information and get experienced with javascript. 
    ->A very good reason to make this project is to have good fun with webscrapping. 
*/

/*
npm init
npm install minimist
npm install axios
npm install excel4node
npm install jsdom
npm install pdf-lib
*/

// node ESPN-Extractor.js --excel=olympics.xlsx --dataFolder=data --source="https://www.espn.in/olympics/summer/2020/medals"


let minimist = require("minimist");
let axios = require("axios");
let excel = require("excel4node");
let jsdom = require("jsdom");
let pdf = require("pdf-lib");
let fs = require("fs");
let path = require("path");

let args = minimist(process.argv);

/*
download using axios - done
extract information jsdom - done
manipulate data using array manipulation
save in excel using excel4node
create folders and prepare pdfs
*/

let promise = axios.get(args.source);
promise.then(function (response) {
  let html = response.data;
  // console.log(html);

  let dom = new jsdom.JSDOM(html);
  let document = dom.window.document;

  let countries = [];
  let countriestags = document.querySelectorAll(".medals.olympics.has-team-logos tbody tr");
  // console.log(countriestags.length);
  for (let i = 0; i < countriestags.length; i++) {
    let countrytag = countriestags[i];
    let country = {
      TeamNameCode: "",
      TotalGold: "",
      TotalSilver: "",
      TotalBronze: "",
      TotalMedals: ""
    };
    // console.log(country);
    
//   console.log("Olympics 2020 data extracted successfully!");

    let teamTDs = countrytag.querySelectorAll("tr>td");
    country.TeamNameCode = teamTDs[0].textContent;
    country.TotalGold = teamTDs[1].textContent;
    country.TotalSilver = teamTDs[2].textContent;
    country.TotalBronze = teamTDs[3].textContent;
    country.TotalMedals = teamTDs[4].textContent;

    ;
    

    countries.push(country);
  }
  // console.log(countries);
  let countriesJSON = JSON.stringify(countries);
  fs.writeFileSync("countries.json", countriesJSON, "utf-8");


let teams=[];
for(let i=0; i<countries.length; i++){
  addTeamToTeamsArrIfNotAlreadyThere(teams, countries[i].TeamNameCode);
}
for(let i=0; i<countries.length; i++){
  addMatchToAppropriateTeam(teams, countries[i].TeamNameCode, countries[i].TotalGold, countries[i].TotalSilver, countries[i].TotalBronze, countries[i].TotalMedals);
  }
  let teamsJSON = JSON.stringify(teams);
  fs.writeFileSync("teams.json", teamsJSON, "utf-8");
  createExcel(teams);
  createFolders(teams);
})

function createFolders(teams){
  fs.mkdirSync(args.dataFolder);
  for(let i=0; i<teams.length; i++){
    let folderName = path.join(args.dataFolder, teams[i].name);
    fs.mkdirSync(folderName);
    for(let j=0; j<teams[i].medals.length; j++){
      let fileName = path.join(folderName, teams[i].name + ".pdf");
      createScoreCard(teams[i].name, teams[i].medals[j], fileName);
      }
  }
}
function createScoreCard(TeamNameCode, medals, fileName){

  let gold = medals.GoldMedals;
  let silver = medals.SilverMedals;
  let bronze = medals.BronzeMedals;
  let total = medals.TotalMedals;

  let templateBytes = fs.readFileSync("Template.pdf");
  let prmToLoadBytes = pdf.PDFDocument.load(templateBytes);
  prmToLoadBytes.then(function(pdfDoc){
      let page = pdfDoc.getPage(0);
      
      page.drawText(gold, {
          x:65,
          y:481,
          size: 14
      });
      page.drawText(silver, {
          x:195,
          y:481,
          size: 14
      });
      page.drawText(bronze, {
        x:335,
        y:481,
        size: 14
      });
    page.drawText(total, {
      x:455,
      y:481,
      size: 14
      });

      let prmToSave = pdfDoc.save();
      prmToSave.then(function(changedBytes){
          fs.writeFileSync(fileName, changedBytes);
      })
  });
}

function createExcel(teams){
  let workBook = new excel.Workbook();
  let myStyle1 = workBook.createStyle({
    font: {
      bold: true,
      color: 'FFFFFF'
    },
    fill: { 
        type: 'pattern', 
        patternType: 'solid',
        fgColor: '000080'
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
    },
  });
  let myStyle3 = workBook.createStyle({
    font: {
      bold: true,
      color: 'FFFFFF'
    },
    fill: { 
        type: 'pattern', 
        patternType: 'solid',
        fgColor: '228B22'
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
    },
  });
  let myStyle2 = workBook.createStyle({
    font: {
      bold: true,
      color: '000080'
    },
    
    alignment: {
      wrapText: true,
      horizontal: 'center',
    }
    });
  for(let i=0; i<teams.length; i++){
    let sheet = workBook.addWorksheet(teams[i].name);

    sheet.cell(1,1).string("Gold Medals").style(myStyle1);
    sheet.cell(3,1).string("Silver Medals").style(myStyle1);
    sheet.cell(5,1).string("Bronze Medals").style(myStyle1);
    sheet.cell(7,1).string("Total Medals").style(myStyle3);

    sheet.cell(1,2).string("==>").style(myStyle2);
    sheet.cell(3,2).string("==>").style(myStyle2);
    sheet.cell(5,2).string("==>").style(myStyle2);
    sheet.cell(7,2).string("==>").style(myStyle2);

    sheet.column(1).setWidth(20);
    sheet.column(2).setWidth(20);
    sheet.column(3).setWidth(20);

    for(let j=0; j<teams[i].medals.length; j++){
      sheet.cell(1,j+3).string(teams[i].medals[j].GoldMedals).style(myStyle2);
      sheet.cell(3,j+3).string(teams[i].medals[j].SilverMedals).style(myStyle2);
      sheet.cell(5,j+3).string(teams[i].medals[j].BronzeMedals).style(myStyle2);
      sheet.cell(7,j+3).string(teams[i].medals[j].TotalMedals).style(myStyle2);
    }
  }
  workBook.write(args.excel);
}


function addTeamToTeamsArrIfNotAlreadyThere(teams, TeamNameCode){
  let t1idx = -1;
  for(let i=0; i<teams.length; i++){
    if(teams[i].name == TeamNameCode){
      t1idx = i;
      break;
    }
  }
  if(t1idx == -1){
      let team = {
        name: TeamNameCode,
        medals: []
      };
      teams.push(team);
      }
}

function addMatchToAppropriateTeam(teams, homeTeam, gold, silver, bronze, total){
  let tidx = -1;
  for(let i=0; i<teams.length; i++){
    if(teams[i].name == homeTeam){
      tidx = i;
      break;
    }
  }
  let team = teams[tidx];
  team.medals.push({
    GoldMedals: gold,
    SilverMedals: silver,
    BronzeMedals: bronze,
    TotalMedals: total
  })
}