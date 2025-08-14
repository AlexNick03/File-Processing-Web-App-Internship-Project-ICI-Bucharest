
let wordToPdfEl = document.querySelector('.file-convertor')
let excelEl = document.querySelector('.excel-navigation')
let  homEl = document.querySelector('.home-navigation')
const mainSection = document.querySelector(".main-section");
  

function loadAnimation (){
    setTimeout(() => {
    mainSection.classList.add("fade-in");
  }, 100); 

}


document.addEventListener("DOMContentLoaded", () => {
  if (mainSection.classList.contains("fade-in")) {
      mainSection.classList.remove("fade-in");
    }
    // Adaugă clasa pentru fade-in după un mic delay
    loadAnimation(); 
});

wordToPdfEl.addEventListener('click', () => {
    fetch('./pages/file-convertor.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => {
        if (mainSection.classList.contains("fade-in")) {
            mainSection.classList.remove("fade-in");
        }
        mainSection.innerHTML = html// insert into main section
        
    }).then(() => {
        loadAnimation();
    })
   
})


 excelEl.addEventListener('click', () => {
    fetch('./pages/excel-cleanup.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => {
    if (mainSection.classList.contains("fade-in")) {
      mainSection.classList.remove("fade-in");
    }
        mainSection.innerHTML = html// insert into main section
        
    }).then(() => {
        loadAnimation();
    })
    
})