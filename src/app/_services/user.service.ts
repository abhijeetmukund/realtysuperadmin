import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('https://www.realtymonk.com/websapi/authentication/login');
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/${id}`);
    }


    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}