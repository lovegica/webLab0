"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            //var value = this.innerHTML;
            var input = document.querySelector('.screen');
            var inputVal = input.innerHTML;
            var btnVal = this.innerHTML;

            if(btnVal == 'AC'){
                input.innerHTML = '';
                decimalAdded = false;
            }else if(btnVal == '=') {
                var equation = inputVal;
                var lastChar = equation[equation.length - 1];
            }
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            if(operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/, ''); 
            if(equation)
                input.innerHTML = eval(equation);
                
            decimalAdded = false;
        }
};

function factorial (x) {
    if ((x == 0) || (x == 1))
        return 1
    else{
      result = (x * factorial(x-1) )
      return result
   }

}
function highPriorityCalculator(s, val) {

}
function calculator(s) {
    var result = 0;
    var operators = ['+', '-', 'x', '÷'];
    var decimalAdded = false;
    for (var i=0; i< s.length; i++) { 
        var btnVal = this.innerHTML; 
        if(btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];
            };
    };

    document.calculator.Display.value = result;
    }
    return result;
}

function Dot() {
    if ( Current.length == 0){ 
        Current = "0.";
    }else{  
        if ( Current.indexOf(".") == -1){ 
            Current = Current + ".";
        };   
    };
  document.Calculator.Display.value = Current;
 }

