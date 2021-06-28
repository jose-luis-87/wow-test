var data = '{"promociones":[{"1":{"img":"./shared/img/game2/promo1-1.svg","text":"Puedes llevarte en promoción los siguientes productos por <span>cinco monedas.</span>","correct":true},"2":{"img":"./shared/img/game2/promo1-2.svg","text":"Puedes llevarte en promoción los siguientes productos por <span>tres monedas.</span>","correct":false},"customer":"./shared/img/game2/customer1.svg"},{"1":{"img":"./shared/img/game2/promo2-1.svg","text":"Puedes llevarte en promoción los siguientes productos por <span>5 monedas.</span>","correct":true},"2":{"img":"./shared/img/game2/promo2-2.svg","text":"Puedes llevarte en promoción los siguientes productos por <span>7 monedas.</span>","correct":false},"customer":"./shared/img/game2/customer2.svg"},{"1":{"img":"./shared/img/game2/promo3-1.svg","text":"Puedes llevarte en promoción los siguientes productos por <span>20 monedas.</span>","correct":true},"2":{"img":"./shared/img/game2/promo3-2.svg","text":"Puedes llevarte en promoción los siguientes productos por <span>15 monedas.</span>","correct":false},"customer":"./shared/img/game2/customer3.svg"}]}';

var interval = null;
var PointsToWin = 0;
var arrayPromos = [];


function initGame(time,points){
    //interval = initTime(time,ResetGame);
    PointsToWin = points;

    var obj = $.parseJSON(data);
    
    $.each(obj.promociones, function (i, val) {
        arrayPromos.push(val); 
    });
    arrayPromos = arrayPromos.sort(() => Math.random() - 0.5)

    setPromo()
}

function setPromo(){
    if(arrayPromos.length==0){
        YouLose(ResetGame)
    }
    $(".customer").html("");
    let customer = '<img src="'+arrayPromos[0].customer+'" alt="customer"/>';
    $(customer).appendTo(".customer");
    
    let promos = [arrayPromos[0][1],arrayPromos[0][2]];
    promos = promos.sort(() => Math.random() - 0.5);
    $(".wrapperPromos").html("")
    $.each(promos, function (i, val) {
       let promo = '<img class="promo" data-correct="'+val.correct+'" data-text="'+val.text+'" src="'+val.img+'" alt="promo'+i+'"/>';
       $(promo).appendTo(".wrapperPromos");
    });
    $(".promo").on("click",function(){
        getPromo(this)
        $(".promo").removeClass("selected")
        $(this).addClass("selected")
    });
    arrayPromos.shift();
}

function getPromo(element){ 
   $(".textPromo").html(element.dataset.text)
   $(".globoPromo").fadeIn();
   $(".btnAceptar").data("correct",element.dataset.correct);
}

$(".btnAceptar").on("click",function(){
    checkPromo($(this).data().correct)
    $(".globoPromo").fadeOut();
})

function checkPromo(data){

    let _url = "";
    let _class = "";
    let _face = "";
    let _text = "";
    $(".globoCustomer>div").removeClass();

    if(data=="true"){
        _url = "./shared/img/game2/globoVerde.svg";
        _face = "./shared/img/game2/smile.svg";
        _text = "¡Me encanta la oferta!<span>¡Me la llevo!</span>";
        _class = "correct";
        clearInterval(interval)
        checkwin()
    }else if(data == "false"){
        _url = "./shared/img/game2/globoNaranja.svg";
        _face = "./shared/img/game2/sad.svg";
        _text = "<span>Mmm.. No me convence mucho esa oferta…</span>";
        _class = "incorrect";
        
        setTimeout(function(){
            $(".globoCustomer").fadeOut();
            setPromo()
        },1500)
    }
    $(".globoCustomer>div").addClass(_class);
    $(".globoCustomer>img").attr("src",_url);
    $(".globoCustomer>div>img").attr("src",_face);
    $(".textCustomer").html(_text);
    $(".globoCustomer").fadeIn();

}

function checkwin(){
    setTimeout(function(){
        WinGame(interval,PointsToWin,"Game2");
    },1500)
}

function ResetGame(){
    $(".globoPromo").fadeOut();
    $(".globoCustomer").fadeOut();
    initInstructions("Game2",initGame)
}

$(document).ready(function () {
    initInstructions("Game2",initGame);
});
