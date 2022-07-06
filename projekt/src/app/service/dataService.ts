
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable ({
	providedIn: "root"
})


export class DataService {

	constructor(
		private http: HttpClient
	) {  }

	// Database Handling
	baseUrl = 'https://page.u-php.de/tmp';

	getAll():Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/get.php`).pipe(
			map((res: any) => {
				return res['data'];
			})
		);
	}
	
	update(elem:any):Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/update.php`, { elem }).pipe(
			map((res: any) => {
				return res['data'];
			})
		);
	}
}
