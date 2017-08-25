/*Translator, first try
* !!! Нельзя вводить строку или коммент типа <br>, в комментариях нельзя использовать фигурные скобки !!!
* !!! Не все ключевые слова добавлены для подстветки, тк я не знаю сколько их всего !!!
* !!! Нужно было каким-то спец. символом обозначать конец комментария, я выбрал '|' !!!
* */


$(document).ready(function() {
    var mystr = "let a = 1.2;              // it is my comment d sf [ ] func(x)  / console  sd23,0.| let str = 'Hello +15* ( ). ,  /  // % ={ br sin(q) console log } let return + World - Max!';    let b = 10; function func_plus(x, y) {f = a + b; d = c + b; function func_comp(x, y) {r = sqrt(w);  //  5we  dw,10DF(e)5 . | function func_delete(x, y) { del = x / y; let k = 'sdasd] {  4 }[(!'; del = del % 2; return del; }; w = sin(q); return a * b;}; return x + y; }; let str1 = 'asdas'; function func_minus(x, y) {c = a - b;  d = c - b; return x - y; }; console.log(func_plus(a, b),func_minus(a, b));";
    var i = 0;
    var c = 0;
    var j = 0;
    var k = 0;
    var q = 0;
    var begin = 0;
    var end = 0;
    var newstr = "";
    mystr = mystr.replace(/(var|let|function|typeof|new|if|for|while|break|do|continue|switch|case)([^a-z0-9\$_])/gi,
'<span style="color:blue">$1</span>$2');
// всякие скобочки
//     mystr = mystr.replace(/(\{|\}|\]|\[|\|)/gi,'<span style="color: #c4c3ca">$1</span>');
//     // однострочные комментарии
//     mystr = mystr.replace(/(\/\/[^])/g,'<span style="color:orange">$1</span>');
    // строки
    // функции (когда после идентификатора идет скобка)
    mystr = mystr.replace(/([a-z\_\$][a-z0-9_]*)\(/gi,'<span style="color:darkseagreen">$1</span>(');
    // mystr = mystr.replace(/;/g,';<br>');
    mystr = mystr.replace(/(return)([^a-z0-9\$_])/g,'<span style="color:hotpink">return </span>');

    // mystr = mystr.replace(/(,|\+|\*|\(|\)| = |}; |;|-|\.)/g, '<span style="color:white">$1</span>');
    mystr = mystr.replace(/(,|\+|\*|\(|\)| = |}; |;|-|%| \/ |\.| \/ )/g, '<span style="color:white">$1</span>');
    mystr = mystr.replace(/(console)/g, '<span style="color:greenyellow">console</span>');
    mystr = mystr.replace(/([0-9])/g, '<span style="color:yellow">$1</span>');

    while (i < mystr.length) {
        if ((mystr[i] == "'")||(mystr[i] == '"')) {
            begin = i - 1;
            if (mystr[i-9] == "=") {
                j = i;
                q = i;
                newstr = '<span style="color:green">';
                while (true) {
                    if (mystr[j+26] == ';') {
                        break;
                    }
                    else {
                       newstr = newstr + mystr[j];
                       j++;
                       i++;
                    }
                }
                newstr = newstr.replace(/(<br>|style="color:white"|style="color:yellow"|style="color:darkseagreen"|style="color:blue"|style="color:greenyellow"|style="color:hotpink"|style="color:cadetblue")/g, 'style="color:green"');
                // newstr = newstr.replace(/(";"<br>)/g, ';');
                newstr = newstr + '</span>';
                mystr = mystr.slice(0, q) + newstr + mystr.slice(j);
                newstr = "";

            }
        }
        if (mystr[i] == ';') {
            q = i + 8;
            while (mystr[q] == ' ') {
                q++;
            }
            if ((mystr[q] == '/')&&(mystr[q + 1] == '/')) {
                newstr = '<span style="color:gray">';
                begin = q - 1;
                // k = q + 23;
                while (mystr[q] != '|') {
                    newstr = newstr + mystr[q];
                    q++;
                }
                end = q + 2;
                newstr = newstr.replace(/(style="color:white"|style="color:yellow"|style="color:darkseagreen"|style="color:blue"|style="color:greenyellow"|style="color:hotpink"|style="color:cadetblue")/g, 'style="color:gray"');
                // newstr = newstr.slice(0, newstr.length) + '.</span><br>' + newstr.slice(newstr.length);
                newstr = newstr + '</span><br>';
                mystr = mystr.slice(0, begin) + newstr + mystr.slice(end);
                newstr = "";
            }
            else {
                mystr = mystr.slice(0, i) + ';<br>' + mystr.slice(i + 1);
            }

        }
        if (mystr[i] == '{') {
            mystr = mystr.slice(0, i) + '{<br>' + mystr.slice(i + 1);
            c++;
            j = i + 5;
            k = i;
            var pix;
            pix = 40 * c;
            pix = pix + '';
            mystr = mystr.slice(0, j) + '<div style="padding-left: ' + pix + 'px">' + mystr[j] + mystr.slice(j + 1);
            while (mystr[k] != '}'){
                if (mystr[k] == '{') {
                    mystr = mystr.slice(0, k+4) + mystr[k+4] + "</div>" + mystr.slice(k+5);
                    break;
                }
                k++;
            }
        }
        if (mystr[i] == '}') {
            c--;
            j = i + 3;
            k = i;
            pix = 40 * c;
            pix = pix + '';
            mystr = mystr.slice(0, j) + '<div style="padding-left: ' + pix + 'px">' + mystr[j] + mystr.slice(j + 1);

            while (mystr[k] != '{'){
                if (mystr[k] == '}') {
                    mystr = mystr.slice(0, k+2) + mystr[k+2] + "</div>" + mystr.slice(k+3);
                    break;
                }
                k++;
            }

        }

        i++;
    }
    // mystr = mystr.replace(/( \/ )/g, '<span style="color:white">$1</span>');
    mystr = mystr.replace(/({<br>)/g, '<span style="color:white">{</span><br>');
    mystr = mystr.replace(/<span style="color:white">};/g, '<span style="color:white; position: relative; left: -40px">};');


    $('.res').append(mystr);
});

