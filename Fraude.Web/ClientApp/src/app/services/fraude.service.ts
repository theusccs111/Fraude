import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

var url = environment.api + '/FileText';
var url2 = environment.api + '/FileImage';
var url3 = environment.api + '/Color';

@Injectable({
    providedIn: 'root'
})
export class FraudeService {
    constructor(private http: HttpClient) { }

    saveText(data): Observable<any> {
        const apiurl = `${url}/save`
        return this.http.post<any>(apiurl,data);
    }

    getText(): Observable<any> {
        const apiurl = `${url}/read`
        return this.http.get<any>(apiurl);
    }

    upload(data): Observable<any> {
        const apiurl = `${url2}/upload`
        return this.http.post<any>(apiurl, data);
    }

    getAllImages(): Observable<any> {
        const apiurl = `${url2}/download`
        return this.http.get<any>(apiurl);
    }

    downloadImage(data): Observable<any> {
        const apiurl = `${url2}/download/?fileName=${data}`
        return this.http.get<any>(apiurl);
    }

    saveColor(data): Observable<any> {
        const apiurl = `${url3}`
        return this.http.post<any>(apiurl, data);
    }

    getColor(): Observable<any> {
        const apiurl = `${url3}`
        return this.http.get<any>(apiurl);
    }




}
