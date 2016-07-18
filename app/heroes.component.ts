/**
 * Created by munk on 17-07-16.
 */
import { Component, OnInit } from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';
import {HeroDetailComponent} from "./hero-detail.component";

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit{
    // Variables
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    counter = 0;
    error: any;
    // Methods
    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.counter = this.counter +1;
    }
    constructor(
        private router: Router,
        private heroService: HeroService){

    }
    getHeroes(){
        this.heroService.getHeroes().then(heroes =>         //Since getHeroes is handled in a async way, we need to wait
            this.heroes = heroes                            // our assignment till it is back (the then keyword)
        );
    }
    ngOnInit(){
        this.getHeroes();
    }
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    addHero(){
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero){
        this.addingHero = false;
        if(savedHero){
            this.getHeroes();
        }
    }

    deleteHero(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error);
    }
}