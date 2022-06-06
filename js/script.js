const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const stateEnum = {
    running: 'running',
    gameOver: 'game over'
}

let state = stateEnum.running;

const interval = () => {
    const pipePosition = pipe.offsetLeft;
    const cloudPosition = clouds.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver(pipePosition, cloudPosition, marioPosition);
        clearInterval(loop);
    }
};

const gameOver = (pipePosition, cloudPosition, marioPosition) => {
    pipe.classList.remove('pipe-animation');
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clouds.classList.remove('clouds-animation');
    clouds.style.left = `${cloudPosition}px`
    state = stateEnum.gameOver;
}

const resetAnimation = () => {
    pipe.classList.add('pipe-animation');
    pipe.style.left = ``;

    mario.style.animation = '';
    mario.style.bottom = `0px`;
    mario.src = './images/mario.gif';
    mario.style.marginLeft = '';
    mario.style.width = '150px';
    mario.classList.remove('jump');

    clouds.classList.add('clouds-animation');
    clouds.style.left = ``

    setInterval(interval, 10);
}


const loop = setInterval(interval, 10);

const resetEvent = () => {
    if (state === stateEnum.gameOver) {
        resetAnimation();
        setInterval(interval, 10);
        state = state.running;
    }
}

const jumpEvent = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

document.addEventListener("keydown", jumpEvent);
document.addEventListener("keydown", resetEvent);