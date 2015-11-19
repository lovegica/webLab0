"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;


document.observe('dom:loaded', function() {
	// targetTimer = 0;
	// trapTimer = 0;
	// instantTimer = 0;
	$("start").observe("click", clickedStart);
	$("stop").observe("click", stopGame);
});

function clickedStart() {	//called when clicked the start button
	$("state").innerHTML = "Ready!";
	$("score").innerHTML = 0;
	instantTimer = setTimeout(startGame, 3000);
}

function startGame(){
	clearTimeout(targetTimer);
	clearTimeout(trapTimer);
	targetBlocks = [];
	startToCatch();
}

function stopGame(){
	$("state").innerHTML = "Stop";
	clearTimeout(targetTimer);
	clearTimeout(trapTimer); 
	targetBlocks = [];
}

function startToCatch(){
	$("state").innerHTML = "Catch!";

	targetTimer = setInterval(showTargetBlock, 1000);
	trapTimer = setInterval(showTrapBlock, 3000);
}

function showTargetBlock() {
	var r;
	var cnt;
	while(true) {
		cnt = 0;
		r = Math.floor( Math.random()*9 );
		for( var i=0; i<targetBlocks.length; i++ ) {
			if( targetBlocks[i] == r ) {
				cnt++;
			}
		}
		if( cnt==0 ) {
			targetBlocks.push(r);
			break;
		}
	}

	var block = $$(".blocks");
	for( var i=0; i<targetBlocks.length; i++ ) {
		block[targetBlocks[i]].addClassName("target");
	}

	if( isGameOver() ) {
		alert("you lose");
		stopGame();
	}
}

function showTrapBlock() {
	var r;
	var cnt;
	while(true) {
		cnt = 0;
		r = Math.floor( Math.random()*9 );
		for( var i=0; i<targetBlocks.length; i++ ) {
			if( targetBlocks[i] == r ) {
				cnt++;
			}
		}
		if( cnt==0 && r!=trapBlock ) {
			trapBlock = r;
			break;
		}
	}

	var block = $$(".blocks");
	block[r].addClassName("trap");

	trapTimer = setTimeout( function(){block[r].removeClassName("trap")}, 2000 );
}

function isGameOver() {
	var result = false;
	if( targetBlocks.length > 4 ) {
		result = true;
	}
	return result;
}
