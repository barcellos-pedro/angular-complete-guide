import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  form: FormGroup;
  statusList: string[] = ['Stable', 'Critical', 'Finished'];

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      project: new FormGroup({
        name: new FormControl(null, [Validators.required, this.forbiddenProjectName]),
        status: new FormControl('Stable', Validators.required),
      }),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  forbiddenProjectName(control: FormControl): { [key: string]: boolean } {
    if (control.value == 'test' || control.value == 'Test') {
      return { 'nameIsForbidden': true }
    }

    return null;
  }

  asyncForbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test' || control.value == 'Test') {
          resolve({ 'nameIsForbidden': true });
        }

        resolve(null);
      }, 1500);
    });

    return promise;
  }

  hasProp(control: string, prop: string): boolean {
    return this.form.get(control)[prop];
  }

  hasError(control: string, error: string): boolean {
    return this.form.get(control).errors[error];
  }

  onSubmit(): void {
    let { email, project: { name, status } } = this.form.value;
    alert(`${name} with status ${status.toLowerCase()} submitted by ${email}.`);
  }

  onReset(): void {
    this.form.reset();
  }

}
