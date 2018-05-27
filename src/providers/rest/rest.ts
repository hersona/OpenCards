import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class RestProvider {

  urlBase = 'http://52.11.130.203:8089';
  tokenAutorization = 'grant_type=password&username=hersonEder@gmail.com&password=12345$$';
  constructor(public http: HttpClient, public httpClasic: Http) {
  }

  getToken() {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlBase + "/token", this.tokenAutorization)
        .subscribe(res => {
          resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  //Almacenar codigo del APP
  saveTokenAcces(AppCode) {
    return new Promise((resolveToken, rejectsErrorToken) => {
      //Obtener codigo del token
      this.getToken().then((resultToken) => {
        //Almacenar peticion
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/json");
        header.append("authorization", "bearer " + resultToken.access_token);
        let options = new RequestOptions({ headers: header });
        return new Promise((resolve, reject) => {
          this.httpClasic.post(this.urlBase + '/api/AppCode/ValidateAppCode', JSON.stringify(AppCode),
            options
          )
            .subscribe(res => {
              resolve(res),resolveToken(res)
            }, (err) => {
              reject(err),rejectsErrorToken(err);
            });
        });
      }, (err) => {
        console.log(err);
      });
    });
  }

}
