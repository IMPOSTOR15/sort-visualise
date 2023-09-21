import BubbleSort from './BubbleSort.js';
import SelectionSort from './SelectionSort.js';
import InsertionSort from './InsertionSort.js';
import QuickSort from './QuickSort.js';
import MergeSort from './MergeSort.js';
import HeapSort from './HeapSort.js';

export default class SortingVisualizer {
    constructor() {
        this.array = [];
        this.currentSorter = null;
        
        this.arrayInputElement = document.getElementById("arrayInput");
        this.sortMethodElement =document.getElementById("sortMethod");
        this.visualizetionContainer = document.getElementById("visualization");

        this.startBtnElement = document.getElementById('startSort');
        this.startBtnElementText = document.getElementById('startBtnText');
        this.pauseBtnElement = document.getElementById('pauseSort');
        this.pauseBtnElementText = document.getElementById('pauseBtnText');
        this.sortSpeedElement = document.getElementById('sortSpeed');
        this.sortStatusElement = document.getElementById('sortStatus');

        this.startIcon = document.getElementById('startIcon');
        this.stopIcon = document.getElementById('stopIcon');
        this.pauseIcon = document.getElementById('pauseIcon');
        this.playIcon = document.getElementById('playIcon');

        this.initListeners();
    }

    startSort() {
        this.sortStatusElement.innerText = " "
        this.pauseBtnElementText.textContent = "Пауза"
        this.pauseBtnElement.style.display = "flex"
        this.pauseIcon.style.display = 'block'
        this.playIcon.style.display = 'none'
        this.startIcon.style.display = 'none'
        this.stopIcon.style.display = 'block'
        this.startBtnElementText.textContent = "Остановить сортировку"
        this.array = this.arrayInputElement.value.split(",").map(item => parseInt(item.trim()));

        if (this.currentSorter) {
            this.currentSorter.stop();
            this.currentSorter = null
            this.visualizeArray([])
            this.startBtnElementText.textContent = "Начать сортировку"
            this.startIcon.style.display = 'block'
            this.stopIcon.style.display = 'none'
            this.pauseBtnElement.style.display = "none"
            return
        }

        switch (this.sortMethodElement.value) {
            case 'bubble':
                this.currentSorter = new BubbleSort(this.array, this.visualizeArray.bind(this), this.sortSpeedElement.value, this.endSorting.bind(this));
                break;
            case 'selection':
                this.currentSorter = new SelectionSort(this.array, this.visualizeArray.bind(this), this.sortSpeedElement.value, this.endSorting.bind(this));
                break;
            case 'insertion':
                this.currentSorter = new InsertionSort(this.array, this.visualizeArray.bind(this), this.sortSpeedElement.value, this.endSorting.bind(this));
                break;
            case 'quick':
                this.currentSorter = new QuickSort(this.array, this.visualizeArray.bind(this), this.sortSpeedElement.value, this.endSorting.bind(this));
                break;
            case 'merge':
                this.currentSorter = new MergeSort(this.array, this.visualizeArray.bind(this), this.sortSpeedElement.value, this.endSorting.bind(this));
                break;
            case 'heap':
                this.currentSorter = new HeapSort(this.array, this.visualizeArray.bind(this), this.sortSpeedElement.value, this.endSorting.bind(this));
                break;
        }
        if (this.currentSorter) {
            this.currentSorter.start();
        }
    }
    
    endSorting() {
        this.currentSorter = null
        this.startIcon.style.display = 'block'
        this.stopIcon.style.display = 'none'
        this.pauseBtnElement.style.display = "none"
        this.startBtnElementText.textContent = "Начать сортировку"
        this.sortStatusElement.innerText = "Сортировка завершена"
        this.visualizetionContainer
    }

    toggleSort() {
        if (!this.currentSorter) return;
        if (this.currentSorter.paused) {
            this.pauseBtnElementText.textContent = "Пауза"
            this.pauseIcon.style.display = 'block'
            this.playIcon.style.display = 'none'
            this.currentSorter.resume();
        } else {
            this.pauseBtnElementText.textContent = "Продолжить"
            this.pauseIcon.style.display = 'none'
            this.playIcon.style.display = 'block'
            this.currentSorter.pause();
        }
    }

    visualizeArray(array) {
        this.visualizetionContainer.innerHTML = "";
        array.forEach(item => {
            const div = document.createElement("div");
            const valueSpan = document.createElement("span");
            valueSpan.textContent = item;
            div.style.height = `${item + 18}px`;
            div.appendChild(valueSpan);
            this.visualizetionContainer.appendChild(div);
        });
    }

    initListeners() {
        this.startBtnElement.addEventListener('click', this.startSort.bind(this));
        this.pauseBtnElement.addEventListener('click', this.toggleSort.bind(this));
    }
}

