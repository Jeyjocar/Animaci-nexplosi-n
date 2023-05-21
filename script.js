/*25-04-2023
Animación Explosión JAVASCRIPT
Jeyfrey Calero*/

/** Metodo para identificar el ID */
const canvas= document.getElementById("canvas1");
/*Metodo para agregar contexto (contexto sobre el cual vamos a dibujar*/
const ctx= canvas.getContext("2d");
/*le damos ancho al canvas utilizando la nomenclatura del punto, deberia ir siempre con el mismo valor que se dio dentro del CSS*/
ANCHO_CANVAS=canvas.width = 500;
ALTURA_CANVAS=canvas.height = 700;
/** bajar extension menu intelige y los que pase el profe para que salgan asistentes*/

/* 
ctx.fillStyle="white";
ctx.fillRect( 50,10, 90, 100);*/

/**Dentro del constructor se pueden usar otros parametro como nombre en vez de x w y, pero por las formulas se usa eso */
/** */

const miExplosion=[];
/** esto se usa para el proceso de giro, es para validar los rectangulos */
let posicion_canvas= canvas.getBoundingClientRect();

class Explosion{
    constructor(x,y){
        this.ancho_sprite= 210;
        this.alto_sprite= 180;
        this.width=this.ancho_sprite*0.6;
        this.height=this.alto_sprite*0.6;
        this.x=x;
        this.y=y;
        this.imagen=new Image();
        this.imagen.src= "explosion.png";
        this.frame=0;
        this.temporizador=0;/** este nombre es de una variable no de una función especifica */
        this.anguloExplosion=Math.random()*6.2;
        this.sonidoExplosion=new Audio();
        this.sonidoExplosion.src= "mi_explosion.wav";
    }
    actualizar(){
        if(this.frame === 0) this.sonidoExplosion.play();
        this.temporizador ++;
        if(this.temporizador % 10 === 0){
            this.frame ++;
        };
        
    }

    dibujar_explosion(){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.anguloExplosion);
        ctx.drawImage(this.imagen, this.ancho_sprite *this.frame,0, this.ancho_sprite, this.alto_sprite, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

/**creando el evento para que explote al momento de hacer click */


window.addEventListener("click", function(evento) {
    /* evento para generar clic */
    /*ctx.fillStyle="yellow";*/
    /*ctx.fillRect(e.x -posicion_canvas.left,e.y-posicion_canvas.top -25, 50,50);*/ /**Estos dos se usa para crear el cuadrado amarillo */

    /**push nos permite animar, agregar eventos a nuestro arreglo o criterios*/
    /**miExplosion.push( new Explosion(posicionX,posicionY));
    console.log(miExplosion);*/

/** evento para generar movimiento mouse */
    crearExplosion(evento);

}); 

window.addEventListener("mousemove", function(evento) {
    crearExplosion(evento);
});

function crearExplosion(evento){
    let posicionX=evento.x -posicion_canvas.left;
    let posicionY=evento.y-posicion_canvas.top;
    miExplosion.push( new Explosion(posicionX,posicionY));

}

function animadaExplosion(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let index = 0; index < miExplosion.length; index++) {
        miExplosion[index].actualizar();
        miExplosion[index].dibujar_explosion();
        if(miExplosion[index].frame>5){
            miExplosion.splice(index,1);
            index--;
        }
    
    }
    requestAnimationFrame(animadaExplosion);
}

animadaExplosion();