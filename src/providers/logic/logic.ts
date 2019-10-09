import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LogicProvider {

    //https://hoshcoding.com/ionic-4-3-get-data-from-local-json-file Archivo referencia valores dinamicos
    private dataUrl: string = "assets/data/AppSettings.json"

      constructor(private http: HttpClient) { }

      getData(): Observable<string> {
        return this.http.get<string>(this.dataUrl)
     }

}