/* Seccion de misones de menú lateral */
var missionatual = $.parseJSON(localStorage.getItem('currentMission'))

function createCard() {
  var misionSelect = {}

  misionSelect = JSON.parse(localStorage.getItem('misiones'))

  $.each(misionSelect, function (i, mision) {
    var cardMIsion = '<div id="' + mision.id + '" class="cardMision animate__animated animate__backInRight"><div class="bulletMision"><div class="mision"><div class="txtMision"><p>' + mision.bullet + '</p></div><div class="iconMision"><img src="./shared/img/ui/' + mision.id + '.svg" alt="' + mision.id + '"></div></div><img src="./shared/img/ui/bullet-mision.svg" alt="bulletSvg"></div><div class="numberMision"><p>' + (i + 1) + '</p><div id="number' + mision.id + '" class="numberFoot"><img src="./shared/img/ui/number-unactive.svg" alt="unactive"></div></div></div>'
    $(cardMIsion).appendTo(".swipperMisiones")

  })
}

$(document).ready(function () {
  var rallyIndex = ''
  var rallyTotal = localStorage.getItem('rally')

  createCard()

  var urlNumber = './shared/img/ui/number-active.svg'

  $('#titleMisiones').text(LanObj.ui.misiones)

  $.each(missionatual, function (i, misionComplete) {
    $('#number' + misionComplete + '>img').attr('src', urlNumber)
  })

  if (rallyTotal != undefined) {
    rallyIndex = $.parseJSON(rallyTotal);
    console.log(rallyIndex);
  }

  var progressIndex = (100 / 11)
  var progressPan = missionatual.length * progressIndex
  console.log(progressPan);
  $('.imgProgress').css('width', '' + progressPan / 2 + '%')
  $('.progressCat>div').css('width', '' + progressPan + '%')
  // Duración animación scroll
  var scrollDuration = 300;
  // Flechas
  var leftPaddle = document.getElementsByClassName('arrowPrev');
  var rightPaddle = document.getElementsByClassName('arrowNext');
  console.log(leftPaddle);
  // get items dimensions
  var itemsLength = $('.cardMision').length;
  console.log(itemsLength);
  var itemSize = $('.cardMision').outerWidth(true);

  var paddleMargin = 20;
  // get wrapper width
  var getMenuWrapperSize = function () {
    return $('.contentMisiones').outerWidth();
  }
  var menuWrapperSize = getMenuWrapperSize();
  // the wrapper responsive
  $(window).on('resize', function () {
    menuWrapperSize = getMenuWrapperSize();
  });

  var menuVisibleSize = menuWrapperSize;

  // get total width items
  var getMenuSize = function () {
    return itemsLength * itemSize;
  };
  var menuSize = getMenuSize();
 
  var menuInvisibleSize = menuSize - menuVisibleSize;

  var getMenuPosition = function () {
    return $('.swipperMisiones').scrollLeft();

  };

  $('.swipperMisiones').on('scroll', function () {

    console.log('entra scroll');
  
    menuInvisibleSize = menuSize - menuWrapperSize;
   
    var menuPosition = getMenuPosition();

    var menuEndOffset = menuInvisibleSize - paddleMargin;
    console.log(menuPosition);
    console.log(menuEndOffset);
    console.log(paddleMargin);
    
    if (menuPosition <= paddleMargin) {
      $(leftPaddle).addClass('hidden');
      $(rightPaddle).removeClass('hidden');
    } else if (menuPosition < paddleMargin) {
      
      $(leftPaddle).removeClass('hidden');
      $(rightPaddle).removeClass('hidden');
    } else if (menuPosition >= paddleMargin) {
      $(leftPaddle).removeClass('hidden');
      $(rightPaddle).addClass('hidden');
    }

  });

  // scroll  left
  $(rightPaddle).on('click', function (e) {
    console.log(e.target);
    $('.swipperMisiones').animate({
      scrollLeft: menuInvisibleSize
    }, scrollDuration);
    console.log('entraright');
  });

  // scroll  right
  $(leftPaddle).on('click', function () {
    $('.swipperMisiones').animate({
      scrollLeft: '0'
    }, scrollDuration);
    console.log('entrarleft');
  });
});