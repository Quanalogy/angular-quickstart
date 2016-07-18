/**
 * Created by munk on 18-07-16.
 */
import { provideRouter, RouterConfig }  from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import {HeroDetailComponent} from "./hero-detail.component";

const routes: RouterConfig = [
    {
        path: 'heroes',                 // where is it
        component: HeroesComponent      // what should i do once I'm there
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',            // : indikerer at der skal erstattes noget her, når der navigeres til component
        component: HeroDetailComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];