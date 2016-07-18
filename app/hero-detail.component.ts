/**
 * Created by munk on 18-07-16.
 */
import {Component, Input} from '@angular/core';
import {Hero} from './hero';
@Component({    // Component that shows the details of an hero
    selector: 'my-hero-detail',
    template:` 
        <div *ngIf="hero">
            <h2>{{hero.name}} details!</h2>
            <div><label>id: </label>{{hero.id}}</div>
            <div>
                <label>name: </label>
                <input [(ngModel)]="hero.name" placeholder="name"/>
            </div>
        </div>
    `
})

export class HeroDetailComponent{
    @Input()    // making a hero input
    hero: Hero;
}