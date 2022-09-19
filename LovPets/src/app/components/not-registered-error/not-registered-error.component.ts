import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-not-registered-error',
  templateUrl: './not-registered-error.component.html',
  styleUrls: ['./not-registered-error.component.scss'],
})
export class NotRegisteredErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
    }
  ) {}
}
