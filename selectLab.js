"use strict";

document.observe("dom:loaded", function() {
	// 필요한 모든 element들을 Draggabble 혹은 Droppables로 만드시오 
	// 	(힌트 $$ 함수를 사용하여 모든 image들을 찾으시오). 
	// 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. 
	//  (힌트: revert옵션을 적절히 지정하시오!) 
	var img =$$("#labs img");

	for (var i =0; i < img.length; i++) {
		new Draggable(img[i], {revert: true});
	}
	Droppables.add("labs", {onDrop: labSelect}); //function 
	Droppables.add("selectpad", {onDrop: labSelect}); //function
	
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	* 이 event-handler function을 작성하시오.
	*/
	// var flag = drop.childNodes.length;
	// var images = $$('img');
	if(drop.id == "selectpad"){
		if(drag.parentNode.id!="selectpad"){
			if($$("#selectpad img").length<=2){
				drag.remove();
				drop.appendChild(drag);
				var li = document.createElement("li");
				var select = $("selection");
				li.innerHTML=drag.alt;
				setTimeout(
					function(){select.appendChild(li);
					li.pulsate({duration :1.0, delay : 0.5});
				});
			}
		}
	}else if(drop.id == "labs"){
		if(drag.parentNode.id!="labs"){
			drag.remove();
			drop.appendChild(drag);
			var select_li = $$("#selection li");
			for(var i=0;i<select_li.length;i++){
				if(select_li[i].innerHTML==drag.alt){
					select_li[i].remove();
				}
			}
		}
		
	}
	
}
