/* Carga de misiones modal interface */
$(document).ready(function () {
    /* var games = $.parseJSON(localStorage.getItem('GamesToPlay')) 
    if(games === null){
        alert('fin del juego')
    }
    */
    var infografias = ['./shared/pdf/01_ES_Infografia_WOW.pdf', './shared/pdf/02_SeparCateg_WOW_ES.pdf', './shared/pdf/03_MejorPosición_WOW_ESP.pdf', './shared/pdf/04_AdicionaDisloca_WOW_esp.pdf', './shared/pdf/05_Visibilidad_WOW_esp.pdf']
    infografias = infografias.sort(() => Math.random() - 0.5);
    urlInfografía = infografias[1]
    console.log(urlInfografía);
    
    //$(".wrapperPdf iframe").attr("src", "https://docs.google.com/viewer?url="+urlInfografía+"&embedded=true")
    $(".wrapperPdf iframe").attr("src", ""+urlInfografía+"#toolbar=0&navpanes=0&scrollbar=0")
    var menuLat = $('.wrapperMenu')
    var notification = document.querySelector('.notification')
    var missioneActual;
    var btnSig = $('.btnSig')
    var lanSelec = localStorage.getItem('lan')
    var rallyIndex = ''
    var prizeType = localStorage.getItem('prize')
    console.log(prizeType);
    if (lanSelec != undefined) { 
        LanObj = $.parseJSON(lanSelec);
    }
    if (prizeType != null) {
        var actalPrize = $.parseJSON(prizeType);
        console.log(actalPrize);
        if(actalPrize[0] === 'pdf'){
            
            $('.pdfModal').css('display', 'flex')
            
        }
        if(actalPrize[0] === 'video'){
            $('.videoModal').css('display', 'flex')
        }

    }
    if(prizeType === null){
        $('.misionCard').fadeIn()
    }
    var indexMisiones = {}
    var misionSelect = localStorage.getItem('misiones')
    
    var rally = localStorage.getItem('rally')
    if (misionSelect != undefined) {
        missioneActual = $.parseJSON(misionSelect);
        console.log(missioneActual);
    }

    for (let i = 0; i < missioneActual.length; i++) {
        
        Object.defineProperty(indexMisiones, missioneActual[i].id, {
            value: i,
            writable: false
          });
    }

    console.log(indexMisiones);

    if (rally != undefined) {
        rallyIndex = $.parseJSON(rally);
        console.log(rallyIndex);
    }

    var indexMision = indexMisiones[rallyIndex[0]]
    console.log(indexMision);
    /* Set textos idiomas */
    $('#numMision').text(LanObj.ui.nummision + ':' + ' ' + (indexMision+1))
    $('#titleMision').text(LanObj.ui.objetotxt)
    $('#misionTxt').text(missioneActual[indexMision].frase)
    $('#btnSig').text(LanObj.ui.btnsig)

    var urlIcon = './shared/img/ui/' + rallyIndex[0] + '.svg'

    btnSig.on('click', () => {
        
        $('.wrapperModales').fadeOut()
        $('.uiModel').css('pointer-events', 'auto' )
        $('.overay').css('display', 'none' )
        menuLat.css('display', 'none' )
        openNotification()
        console.log('entra sieuiente');
        CargarMision(rallyIndex[0])
        $('#txtNotification').text(missioneActual[indexMision].bullet)
        $('#txtNotificationComplete').text(missioneActual[indexMision].bullet)
        $("#iconNotification").attr("src", urlIcon);
        $("#iconNotificationComplete").attr("src", urlIcon);
        var currents = localStorage.getItem('currentMission')
        if(currents === null){
            localStorage.setItem('currentMission', '[]')
        }
        
    })

    $('.btnXMision').on('click', function(){
        $('.pdfModal').css('display', 'none')
        $('.videoModal').css('display', 'none')
        $('.misionCard').fadeIn()
    })
/* Notificación misión actual interface UI */
function openNotification() {

    anime({
        targets: notification,
        translateX: 320,
        easing: 'easeInOutQuad',
        duration: 2000,
    })
    
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: 0,
            easing: 'easeInOutQuad',
            duration: 2000,
        })
    }, 8000)
}



});




