import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, map, pluck } from "rxjs/operators";
import { Acao, AcoesAPI } from "./modelo/acoes";

const API: string = "http://localhost:3000";

@Injectable({
    providedIn: "root",
})
export class AcoesService {
    constructor(private _http: HttpClient) {}

    getAcoes(valor?: string) {
        const params = valor
            ? new HttpParams().append("valor", valor)
            : undefined;
        return this._http.get<AcoesAPI>(`${API}/acoes`, { params }).pipe(
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
             * @switchMap => utilizado para alternar o escopo do fluxo de dados da
             * aplicação para o fluxo da requisição. Neste caso, foi utilizado o switchMap
             * em acoes.component.ts para pegar o texto que estava sendo digitado no campo
             * de pesquisa e enviar uma requisição com o valor digitado capturando todas
             * as ações que possuem o texto digitado
             * @debounceTime => utilizado para adicionar delay em milissegundos para
             * dar prosseguimento no fluxo de dados. Muito bom de ser utilizado em
             * campos de pesquisa para evitar várias requisições desnecessárias em
             * casos onde o usuário digita muito rápido.
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
