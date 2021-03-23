import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.servie';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    test : Date = new Date();
    focus: any;
    focus1: any;
    errors: any = [];
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {}

    register(registerForm: any) {
        this.authService.register(registerForm.value).subscribe(
            (result) => {
                console.log('register succes');
                this.router.navigate(['/login']);
            },
            (err: HttpErrorResponse) => {
                this.errors.push(err.error);
            },
            () => {console.log('register done');},
        );
    }
}
