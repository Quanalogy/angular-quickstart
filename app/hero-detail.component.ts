/**
 * Created by munk on 18-07-16.
 */
import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Hero} from './hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from './hero.service';


@Component({    // Component that shows the details of an hero
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit, OnDestroy{
    // Variables
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    navigated = false;  // true if navigated here

    // Methods
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute){

    }
    goBack(savedHero: Hero = null){
        this.close.emit(savedHero);     //Added or modified a hero
        if (this.navigated){
            window.history.back();
        }
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            if(params['id'] !== undefined){
                let id = +params['id'];
                this.navigated = true;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);
            } else {
                this.navigated = false;
                this.hero = new Hero();
            }
        });
    }
    save(){
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
}