import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements AfterViewInit {
    @Input() message: string;
    @Output() close = new EventEmitter<void>();
    @ViewChild('closeButton') closeButton: ElementRef;

    ngAfterViewInit(): void {
        (this.closeButton.nativeElement as HTMLElement).focus();
    }

    onClose(): void {
        this.close.emit();
    }
}