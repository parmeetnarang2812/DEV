// npm i pdf-lib
// node FirstWritingPdf.js --source=teams.json --dest=worldcup

let minimist = require("minimist");
let fs = require("fs");
let path = require("path");
let pdf = require("pdf-lib");

let args = minimist(process.argv);

let teamsJSON = fs.readFileSync(args.source, "utf-8");
let teams = JSON.parse(teamsJSON);
fs.mkdirSync(args.dest);

for(let i=0; i<teams.length; i++){
    let teamFolder = path.join(args.dest, teams[i].name);
    fs.mkdirSync(teamFolder);

    for(let j=0; j<teams[i].matches.length; j++){
        let fileName = path.join(teamFolder, teams[i].matches[j].vs + ".pdf");
        createScoreCard(teams[i].name, teams[i].matches[j], fileName);
        //     fs.writeFileSync(fileName,"","utf-8");
    // } 
}

function createScoreCard(teamName, match, fileName){
    // this fn creates pdf for match in appropriate folder with correct details
    // create pdf using pdf-lib

    let t1 = teamName;
    let t2 = match.vs;
    let result = t1 + " " + match.result;

    // let pdfDoc = pdf.pdfDoc;
    let templateBytes = fs.readFileSync("Template.pdf");
    let prmToLoadBytes = pdf.PDFDocument.load(templateBytes);
    prmToLoadBytes.then(function(pdfDoc){
        let page = pdfDoc.getPage(0);
        page.drawText(t1, {
            x:320,
            y:737,
            size: 10
        });
        page.drawText(t2, {
            x:320,
            y:723,
            size: 10
        });
        page.drawText(result, {
            x:320,
            y:709,
            size: 10
        });

        let prmToSave = pdfDoc.save();
        prmToSave.then(function(changedBytes){
            fs.writeFileSync(fileName, changedBytes);
        })
    });
  }
}