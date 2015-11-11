
"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0"   ;
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            var languageCheck = /[0-9]/;

            if (languageCheck.test(value)) {

                if (displayVal =="0") {
                     displayVal = value;
                }
                else{
                    displayVal = displayVal+value;
                }
                stack.push(displayVal);
                document.getElementById('result').innerHTML = displayVal; 
            }else if (value =="AC") {
                displayVal = "0";
                stack = [];
                document.getElementById('result').innerHTML = "0";
                document.getElementById('expression').innerHTML = "0";
            }
            else if (value =='.') {
                
                if(displayVal.charAt(displayVal.length-1) =='.')
                {
                }
                else{
                     displayVal = displayVal+'.';
                }
                stack.push(displayVal);
                document.getElementById('result').innerHTML = displayVal;
            }
            else if (value == '='){

            }
            else if (value == '!'){
                var fact;
                if(displayVal.charAt(displayVal.length-1) =='!')
                {
                }
                else{
                    fact = factorial(parseInt(displayVal));
                    displayVal = displayVal+'!';
                     
                }
                 document.getElementById('expression').innerHTML = fact;
                 document.getElementById('result').innerHTML = displayVal;     
            }
            else{
                if(displayVal.charAt(displayVal.length-1) == value)
                {
                }
                else{
                     displayVal = displayVal+value;
                }
                
                document.getElementById('expression').innerHTML = displayVal; 
                document.getElementById('result').innerHTML = "0";
               
                if (value == "*" || value == "/"  ||value == "^" ){
                    highPriorityCalculator();
                }
               
            }
        };
    }

};

function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
        
    }
    return result;
}


function factorial (x) {
   var x;
    for (var i = x; i == 1; i--) {
        x = x * i;
    };
    return x;
}
function highPriorityCalculator(s, val) {


}
