document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const cells = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    let pacmanIndex = 11;


    class Ghost {
        constructor(name, starIndex, className, speed = 500) {
            this.name = name;
            this.currentIndex = starIndex;
            this.className = className;
            this.speed = speed;
            this.timerId = null;
            this.directions = [-1, 1, -width, width];
        }

        draw() {
            cells[this.currentIndex].classList.add('ghost', this.className);
        }

        erase() {
            cells[this.currentIndex].classList.remove('ghost', this.className);
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



})





