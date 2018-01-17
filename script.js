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
        data = JSON.parse(data);
        return data
    }

    function createProductBlock (i) {
        var param = [
            'general', 'horizontal', 'vertical', 'img', 'code', 'title', 'assocProducts',
            'status', 'button', 'unit', 'price', 'swapUnit'
        ];
        for (var j = 0; j < param.length; j++) {
            var str;
            var someBlock;

            str = param[j];

            someBlock = document.createElement('div');
            someBlock.className = str + 'Div';
            someBlock.id = str + 'Div' + i;
            if (j === 0) {
                document.getElementById('main-div').appendChild(someBlock);
            } else if (j === 1 || j === 2) {
                document.getElementById('generalDiv' + i).appendChild(someBlock);
            } else if (j <= 6) {
                document.getElementById('horizontalDiv' + i).appendChild(someBlock);
            } else {
                document.getElementById('verticalDiv' + i).appendChild(someBlock);
            }
        }
    }

    function createProductImg (i, data) {
        var img;
        var type;
        type = data["primaryImageUrl"].substr(data["primaryImageUrl"].length - 4, data["primaryImageUrl"].length);
        img = document.createElement('img');
        img.className = 'productImg';
        img.src = data["primaryImageUrl"].slice(0, data["primaryImageUrl"].length - 4) + '_220x220_1' + type;
        document.getElementById('imgDiv' + i).appendChild(img);
    }

    function createProductCode (i, data) {
        var code;
        code = document.createElement('span');
        code.className = 'productCode';
        code.innerHTML = 'Код: ' + data["code"];
        document.getElementById('codeDiv' + i).appendChild(code);
    }

    function createStatus (i) {
        var span;
        span = document.createElement('span');
        if (i % 13 !== 0) {
            span.className = 'statusOn';
            span.innerHTML = 'В наличии';
        } else {
            span.className = 'statusOff';
            span.innerHTML = 'Нет в наличии';
        }
        document.getElementById('statusDiv' + i).appendChild(span);
    }


    function createProductTitle (i, data) {
        var title;
        title = document.createElement('span');
        title.className = 'productTitle';
        title.innerHTML = data["title"];
        document.getElementById('titleDiv' + i).appendChild(title);
    }

    function createAssocProducts (i, data) {
        var assocProducts;
        var assocProduct;
        var str = '';
        var strData = data['assocProducts'];
        assocProducts = document.createElement('span');
        assocProducts.innerHTML = '<b>Могут понадобиться: </b>';
        document.getElementById('assocProductsDiv' + i).appendChild(assocProducts);

        for (var j = 0; j < strData.length; j++) {
            if (strData[j] !== ";") {
                str += strData[j];
            } else if (strData[j] === ';') {
                (j !== strData.length - 1) ? str += ", " : str += '.';
                assocProduct = document.createElement('a');
                assocProduct.href = '#';
                assocProduct.className = 'link';
                assocProduct.innerHTML = str;
                document.getElementById('assocProductsDiv' + i).appendChild(assocProduct);
                str = '';
            }
        }

    }

    function createBuyButton (i, data) {
        var button;
        var stepperDiv;
        var stepperUp;
        var stepperDown;
        var stepperInput;

        stepperDiv = document.createElement('div');
        stepperDiv.className = 'stepperDiv';
        stepperDiv.id = 'stepperDiv' + i;

        button = document.createElement('span');
        button.className = 'button';
        button.innerHTML = 'В Корзину';
        button.setAttribute('data-product-id', data['productId']);

        stepperInput = document.createElement('input');
        stepperInput.className = 'stepperInput';
        stepperInput.type = 'text';
        stepperInput.value = '1';

        stepperDown = document.createElement('span');
        stepperDown.className = 'stepperDown';

        stepperUp = document.createElement('span');
        stepperUp.className = 'stepperUp';

        document.getElementById('buttonDiv' + i).appendChild(stepperDiv);
        document.getElementById('stepperDiv' + i).appendChild(stepperInput);
        document.getElementById('stepperDiv' + i).appendChild(stepperUp);
        document.getElementById('stepperDiv' + i).appendChild(stepperDown);
        document.getElementById('stepperDiv' + i).appendChild(button);
    }

    function createUnit (i, data) {
        var formulSpan;
        var textSpan;
         textSpan = document.createElement('span');
         textSpan.className = 'textSpan';

         formulSpan = document.createElement('span');
         formulSpan.className = 'formulSpan';

         if (data["unit"] === data["unitAlt"]) {
             textSpan.innerHTML = 'Продаётся только ' + data["unit"];
             document.getElementById('unitDiv' + i).appendChild(textSpan);
         } else if (data["unit"] === "шт.") {
             textSpan.innerHTML = 'Продаётся поштучно ';
             formulSpan.innerHTML = '1 шт. = ' + data["unitRatioAlt"] + data["unitAlt"];

             document.getElementById('unitDiv' + i).appendChild(textSpan);
             document.getElementById('unitDiv' + i).appendChild(formulSpan);
         } else if (data["unit"] === "упак.") {
             textSpan.innerHTML = 'Продаётся упаковками ';
             formulSpan.innerHTML = '1 уп. = ' + data["unitRatioAlt"] + data["unitAlt"];

             document.getElementById('unitDiv' + i).appendChild(textSpan);
             document.getElementById('unitDiv' + i).appendChild(formulSpan);
         } else if (data["unit"] === "м. кв.") {
             textSpan.innerHTML = 'Продаётся квадратными метрами ';
             formulSpan.innerHTML = '1 м. кв. = ' + data["unitRatioAlt"] + data["unitAlt"];

             document.getElementById('unitDiv' + i).appendChild(textSpan);
             document.getElementById('unitDiv' + i).appendChild(formulSpan);
         } else if (data["unit"] === "м/п") {
             textSpan.innerHTML = 'Продаётся погонными метрами ';
             formulSpan.innerHTML = '1 м. п. = ' + data["unitRatioAlt"] + data["unitAlt"];

             document.getElementById('unitDiv' + i).appendChild(textSpan);
             document.getElementById('unitDiv' + i).appendChild(formulSpan);
         }

    }

    function createSwapUnitBlock (i, data) {
        var div1;
        var div2;
        var p1;
        var p2;

        div1 = document.createElement('div');
        div2 = document.createElement('div');
        div1.className = 'unit active-unite';
        div2.className = 'unit';

        p1 = document.createElement('p');
        p2 = document.createElement('p');
        p1.className = 'unit-text';
        p2.className = 'unit-text';
        p1.innerHTML = 'За ' + data["unit"];
        p2.innerHTML = 'За ' + data["unitAlt"];

        document.getElementById('swapUnitDiv' + i).appendChild(div1);
        document.getElementById('swapUnitDiv' + i).appendChild(div2);
        div1.appendChild(p1);
        div2.appendChild(p2);
    }

    function createPriceBlock (i, data) {
        var priceGold;
        var price;
        var priceDiscond;

        priceGold = document.createElement('p');
        priceGold.className = 'price_gold';
        priceGold.innerHTML = 'По карте <br> клуба ' + data["priceGold"] + 'руб.';

        price = document.createElement('p');
        price.className = 'price';
        price.innerHTML = data["priceRetail"] + 'руб.';

        priceDiscond = document.createElement('p');
        priceDiscond.className = 'bonus-price';
        priceDiscond.innerHTML = 'Можно купить за ' + data["priceGold"] + ' бонуса.';

        document.getElementById('priceDiv' + i).appendChild(priceGold);
        document.getElementById('priceDiv' + i).appendChild(price);
        document.getElementById('priceDiv' + i).appendChild(priceDiscond);
    }

    function init() {
        var data;
        data = getDataFromJSON();
        for (var i = 0; i < data.length; i++) {
            createProductBlock(i);
            createProductImg(i, data[i]);
            createProductCode(i, data[i]);
            createStatus(i);
            createProductTitle(i, data[i]);
            createAssocProducts(i, data[i]);
            createBuyButton(i, data[i]);
            createUnit(i, data[i]);
            createSwapUnitBlock(i, data[i]);
            createPriceBlock(i, data[i]);
        }
    }

    window.onload = init;
})();