var dataGame = '{"productos":[{"url":"./shared/img/game6/pan1.svg","deg":"0","tipo":"pan1"},{"url":"./shared/img/game6/pan2.svg","deg":"0","tipo":"pan2"},{"url":"./shared/img/game6/pan3.svg","deg":"0","tipo":"pan3"}]}';

var interval = null;
var PointsToWin = 0;
var arrayProductos = [];
var _toWin = 0;

function initGame(time,points){
    //interval = initTime(time,ResetGame);
    PointsToWin = points;
    
    var obj = $.parseJSON(dataGame);
    

    $.each(obj.productos, function (i, val) {
        var clone = '<div data-deg="' + val.deg + '" data-tipo="' + val.tipo + '" class="panGral"><img src="' + val.url + '" alt="pan"></div>';
        arrayProductos.push(clone); 
    });
    arrayProductos = arrayProductos.sort(() => Math.random() - 0.5)


    newPiece()
}

function newPiece(side=null){

   let element = $(arrayProductos[0]);
   let _side = side;
   let _class = "";
   let tipo = element.data().tipo;
   let rotations = [0,90,180,270,360]

   if(_side == null){
       _side = Math.floor((Math.random() * 2) + 1);
   }

   _class = "left";
   if(_side == 2)
    _class = "right";

   
   element.addClass(_class);
   element.attr("id",tipo+_class)
   
   let _deg = rotations[Math.floor(Math.random() * rotations.length)];
   rotateElem(element,_deg)
   element.on('click',function(){
        rotateElem($(this));
    });
   element.appendTo(".gameZone");
   animate($(".panGral."+_class))
}
function rotateElem(Element,deg=null){

    let _deg = Element.data().deg;
    console.log(_deg+"deg")
    if(deg != null)
        _deg = deg

    let newRot = parseInt(_deg) + 90;

    $(Element).css({'transform' : 'rotate('+ newRot+'deg)'});
    Element.data("deg",newRot);

}

function animate(element){
    let first = true;
    element.animate({
        bottom :"3.73%"
        },
        {
        duration : 3000,
        specialEasing: {
            bottom: "linear"
        },
        step : function(){
            let goal = parseInt(document.getElementById("goalLine").getBoundingClientRect().bottom);
            let actual = parseInt(this.getBoundingClientRect().bottom);
            
            if(actual>=goal || actual+10>=goal || actual-5>=goal){
                $(this).stop();
                if(first){
                    first = !first;
                    checkPosition(element)
                }
                
            }
        }       
      });
}

function RemoveItem(element){

    element.animate({
        opacity: 0,
        now: '-=90'
    },
    {
    duration : 500,
    step(now){
        $(this).css('transform','rotate('+now+'deg)'); 
    },
    complete : function(){
        element.remove();        
    }
  });
      
}
var correct = 0;

function checkPosition(element){
    
    let goal = document.getElementById("goalLine");
    let actual = document.getElementById(element.attr("id"));
    let _goal = goal.getBoundingClientRect();
    let _actual = actual.getBoundingClientRect();

    let side = actual.classList[1];
    
    let rot = element.data().deg;
    let position = ((parseInt(rot)/360) % 1 == 0);
    
    
    if(side== "left"){
        if(parseInt(_goal.left) == parseInt(_actual.left) && position){
            
            setTimeout(()=>{
                $(actual).css('bottom','3.73%');
            },50)
            correct ++;
            if(correct < 2){
                setTimeout(()=>{
                    newPiece(2)
                },500)
            }

        }else{
            RemoveItem(element)
            setTimeout(()=>{
                newPiece(1)
            },500)
        }
    }else if(side=="right"){
        
        if(parseInt(_goal.right) == parseInt(_actual.right) && position){  
            
            setTimeout(()=>{
                $(actual).css('bottom','3.73%');
            },50)      
            correct ++;
            if(correct < 2){
                setTimeout(()=>{
                    newPiece(1)
                },500)
            }
        }else{
            RemoveItem(element)
            setTimeout(()=>{
                newPiece(2)
            },500)
        }
    }

    if(correct == 2){
        _toWin++;
        $(".gameZone").addClass("win");
        let id = element.data().tipo;
        $("#"+id+" img").fadeIn();
        correct = 0
        arrayProductos.shift();
       if(arrayProductos.length > 0)
            setTimeout(()=>{
                $(".panGral").remove();
                $(".gameZone").removeClass("win");
                newPiece()
            },500)

    }
   checkwin()
}



function checkwin(){
    if(_toWin == 3)
        setTimeout(function(){
            WinGame(interval,PointsToWin,"Game6");
        },1000)
}

function ResetGame(){
    $(".panGral").remove();
    $(".gameZone").removeClass("win");
    $(".row img").hide();
    correct = 0;
    _toWin = 0;
    initInstructions("Game6",initGame)
}

$(document).ready(function () {
    initInstructions("Game6",initGame)
});
