"use strict";

document.observe("dom:loaded", function() {
	// 필요한 모든 element들을 Draggabble 혹은 Droppables로 만드시오 
	// 	(힌트 $$ 함수를 사용하여 모든 image들을 찾으시오). 
	// 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. 
	//  (힌트: revert옵션을 적절히 지정하시오!) 
	
    Droppables.add("selectpad", {onDrop: 
    	labSelect});
    Droppables.add("labs", {onDrop: 
    	labSelect});

    var labImgs = $$("#labs > img");

    for(var i=0; i<labImgs.length; i++){
        new Draggable(labImgs[i], {revert: true});
    }	
});


function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */

	 if(drop.id == "selectpad"){
		var lists = $$("#selection > li");
		if(lists.length < 3){
		var imgs = $$("#labs > img");
			for(var i=0; i<imgs.length; i++){
				if(imgs[i].alt === drag.alt ){
					imgs[i].parentNode.removeChild(imgs[i]);
					$("selectpad").appendChild(imgs[i]);
					var li = document.createElement("li");
					li.innerHTML = imgs[i].alt;
					$("selection").appendChild(li);
					setTimeout(function(){li.pulsate({
										    duration: 1.0
											});}, 500);
					break;
				}
			}
		}
	} else {
		
		var imgs = $$("#selectpad > img");
		for(var i=0; i<imgs.length; i++){
			if(imgs[i].alt === drag.alt ){
				imgs[i].parentNode.removeChild(imgs[i]);
				$("labs").appendChild(imgs[i]);
				var lists = $$("#selection > li");
				for( var j=0; j<lists.length; j++){
					if(lists[j].innerHTML == imgs[i].alt){
						lists[j].remove();
					}
				}
				break;
			}
		}
	}
}




