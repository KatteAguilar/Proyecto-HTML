document.addEventListener('DOMContentLoaded', function() {
    localStorage.clear();
}); 
        
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
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartModal.querySelector('h3').textContent = "Tu Carrito ("+cartItems.length+")";
    const cartList = cartModal.querySelector('div .space-y-4');
    cartList.innerHTML = ''; // Clear previous items
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'flex border-b pb-4';
        cartItem.innerHTML = `<img src="${item.imagen}" alt="Imagen" class="w-20 h-20 object-cover rounded">
                            <div class="ml-4 flex-grow">
                                <h4 class="font-medium">${item.nombre}</h4>
                                <div class="flex justify-between items-center mt-2">
                                    <span class="font-bold">$${item.precio.replace('$', '')}</span>
                                    <div class="flex items-center border rounded">
                                        <button class="px-2 py-1 text-gray-500 hover:bg-gray-100">-</button>
                                        <span class="px-2"> ${item.cantidad} </span>
                                        <button class="px-2 py-1 text-gray-500 hover:bg-gray-100">+</button>
                                    </div>
                                </div>
                            </div>`;
        cartList.appendChild(cartItem);
    });

    //Carcular el Total
    const total = cartItems.reduce((acc, curr) => acc + (parseFloat(curr.precio.replace('$', '')) * curr.cantidad), 0);
    cartModal.querySelector('.lb-price').innerHTML = `$${total.toFixed(2)}`;
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

        // Store product data in localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        //Buscar datos del producto agregado
        const tarjeta = this.closest('.product-card');
        const imagen = tarjeta.querySelector('img').src;
        const nombre = tarjeta.querySelector('h3').textContent;
        const precio = tarjeta.querySelector('span').textContent;
        const item = {
            imagen,
            nombre,
            precio,
            cantidad: 1
        };
        // Verificar si el producto ya existe en el carrito
        const ItemIndex = cartItems.findIndex(i => i.nombre == item.nombre);
        (ItemIndex > -1 ? cartItems[ItemIndex].cantidad += 1 : cartItems.push(item));
        
        // Guardar los datos actualizados en localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));  
        //console.log(cartItems)
        
        // Update cart item count
        const counter = document.querySelector('.fa-shopping-cart + span');
        counter.textContent = cartItems.length; 

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
    
      