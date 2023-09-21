export default class MergeSort {
    constructor(array, visualizer, speed, endSort) {
        this.array = array;
        this.actions = [];
        this.actionIndex = 0;
        this.interval = null;
        this.speed = speed
        this.paused = true;
        this.visualizeArray = visualizer || (() => {});
        this.endSort = endSort
    }

    start() {
        this.actions = [];
        this.mergeSort(0, this.array.length - 1);
        this.array = []
        this.paused = false;
        this.interval = setInterval(() => {
            if (this.paused) return;
            const action = this.actions[this.actionIndex];
            if (action) {
                if (action.type === 'set') {
                    this.array[action.index] = action.value;
                }

                this.visualizeArray(this.array);
                this.actionIndex++;
            } else {
                this.endSort()
                this.stop();
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
            this.actionIndex = 0;
            this.paused = true;
        }
    }

    mergeSort(l, r) {
        // Проверка базового условия: если l < r, то продолжаем разделение.
        if (l < r) {
            // Находим средний индекс.
            const m = l + Math.floor((r - l) / 2);
            // Рекурсивно сортируем левую половину.
            this.mergeSort(l, m);
            // Рекурсивно сортируем правую половину.
            this.mergeSort(m + 1, r);
            // Сливаем отсортированные половины.
            this.merge(l, m, r);
        }
    }
    
    merge(l, m, r) {
        // Вычисляем длины двух подмассивов, которые будут объединены.
        const n1 = m - l + 1;
        const n2 = r - m;
    
        // Создаем временные массивы.
        const L = new Array(n1);
        const R = new Array(n2);
    
        // Копируем данные во временные массивы L[] и R[].
        for (let i = 0; i < n1; i++)
            L[i] = this.array[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = this.array[m + 1 + j];
    
        // Начальные индексы первого и второго подмассива.
        let i = 0;
        let j = 0;
        // Начальный индекс объединенного подмассива.
        let k = l;
    
        // Процесс слияния двух подмассивов в один.
        while (i < n1 && j < n2) {
            // Для визуализации: добавляем действие установки значения.
            if (L[i] <= R[j]) {
                this.actions.push({ type: 'set', index: k, value: L[i] });
                this.array[k] = L[i];
                i++;
            } else {
                this.actions.push({ type: 'set', index: k, value: R[j] });
                this.array[k] = R[j];
                j++;
            }
            k++;
        }
    
        // Копирование оставшихся элементов из L[], если есть таковые.
        while (i < n1) {
            this.actions.push({ type: 'set', index: k, value: L[i] });
            this.array[k] = L[i];
            i++;
            k++;
        }
    
        // Копирование оставшихся элементов из R[], если есть таковые.
        while (j < n2) {
            this.actions.push({ type: 'set', index: k, value: R[j] });
            this.array[k] = R[j];
            j++;
            k++;
        }
    }
}