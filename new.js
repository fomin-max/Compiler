$(document).ready(function() {
    // комментариий белые вх фиг скобки и место закрыв фиг скобок!!!
    var mystr = "let a = 1; let str = 'Hello, World!'; let b = 10; function func_plus(x, y) {f = a + b; d = c + b; function func_comp(x, y) {r = sqrt(w); function func_delete(x, y) { del = x/y; del = del//x*y; return del; }; w = sin(q); return a * b;}; return x + y; }; function func_minus(x, y) {c = a - b;  d = c - b; return x - y; }; console.log(func_plus(a, b),func_minus(a, b));";
    var i = 0;
    var c = 0;
    var j = 0;
    var k = 0;
    var q = 0;
    mystr = mystr.replace(/(var|let|function|typeof|new|if|for|while|break|do|continue|switch|case)([^a-z0-9\$_])/gi,
'<span style="color: blue">$1</span>$2');
// всякие скобочки
//     mystr = mystr.replace(/(\{|\}|\]|\[|\|)/gi,'<span style="color: #c4c3ca">$1</span>');
//     // однострочные комментарии
//     mystr = mystr.replace(/(\/\/[^])/g,'<span style="color:orange">$1</span>');
    // строки
    mystr = mystr.replace(/('.*?')/g,'<span style="color:orange">$1</span>');
    // функции (когда после идентификатора идет скобка)
    mystr = mystr.replace(/([a-z\_\$][a-z0-9_]*)\(/gi,'<span style="color:darkseagreen">$1</span>(');
    // mystr = mystr.replace(/;/g,';<br>');
    mystr = mystr.replace(/(return)([^a-z0-9\$_])/g,'<span style="color:hotpink">return </span>');
    // mystr = mystr.replace(/()/g, '<span style="color:white">$1</span>');

    mystr = mystr.replace(/(,|\+|\*|\(|\)| = |}; |;|-|\.)/g, '<span style="color:white">$1</span>');
    mystr = mystr.replace(/(console)/g, '<span style="color:greenyellow">console</span>');
    mystr = mystr.replace(/([0-9])/g, '<span style="color:yellow">$1</span>');

    while (i < mystr.length) {

        if (mystr[i] == ';') {
            mystr = mystr.slice(0, i) + ';<br>' + mystr.slice(i + 1);
        }
        if (mystr[i] == '{') {
            mystr = mystr.slice(0, i) + '{<br>' + mystr.slice(i + 1);
            c++;
            j = i + 5;
            k = i;
            q = i;
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
            console.log(mystr[i-1]);
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


    $('.res').append(mystr);
});

