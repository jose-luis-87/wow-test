var interval = null;
var PointsToWin = 0;

function initGame(time,points){
    //interval = initTime(time,ResetGame);
    PointsToWin = points;
    animate($(".tiraColor"),10)
}

function animate(element,top){
    element.animate({
        top :top+"%"
        },{
        duration : 1800,
        specialEasing: {
            top: "linear"
        },
        complete : function () {
            animate(element,top == 90 ? 10 : 90)
        }
      });
}

function checkwin(){
    let _color = $(".tiraColor");
    let _gris = $(".tiraGris");
    let sparkles = $(".sparkles");
    _color.stop();
    let correctPos = _gris.position().top;
    let actualPos =_color.position().top;
    let correctPosUp = parseInt(correctPos+15)
    let correctPosDown = parseInt(correctPos-15)

    if(actualPos >= correctPosDown && actualPos <= correctPosUp){
        $(".rack").off("click");
        clearInterval(interval)
        _color.addClass("win");
        _gris.addClass("win");
        sparkles.addClass("start");
        _color.position.top = _gris.position.top;
        setTimeout(()=>{
            WinGame(interval,PointsToWin,"Game3");
        },3000)
    }else{
        _color.addClass("lose");
        setTimeout(()=>{
            animate(_color,10);
            _color.removeClass("lose");
        },500)
    }
}

function ResetGame(){
    $(".tiraColor").stop();
    initInstructions("Game3",initGame)
}

$(document).ready(function () {
    initInstructions("Game3",initGame);
    $(".rack").on("click", checkwin);
});
