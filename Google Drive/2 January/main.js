(function() {
    let btn = document.querySelector("#btn");
    let breadCrumb = document.querySelector("#divBreadCrumb");
    let divContainer = document.querySelector("#container");
    let pageTemplates = document.querySelector("#pageTemplates");
    let fid = 0;
    let folders = [];

    btn.addEventListener("click", addFolder);

    function addFolder() {
        let fname = prompt("Enter the folder's name");
        if(!!fname){
            let fidx = folders.findIndex(f => f.name == fname);
            if(fidx==-1) {
                fid++;
                //RAM
                folders.push({
                    id : fid,
                    name : fname
                });
                //HTML
                addFolderHTMLToPage(fname, fid);
                //Storage
                saveToStorage();
            }
            else {
                alert(fname + "already exists.");
            }
        }
        else {
            alert("Please enter something!");
        }
    }

    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML;

        let nfname = prompt("Enter the new name for " + ofname);
        if(!!nfname){
            if(nfname != ofname) {
                let exists = folders.some(f => f.name == nfname); 
                //checks for the same name folder already exists in the folders array.
                if(exists==false) {
                    //RAM
                    let folder = folders.find(f => f.name == ofname);
                    folder.name = nfname;
                
                    //HTML
                    divName.innerHTML=nfname;

                    //Storage
                    saveToStorage();
                }
                else {
                    alert(nfname + "already exists.");
                }
            } 
            else {
                alert("This is the old name only. Please enter a new name.")
            }
        }    
        else {
            alert("Please enter something!");
        }
    }

    function deleteFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let flag = confirm("Are you sure you want to delete " + divName.innerHTML + "?");
        if(flag==true) {
            //ram
            let fidx = folders.findIndex(f => f.name == divName.innerHTML);
            folders.splice(fidx, 1);
            //html
            divContainer.removeChild(divFolder);
            //storage
            saveToStorage();
        }
    }

    function addFolderHTMLToPage(fname, fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanEdit = divFolder.querySelector("[action='edit']");
        let spanDelete = divFolder.querySelector("[action='delete']");

        divFolder.setAttribute("fid", fid);
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);

        divContainer.appendChild(divFolder);
    }

    function saveToStorage() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadDataFromStorage() {
        let fjson = localStorage.getItem("data");
        if(!!fjson) {
            folders = JSON.parse(fjson);
            folders.forEach(f => {
                if(f.id>fid) {
                    fid=f.id;
                }
                addFolderHTMLToPage(f.name, f.id)
            });
        }
    }
    
    loadDataFromStorage();
})();