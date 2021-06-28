var data = '{"productos":[{"number":5,"url":"./shared/img/game4/bimbollos.svg","data":"bimbollos"},{"number":5,"url":"./shared/img/game4/mediasnoches.svg","data":"mediasnoches"},{"number":2,"url":"./shared/img/game4/panguinda.svg","data":"pan1"},{"number":2,"url":"./shared/img/game4/panverde.svg","data":"pan2"},{"number":2,"url":"./shared/img/game4/panrojo.svg","data":"pan3"}]}';

var toWin = [];
var toWinIndex = 3;
var maxChilDrop = 5;
var arrayProductosMove = [];
var interval = null;
var PointsToWin = 0;

function initGame(time, points) {
    //interval = initTime(time,ResetGame);
    PointsToWin = points;
    let arrayProductos = [];
    arrayProductosMove = [];
    var obj = $.parseJSON(data);

    $.each(obj.productos, function (i, val) {
        for (let index = 0; index < val.number; index++) {
            let data = val.data;
            let _index = 0;
            if (val.data.includes("pan")) {
                data = data.substring(0, data.length - 1);
                _index = val.data.substring(data.length);;
            }
            var clone = '<div data-producto="' + data + '" data-index="' + _index + '" class="dragItem ' + data + '"><div><img src="' + val.url + '" alt="' + val.data + '"></div></div>';

            if (index == (val.number - 1)) {
                arrayProductosMove.push(clone)
                break;
            }
            arrayProductos.push(clone);
        }
    });
    arrayProductos = arrayProductos.sort(() => Math.random() - 0.5)

    for (let i = 1; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            $(arrayProductos[0]).appendTo("#section" + i + " .dropZone");
            arrayProductos.shift();
        }
    }

    for (let j = 0; j < 5; j++) {
        $(arrayProductos[0]).appendTo("#section3 .dropZone");
        arrayProductos.shift();
    }
    for (let i = 1; i < 3; i++) {
        $(arrayProductosMove[0]).appendTo("#section" + i + " .dropZone");
        arrayProductosMove.shift();
    }
    $(arrayProductosMove[0]).appendTo("#section3 .dropZone");
    arrayProductosMove.shift();

    initDraggable()
    checkDropZones()
}
function initDraggable() {
    $(".dragItem").draggable({
        revert: true,
        drag: function (ui) {
            $(this).addClass("select");
        },
        stop: function () {
            $(this).removeClass("select");
        }
    });
    $(".dropZone").droppable(({
        disabled: false,
        activeClass: "drop-area",
        drop: function (event, ui) {
            let _drag = $(ui.draggable);
            let _drop = $(this)
            if (_drop.children().length < maxChilDrop) {
                $(_drag).removeClass("select");
                $(_drag).removeAttr("style");
                $(_drag).draggable('disable');
                $(_drag).appendTo(_drop);
                $(_drag).draggable('enable');

                checkDrop(_drop)
                checkDropZones();
            }
        }
    }));
}

function checkDrop(dropeZone) {
    let children = dropeZone.children();
    let keys = [];

    $.each(children, function (i, val) {
        if (!keys.includes(val.dataset.producto))
            keys.push(val.dataset.producto)
    });

    if (keys.length === 1) {
        if (keys[0] != "pan" && children.length == maxChilDrop) {
            dropeZone.droppable( "option", "disabled", true );
            $.each(children, function (i, val) {
                $(val).draggable('disable');
            });
            if (!toWin.includes(dropeZone.parent().attr('id')))
                toWin.push(dropeZone.parent().attr('id'))
        }
        if (keys[0] == "pan" && toWin.length == toWinIndex - 1) {
            for (let j = 0; j <= arrayProductosMove.length; j++) {
                $(arrayProductosMove[0]).appendTo(dropeZone);
                arrayProductosMove.shift();
            }
            
            dropeZone.droppable( "option", "disabled", true );
            children = dropeZone.children();
            children.sort(function (a, b) {
                let compA = +a.dataset.index;
                let compB = +b.dataset.index;
                return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
            });
            $.each(children, function (i, itm) {dropeZone.append(itm)});
            if (!toWin.includes(dropeZone.parent().attr('id')))
                toWin.push(dropeZone.parent().attr('id'))
        }

    }

    checkwin()
}

function checkDropZones() {
    let _dropZones = $(".dropZone");
    $.each(_dropZones, function (i, val) {
        checkDrop($(val))
    });
}
function checkwin() {
    if (toWin.length == toWinIndex) {
        setTimeout(() => {
            WinGame(interval, PointsToWin, "Game4");
        }, 1000);

    }
}

function ResetGame() {
    $(".dropZone").html("");
    $(".dropZone").droppable( "option", "disabled", false );
    initInstructions("Game4", initGame)
}


$(document).ready(function () {
    initInstructions("Game4", initGame);

});
