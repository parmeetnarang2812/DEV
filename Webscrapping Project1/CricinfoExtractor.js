/*
    ->The purpose of this project is to extract the information of Worldcup 2019 from Cricinfo
      and present that in the perform of excel and pdf scorecards.
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

//node CricinfoExtractor.js --excel=worldcup.xlsx --dataFolder=data --source="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"


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

  let matches = [];
  let matchdivs = document.querySelectorAll("div.match-score-block");
  // console.log(matchdivs.length);
  for (let i = 0; i < matchdivs.length; i++) {
    let matchdiv = matchdivs[i];
    let match = {
      team1name: "",
      team2name: "",
      team1score: "",
      team2score: "",
      result: "",
    };
    // console.log(match);
    let resultSpan = matchdiv.querySelector("div.status-text > span");
    match.result = resultSpan.textContent;

    let teamParas = matchdiv.querySelectorAll("div.name-detail > p.name");
    match.team1name = teamParas[0].textContent;
    match.team2name = teamParas[1].textContent;

    let scoreSpans = matchdiv.querySelectorAll("div.score-detail > span.score");
    if(scoreSpans.length==2){
        match.team1score = scoreSpans[0].textContent;
        match.team2score = scoreSpans[1].textContent;
    }
    else if(scoreSpans.length==1){
        match.team1score = scoreSpans[0].textContent;
        match.team2score = "";
    }
    else{
        match.team1score = "";
        match.team2score = "";
    }
  matches.push(match);
  }
  // console.log(matches);
  let matchesJSON = JSON.stringify(matches);
  fs.writeFileSync("matches.json", matchesJSON, "utf-8");


let teams=[];
for(let i=0; i<matches.length; i++){
  addTeamToTeamsArrIfNotAlreadyThere(teams, matches[i].team1name);
  addTeamToTeamsArrIfNotAlreadyThere(teams, matches[i].team2name);
}
for(let i=0; i<matches.length; i++){
  addMatchToAppropriateTeam(teams, matches[i].team1name, matches[i].team2name, matches[i].team1score, matches[i].team2score, matches[i].result);
  addMatchToAppropriateTeam(teams, matches[i].team2name, matches[i].team1name, matches[i].team2score, matches[i].team1score, matches[i].result);
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
    for(let j=0; j<teams[i].matches.length; j++){
      let fileName = path.join(folderName, teams[i].matches[j].oppTeam + ".pdf");
      createScoreCard(teams[i].name, teams[i].matches[j], fileName);
       
}
  }
}
function createScoreCard(teamName, match, fileName){

  let detail = teamName + " VS " + match.oppTeam
  let t1 = teamName;
  let t2 = match.oppTeam;
  let t1s = match.homeTeamScore;
  let t2s = match.oppScore;
  let result = match.result;

  let templateBytes = fs.readFileSync("Template.pdf");
  let prmToLoadBytes = pdf.PDFDocument.load(templateBytes);
  prmToLoadBytes.then(function(pdfDoc){
      let page = pdfDoc.getPage(0);
      page.drawText(detail, {
        x:190,
        y:620,
        size: 20, 
        // font: ''
      });
      page.drawText(t1, {
          x:65,
          y:481,
          size: 14
      });
      page.drawText(t2, {
          x:195,
          y:481,
          size: 14
      });
      page.drawText(t1s, {
        x:335,
        y:481,
        size: 14
      });
    page.drawText(t2s, {
      x:455,
      y:481,
      size: 14
      });
      page.drawText(result, {
          x:178,
          y:335,
          size: 16
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

    sheet.cell(1,1).string("Opponent Team").style(myStyle1);
    sheet.cell(1,2).string("Home Team Score").style(myStyle1);
    sheet.cell(1,3).string("Opponent Score").style(myStyle1);
    sheet.cell(1,4).string("Result").style(myStyle1);
    sheet.column(1).setWidth(25);
    sheet.column(2).setWidth(25);
    sheet.column(3).setWidth(25);
    sheet.column(4).setWidth(60);

    for(let j=0; j<teams[i].matches.length; j++){
      sheet.cell(j+2,1).string(teams[i].matches[j].oppTeam).style(myStyle2);
      sheet.cell(j+2,2).string(teams[i].matches[j].homeTeamScore).style(myStyle2);
      sheet.cell(j+2,3).string(teams[i].matches[j].oppScore).style(myStyle2);
      sheet.cell(j+2,4).string(teams[i].matches[j].result).style(myStyle2);
    }
  }
  workBook.write(args.excel);
}

function addTeamToTeamsArrIfNotAlreadyThere(teams, teamName){
  let t1idx = -1;
  for(let i=0; i<teams.length; i++){
    if(teams[i].name == teamName){
      t1idx = i;
      break;
    }
  }
  if(t1idx == -1){
      let team = {
        name: teamName,
        matches: []
      };
      teams.push(team);
      }
}

function addMatchToAppropriateTeam(teams, homeTeam, oppTeam, homeTeamScore, oppScore, result){
  let tidx = -1;
  for(let i=0; i<teams.length; i++){
    if(teams[i].name == homeTeam){
      tidx = i;
      break;
    }
  }
  let team = teams[tidx];
  team.matches.push({
    oppTeam: oppTeam,
    homeTeamScore: homeTeamScore,
    oppScore: oppScore,
    result: result
  })
}