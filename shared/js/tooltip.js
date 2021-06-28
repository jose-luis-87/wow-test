var tlToolTip;
$(document).ready(function () {

  var toolTip = document.querySelector('.toolTip')
  var iconNav = document.querySelector('.iconNav')
  var iconPointer = document.querySelector('.iconPointer')
  var iconNavB = document.querySelector('.iconNav2')
  var iconPointerB = document.querySelector('.iconPointer2')
  var txtCardTool = document.querySelector('.cardTool p')
  var toolTipLat = document.querySelector('.toolTipLat')
  var txtBullet = document.querySelector('.containerBullet p')
  var btnClose = document.querySelector('.btnXtool')
  var btnCloseLeft = document.querySelectorAll('.btnXLeft')
  var desp = 100;
  var renderView = ''
  var widthDevice = window.innerWidth;
  windowSize(widthDevice)
  function windowSize(width){
    if(widthDevice <= 800){
      desp = 60
    }
    if(widthDevice <= 600){
      desp = 50
    }
    return desp
  }

  var bgMenu = $('#morph')
  var menuMorph = document.querySelector('.menuMorph')
  var arrowBack = $('.arrowBack')
 
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

function activeSave(modulo){
  morphing.restart()
  $('.wrapperMenu').fadeIn()
  $('.optionMenu').load('./shared/views/'+modulo+'.html')
  if (bgMenu.hasClass('unactive')) {
    bgMenu.removeClass('unactive')
    bgMenu.addClass('active')
    arrowBack.css('display', 'block')
    arrowBack.css('opacity', 1)
    $('.uiModel').css('opacity', 0)
    $('.uiModel').css('pointer-events', 'none')
  } else {
    bgMenu.removeClass('active')
    bgMenu.addClass('unactive')
    arrowBack.css('display', 'none')
    arrowBack.css('opacity', 0)
  }
  setTimeout(()=>{
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
  }, 3000)
}

  btnCloseLeft[0].addEventListener('click', () => {
    tlToolTip.pause()
    openMisiones()
  })

  btnClose.addEventListener('click', () => {
    tlToolTip.pause()
    openMisiones()
  })

  
  var lanSelec = localStorage.getItem('lan')
  if (lanSelec != undefined) {
    LanObj = $.parseJSON(lanSelec);
  }

  $('#txtTool').text(LanObj.tooltip.nav.drag)
  $('#txtToolLat').text(LanObj.tooltip.lat.ayuda)

  /* Open Tooltip */
  tlToolTip = anime.timeline({
    easing: 'easeOutExpo',
    duration: 2000
  });

  tlToolTip
  .add({
    targets: iconPointer,
    translateX: 120,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    duration: 4000,
    complete: function(anim){
      iconNav.style.display = 'none'
      iconPointer.style.display = 'none'
      iconNavB.style.display = 'block'
      iconPointerB.style.display = 'block'
      txtCardTool.textContent = LanObj.tooltip.nav.hotspot
      console.log('complete iconNav'+anim.completed);
  }, 
  })
  .add({
    targets: iconNav,
    translateX: 120,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    duration: 4000,
    complete: function(anim){
      iconNav.style.display = 'none'
      iconPointer.style.display = 'none'
      iconNavB.style.display = 'block'
      iconPointerB.style.display = 'block'
      txtCardTool.textContent = LanObj.tooltip.nav.hotspot
      console.log('complete iconNav');
  },},'-=4000')
  
  .add({
    targets: iconPointerB,
    scale: .8,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    duration: 4000,
  })
  .add({
    targets: iconNavB,
    scale: .8,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    duration: 4000,
    complete: function(){
      toolTip.style.display = 'none'
      toolTipLat.style.display = 'block'
    },
  }, '-=4000')
  .add({
    delay: 4000,
    targets: toolTipLat,
    translateY: desp,
    easing: 'linear',
    complete: function(){
      renderView = 'Guardar'
      activeSave(renderView)
      txtBullet.textContent = LanObj.tooltip.lat.guardar
    },
    duration: 2000,
  })
  .add({
    targets: toolTipLat,
    translateY: desp+(desp*.8),
    easing: 'linear',
    delay: 4000,
    duration: 2000,
    complete: function(){
      renderView = 'Stats'
      activeSave(renderView)
      setTimeout(()=>{
        openMisiones()
      }, 3000)
      
      txtBullet.textContent = LanObj.tooltip.lat.misiones
    },
  })

  tlToolTip.restart()

});

/* Open Modal Misiones */
function openMisiones() {

  tlToolTip.pause()
  $('.wrapperModales').empty()
  $('.wrapperModales').load('.././shared/views/Misiones.html')
  $('.uiUser').css('opacity', 1)
  $('.uiUser').css('display', 'block')
  
}