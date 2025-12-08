import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {DadataSuggestion} from "../interface/dadata.interface";

@Injectable({
  providedIn: 'root',
})

export class DadataService{
  #apiUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
  #http = inject(HttpClient)

  getSuggestion(query:string){
    const DATA_TOKEN = '9583fa4d54a4c862ccdd84e41896f539b2036e51'
    return this.#http.post<{suggestions: DadataSuggestion[]} >(this.#apiUrl, {query}, {
      headers:{
       Authorization: `Token ${DATA_TOKEN}`}
    }).pipe(
      map(res => {
          return res.suggestions;
    // return Array.from(
    //     new Set(
    //     res.suggestions.map((suggestion: DadataSuggestion) => {
    //       return suggestion.data.city
    //     })
    //     ))
      })
    )}
}





