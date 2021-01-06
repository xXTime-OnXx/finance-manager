import {Component, OnInit} from '@angular/core';
import {createWorker, Worker} from "tesseract.js";

@Component({
    selector: 'app-ocr-scanner',
    templateUrl: './ocr-scanner.page.html',
    styleUrls: ['./ocr-scanner.page.scss'],
})
export class OcrScannerPage implements OnInit {

    image: '/assets/receipt.jpeg';
    ocrResult = '';

    private worker: Worker;

    constructor() {
    }

    async ngOnInit() {
        await this.loadWorker();
    }

    async loadWorker() {
        this.worker = createWorker({
            logger: progress => {
                console.log(progress);
            }
        });
        await this.worker.load();
        await this.worker.loadLanguage('eng')
        await this.worker.initialize();
    }

    async recognizeImage() {
        const result = await this.worker.recognize('/assets/receipt.jpeg');
        const lines = result.data.text.split('\n');
        const products = []
        for (let line of lines) {
            // TOOD: https://regex101.com/r/wdquW3/4
            // https://www.youtube.com/watch?v=c6MyNU0jp28
            if (line.match(/^\d+.*\d+\.\d{0,2}$/g)) {
                console.log('Matched: ' + line);
            }
        }
        console.log(lines);
    }
}