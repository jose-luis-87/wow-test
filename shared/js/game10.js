var interval = null;
var PointsToWin = 0;
var rotations = [90, 180, 270];
var correct = [];

function initGame(time, points) {
    //interval = initTime(time,ResetGame);
    PointsToWin = points;

    for (let index = 1; index <= rotations.length; index++) {
        let _deg = rotations[Math.floor(Math.random() * rotations.length)];
        let element = $("#qube" + index)[0]
        rotateCube(element, _deg)
    }
    setTimeout(() => {
        $(".character").fadeOut();
    }, 1000)


}

function checkRotate(element) {

    let id = element.id;
    let rot = $(element).data().deg;
    
    switch (id) {
        case "qube1":
                if((parseInt((rot-35))/360) % 1 == 0){
                    if(!correct.includes(id))
                        correct.push(id)
                }else{
                    if(correct.includes(id))
                        correct.splice(correct.indexOf(id), 1)
                }
            break;
        case "qube2":
                if((parseInt((rot))/360) % 1 == 0){
                    if(!correct.includes(id))
                        correct.push(id)
                }else{
                    if(correct.includes(id))
                        correct.splice(correct.indexOf(id), 1)
                }
            break;
        case "qube3":
            if((parseInt((rot+35))/360) % 1 == 0){
                if(!correct.includes(id))
                    correct.push(id)
            }else{
                if(correct.includes(id))
                    correct.splice(correct.indexOf(id), 1)
            }
            break;
    }
    checkwin()

}


function checkwin() {
    if(correct.length==3){
        $(".parent_qube").off("click");
        $(".parent_qube").addClass("win");
        $(".character").fadeIn();
        $(".qube_face--front").addClass("winGlow");
        $(".qube_face--front").css("background-color","#FCB527");
        clearInterval(interval);
        setTimeout(function(){
            WinGame(interval, PointsToWin, "Game10");
        },2000)
    }
}

function ResetGame() {
    $(".parent_qube").removeClass("win");
    $("#qube1").data("deg", 35);
    $("#qube2").data("deg", 0);
    $("#qube3").data("deg", -35);
    initInstructions("Game10", initGame)
}

function rotateCube(element, _deg = null) {

    let newRot = $(element).data().deg;
    if (_deg != null) {
        newRot = newRot + _deg;
    } else {
        newRot += 90;
    }
    $("#" + element.id + ">.qube").css({ 'transform': 'rotateY(' + newRot + 'deg)' });
    $(element).data("deg", newRot);
    checkRotate(element);
}


$(".parent_qube").on("click", function () {
    rotateCube(this)
});
$("#qube1").data("deg", 35);
$("#qube2").data("deg", 0);
$("#qube3").data("deg", -35);
$(document).ready(function () {

    initInstructions("Game10", initGame)
});
