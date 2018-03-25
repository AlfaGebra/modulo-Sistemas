//[2 -1 3][1 4 2][1 -5 1][4 16 8]
//[1 1 1 0 -1][1 0 1 1 5][0 1 1 1 7][1 1 0 1 4]
var resultadoFinal;
var resultadoFinal2;
var mostraTudo = '';
function calculoGauss() {
    //Para obter o valor do input
    var expressao = document.getElementById('expressao').value;
    document.getElementById('resultado').innerHTML = 'RESULTADO'; //Para escrever no html
    
    console.log('EXPRESSÃO: ', expressao.length);
    var x = 0;
    var novaExpressao = new Array();
    var sub = 0;
    var printa = 0;
    var simbolo;
    var chaves;
    var valor;
    var anterior = 0;
    var linha = 0;
    var contador = 0;
    if(expressao.length == 0){
        alert('Expressão não fornecida. Por favor, insira uma expressão.');
        exit();
    }
    for(var i = 0; i < expressao.length; i++){
        
        if(expressao[0] !== '[' && expressao[expressao.length] !== ']'){
            alert('Expressão não é válida. Por favor, verifique o padrão de inserção em documentação');
            return;
            //exit(0);
        }
        else{
            if(expressao[i] == 0 ||  expressao[i] == 1 || expressao[i] == 2 ||  expressao[i] == 3 || expressao[i] == 4 || expressao[i] == 5 || expressao[i] == 6 || expressao[i] == 7 || expressao[i] == 8 || expressao[i] == 9){
                if(expressao[i] == ' '){         
                    novaExpressao.push(simbolo);
                    simbolo = null;
                }
                else if(simbolo == null){
                    simbolo = expressao[i];
                }
                else{
                    simbolo += expressao[i];
                }
            }
            
            else{
                if(expressao[i] == '['){
                    contador += 1;
                    if(chaves == expressao[i]){
                        chaves = expressao[i];
                    }
                }
                else if(expressao[i] == '.'){
                    var x = i;
                    while(x !== 0){
                        if(expressao[x] == 0 ||  expressao[x] == 1 || expressao[x] == 2 ||  expressao[x] == 3 || expressao[x] == 4 || expressao[x] == 5 || expressao[x] == 6 || expressao[x] == 7 || expressao[x] == 8 || expressao[x] == 9){
                            simbolo += expressao[x];
                            x += 1;
                        }
                        else{
                            if(expressao[x] == '.'){
                                simbolo += expressao[x];
                                x += 1;
                            }
                            else{
                                novaExpressao.push(simbolo);
                                simbolo = null;
                                i = x;
                                i += -1;
                                x = 0;
                            }
                        }
                    }                   
                }
                else if(expressao[i] == '-'){
                    var x = i;
                    simbolo = expressao[x];
                    x += 1;
                    while(x !== 0){
                        if(expressao[x] == 0 ||  expressao[x] == 1 || expressao[x] == 2 ||  expressao[x] == 3 || expressao[x] == 4 || expressao[x] == 5 || expressao[x] == 6 || expressao[x] == 7 || expressao[x] == 8 || expressao[x] == 9){
                            if(expressao[x] == ' '){
                                i = x;
                                i += -1;
                                x = 0;
                            }
                            else{
                                simbolo += expressao[x];
                                x += 1;
                            }
                        }
                        else{
                            if(expressao[x] == '.'){
                                simbolo += expressao[x];                               
                                x += 1;
                            }
                            else{
                                if(expressao[x] == ']'){ 
                                    i = x;
                                    i += -1;
                                    x = 0;
                                }
                                else{
                                    novaExpressao.push(simbolo);                               
                                    simbolo = null;
                                    i = x;
                                    i += -1;
                                    x = 0;
                                }
                            }
                        }
                    }    
                }
                else if(expressao[i] == ' '){              
                    novaExpressao.push(simbolo);
                    simbolo = null;
                }
                else if(expressao[i] == ']'){
                    if(chaves !== expressao[i] && simbolo != null){
                        novaExpressao.push(simbolo);                       
                        if(contador == 1){
                            anterior = novaExpressao.length;
                            sub = anterior - sub;
                            printa = anterior - printa;                          
                        }
                        linha = linha+1;
                        simbolo = null;
                    }   
                }
                else{
                    console.log('Erro, expressão não válida final');
                    alert('Expressão não é válida. Por favor, verifique o padrão de inserção em documentação');                    
                    novaExpressao = null;
                    return;
                }
                              
            }
        }
    }
    console.log('\n', novaExpressao);
    
   //Matriz recendo os valores do vetor
    var o = 0;
    var x, y;
    var cont = 0;
    matriz = [];
    for(x = 0; x < linha; x++){
        matriz[x] = [];
        for(y = cont; y < sub; y++){
            if(novaExpressao[y] != null){
                matriz[x][o] = novaExpressao[y];
                o += 1;
            }
        }
        o = 0;
        cont = sub;
        sub = anterior+sub;
    }
    
    escreveMatriz(matriz, linha, anterior);
    escalonamento(linha, anterior, matriz);

    //Para mostrar o botão somente quando clicar no botão
    ocultarResultado();
    deletarMatriz(matriz);
}

function ocultarResultado() {
    var display = document.getElementById('mostra-resultado').style.display;
    if(display == "none"){
        document.getElementById('mostra-resultado').style.display = 'block';
    }
}

