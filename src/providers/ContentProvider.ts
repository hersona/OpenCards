import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createClient, Entry } from 'contentful';

export class ContentProvider {

    //Lenguajes disponibles
    objLanguages = [
        {'Language': 'Spanish', 'web': 'es','contentful': 'es-CO'}, 
        {'Language': 'English', 'web': 'en','contentful': 'en'},
        {'Language': 'French', 'web': 'fr','contentful': 'fr'},
        {'Language': 'Portuguese', 'pt': 'en','contentful': 'pt'},
        {'Language': 'German', 'web': 'de','contentful': 'de'}
    ]

    constructor() {
      
    }

    private client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'lm3zkd6fnywn',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '09245226a9d6b0eeceea3494ec33ce6caa96ff802ccd7804426130421c4ff363'
    })

    objItemFind: any = {};
    

    getLanguageContentFul(lang)
    {
        return "es-CO";
        /*var objLang = this.objLanguages.filter(function(item) {
        return item.web === lang;
        })[0];
        if(objLang != undefined)
        {
            return objLang.contentful;
        }
        else
        {
            return "es-CO";
        }*/
    }

    getCards(langDefault,query?: object): Promise<Entry<any>[]> {
        return this.client.getEntries(Object.assign({
            content_type: 'producto',
            locale : this.getLanguageContentFul(langDefault)
        }, query))
            .then(res => res.items);
    }

    getCard(langDefault,courseId): Promise<Entry<any>[]> {
        return this.client.getEntries(Object.assign({
            content_type: 'moduloProducto',
            locale : this.getLanguageContentFul(langDefault)
        }, { 'fields.productoRelacionado.sys.id': courseId }))
            .then(res => res.items);
    }
}
