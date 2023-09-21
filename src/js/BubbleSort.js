export default class BubbleSort {
    constructor(array, visualizeArray, speed, endSort) {
        this.array = array;
        this.visualizeArray = visualizeArray;
        this.n = this.array.length;
        this.interval = null;
        this.speed = speed
        this.paused = false;
        this.endSort = endSort;
    }

    start() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            if (this.paused) return;

            // Флаг, указывающий, был ли выполнен обмен элементов в текущем проходе.
            let swapped = false;
            // Проходим по всем элементам массива, кроме последнего.
            for (let i = 0; i < this.n - 1; i++) {
                if (this.array[i] > this.array[i + 1]) {
                    // Меняем местами, если текущий элемент больше следующего.
                    let temp = this.array[i];
                    this.array[i] = this.array[i + 1];
                    this.array[i + 1] = temp;

                    // Устанавливаем флаг в true, так как произошла замена.
                    swapped = true;
                }
            }

            // Уменьшаем размер рассматриваемого сегмента массива на 1.
            this.n--;

            this.visualizeArray(this.array);

            if (!swapped) {
                clearInterval(this.interval);
                this.endSort()
            }
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