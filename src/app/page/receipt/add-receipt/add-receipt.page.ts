import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScannerService} from "../../../service/scaner/scanner.service";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {Router} from "@angular/router";

@Component({
    selector: 'app-addReceipt',
    templateUrl: './add-receipt.page.html',
    styleUrls: ['./add-receipt.page.scss'],
})
export class CreateTripPage implements OnInit {

    receipt: any;

    constructor(private scannerService: ScannerService, private router: Router) {
    }

    ngOnInit() {
        this.receipt = {
            title: '',
            date: new Date()
        };
    }

    async addReceipt() {
        const receipt = {
            title: this.receipt.title,
            date: Timestamp.fromDate(new Date(this.receipt.date)),
            products: [],
            user: undefined
        };
        await this.scannerService.addReceipt(receipt);
        await this.router.navigate(['/tabs/receipt-scanner']);
    }
}
