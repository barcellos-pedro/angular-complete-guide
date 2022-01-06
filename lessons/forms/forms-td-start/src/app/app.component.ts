import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('form') form: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['Male', 'Female'];
  user: any = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }
  submitted: boolean = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    // Update the entire form
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: `${suggestedName}@gmail.com`
    //   },
    //   secret: 'pet',
    //   questionAnswer: 'freud',
    //   gender: 'Female'
    // });

    // Update only the specific given formControl
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit(form: NgForm): void {
    console.log('Submitted!');
    console.log(this.form);
    console.log('form value \n', this.form.value);
    // console.log(form);

    let { userData: { username, email }, secret, questionAnswer, gender } = this.form.value;

    this.user = {
      username,
      email,
      secret,
      questionAnswer,
      gender
    };

    this.submitted = true;
  }

  resetForm(): void {
    this.form.reset();
    this.user = {};
    this.submitted = false;
  }

}
