import { Component, Input, OnInit } from '@angular/core';
import { AnimalsService } from '../animal.service';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: Animal;

  constructor(private animalsService: AnimalsService) {}

  ngOnInit(): void {}

  deleteAnimal(animal: Animal) {
    this.animalsService.delete(animal).subscribe(
      (data) => {
        alert('Animal Removed');
      },
      (error) => {
        alert('error: Animal was not removed');
      }
    );
  }

  updateAnimal() {
    console.log(this.animal);
    this.animalsService.update(this.animal.id, this.animal).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
