import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../login/user.model';
import { Animal } from '../models/animal.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  title = 'Animal Directory';

  selectedAnimal;
  user: User
  newUserSubscription: Subscription;

  constructor(private userService: UserService) { 
   this.newUserSubscription =  this.userService.newActiveUser$
   .subscribe((user:User) => {
     this.user = user;
     console.log(user, "in main page")
   });
  }

  ngOnInit(): void {
    this.user = this.userService.getActiveUser();
  }

  onAnimalSelected(animal: Animal){
    this.selectedAnimal = animal;
  }

  setUser(user: User){
    this.user = user;
  }



}
