window.addEventListener('load', () => {
    const catalog = document.querySelector('.catalog');
    const cart = document.querySelector('.cart');
    const count = document.querySelector('.count');
    const sum = document.querySelector('.sum');
    let index1 = 0, index2 = 0;


    for (let i = 0; i < cardsData.length; i++) { // создаем каталог
        const elem = createCard(cardsData[i]);
        catalog.append(elem);
    }

    function getCart(prod) { // функция вывода карточки товара в корзине
        let cartItem = makeElement('div', 'cart_element');

        let picture = makeElement('img', 'cart_img');
        picture.src = prod.imgUrl;
        picture.alt = prod.title + ' picture';
        picture.width = 300;
        picture.height = 360;
        cartItem.appendChild(picture);

        let tittle = makeElement('p', 'cart_tittle', prod.title);
        cartItem.appendChild(tittle);

        let text = makeElement('p', 'cart_text', prod.text);
        cartItem.appendChild(text);
        
        let price = makeElement('p', 'cart_price', prod.price);
        cartItem.appendChild(price);

        return cartItem;
    }

    function createCard(product) { // функция создания карточки товара для каталога
        let listItem = makeElement('div', 'product_card');
    
        let pictureBox = makeElement('div',);
    
        let picture = makeElement('img', 'product_card-img');
        picture.src = product.imgUrl;
        picture.alt = product.title + ' picture';
        picture.width = 300;
        picture.height = 360;
        listItem.appendChild(picture);
    
        let textBox = makeElement('div', 'product_card-text');
      
        let text = makeElement('p', 'box_text', product.title);
        textBox.appendChild(text);
        
        let price = makeElement('p', 'box_price', product.price);
        textBox.appendChild(price);

        let btn = makeElement('button', 'btn');
        btn.innerHTML = 'Купить';
        textBox.appendChild(btn); 

        listItem.appendChild(textBox);
      
        return listItem;
    };

    function makeElement(tagName, className, text) { // функция для создания элемента DOM
        let element = document.createElement(tagName);
    
        if (className) element.classList.add(className);
        
        if (text) element.textContent = text;
    
        return element;
    };


    const btn = document.querySelector('.catalog');

    
    btn.addEventListener('click', (evt) => { // по клику на картачку складываем товар в корзину
        if (evt.target.tagName != 'BUTTON') {
            return;
        }
        
        const name = evt.target.parentNode.firstChild.innerHTML;
        
        for (let j = 0; j < cardsData.length; j++) {
            if (name === cardsData[j].title) {
                index1++;
                index2 += +cardsData[j].price.slice(1);
                count.innerHTML = index1;
                sum.innerHTML = index2;
                cart.append(getCart(cardsData[j]));
            }
            
        }      
        
    });

})

let cardsData = [
    {
        imgUrl: 'shop_img/box_img-1.jpg',
        title: 'ELLERYO CAPSULE',
        text: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
        price: '$200.00'
    },
    {
        imgUrl: 'shop_img/box_img-2.jpg',
        title: 'ELLERY X CAPSULE',
        text: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi. Ellery teams up with Moda Operandi.',
        price: '$150.00'
    },
    {
        imgUrl: 'shop_img/box_img-3.jpg',
        title: 'ELLERY X O CAPSULE',
        text: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi. Known for her sculptural takes on traditional tailoring. Known for her sculptural takes on traditional tailoring',
        price: '$250.00'
    }
];