import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ServersComponent } from "./servers.component";

describe('ServersComponent', () => {
    let component: ServersComponent;
    let fixture: ComponentFixture<ServersComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ServersComponent], schemas: [NO_ERRORS_SCHEMA] });
        fixture = TestBed.createComponent(ServersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should create server on first toggle', () => {
        const noServerCreated = 'No server was created!';
        const serverCreated = `Server was created! The name is ${component.serverName}`;

        expect(component.serverCreationStatus).toEqual(noServerCreated)
        expect(component.serverCreated).toEqual(false);

        component.onCreateServer();

        expect(component.serverCreationStatus).toEqual(serverCreated);
        expect(component.serverCreated).toEqual(true);
    })

    it('should have first <label> with "Server Name"', () => {
        const label = 'Server Name';
        const labelElement: HTMLElement = fixture.nativeElement;
        const p = labelElement.querySelector('label')!;
        expect(p.textContent).toContain(label);
    })
});