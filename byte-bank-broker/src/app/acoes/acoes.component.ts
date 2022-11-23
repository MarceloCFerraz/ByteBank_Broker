import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Acoes } from "./modelo/acoes";
import { AcoesService } from "./acoes.service";
import { Subscription } from "rxjs";
@Component({
    selector: "app-acoes",
    templateUrl: "./acoes.component.html",
    styleUrls: ["./acoes.component.css"],
})
export class AcoesComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    acoesInput = new FormControl();
    acoes: Acoes;

    constructor(private _acoesService: AcoesService) {}

    ngOnInit(): void {
        this.subscription = this._acoesService.getAcoes().subscribe((acoes) => {
            this.acoes = acoes;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
