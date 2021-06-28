import * as THREE from '../js/three.module.js';
import { OrbitControls } from '../js/code/js/controls/OrbitControls.js';
import { FBXLoader } from '../js/code/jsm/loaders/FBXLoader.js';
//variables THREE
var scene = "";
var camera = "";
var renderer = "";
//variablesBimboWow
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
//tag obj cambio Escena (clic otra Escena)
var tagFlecha = "Flecha";
//tag obj Quad objeto encontrado (clic quad invisible)
var tagObjetoEncontradoQuad = "QuadObjAEncontrar";
var tagPaloma = "Paloma";
var tagObjEncontrar = "objEncontrar"
var escenaActual;
var escenas = {
    foto1: { nombre: "cam_1_1.jpg", img:"" },
    foto2: { nombre: "cam_2.jpg",img: "" },
    foto3: { nombre: "cam_3.jpg",img: "" },
    foto4: { nombre: "cam_4_4.jpg",img: "" },
    foto5: { nombre: "cam_5.jpg",img: "" },
    foto6: { nombre: "cam_6.jpg", img: "" },
    foto7: { nombre: "cam_7.jpg", img: "" }
}


var misiones = {
    
    piña: "pina",
    globo: "globo",
    banana: "banana",
    refresco: "refresco",
    puerta: "puerta",
    foco: "foco",
    liquido: "liquido",
    manzana: "manzana",
    paraguas: "paraguas",
    espacio: "material de punto de venta",
    colado: "donitas"
}

