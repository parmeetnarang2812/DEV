let toolsCont = document.querySelector(".tools-cont");
let optionsToolCont = document.querySelector(".options-cont");
let optionsFlag=true;
let pencilToolCont = document.querySelector(".options-cont");
let eraserToolCont = document.querySelector(".options-cont");
let pencil = false;
let eraser = false;



optionsToolCont.addEventListener("click", (e) => {
    //true->tools visible, false->tools hidden
    optionsFlag = !optionsFlag;

    if(optionsFlag) openTools;
    else closeTools;
})

function openTools() {
    let iconElem = optionsToolCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display="flex";
}
function closeTools() {
    let iconElem = optionsToolCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display="none";

    pencilToolCont.style.display="none";
    eraserToolCont.style.display="none";
}