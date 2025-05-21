// 商品データ
const products = [
    {
        id: 1,
        name: "マカロン",
        price: 1200,
        image: "img/chocolate_gallery-01.jpg"
    },
    {
        id: 2,
        name: "ドーナツ",
        price: 980,
        image: "img/chocolate_gallery-02.jpg"
    }
];

// カートの状態
let cart = [];

// 初期化関数
function initialize() {
    renderProducts();
    updateCart();
}

// 商品一覧を表示
function renderProducts() {
    const productsContainer = document.getElementById('products-container');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const quantity = getProductQuantity(product.id);

        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="product-price">¥${product.price.toLocaleString()}</div>
        <div class="quantity-controls">
            <button class="quantity-button" onclick="decreaseQuantity(${product.id})" ${quantity === 0 ? 'disabled' : ''}>-</button>
            <span class="quantity-display">${quantity}</span>
            <button class="quantity-button" onclick="increaseQuantity(${product.id})">+</button>
        </div>
        `;

        productsContainer.appendChild(productElement);
    });
}

// 商品数量を取得
function getProductQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
}

// 商品数量を増やす
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex >= 0) {
        // 既存アイテムの数量を増やす
        cart[existingItemIndex].quantity += 1;
    } else {
        // 新しいアイテムをカートに追加
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
    updateProductQuantity(productId);
}

// 商品数量を減らす
function decreaseQuantity(productId) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex >= 0) {
        if (cart[existingItemIndex].quantity > 1) {
            // 数量が1より多い場合は減らす
            cart[existingItemIndex].quantity -= 1;
        } else {
            // 数量が1の場合はカートから削除
            cart.splice(existingItemIndex, 1);
        }

        updateCart();
        updateProductQuantity(productId);
    }
}

// 商品の数量表示を更新
function updateProductQuantity(productId) {
    const productElement = document.querySelector(`.product:nth-child(${products.findIndex(p => p.id === productId) + 1})`);
    if (!productElement) return;

    const quantity = getProductQuantity(productId);
    const quantityDisplay = productElement.querySelector('.quantity-display');
    const decreaseButton = productElement.querySelector('.quantity-button:first-child');

    quantityDisplay.textContent = quantity;

    if (quantity === 0) {
        decreaseButton.disabled = true;
    } else {
        decreaseButton.disabled = false;
    }
}

// カートを更新
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const totalAmountElement = document.getElementById('total-amount');

    // カートアイテムを表示
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">カートは空です。</div>';
        cartTotalElement.style.display = 'none';
    } else {
        let cartHTML = '';
        let totalAmount = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            cartHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    ${item.name} (¥${item.price.toLocaleString()} × ${item.quantity})
                </div>
                <div class="cart-item-total">¥${itemTotal.toLocaleString()}</div>
            </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        totalAmountElement.textContent = `¥${totalAmount.toLocaleString()}`;
        cartTotalElement.style.display = 'flex';
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', initialize);
