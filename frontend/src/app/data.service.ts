import { Injectable} from '@angular/core';
import { Expenses} from './Expenses';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {
  
  ELEMENT_DATA: Expenses[] = [
    {position: 0, title: 'Voiture', category: 'Travail', date_expenses: new Date(), prix: 5000},
    {position: 1, title: 'Maison', category: 'Domicile', date_expenses: new Date(), prix: 10000},
    {position: 2, title: 'Drone', category: 'Divers', date_expenses: new Date(), prix: 500},
  ];

  constructor() {
  }

  getData(): Observable<Expenses[]> {
    return of<Expenses[]>(this.ELEMENT_DATA);
  }

  addExpense(data) {
    this.ELEMENT_DATA.push(data);
  }

  editExpense(data) {
    this.ELEMENT_DATA;
  }

  deleteExpense(index) {
    const row = this.ELEMENT_DATA.indexOf(index);
    this.ELEMENT_DATA.splice(row, 1);
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }
}
