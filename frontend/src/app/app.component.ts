import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Expenses } from './Expenses';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit() {
    (this.dataSource as any).sort = this.sort;
  }

  displayedColumns = ['date_expenses', 'title', 'prix', 'category', 'actions'];
  dataSource = new ExpenseDataSource(this.dataService);

  deleteExpense(index) {
    this.dataService.deleteExpense(index);
    this.dataSource = new ExpenseDataSource(this.dataService);
  }

  editExpense(expenses: Expenses): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        title: 'Test',
        expenses
      }, 
    });

    dialogRef.componentInstance.event.subscribe(result => {
      this.dataService.editExpense(result.data);
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        title: 'Ajouter depense'
      }
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addExpense(result.data);
      this.dataSource = new ExpenseDataSource(this.dataService);
    });
  }
}

export class ExpenseDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Expenses[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}
