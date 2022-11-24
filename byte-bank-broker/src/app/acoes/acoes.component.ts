import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { merge } from "rxjs";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { AcoesService } from "./acoes.service";
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
        debounceTime(200),
        tap(() => {
            console.log("Fluxo Filtro");
        }),
        switchMap((valorDigitado) =>
            this._acoesService.getAcoes(valorDigitado)
        ),
        tap(console.log)
    );
    acoes$ = merge(this.todasAcoes$, this.acoesInput$);

    constructor(private _acoesService: AcoesService) {}
}
