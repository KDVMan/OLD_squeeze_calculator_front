import { Routes } from '@angular/router';
import { TerminalComponent } from '@app/components/terminal/terminal.component';
import { addGuard } from '@app/components/app/app.guard';

export const routes: Routes = [
	{path: 'terminal', component: TerminalComponent, canActivate: [addGuard]},
	{path: '**', redirectTo: '/terminal', pathMatch: 'full'}
];