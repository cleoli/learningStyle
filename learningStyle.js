var tableD = [
    ["When I need to learn:", "I like to see how I feel about it first.", "I like to just start, do it.", "I like to think about why.", "I like to watch and listen before I do it."], 
    ["I learn best when:", "I just trust my hunches and feelings.", "I work hard to get things done.", "I rely on logical thinking.", "I listen and watch carefully."], 
    ["When I am learning:", "I have feelings and reactions.", "I am usually the one responsible.", "I tend to reason things out first.", "I am quiet and reserved until comfortable."], 
    ["I learn by:", "Feeling.", "Doing.", "Thinking.", "Watching."],
    ["When I learn:", "I get involved.", "I am active.", "I evaluate things.", "I observe."]
];
var numM = [];
var temp;
function aTable(){
    var str='<div id=choice1></div><table>';
    for(var a=0; a<5; a++){
        numM[a] = ["Select",1, 2, 3, 4];
    }
    for(var i=0; i<tableD.length; i++){
        str += '<tr><th onclick=eras()>' + tableD[i][0] + '</th>';
        for(var j=1; j<5; j++){
            str +='<td onclick=dMenu(this,'+ i +') class=numSe>Select</td>';
            str += '<td onclick=eras()>' + tableD[i][j] + '</td>';
        }
        str += '</tr>';
    }
    str += '</table> <div id=but1><button onclick=resT()>DONE</button></div>';
    document.getElementById('aT').innerHTML = str;
}

function dMenu(x, y){
    temp = x;
    var str='<span id=s1>Pick your selection: </span>';
    for(var i=0; i<numM[y].length; i++){
        str += '<span onclick=change(this,' + y + ')>' + numM[y][i] + '</span>';   
    }
    document.getElementById('choice1').innerHTML= str;
    x.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
}

function change(x, y, z){
    var t = x.innerHTML;
    if(t !== 'Select' && numM[y].length >1){
        for(var a=0; a<numM[y].length; a++){
            if(numM[y][a] == t){
                numM[y].splice(a,1);
            }
        }
    }
    if(temp.innerHTML !== 'Select' || t === 'Select'){
        var t2 = parseInt(temp.innerHTML);
        if (numM[y][numM[y].length -1] === 'Select' || numM[y][numM[y].length -1] < t2){
            numM[y].push(t2);
        }else if(numM[y][1]> t2){
            numM[y].splice(1, 0, t2);
        }else{
            for(var i=0; i<numM[y].length; i++){
                if(numM[y][i]> t2 && numM[y][i-1] !== t2){
                    numM[y].splice(i, 0, t2);
                }
            }
        }
        
    }
    dMenu(temp,y);
    temp.innerHTML = t;
    temp.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';

}

function eras(){
    document.getElementById('choice1').innerHTML= '';
}

function resT(){
    var finalA = document.getElementsByClassName('numSe');
    var fA = [];
    var fAs=[];
    for(var i=0; i<finalA.length; i++){
        if(finalA[i].innerHTML === 'Select'){
            finalA[i].style.backgroundColor='rgba(255, 255, 255, 0.7)';
        }else{
            var a = parseInt(finalA[i].innerHTML);
            finalA[i].style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            fA.push(a);
        }
    }

    if(fA.length == 20){
        var tempA=0, q, res;
        for(var b=0; b<4; b++){
            var t = 0;
            for(var c=b; c<20; c+=4){
                t += fA[c];
            }
            fAs.push(t);
        }
        for(var d=0; d<4; d++){
            var re = (d+1)%4;
            var eleV = fAs[d] + fAs[re];
            if(eleV > tempA){
                tempA = eleV;
                q = d+1;
            }
        }
        res = dominantL(q);               
        document.getElementById('choice1').innerHTML="<div id=resM>Your dominant learning style is " + res+".</div>";       
    }else{
        document.getElementById('choice1').innerHTML='<div id=errM>You missed some spots.</div>';
    }
}

function dominantL(x){
    switch(x){
        case 1:
        return "Divergent";
        case 2:
        return "Assimilative";
        case 3:
        return "Convergent";
        case 4:
        return "Accommodative";
    }
}