var misionActual;
var objetos3DMisiones = {
    piña: "",
    globo: "",
    banana: "",
    refresco: "",
    puerta: "",
    foco: "",
    liquido: "",
    manzana: "",
    paraguas: "",
    espacio: "",
    colado: "",
}
var divFade;
var rt;
//funciones THREE
$(document).ready(function () {

    init();
animate();



var controls;


//funciones bimbo wow

function crearObjetosEscena()
{
    crearFlechasCambioEscena();

    //=ESCENA1
    //================================== //pinia  
    let piniaQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(-2.3, 1.2, -4),
                                                                                    "rotation": new THREE.Vector3(0,0,0)},
                                                    {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(-2.3, 1, -5),
                                                                                    "rotation": new THREE.Vector3(0,0,0)},
                                                    {"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(-3, 1.2, -1.5),
                                                                                    "rotation": new THREE.Vector3(0,1,0)}], misiones.piña);
    let piniaPaloma = crearPaloma([{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(-0.77, 0.35, -1.3),
                                                                                    "rotation": new THREE.Vector3(0,.5,0)},
                                                    {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(-0.82, 0.35, -1.8),
                                                                                    "rotation": new THREE.Vector3(0,0.5,0)},
                                                    {"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(-1.2, 0.42, -0.55),
                                                                                    "rotation": new THREE.Vector3(0,1.4,0)}], misiones.piña);
    scene.add(piniaPaloma)
    piniaQuadInvisible.on = function () {
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.piña.visible = true;
        AnimacionAparecer(objetos3DMisiones.piña)
        piniaPaloma.encendido = true;
        
        if (escenas.foto1.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.7590322502537878 - controls.getSphericalphi(),  0.6112979644588405 - controls.getSphericaltheta())
        }
        if (escenas.foto2.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.7199328201541653 - controls.getSphericalphi(),  0.3895380364590434 - controls.getSphericaltheta())
        }
        if (escenas.foto7.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.898230521686683 - controls.getSphericalphi(),  1.0745928300372292 - controls.getSphericaltheta())
        }
        
        
    }
    scene.add(piniaQuadInvisible);
    
    window["piñapaloma"] = piniaPaloma;


    //================================== //paraguas 
    let paraguasQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(0.5, -2, 2.7),
                                                                                    "rotation": new THREE.Vector3(0,0,0)},
                                                    {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(-4, -1.2, -2),
                                                                                    "rotation": new THREE.Vector3(0,1.1,0)},
                                                    {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(5, -1.3, 0.8),
                                                                                    "rotation": new THREE.Vector3(0,1,0)},
                                                    {"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(2, -1.5, -2.7),
                                                                                    "rotation": new THREE.Vector3(0,0,0)}], misiones.paraguas);
    let paraguasPaloma = crearPaloma([{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(0.23, -0.9, 1.3),
                                                                                    "rotation": new THREE.Vector3(0.5,3.5,0)},
                                                    {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(-2, -0.6, -0.9),
                                                                                    "rotation": new THREE.Vector3(0,1.1,0)},
                                                    {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(3, -0.67, 0.47),
                                                                                    "rotation": new THREE.Vector3(0,4.5,0)},
                                                    {"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(0.88, -0.6, -1.2),
                                                                                    "rotation": new THREE.Vector3(0,5.6,0)}], misiones.paraguas);
    
    scene.add(paraguasPaloma);                                                                                
    paraguasQuadInvisible.on = function () {
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.paraguas.visible = true;
        AnimacionAparecer(objetos3DMisiones.paraguas,true)
        paraguasPaloma.encendido = true;
        if (escenas.foto1.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.045576502355733 - controls.getSphericalphi(),  -3.000398852980815 - controls.getSphericaltheta())
        }
        if (escenas.foto2.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.3505279423566643 - controls.getSphericalphi(),  1.045739053809751 - controls.getSphericaltheta())
        }
        if (escenas.foto6.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.3116227701759864 - controls.getSphericalphi(),  -1.8656646643776982 - controls.getSphericaltheta())
        }
        if (escenas.foto7.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.2143598397242852 - controls.getSphericalphi(),  -0.7698356479552478 - controls.getSphericaltheta())
        }
    }
    scene.add(paraguasQuadInvisible);
    window["paraguaspaloma"] = paraguasPaloma;

    //================================== //manzana 
    let manzanaQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(3, -1.2, 0.3),
                                                                                        "rotation": new THREE.Vector3(0, 80, 0)}], misiones.manzana);
    let manzanaPaloma = crearPaloma([{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(1.5, -0.6, 0.15),
                                                                                        "rotation": new THREE.Vector3(0, 80, 0)}], misiones.manzana);
    
    scene.add(manzanaPaloma);                                                                                    
    manzanaQuadInvisible.on = function () {
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.manzana.visible = true;
        AnimacionAparecer(objetos3DMisiones.manzana)
        manzanaPaloma.encendido = true;
        if (escenas.foto1.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.2004402550494573 - controls.getSphericalphi(),  -1.673275640582711 - controls.getSphericaltheta())
        }
    }
    //manzanaQuadInvisible.position.set(3, -1.5, 0.3);
    //manzanaQuadInvisible.rotation.set(0, 80, 0);
    //console.log(manzanaQuadInvisible);
    scene.add(manzanaQuadInvisible);
    window["manzanapaloma"] = manzanaPaloma;

    //=ESCENA3
    //================================== //refresco  
    let refrescoQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(-2.5, 2.2, 6),
                                                                                        "rotation": new THREE.Vector3(0, 0, 0)},
                                                    {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(4, 1, -1),
                                                                                        "rotation": new THREE.Vector3(0, 2, 0)}], misiones.refresco);
    let refrescoPaloma = crearPaloma([{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(-0.83, 0.75, 2),
                                                                                        "rotation": new THREE.Vector3(0, 2.8, 0)},
                                                    {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(2.24, 0.6, -0.55),
                                                                                        "rotation": new THREE.Vector3(0, -1, 0)}], misiones.refresco);
    scene.add(refrescoPaloma);
    refrescoQuadInvisible.on = function () {
        
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.refresco.visible = true;
        AnimacionAparecer(objetos3DMisiones.refresco)
        refrescoPaloma.encendido = true;
        if (escenas.foto3.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.9339112671478993 - controls.getSphericalphi(),  2.653602917529087 - controls.getSphericaltheta())
        }
        if (escenas.foto4.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.8171957506058631 - controls.getSphericalphi(),  -1.386591143511673 - controls.getSphericaltheta())
        }
    }
   
    scene.add(refrescoQuadInvisible);
    window["refrescopaloma"] = refrescoPaloma;

    //================================== //platano   
    let platanoQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(4.2, 0, 4.5),
                                                                                        "rotation": new THREE.Vector3(0, 0, 0)},
                                                    {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(8, 0, .4),
                                                                                        "rotation": new THREE.Vector3(0, .9, 0)}], misiones.banana);
    let platanoPaloma = crearPaloma([{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(1, -0.05, 1.1),
                                                                                        "rotation": new THREE.Vector3(0, 3.8, 0)},
                                                    {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(2, -0.02, 0.16),
                                                                                        "rotation": new THREE.Vector3(0, 4.5, 0)}], misiones.banana);
    scene.add(platanoPaloma);  
    platanoQuadInvisible.on = function () {
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.banana.visible = true;
        AnimacionAparecer(objetos3DMisiones.banana,true)
        platanoPaloma.encendido = true;
        if (escenas.foto2.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.577280522158347 - controls.getSphericalphi(),  -1.762134124977938 - controls.getSphericaltheta())
        }
        if (escenas.foto3.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.570796326794901 - controls.getSphericalphi(),  -2.4753956149570366 - controls.getSphericaltheta())
        }
    }
    scene.add(platanoQuadInvisible);
    window["platanopaloma"] = platanoPaloma;

    //=ESCENA4
    //================================== //manchapiso 
    let manchapisoQuadInvisible = crearObjetoInvisible([
        {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(-0.3, -2, 0.8),"rotation": new THREE.Vector3(90, 0, 0)},
        {"escenaFoto":escenas.foto5.nombre,"position": new THREE.Vector3(1.5, -3, -2.5),"rotation": new THREE.Vector3(-.75, 0, 0)},
        {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-2.8, -3.5, -7),"rotation": new THREE.Vector3(90, 0, 0)}], misiones.liquido);
    let manchapisoPaloma = crearPaloma([
        {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(-0.15, -1.3, 0.5),"rotation": new THREE.Vector3(89, 3.2, 0)},
        {"escenaFoto":escenas.foto5.nombre,"position": new THREE.Vector3(0.7, -1.5, -1.2),"rotation": new THREE.Vector3(-0.6, -0.4, 0)},
        {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-0.8, -1, -2.05),"rotation": new THREE.Vector3(0, 0.4, 0)}], misiones.liquido);
    scene.add(manchapisoPaloma);
    manchapisoQuadInvisible.on = function () {
        //acceder al objeto3D y ponerlo visible
        objetos3DMisiones.liquido.visible = true;
        AnimacionAparecer(objetos3DMisiones.liquido)
        manchapisoPaloma.encendido = true;
        if (escenas.foto4.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 0.37122018455730615 - controls.getSphericalphi(),  2.4785296427160426 - controls.getSphericaltheta())
        }
        if (escenas.foto5.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 0.8121454692716649 - controls.getSphericalphi(),  -0.633884131738257 - controls.getSphericaltheta())
        }
        if (escenas.foto6.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.1752604096246677 - controls.getSphericalphi(),  0.2747137435646819 - controls.getSphericaltheta())
        }
    }
    scene.add(manchapisoQuadInvisible);
    window["manchapisopaloma"] = manchapisoPaloma;

    //================================== //puertarefri
    let puertarefriQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(0, -1, 7),
                                                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                                                        {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(2.1, -1.8, -2.5),
                                                                                            "rotation": new THREE.Vector3(0, 0, 0)}], misiones.puerta);
    let puertarefriPaloma = crearPaloma([{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(-0.1, -0.25, 2),
                                                                                            "rotation": new THREE.Vector3(0, 3, 0)},
                                                        {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(0.85, -0.68, -1),
                                                                                            "rotation": new THREE.Vector3(0, -0.6, 0)}], misiones.puerta);
    scene.add(puertarefriPaloma);                                                                                        
    puertarefriQuadInvisible.on = function () {
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.puerta.visible = true;
        AnimacionAparecer(objetos3DMisiones.puerta)
        puertarefriPaloma.encendido = true;
        if (escenas.foto3.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.4735333963432007 - controls.getSphericalphi(),  3.0296862486089924 - controls.getSphericaltheta())
        }
        if (escenas.foto4.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.0779974791729714 - controls.getSphericalphi(),  -0.8867677509126546 - controls.getSphericaltheta())
        }
    }
    scene.add(puertarefriQuadInvisible);
    window["puertarefripaloma"] = puertarefriPaloma;

    //=ESCENA5
    //================================== //lampara
    let lamparaQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto5.nombre,"position": new THREE.Vector3(0.3, 3, 3),
                                                                                        "rotation": new THREE.Vector3(90, 0, 0)},
                                                    {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-.2, 3, -4.1),
                                                                                        "rotation": new THREE.Vector3(1.5, 0, 0)}], misiones.foco);
    let lamparaPaloma = crearPaloma([{"escenaFoto":escenas.foto5.nombre,"position": new THREE.Vector3(0.11, 1.06, 1.02),
                                                                                        "rotation": new THREE.Vector3(0, 3.3, 0)},
                                                    {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-0.08, 0.72, -1),
                                                                                        "rotation": new THREE.Vector3(1.5, 0, 0)}], misiones.foco);
    scene.add(lamparaPaloma); 
    lamparaQuadInvisible.on = function () {
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.foco.visible = true;
        AnimacionAparecer(objetos3DMisiones.foco)
        lamparaPaloma.encendido = true;
        if (escenas.foto5.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 2.3553839657719147 - controls.getSphericalphi(),  3.139917569787579 - controls.getSphericaltheta())
        }
        if (escenas.foto6.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 2.186794886322305 - controls.getSphericalphi(),  -0.07948542816357515 - controls.getSphericaltheta())
        }
    }
    scene.add(lamparaQuadInvisible);
    window["lamparaPaloma"] = lamparaPaloma;

    //=ESCENA6
    //================================== //globo 
    let globoQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(5.9, 1.2, 3.7),
                                                                                    "rotation": new THREE.Vector3(0, 0, 0)}], misiones.globo);
    let globoPaloma = crearPaloma([{"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(1.58, 0.27, 1),
                                                                                    "rotation": new THREE.Vector3(0, 4, 0)}], misiones.globo);
    scene.add(globoPaloma); 
    globoQuadInvisible.on = function () {
        console.log("globo");
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.globo.visible = true;
        AnimacionAparecer(objetos3DMisiones.globo)
        globoPaloma.encendido = true;
        if (escenas.foto6.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.655090866519699 - controls.getSphericalphi(),  -2.2387224841912405 - controls.getSphericaltheta())
        }
    }
    //globoQuadInvisible.position.set(5.9, 1.2, 3.7);
    //console.log(globoQuadInvisible);
    scene.add(globoQuadInvisible);
    window["globopaloma"] = globoPaloma;

    //================================== //materialventa 
    let materialventaQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-0.1, -1.4, 2.5),
                                                                                            "rotation": new THREE.Vector3(0, 0, 0)}], misiones.espacio);
    let materialventaPaloma = crearPaloma([{"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-0.26, -0.5, 1.5),
                                                                                            "rotation": new THREE.Vector3(0, 3, 0)}], misiones.espacio);
    scene.add(materialventaPaloma);
    materialventaQuadInvisible.on = function () {
        console.log("materialventa");
        //para que no se apague cuando se encontro
        objetos3DMisiones.espacio. encendido = true;
        objetos3DMisiones.espacio.tag = tagPaloma;

        console.log(objetos3DMisiones.espacio)
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.espacio.visible = true;
        AnimacionAparecer(objetos3DMisiones.espacio)
                //compensar el cambio de letrero siempre prendido
                objetos3DMisiones.espacio.escalaInicial.x =objetos3DMisiones.espacio.escalaInicial.x * 4;
                objetos3DMisiones.espacio.escalaInicial.y =objetos3DMisiones.espacio.escalaInicial.y * 4;
                objetos3DMisiones.espacio.escalaInicial.z =objetos3DMisiones.espacio.escalaInicial.z * 4;
        materialventaPaloma.encendido = true;
        if (escenas.foto6.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.1363552374439851 - controls.getSphericalphi(),  2.9486338065658866 - controls.getSphericaltheta())
        }
    }
    //materialventaQuadInvisible.position.set(-0.1, -1.4, 2.5);
    //console.log(materialventaQuadInvisible);
    scene.add(materialventaQuadInvisible);
    window["materialventapaloma"] = materialventaPaloma;

    //=ESCENA7
    //================================== //donitas
    let donitasQuadInvisible = crearObjetoInvisible([{"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(2, -4, 1.8),
                                                                                        "rotation": new THREE.Vector3(45, 0, 0)},
                                                    {"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(-5, -2.5, 0),
                                                                                        "rotation": new THREE.Vector3(0, 1, 0)}], misiones.colado);
    let donitasPaloma = crearPaloma([{"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(0.78, -1.25, 0.6),
                                                                                        "rotation": new THREE.Vector3(45, 4, 0)},
                                                    {"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(-2, -1, 0.01),
                                                                                        "rotation": new THREE.Vector3(0, 1.5, 0)}], misiones.colado);
    scene.add(donitasPaloma);
    donitasQuadInvisible.on = function () {
        console.log("donitas");
        //acceder al objeto3D y ponermos visible
        objetos3DMisiones.colado.visible = true;
        //objetos3DMisiones.colado.scale
        AnimacionAparecer(objetos3DMisiones.colado)
        donitasPaloma.encendido = true;
        if (escenas.foto1.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 1.0844816745364163 - controls.getSphericalphi(),  1.479963556745292 - controls.getSphericaltheta())
        }
        if (escenas.foto7.nombre == escenaActual.nombre){
            controls.setSphericalDelta(0, 0.5657460454606997 - controls.getSphericalphi(),  -2.339227512324651 - controls.getSphericaltheta())
        }
    }
    scene.add(donitasQuadInvisible);
    window["donitaspaloma"] = donitasPaloma;
}
function crearFlechasCambioEscena() {
    //==Ir a la escena1
    //creamos la flecha
    let flechaE2IrEscena1 = crearBtnCambioEscena(escenas.foto2.nombre);
    flechaE2IrEscena1.rotation.set(0, 5.25, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE2IrEscena1.children[0].on = () => {
        CargarEscena(escenas.foto1,-110);
    }
    scene.add(flechaE2IrEscena1);
    //console.log(flechaE2IrEscena1)

    let flechaE7IrEscena1 = crearBtnCambioEscena(escenas.foto7.nombre);
    flechaE7IrEscena1.rotation.set(0, 4.15, 0)
    //Creamos y asignamos la funcion Onclick
    flechaE7IrEscena1.children[0].on = () => {
        CargarEscena(escenas.foto1,110);
    }
    scene.add(flechaE7IrEscena1);

    //=============================Ir a la escena2
    let flechaE1IrEscena2 = crearBtnCambioEscena(escenas.foto1.nombre);
    flechaE1IrEscena2.rotation.set(0, -8.4, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE1IrEscena2.children[0].on = () => {
        CargarEscena(escenas.foto2,110);
    }
    scene.add(flechaE1IrEscena2);

    let flechaE3IrEscena2 = crearBtnCambioEscena(escenas.foto3.nombre);
    flechaE3IrEscena2.rotation.set(0, 2.925, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE3IrEscena2.children[0].on = () => {
        CargarEscena(escenas.foto2,-135);
    }
    scene.add(flechaE3IrEscena2);

    //===================Ir a la escena3
    let flechaE2IrEscena3 = crearBtnCambioEscena(escenas.foto2.nombre);
    flechaE2IrEscena3.rotation.set(0, 2.23, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE2IrEscena3.children[0].on = () => {
        CargarEscena(escenas.foto3,140);
    }
    scene.add(flechaE2IrEscena3);

    let flechaE4IrEscena3 = crearBtnCambioEscena(escenas.foto4.nombre);
    flechaE4IrEscena3.rotation.set(0, 2.58, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE4IrEscena3.children[0].on = () => {
        CargarEscena(escenas.foto3,-110);
    }
    scene.add(flechaE4IrEscena3);

    //====================Ir a la escena4
    let flechaE3IrEscena4 = crearBtnCambioEscena(escenas.foto3.nombre);
    flechaE3IrEscena4.rotation.set(0, 1.36, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE3IrEscena4.children[0].on = () => {
        CargarEscena(escenas.foto4,110);
    }
    scene.add(flechaE3IrEscena4);

    let flechaE5IrEscena4 = crearBtnCambioEscena(escenas.foto5.nombre);
    flechaE5IrEscena4.rotation.set(0, 3.75, 0);

    //Creamos y asignamos la funcion Onclick
    flechaE5IrEscena4.children[0].on = () => {
        CargarEscena(escenas.foto4,0);
    }
    scene.add(flechaE5IrEscena4);


    //============================Ir a la escena5
    let flechaE4IrEscena5 = crearBtnCambioEscena(escenas.foto4.nombre);
    //Creamos y asignamos la funcion Onclick
    flechaE4IrEscena5.rotation.set(0, 1, 0);
    flechaE4IrEscena5.children[0].on = () => {
        CargarEscena(escenas.foto5,10);
    }
    scene.add(flechaE4IrEscena5);

    let flechaE6IrEscena5 = crearBtnCambioEscena(escenas.foto6.nombre);
    flechaE6IrEscena5.rotation.set(0, 4.65, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE6IrEscena5.children[0].on = () => {
        CargarEscena(escenas.foto5,50);
    }
    scene.add(flechaE6IrEscena5);


    //================================Ir a la escena6
    let flechaE5IrEscena6 = crearBtnCambioEscena(escenas.foto5.nombre);
    //Creamos y asignamos la funcion Onclick
    flechaE5IrEscena6.rotation.set(0, .85, 0);
    flechaE5IrEscena6.children[0].on = () => {
        CargarEscena(escenas.foto6,-45);
    }
    scene.add(flechaE5IrEscena6);

    let flechaE7IrEscena6 = crearBtnCambioEscena(escenas.foto7.nombre);
    flechaE7IrEscena6.rotation.set(0, 1, 0);
    //Creamos y asignamos la funcion Onclick
    flechaE7IrEscena6.children[0].on = () => {
        CargarEscena(escenas.foto6,60);
    }
    scene.add(flechaE7IrEscena6);

    //==============================IR a la escena 7
    let flechaE6IrEscena7 = crearBtnCambioEscena(escenas.foto6.nombre);
    //Creamos y asignamos la funcion Onclick
    flechaE6IrEscena7.rotation.set(0, 2.6, 0);
    flechaE6IrEscena7.children[0].on = () => {
        CargarEscena(escenas.foto7,-70);
    }
    scene.add(flechaE6IrEscena7);

    let flechaE1IrEscena7 = crearBtnCambioEscena(escenas.foto1.nombre);
    //Creamos y asignamos la funcion Onclick
    flechaE1IrEscena7.rotation.set(0, 5.65, 0);
    flechaE1IrEscena7.children[0].on = () => {
        CargarEscena(escenas.foto7,-110);
    }
    scene.add(flechaE1IrEscena7);
}

function crearObjetoInvisible(grupoEscenaX, mision)
{
    let geometry = new THREE.PlaneGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00B6FF, transparent: true, opacity: 0, side: THREE.DoubleSide });
    let obj = new THREE.Mesh(geometry, material);
    //asignamos el tag
    obj.tag = tagObjetoEncontradoQuad;
    //asignamos el grupo donde pertenece este objeto
    obj.grupo = grupoEscenaX;
    //asignamos su mision
    obj.mision = mision;
    obj.escalaInicial = obj.scale.clone();
    
    return obj;
}

function crearPaloma(grupoEscenaX, mision)
{
    let geometry = new THREE.PlaneGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 1, map: new THREE.TextureLoader().load("./shared/img/modelo/Imagenes/correcto.png"), side: THREE.DoubleSide });
    let obj = new THREE.Mesh(geometry, material);
    obj.scale.set(.1,.1,.1);
    //asignamos el tag
    obj.tag = tagPaloma;
    obj.encendido = false;
    //asignamos el grupo donde pertenece este objeto
    obj.grupo = grupoEscenaX;
    //asignamos su mision
    obj.mision = mision;
    obj.escalaInicial = obj.scale.clone();
    
    return obj;
}

function crearBtnCambioEscena(grupoEscenaX)
{
    let geometry = new THREE.PlaneGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ transparent: true, map: new THREE.TextureLoader().load("./shared/img/modelo/Imagenes/siguiente.png"), side: THREE.DoubleSide });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(.3, .3, .3)
    mesh.position.set(-3, 0, 1.2);
    mesh.rotation.set(0, 90, 0);
    mesh.tag = tagFlecha;
    let flechaPadre = new THREE.Group();
    flechaPadre.add(mesh);
    flechaPadre.grupo = grupoEscenaX;
    //asignamos el tag
    flechaPadre.tag = tagFlecha;
    flechaPadre.escalaInicial = flechaPadre.scale.clone();
    return flechaPadre;
}
function CargarFade()
{
    divFade = $("#fade");//.css("background-color");
    divFade.css("backgroundColor", "#000000");
}
function FadeIn(callback, duracion = 1)
{
    gsap.to(divFade, {
        duration: duracion, ease: "slow(0.7, 0.7, false)", css: {
            backgroundColor: "#00000000"
        }, onComplete: function () {
            controls.enabled = true;
            return callback;
        }
    });
}
function FadeOut(callback, duracion = 1, grados=0)
{
    gsap.to(divFade, {
        duration: duracion, ease: "slow(0.7, 0.7, false)", css: {
            backgroundColor: "#000000"
        }, onComplete: function () {
            //grados que se rotara la camara, para arreglar la rotacionde los skybox
            rotarCamara(grados)
            controls.enabled = false;
            return callback();
        }
    });
}

function SinMision(){
    misionActual = "sin mision";
    console.log(misionActual);
    EstablecerObjetosEscena(escenaActual.nombre);
}
function CargarMision(missionName) {
    misionActual = misiones[ missionName ];
    console.log(misionActual);
    EstablecerObjetosEscena(escenaActual.nombre);
}
function CargarTexturaSkybox()
{
    escenas.foto1.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto1.nombre, ()=>
    {
        rt = new THREE.WebGLCubeRenderTarget(escenas.foto1.img.image.width);
        CambiarFotoSkybox(escenas.foto1);
        rotarCamara(7)
        EstablecerObjetosEscena(escenas.foto1.nombre);
    });
   escenas.foto2.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto2.nombre);
   escenas.foto3.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto3.nombre);
   escenas.foto4.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto4.nombre);
   escenas.foto5.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto5.nombre);
   escenas.foto6.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto6.nombre);
   escenas.foto7.img = new THREE.TextureLoader().load('./shared/img/modelo/Imagenes/Tienda360/' + escenas.foto7.nombre);
}
function CargarEscena(escena_foto,gradosRotar)
{
    //FadeOut(CambiarFotoSkybox(escena_foto));
    FadeOut(() => {
        CambiarFotoSkybox(escena_foto)
        EstablecerObjetosEscena(escena_foto.nombre);
    }, 1, gradosRotar)
}
function CambiarFotoSkybox(escena_foto)
{
    FadeIn();
    escenaActual = escena_foto;
     //rt = new THREE.WebGLCubeRenderTarget(escena_foto.img.image.width);
    rt.fromEquirectangularTexture(renderer, escena_foto.img);
    scene.background = rt;
}
function EstablecerObjetosEscena(escenaActual)
{
    //recorremos todos los objetos de la escena
    scene.children.forEach(objeto => {
        //si el objeto no tiene un grupo
        if(objeto.grupo != undefined)
        {
            if(objeto.tag === tagFlecha)
            {
                //la flecha esta en la escena actual
                if(objeto.grupo == escenaActual )
                {
                    objeto.visible = true;
                    objeto.children[0].visible = true;
                    objeto.scale.set(objeto.escalaInicial.x, objeto.escalaInicial.y, objeto.escalaInicial.z);
                }else
                {
                    //escalamos la flecha para que no afecte el click,y lo hacemos invisible
                    objeto.scale.set(0,0,0);
                    objeto.visible = false;
                }

            }else if(objeto.tag === tagObjetoEncontradoQuad)
            {
                if(objeto.mision == misionActual)
                {
                    //apagar y escalar el objeto, si se encuentra en la escena correcta se prendera
                    objeto.visible=false;
                    objeto.scale.set(0, 0, 0);
                    //recorremos el arreglo grupo, en cada elemento hay[{escena:foto,position:vecto3, rotation:vector3},{escena:foto,position:vecto3, rotation:vector3}, {...}]
                    objeto.grupo.forEach(element => {
                        if(element.escenaFoto == escenaActual)
                        {
                            //console.log(objeto)
                            objeto.visible=true; 
                            objeto.position.set(element.position.x,element.position.y,element.position.z);
                            objeto.rotation.set(element.rotation.x,element.rotation.y,element.rotation.z);
                            objeto.scale.set(objeto.escalaInicial.x, objeto.escalaInicial.y, objeto.escalaInicial.z);
                            return;
                        }
                    });
                    
                }else
                {
                    //escalar y poner invisible para que afecte el click en otros objetos
                    //objeto.scale.set(0,0,0)
                    objeto.visible=false;
                    gsap.to(objeto.scale, {
                        duration: 1, x: (.0001),
                        ease: "expo.out",
                        y: (.0001),
                        z: (.0001)
                    }); 
                }              
            }else if(objeto.tag == tagObjEncontrar)
            {
                if(objeto.mision == misionActual)
                {
                    //apagar y escalar el objeto, si se encuentra en la escena correcta se prendera
                    objeto.visible=false;
                    gsap.to(objeto.scale, {
                        duration: 1, x: (.00001),
                        ease: "expo.out",
                        y: (.00001),
                        z: (.00001)
                    }); 
                    //recorremos el arreglo grupo, en cada elemento hay[{escena:foto,position:vecto3, rotation:vector3},{escena:foto,position:vecto3, rotation:vector3}, {...}]
                    objeto.grupo.forEach(element => {
                        if(element.escenaFoto == escenaActual)
                        {
                            objeto.visible=false;
                            objeto.position.set(element.position.x,element.position.y,element.position.z);
                            objeto.rotation.set(element.rotation.x,element.rotation.y,element.rotation.z);
                            //objeto.scale.set(objeto.escalaInicial.x, objeto.escalaInicial.y, objeto.escalaInicial.z);
                            gsap.to(objeto.scale, {
                                duration: 1, x: (0),
                                ease: "expo.out",
                                y: (0),
                                z: (0)
                            });
                            return;
                        }
                    });
                }else
                {
                    objeto.visible=false;
                    gsap.to(objeto.scale, {
                        duration: 1, x: (.00001),
                        ease: "expo.out",
                        y: (.00001),
                        z: (.00001)
                    }); 
                }
                // gsap.to(objeto.scale, {
                //     duration: 1, x: (.0001),
                //     ease: "expo.out",
                //     y: (.0001),
                //     z: (.0001)
                // });
                
            }else if (objeto.tag == tagPaloma)
            {
                if (objeto.encendido)
                {
                     //apagar y escalar el objeto, si se encuentra en la escena correcta se prendera
                     objeto.visible=false;
                     gsap.to(objeto.scale, {
                         duration: 1, x: 0,
                         ease: "expo.out",
                         y: (0),
                         z: (0)
                     }); 
                     //recorremos el arreglo grupo, en cada elemento hay[{escena:foto,position:vecto3, rotation:vector3},{escena:foto,position:vecto3, rotation:vector3}, {...}]
                     objeto.grupo.forEach(element => {
                         if(element.escenaFoto == escenaActual)
                         {
                            //console.log("es una paloma, en la escena correcta")

                             objeto.visible=true;
                             objeto.position.set(element.position.x,element.position.y,element.position.z);
                             objeto.rotation.set(element.rotation.x,element.rotation.y,element.rotation.z);
                             gsap.to(objeto.scale, {
                                 duration: 2, x: (objeto.escalaInicial.x),
                                 ease: "expo.out",
                                 y: (objeto.escalaInicial.y),
                                 z: (objeto.escalaInicial.z)
                             });
                             return;
                         }
                     });

                }else
                {
                    objeto.visible=false;
                    gsap.to(objeto.scale, {
                        duration: 1, x: (.0001),
                        ease: "expo.out",
                        y: (.0001),
                        z: (.0001)
                    }); 
                }

            }
        }        
    });    
}
function AnimacionAparecer(_mesh, habilitarGiro = false) {

    //openNotificationComplete()
   
    setTimeout(()=>{
        $("#games").fadeIn()
        $("#games").load('./shared/views/games.html');
        //desactivar mision
        SinMision();
    }, 3000)
   
    //_mesh.position.set = _mesh.posicionInicial;
    _mesh.scale.set = _mesh.escalaInicial;
    ScaleX2(_mesh);
    //AcercarALaCamara(_mesh);
    if (habilitarGiro) { Rotar360(_mesh) }
    function ScaleX2(mesh) {
        gsap.to(mesh.scale, {
            duration: 2, x: (mesh.escalaInicial.x * 4),
            ease: "expo.out",
            y: (mesh.escalaInicial.y * 4),
            z: (mesh.escalaInicial.z * 4)
        });
    }
    function AcercarALaCamara(mesh) {
        gsap.to(mesh.position, {
            duration: 2,
            ease: "expo.out",
            x: (mesh.posicionInicial.x * .5),
            y: (mesh.posicionInicial.y * .5),
            z: (mesh.posicionInicial.z * .5)
        });
    }
    function Rotar360(mesh) {
        gsap.to(mesh.rotation, {
            duration: 4,
            ease: "expo.out",
            y: (12)
        });
    }    
}
function cargarPlatano()
{
    let platano3d = new FBXLoader();
    platano3d.load('./shared/img/modelo/Fbx/platano_richi.fbx', fbx => {
        fbx.scale.set(.001,.001,.001)
        let _platano = fbx.children[0];
        _platano.position.set(2, 0, 2);
        _platano.material = new THREE.MeshLambertMaterial({ map: _platano.material.map });
        objetos3DMisiones.banana = _platano;
        _platano.visible = false;
        _platano.grupo = [{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(2, 0, 2.25),
                                                            "rotation": new THREE.Vector3(-1.5, 0, 0)},
                        {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(3, 0, .2),
                                                            "rotation": new THREE.Vector3(-1.5, 0, 0)}];
        _platano.tag = tagObjEncontrar;
        _platano.mision = misiones.banana;
        _platano.escalaInicial = _platano.scale.clone();
        _platano.posicionInicial = _platano.position.clone();
        scene.add(_platano);
    })
}
function cargarRefresco() {
    let refresco3d = new FBXLoader();
    refresco3d.load('./shared/img/modelo/Fbx/refresco_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _refresco = fbx.children[0];
        //console.log(_refresco)
        _refresco.position.set(-2.5, 2.2, 6);
        _refresco.material[0] = new THREE.MeshBasicMaterial({ map: _refresco.material.map });
        _refresco.material.side = THREE.DoubleSide;
        objetos3DMisiones.refresco = _refresco;
        _refresco.visible = false;
        _refresco.grupo = [{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(-2.5, 2.2, 6),
                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                            {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(4, 1, -1),
                                                            "rotation": new THREE.Vector3(0, 0, 0)}];
        _refresco.tag = tagObjEncontrar;
        _refresco.mision = misiones.refresco;
        _refresco.escalaInicial = _refresco.scale.clone();
        _refresco.posicionInicial = _refresco.position.clone();
        scene.add(_refresco);
    })
}
function cargarPinia() {
    let pinia3d = new FBXLoader();
    pinia3d.load('./shared/img/modelo/Fbx/pina_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _pinia = fbx.children[0];
        _pinia.position.set(-2.3, 1.2, -4);
        _pinia.material = new THREE.MeshLambertMaterial({ map: _pinia.material.map });
        _pinia.material.side = THREE.DoubleSide;
        objetos3DMisiones.piña = _pinia;
        _pinia.visible = false;
        _pinia.grupo = [{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(-2.3, 1.2, -4),
                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                        {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(-2.3, 1.2, -5),
                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                        {"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(-3, 1.2, -1.5),
                                                            "rotation": new THREE.Vector3(0, 0, 0)}];
        _pinia.tag = tagObjEncontrar;
        _pinia.mision= misiones.piña;
        _pinia.escalaInicial = _pinia.scale.clone();
        _pinia.posicionInicial = _pinia.position.clone();
        scene.add(_pinia);
    })

}
function cargarParaguas() {
    let paraguas3d = new FBXLoader();
    paraguas3d.load('./shared/img/modelo/Fbx/paraguas_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _paraguas = fbx.children[0];
        _paraguas.position.set(0.5, -2, 2.7);
        _paraguas.material[0] = new THREE.MeshBasicMaterial({ map: _paraguas.material.map });
        _paraguas.material.side = THREE.DoubleSide;
        objetos3DMisiones.paraguas = _paraguas;
        _paraguas.visible = false;
        _paraguas.grupo = [{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(0.5, -2, 2.7),
                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                            {"escenaFoto":escenas.foto2.nombre,"position": new THREE.Vector3(-4.55, -1.2, -2),
                                                            "rotation": new THREE.Vector3(0, 1.1, 0)},
                            {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(5, -1.3, 0.8),
                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                            {"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(2, -1.5, -2.7),
                                                            "rotation": new THREE.Vector3(0, 0, 0)}];
        _paraguas.tag = tagObjEncontrar;
        _paraguas.mision = misiones.paraguas;
        _paraguas.escalaInicial = _paraguas.scale.clone();
        _paraguas.posicionInicial = _paraguas.position.clone();
        scene.add(_paraguas);
    })
}
function cargarManchaPiso() {
    let manchapiso3d = new FBXLoader();
    manchapiso3d.load('./shared/img/modelo/Fbx/mancha_piso_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _manchapiso = fbx.children[0];
        _manchapiso.position.set(-0.3, -2, 0.8);
        _manchapiso.material = new THREE.MeshBasicMaterial({ map: _manchapiso.material.map });
        //carga alpha
        let alphaMap = new THREE.TextureLoader().load('./shared/img/modelo/Fbx/alphaMancha.png');
        _manchapiso.material.transparent = true
        _manchapiso.material.alphaMap = alphaMap
        _manchapiso.material.alphaMap.magFilter = THREE.NearestFilter
        _manchapiso.material.alphaMap.wrapT = THREE.RepeatWrapping
        _manchapiso.material.alphaMap.repeat.y = 1
        _manchapiso.material.alphaTest = 0.5
        //fin carga alpha
        objetos3DMisiones.liquido = _manchapiso;
        _manchapiso.visible = false;
        _manchapiso.grupo = [{"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(-0.3, -2, 0.8),"rotation": new THREE.Vector3(0, 0, 0)},
                            {"escenaFoto":escenas.foto5.nombre,"position": new THREE.Vector3(1.5, -3, -2.5),"rotation": new THREE.Vector3(0, 0, 0)},
                            {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-1.75, -2.2, -4.2),"rotation": new THREE.Vector3(90, 0, 0)}];
        _manchapiso.tag = tagObjEncontrar;
        _manchapiso.mision = misiones.liquido;
        _manchapiso.escalaInicial = _manchapiso.scale.clone();
        _manchapiso.posicionInicial = _manchapiso.position.clone();
        scene.add(_manchapiso);
    })
}
function cargarManzana() {
    let manzana3d = new FBXLoader();
    manzana3d.load('./shared/img/modelo/Fbx/manzana_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _manzana = fbx.children[0];
        _manzana.position.set(3, -1.5, 0.3);
        _manzana.material = new THREE.MeshLambertMaterial({ map: _manzana.material.map });
        _manzana.material.side = THREE.DoubleSide;
        objetos3DMisiones.manzana = _manzana;
        _manzana.visible = false;
        _manzana.grupo =[{"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(3, -1.2, 0.3),
                                                            "rotation": new THREE.Vector3(2.5, .5, 1)}];
        _manzana.tag = tagObjEncontrar;
        _manzana.mision = misiones.manzana;
        _manzana.escalaInicial = _manzana.scale.clone();
        _manzana.posicionInicial = _manzana.position.clone();
        scene.add(_manzana);
    })
}
function cargarGlobo() {
    let globo3d = new FBXLoader();
    globo3d.load('./shared/img/modelo/Fbx/globo_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _globo = fbx.children[0];
        //console.log(_globo)
        _globo.position.set(5.9, -0.2, 3.7);
        _globo.material = new THREE.MeshLambertMaterial({ map: _globo.material.map });
        objetos3DMisiones.globo = _globo;
        _globo.visible = false;
        _globo.grupo = [{"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(5.9, -0.2, 3.7),
                                                            "rotation": new THREE.Vector3(0, 0, 0)}];
        _globo.tag = tagObjEncontrar;
        _globo.mision = misiones.globo;
        _globo.escalaInicial = _globo.scale.clone();
        _globo.posicionInicial = _globo.position.clone();
        scene.add(_globo);
    })
}
function cargarMaterialVenta() {
    let materialVenta3d = new FBXLoader();
    materialVenta3d.load('./shared/img/modelo/Fbx/anuncio_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _materialVenta = fbx.children[0];
        _materialVenta.position.set(-0.1, -1.4, 2.5);
        _materialVenta.material = new THREE.MeshBasicMaterial({ map: _materialVenta.material.map });
        objetos3DMisiones.espacio = _materialVenta;
        _materialVenta.visible = false;
        _materialVenta.grupo =[{"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-0.1, -1.38, 2.45),
                                                                "rotation": new THREE.Vector3(0, 0.45, 0)}] ;
        _materialVenta.tag = tagObjEncontrar;
        _materialVenta.mision = misiones.espacio;
        _materialVenta.escalaInicial = _materialVenta.scale.clone();
        _materialVenta.posicionInicial = _materialVenta.position.clone();
        scene.add(_materialVenta);
        console.log(_materialVenta)
    })
}
function cargarPuertaRefri() {
    let puertaRefri3d = new FBXLoader();
    puertaRefri3d.load('./shared/img/modelo/Fbx/manija.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _puertaRefri = fbx.children[0];
        _puertaRefri.position.set(2.1, -1.8, -2.5);
        _puertaRefri.material = new THREE.MeshBasicMaterial({ map: _puertaRefri.material.map });
        _puertaRefri.material.side = THREE.DoubleSide;
        objetos3DMisiones.puerta = _puertaRefri;
        _puertaRefri.visible = false;
        _puertaRefri.grupo = [{"escenaFoto":escenas.foto3.nombre,"position": new THREE.Vector3(0, -1, 7),
                                                                "rotation": new THREE.Vector3(0, 2, 0)},
                            {"escenaFoto":escenas.foto4.nombre,"position": new THREE.Vector3(2.1, -1.8, -2.5),
                                                                "rotation": new THREE.Vector3(0, 1.5, 0)}];
        _puertaRefri.tag = tagObjEncontrar;
        _puertaRefri.mision = misiones.puerta;
        _puertaRefri.escalaInicial = _puertaRefri.scale.clone();
        _puertaRefri.posicionInicial = _puertaRefri.position.clone();
        scene.add(_puertaRefri);
    })
}

