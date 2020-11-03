import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Expenses } from '../Expenses';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  displayedColumns = ['date_expenses', 'title', 'prix', 'category', 'delete'];
  dataSource = new PostDataSource(this.dataService);

  deleteExpense(id) {
    this.dataService.deleteExpense(id);
    this.dataSource = new PostDataSource(this.dataService);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: 'Ajouter depense'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addExpense(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Expenses[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}