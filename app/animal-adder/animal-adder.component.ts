import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animal.service';
import { Animal } from '../models/animal.model';


@Component({
  selector: 'animal-adder',
  templateUrl: './animal-adder.component.html',
  styleUrls: ['./animal-adder.component.css']
})
export class AnimalAdderComponent implements OnInit {

  animal: Animal = {
    name: "",
    className: "", 
    numLegs: 0,
  
    diet:"",
    habitat: "", 
    latinName: ""
    }

    readonly classes =[
      "mammal",
       "bird",
       "reptile",
       "invertebrate ",
       "amphibian",
       "fish"
    ]
  
    readonly diets = [
      "Omnivore", "Herbivore", "Carnivore"
    ]

  constructor(private animalsService: AnimalsService) { }

  ngOnInit(): void {
  }

  submitAnimal(){
  
    if (this.animal.name == '' || this.animal.className == ''){
      console.log('"Animal requires name, class name, and number of legs"');
      return;
    }

    console.log("posting")
    this.animalsService.createAnimal(this.animal).subscribe(
      (response) => {
        alert('New animal created');
      },
      (error) => {
        alert('Animal was not created');
      }
    );
  }


}
