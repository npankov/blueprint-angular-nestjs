import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public expenses = {
    title: '',
    prix: 0,
    category: '',
    position: 0,
    date_expenses: new Date()
  };
  public event: EventEmitter<any> = new EventEmitter();
  public categories = this.data.categories;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    if (this.data.expenses) {
      this.expenses = {...this.expenses, ...this.data.expenses};
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.expenses});
    this.dialogRef.close();
  }
}
