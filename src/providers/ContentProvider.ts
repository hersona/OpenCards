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
        space: 'ixdx605vg0m5',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '28d345b96ff85031961366574cdc5450f88da02646cf357e6e1ec5e8623a0f71'
    })

    getCards(query?: object): Promise<Entry<any>[]> {
        return this.client.getEntries(Object.assign({
            content_type: 'tarjeta'
        }, query))
            .then(res => res.items);
    }

    getCard(courseId): Promise<Entry<any>> {
        return this.client.getEntries(Object.assign({
            content_type: 'tarjeta'
        }, { 'sys.id': courseId }))
            .then(res => res.items[0]);
    }
}
