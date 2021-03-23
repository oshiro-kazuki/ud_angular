import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.servie';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    test : Date = new Date();
    focus: any;
    focus1: any;
    errors: any = [];
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {}

    login(loginForm: any) {
        this.authService.login(loginForm.value).subscribe(
            (token) => {
                console.log(token);
                this.router.navigate(['/']);
            },
            (err: HttpErrorResponse) => {
                this.errors.push(err.error);
            },
            () => {console.log('login done');},
        )
    }
}
