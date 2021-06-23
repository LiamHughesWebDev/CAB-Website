
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()
export class BookService {
    Results = [];

    constructor(private http: HttpClient) { }

    getBook (book) {
        const searchphrase: string = 'https://www.googleapis.com/books/v1/volumes?q=';
        const filter: string = '&filter=ebooks'
        const key: string = '&key=' + environment.BookAPIKey;
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