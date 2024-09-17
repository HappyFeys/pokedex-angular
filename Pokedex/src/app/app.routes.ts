import { Routes } from '@angular/router';
import { HomePageComponent } from './Home/page/home-page/home-page.component';
import { DetailsPageComponent } from './Details/page/details-page/details-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'  // Redirection depuis la racine
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'home',
        component: HomePageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/home?page=1'
          }
        ]
    },
    { path: ':id', component: DetailsPageComponent}
];
