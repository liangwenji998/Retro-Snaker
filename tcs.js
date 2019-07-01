var map;
var food;
var snake;
var snake1;
var time;
var times;
var speed = 120;
var allWidth = 1000;
var allHeight = 600;
var foodWidth = 20;
var foodHeight = 20;
var foodxBlock = Math.floor(allWidth/foodWidth);
var foodyBlock = Math.floor(allHeight/foodHeight);
var marginLeft = (window.innerWidth - allWidth)/2;
var marginTop = (window.innerHeight - allHeight)/2;
var snakeBody = [[3,1,"rgb(255,255,255)",null],[2,1,"rgb(76,236,158)",null],[1,1,"rgb(76,236,158)",null]];
var snakeBody1 = [[15,12,"rgb(255,255,255)",null],[16,12,"blue",null],[17,12,"blue",null]];
var code;

function Map(){
	this.width = allWidth;
	this.height = allHeight;
	this.color = "#000";
	this.position = 'absolute';
	this.marginLeft = marginLeft;
	this.marginTop = marginTop;
	this._map = null;
	this.show = function(){
		this._map = document.createElement("div");
		this._map.style.backgroundColor = this.color;
		this._map.style.width = this.width + "px";
		this._map.style.border = this.border;
		this._map.style.height = this.height + "px";
		this._map.style.marginLeft = this.marginLeft + "px";
		this._map.style.marginTop = this.marginTop + "px";
		this._map.style.position = this.position;
		document.getElementsByTagName("body")[0].appendChild(this._map);
	}
}
function food(){
	this.width = foodWidth;
	this.height = foodHeight;
	this.color = "rgb(252,213,182)";
	this.position = "absolute";
	this.x = 0;
	this.y = 0;
	this._food = null;
	this.show = function(){
		if(this._food == null){
			this._food = document.createElement("div");
			this._food.style.backgroundColor = this.color;
			this._food.style.width = this.width + "px";
			this._food.style.height = this.height + "px";
			this._food.style.position = this.position;
			this._food.style.zIndex = "999"
			map._map.appendChild(this._food);
		}
		this.x = Math.floor(Math.random()*foodxBlock);
		this.y = Math.floor(Math.random()*foodyBlock);
		this._food.style.left = this.x*20 + "px";
		this._food.style.top = this.y*20 + "px";
	}	
}
function snake(){
	this.width = foodWidth;
	this.height = foodHeight;
	this.position = "absolute";
	this.body = snakeBody;
	this.direct = "right";
	this.show = function(){
		this.length = this.body.length;
		for( var i = 0 ; i < this.length ; i++ ){
			if( this.body[i][3] == null ){
				this.body[i][3] = document.createElement("div");
				this.body[i][3].style.width = this.width + "px";
				this.body[i][3].style.height = this.height + "px";
				this.body[i][3].style.backgroundColor = this.body[i][2];
				this.body[i][3].style.position = this.position;
				map._map.appendChild(this.body[i][3]);
			}
			this.body[i][3].style.left = this.body[i][0]*20 + "px";
			this.body[i][3].style.top = this.body[i][1]*20 + "px";
		}
	}
	this.move = function(){
		if( this.body[0][0] == food.x && this.body[0][1] == food.y ){
			this.body.push([0,0,"rgb(76,236,158)",null]);
			food.show();
		}
		var length = this.body.length;
		for( i = length - 1 ; i > 0 ; i-- ){
			this.body[i][0] = this.body[i-1][0];
			this.body[i][1] = this.body[i-1][1];
		}
		if( this.direct == "right"){
			this.body[0][0] += 1;
		}
		if( this.direct == "left"){
			this.body[0][0] -= 1;
		}
		if( this.direct == "up"){
			this.body[ 0 ][ 1 ] -= 1;
		}
		if( this.direct == "down"){
			this.body[ 0 ][ 1 ] += 1;
		}
		if(this.body[0][0] == -1||this.body[0][0] == foodxBlock  || this.body[0][1] == -1||this.body[0][1] == foodyBlock ){
            alert("撞墙了？菜！！！"+"\n玩家2胜");
            	clearInterval(time);
            	clearInterval(times);
            	return; 
        }
		if(this.body.length - 3 == 50 ){
            alert("玩家1胜");
            	clearInterval(time);
            	clearInterval(times);
            	return; 
        }
        for(var i = 1;i<this.body.length;i++){
           if(this.body[0][0] == this.body[i][0]&&this.body[0][1] == this.body[i][1]){
            	alert("菜逼，吃自己干啥？"+"\n玩家2胜");
            	clearInterval(time);
            	clearInterval(times);
            	return;
           }
        }
        for(var i = 1;i<snakeBody1.length;i++){
        	if(this.body[0][0] == snakeBody1[i][0]&&this.body[0][1] == snakeBody1[i][1]){
         		alert("玩家2获胜！1号玩家你好菜~");
            	clearInterval(time);
            	clearInterval(times);
         		return;
        	}
     	} 
		this.show();
	}
	
	this.setDirect = function(code){
		switch(code){
			case 37:
				if( this.direct != "right" ){
					this.direct = "left";
					clearInterval(time);
					snake.move();
					time = setInterval('snake.move()',speed);	
				}
				break;
			case 38:
				if( this.direct != "down" ){
					this.direct = "up";
					clearInterval(time);
					snake.move();
					time = setInterval('snake.move()',speed);
				}
				break;
			case 39:
				if( this.direct != "left" ){
					this.direct = "right";
					clearInterval(time);
					snake.move();
					time = setInterval('snake.move()',speed);
				}
				break;
			case 40:
				if( this.direct != "up" ){
					this.direct = "down";
					clearInterval(time);
					snake.move();
					time = setInterval('snake.move()',speed);
				}
				break;
		}	
	}
}
function snake1(){
	this.width = foodWidth;
	this.height = foodHeight;
	this.position = "absolute";
	this.body = snakeBody1;
	this.direct = "left";
	this.show = function(){
		this.length = this.body.length;
		for( var i = 0 ; i < this.length ; i++ ){
			if( this.body[i][3] == null ){
				this.body[i][3] = document.createElement("div");
				this.body[i][3].style.width = this.width + "px";
				this.body[i][3].style.height = this.height + "px";
				this.body[i][3].style.backgroundColor = this.body[i][2];
				this.body[i][3].style.position = this.position;
				map._map.appendChild(this.body[i][3]);
			}
			this.body[i][3].style.left = this.body[i][0]*20 + "px";
			this.body[i][3].style.top = this.body[i][1]*20 + "px";
		}
	}
	this.move = function(){
		if( this.body[0][0] == food.x && this.body[0][1] == food.y ){
			this.body.push([0,0,"blue",null]);
			food.show();
		}
		var length = this.body.length;
		for( i = length - 1 ; i > 0 ; i-- ){
			this.body[i][0] = this.body[i-1][0];
			this.body[i][1] = this.body[i-1][1];
		}
		if( this.direct == "right"){
			this.body[0][0] += 1;
		}
		if( this.direct == "left"){
			this.body[0][0] -= 1;
		}
		if( this.direct == "up"){
			this.body[ 0 ][ 1 ] -= 1;
		}
		if( this.direct == "down"){
			this.body[ 0 ][ 1 ] += 1;
		}
		if(this.body[0][0] == -1 || this.body[0][0] == foodxBlock  || this.body[0][1] == -1||this.body[0][1] == foodyBlock ){
            alert("撞墙了？菜！！！"+"\n玩家1胜" );
            clearInterval(time);
           	clearInterval(times);
            return; 
        }
        for(var i = 1;i<this.body.length;i++){
           if(this.body[0][0] == this.body[i][0]&&this.body[0][1] == this.body[i][1]){
            	alert("菜逼，吃自己干啥？"+"\n玩家1胜");
            	clearInterval(time);
            	clearInterval(times);
            	return;
           }
        }
        for(var i = 1;i<snakeBody.length;i++){
        	if(this.body[0][0] == snakeBody[i][0]&&this.body[0][1] == snakeBody[i][1]){
         		alert("玩家1获胜！2号玩家你好菜~");
            	clearInterval(time);
            	clearInterval(times);
         		return;
        	}
     	}
		this.show();
	}
	this.setDirect = function(code){
		switch(code){
			case 65:
				if( this.direct != "right" ){
					this.direct = "left";
					clearInterval(times);
					snake1.move();
					times = setInterval('snake1.move()',speed);	
				}
				break;
			case 87:
				if( this.direct != "down" ){
					this.direct = "up";
					clearInterval(times);
					snake1.move();
					times = setInterval('snake1.move()',speed);	
				}
				break;
			case 68:
				if( this.direct != "left" ){
					this.direct = "right";
					clearInterval(times);
					snake1.move();
					times = setInterval('snake1.move()',speed);	
				}
				break;
			case 83:
				if( this.direct != "up" ){
					this.direct = "down";
					clearInterval(times);
					snake1.move();
					times = setInterval('snake1.move()',speed);	
				}	
				break;
		}	
	}
}
window.onload=function(){
	map = new Map();
	map.show();
	
	food = new food();
	food.show();
	
	snake = new snake();
	snake.show();
	snake.move();
	time = setInterval('snake.move()',speed);
	
	snake1 = new snake1();
	snake1.show();
	snake1.move();
	times = setInterval('snake1.move()',speed);
	
	document.onkeydown = function(event){
		if(window.event){
			code = window.event.keyCode;
		}else{
			clearInterval(time);
			code = event.keyCode;
		}
		snake.setDirect(code);
		snake1.setDirect(code);
	}
}
