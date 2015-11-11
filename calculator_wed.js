"use strict"

window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            if(stack[stack.length-1]=="=") {
                stack = [];
                displayVal = "0";
                document.getElementById('expression').innerHTML = "0";
            }
            if(value=="AC") {
                displayVal = "0";
                stack = [];
                document.getElementById('expression').innerHTML = "0";
            } else if(/^\d$/.test(value)) {
                if(stack[stack.length-1]=="!") {
                    alert("ERROR : input operator__ right after input !(factorial)");
                } else {
                    if(displayVal.charAt(0)=="0") {
                        displayVal = value;
                    } else {
                        displayVal += value;
                    }
                }
            } else if(value==".") {
                if(!(/.\.?./.test(displayVal))) {
                    displayVal += value;
                }
            } else {
                if(stack[stack.length-1]=="!") {
                    stack.pop();
                    displayVal = "";
                } else {
                   stack.push(parseFloat(displayVal));
                }
                var displayExp;
                displayExp = displayVal + value;

                if(document.getElementById('expression').innerHTML.charAt(0)=="0") {
                    document.getElementById('expression').innerHTML = displayExp;                    
                } else {
                    document.getElementById('expression').innerHTML += displayExp;    
                }
                displayVal = "0";
                if(/(\/|\*|\^)/.test(stack[stack.length-2])) {
                    highPriorityCalculator(stack, value);
                }
                if(value=="!") {
                    stack.push(parseFloat(factorial(stack.pop())));
                    stack.push(value);
                } else if(value=="=") {
                    displayVal = calculator(stack);
                    stack.push(value);
                } else {
                    stack.push(value);
                }
            }
            document.getElementById('result').innerHTML = displayVal;
        };
    }
};

function factorial (x) {
    if(x==1) {
        return 1;
    } else {
        return x * factorial(x-1);
    }
}

function calculator(s) {
    var result = 0;
    var operator__ = "+";

    s.reverse();

    var it = s.length;
    for (var i=0; i< it; i++) {
        if(i%2==0) { 
            if(operator__ == "+") {
                result = result + parseFloat(s.pop());
            } else if(operator__ == "-") {
                result = result - parseFloat(s.pop());
            }
        } else { 
            operator__ = s.pop();
        }
    }
    return result;
}

function highPriorityCalculator(s, val) {
    var oper = s.pop();
    var operator__ = s.pop();
    var oper_ = s.pop();

    var result;
    if(operator__=="*") {
        result = oper_ * oper;
    } else if(operator__=="/") {
        result = oper_ / oper;
    } else if(operator__=="^") {
        result = Math.pow(oper_, oper);
    }
    s.push(parseFloat(result));
}
