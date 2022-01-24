(function() {
    let btn = document.querySelector("#btn");
    let divContainer = document.querySelector("#container");
    let pageTemplates = document.querySelector("#pageTemplates");
    let fid = 0;
    let folders = [];

    btn.addEventListener("click", addFolder);

    function addFolder() {

    }

    function editFolder() {

    }

    function deleteFolder() {

    }

    function addFolderHTMLToPage(fname, fid) {

    }

    function saveToStorage() {

    }

    function loadDataFromStorage() {
        let fjson = localStorage.getItem("data");
        if(!!fjson) {
            folders = JSON.parse(fjson);
            folders.forEach(f => addFolderHTMLToPage(f.name, f.id))
        }
    }
    loadDataFromStorage();
})();