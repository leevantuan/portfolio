import { Routes } from '@angular/router';
import { PortfolioHostComponent } from './layout/portfolio-host/portfolio-host.component';

export const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: PortfolioHostComponent }],
  },
];