function escreveMatriz(matriz, linha, coluna) {
    resultado = '';
    
    for(x = 0; x < linha; x++){
        mostraTudo += '<strong>&#124;</strong>';
        resultado += '<strong>&#124;';
        for(y = 0; y < coluna; y++){
            mostraTudo += '<strong>&nbsp; &nbsp;' + parseFloat(matriz[x][y]).toFixed(1) + '&nbsp; &nbsp;</strong>';
            resultado += '<strong>&nbsp; &nbsp;' + parseFloat(matriz[x][y]).toFixed(1) + '&nbsp; &nbsp;</strong>';
        }
        mostraTudo += '<strong>&#124</strong>';    
        mostraTudo += "<br/>";
        resultado += '&#124</strong>';
        resultado += "<br/>";
    }
    mostraTudo += "<br/>";
    document.getElementById('formaEscada').innerHTML = resultado;
}

function escalonamento(linha, coluna, matriz) {
    var result;
    var x = 0, y = 0;
    var k;
    while(x < linha && y < coluna){
        k = x;
        //Procura por valor 0 em cada linha
        while(k < linha && matriz[k][y] == 0){ 
            k++;
        }
        if(k < linha){
            if(k != x){
                permutacao(matriz, x, k, y);
                escreveMatriz(matriz, linha, coluna);
            }

            if(matriz[x][y] != 1){
                multiplicacao(matriz, x, k, y);            
                escreveMatriz(matriz, linha, coluna);
            }
            substituicao(matriz, x, y)
            escreveMatriz(matriz, linha, coluna);
            x++;
        }
        y++;
    }
    resultadoFinal = document.getElementById('resultado-final');
    resultadoFinal2 = document.createElement("span");
    resultadoFinal2.innerHTML = mostraTudo;
    resultadoFinal.appendChild(resultadoFinal2);
}

function permutacao(matriz, x, k, y) {
    var tamanho = matriz[0].length;
    var t, troca;
    for(t = y; t < tamanho; t++){
        troca = matriz[x][t];
        matriz[x][t] = matriz[k][t];
        matriz[k][t] = troca;
    }
    mostraTudo += 'Aplicando a operação elementar da <strong>permutação</strong> na <strong>linha ' + x + '</strong> pela <strong>linha' + k + '</strong> para a resolução. Tem-se o seguinte cálculo e nova matriz gerada: <br/>';
    mostraTudo += '<strong>L<sub>'+ x + '</sub> &rarr; ' + ' L<sub>' + k + '</sub></strong> <br/>';
    mostraTudo += '<hr>';
    mostraTudo += 'Nova matriz após o cálculo: <br/>';
}

function multiplicacao(matriz, x, k, y) {
    var tamanho = matriz[0].length;
    var d, divisao;

    mostraTudo += 'Aplicando a operação elementar da <strong>multiplicação</strong> na <strong>linha ' + x + '</strong> para a resolução. Tem-se o seguinte cálculo e nova matriz gerada: <br/>';
    mostraTudo += '<strong>L<sub>'+ x + '</sub> &rarr; ' + '1/' + matriz[x][y] + ' * L<sub>' + x + '</sub></strong><br/>';
    mostraTudo += '<hr>';
    var teste = matriz[x][y];
    mostraTudo += '1/' + teste + ' * ' + matriz[x][y] + ' = ' + (teste/matriz[x][y]) + '<br/>';
    for(d = y+1; d < tamanho; d++){
        mostraTudo += '1/' + teste + ' * ' + matriz[x][d] +  ' = ';
        divisao = matriz[x][d]/matriz[x][y];
        matriz[x][d] = parseFloat(divisao.toFixed(1));
        mostraTudo += matriz[x][d] + '<br/>';
    }
    matriz[x][y] = 1;    
    mostraTudo += '<br/>Nova matriz após o cálculo: <br/>';  
}


function substituicao(matriz, x, y){
    mostraTudo += 'Aplicando a operação elementar da <strong>substituição</strong> na(s) linha(s) abaixo para a resolução. Tem-se o seguinte cálculo e nova matriz gerada: <br/>';
    var tamLinha = matriz.length;
    var tamColuna = matriz[0].length;
    var l, c;
    var constante, subtracao;
    for(l = 0; l < tamLinha; l++){
        if(l != x && matriz[l][y] != 0){
            constante = matriz[l][y];      
            mostraTudo += '<strong>L<sub>'+ l + '</sub> &rarr; ' + 'L<sub>' + l + '</sub> - (' + constante + ' * L<sub>' + x +'</sub>)</strong><br/>'; 
            mostraTudo += '<hr>';
            for(c = y; c < tamColuna; c++){
                mostraTudo += matriz[l][c] + ' - ' + '(' + constante + ' * (' + matriz[x][c] + '))';
                subtracao = (constante * matriz[x][c]);
                matriz[l][c] = parseFloat(matriz[l][c] - subtracao).toFixed(1);
                mostraTudo += ' = ' + matriz[l][c] + '<br/>';
            }
        }
        mostraTudo += '<br/>';
    }
    mostraTudo += 'Nova matriz após o cálculo: <br/>';
    constante = null;
}

function deletarMatriz(matriz) {
    matriz = null;
    mostraTudo = '';
}