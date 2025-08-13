let mainEl = document.querySelector('.main-section')
let wordToPdfEl = document.querySelector('.word-navigation')
let  homEl = document.querySelector('.home-navigation')

homEl.addEventListener('click', () => {
    fetch('./pages/home.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => mainEl.innerHTML = html) // insert into main section
})
wordToPdfEl.addEventListener('click', () => {
    fetch('./pages/word-pdf.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => mainEl.innerHTML = html) // insert into main section
})

fetch('./pages/home.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => mainEl.innerHTML = html) // insert into main section
 