var resultadoFinal;
var resultadoFinal2;
var mostraTudo = 'Para a resolução do sistema fornecido é necessário inicialmente extrair a matriz dos coeficientes do sistema de acordo com os valores das variáveis: <br/>';
var mostraVerificacao = '';
function validacaoExpressaoEntrada() {
    //Para obter o valor do input
    var expressao = document.getElementById('expressao').value;
    document.getElementById('resultado').innerHTML = 'RESULTADO'; //Para escrever no html
    
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
    var aConta = 0;

    if(expressao.length == 0){
        alert('Expressão não fornecida. Por favor, insira uma expressão.');
        exit();
    }

    for(var i = 0; i < expressao.length; i++){
        if(expressao[0] !== '[' && expressao[expressao.length] !== ']'){
            alert('Expressão não é válida. Por favor, verifique o padrão de inserção em documentação');
            return;
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
                    alert('Expressão não é válida. Por favor, verifique o padrão de inserção em documentação');
                    novaExpressao = null;
                    return;
                }
                              
            }
        }
    }
    console.log('\n', novaExpressao);
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
    cont = 0;
    sub = 0;
    escreveMatriz(matriz, linha, anterior);
    escreveMatrizSistema(matriz, linha, anterior);
    escalonamento(linha, anterior, matriz);
    //Para mostrar o botão somente quando clicar no botão
	ocultarResultado();
	verificaSistema(matriz, linha, anterior);
    deletarMatriz(matriz);
}

function ocultarResultado() {
    var display = document.getElementById('mostra-resultado').style.display;
    if(display == "none"){
        document.getElementById('mostra-resultado').style.display = 'block';
    }
}

function escreveMatriz(matriz, linha, coluna) {
    //Para mostrar no html a matriz inserida
    var resultado = '';
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

function escreveMatrizSistema(matriz, linha, coluna){
    var mostra = '<strong>';
    var x, y, z;
    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];
    var novoSimbolo;
    var valor = 0;
    for(x = 0; x < linha; x++){
        for(y = 0; y < coluna; y++){
            novoSimbolo = matriz[x][y];
            if(y == (coluna-1)){
                mostra += " = " + matriz[x][y] + " ";
            }
            else{
                for(z = 0; z < novoSimbolo.length; z++){
                    if(novoSimbolo[z] == '-'){
                        valor = 1;
                        z = novoSimbolo.length;
                    }
                }

                if(valor == 1){
                    mostra += matriz[x][y] + letras[y];
                }
                else{
                    if(y >= 1){
                        mostra += '+'+ matriz[x][y] + letras[y];
                    }
                    else{
                        mostra += matriz[x][y] + letras[y];
                    }
                }
            }
            valor = 0;
        }
        mostra += "<strong><br/>";
    }
    result = document.getElementById('matriz');
    result.innerHTML = mostra;
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
            substituicao(matriz, x, y);
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
    var tamLinha = matriz.length;
    var tamColuna = matriz[0].length;
    var l, c;
    var constante, subtracao;
    mostraTudo += 'Aplicando a operação elementar da <strong>substituição</strong> na(s) linha(s) abaixo para a resolução. Tem-se o seguinte cálculo e nova matriz gerada: <br/>';
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
    mostraTudo += 'Nova matriz após o cálculo: <br/>'
    constante = null; 
}

function postoMatrizAmpliada(matriz, linha, coluna){
    var contador = 0;
	var x, y;
	var pa = 0;
	for(x = 0; x < linha; x++){
		for(y = 0; y < coluna; y++){
			if(matriz[x][y] == 0){
				contador++;
			}
		}
		if(contador != coluna){
			pa++;
		}
		contador = 0;
    }
	return pa;
}

function postoMatrizCoeficientes(matriz, linha, coluna){
    var contador = 0;
	var x, y;
	var pc = 0;
	for(x = 0; x < linha-1; x++){
		for(y = 0; y < coluna-1; y++){
			if(matriz[x][y] == 0){
				contador++;
			}
		}
		if(contador != coluna){
			pc++;
		}
		contador = 0;
    }
	return pc;
}

function calculoVariaveisLivres(matriz, linha, coluna) {
    var contador = 0;
    var x, y, z;
    var armazenaNovaLinha = new Array();
    var novaExpressaoLivre;
	for(x = 0; x < linha; x++){
        var armazenaLinha = [];
        for(y = 0; y < coluna; y++){
			armazenaLinha[y] = matriz[x][y];
        }
        for(z = 0; z < armazenaLinha.length; z++){
            if(armazenaLinha[z] != 0){
                contador++;
            }
        }
        
        //Fazer tratamento depois para caso seja inserido mais de uma linha
        if(contador != 0){
            armazenaNovaLinha.push(armazenaLinha);
            armazenaLinha = null;
        }
        contador = 0;
        armazenaLinha = null;
    }  
    return armazenaNovaLinha;
}

