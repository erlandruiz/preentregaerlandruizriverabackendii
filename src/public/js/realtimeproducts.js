
console.log(`Hola en REALTIMEPRODUCTS`)

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.querySelector('.product-list');
    const products = productList.querySelectorAll('.product-item');
    
    if (products.length === 1) {
        productList.classList.add('justify-content-center');
    }
});