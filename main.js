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

    let campoJogador1 = document.getElementById('jogador1');
    let campoJogador2 = document.getElementById('jogador2');

    campoJogador1.textContent = jogador1;
    campoJogador2.textContent = jogador2;

    jogadorSelecionado[0].classList.add('jogador-selecionado');
})


let quadrados = document.querySelectorAll('.quadrado-marcacao');
quadrados.forEach((item) => {
    item.addEventListener('click', () => {
        registraJogada(item);
    })
})

let contador = 0;

function registraJogada(item) {
    
    if (item.textContent !== '') {
        alert('Seleciona outra casa.');
        return;
    }

    if (contador % 2 === 0) {
        item.textContent = 'X';
        item.classList.add('azul');
    } else {
        item.textContent = 'O';
        item.classList.add('verde');
    }

    jogadorSelecionado[0].classList.toggle('jogador-selecionado');
    jogadorSelecionado[1].classList.toggle('jogador-selecionado');

    if (contador === 9) {
        contador = 0;
    } else {
        contador++;
    }
    
}