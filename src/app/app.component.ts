import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Satya Phone Book App';
  registerForm: FormGroup;
  registeredUsers: Array<any> = [];
  submitted: boolean = false;
  addUserForm: boolean = true;
  editingUser: boolean = false;
  editedUser: any = {};


  constructor(private fb: FormBuilder) {
    this.registeredUsers = [
      {
        id: '380696',
        firstName: 'Satya',
        lastName: 'Karaka',
        email: 'tester@gmail.com',
        phone: '9874563210',
        company: 'Charter Global Technologies',
        password: 'test',
        confirmPassword: 'test'
      },
      {
        id: '125016',
        firstName: 'Rajiv',
        lastName: 'Kanakala',
        email: 'rajiv@gmail.com',
        phone: '9874563210',
        company: 'Infosys',
        password: 'test',
        confirmPassword: 'test'
      },
      {
        id: '589745',
        firstName: 'Rupa',
        lastName: 'Karaka',
        email: 'rupa@gmail.com',
        phone: '9874563210',
        company: 'TCS',
        password: 'test',
        confirmPassword: 'test'
      }
    ];
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]{10}/g)]],
      company: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  get formValues() {
      return this.registerForm.controls;
  }
  addUser() {
      this.addUserForm = true;
      this.editingUser = false;
      this.editedUser = {};
      this.submitted = false;
      this.registerForm.reset();
  }
  submitForm() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    if (this.addUserForm) {
        let newUser = this.registerForm.value;
        let newId = Math.floor(Math.random() * 1000000);
        newUser.id = newId;
        this.registeredUsers.push(newUser);
    }
    else if (this.editedUser) {
        let userIndex = this.registeredUsers.findIndex(item => item.id === this.editedUser?.id);
        if (userIndex != -1) {
            this.registerForm.value.id = this.editedUser.id;
            this.registeredUsers[userIndex] = this.registerForm.value;
        }
    }
    this.addUserForm = true;
    this.submitted = false;
    this.registerForm.reset();
  }
  editUser(editUser) {
      this.editingUser = true;
      this.addUserForm = false;
      this.editedUser = editUser;
      this.registerForm.patchValue({
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          email: editUser.email,
          phone: editUser.phone,
          company: editUser.company,
          password: editUser.password,
          confirmPassword: editUser.confirmPassword
      });
  }
  deleteUser(user) {
      this.registeredUsers = this.registeredUsers.filter(item => item.id != user.id);
      this.addUserForm = true;
      this.registerForm.reset();
  }
  cancelForm() {
      this.addUserForm = true;
      this.registerForm.reset();
      this.editedUser = {};
  }
}
