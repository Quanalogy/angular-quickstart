/**
 * Created by munk on 18-07-16.
 */
import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Hero} from "./hero";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
    private heroesUrl = 'app/heroes';   //Url to web api

    constructor(private http: Http){

    }

    // Getting heroes
    getHeroes(): Promise<Hero[]> {          //Getting all heroes
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError)
    }
    getHero(id: number){        //Getting hero by id
        return this.getHeroes().then(heroes => heroes.find(
                                        hero => hero.id === id));
    }

    // Eror handlers
    private handleError(error: any){
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Post, put, delete, save
    private post(hero: Hero): Promise<Hero>{    //POST = Adding new hero
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero),
                {
                    headers: headers
                })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .delete(url, {headers: headers})
            .toPromise()
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }
}