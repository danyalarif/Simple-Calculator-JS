const cal = document.getElementById('calculator');
let current = '';
let prev = '';
var answerDisplayed = new Boolean(false);
document.addEventListener('keydown', function(event){
    let key = event.key;
    if (key.localeCompare('/') == 0)
        key = '÷';
    //performing hover effect
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++)
    {
        const evt = new MouseEvent('mouseover', { 'bubbles': true });
        if (buttons[i].innerText.localeCompare(key) == 0)
        {
            buttons[i].focus();
        }
    }
    processKey(key);
}
);

buttonClickInput();

function buttonClickInput(){
    var buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(e) {
            let key = buttons[i].innerText;
            processKey(key);         
        };
    }
}
function processKey(key)
{
    if (answerDisplayed == true && key.localeCompare('AC') != 0)
        return;
    if (key >= "0" && key <= "9")
        current += key;
    else if (key == '+' || key == '-' || key == '*' || key == '/' || key == '÷')
    {
        if (Calculator.operatorFound(current))
        {
            if (prev.length == 0)
                prev += current.slice(0, current.length);
            else
            {
                let i = 0;
                while (!(Calculator.isOperator(current[i])))
                {
                    i++;
                }
                prev += current.slice(i, current.length);
            }
            current = Calculator.verifyOuput(
                ()=>Calculator.solveEquation(current).toString()
                );
            if (current.localeCompare('Error') == 0)
            {
                prev = '';
                current = '';
                document.getElementById('input').innerHTML = 'Error';
                document.getElementById('previnput').innerHTML = '';
                return;
            }
        }
        current += key;
    }
    else if (key == '.')
    {
        if (current[current.length - 1] >= '0' && current[current.length - 1] <= '9')
        {
            current += key;
        }
    }
    else if (key == '=')
    {
        current = Calculator.verifyOuput(
            ()=>Calculator.solveEquation(current).toString()
            );
        if (current.localeCompare('Error') == 0)
        {
            prev = '';
            current = '';
            document.getElementById('input').innerHTML = 'Error';
            document.getElementById('previnput').innerHTML = '';
            return;
        }
        answerDisplayed = true;
    }
    else if (key == 'Backspace')
        current = current.substr(0, current.length - 1);
    else if (key == 'DEL')
        current = current.substr(0, current.length - 1);
    else if (key == 'AC')
    {
        prev = '';
        current = '';
        answerDisplayed = false;
    }
    document.getElementById('previnput').innerHTML = prev; 
    document.getElementById('input').innerHTML = current;
}
class Calculator{
    constructor()
    {

    }
    static isOperator(op)
    {
        if (op == '+' || op == '-' || op == '*' || op == '/' || op == '÷') return true;
        else return false;
    }
    static operatorFound(exp)
    {
        for (let i = 0; i < exp.length; i++)
        {
            if (Calculator.isOperator(exp[i])) return true;
        }
        return false;
    }
    static solveEquation(eq)
    {
        let operand1 = '';
        let operand2 = '';
        let curr = 0;
        for (let i = 0; i < eq.length; i++)
        {
            curr = i;
            if (Calculator.isOperator(eq[i]))
                break;
            operand1 += eq[i];
        }
        let op = eq[curr];
        for (let i = curr + 1; i < eq.length; i++)
        {
            operand2 += eq[i];
        }
        let o1, o2, res;
        if (Calculator.isDecimal(operand1))
            o1 = parseFloat(operand1);
        else
            o1 = parseInt(operand1);
        if (Calculator.isDecimal(operand2))
            o2 = parseFloat(operand2);
        else
            o2 = parseInt(operand2);
        switch(op)
        {
            case '+':
                res = o1 + o2;
                break;
            case '-':
                res = o1 - o2;
                break;
            case '*':
                res = o1 * o2;
                break;
            case '/':
                res = o1 / o2;
                break;
            case '÷':
                res = o1 / o2;
                break;
        }
        return res;
    }
    static verifyOuput(callback)
    {
        let res = callback();
        if (isNaN(res))
            return 'Error';
        else
            return res;
    }
    static isDecimal(operand)
    {
        if (operand.includes('.'))
            return true;
        else
            return false;
    }
}