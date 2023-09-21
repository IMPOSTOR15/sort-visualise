export default class SelectionSort {
    constructor(array, visualizeArray, speed, endSort) {
        this.array = array;
        this.n = this.array.length;
        this.currentIndex = 0;
        this.interval = null;
        this.paused = false;
        this.speed = speed
        this.visualizeArray = visualizeArray
        this.endSort = endSort
    }

    start() {
        this.interval = setInterval(() => {
            if (this.paused) return;

            let minIndex = this.currentIndex;
            
            // Начинаем цикл с элемента, следующего за текущим индексом.
            for (let j = this.currentIndex + 1; j < this.n; j++) {
                // Если текущий элемент меньше элемента на ранее найденной позиции минимума, то обновляем значение minIndex.
                if (this.array[j] < this.array[minIndex]) {
                    minIndex = j;
                }
            }
            // Если минимальный элемент не на своем месте, то меняем местами.
            if (minIndex !== this.currentIndex) {
                // Сохраняем значение текущего индекса во временной переменной.
                let temp = this.array[this.currentIndex];
                // Присваиваем текущему индексу значение найденного минимального элемента.
                this.array[this.currentIndex] = this.array[minIndex];
                // Присваиваем индексу минимального элемента значение из временной переменной.
                this.array[minIndex] = temp;
            }

            this.visualizeArray(this.array);
            
            // Переход к следующему элементу.
            this.currentIndex++;
            if (this.currentIndex >= this.n - 1) {
                this.endSort()
                this.stop()
            }; 
        }, this.speed);
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}