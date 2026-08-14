import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthGuard } from './_guards/auth.guard';
import { MemberList } from './members/member-list/member-list';
import { MemberDetail } from './members/member-detail/member-detail';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { AdminGuard } from './_guards/admin.guard';
import { MemberEdit } from './members/member-edit/member-edit';
import { Lists } from './lists/lists';
import { Messages } from './messages/messages';
import { AdminPanel } from './admin/admin-panel/admin-panel';

export const routes: Routes = [
  {path: '', component: Home},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberList},
      {path: 'members/:username', component: MemberDetail, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEdit, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: Lists},
      {path: 'messages', component: Messages},
      {path: 'admin', component: AdminPanel, canActivate: [AdminGuard]},
    ]
  },
  {path: '**', component: Home, pathMatch: 'full'},
];
