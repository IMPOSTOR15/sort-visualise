export default class QuickSort {
    constructor(array, visualizer, speed, endSort) {
        this.array = array;
        this.stack = [[0, array.length - 1]];
        this.interval = null;
        this.speed = speed
        this.paused = true;
        this.visualizeArray = visualizer || (() => {});
        this.endSort = endSort
    }

    partition(low, high) {
        // Выбираем опорный элемент из конца массива.
        const pivot = this.array[high];
        // Инициализируем индекс для разбиения массива.
        let i = low - 1;
    
        // Перебираем элементы в диапазоне от low до high-1.
        for (let j = low; j <= high - 1; j++) {
            // Если текущий элемент меньше или равен опорному,
            if (this.array[j] < pivot) {
                i++; // увеличиваем индекс разбиения.
    
                // Меняем местами элементы array[i] и array[j].
                let temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
            }
        }
    
        // После завершения цикла, меняем местами опорный элемент и элемент на позиции i+1.
        let temp = this.array[i + 1];
        this.array[i + 1] = this.array[high];
        this.array[high] = temp;
    
        // Возвращаем индекс разбиения.
        return i + 1;
    }
    
    quickSortStep() {
        // Если сортировка приостановлена, то выходим из функции.
        if (this.paused) return;
        
        // Если стек пуст, завершаем сортировку.
        if (this.stack.length === 0) {
            this.stop();
            this.endSort();
            return;
        }
    
        // Извлекаем пару границ из стека.
        const [low, high] = this.stack.pop();
    
        // Если нижняя граница меньше верхней,
        if (low < high) {
            // Выполняем разбиение и получаем индекс разбиения.
            const pi = this.partition(low, high);
    
            this.visualizeArray(this.array);
    
            // Добавляем новые границы для сортировки в стек.
            if (low < pi - 1) this.stack.push([low, pi - 1]);
            if (pi + 1 < high) this.stack.push([pi + 1, high]);
        }
    }

    start() {
        this.paused = false;
        this.interval = setInterval(() => this.quickSortStep(), this.speed);
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
