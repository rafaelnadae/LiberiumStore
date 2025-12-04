document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closeBtn');

    // Abre o pop-up
    editBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede que o link navegue
        popupOverlay.classList.add('active');
    });

    // Fecha o pop-up clicando no 'X'
    closeBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
    });

    // Fecha o pop-up clicando fora da janela
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
});