// document.getElementById("footer").innerHTML = fetch("footer-template.html").then(res => res.text()).then(data => {
//     document.getElementById("footer").innerHTML = data;
//   });
// console.log("GLoriaa")
// document.getElementById("header").innerHTML = fetch("header-template.html").then(res => res.text()).then(data => {
//     document.getElementById("header").innerHTML = data;
// })

function loadTemplateById(elemId) {
  fetch(`templates/${elemId}-template.html`)
      .then(res => res.text())
      .then(data => {
          document.getElementById(elemId).innerHTML = data;
      })
      .catch(err => console.error(`Erro ao carregar ${elemId}:`, err));
}

const ids = ["header", "footer"];

ids.forEach(id => loadTemplateById(id));
