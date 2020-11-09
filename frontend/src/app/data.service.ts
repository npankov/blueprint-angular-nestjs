import { Injectable } from '@angular/core';
import { Expenses } from './Expenses';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {
  ELEMENT_DATA: Expenses[] = [
    {position: 0, title: 'Voiture', category: 'Travail', date_expenses: new Date(), prix: 50.10},
    {position: 1, title: 'Maison', category: 'Domicile', date_expenses: new Date(), prix: 10},
    {position: 2, title: 'Drone', category: 'Divers', date_expenses: new Date(), prix: 10},
  ];
  categories = [
    {value: 'Travail', viewValue: 'Travail'},
    {value: 'Domicile', viewValue: 'Domicile'},
    {value: 'Divers', viewValue: 'Divers'}
  ];

  private expensesSubject = new BehaviorSubject<Expenses[]>(this.ELEMENT_DATA);

  constructor() {
  }

  getData(sort?: { active?: string, direction: string }): Observable<Expenses[]> {
    if (sort) {
      this.sort(sort);
    }

    return this.expensesSubject.asObservable();
  }

  getCategories() {
    return this.categories;
  }

  sort(sort?: { active?: string, direction: string }): void {
    if (sort) {
      const data = this.ELEMENT_DATA.slice();

      if (!sort.active || sort.direction === '') {
        this.expensesSubject.next(data);
        return;
      }

      this.expensesSubject.next(data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';

        switch (sort.active) {
          case 'title':
            return compare(a.title, b.title, isAsc);
          case 'category':
            return compare(a.category, b.category, isAsc);
          case 'date_expenses':
            return compare(a.date_expenses, b.date_expenses, isAsc);
          case 'prix':
            return compare(a.prix, b.prix, isAsc);
          default:
            return 0;
        }
      }));
    }
  }

  addExpense(data): void {
    data.position = this.dataLength();
    this.ELEMENT_DATA.push(data);
    this.expensesSubject.next(this.ELEMENT_DATA);
  }

  editExpense(data): void {
    const expenses = this.ELEMENT_DATA.find((e) => e.position === data.position);
    Object.assign(expenses, data);
    this.expensesSubject.next(this.ELEMENT_DATA);
  }

  deleteExpense(index): void {
    const row = this.ELEMENT_DATA.indexOf(index);
    this.ELEMENT_DATA.splice(row, 1);
    this.expensesSubject.next(this.ELEMENT_DATA);
  }

  dataLength(): number {
    return this.ELEMENT_DATA.length;
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