function cargarLampara() {
    let lampara3d = new FBXLoader();
    lampara3d.load('./shared/img/modelo/Fbx/foco_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _lampara = fbx.children[0];
        //console.log(_lampara.material)
        _lampara.position.set(0.3, 3, 3);
        _lampara.material[0] = new THREE.MeshBasicMaterial({ map: _lampara.material.map });
        _lampara.material.side = THREE.DoubleSide;
        objetos3DMisiones.foco = _lampara;
        _lampara.visible = false;
        _lampara.grupo = [{"escenaFoto":escenas.foto5.nombre,"position": new THREE.Vector3(0.3, 3, 3),
                                                            "rotation": new THREE.Vector3(0, 0, 0)},
                        {"escenaFoto":escenas.foto6.nombre,"position": new THREE.Vector3(-.2, 3, -4.1),
                                                            "rotation": new THREE.Vector3(0, 0, 0)}];
        _lampara.tag = tagObjEncontrar;
        _lampara.mision = misiones.foco;
        _lampara.escalaInicial = _lampara.scale.clone();
        _lampara.posicionInicial = _lampara.position.clone();
        scene.add(_lampara);
    })
}
function cargarDonitas() {
    let donitas3d = new FBXLoader();
    donitas3d.load('./shared/img/modelo/Fbx/donitas_1.fbx', fbx => {
        fbx.scale.set(.001, .001, .001)
        let _donitas = fbx.children[0];
        //console.log(_donitas)
        _donitas.position.set(2, -4, 1.8);
        _donitas.material = new THREE.MeshLambertMaterial({ map: _donitas.material.map });
        _donitas.material.side = THREE.DoubleSide;
        objetos3DMisiones.colado = _donitas;
        _donitas.visible = false;
        _donitas.grupo =[{"escenaFoto":escenas.foto7.nombre,"position": new THREE.Vector3(2, -4, 1.8),
                                                            "rotation": new THREE.Vector3(0, 3, 1)},
                        {"escenaFoto":escenas.foto1.nombre,"position": new THREE.Vector3(-5, -2.5, 0),
                                                            "rotation": new THREE.Vector3(0, 0, 0)}];
        _donitas.tag = tagObjEncontrar;
        _donitas.mision = misiones.colado;
        _donitas.escalaInicial = _donitas.scale.clone();
        _donitas.posicionInicial = _donitas.position.clone();
        scene.add(_donitas);
    })
}
//rotar la camara para compensar el dasfase de los render
function rotarCamara(grados) {
    controls.rotate(grados * Math.PI / 180)
}

