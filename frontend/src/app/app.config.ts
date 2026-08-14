import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { App } from './app';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './_modules/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    // регистрация модулей, как импорт
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      NgxSpinnerModule
    ),

    // HTTP_INTERCEPTORS
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  
};


// @NgModule({
//   declarations: [
//     AppComponent,
//     NavComponent,
//     HomeComponent,
//     RegisterComponent,
//     MemberListComponent,
//     MemberDetailComponent,
//     ListsComponent,
//     MessagesComponent,
//     MemberCardComponent,
//     MemberEditComponent,
//     PhotoEditorComponent,
//     MemberMesagesComponent,
//     AdminPanelComponent,
//     HasRoleDirective,
//     UserManagementComponent,
//     PhotoManagementComponent,
//     RolesModalComponent,
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     ReactiveFormsModule,
//     SharedModule,
//     NgxSpinnerModule
//   ],
//   providers: [
//     {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
//     {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }