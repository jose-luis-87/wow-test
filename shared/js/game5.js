var data = '{"productos":[{"number":14,"url":"shared/img/game5/pan1_good.svg","deg":"0","tipo":"1"},{"number":13,"url":"shared/img/game5/pan2_good.svg","deg":"0","tipo":"2"}]}';

var interval = null;
var PointsToWin = 0;
var leftToSuit = 2;
var rotateToSuit =1;
var toWin = [];
var toWinIndex = 3;


function initGame(time,points){
    //interval = initTime(time,ResetGame);
    PointsToWin = points;
    let arrayProductos1 = [];
    let arrayProductos2 = [];

    var obj = $.parseJSON(data);

    //Se crean y asignan los productos 
    $.each(obj.productos, function (i, val) {
        for (let index = 0; index < val.number; index++) {
           
            var clone = '<div tabindex="0" data-deg="' + val.deg + '" data-tipo="' + val.tipo + '" class="panGral"><div><img src="' + val.url + '" alt="pan"></div></div>';
            
            if(i < 1){
                arrayProductos1.push(clone);
            }else{
                arrayProductos2.push(clone);
            }
            
        }
    });

    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 9; j++) {
            $(arrayProductos1[0]).appendTo("#section" + i + " .gameZone");
            arrayProductos1.shift();
        }
    }
    for (let i = 3; i > 1 ; i--) {
        for (let j = 0; j < 9; j++) {
            $(arrayProductos2[0]).appendTo("#section" + i + " .gameZone");
            arrayProductos2.shift();
        }
    }


    //se obtienen los hijos ya colocados para poner los incorrectos
    let children = [];
    for (let i = 1; i < 4; i++) children.push($("#section" + i + " .gameZone").children());
    let arrayRandom = [];
    let arrayElegibles = [];
    let index;
    for (let j = 0; j < 3; j++) {
        let Elegibles = [];
        for (index = 0; index < children[j].length; index++) Elegibles[index] = index;
        arrayElegibles.push(Elegibles)
    };

    //se asigna random el productomal rotado en X
    for (let j = 0; j < 3; j++) {
        let ran = []
        for (i = 0; i < leftToSuit; i++) {
            let r = Math.floor(Math.random() * arrayElegibles[j].length);
            ran.push(children[j][arrayElegibles[j][r]]);
            arrayElegibles[j].splice(r, 1);
          }
          arrayRandom.push(ran)
    };

    $.each(arrayRandom, function (i,val) {
        for (let i = 0; i < val.length; i++) {         
            rotateElem(val[i])
        }
    });


    //se asigna el producto mal rotado en Y
    arrayRandom = [];

    for (let j = 0; j < 3; j++) {
        let ran = []
        for (i = 0; i < rotateToSuit; i++) {
            let r = Math.floor(Math.random() * arrayElegibles[j].length);
            ran.push(children[j][arrayElegibles[j][r]]);
            arrayElegibles[j].splice(r, 1);
          }
          arrayRandom.push(ran)
    };

    $.each(arrayRandom, function (i,val) {
        for (let i = 0; i < val.length; i++) {  
            let elem = val[i]
            elem.dataset.rotate = "Y";    
            let newsrc = $(elem).find("img")[0].src;
            let tipo = elem.dataset.tipo;
            newsrc =  newsrc.substring(0,newsrc.indexOf("5/")+2)+"pan"+tipo+"_top.svg"
            $(elem).find("img")[0].src = newsrc;
            $(elem).css({'transform' : 'scaleX(-1)'});

        }
    });


    $(".panGral").on('click',function(){
        rotateElem(this)
        $(this).focus();
        checkGameZones()
    });

}

function rotateElem(Element){
    let giro = Element.dataset.rotate;
    let rot = Element.dataset.deg;
    let newRot = parseInt(rot) + 180;

    if(giro == "Y"){
        $(Element).css({'transform' : 'scaleX(-1) rotateY('+ newRot+'deg)'});
        changeImg(Element)
        Element.dataset.deg = newRot;
        
    }else{
        $(Element).css({'transform' : 'rotate('+ newRot+'deg)'});
        Element.dataset.deg = newRot;
    }
}
function changeImg(Element){

    let newsrc = $(Element).find("img")[0].src;
    let tipo = Element.dataset.tipo;
    let rot = Element.dataset.deg;
    
    let toogle = ((parseInt(rot)/360) % 1 == 0)
        newsrc =  newsrc.substring(0,newsrc.indexOf("5/")+2)+"pan"+tipo+"_good.svg";
    if(!toogle){
        newsrc =  newsrc.substring(0,newsrc.indexOf("5/")+2)+"pan"+tipo+"_top.svg";
    }
    $(Element).find("img")[0].src = newsrc;

}

function checkGameZones() {
    let _gameZones = $(".gameZone");
    $.each(_gameZones, function (i, val) {
        checkRotate($(val))
    });
}
function checkRotate(gameZone){

    let children = gameZone.children();
    let key = [];

    $.each(children, function (i, val) {
        let rot = val.dataset.deg;
        let giro = val.dataset.rotate;
        let orientation = ((parseInt(rot)/360) % 1 == 0);
        
        if(giro == "Y")
            orientation = (((   parseInt(rot)+180)/360) % 1 == 0);
           
           
        key.push(orientation)
    });


    if (!key.includes(false))
        if (!toWin.includes(gameZone.parent().attr('id')))
            toWin.push(gameZone.parent().attr('id'))

    checkwin();
}

function checkwin(){
    
    if (toWin.length == toWinIndex)
        setTimeout(() => {
            WinGame(interval,PointsToWin,"Game5");
        }, 500);
}

function ResetGame(){
    $(".gameZone").html("");
    initInstructions("Game5",initGame)
}

$(document).ready(function () {
    initInstructions("Game5",initGame)
});
