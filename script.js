document.addEventListener('DOMContentLoaded', () => {
    // --- TU INVENTARIO ---
    const catalogGames = [
        { id: 1, title: 'Elden Ring', platform: 'PC', price: 50.00, image: 'https://via.placeholder.com/250x300.png/00ff9b/0a0a0a?text=Elden+Ring' },
        { id: 2, title: 'God of War Ragnarök', platform: 'PlayStation', price: 55.00, image: 'https://via.placeholder.com/250x300.png/00ff9b/0a0a0a?text=God+of+War' },
        { id: 3, title: 'Forza Horizon 5', platform: 'Xbox', price: 45.00, image: 'https://via.placeholder.com/250x300.png/00ff9b/0a0a0a?text=Forza+Horizon+5' },
        { id: 4, title: 'Metroid Dread', platform: 'Nintendo', price: 35.00, image: 'https://via.placeholder.com/250x300.png/00ff9b/0a0a0a?text=Metroid+Dread' },
    ];

    const offerGames = [
        { id: 5, title: 'Cyberpunk 2077', platform: 'PC', price: 15.00, originalPrice: 25.00, image: 'https://via.placeholder.com/250x300.png/ff00ff/0a0a0a?text=Cyberpunk+2077' },
        { id: 6, title: 'The Witcher 3', platform: 'PlayStation', price: 10.00, originalPrice: 15.00, image: 'https://via.placeholder.com/250x300.png/ff00ff/0a0a0a?text=The+Witcher+3' },
        { id: 7, title: 'Halo Infinite', platform: 'Xbox', price: 20.00, originalPrice: 30.00, image: 'https://via.placeholder.com/250x300.png/ff00ff/0a0a0a?text=Halo+Infinite' },
        { id: 8, title: 'Zelda: Breath of the Wild', platform: 'Nintendo', price: 30.00, originalPrice: 40.00, image: 'https://via.placeholder.com/250x300.png/ff00ff/0a0a0a?text=Zelda' },
    ];

    const allGames = [...catalogGames, ...offerGames];
    let cart = [];

    // --- ELEMENTOS DEL DOM ---
    const gameListings = document.getElementById('game-listings');
    const offerListings = document.getElementById('offer-listings');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModalButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const clearCartButton = document.getElementById('clear-cart-button');

    // --- FUNCIONES PARA MOSTRAR JUEGOS ---
    function displayGames() {
        // Mostrar catálogo
        gameListings.innerHTML = catalogGames.map(game => createGameCard(game, false)).join('');
        // Mostrar ofertas
        offerListings.innerHTML = offerGames.map(game => createGameCard(game, true)).join('');
    }

    function createGameCard(game, isOffer) {
        const priceHTML = isOffer 
            ? `<div class="price-container"><span class="original-price">$${game.originalPrice.toFixed(2)}</span> <span class="game-price offer-price">$${game.price.toFixed(2)}</span></div>`
            : `<p class="game-price">$${game.price.toFixed(2)}</p>`;
        
        return `
            <div class="game-card ${isOffer ? 'offer-card' : ''}">
                <img src="${game.image}" alt="${game.title}" class="game-card-img">
                <div class="game-card-info">
                    <h3 class="game-title">${game.title}</h3>
                    <span class="game-platform">${game.platform}</span>
                    ${priceHTML}
                    <button class="add-to-cart-button" data-id="${game.id}">Añadir al Carrito</button>
                </div>
            </div>
        `;
    }

    // --- LÓGICA DEL CARRITO ---
    function addToCart(gameId) {
        // Verificar si el juego ya está en el carrito
        if (cart.find(item => item.id === gameId)) {
            alert("Este juego ya está en tu carrito.");
            return;
        }

        const gameToAdd = allGames.find(game => game.id === gameId);
        if (gameToAdd) {
            cart.push(gameToAdd);
            updateCart();
        }
    }

    function removeFromCart(gameId) {
        cart = cart.filter(item => item.id !== gameId);
        updateCart();
    }
    
    function updateCart() {
        // Actualizar el contenido visual del carrito
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.title}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-item-button" data-id="${item.id}">&times;</button>
            </div>
        `).join('');
        
        // Calcular y mostrar el total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        
        // Actualizar el contador del ícono
        cartCounter.textContent = cart.length;
        cartCounter.style.display = cart.length > 0 ? 'block' : 'none';
    }

    // --- EVENT LISTENERS ---
    
    // Para los botones "Añadir al Carrito"
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-button')) {
            const gameId = parseInt(event.target.getAttribute('data-id'));
            addToCart(gameId);
        }
        
        if (event.target.classList.contains('remove-item-button')) {
            const gameId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(gameId);
        }
    });

    // Para abrir y cerrar el modal del carrito
    cartIcon.addEventListener('click', () => cartModal.style.display = 'block');
    closeModalButton.addEventListener('click', () => cartModal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Para vaciar el carrito
    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    // --- INICIALIZACIÓN ---
    displayGames();
    cartCounter.style.display = 'none'; // Ocultar contador si está en 0
});