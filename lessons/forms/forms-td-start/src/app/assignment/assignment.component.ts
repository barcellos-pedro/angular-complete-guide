import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  submitted: boolean = false;
  data: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.submitted = true;

      let { email, subscription, password } = this.form.value;

      this.data = {
        email,
        subscription,
        password
      };
  }

  hasError(control): boolean {
    return !control.valid && control.touched;
  }

  resetForm(): void {
    this.form.reset();
    this.submitted = false;
  }

}
