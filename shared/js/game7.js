var data = '[{"elements":[{ "recurso":"./shared/img/game7/quesos.svg","drop":"./shared/img/game7/quesos.svg","data":"quesos"},{"recurso":"./shared/img/game7/burgers.svg","drop":"./shared/img/game7/burgers.svg","data": "burgers"},{"recurso":"./shared/img/game7/jalea.svg","drop":"./shared/img/game7/jalea.svg","data": "jalea"},{"recurso": "./shared/img/game7/Soda.svg","drop": "./shared/img/game7/Soda.svg","data": "soda"}]},{"frames":[{"ref":"./shared/img/game7/toast.svg","data":"jalea"},{"ref":"./shared/img/game7/papas.svg","data":"soda"},{"ref":"./shared/img/game7/buns.svg","data":"burgers"}]}]';
var arrayDrags = [];
var arryDrops = [];
var arrayFrames = []
var interval = null;
var PointsToWin = 0;

function initGame(time, points) {
    //interval = initTime(time,ResetGame);
    PointsToWin = points;
    var obj = $.parseJSON(data);

    $.each(obj[0].elements, function (i, val) {
        var clone = '<div data-correct="'+val.data+'" class="draggable"><img src="'+val.recurso+'" alt="'+val.data+'_drag"></div>';
        arrayDrags.push(clone);  
    });

    $.each(obj[1].frames, function (i, val) {
        var cloneFrames = '<div data-correct="'+val.data+'" class="fakeDropzone"><img src="'+val.ref+'" alt="'+val.data+'_frame" class="imgRef"></div>';
        arrayFrames.push(cloneFrames);  
    });

    arrayDrags = arrayDrags.sort(() => Math.random() - 0.5);
    arrayFrames = arrayFrames.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < arrayDrags.length; i++) {
        $(arrayDrags[i]).appendTo(".recursos");
    }

    for (let i = 0; i < arrayFrames.length; i++) {
        $(arrayFrames[i]).appendTo(".imgGame");
    }

    initDraggable()
}

function initDraggable(){
    $(".draggable").draggable({
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

    $(".dropzone").droppable(({
        disabled: false,
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
           
            let _drag = $(ui.draggable);
            let _drop = $(this);
            let drag_correct = $(ui.draggable).data().correct;
            let last = $(this).data().last;
            var img = $('<img class="bgDrop" />'); 
            var imgSrc = "./shared/img/game7/"+drag_correct+".svg"
            
            $(".recursos").find(`[data-correct='${last}']`).removeAttr("style");
            $(".recursos").find(`[data-correct='${last}']`).draggable('enable');
            $(_drag).draggable('disable');
            $(ui.helper).remove();
            $(_drag).css("opacity","0.5");
            $(_drop).css("opacity","1");
            $(_drop).css("backgroundColor","#6550E2");
            $(_drop).empty();

            img.attr('src', imgSrc)
            img.appendTo(_drop)
            $(_drop).data({"correct": drag_correct});
            $(_drop).data({"last":drag_correct}) 
            drop_correct = $(_drop).data().correct;
            $(_drop).removeClass('empty');
            checkDrop(drag_correct,_drop)

            
        }
    })); 
}

function checkDrop(){

    let frames = $(".fakeDropzone")
    let drops = $(".dropzone")
    
    let frame1 = $(frames[0]).data().correct
    let frame2 = $(frames[1]).data().correct
    let frame3 = $(frames[2]).data().correct
    let drop1 = $(drops[0]).data().correct
    let drop2 = $(drops[1]).data().correct
    let drop3 = $(drops[2]).data().correct
    let win = $(".win").length
    let correctArrow = $('<img src="./shared/img/game7/correcto.svg" class="correct" />')
    let correctRef = $('<img src="./shared/img/game7/correcto.svg" class="correct" />')
    let badArrow = $('<img src="./shared/img/game7/incorrecto.svg" class="incorrect" />')
    let badRef = $('<img src="./shared/img/game7/incorrecto.svg" class="incorrect" />')

    if(frame1 === drop1){
        $(drops[0]).droppable('disable');
        checkResult(drops[0], 0)
        correctArrow.appendTo(drops[0])
        correctRef.appendTo(frames[0])
    } 
    
    

    if(frame2 === drop2){
        $(drops[1]).droppable('disable');
        checkResult(drops[1], 1)
        correctArrow.appendTo(drops[1])
        correctRef.appendTo(frames[1])
    }

    if(frame3 === drop3){
        $(drops[2]).droppable('disable');
        checkResult(drops[2], 2)
        correctArrow.appendTo(drops[2])
        correctRef.appendTo(frames[2])
    }
    
    
    
    checkwin(win);
}

function checkResult (drop, result){
    let dropData = $(drop).data().correct
    let results = $(".results")
    let imgResult = $('<img />');
    let srcResult = "./shared/img/game7/feedback"+dropData+".svg" 
    
    if( $(drop).hasClass("win")){
        console.log('false');
        return false
    } else {
        $(drop).addClass("win")
        imgResult.attr('src', srcResult)
        imgResult.appendTo(results[result])
        $(results[result]).css("opacity","1");
    }
}

function checkwin(win) {
    if(win === 3){
        clearInterval(interval)
        setTimeout(()=>{
            WinGame(interval,PointsToWin,"Game7");
        },2000)
        console.log('win');
    }
}

function ResetGame() {
    //Todo Resetear elementos
    arrayDrags = [];
    arryDrops = [];
    arrayFrames = []
    $(".recursos").empty()
    $(".imgGame").empty()
    initInstructions("Game7", initGame)
}

$(document).ready(function () {
    initInstructions("Game7", initGame)
});