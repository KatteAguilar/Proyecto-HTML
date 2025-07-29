
        // Mobile menu toggle
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Shopping cart toggle
        const cartButton = document.querySelector('a[href="#"]:has(.fa-shopping-cart)');
        const cartModal = document.getElementById('cart-modal');
        const closeCart = document.getElementById('close-cart');

        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.remove('hidden');
        });

        closeCart.addEventListener('click', function() {
            cartModal.classList.add('hidden');
        });

        // Close cart when clicking outside
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.classList.add('hidden');
            }
        });

        // Product counter functionality
        document.querySelectorAll('.product-card button').forEach(button => {
            button.addEventListener('click', function() {
                const counter = document.querySelector('.fa-shopping-cart + span');
                let count = parseInt(counter.textContent);
                counter.textContent = count + 1;
                
                // Show notification
                const notification = document.createElement('div');
                notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn';
                notification.textContent = 'Producto añadido al carrito';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        });
    