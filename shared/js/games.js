/* Main de juegos */
var ObjData={};
var ObjCopys={};
var ObjAudios={};
var LanSelect = "es";
var currentMission =''

/* Carga data juegos */
function loadData(){
  let urlJson = './shared/js/json/DataGames.json'
  $.ajax({
    url: urlJson,
    data: {},
    dataType: "json",
    success: (res) => {
      ObjData = res.Games;           
      console.log(ObjData);
      ObjCopys = res.TextsUI;
      ObjAudios = res.Sounds;
      let GamesToPlay = [];
      let actualSesionGames = localStorage.getItem('GamesToPlay');
      if(actualSesionGames === null){
        GamesToPlay = JSON.stringify  (Object.keys(ObjData));
      }else{
        GamesToPlay = actualSesionGames;
      }
      
      localStorage.setItem('GamesToPlay',GamesToPlay);//Juegos disponibles
      LoadGame();
      SetCopys();
      CreateSound();
    }
});
}
/* Carga sonidos */
function CreateSound(){
  
  let _sounds = Object.keys(ObjAudios);
  
  _sounds.forEach(element => {
    
    let _id = element;
    let _src= ObjAudios[element].src;
    let _volume =ObjAudios[element].volume;
    let _loop = ObjAudios[element].loop;
    let _autoplay = ObjAudios[element].autoplay;

    if($("#audio"+_id).length == 0) {
      let _audio = document.createElement("audio");
      let _source= document.createElement("source");
      _audio.id = "audio"+_id;
      _audio.autoplay = _autoplay;
      _audio.loop = _loop;
      _audio.volume = _volume;
      _source.src = _src;
      _source.type = "audio/mpeg";
      _audio.appendChild(_source);
      $(_audio).appendTo(".wrapperGral");
    }
  });
  console.log(ObjAudios);
}
/* Set textos Idiomas */
function SetCopys(){
  $(".TextTimesUp").html(ObjCopys.TextTimesUp[LanSelect]);
  $(".TextLivesD").html(ObjCopys.TextLivesD[LanSelect]);
  $(".btnTimesUp>p").html(ObjCopys.TextbtnTimesUp[LanSelect]);
  $(".TextGameOver").html(ObjCopys.TextGameOver[LanSelect]);
  $(".btnGameOver>p").html(ObjCopys.TextbtnGameOver[LanSelect]);
  $(".textWin").html(ObjCopys.TextWin[LanSelect]);
  $(".prize>p").html(ObjCopys.TextPrize[LanSelect]);
  $(".wrapperTimeIns>p").html(ObjCopys.TextTimeInstruction[LanSelect]);
}
/* Progress tiempo */
function initTime(time,callback=null){
    let _interval = setInterval(frame, 1000);
    var width = 100;
    let _time = (width/time);
    $(".barFill").removeAttr('style');
    $(".barFill").css('width', '100%'); 
    function frame() {
      if (width <= 0) {
        clearInterval(_interval);
        

        if(callback !== null){
          YouLose(callback);
        }
        
      } else {
        width-=_time;
        if(width <= 50){
            $(".barFill").css('background-color', "#FCB527");
        }
        if(width <= 20){
            $(".barFill").css('background-color', "#FA9128");
        }
        $(".barFill").css('width', width+'%');
      }
    }
    return _interval;
}
function initInstructions(game,callback = null,level = 1){
  let index = 0;
  changeInstruction(ObjData[game],level,callback,index)
}
function changeInstruction(obj,level,callback=null,index){
  let _index = index + 1;
  let levels = Object.keys(obj.Levels).length;
  let objIndex = obj.Levels[level].Instructions[_index];
  let objTime = obj.Levels[level].Time
  
  $(".wrapperTimeIns p span").html(objTime);
 
  if(objIndex !== undefined){
    $(".textIns p").html(objIndex.Text[LanSelect])
    $(".imagenIns").attr("src",objIndex.Img)
    $(".wrapperInstructions").css('display','flex');
    $(".wrapperInstructions").on("click",()=>{
      changeInstruction(obj,level,callback,_index);
    });
  }else{
    $(".wrapperInstructions").off("click");
    $(".wrapperInstructions").fadeOut(500,()=>{
      callback(objTime,obj.Points,levels);
    });

  }
}
function LoadGame(){
   $(".wrapperGame").empty();
   let games = JSON.parse(localStorage.getItem('GamesToPlay'));
   let randomNumer = Math.floor(Math.random() * games.length);
   let gameRandom = games[randomNumer];
   //$(".wrapperGame").load(ObjData[gameRandom].File);
  $(".wrapperGame").load(ObjData["Game9"].File);
 
  let actualLives = localStorage.getItem('UserLives');
  let actualPonits = localStorage.getItem('UserPoints');

  if(actualLives === null){
    let initLives = 3;//Init Lives
    localStorage.setItem('UserLives',initLives);
    actualLives = initLives;
  }
  $(".userLives p").html(actualLives);

  if(actualPonits === null){
    let initPoints = 0;//Init Ponits
    localStorage.setItem('UserPoints',initPoints);
    actualPonits = initPoints;
  }
  $(".userPoints p").html(actualPonits);

}

