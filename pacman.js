document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const cells = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    let pacmanIndex = 11;
    let score = 0;
    const scoreDisplay = document.getElementById('score');
 
    // Inicializa cada celda para permitir superposición
    cells.forEach(cell => {
        cell.style.position = 'relative';
    });
 
    function createSprite(className) {
        const sprite = document.createElement('span');
        sprite.classList.add(className);
        sprite.style.position = 'absolute';
        sprite.style.top = '0';
        sprite.style.left = '0';
        sprite.style.width = '100%';
        sprite.style.height = '100%';
        sprite.style.zIndex = '2';
        return sprite;
    }
 
    let pacmanSprite = createSprite('pacman');
    cells[pacmanIndex].appendChild(pacmanSprite);
 
    function movePacman(e) {
        cells[pacmanIndex].removeChild(pacmanSprite);
 
        switch (e.key) {
            case 'ArrowUp':
                if (pacmanIndex - width >= 0 && !cells[pacmanIndex - width].classList.contains('wall')) {
                    pacmanIndex -= width;
                }
                break;
            case 'ArrowDown':
                if (pacmanIndex + width < cells.length && !cells[pacmanIndex + width].classList.contains('wall')) {
                    pacmanIndex += width;
                }
                break;
            case 'ArrowLeft':
                if (pacmanIndex % width !== 0 && !cells[pacmanIndex - 1].classList.contains('wall')) {
                    pacmanIndex -= 1;
                }
                break;
            case 'ArrowRight':
                if (pacmanIndex % width !== width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')) {
                    pacmanIndex += 1;
                }
                break;
        }
 
        if (cells[pacmanIndex].classList.contains('dot')) {
            cells[pacmanIndex].classList.remove('dot');
            score += 10;
            if (scoreDisplay) scoreDisplay.textContent = score;
        }
 
        cells[pacmanIndex].appendChild(pacmanSprite);
    }
 
    document.addEventListener('keydown', movePacman);
   
 
    // Fantasmas
    class Ghost {
        constructor(name, startIndex, className, speed = 500) {
            this.name = name;
            this.currentIndex = startIndex;
            this.className = className;
            this.speed = speed;
            this.timerId = null;
            this.directions = [-1, 1, -width, width];
            this.sprite = createSprite(className);
        }
 
        draw() {
            cells[this.currentIndex].appendChild(this.sprite);
        }
 
        erase() {
            if (cells[this.currentIndex].contains(this.sprite)) {
                cells[this.currentIndex].removeChild(this.sprite);
            }
        }
 
        move() {
            const moveGhost = () => {
                const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
                const nextIndex = this.currentIndex + direction;
                if (
                    !cells[nextIndex].classList.contains('wall') &&
                    !cells[nextIndex].classList.contains('ghost')
                ) {
                    this.erase();
                    this.currentIndex = nextIndex;
                    this.draw();
                } else {
                    moveGhost();
                }
            };
            this.timerId = setInterval(moveGhost, this.speed);
        }
    }
 
    const blinky = new Ghost('blinky', 35, 'red', 500);
    const pinky = new Ghost('pinky', 36, 'pink', 500);
    const ghosts = [blinky, pinky];
 
    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.move();
    });
});

