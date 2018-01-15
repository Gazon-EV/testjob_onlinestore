/**
 * Created by Евгений on 15.01.2018.
 */ 
(function () {

    function getDataFromJSON () {
        var data;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'products.json', false);
        xhr.send();
        data = xhr.response;
        return data
    }

    function createProductBlock (i) {
        var param = ['general', 'img', 'code', 'title', 'assocProducts', 'button', 'unit', 'swapUnit', 'price', 'stepper'];
        for (let j = 0, j < param.length , j++) {
            let str = param[j];
            let someBlock = document.createElement(str);
            someBlock.className = str + 'Div';
            someBlock.id = str + 'Div' + i;
            document.appendChild(someBlock);

        }
    }

    function createProductImg (i, data) {
        var img;
        img = document.createElement('img');
        img.className = 'productImg';
        img.src = data["primaryImageUrl"];
        document.getElementById('imgDiv' + i).appendChild(img);
    }

    function createProductCode (i, data) {
        var code;
        code = document.createElement('span');
        code.className = 'productCode';
        code.innerHTML = data["code"];
        document.getElementById('code' + i).appendChild(code);
    }

    function createProductTitle (i, data) {
        var title;
        title = document.createElement('span');
        title.className = 'productTitle';
        title.innerHTML = data["title"];
        document.getElementById('codeDiv' + i).appendChild(title);
    }

    function createAssocProducts (i, data) {
        var assocProducts;
        assocProducts = document.createElement('span');


    }
})();