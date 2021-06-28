var data = '{"elements":[{"rack":"shared/img/game11/hallow_rack.svg","head":"shared/img/game11/hallow_head.svg","person":"shared/img/game11/hallow_body.svg","data":"hallow"},{"rack":"shared/img/game11/beach_rack.svg","head":"shared/img/game11/beach_head.svg","person":"shared/img/game11/beach_body.svg","data":"beach"},{"rack":"shared/img/game11/child_rack.svg","head":"shared/img/game11/child_head.svg","person":"shared/img/game11/child_body.svg","data":"child"},{"rack":"shared/img/game11/soccer_rack.svg","head":"shared/img/game11/soccer_head.svg","person":"shared/img/game11/soccer_body.svg","data":"soccer"},{"rack":"shared/img/game11/xmas_rack.svg","head":"shared/img/game11/xmas_head.svg","person":"shared/img/game11/xmas_body.svg","data":"xmas"}]}';
var arrayHeads = [];
var arrayRacks = [];
var correct = 0;
var interval = null;
var PointsToWin = 0;

function initGame(time,points){
    //interval = initTime(time,ResetGame);
    PointsToWin = points;

    initDraggable();

}

function LoadObjects(){
    var obj = $.parseJSON(data);
    $.each(obj.elements, function (i, val) {
        var clone = '<div data-correct="'+val.data+'" class="commondrag"><img src="'+val.head+'" alt="'+val.data+'_head"></div>';
        arrayHeads.push(clone);         
        var clone_rack = '<div data-correct="'+val.data+'" data-last="" class="dropZone"><img class="rack_'+val.data+'" src="'+val.rack+'" alt="'+val.data+'_rack"><img class="person" src="" alt="person"><div class="sparkles_left sparkles"><div><span></span><span></span><span></span></div></div><div class="base"></div><div class="sparkles_right sparkles"><div><span></span><span></span><span></span></div></div></div>';
        arrayRacks.push(clone_rack); 
    });

    arrayHeads = arrayHeads.sort(() => Math.random() - 0.5);
    arrayRacks = arrayRacks.sort(() => Math.random() - 0.5);

    
    for (let i = 0; i < arrayHeads.length; i++) {
        $(arrayHeads[i]).appendTo(".wrapperDrags");
    }
    for (let i = 0; i < 3; i++) {
        $(arrayRacks[i]).appendTo(".wrapperDrops");
    }
}

function initDraggable(){
    $(".commondrag").draggable({
        revert: true,
        helper: "clone",
        classes: {
            "ui-draggable-dragging": "highlight"
        },
        drag: function (ui) {
            $(this).addClass("select");
        },
        stop: function () {
            $(this).removeClass("select");
        }
    });
    $(".dropZone").droppable(({
        disabled: false,
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            let _drag = $(ui.draggable);
            let _drop = $(this);
            let drag_correct = $(ui.draggable).data().correct;
            let drop_correct = $(this).data().correct;
            let last = $(this).data().last;
            
            $(".wrapperDrags").find(`[data-correct='${last}']`).removeAttr("style");
            $(".wrapperDrags").find(`[data-correct='${last}']`).draggable('enable');
            $(_drag).draggable('disable');
            $(ui.helper).remove();
            
            $(_drag).css("opacity","0.5");
            $(_drop).find(".person").removeClass("person_"+last);
            $(_drop).find(".person").addClass("person_"+drag_correct);
            $(_drop).find(".person")[0].src = "shared/img/game11/"+drag_correct+"_body.svg";
            $(_drop).find(".person").fadeIn();
            
            $(_drop).data({"last":drag_correct})

            checkDrop(drop_correct,drag_correct,_drop)
        }
    }));    
}

function checkDrop(_drop,_drag,dropzone){
    if(_drop == _drag){
        $(dropzone).find(".base").addClass('correct');
        $(dropzone).droppable('disable');
        $(dropzone).addClass("win")

        correct++;
    }
    checkwin();
}


function checkwin(){
    if(correct == 3){
        clearInterval(interval)
        setTimeout(()=>{
            WinGame(interval,PointsToWin,"Game11");
        },2000)
        
    }
}

function ResetGame(){
    $(".wrapperDrags").empty()
    $(".wrapperDrops").empty()
    arrayHeads= [];
    arrayRacks = [];
    correct = 0;
    initInstructions("Game11",initGame);
    LoadObjects();

}

$(document).ready(function () {
    initInstructions("Game11",initGame)
    LoadObjects();
});