function init () {

	scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    var containerMode = document.getElementById('containerModel')

	containerMode.appendChild( renderer.domElement );
    controls = new OrbitControls(camera, renderer.domElement);
    const light = new THREE.AmbientLight(0x404040); // soft white light
    light.intensity = 7
    scene.add(light);
    //console.log(light);
    //console.log(controls.test);
    controls.enableZoom = false;
	//controls.update();
    camera.position.set(0, 0, 0.01);
    renderer.domElement.addEventListener('click', clickEvent);

    //document.body.appendChild(renderer.domElement);//touch
    containerMode.addEventListener('touchend', onDocumentTouchEnd, false);//touch
    //BimboWow
    CargarFade();
    cargarPlatano();
    cargarPinia();
    cargarRefresco();
    cargarManchaPiso();
    cargarParaguas();
    cargarManzana();
    cargarPuertaRefri();
    cargarGlobo();
    cargarMaterialVenta();
    cargarLampara();
    cargarDonitas();
    misionActual = "sin mision"
    crearObjetosEscena()
    //ejecutar CargarTexturaSkybox despues de cargar todos los FBX, 
    CargarTexturaSkybox();


//fin
CambioTamanioPantalla();
}
function clickEvent(e) {  
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {

        let object = intersects[0].object;
        if (object.tag === tagObjetoEncontradoQuad)
        {
            if (object.visible === true)
            {
                object.visible = false;
                object.on();
                //CargarMision(0)
            }
        } else if (object.tag === tagFlecha)
        {
            if (object.visible === true)
            {
                object.visible = false;

                object.on();
            }
        }

    }
    
}

function onDocumentTouchEnd(event) {
    event.preventDefault();

    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {

        let object = intersects[0].object;
        if (object.tag === tagObjetoEncontradoQuad) {
            if (object.visible === true) {
                object.visible = false;
                object.on();
                //CargarMision(0)
            }
        } else if (object.tag === tagFlecha) {
            if (object.visible === true) {
                object.visible = false;

                object.on();
            }
        }

    }
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
function CambioTamanioPantalla()
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('resize',CambioTamanioPantalla);
window["CargarMision"] = CargarMision;
//window["rotarCamara"] = rotarCamara;
window["controls"] = controls;

})