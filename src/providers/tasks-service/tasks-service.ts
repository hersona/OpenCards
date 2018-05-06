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

    let sql = 'CREATE TABLE IF NOT EXISTS UserOpen(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastname TEXT, email TEXT)';
    return this.db.executeSql(sql, []);
  }

  getAll(){
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

  create(data: any){
    let sql = 'INSERT INTO UserOpen(name, lastname,email) VALUES(?,?,?)';
    return this.db.executeSql(sql, [data.name, data.lastname,data.email]);
  }

  truncate(){
    let sql = 'TRUNCATE TABLE UserOpen';
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
