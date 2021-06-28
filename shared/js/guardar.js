$(document).ready(function () {
    var missionatual = $.parseJSON(localStorage.getItem('currentMission'))
   
    $('#txtProgress').text(LanObj.ui.titulo)
    $('#saveTxt').text(LanObj.ui.parrafo)
    $('#btnSalir').text(LanObj.ui.btnSalir)
    $('#btnCont').text(LanObj.ui.btncont)
   

    var progressIndex  = (100/11)
    var progressPan = missionatual.length*progressIndex
    console.log(progressPan);
    $('.imgProgress').css('width', ''+(progressPan/2)+'%' )
    $('.progressCat>div').css('width', ''+progressPan+'%' )
    
});