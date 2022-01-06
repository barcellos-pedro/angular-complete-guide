import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames: string[] = ['Chris', 'Anna'];

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        userData: new FormGroup({
          username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        }),
        gender: new FormControl('female', Validators.required),
        hobbies: new FormArray([])
      });

      // Listening to changes
      this.signupForm.valueChanges.subscribe((value) => {
        console.log('value changed\n', value);
      });

      this.signupForm.statusChanges.subscribe((value) => {
        console.log('status changed\n', value);
      });

      // Setting and patching values
      this.signupForm.setValue({
        userData: {
          username: 'barcellos-pedro',
          email: 'pedro@gmail.com'
        },
        gender: 'male',
        hobbies: []
      });

      this.signupForm.patchValue({
        userData: {
          username: 'some-username'
        }
      });
  }

  onReset(): void {
    this.signupForm.reset();
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  get hobbies(): AbstractControl[] {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  /**
   * Custom validator to check if control value matches some forbidden name
   * @param control 
   * @returns object | null
   */
  forbiddenNames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }
    }

    return null;
  }

  /**
   * Custom async validator to check if control value matches some forbidden email
   * @param control 
   * @returns object | null
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((control.value as string).includes('@test.com')) {
          resolve({ 'emailIsForbidden' : true });
        }
        resolve(null);
      }, 1500);
    });

    return promise;
  }

  onSubmit(): void {
    console.log(this.signupForm);
    console.log(this.signupForm.value);
  }

}
