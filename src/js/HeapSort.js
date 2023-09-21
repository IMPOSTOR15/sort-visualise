export default class HeapSort {
    constructor(array, visualizeArrayCallback, speed, endSort) {
        this.visualizeArray = visualizeArrayCallback;
        this.array = array;
        this.arraySize = 0;
        this.stack = [];
        this.paused = false;
        this.interval = null;
        this.speed = speed
        this.endSort = endSort
    }

    heapify(n, i) {
        // Инициализируем наибольший элемент как корневой.
        let largest = i;
        // Вычисляем индексы левого и правого потомков текущего узла.
        let l = 2 * i + 1;
        let r = 2 * i + 2;
    
        // Если левый потомок больше корня.
        if (l < n && this.array[l] > this.array[largest]) {
            largest = l;
        }
    
        // Если правый потомок больше, чем наибольший на текущий момент.
        if (r < n && this.array[r] > this.array[largest]) {
            largest = r;
        }
    
        // Если наибольший элемент не корневой.
        if (largest !== i) {
            // Меняем местами.
            [this.array[i], this.array[largest]] = [this.array[largest], this.array[i]];
            // Рекурсивно применяем процедуру к поддереву.
            this.heapify(n, largest);
        }
    }
    
    heapSortStep() {
        // Если сортировка на паузе, ничего не делаем.
        if (this.paused) return;
    
        // Если размер массива равен 1, сортировка завершена.
        if (this.arraySize === 1) {
            this.endSort();
            this.stop();
            return;
        }
    
        // Меняем местами корневой элемент и последний.
        [this.array[0], this.array[this.arraySize - 1]] = [this.array[this.arraySize - 1], this.array[0]];
        // Уменьшаем размер кучи.
        this.arraySize--;
        // Перестраиваем кучу.
        this.heapify(this.arraySize, 0);
        // Визуализируем текущее состояние массива.
        this.visualizeArray(this.array);
    }
    

    start() {
        this.array = this.array.slice();
        this.arraySize = this.array.length;

        for (let i = Math.floor(this.arraySize / 2) - 1; i >= 0; i--) {
            this.heapify(this.arraySize, i);
        }

        this.interval = setInterval(() => this.heapSortStep(), this.speed);
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
