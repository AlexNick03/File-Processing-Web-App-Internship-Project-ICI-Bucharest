let mainEl = document.querySelector('.main-section')
let wordToPdfEl = document.querySelector('.file-convertor')
let excelEl = document.querySelector('.excel-navigation')
let  homEl = document.querySelector('.home-navigation')

wordToPdfEl.addEventListener('click', () => {
    fetch('./pages/file-convertor.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => mainEl.innerHTML = html) // insert into main section
})


 excelEl.addEventListener('click', () => {
    fetch('./pages/excel-cleanup.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => mainEl.innerHTML = html) // insert into main section
})