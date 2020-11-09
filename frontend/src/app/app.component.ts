import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Expenses } from './Expenses';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  displayedColumns = ['date_expenses', 'title', 'prix', 'tva', 'category', 'actions'];
  dataSource = new ExpenseDataSource(this.dataService);
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  deleteExpense(index): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Supprimer ?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dataService.deleteExpense(index);
      }
    });
  }

  editExpense(expenses: Expenses): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        title: 'Modifier une dépense',
        expenses,
        categories: this.dataService.getCategories(),
      },
    });

    dialogRef.componentInstance.event.subscribe(result => {
      this.dataService.editExpense(result.data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        title: 'Ajouter une dépense',
        categories: this.dataService.getCategories(),
      }
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addExpense(result.data);
      this.dataSource = new ExpenseDataSource(this.dataService);
    });
  }

  getTotalCost(): number {
      return this.dataService.ELEMENT_DATA.map(t => t.prix).reduce((acc, value) => acc + value, 0);
  }

  getTva(data): number {
    const expense = this.dataService.ELEMENT_DATA.find((e) => e.position === data.position);
    return (expense.prix / 100 * 20);
  }
}

export class ExpenseDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  private _sort: MatSort;

  set sort(sort: MatSort) {
    this._sort = sort;
    this._sort.sortChange.subscribe((val) => {
      this.dataService.getData(val);
    });
  }


  connect(): Observable<Expenses[]> {
    return this.dataService.getData();
  }

  disconnect(): void {
  }
}