function verificaSistema(matriz, linha, coluna){
	var postoAmpliada, postoCoeficiente, grauLiberdade, expressaoLivre, tratamentoLivres;
	postoCoeficiente = postoMatrizCoeficientes(matriz, linha, coluna);
	postoAmpliada = postoMatrizAmpliada(matriz, linha, coluna);
    grauLiberdade = nulidadeExpressao(coluna, postoAmpliada);
    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];    
    
    mostraVerificacao += '<br/>';
    mostraVerificacao += 'Com a matriz forma escada encontrada, deve-se verificar o <strong>posto da matriz ampliada (PA)</strong>, o <strong>posto da matriz dos coeficientes (PC)</strong> e <strong>número de variáveis (N)</strong>. Assim, temos: <br/>'
    mostraVerificacao += '<strong>PC = ' + postoCoeficiente + '</strong><br/>';
    mostraVerificacao += '<strong>PA = ' + postoAmpliada + '</strong><br/>';
    mostraVerificacao += '<strong>N = ' + (coluna-1) + '</strong><br/><br/>';

    if(postoAmpliada == postoCoeficiente && (coluna-1) == postoAmpliada){
        mostraVerificacao += 'Como o <strong>PA =  ' + postoAmpliada + '</strong>, <strong>PC = ' + postoCoeficiente + '</strong> e <strong>N = ' + (coluna-1) + '</strong> são iguais. Logo, o sistema possui uma <strong>única solução.</strong> <br/>';
        mostraVerificacao += 'Assim a solução é: <br/>';
        var s;
        var vetor = solucao(matriz, linha, coluna);            
        for(s = 0; s < vetor.length; s++){
            console.log(vetor[s]);
            mostraVerificacao += '<strong>' + vetor[s] + '</strong><br/>';
        }
        mostraVerificacao += 'Portanto, o sistema é compatível e determinado.'
    }
    else{
        if(postoAmpliada == postoCoeficiente && (coluna-1) != postoAmpliada){
            mostraVerificacao += 'Como o posto da matriz ampliada é igual a <strong> '  + postoAmpliada + 
            '</strong> e matriz dos coeficientes igual a <strong>' + postoCoeficiente + 
            '</strong> são iguais e o número de variáveis (n) é igual a <strong>' + (coluna-1) + 
            '</strong> é diferente que é diferente de <strong> PA e PC </strong>. Logo, devemos verificar se o posto é menor que o número de variáveis <strong>(p < n)</strong>. <br/>Como <strong>p = ' 
            + postoAmpliada  + '</strong> e <strong>n = ' + (coluna-1) + '</strong>, então <strong>(' + postoAmpliada + ' < ' + (coluna-1) + 
            ')</strong>, assim o sistema é indeterminado e adminte mais de uma solução. <br/><br/>';

            mostraVerificacao += 'Desse modo, é necessário encontrar o grau de liberdade (número de variáveis do sistema - posto (n - p)) do sistema. Assim, o sistema apresenta(m) ' + grauLiberdade + ' variável(is) livre(s) (' + (coluna-1) + ' - ' + postoAmpliada + ' = ' + grauLiberdade+ ') <br/>';

            expressaoLivre = calculoVariaveisLivres(matriz, linha, coluna);
            tratamentoLivres = tratamentoVariaveisLivres(expressaoLivre);
            var vetorArmazenaInicial = obtendoExpressaoInicial(tratamentoLivres);
            
            var t, ultimaCostante;
            ultimaCostante = letras[grauLiberdade];
            var livres = ['α', 'β', 'γ', 'ε', 'δ'];

            if(tratamentoLivres.length == 1){
                mostraVerificacao += 'Considerando agora o sistema associado a matriz linha reduzida<br/>';
                for(t = 0; t < vetorArmazenaInicial.length; t++){
                    mostraVerificacao += '<strong>' + vetorArmazenaInicial[t] + '</strong> ';
                }
                mostraVerificacao += '<br/>'
                variaveis = [];
                mostraVerificacao += '<br/>Escolhendo ';
                for(var d = 0; d < grauLiberdade; d++){
                    mostraVerificacao += '<strong>' + letras[d] + "</strong> ";
                    if(grauLiberdade-1 != d){
                        mostraVerificacao += ' e ';
                    }
                    variaveis.push(letras[d]);
                }
                mostraVerificacao += 'para serem livres, dai as soluções são:';
                var a, c, simboloNovo, simboloGuarda = '', flag = '', identificador = 0;
                var novoVetor = [];
                
                for(b = 0; b < variaveis.length; b++){
                    mostraVerificacao += '<br/><strong>' + variaveis[b] + ' = ' + livres[b] + ' ∈ R </strong>';                    
                }
                
                mostraVerificacao += '<br/>Para encontra o valor de <strong>' + ultimaCostante + '</strong>, basta realizar a subtituição dos valores acima na expressão '
                for(t = 0; t < vetorArmazenaInicial.length; t++){
                    mostraVerificacao += '<strong>' + vetorArmazenaInicial[t] + '</strong> ';
                }
                mostraVerificacao += '.';
                for(a = 0; a < vetorArmazenaInicial.length; a++){
                    simboloNovo = vetorArmazenaInicial[a];
                    for(b = 0; b < simboloNovo.length; b++){
                        for(c = 0; c < variaveis.length; c++){
                            if(simboloNovo[b] == variaveis[c]){                               
                                simboloGuarda = vetorArmazenaInicial[a];
                                var recebeDados = '';
                                for(var t = 0; t < simboloGuarda.length-1; t++){
                                    recebeDados += simboloGuarda[t];
                                }
                                flag = recebeDados;
                                flag += livres[c];
                                identificador = 1;
                                novoVetor.push(flag);
                            }                                                     
                        }
                    }
                    if(identificador == 0){
                        novoVetor.push(vetorArmazenaInicial[a]);
                    }
                    identificador = 0;
                }
                mostraVerificacao += '<br/>';
                for(a = 0; a < novoVetor.length; a++){
                    mostraVerificacao += '<strong> ' + novoVetor[a] + '</strong>';
                }
                var vetorFinal = [];
                var armazena, teste2 = 0;
                for(a = (novoVetor.length-4); a < novoVetor.length; a++){                
                    if(novoVetor[a] != 0){
                        if(novoVetor[a] == '+'){
                            armazena = '-';
                            teste2 = 1;
                        }
                        else{
                            vetorFinal.push(novoVetor[a]);
                        }
                        if(a == (novoVetor.length-2)){
                            if(teste2 == 1){
                                vetorFinal.push(armazena);
                                teste2 = 0;
                            }
                        }
                    }
                }
                for(a = 0; a < novoVetor.length-4; a++){                                      
                    if(novoVetor[a] == '+'){
                        vetorFinal.push('-');
                    }
                    else{
                        vetorFinal.push(novoVetor[a]);
                    }
                }
                mostraVerificacao += '<br/>';
                mostraVerificacao += 'Para encontrar o valor de <strong>' + ultimaCostante + '</strong>, basta isolar ele e concluir o cálculo.<br/>'

                for(a = 0; a < vetorFinal.length; a++){
                    mostraVerificacao += '<strong> ' + vetorFinal[a] + '</strong>';
                }
                
            }
            else{
                variaveis = [];
                mostraVerificacao += '<br/>Escolhendo ';
                for(var d = 0; d < grauLiberdade; d++){
                    mostraVerificacao += '<strong>' + letras[d] + "</strong> ";
                    if(grauLiberdade-1 != d){
                        mostraVerificacao += ' e ';
                    }
                    variaveis.push(letras[d]);
                }
                mostraVerificacao += 'para ser livre, dai a solução é:';

                var t, b;
                for(b = 0; b < variaveis.length; b++){
                    mostraVerificacao += '<br/><strong>' + variaveis[b] + ' = ' + livres[b] + ' ∈ R </strong>';                    
                }
                mostraVerificacao += '<br/>Assim para obter os valores das demais constantes, basta escolher uma destas equações ';
                
                mostraVerificacao += '<br/>';
                for(t = 0; t < tratamentoLivres.length; t++){
                    for(b = 0; b < tratamentoLivres[0].length; b++){
                        mostraVerificacao += '<strong>' + tratamentoLivres[t][b] + '</strong> ';
                    }
                    mostraVerificacao += '<br/>';
                }
                mostraVerificacao += 'e substituir '
                for(b = 0; b < variaveis.length; b++){
                    mostraVerificacao += '<strong>' + variaveis[b] + '</strong> pelo <strong>' + livres[b] + '</strong> ';                    
                }
            }
            mostraVerificacao += 'Portanto, o sistema é compatível e indeterminado.';
        }
        else{
            mostraVerificacao += 'Como o <strong>posto da matriz ampliada </strong>é igual a  <strong>' + postoAmpliada + 
            '</strong>, <strong>posto da matriz dos coeficientes</strong> é igual a  <strong>' + postoCoeficiente + ' e o </strong><strong>número de variáveis</strong> é igual a <strong>' + (coluna-1) + 
            ', que são </strong>são diferentes. Logo, o <strong>SISTEMA É IMPOSSÍVEL e não EXISTE SOLUÇÃO</strong>.';
        }
    }  
    
    var resultadoVerificaSistema = document.getElementById('resultado-verifica');
    var resultadoVerificaSistema2 = document.createElement("span");
    resultadoVerificaSistema2.innerHTML = mostraVerificacao;
    resultadoVerificaSistema.appendChild(resultadoVerificaSistema2);
}


