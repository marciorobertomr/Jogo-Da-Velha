// --------- Adiciona jogadores na partida

let jogadorSelecionado = document.querySelectorAll('.jogadores-selecao');

let jogadores = document.getElementById('adicionar-jogadores');
jogadores.addEventListener('click', () => {
    let jogador1 = prompt('Digite o nome do primeiro jogador.');
    let jogador2 = prompt('Digite o nome do segundo jogador.');

    if (jogador1 === '' || jogador2 === '') {
        alert('Nomes inválidos. Por gentileza, entre novamente com os nomes.');
        return;
    }

    let confirmaJogadores = confirm(`
        Os nomes dos jogadores estão corretos?
        Jogador Nº1: ${jogador1}
        Jogador Nº2: ${jogador2}
    `)

    if (!confirmaJogadores) {
        alert('Jogadores não adicionados.');
        return;
    }

    jogadores.classList.add('botao-desabilitado');

    let campoJogador1 = document.getElementById('jogador1');
    let campoJogador2 = document.getElementById('jogador2');

    campoJogador1.textContent = jogador1;
    campoJogador2.textContent = jogador2;

    jogadorSelecionado[0].classList.add('jogador-selecionado');
})

// --------- Realiza e valida as marcações dos quadrados

let quadrados = document.querySelectorAll('.quadrado-marcacao');
quadrados.forEach((item) => {
    item.addEventListener('click', () => {
        registraJogada(item);
    })
})

let contador = 0;

function registraJogada(item) {
    let jogador1 = document.getElementById('jogador1');
    let jogador2 = document.getElementById('jogador2');
    let resultado;

    if (jogador1.textContent === '' && jogador2.textContent === '') {
        alert('Informe os nomes dos jogadores para começar.');
        return;
    } 

    if (item.textContent !== '') {
        alert('Seleciona outra casa.');
        return;
    }

    if (contador % 2 === 0) {
        item.textContent = 'X';
        item.classList.add('azul');
        jogadas.jogador1.push(item.parentElement.id);
        resultado = validaVitoria(jogadas.jogador1);
    } else {
        item.textContent = 'O';
        item.classList.add('verde');
        jogadas.jogador2.push(item.parentElement.id);
        resultado = validaVitoria(jogadas.jogador2);
    }

    if (resultado) {
        return;
    }
    
    if (contador === 9) {
        contador = 0;
    } else {
        contador++;
    }

    // validaVitoria(jogadas.jogador1);

    jogadorSelecionado[0].classList.toggle('jogador-selecionado');
    jogadorSelecionado[1].classList.toggle('jogador-selecionado');
}

// --------- Reinicia a partida

let reiniciar = document.getElementById('reiniciar');
reiniciar.addEventListener('click', () => {
    let confirmaReinicio = confirm('Deseja seguir com o reinicio do jogo?');

    if(confirmaReinicio) {
        quadrados.forEach((item) => {
            item.textContent = '';
            item.classList.remove('azul');
            item.classList.remove('verde');
        })
    
        document.getElementById('jogador1').textContent = '';
        document.getElementById('jogador2').textContent = '';

        jogadorSelecionado[0].classList.remove('jogador-selecionado');
        jogadorSelecionado[1].classList.remove('jogador-selecionado');
        tabuleiro.classList.remove('tabuleiro-desabilitado');
        jogadores.classList.remove('botao-desabilitado');

        quadradosTabuleiro.forEach((item) => {
            item.classList.remove('vitoria');
        })

        contador = 0;

        jogadas = {
            jogador1: [],
            jogador2: []
        };
    }
})

// --------- Valida e determina vitória na partida

let combinacoesDeVitoria = [
    ['quadrado1','quadrado2','quadrado3'],
    ['quadrado1','quadrado4','quadrado7'],
    ['quadrado1','quadrado5','quadrado9'],
    ['quadrado2','quadrado5','quadrado8'],
    ['quadrado3','quadrado5','quadrado7'],
    ['quadrado3','quadrado6','quadrado9'],
    ['quadrado4','quadrado5','quadrado6'],
    ['quadrado7','quadrado8','quadrado9'],
]

let jogadas = {
    jogador1: [],
    jogador2: []
};

function validaVitoria(jogador) {
    jogador.sort();

    let posicoesCombinacoes = [];
    let vitoria = false;
    
    for (let i = 0; i < combinacoesDeVitoria.length; i++) {
        let validador = 0;
        jogador.forEach((item) => {
            if (jogador.length >= 3) {
                if(combinacoesDeVitoria[i].includes(item)) {
                    validador++;
                }
                if(validador === 3) {
                    marcaQuadradosVitoria(combinacoesDeVitoria[i]);
                    desabilitaTabuleiro();
                    vitoria = true;
                }
            }
        })
    }

    if (vitoria) {
        return vitoria;
    }
}

let quadradosTabuleiro = document.querySelectorAll('.quadrados');
function marcaQuadradosVitoria (quadrados) {
    quadradosTabuleiro.forEach((quadrado) => {
        if (quadrados.includes(quadrado.id)) {
            quadrado.classList.add('vitoria');
        }
    })
}

function desabilitaTabuleiro() {
    let tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.classList.add('tabuleiro-desabilitado');
}