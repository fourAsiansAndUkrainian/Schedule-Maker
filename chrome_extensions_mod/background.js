//Set some content from background page
var slot = document.getElementById("myTable");
chrome.storage.local.set({"id" : slot},function (){
    console.log("Storage Succesful");
});
//get all contents of chrome storage
chrome.storage.local.get(slot,function (obj){
        console.log(JSON.stringify(obj));
        
});

