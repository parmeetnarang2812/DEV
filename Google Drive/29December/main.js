(function(){
    let btn = document.querySelector("#btn");
    let divContainer = document.querySelector("#container");
    let pageTemplates = document.querySelector("#pageTemplates");

    btn.addEventListener("click", function() {
        let fname = prompt("Folder Name?");
        if(!fname) {
            return;
        }

        let divFolderTemplate = pageTemplates.content.querySelector(".folder")
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        divName.innerHTML = fname;

        divContainer.appendChild(divFolder);
    });

})();
