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
export class AcoesComponent {
    acoesInput = new FormControl();
    acoes$ = this._acoesService.getAcoes();

    constructor(private _acoesService: AcoesService) {}
}
