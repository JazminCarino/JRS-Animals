import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { AnimalAdderComponent } from './animal-adder/animal-adder.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalCardComponent,
    AnimalAdderComponent,
    LoginComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
