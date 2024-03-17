class game{} 



class elvis{

	constructor(x, y){
		this.x = x
		this.y = y

		this.state="playing"
		this.catchCountdown = 0

		this.width = 100;
		this.height = 100;
	}

	update(){
		this.x = mouseX

		if (this.state= "catching"){
			this.catchCountdown -= 1	
		}

		if (this.catchCountdown < 0){
			this.state = "playing"
		}
	}

	show(){

		if(this.state=="playing"){
			if (score < winScore){
				image(elvisReady, this.x, this.y, this.width, this.height)
			}
			if (score >= winScore){
				image(elvisGuitar, this.x, this.y, this.width, this.height)
			}
		}

		if(this.state=="catching"){
			image(elvisCatch, this.x, this.y, this.width, this.height)
			text('yes', width/2 - 50, height/4 )
		}


	}

	check(pints){
		for(let i = 0; i < pints.length; i++){
			if ((pints[i].y + pints[i].height > el.y + el.height /2) && (el.x * 1.5 + el.width * 0.5 > pints[i].x * 1.5 && el.x * 1.5  < pints[i].x * 1.5 + pints[i].width *0.5 )) {
				pints.splice(i, 1)
				this.state = "catching"
				this.catchCountdown = 20
				if (score < 10){
					commander.play()

				}
				score += 1
				if (score == winScore){
					yalehouse.play()
					yesYES.play()
				}
			}
		}
	}
}

class pint{
	constructor(x, y){
		this.x = x;
		this.y = y;

		this.width = 48
		this.height = 100

		this.xvelocity = 0;
		this.yvelocity = 2;
	}

	update(){
		this.yvelocity = score / 5 + 3

		this.x += this.xvelocity;
		this.y += this.yvelocity;
	}

	show(){
		image(guinnessPng, this.x, this.y, this.width, this.height)
	}
}

let el
let pints = []


function preload(){
	elvisReady = loadImage('standardElvis.gif')
	elvisCatch = loadImage('elvisGrab.gif')
	elvisGuitar = loadImage('elvis.gif')
	guinnessPng = loadImage('guinness.png')
	commander = loadSound('comradecommander.mp3')
	yesYES = loadSound('yesYES.mp3')
	yalehouse = loadSound('yalehouse.mp3')
	scream = loadSound('scream.mp3')
}

let score = 0
let winScore = 10

function setup(){
	createCanvas(windowWidth, windowHeight)
	el = new elvis(100,650)
	textSize(150)


	scream.setVolume(0.1)
}


function draw(){
	if (frameCount % 50 == 0){
		pints.push(new pint(Math.floor(Math.random()*width -25) , 0))
		//make sure they can't go out of bounds, currently some go too far left
	}


	if (score < 10){
		background(230);
	}
	else{
		background(200,240,180)
	}

	

	el.show()
	el.update()
	
	for(let i = 0; i < pints.length; i++){
		pints[i].update()
		pints[i].show()	
		if(pints[i].y > height - pints[i].height){
			pints.splice(i, 1)
			scream.play()
			if (score < 10){
				score = 0
			}
			
		}
	}
	
	el.check(pints)
}