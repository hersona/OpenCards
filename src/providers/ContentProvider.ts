import { createClient, Entry } from 'contentful';

export class ContentProvider {

    languageDefault: string = '';

    //Lenguajes disponibles
    objLanguages = [
        {Language: 'Spanish', web: 'es',contentful: 'es-CO'},
        {Language: 'English', web: 'en',contentful: 'en'},
        {Language: 'French', web: 'fr',contentful: 'fr'},
        {Language: 'Portuguese',web: 'pt',contentful: 'pt'},
        {Language: 'German', web: 'de',contentful: 'de'}
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
        var objLang = this.objLanguages.filter(
            book => book.web === lang)[0];

        if(objLang != undefined)
        {
            this.languageDefault =  objLang.contentful;
        }
        else
        {
            this.languageDefault =  "es-CO";
        }

    }

    getCards(langDefault,contentfulProducto,query?: object): Promise<Entry<any>[]> {
        console.log("LENG DEFECTO" + this.languageDefault);

        return this.client.getEntries(Object.assign({
            content_type: "productoOpemindTools",
            locale : this.languageDefault
        }, query))
            .then(res => res.items);
    }

    getCard(langDefault,contentfulModuloProducto,courseId): Promise<Entry<any>[]> {
        return this.client.getEntries(Object.assign({
            content_type: 'modulosProductoOpenmindTools',
            locale : this.languageDefault
        }, { 'fields.productoRelacionado.sys.id': courseId }))
            .then(res => res.items);
    }
}
