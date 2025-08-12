let mainEl = document.querySelector('.main-section')
fetch('./pages/home.html')
    .then(response => response.text()) // convert to plain text and passes to next  
    .then(html => mainEl.innerHTML = html) // insert into main section
 