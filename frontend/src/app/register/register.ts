import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register  implements OnInit{
  @Output() cancelRegister = new EventEmitter()
  registerForm!: FormGroup;
  maxDate: Date = new Date();
  validationErrors: string[] = [];

  bsConfig = {
    dateInputFormat: 'DD MMMM YYYY',
    containerClass: 'theme-red'
  };

  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn{
        return (control: AbstractControl) => {
      const parent = control.parent;
      if (!parent) return null;

      const matchToControl = parent.get(matchTo);
      if (!matchToControl) return null;

      return control.value === matchToControl.value
        ? null
        : { isMatching: true };
    };
    // return (control: AbstractControl) => {
    //   const parentControls = control?.parent?.controls as { [key: string]: AbstractControl };
    //   return control?.value === parentControls[matchTo]?.value ? null : { isMatching: true };
    //   //return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    // }
  }
  
  register(){
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
      console.log(error)
      this.toaster.error(error.error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }


}
