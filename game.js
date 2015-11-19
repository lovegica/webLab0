"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;


document.observe('dom:loaded', function(){
	$("start").observe("click", function(){ // green
		$("state").innerHTML = "Ready!";
		$("score").innerHTML = 0;
		console.log(targetBlocks);
		
		clearInterval(targetTimer);
		clearInterval(trapTimer);
		clearInterval(instantTimer);
		setTimeout(startGame, 3000);
		//targetBlocks = [];
		
	});

	$("stop").observe("click", stopGame); //red 
});

function startGame(){
	var block = $$(".block");
	trapBlock = null;
	targetBlocks = [];

	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);

	for(var i=0;i<numberOfBlocks;i++){
		$$(".block")[i].stopObserving("click");
	}

	for(var i=0; i<block.length; i++) {
		block[i].removeClassName("target");
		block[i].removeClassName("trap");
	}
	startToCatch();
}

function stopGame(){

	$("state").textContent = "Stop";
	targetBlocks = [];
	trapBlock = null;
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);
	
	var block = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		$$(".block")[i].stopObserving("click");
	}
}


function startToCatch(){
	$("state").innerHTML = "Catch!";
	var blocks = $$(".block");
	var score = 0;

	targetTimer = setInterval(ViewTarget, 1000);
	trapTimer = setInterval(ViewTrap, 3000);

	for (var i = 0; i < numberOfBlocks; i++) {
        blocks[i].observe("click", function() {
			var sel = this.getAttribute("data-index");
			if (blocks[sel].hasClassName("target")) {
				score += 20;
				blocks[sel].removeClassName("target");
				blocks[sel].addClassName("normal");
				targetBlocks.splice(targetBlocks.indexOf(sel),1);
			}
			else if (blocks[sel].hasClassName("trap")) {
				score -= 30;
				blocks[sel].removeClassName("trap");
				blocks[sel].addClassName("normal");
				trapBlock = null;
			}else {
				score -= 10;
				blocks[sel].removeClassName("normal");
				blocks[sel].addClassName("wrong");
				instantTimer = setTimeout(function() {
					blocks[sel].removeClassName("wrong");
		    		blocks[sel].addClassName("normal");
				}, 100);
			}
			$("score").innerHTML = score + " ";
        });
    }
}

function ViewTarget(){

	if(targetBlocks.length<=4){

		var temp = Math.floor(Math.random() * 9);
		var blocks = $$(".block");

		while (blocks[temp].hasClassName("target") || temp == trapBlock) {
			temp = Math.floor(Math.random() * 9);
		}
		blocks[temp].addClassName("target");
		targetBlocks.push(temp);

		if (targetBlocks.length > 4) {
			clearInterval(targetTimer);
			clearInterval(trapTimer);
			clearInterval(instantTimer);
			alert("you lose");
			for (var i = 0; i < numberOfBlocks; i++){
				blocks[i].stopObserving("click");
			}
			stopGame();
		}
	}
}

function ViewTrap(){
	var temp = Math.floor(Math.random() * 9);
	var blocks=$$(".block");

	while(targetBlocks.indexOf(temp) != -1) {
		temp = Math.floor(Math.random() * 9);
	}
	trapBlock=temp;
	blocks[temp].removeClassName("normal");
	blocks[temp].addClassName("trap");

	instantTimer = setTimeout(function() {
		trapBlock = null;
		blocks[temp].removeClassName("trap");
		blocks[temp].addClassName("normal");
	}, 2000);
}
