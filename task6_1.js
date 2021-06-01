window.addEventListener('load',() => {
    const img = document.querySelector('.smal-img');
    const div = img.nextElementSibling;

    let bigImage = document.createElement('img');       
    div.append(bigImage);

    img.addEventListener('click', (evt) => { 
        let imgUrl = evt.target.getAttribute('src');
        if (imgUrl) {
            const arr = imgUrl.split('/');
            bigImage.src = `big/${arr[1]}`; 
        }             
    });

    bigImage.addEventListener('error', () => {
        div.innerHTML = 'Изображение отсутствует';
    });
});