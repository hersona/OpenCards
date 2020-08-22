import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class RestProvider {

  urlBase = 'http://52.32.104.107:8089';
  tokenAutorization = 'grant_type=password&username=' + encodeURIComponent('hersonEder@gmail.com') + '&password=' + encodeURIComponent('12345%24%24');

  constructor(public http: HttpClient, public httpClasic: Http) {
  }

  objToken: any = {};
  getToken() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', 'hersonEder@gmail.com');
    urlSearchParams.set('password', '12345$$');

    let body = urlSearchParams.toString();

    return new Promise((resolve, reject) => {
      this.http.post(this.urlBase + '/token', body, {
        headers: headers
      })
        .subscribe((data: any) => {
          resolve(data.access_token)
        }, (err) => {
          reject(err)
        });
    });
  }

  //Almacenar codigo del APP
  saveTokenAcces(AppCode) {
    return new Promise((resolveToken, rejectsErrorToken) => {
      //Obtener codigo del token
      this.getToken().then((resultToken) => {

        let headers = new Headers({ 'Authorization': 'Bearer ' + resultToken });
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
          this.httpClasic.post(this.urlBase + '/api/AppCode/ValidateAppCode', JSON.stringify(AppCode),
          options
          )
            .subscribe(res => {
              resolve(res), resolveToken(res)
            }, (err) => {
              reject(err), rejectsErrorToken(err);
            });
        });
      }, (err) => {
        console.log(err);
      });

    });
  }

  //Almacenar LEAD del registro
  saveLead(objLead) {
    return new Promise((resolveToken, rejectsErrorToken) => {
      //Obtener codigo del token
      this.getToken().then((resultToken) => {

        let headers = new Headers({ 'Authorization': 'Bearer ' + resultToken });
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
          this.httpClasic.post(this.urlBase + '/api/AppCode/RegisterApp', JSON.stringify(objLead),
          options
          )
            .subscribe(res => {
              resolve(res), resolveToken(res)
            }, (err) => {
              reject(err), rejectsErrorToken(err);
            });
        });
      }, (err) => {
        console.log(err);
      });

    });
  }

}
