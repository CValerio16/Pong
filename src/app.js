
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,
    sombraj1:null,
    sombraj2:null,
    sombrap:null,
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    dx: 5,
    dy: 5,
    choques: null,
    size:null,
    box1: null,
    box2: null,
    mov:10,
    fuego: null, tope1: false, tope2:false,
    j1D: false, j1U: false, j2D:false, j2U: false, s1: 0, s2:0, tension:false,
    updateBall: function() {
      this.pelota.setPosition(this.pelota.getPositionX()+this.dx, this.pelota.getPositionY()+this.dy);
      this.sombrap.setPosition(this.sombrap.getPositionX()+this.dx, this.sombrap.getPositionY()+this.dy);
      this.fuego.setPosition(this.pelota.getPosition());
      if(Math.abs(this.dx) > 14){
            this.pelota.setColor(cc.color(231,60,0));
            this.sombrap.setColor(cc.color(170,170,255));
            this.fuego.setVisible(true);
      }
      else if(Math.abs(this.dx) > 9){
           // this.pelota.setColor(cc.color(231,60,0));
            this.pelota.setColor(cc.color(255,255,0));
            this.sombrap.setColor(cc.color(100,100,255));
      }else{
          this.pelota.setColor(cc.color(255,255,255));
          this.sombrap.setColor(cc.color(0, 0,0));
          this.fuego.setVisible(false);
      }
    },
    checkColission: function(){
        var box = this.pelota.getBoundingBox();
        this.box1 = this.jugador1.getBoundingBox();
        this.box2 = this.jugador2.getBoundingBox();
        
        if(box.x >= this.size.width - (box.width)){
            this.s1++;
            this.efecto(box.x, box.y);
            cc.audioEngine.playEffect(res.score);
            this.puntuacion1.setString(this.s1);
            this.resetBall(1);
        }else if(box.x <= 0){
            this.efecto(box.x, box.y);
            this.s2++;
            cc.audioEngine.playEffect(res.score);
            this.puntuacion2.setString(this.s2);
            this.resetBall(0);
        }
        else if(box.y >= this.size.height - (box.width) || box.y <= 0){
            this.efecto(box.x, box.y);
            this.dy = this.dy*(-1);
            cc.audioEngine.playEffect(res.pop);
            this.choques++;
            this.updateSpeed();
        }
        else if(((box.x < this.box1.x + this.box1.width && box.x + box.width > this.box1.x
             && box.y < this.box1.y + this.box1.height && box.y + box.height > this.box1.y) && !this.tope1)
          || ((box.x < this.box2.x + this.box2.width && box.x + box.width > this.box2.x
             && box.y < this.box2.y + this.box2.height && box.y + box.height > this.box2.y) && !this.tope2)){
			if(box.x > this.size.width/2){
				this.tope2 = true;
				this.tope1 = false;
			}else{
				this.tope1 = true;
				this.tope2 = false;
			}
            this.efecto(box.x, box.y);
            this.dx = this.dx*(-1);
            cc.audioEngine.playEffect(res.pop);
            this.choques++;
            this.updateSpeed();
        }
        
    },
    updateSpeed: function(){
        cc.log(this.dx);
        if(this.choques%4===0 && Math.abs(this.dx) < 18){
            if(this.dx > 0){
                this.dx++;
                this.dy++;
            }else {
                this.dx--;
                this.dy--;  
            }
            this.mov++;
        }
    },
    resetBall: function(int){
      this.choques = 0;
      this.mov = 10;
      
      if(int){
          this.pelota.setPosition(this.size.width / 2 - 200,this.size.height / 2);
          this.sombrap.setPosition(this.size.width / 2 - 210,this.size.height / 2 - 10)
          this.dx = 5;
          this.dy = 5;
      }else{
          this.pelota.setPosition(this.size.width / 2 + 200,this.size.height / 2);
          this.sombrap.setPosition(this.size.width / 2 + 190,this.size.height / 2 - 10)
          this.dx = -5;
          this.dy = -5;
      }
	  this.tope1 = false;
	  this.tope2 = false;
     
    },
    moverRaquetaA: function (){
        var posY = this.jugador1.getPositionY();
        var mov = this.mov;
        
        if(this.j1D){
            if((posY - 65 - mov) >= 0){
                    this.jugador1.setPositionY(posY - mov);
                    this.sombraj1.setPositionY(this.sombraj1.getPositionY() - mov);
            }
        }else if(this.j1U){
             if((posY + mov + 65) < this.size.height){
                    this.jugador1.setPositionY(posY + mov);
                    this.sombraj1.setPositionY(this.sombraj1.getPositionY() + mov);
             }
        }
    },
    moverRaquetaB: function (){
        var posY = this.jugador2.getPositionY();
        var mov = this.mov;
        
        if(this.j2D){
            if((posY - mov - 65) >= 0){
                    this.jugador2.setPositionY(posY - mov);
                    this.sombraj2.setPositionY(this.sombraj2.getPositionY() - mov);
            }
        }else if(this.j2U){
             if((posY + mov + 65) < this.size.height){
                    this.jugador2.setPositionY(posY + mov);
                    this.sombraj2.setPositionY(this.sombraj2.getPositionY() + mov);
             }
        }
    },
    moverRaqueta1a: function(key, event){
        var juego = event.getCurrentTarget();
        switch(key){
            case cc.KEY.s :
                    juego.j1D = true;
                break;
                
            case cc.KEY.w :
                    juego.j1U = true;
                break;
        }
    
    },
    moverRaqueta1b: function(key, event){
         var juego = event.getCurrentTarget();
        switch(key){
            case cc.KEY.s :
                    juego.j1D = false;
                break;
                
            case cc.KEY.w :
                    juego.j1U = false;
                break;
        }
    },
    moverRaqueta2a: function(key, event){
         var juego = event.getCurrentTarget();
        switch(key){
            case cc.KEY.down :
                    juego.j2D = true;
                break;
                
            case cc.KEY.up :
                    juego.j2U = true;
                break;
        }
    
    },
    moverRaqueta2b: function(key, event){
        var juego = event.getCurrentTarget();
        switch(key){
            case cc.KEY.down :
                   juego.j2D = false;
                break;
                
            case cc.KEY.up :
                    juego.j2U = false;
                break;
        }
    },
    checkWinner:function(){
      if((this.s1 > 3 || this.s2 > 3) && !this.tension){
          this.tension = true;
          cc.audioEngine.stopMusic();
          cc.audioEngine.playMusic(res.tema2, true);
      }    
      if(this.s1 > 4){
          alert("El Ganador es el jugador 1!");
          cc.director.runScene(new HelloWorldScene());
      }else if(this.s2 > 4){
          alert("El Ganador es el jugador 2!");
          cc.director.runScene(new HelloWorldScene());
      } 
    },
    efecto: function(x, y){
        if(Math.abs(this.dx) <=14){
            var efecto = new cc.ParticleSystem(res.choque_plist);
        }else{
            var efecto = new cc.ParticleSystem(res.choquef_plist);
        }
        efecto.setDuration(0.2);
        efecto.setScale(0.3);
        efecto.setPosition(x, y);
        this.addChild(efecto,3);
    
    },
    inicializar:function(key, event){
        this.size = cc.winSize;
        var color = cc.color(100,100,100);
        var size = this.size;
        
        this.jugador1 =  new cc.Sprite(res.raqueta_png);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 2);
        
        this.sombraj1 =  new cc.Sprite(res.raqueta_png);
        this.sombraj1.setPosition(size.width * 0.09,size.height / 2 - 15);
        this.sombraj1.setColor(cc.color(0,0,0));
        this.addChild(this.sombraj1, 1);

        this.jugador2 =  new cc.Sprite(res.raqueta_png);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 2);   
        
        this.sombraj2 =  new cc.Sprite(res.raqueta_png);
        this.sombraj2.setPosition(size.width -(size.width * 0.11),size.height / 2 - 15);
        this.sombraj2.setColor(cc.color(0,0,0));
        this.addChild(this.sombraj2, 1);
        
        this.pelota = new cc.Sprite(res.bola_png);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 2);
        
        this.sombrap =  new cc.Sprite(res.bola_png);
        this.sombrap.setPosition(size.width / 2 - 10,size.height / 2 - 10);
        this.sombrap.setColor(cc.color(0,0,0));
        this.addChild(this.sombrap, 1);
        
        
        this.fondo = new cc.Sprite(res.fondo_png);
        this.fondo.setPosition(size.width/2, size.height/2);
        this.addChild(this.fondo);
		

        this.puntuacion1 = new cc.LabelTTF("0","Elephant", 40);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,4);

        this.puntuacion2 = new cc.LabelTTF("0","Elephant", 40);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,4);
        
        this.fuego = new cc.ParticleSystem(res.BolaFuego_plist);
        this.fuego.setScale(0.2);
        this.fuego.setPosition(size.width/2, size.height/2);
        this.addChild(this.fuego,1);

        this.choques = 1;
        
        this.schedule(this.updateBall, 1/60);
        this.schedule(this.checkColission, 1/60);
        this.schedule(this.moverRaquetaA, 1/60);
        this.schedule(this.moverRaquetaB, 1/60);
        this.schedule(this.checkWinner, 0.1);
        
        cc.audioEngine.playMusic(res.tema3, true);
        this.tension = false;
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.moverRaqueta1a,
            onKeyReleased: this.moverRaqueta1b
        }, this);
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.moverRaqueta2a,
            onKeyReleased: this.moverRaqueta2b
        }, this);

    },
    ctor:function () {
        this._super();
        this.inicializar();

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

