
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface book{
  
    "kind": String,
    "id": String,
    "etag": String,
    "selfLink": String,
    "volumeInfo": {x
        "title": String,
        "authors": [
          string
        ],
        "publisher": String,
        "publishedDate": String,
        "description": String,
        "industryIdentifiers": [
            {
                "type": String,
                "identifier": String
            },
            {
                "type": String,
                "identifier": String
            }
        ],
        "readingModes": {
            "text": Boolean,
            "image": Boolean
        },
        "pageCount": Number,
        "printType": String,
        "categories": [
          String
        ],
        "averageRating": Number,
        "ratingsCount": Number,
        "maturityRating": String,
        "allowAnonLogging": Boolean,
        "contentVersion": String,
        "panelizationSummary": {
            "containsEpubBubbles": Boolean,
            "containsImageBubbles": Boolean
        },
        "imageLinks": {
            "smallThumbnail": String,
            "thumbnail": String
        },
        "language": String,
        "previewLink": String,
        "infoLink": String,
        "canonicalVolumeLink": String
    },
    "saleInfo": {
        "country": String,
        "saleability": String,
        "isEbook": Boolean,
        "listPrice": {
            "amount": Number,
            "currencyCode": String
        },
        "retailPrice": {
            "amount": Number,
            "currencyCode": String
        },
        "buyLink": String,
        "offers": [
            {
                "finskyOfferType": Number,
                "listPrice": {
                    "amountInMicros": Number,
                    "currencyCode": String
                },
                "retailPrice": {
                    "amountInMicros": Number,
                    "currencyCode": String
                },
                "giftable": Boolean
            }
        ]
    },
    "accessInfo": {
        "country": String,
        "viewability": String,
        "embeddable": Boolean,
        "publicDomain": Boolean,
        "textToSpeechPermission": String
        "epub": {
            "isAvailable": Boolean,
            "acsTokenLink": String
        },
        "pdf": {
            "isAvailable": Boolean
        },
        "webReaderLink": String,
        "accessViewStatus": String,
        "quoteSharingAllowed": Boolean
    },
    "searchInfo": {
        "textSnippet": String
    }
}
  
@Injectable()
export class BookService {
    Results = [];

    constructor(private http: HttpClient) { }

    async getBook (bookName) {
        const searchphrase: string = 'https://www.googleapis.com/books/v1/volumes?q=';
        const filter: string = '&filter=ebooks'
        const key: string = '&key=' + environment.BookAPIKey;
        const searchResults = [];

        this.http
            .get(searchphrase + bookName + filter + key)
            .subscribe((res) => {
                const books = res;
                searchResults.push(books);
            },(err)=>{
                console.log(err);
            });
        return searchResults;
    }

    storeBook(){
        console.log("stored");
    }
}