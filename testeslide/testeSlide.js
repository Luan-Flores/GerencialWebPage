document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container'); // Adicionado
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    // Variáveis para funcionalidade de arrastar
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationId;

    function getCardsPerView() {
        if (window.innerWidth <= 425) {
            return 1;
        } else if (window.innerWidth <= 768) {
            return 2;
        } else {
            return 4;
        }
    }

    function getCardWidthWithMargin() {
        if (cards.length === 0) return 0;
        const cardMargin = parseFloat(getComputedStyle(cards[0]).marginLeft) + parseFloat(getComputedStyle(cards[0]).marginRight);
        return cards[0].offsetWidth + cardMargin;
    }

    function updateSlider() {
        const cardWidth = getCardWidthWithMargin();
        // A posição alvo para o transform. Usamos currentTranslate para o arrasto suave.
        currentTranslate = -currentIndex * cardWidth;
        sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    // --- Funções para Arrastar (Drag) ---

    function setPositionByIndex() {
        const cardWidth = getCardWidthWithMargin();
        currentIndex = Math.round(Math.abs(currentTranslate) / cardWidth);

        // Garante que o currentIndex não vá além dos limites
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        // Garante que o currentIndex seja um múltiplo de cardsPerView
        currentIndex = Math.floor(currentIndex / cardsPerView) * cardsPerView;

        currentTranslate = -currentIndex * cardWidth;
        sliderWrapper.style.transition = 'transform 0.5s ease-in-out'; // Reativa a transição para o snap
        updateSlider();
    }

    function animation() {
        sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    }

    function touchStart(event) {
        // Ignora cliques do mouse que não sejam o botão esquerdo
        if (event.type === 'mousedown' && event.button !== 0) return;

        isDragging = true;
        sliderContainer.classList.add('grabbing'); // Adiciona classe para mudar o cursor
        sliderWrapper.style.transition = 'none'; // Desativa a transição para arrasto suave

        startPos = getPositionX(event);
        prevTranslate = currentTranslate; // Guarda a posição atual antes de começar a arrastar

        animationId = requestAnimationFrame(animation);
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPos; // Diferença no arrasto
        currentTranslate = prevTranslate + diff; // Nova posição de translação

        // Limita o arrasto para não sair muito dos limites
        const maxTranslate = 0;
        const minTranslate = -(getCardWidthWithMargin() * (cards.length - cardsPerView));

        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
        } else if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate;
        }
    }

    function touchEnd() {
        cancelAnimationFrame(animationId);
        isDragging = false;
        sliderContainer.classList.remove('grabbing'); // Remove classe do cursor

        // Calcula o índice mais próximo e move para ele
        setPositionByIndex();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // --- Event Listeners para Arrastar ---
    sliderContainer.addEventListener('mousedown', touchStart);
    sliderContainer.addEventListener('mouseup', touchEnd);
    sliderContainer.addEventListener('mouseleave', touchEnd); // Importante para quando o mouse sai do container
    sliderContainer.addEventListener('mousemove', touchMove);

    sliderContainer.addEventListener('touchstart', touchStart);
    sliderContainer.addEventListener('touchend', touchEnd);
    sliderContainer.addEventListener('touchmove', touchMove);

    // --- Navegação com Botões (mantida) ---
    nextBtn.addEventListener('click', () => {
        sliderWrapper.style.transition = 'transform 0.5s ease-in-out'; // Reativa a transição para o clique
        const totalCards = cards.length;
        if (currentIndex + cardsPerView < totalCards) {
            currentIndex += cardsPerView;
        } else {
            currentIndex = 0; // Loop de volta ao início
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        sliderWrapper.style.transition = 'transform 0.5s ease-in-out'; // Reativa a transição para o clique
        if (currentIndex > 0) {
            currentIndex -= cardsPerView;
            if (currentIndex < 0) {
                currentIndex = 0;
            }
        } else {
            // Volta para o último conjunto de cards se estiver no início
            const totalCards = cards.length;
            currentIndex = totalCards - cardsPerView;
            while (currentIndex % cardsPerView !== 0 && currentIndex > 0) {
                currentIndex--;
            }
        }
        updateSlider();
    });

    // --- Resizing (mantido) ---
    window.addEventListener('resize', () => {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentIndex = Math.floor(currentIndex / cardsPerView) * cardsPerView;

            if (currentIndex > cards.length - cardsPerView) {
                 currentIndex = Math.max(0, cards.length - cardsPerView);
                 while (currentIndex % cardsPerView !== 0 && currentIndex > 0) {
                    currentIndex--;
                }
            }
            updateSlider();
        }
        updateSlider();
    });

    // Inicializa o slider na primeira carga da página
    updateSlider();
});