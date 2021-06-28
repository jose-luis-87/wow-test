var data = '{"elements":[{"scene":"./shared/img/game9/Escenario1.jpg","rack":"./shared/img/game9/TortillinaRack.svg","rackSup":"./shared/img/game9/tortillinaCenital.svg","class":"tortillina"},{"scene":"./shared/img/game9/Escenario2.jpg","rack":"./shared/img/game9/BarcelRack.svg","rackSup":"./shared/img/game9/barcelCenital.svg","class":"barcel"},{"scene":"./shared/img/game9/Escenario3.jpg","rack":"./shared/img/game9/MarinelaRack.svg","rackSup":"./shared/img/game9/marinelaCenital.svg","class":"marinela"}]}';
var interval = null;
var PointsToWin = 0;
var Scenes = [];

function initGame(time, points) {
    interval = initTime(time,ResetGame);
    PointsToWin = points;
}
function setScene() {
    if (Scenes.length == 0) {
        LoadObjects();
    } else {
        let _scene = Scenes[0];
        $(".tienda").attr('src', _scene.scene);
        var clone = '<div data-correct="' + _scene.class + '" class="commondrag"><img src="' + _scene.rack + '" alt="' + _scene.class + '_head"></div>';
        $(clone).appendTo(".wrapperDraggable");
        Scenes.shift();
        let dropZones = '<div data-correct="barcel" class="dropZone dropZone1"><div><img src="./shared/img/game9/barcelCenital.svg" /></div></div>' +
            '<div data-correct="tortillina" class="dropZone dropZone2"><div><img src="./shared/img/game9/tortillinaCenital.svg" /></div></div>' +
            '<div data-correct="marinela" class="dropZone dropZone3"><div><img src="./shared/img/game9/marinelaCenital.svg" /></div></div>';
        $(dropZones).appendTo(".wrapperDropsZone");
        initDraggables();

    }
}
function initDraggables() {
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
        tolerance: "pointer",
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            let _drag = $(ui.draggable);
            let _drop = $(this);
            let drag_correct = $(ui.draggable).data().correct;
            let drop_correct = $(this).data().correct;

            $(_drag).draggable('disable');
            $(_drag).css("opacity","0.5");
            $(ui.helper).remove();

            $(_drop).find("img")[0].src = "./shared/img/game9/" + drag_correct + "Cenital.svg";

            checkDrop(drop_correct, drag_correct, _drop)
        }
    }));

}
function checkDrop(a, b, drop) {

    if (a == b) {
        clearInterval(interval);
        let sparklesL = '<div class="sparkles_left sparkles"><div><span></span><span></span><span></span></div></div>'
        let sparklesR = '<div class="sparkles_right sparkles"><div><span></span><span></span><span></span></div></div>'
        $(sparklesL).prependTo($(drop));
        $(sparklesR).appendTo($(drop));
        $(".dropZone").addClass("complete");
        setTimeout(() => {
            $(drop).addClass("win");
        }, 100)
        
        setTimeout(() => {
            checkwin();
        }, 1500)
    } else {
        let tacheL = '<div class="tacheL"><img src="./shared/img/game9/tache.svg"/></div>';
        let tacheR = '<div class="tacheR"><img src="./shared/img/game9/tache.svg"/></div>';
        $(drop).addClass("complete");
        $(drop).addClass("lose");
        $(tacheL).prependTo($(drop));
        $(tacheR).appendTo($(drop));

        setTimeout(() => {
            clearElements();
            setScene();
        }, 500)
    }

}


function LoadObjects() {
    var obj = $.parseJSON(data);

    $.each(obj.elements, function (i, val) {
        Scenes.push(val)
    });
    Scenes = Scenes.sort(() => Math.random() - 0.5);
    setScene();
}
function checkwin() {
    WinGame(interval, PointsToWin, "Game9");
}
function clearElements() {
    $(".wrapperDraggable").html("");
    $(".wrapperDropsZone").html("");
}
function ResetGame() {
    clearElements();
    initInstructions("Game9", initGame)
    setScene();

}

$(document).ready(function () {
    initInstructions("Game9", initGame)
    setScene();
});
