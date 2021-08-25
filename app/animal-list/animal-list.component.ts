import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnimalsService } from '../animal.service';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent implements OnInit {
  animals = [];

  @Output() selectAnimal = new EventEmitter()
  

  constructor(private animalsService: AnimalsService) {}

  ngOnInit(): void {
    this.retrieveAnimals();
  }

  retrieveAnimals() {
    this.animalsService.getAnimals().subscribe(
      (data) => {
        console.log(data, 'animals recieved from the service');
        this.animals = data.animals;
      },
      (error) => {
        console.error('ERROR: ', error);
      }
    );
  }

  deleteAnimal(animal: Animal) {
    this.animalsService.delete(animal)
    .subscribe((data) => {
      alert("Animal Removed")
    }, (error) => {
      alert("error: Animal was not removed")
    })
    
   }

   onAnimalClick(animal: Animal){
    this.selectAnimal.emit(animal)
  }
}
