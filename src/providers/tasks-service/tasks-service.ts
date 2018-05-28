import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


/*
  Generated class for the TasksServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksServiceProvider {

  db: SQLiteObject = null;

  constructor(public http: HttpClient) {
    
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    /*let sqlTemp = 'DROP TABLE IF EXISTS UserOpen';
    this.db.executeSql(sqlTemp, []);*/

    let sql = 'CREATE TABLE IF NOT EXISTS UserOpen(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastname TEXT, email TEXT,)';
    this.db.executeSql(sql, []);

    let sqlParam = 'CREATE TABLE IF NOT EXISTS ParamsOpen(name TEXT, valueParam TEXT, created_date date default CURRENT_DATE)';
    return this.db.executeSql(sqlParam, []);
  }

  getUser(){
    let sql = 'SELECT * FROM UserOpen';
    return this.db.executeSql(sql, [])
    .then(response => {
      console.log(response.rows.length)
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  getParam(data: any){
    let sql = 'SELECT * FROM ParamsOpen where name = ?';
    return this.db.executeSql(sql, [data.name])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  create(data: any){
    let sql = 'INSERT INTO UserOpen(name, lastname,email) VALUES(?,?,?)';
    return this.db.executeSql(sql, [data.name, data.lastname,data.email]);
  }

  insertParamsOpen(data: any){
    let sql = 'INSERT INTO ParamsOpen(name, valueParam) VALUES(?,?)';
    return this.db.executeSql(sql, [data.name, data.valueParam]);
  }

  truncate(){
    let sql = 'TRUNCATE TABLE UserOpen';
    this.db.executeSql(sql, []);

    sql = 'TRUNCATE TABLE ParamsOpen';
    return this.db.executeSql(sql, []);
  }

  update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

  delete(data){
    let sql = 'DELETE FROM UserOpen';
    return this.db.executeSql(sql, [data.id]);
  }

}
