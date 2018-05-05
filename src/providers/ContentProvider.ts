import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createClient, Entry } from 'contentful';

export class ContentProvider {

    constructor() {
      /*  this.client.getEntries()
            .then((response) => console.log(response));

        this.client.getEntries(Object.assign({
            content_type: 'tarjeta'
        }, { 'sys.id': '4JxipKARluaWwAuMaWQQuS' }))
            .then(res => console.log(res.items));
            */
    }

    private client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'lm3zkd6fnywn',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '09245226a9d6b0eeceea3494ec33ce6caa96ff802ccd7804426130421c4ff363'
    })

    getCards(query?: object): Promise<Entry<any>[]> {
        return this.client.getEntries(Object.assign({
            content_type: 'producto'
        }, query))
            .then(res => res.items);
    }

    getCard(courseId): Promise<Entry<any>[]> {
        return this.client.getEntries(Object.assign({
            content_type: 'moduloProducto'
        }, { 'fields.productoRelacionado.sys.id': courseId }))
            .then(res => res.items);
    }
}
