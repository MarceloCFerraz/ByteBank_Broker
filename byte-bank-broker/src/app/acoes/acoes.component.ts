import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { merge } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    tap,
} from "rxjs/operators";
import { AcoesService } from "./acoes.service";

const TYPING_WAIT_TIME: number = 300;

@Component({
    selector: "app-acoes",
    templateUrl: "./acoes.component.html",
    styleUrls: ["./acoes.component.css"],
})
export class AcoesComponent {
    acoesInput = new FormControl();
    todasAcoes$ = this._acoesService.getAcoes().pipe(
        tap(() => {
            console.log("Fluxo Inicial");
        })
    );
    acoesInput$ = this.acoesInput.valueChanges.pipe(
        debounceTime(TYPING_WAIT_TIME),
        tap((valorDigitado) => {
            console.log("Fluxo Filtro");
            console.log(valorDigitado);
        }),
        filter(
            (valorDigitado) =>
                valorDigitado.length >= 3 || !valorDigitado.length
        ),
        distinctUntilChanged(),
        switchMap((valorDigitado) =>
            this._acoesService.getAcoes(valorDigitado)
        ),
        tap(console.log)
    );
    acoes$ = merge(this.todasAcoes$, this.acoesInput$);

    constructor(private _acoesService: AcoesService) {}
}
