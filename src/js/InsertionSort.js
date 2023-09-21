export default class InsertionSort {
    constructor(array, visualizeArray, speed, endSort) {
        this.array = array;
        this.n = this.array.length;
        this.currentIndex = 1;
        this.interval = null;
        this.speed = speed
        this.paused = false;
        this.visualizeArray = visualizeArray
        this.endSort = endSort
    }

    start() {
        this.interval = setInterval(() => {
            if (this.paused) return;

            // Запоминаем текущий элемент массива, который будем вставлять на правильное место.
            let key = this.array[this.currentIndex];
            // Начинаем с элемента перед текущим.
            let j = this.currentIndex - 1;

            // Продолжаем двигаться назад через массив, пока не найдем правильное место для key или пока не достигнем начала массива.
            while (j >= 0 && this.array[j] > key) {
                // Сдвигаем элемент массива на одну позицию вперед.
                this.array[j + 1] = this.array[j];
                // Переходим к предыдущему элементу.
                j = j - 1;
            }
            // Вставляем key на правильное место в отсортированной последовательности.
            this.array[j + 1] = key;
            this.visualizeArray(this.array);

            // Переходим к следующему элементу массива, который нужно будет вставить.
            this.currentIndex++;

            if (this.currentIndex >= this.n) {
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