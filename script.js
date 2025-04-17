const btnHamburguer = document.getElementById("btn-hamburguer");
const navList = document.querySelector(".nav-list");

// Adiciona evento de clique no botão hamburguer para alternar o menu
btnHamburguer.addEventListener('click', function(evento) {
    evento.preventDefault();
    navList.classList.toggle('ativo');
    btnHamburguer.classList.toggle('ativo');
});
let lastScrollY = window.scrollY;
const header = document.getElementsByClassName("cabecalho")[0];
console.log(header[0])

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Rolando para baixo: esconde
    header.style.top = "-70px";
  } else {
    // Rolando para cima: mostra
    header.style.top = "0";
  }
  lastScrollY = window.scrollY;
});


const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, index) => {
      if (entrada.isIntersecting) {
        setTimeout(() => {
          entrada.target.classList.add('visivel');
        }, index * 370); // 300ms entre cada card
      } else {
        entrada.target.classList.remove('visivel');
      }
    });
  }, {
    threshold: 0.3
  });
  
  document.querySelectorAll('.ave-box').forEach(el => {
    observer.observe(el);
  });
  document.querySelectorAll('.ave-title').forEach(el => {
    observer.observe(el);
  });
  document.querySelectorAll('.cardEntre').forEach(el => {
    observer.observe(el);
  });


  