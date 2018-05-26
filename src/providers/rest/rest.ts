import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://52.11.130.203:8089/token';
  tokenAutorization = 'grant_type=password&username=hersonEder@gmail.com&password=12345$$';
  tokenApi = 'http://52.11.130.203:8089/api';

  constructor(public http: HttpClient, public httpClasic: Http) {

  }

  getToken() {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, this.tokenAutorization)
        .subscribe(res => {
          resolve(res), console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  testPost()
  {
    this.AppCode.name = "Herson Alvarado";
    this.AppCode.movies = ["I Love You Man", "Role Models"];
   
    var header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-Type", "application/json" );
    let options = new RequestOptions({ headers: header });
    
    return new Promise((resolve, reject) => {
      this.httpClasic.post('https://reqres.in/api/users',JSON.stringify(this.AppCode), 
      options
      )
        .subscribe(res => {
          resolve(res), console.log(res);
        }, (err) => {
          reject(err);
        });
    });
    
  }


  AppCode: any = {};
  token: 'bearer LZ4sbdyyeZonn5eq4awlCa6-JeZyq_w4L3-rjE7ODJOUIT5ojy-3WxC18sZRfDRjfoov74HJ79rUl2d2L2Hrrdgs25LAge1yRBJkNCMNaE0PCtxoT_smTBsiQJJq5PgfjN1YX2DCYzwHH7VaL1rDDV2LZA-m2vjXkZcG3AikCyRPQKQUXrTagV4SineSHhThs3wIyn8Lt2nSJD03DG3Te__YzlIUi9nYqSA3ODw9AwnimQkO51LqWWv_fjCSTM5rYozc7fQHcS_KSKO8v4MCXBWs5_RJ4Hygu-OVrloPkdvy9x4KvhTwkcdTL7fCeTZ4WAQ6TD1OwiUhS3OLejGYPn-yxxVVUnYAMl1pmH-K4yNsdbLHcHv5q25P2IMxk2SwN7TELwf2V8d-3jBHlIJzHXJI9nuF5bL1SzJbGxBOKCdO-ei1ikJnADbSZ4DcqqKP';
  saveTokenAcces() {

    this.AppCode.CodeApp = "abc1234n";
    this.AppCode.UserEmail = "herson@isolucion.com.co";
    this.AppCode.UserName = "Prueba";
    this.AppCode.CodeKit = "12345";

    var header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-Type", "application/json" );
    let options = new RequestOptions({ headers: header });

    console.log(JSON.stringify(this.AppCode));
    
    return new Promise((resolve, reject) => {
      this.httpClasic.post(this.tokenApi + '/AppCode/ValidateAppCodeAnonimo',JSON.stringify(this.AppCode), 
      options
      )
        .subscribe(res => {
          resolve(res), console.log(res);
        }, (err) => {
          reject(err);
        });
    });


    /*let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');

    //return new Promise((resolve, reject) => {
      this.http.post(this.tokenApi + '/AppCode/ValidateAppCode', JSON.stringify(this.AppCode), 
        { headers: {
          "Content-Type":"application/json",
          "authorization":this.token
        } }
      )
        .subscribe(res => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });
    //});*/
  }

}
