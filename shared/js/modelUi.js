/* UI Interface superior */
var notificationComplete = document.querySelector('.notificationComplete')
$(document).ready(function () {
  var LanObj = {}
  
  var bgMenu = $('#morph')
  var menuMorph = document.querySelector('.menuMorph')
  var arrowBack = $('.arrowBack')
  var btnEnter = $('.btnEnter')
  var btnCloseWelcome = $('.btnXWelcome')

  /* Morphing bgMenu */
  var morphing = anime({
    targets: menuMorph,
    d: [
      /* {value:'M1058,0H556.9c-25.5,68.8-68.3,250.8-35.5,428c41,221.5,48.5,485.5-71.5,649H1058V0z'},  */
      {
        value: 'M1057.5,0H0.5C120.5,163.5,113,427.5,72,649c-32.8,177.2,10,359.2,35.5,428h950V0z'
      },
    ],
    easing: 'easeOutQuint',
    duraton: 100,
    loop: false,
    autoplay: false
  })
  /* Click counter */
  let clickUI = 0

  function countClick() {
    clickUI++
  }

  /* Despelgando morphing menú lateral */
  function reverseMenu() {
    morphing.reverse()
    morphing.play()
  }

  /* ListenersUI */
  $('.uiModel').on('click', function (e) {
    console.log(e.target)
    $('.wrapperMenu').fadeIn()
    e.stopPropagation()

    if (e.target.id === 'btnHelp') {
      $('.wrapperModales').fadeIn()
      $('.wrapperModales').load('./shared/views/Tooltip.html')
      console.log('btnHelp');
    }

    if (e.target.id === 'btnSave') {
      if (clickUI > 0) {
        reverseMenu()
      } else {
        morphing.restart()
      }

      countClick();

      $('.optionMenu').load('./shared/views/Guardar.html')
      //morphing.restart()
      
    }

    if (e.target.id === 'btnStats') {
      if (clickUI > 0) {
        reverseMenu()
      } else {
        morphing.restart()
      }

      $('.optionMenu').load('./shared/views/stats.html')
      countClick();
      console.log('btnStats');
    }

    if (e.target.id === 'btnStats' || e.target.id === 'btnSave') {
      if (bgMenu.hasClass('unactive')) {
        bgMenu.removeClass('unactive')
        bgMenu.addClass('active')
        arrowBack.css('display', 'block')
        arrowBack.css('opacity', 1)
        $('.uiModel').css('opacity', 0)
        $('.uiModel').css('pointer-events', 'none')
        console.log('entra!!!');
      } else {
        bgMenu.removeClass('active')
        bgMenu.addClass('unactive')
        arrowBack.css('display', 'none')
        arrowBack.css('opacity', 0)
      }
      console.log('btnStats');
    }
  })

  arrowBack.on('click', function () {
    morphing.reverse()
    morphing.play()
    arrowBack.css('display', 'none')
    arrowBack.css('opacity', 0)
    bgMenu.removeClass('active')
    bgMenu.addClass('unactive')
    $('.uiModel').css('opacity', 1)
    $('.uiModel').css('pointer-events', 'auto')
    $('.optionMenu').empty()
    $('.wrapperMenu').fadeOut()
    console.log('arroback');
  })

  btnCloseWelcome.on('click', function () {
    openToolTip()
  })

  /* Animación tooltip */
  function openToolTip() {

    $('.uiModel').css('display', 'block')
    closeWelcome()

  }

  /* Listener bienvenida */
  btnEnter.on('click', function () {
    openToolTip()
  })

  setTimeout(() => {
    $('.preloader').fadeOut()
  }, 7000)

  var lanSelec = localStorage.getItem('lan')
  if (lanSelec != undefined) {
    LanObj = $.parseJSON(lanSelec);
  }

  $('#welcomeTitle').text(LanObj.bienvenida.titulo)
  $('#welcomeParagraph').text(LanObj.bienvenida.parrafo)
  $('#btnEntrar').text(LanObj.ui.btnenter)
  $('#btnEntrar').text(LanObj.ui.btnenter)

});
/* Notificación de misión completada */
function openNotificationComplete() {
  anime({
    targets: notificationComplete,
    translateX: -380,
    easing: 'easeInOutQuad',
    duration: 1000,
  })
  setTimeout(() => {
    anime({
      targets: notificationComplete,
      translateX: 0,
      easing: 'easeInOutQuad',
      duration: 1000,
    })
  }, 2000)
}

function closeWelcome() {
  $('.welcomeModal').fadeOut()
  //$('.overlay').css('background-color', '#000')
  $('.wrapperModales').load('./shared/views/Tooltip.html')
}

