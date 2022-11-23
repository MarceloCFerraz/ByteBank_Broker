import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, map, pluck } from "rxjs/operators";
import { Acao, AcoesAPI } from "./modelo/acoes";

const API: string = "http://localhost:3000";

@Injectable({
    providedIn: "root",
})
export class AcoesService {
    constructor(private _http: HttpClient) {}

    getAcoes() {
        return this._http.get<AcoesAPI>(`${API}/acoes`).pipe(
            /**
             * É muito importante a ordem dos operadores, pois,
             * assim como um cano, o resultado de um operador é
             * passado para o próximo.
             *
             * Os operadores são funções que manipulam o fluxo da informação (stream)
             *
             * @tap => utilizado para verificar o conteúdo do Observable
             * @pluck => utilizado para mudar o escopo do observable. Neste caso,
             * o observable estava trafegando a interface "AcoesAPI", cujo único
             * dado é o "payload" que é do tipo "Acoes". Com o operador "pluck",
             * nós mudamos o escopo para que os dados trafegados sejam da interface "Acoes".
             * O operador pluck funciona como uma forma abreviada e você fazer um "map"
             * retornando o atributo da interface pai.
             * @map => utilizado para mudar/modificar o objeto que o stream retorna
             */
            pluck("payload"),
            map((acoes) =>
                acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
            )
        );
    }
    private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
        let retorno = 0;

        if (acaoA.codigo > acaoB.codigo) {
            retorno = 1;
        } else if (acaoA.codigo < acaoB.codigo) {
            retorno = -1;
        }

        return retorno;
    }
}
