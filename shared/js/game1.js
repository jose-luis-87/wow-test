var interval = null;
var PointsToWin = 0;
var Level = 1;
var levelsToPlay = 0;

function initGame(time, points, levels = 0) {
    //nterval = initTime(time,ResetGame);
    PointsToWin = points;
    levelsToPlay = levels;
    $(".test").html("Game 1 Level" + Level)
    $("#mini" + Level).css("display","flex");
    switch (Level) {
        case 2:
            initmini2()
            break;
        case 3:
            initmini3()
            break;
        case 4:
            initmini4()
            break;
        case 5:
            initmini5()
            break;
        case 6:
            initmini6()
            break;
        case 7:
            initmini7()
            break;       
        default:
            break;

    }
}

function checkwin() {
    WinGame(interval, PointsToWin, "Game1");
}

function nextLevel() {
    clearInterval(interval)
    Level++;
    $(".miniGame").fadeOut();
    if (Level > levelsToPlay) {
        WinGame(interval, PointsToWin, "Game1");
    } else {
        initInstructions("Game1", initGame, Level)

    }
}

function ResetGame() {

    switch (Level) {
        case 2:
            resetmini2()
            break;
        case 3:
            resetmini3()
            break;
        case 4:
            resetmini4()
            break;
        case 5:
            resetmini5()
            break;  
        case 7:
            resetmini7()
            break;           
        default:
            break;

    }

    initInstructions("Game1", initGame, Level)
}

$(document).ready(function () {
    initInstructions("Game1", initGame, Level);
    $(".testWin1").on("click", nextLevel);
    $(".scene").shuffleChildren();
});

var cube = document.querySelector('.kube');
var scene = document.querySelector('.scene');
var cubes = document.getElementsByClassName('kube')
var cubesFront = document.getElementsByClassName('kube show-front')
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

for (let i = 0; i < cubes.length; i++) {

    cubes[i].addEventListener('click', e => {

        element = e.target
        parent = element.parentElement
        if (element.id === 'front') {
            parent.classList.remove('show-front')
            parent.classList.add('show-right')
        }
        if (element.id === 'right') {
            parent.classList.remove('show-right')
            parent.classList.add('show-back')
        }
        if (element.id === 'back') {
            parent.classList.remove('show-back')
            parent.classList.add('show-left')
        }
        if (element.id === 'left') {
            parent.classList.remove('show-left')
            parent.classList.add('show-front')
        }
        checkCubes(cubesFront)
    })

}

