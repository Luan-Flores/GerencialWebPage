// const hamburger = document.querySelector(".hamburger");
// const nav = document.querySelector(".menu");

// hamburger.addEventListener("click", () =>
//     nav.classList.toggle("active"));

var btnHamburguer = document.getElementById("btn-hamburguer");
var navList = document.querySelector(".nav-list");

// Adiciona evento de clique no botão hamburguer para alternar o menu
btnHamburguer.addEventListener('click', function(evento) {
    evento.preventDefault();

    navList.classList.toggle('ativo');
    btnHamburguer.classList.toggle('ativo');
});