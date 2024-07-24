// src/app/services/ip.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

var url = environment.api + '/Ip';

@Injectable({
    providedIn: 'root'
})
export class IpService {
    constructor(private http: HttpClient) { }

    getIp(): Observable<any> {
        const apiurl = `${url}/`
        return this.http.get<any>(apiurl);
    }
}
