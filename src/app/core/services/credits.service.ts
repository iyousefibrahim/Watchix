import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';
import { CreditDetails } from '../interfaces/responses/credit-details';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private _HttpClient: HttpClient) { }

  getCreditsById(credit_id: string): Observable<CreditDetails> {
    return this._HttpClient.get<CreditDetails>(`${baseUrl}credit/${credit_id}`);
  }
}
