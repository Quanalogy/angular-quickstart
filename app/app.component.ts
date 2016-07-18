/**
 * Created by munk on 17-07-16.
 */
import { Component } from '@angular/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {OnInit} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <h2>My Heroes = {{counter}}</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
    styles: [`
    .selected {
      background-color: #90C !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
    directives: [HeroDetailComponent],   //Here we are making sure that we can use the
                                        // tag "<my-hero-detail></my-hero-detail>
                                        // Angular needs to know that when new tags appear that
                                        // they are not spelled the wrong way, hence tagging
                                        // them as directives
    providers: [HeroService]            //The providers array tells Angular to create a fresh
                                        // instance of the HeroService when it creates a new
                                        // AppComponent. The AppComponent can use that service
                                        // to get heroes and so can every child component of
                                        // its component tree.

})
export class AppComponent implements OnInit{
    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;
    counter = 0;
    onSelect(hero: Hero) { this.selectedHero = hero; this.counter = this.counter +1;}
    constructor(private heroService: HeroService){

    }
    getHeroes(){
        this.heroService.getHeroes().then(heroes =>         //Since getHeroes is handled in a async way, we need to wait
            this.heroes = heroes                            // our assignment till it is back (the then keyword)
        );
    }
    ngOnInit(){
        this.getHeroes();
    }
}