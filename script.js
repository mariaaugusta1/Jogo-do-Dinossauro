const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumpung = false;
let position = 0; //posição inicial
let isGameOver = false;



function handleKeyUp (event) {
    if (event.keyCode === 32) { //verificar se precionou espaço
        if (!isJumpung) {
        jump ();
        }
    }
}


function jump () { //função pular
    isJumpung = true;

    let upInterval = setInterval (() => {//define intervalos 
        if (position >= 150) {
            clearInterval(upInterval);


            let downInterval = setInterval (() => { //descendo
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumpung = false;
                } else {
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            }, 20);
        } else { // subida
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
}


function criateCactos () { //faz o cactus aparecer
    const cactus = document.createElement ('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus'); //da para estilizar o cactus pelo css
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus); //cria um filho

    let leftTimer = setInterval (() => {
        if (cactusPosition < -60) {
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Jogo Acabou
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="Fim-jogo"> Fim de jogo </h1>';
        } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(criateCactos, randomTime);
}   
criateCactos ();
document.addEventListener('keyup', handleKeyUp);