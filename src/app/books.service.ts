
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BookService {
    Results = [];

    constructor(private http: HttpClient) { }

    getBook (book) {
        const searchphrase: string = 'https://www.googleapis.com/books/v1/volumes?q=';
        const filter: string = '&filter=ebooks'
        const key: string = '&key=AIzaSyDstiWCvLOTTJYHrOmjrsR8b9eHcSQEinI';
        const searchResults = [];

        this.http
            .get(searchphrase + book + filter + key)
            .subscribe(search => {
                const books = search;
                searchResults.push(books);
            });
        return searchResults;
    }
}