//[1 3 1 0][2 6 2 0][-1 -3 -1 0] uma linha
//[1 2 -3 1][2 5 -8 4][3 8 -13 7] duas linhas
function obtendoExpressaoInicial (tratamentoLivres){
    var x, y, z;
    var simboloVerifica;
    var vetorArmazena = [];
    var constanteRecebe = '';
    
    for(x = 0; x < tratamentoLivres.length; x++){
        for(y = 0; y < tratamentoLivres[0].length; y++){
            simboloVerifica = tratamentoLivres[x][y];
            //if(simboloVerifica[0] != 0){
                if(x == 0){
                    if(simboloVerifica.length >= 2){
                        for(z = 0; z < simboloVerifica.length; z++){
                            if(simboloVerifica[z] == '-'){                           
                                vetorArmazena.push(simboloVerifica[z]);
                            }
                            else{
                                if(constanteRecebe == null){
                                    constanteRecebe = simboloVerifica[z];
                                }
                                else{
                                    constanteRecebe += simboloVerifica[z];
                                }
                            }
                        }
                        vetorArmazena.push(constanteRecebe);
                        constanteRecebe = null;
                    }
                    else{
                        vetorArmazena.push(tratamentoLivres[x][y]);
                    }
                }
            //}
        }
    }
    return vetorArmazena;
}

