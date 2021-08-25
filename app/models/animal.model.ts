
export class Animal {

    static readonly CLASSES ={
        MAMMAL: "mammal",
        BIRD: "bird",
        REPTILE: "reptile",
        INVERTEBRATE: "invertebrate",
        AMPHIBIAN: "amphibian",
        FISH: "fish"
    }
    
    static readonly DIETS = {
    OMNIVORE: "omnivore",
    HERBIVORE: "herbivore",
    CARNIVORE: "carnivore"
    }

  id?: any;

  name: string;
  className: string; //mammal, bird, fish...
  numLegs: number;

  diet?: string; 
  habitat?: string; //jungle, desert, forest...
  latinName?: string; //Canis lupus - capital first letter

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