$.fn.shuffleChildren = function () {
    $.each(this.get(), function (index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function () {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

function checkCubes(cubes) {
    if (cubes.length === 8) {
        nextLevel()
    }

}

// game2

var tostado = null;
var first = false;
function initmini2() {
    tostado = $(".tostadoDrag")
    tostado.draggable({
        containment: "parent",
        scroll: false,
        drag:function(event,ui){
            let tostadoParentRect = this.parentElement.getBoundingClientRect();
            $(this).addClass("tostadoGlow");
            checkRect(tostadoParentRect);
        },
        stop: function () {
            $(this).removeClass("tostadoGlow");
        },
    });
    

}

function resetmini2() {
    $(".tostadoDrag").css("top","0");
    $(".tostadoDrag").css("background-position-y","bottom");
    first = false;
    tostado.draggable('enable');
}



function checkRect(tostadoParentRect){

    let tostLeftRect = $(".tLeft")[0].getBoundingClientRect();
    let tostRightRect = $(".tRight")[0].getBoundingClientRect();
    let tostadoRect = $(".tostadoDrag")[0].getBoundingClientRect();
    let alturaLeft = tostLeftRect.height/2;
    let alturaRight = tostRightRect.height/2;
    let crunch = $(".crunchSfx")[0];

    console.log(parseInt(tostadoRect.bottom)+"rectBottom",parseInt(tostadoParentRect.bottom)-5)
    if (parseInt(tostadoRect.left)==parseInt(tostadoParentRect.left) && tostadoRect.bottom>=(tostLeftRect.top + alturaLeft) ||
        parseInt(tostadoRect.right)>=parseInt(tostadoParentRect.right) && tostadoRect.bottom>=(tostRightRect.top + alturaRight))
    {
        if(!first){
            first = true;
            triggerLose();
            tostado.blur();
            crunch.play();
            tostado.css("background-position-y","top");
            tostado.draggable('disable');
            clearInterval(interval);
        }
    }else if (parseInt(tostadoRect.bottom)>=(parseInt(tostLeftRect.bottom)-5))
    {
        if(!first){
            first = true;
            triggerWin();
            tostado.addClass("win");
            tostado.draggable('disable');
            clearInterval(interval);
            tostado.blur();


        }
    }
}

function triggerWin(){
    setTimeout(function(){ 
        nextLevel();
     }, 1500);
}

function triggerLose() {
    setTimeout(function(){ 
        YouLose(ResetGame,true);     
     }, 1500);
}





// game 2 end


//game3

function initmini3() {

    let _imgs = ["GloboV.svg", "GloboP.svg", "GloboB.svg", "GloboN.svg"]

    $.each(_imgs, function (i, val) {
        let _globo = '<div class="globo"><img src="./shared/img/game1/mini3/' + val + '" alt="globo"/></div>';
        $(_globo).appendTo(".wrapperGlobos");
    });

    nextBallon()
}
function resetmini3() {
    $(".wrapperGlobos").html("")
    $(".wrapperTanque").find('.globo').remove()
    $("#completeMini3").html("")
}
function nextBallon() {
    let globo = $(".wrapperGlobos").children().last();
    if (globo.length == 0) {
        clearInterval(interval)
        setTimeout(() => {
            nextLevel()
        }, 1300);
    }
    globo.appendTo(".wrapperTanque").addClass("globoInflar");

    $(".globoInflar").on("click", function () {
        let _matrix = $(this).css('transform');
        let values = _matrix.split('(')[1].split(')')[0].split(',');
        let _x = parseFloat(values[0]) + .17;
        let _y = parseFloat(values[0]) + .17;
        let _z = parseInt(values[5] - 7)
        $(this).css({ 'transform': 'matrix(' + _x + ', 0, 0, ' + _y + ', 0, ' + _z + ')' });

        checkBallon(this, _x);

    })
}
function checkBallon(element, _x) {
    if (_x >= 1) {
        $(element).off('click')
        $(element).removeClass('globoInflar').removeAttr('style');
        $(element).prependTo("#completeMini3").addClass("globoFin");
        setTimeout(() => {
            $(element).removeClass('globoFin').addClass("globoComplete");
        }, 1000);
        nextBallon();
    }
}

//game4
var winMini4 = 0;
function initmini4() {

    let Line = "<svg id='LineDraw'></svg>";
    $(Line).prependTo("#mini4");

    let _imgs = ["GloboV.svg", "GloboP.svg", "GloboB.svg", "GloboN.svg"]

    $.each(_imgs, function (i, val) {
        let _globo = '<div class="globoDrag  globoDrag' + (i + 1) + '"><img src="./shared/img/game1/mini4/' + val + '" alt="globo"/><div class="helperline"></div></div>';
        $(_globo).appendTo("#mini4");
    });


    initDraggMini4()
}
function resetmini4() {
   
    $("#mini4").find('.globoDrag').remove()
    $("#LineDraw").html("");
    $("#completeMini4").html("");
    $("#LineDraw").remove();
    winMini4 = 0;
}
function animateBallon(element,newPos=null,step=null){
    let _x = 0;
    let _y = 0;
    let _fx = [5,5,-5,-5];
    let _fy = [5,-5,-5,5];
    let _step = 0;
    _x= _fx[_step]+(element.position().top*100)/window.innerHeight;
    _y= _fy[_step]+(element.position().left*100)/window.innerWidth;
    
    if(newPos != null){
        _x = newPos[0];
        _y = newPos[1];
    }
    if(step != null){
        _step = step
    }

    element.animate({
        top: _x+"%",
        left:_y+"%" 
        },{
        duration : 1000,
        specialEasing: {
            top: "linear",
            left: "linear"
          },
        step: function(){
            var lines = $(this).data('lines');
            var con_item = $(this).data('connected-item');
            var con_lines = $(this).data('connected-lines');

            if (lines) {
                lines.forEach(function (line, id) {

                    let _left = $(this)[0].getBoundingClientRect().width / 2 + $(this).position().left;
                    let _top = $(this)[0].getBoundingClientRect().height + $(this).position().top - 1;
                    $(line).attr('x1', _left).attr('y1', _top);
                }.bind(this));
            }

            if (con_lines) {
                con_lines.forEach(function (con_line, id) {
                    $(con_line).attr('x2', $(this).position().left + 5)
                        .attr('y2', $(this).position().top + (parseInt($(this).css('height')) / 2) + (id * 5));
                }.bind(this));

            }
        },
        complete : function () {
            
            _step++;
            if(_step>=_fx.length){
                _step=0;
            }
            element.data({'step':_step});
            let newP = [(_x+_fx[_step]),(_y+_fy[_step])]
            animateBallon(element,newP,_step)
        }
      });
}
function initDraggMini4() {


    for (let index = 1; index < 5; index++) {
        
        animateBallon($('.globoDrag'+index),null,index-1)
    
    }

    
    $('.globoDrag').on('mousedown',function(){
        $(this).pause();
    }).on('mouseup',function(){
        $(this).resume();
    });

    $('.manomini4').droppable({
        accept: '.helperline',
        drop: function (event, ui) {
            var item = ui.draggable.closest('.globoDrag');
            $(this).data('connected-item', item);

            $(ui.draggable).draggable('disable')
            $(ui.draggable).remove()

            item.data('lines').push(item.data('line'));

            if ($(this).data('connected-lines')) {
                $(this).data('connected-lines').push(item.data('line'));

                var y2_ = parseInt(item.data('line').attr('y2'));
                item.data('line').attr('y2', y2_ + $(this).data('connected-lines').length);

            } else $(this).data('connected-lines', [item.data('line')]);

            item.data('line', null);
            $(item).off('mousedown');
            $(item).off('mouseup');
            let clone = $(item).clone();
            clone.removeClass().removeAttr('style').addClass("globo globoComplete").appendTo("#completeMini4").css({"opacity":0});
            setTimeout(() => {
                clone.css({"opacity":1})
            }, 50);
            winMini4++;
            checkMini4();
        }
    });


    $('.helperline').draggable({
        containment: "#mini4",
        drag: function (event, ui) {
            var _end = $(event.target).parent().position();
            var end = $(event.target).position();

            let _left = $(event.target)[0].getBoundingClientRect().width / 2 + $(event.target).position().left;
            let _top = $(event.target)[0].getBoundingClientRect().height / 2 + $(event.target).position().top - 1;


            if (_end && end)
                $(event.target).parent().data('line')
                    .attr('x2', _left + _end.left).attr('y2', _top + _end.top);
        },
        stop: function (event, ui) {
            if (!ui.helper.closest('.globoDrag').data('line')) return;
            ui.helper.css({ top: 0, left: 0 });
            ui.helper.closest('.globoDrag').data('line').remove();
            ui.helper.closest('.globoDrag').data('line', null);
        }
    });


    $('.helperline').on('mousedown', function (e) {
        var cur_ui_item = $(this).closest('.globoDrag');
        var connector = $('#LineDraw');
        var cur_con;

        if (!$(cur_ui_item).data('lines')) $(cur_ui_item).data('lines', []);

        if (!$(cur_ui_item).data('line')) {
            cur_con = $(document.createElementNS('http://www.w3.org/2000/svg', 'line'));
            cur_ui_item.data('line', cur_con);
        } else cur_con = cur_ui_item.data('line');

        connector.append(cur_con);
        var start = cur_ui_item.position();
        let _pos = cur_ui_item[0].getBoundingClientRect();
        let _startL = start.left + (_pos.width / 2);
        let _startT = (start.top + _pos.height);

        cur_con.attr('x1', _startL).attr('y1', _startT);
        cur_con.attr('x2', _startL).attr('y2', _startT);
    });


}
function checkMini4(){
    if (winMini4 == 4) {
        clearInterval(interval)
        setTimeout(() => {
            nextLevel();
            resetmini4();
        }, 1000);
    }
}
//game5

var winMini5 = 0;
function initmini5() {
    let Line = "<svg id='LineDrawMini5'></svg>";
    $(Line).prependTo("#mini5");
    let _imgs = ["GloboV.svg", "GloboP.svg", "GloboB.svg", "GloboN.svg"]

    $.each(_imgs, function (i, val) {
        let _globo = '<div class="globoDrag  globoDrag' + (i + 1) + '"><img src="./shared/img/game1/mini4/' + val + '" alt="globo"/><div class="lineMini5"><svg id="lineProv"><line x1="50%" y1="0" x2="50%" y2="60%"></line></svg></div></div>';
        $(_globo).appendTo("#mini5");
    });
    for (let i = 0; i < 4; i++) {
        let _pointDrop = '<div class="pointBalloon pointBalloon' + (i + 1) + '"></div>';
        $(_pointDrop).appendTo(".rackMini5");
        
    }
    initDraggMini5()
}
function initDraggMini5() {

    for (let index = 1; index < 5; index++) {
        animateBallon($('.globoDrag'+index),null,index-1)
    }
    
    $('.globoDrag').on('mousedown',function(){
        $(this).pause();
    }).on('mouseup',function(){
        $(this).resume();
    });

    $('.pointBalloon').droppable({
        accept: '.lineMini5',
        drop: function (event, ui) {
            var item = ui.draggable.closest('.globoDrag');
            let _drop = this;
            $(this).data('connected-item', item);
            $(ui.draggable).draggable('disable')
            $(ui.draggable).remove();
            
            $(_drop).droppable('disable');
            $(_drop).fadeOut();
            item.data('lines').push(item.data('line'));

            if ($(this).data('connected-lines')) {
                $(this).data('connected-lines').push(item.data('line'));

                var y2_ = parseInt(item.data('line').attr('y2'));
                item.data('line').attr('y2', y2_ + $(this).data('connected-lines').length);

            } else $(this).data('connected-lines', [item.data('line')]);

            item.data('line', null);
            $(item).off('mousedown');
            $(item).off('mouseup');
            let clone = $(item).clone();
            clone.removeClass().removeAttr('style').addClass("globo globoComplete").appendTo("#completeMini5").css({"opacity":0});
            setTimeout(() => {
                clone.css({"opacity":1})
            }, 50);
            winMini4++;
            checkMini4();
        }
    });


    $('.lineMini5').draggable({
        containment: "#mini5",
        drag: function (event, ui) {
            var _end = $(event.target).parent().position();
            var end = $(event.target).position();
            $(this).css("background-image","url('./shared/img/game1/mini5/mano.svg')");
            $($(this).children()[0]).hide();
            let _left = $(event.target)[0].getBoundingClientRect().width / 2 + $(event.target).position().left;
            let _top = $(event.target)[0].getBoundingClientRect().height / 2 + $(event.target).position().top - 1;

            if (_end && end)
                $(event.target).parent().data('line')
                    .attr('x2', _left + _end.left).attr('y2', _top + _end.top);
        },
        stop: function (event, ui) {
            $(this).css("background-image","");
            $($(this).children()[0]).show();

            if (!ui.helper.closest('.globoDrag').data('line')) return;
            ui.helper.css({ top: 0, left: 0 });
            ui.helper.closest('.globoDrag').data('line').remove();
            ui.helper.closest('.globoDrag').data('line', null);
        }
    });


    $('.lineMini5').on('mousedown', function (e) {
        var cur_ui_item = $(this).closest('.globoDrag');
        var connector = $('#LineDrawMini5');
        var cur_con;

        if (!$(cur_ui_item).data('lines')) $(cur_ui_item).data('lines', []);

        if (!$(cur_ui_item).data('line')) {
            cur_con = $(document.createElementNS('http://www.w3.org/2000/svg', 'line'));
            cur_ui_item.data('line', cur_con);
        } else cur_con = cur_ui_item.data('line');

        connector.append(cur_con);
        var start = cur_ui_item.position();
        let _pos = cur_ui_item[0].getBoundingClientRect();
        let _startL = start.left + (_pos.width / 2);
        let _startT = (start.top + _pos.height);

        cur_con.attr('x1', _startL).attr('y1', _startT);
        cur_con.attr('x2', _startL).attr('y2', _startT);
    });


}
function checkMini5(){
    if (winMini5 == 4) {
        clearInterval(interval)
        setTimeout(() => {
            nextLevel()
        }, 1000);
    }
}
function resetmini5() {
    $("#mini5").find('.pointBalloon').remove();
    $("#mini5").find('.globoDrag').remove();
    $("#LineDrawMini5").html("");
    $("#completeMini5").html("");
    winMini5 = 0;
}

// game 6
var arrayWins = ''
var countCliks = -1
var randomWins = []
var numberWins = []
var acerts = 0
var codigoWin = ''
function initmini6() {
    arrayWins = '{"wins":[{"win":"true","numbers":[3,6,9]},{"win":"true","numbers":[2,5,8]},{"win":"true","numbers":[1,4,7]},{"win":"false","numbers":[1,2,3]},{"win":"false","numbers":[4,5,6]}]}'
    var objWins = $.parseJSON(arrayWins)
    randomWins = objWins.wins.sort(() => Math.random() - 0.5)
}

$('.btnSlot').on('click', function(){
    clearAnimation (numberWins)
    countCliks += 1
    randomSlot()
    $('.btnSlot').css('pointer-events', 'none')
    setTimeout(() => {
        $('.btnSlot').css('pointer-events', 'auto')
    }, 1000);
})

function randomSlot (){
    
    numberWins = randomWins[countCliks]
    codigoWin = JSON.stringify(numberWins.numbers)
    lineWin(codigoWin)

    $('.tiraSlot').addClass('animSlot'+numberWins.numbers[0]+'');
    $('.tiraSlot2').addClass('animSlot'+numberWins.numbers[1]+'');
    $('.tiraSlot3').addClass('animSlot'+numberWins.numbers[2]+'');

    if ( numberWins.win === "false"){
        console.log('No win');
    } 

    if (numberWins.win === "true"){
        acerts += 1
    }
    
    if (acerts === 3){
        $("#audioWin")[0].currentTime = 0
        $("#audioWin")[0].play();
        clearInterval(interval)
        setTimeout(() => {
            nextLevel()
        }, 3000);
    }
}

function lineWin(code){
    
    switch (code) {
        case '[3,6,9]':
            setTimeout(() => {
                $('#line-bimbollos').addClass('winLine1')
                $("#audioWin")[0].currentTime = 0
                $("#audioWin")[0].play();
            }, 1000);
            
            break;
        case '[2,5,8]':
            setTimeout(() => {
                $('#line-pan').addClass('winLine2')
                $("#audioWin")[0].currentTime = 0
                $("#audioWin")[0].play();
            }, 1000);
            
            break;
        case '[1,4,7]':
            setTimeout(() => {
                $('#line-medias').addClass('winLine3')
                $("#audioWin")[0].currentTime = 0
                $("#audioWin")[0].play();
            }, 1000);
            
            break;
    
        default:
            break;
    }
}

function clearAnimation (nums){
   if (nums.length === 0){
       console.log('nums undefined');
   }else{
       console.log(nums.numbers);
        $('.tiraSlot').removeClass('animSlot'+nums.numbers[0]+'');
        $('.tiraSlot2').removeClass('animSlot'+nums.numbers[1]+'');
        $('.tiraSlot3').removeClass('animSlot'+nums.numbers[2]+'');
   } 
}

// game 7
  function initmini7() {

      $('#rackDust').eraser({
        completeRatio: .8,
        size: 50,
        progressFunction:
        function (p) {
            var progre = Math.round(p*100);

            console.log(progre)

            if (progre >= 73) {
                $('#rackDust').eraser('clear');
                clearInterval(interval);

                setTimeout(function(){ 
                    nextLevel();
                 }, 1500);
            }
        }
        

      });
  } 

  function resetmini7() {
   
    $('#rackDust').eraser('reset');
}



// 

