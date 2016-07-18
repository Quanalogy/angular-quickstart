/**
 * Created by munk on 18-07-16.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeroService }     from './hero.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
            <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        //The providers array tells Angular to create a fresh
        // instance of the HeroService when it creates a new
        // AppComponent. The AppComponent can use that service
        // to get heroes and so can every child component of
        // its component tree.
        HeroService
    ],
    styleUrls: ['app/app.component.css']
})

export class AppComponent{
    title = 'Tour of Heroes';
}