function YouLose(callback,live=null){
  $("#audioLose")[0].play();
  let actualLives = localStorage.getItem('UserLives');
  actualLives --;
  localStorage.setItem('UserLives',actualLives);
  $(".userLives p").html(actualLives);
  
  if(actualLives>0){
      
      $(".TextTimesUp").html(ObjCopys.TextTimesUp[LanSelect]);

      $(".iconTimesUp").removeClass("iconLive");
      
      if(live != null){
        $(".TextTimesUp").html(ObjCopys.TextLoseLives[LanSelect]);

        $(".iconTimesUp").addClass("iconLive");
      }
      $(".wrapperTimesUp").show()
      $(".LivesRemaining p").html(actualLives);
      $(".btnTimesUp").on("click",()=>{
          $(".btnTimesUp").off("click")
          $(".wrapperTimesUp").hide();
          callback();
      });
  }else{
      localStorage.removeItem('UserLives');
      $(".wrapperGameOver").show()
      $(".btnGameOver").on("click",()=>{
          $(".btnGameOver").off("click")
          $(".wrapperGameOver").hide();
          //Todo return to other game
          let rally = localStorage.getItem('rally')
          let rallyData = $.parseJSON(rally)
          let misionIndex = rallyData.shift()
          rallyData.push(misionIndex)
          localStorage.setItem('rally', JSON.stringify (rallyData))
          CargarMision(rallyData[0])
          console.log(rallyData[0]);
          $('#games').fadeOut()
          $('#games').empty()
          $('.wrapperModales').empty()
          $('.wrapperModales').fadeIn()
          $('.wrapperModales').load('./shared/views/Misiones.html')
      });
      
  }
}

function ClaimPrize(){
  $(".btnPrize").addClass('active');
  let prize = Math.floor((Math.random() * 2) + 1);
  $(".prize>img").attr('src','./shared/img/ui/prize'+prize+'.svg');
  if(prize === 1){
    localStorage.setItem('prize', JSON.stringify (["pdf"]) )
  }
  if(prize === 2){
    localStorage.setItem('prize', JSON.stringify (["video"]))
  }
  $(".btnPrize").on('click',()=>{
    //Todo go to prize window
    console.log("go to Prize Window")
    $(".wrapperWin").hide();
    
    let rally = localStorage.getItem('rally')
    let rallyData = $.parseJSON(rally)
    
    let arrCurrent = $.parseJSON(localStorage.getItem('currentMission'));

    var currentM = rallyData.shift()
    console.log(rallyData);
    arrCurrent.push(currentM)
    localStorage.setItem('currentMission', JSON.stringify (arrCurrent))
    //rallyData.push(missionIndex)
    localStorage.setItem('rally', JSON.stringify (rallyData))
    var games = $.parseJSON(localStorage.getItem('GamesToPlay')) 
    var userPoints = $.parseJSON(localStorage.getItem('UserPoints')) 
    if(games.length === 0){
        $('.wrapperWinFinal').css('display', 'flex')
        $('#finalPoints').text(userPoints)
    }else{
      $('#games').fadeOut()
      $('#games').empty()
      openNotificationComplete()
      CargarMision(rallyData[0])
      $('.score p').text(userPoints)
      setTimeout(()=>{
        $('.wrapperModales').empty()
        $('.wrapperModales').fadeIn()
        $('.wrapperModales').load('./shared/views/Misiones.html')
      },1000)
    }
     
  });

}
function WinGame(interval,points,game){
    clearInterval(interval)
    $(".pntGanados").html(points+" puntos");
    $(".wrapperWin").show();
    $("#audioWin")[0].play();

    ClaimPrize();
    let actualPonits = parseInt(localStorage.getItem('UserPoints'));
    actualPonits += parseInt(points);
    localStorage.setItem('UserPoints',actualPonits);
    $(".userPoints p").html(actualPonits);
    RemoveGame(game)
}
function RemoveGame(gameRemove){
  let games = JSON.parse(localStorage.getItem('GamesToPlay'));
  let index = games.indexOf(gameRemove);
  games.splice(index,1);
  let GamesToPlay = JSON.stringify(games);
  localStorage.setItem('GamesToPlay',GamesToPlay);
}

$(document).ready(function () {
  CalculatePadding();
  loadData();
  
});

$(window).on('resize', CalculatePadding);

function CalculatePadding(){
  let win = $(window);
  // if (win.height() > win.width()) {
  //   alert("rotateDevice")
  // }
  let paddig = (win.height() / win.width())*100;
  $(".wrapperGral").css("padding-top",paddig+"%")
}

$('.btnFinalizarGame').on('click',()=>{
    console.log('game win!!!');
    location.reload();
})