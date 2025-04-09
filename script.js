const btnHamburguer = document.getElementById("btn-hamburguer");
const navList = document.querySelector(".nav-list");

// Adiciona evento de clique no botão hamburguer para alternar o menu
btnHamburguer.addEventListener('click', function(evento) {
    evento.preventDefault();

    navList.classList.toggle('ativo');
    btnHamburguer.classList.toggle('ativo');
});