var interval = null;
var PointsToWin = 0;
var timeoutID;
var tirasM=3;
var tirasV=3;

function initGame(time,points){
    interval = initTime(time,ResetGame);
    PointsToWin = points;

    $(".countMorado").html("x"+tirasM);
    $(".countVerde").html("x"+tirasV);

    setTimeout(() => {
       rotateRack(-1)
    }, 500);
    initDraggable();
    
}

function initDraggable(){
    
    $(".tira").draggable({
        revert:true,
        helper: "clone",
        classes: {
            "ui-draggable-dragging": "highlight"
        },
        start: function() {
            $(".dropFace").droppable("enable");
        }
       
    });
    $(".tira").draggable('enable');
    $(".dropFace").droppable(({
        disabled: true,
        over: function(){
            $(this).droppable("enable");
        },
        drop: function (event, ui) {
            
            if ($(this).children().length < 3) {

                let _drag = $(ui.draggable);
                let _drop = $(this);
                ui.helper.remove();
                let data_tipo = $(ui.draggable).data().tipo;
                
                switch(data_tipo){
                    case "M":
                        tirasM--;
                    break;
                    case "V":
                        tirasV--;
                    break;
                }

                if(tirasM == 0){
                    $(".tiraM").draggable('disable');
                    $(".tiraM").addClass("select");
                }
                if(tirasV == 0){
                    $(".tiraV").draggable('disable');
                    $(".tiraV").addClass("select");
                    
                }

                let clone = $(_drag).clone();
                clone.removeAttr('style').removeClass().addClass('tira').appendTo(_drop);
                            
                checkwin();
            }
            if ($(this).children().length == 3){

                $(this).addClass("complete");
                $(this).parent().addClass("complete");

            }

        }
    }));  
   /*  $("#dropBlock").droppable(({
        over: function(){
            $(".dropFace").droppable("disable");
        },
        out:function(){
            $(".dropFace").droppable("enable");
        },
    })); */

}


function rotateRack(rotate){
    rotate = rotate*-1;
    $(".cube").css("transform", "rotateY("+50*rotate+"deg)")
    timeoutID = setTimeout(() => {
        rotateRack(rotate);
    }, 3000);
}


function checkwin(){

    $(".countMorado").html("x"+tirasM);
    $(".countVerde").html("x"+tirasV);

    if(tirasV==0&&tirasM==0){
        clearInterval(interval)
        setTimeout(() => {
            WinGame(interval,PointsToWin,"Game8");
        }, 1000);
    }
}

function ResetGame(){
    window.clearTimeout(timeoutID);
    $(".dropFace").html("").removeClass("complete");
    $(".cube").removeAttr("style");
    $(".cube_face").removeClass("complete");
    $(".tira").removeClass("select");
    tirasV=3;
    tirasM=3;
    setTimeout(() => {
        initInstructions("Game8",initGame)
    }, 500);
    
}

$(document).ready(function () {
    initInstructions("Game8",initGame)
});