function tratamentoVariaveisLivres(expressaoLivre) {
    var x, y;
    var novoSimbolo, mostra = '', valor = 0;
    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];
    
    var matrizResultados = [];
    var recebe, menos = '', simboloMenos;
    for(x = 0; x < expressaoLivre.length; x++){
        matrizResultados[x] = []
        var resultadoExpressao = [];
        for(y = 0; y < expressaoLivre[0].length; y++){
            novoSimbolo = matriz[x][y];
            if(y == (expressaoLivre[0].length-1)){
                resultadoExpressao.push('=');
                resultadoExpressao.push(expressaoLivre[x][y]);
            }
            else{
                for(z = 0; z < novoSimbolo.length; z++){
                    if(novoSimbolo[z] == '-'){
                        valor = 1;
                        z = novoSimbolo.length;
                    }
                }

                if(valor == 1){
                    simboloMenos = expressaoLivre[x][y];
                    for(var o = 0; o < simboloMenos.length; o++){
                        if(simboloMenos[o] != '-'){
                            menos += simboloMenos[o];
                        }
                    }
                    resultadoExpressao.push('-');
                    resultadoExpressao.push(menos + letras[y]);
                }
                else{
                    if(y >= 1){
                        resultadoExpressao.push('+');
                        resultadoExpressao.push(expressaoLivre[x][y] + letras[y]);
                    }
                    else{
                        resultadoExpressao.push(expressaoLivre[x][y] + letras[y]);
                    }
                }
            }
            valor = 0;
        }
        matrizResultados[x] = resultadoExpressao;
        resultadoExpressao = null;
    }
    return matrizResultados;
}

function solucao(matrizAmpliada, linha, coluna) {
	var x, y;
    solucaoValor = [];
    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];    
    
	for(x = 0; x < linha; x++){
		for(y = coluna-1; y < coluna; y++){
            solucaoValor.push(letras[x] + ' = ' + matrizAmpliada[x][y]);
		}
	}
	return solucaoValor;
}

function nulidadeExpressao(coluna, valorPosto) {
	return ((coluna-1) - valorPosto);
}

function deletarMatriz(matriz) {
    matriz = null;
    mostraTudo = '';
    mostraVerificacao = '';
}

