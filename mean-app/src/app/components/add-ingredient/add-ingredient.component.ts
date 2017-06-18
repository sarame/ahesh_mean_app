import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { IngredientService } from '../../services/IngredientServices/ingredient.service';
import { TagServiceService } from '../../services/tagServices/tag-service.service';
import { UnitTypeService } from '../../services/unitServices/unit-type.service';

import { SelectModule } from 'ng2-select'; //henaa


@Component({
  moduleId: module.id,
  selector: 'app-add-ingredient',
  templateUrl: 'add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css'],
  providers: [SelectModule]
})
export class AddIngredientComponent implements OnInit {

  public tags : any;
  public actualIndexes : Array<string>=[];
  public checkedTagsIndexes:Array<string>=[];

  public selectedID:string ="";

  private ingredient: any;

  public units:Array<select>=[];

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private flag: boolean = false;

  onChange(event , index) {
    var isChecked = event.currentTarget.checked;
    var currenttagName = event.currentTarget.name;  
    var tagID = event.currentTarget.id;  
    var indexToDelete;
    if(isChecked==true)
    {
      this.checkedTagsIndexes.push(currenttagName);
      this.actualIndexes.push(tagID);
    }
    else if(isChecked==false && this.checkedTagsIndexes.indexOf(currenttagName)>-1 ){
      indexToDelete = this.checkedTagsIndexes.indexOf(currenttagName);
      console.log("index to delete",indexToDelete);
      this.checkedTagsIndexes.splice(indexToDelete,1);
      this.actualIndexes.splice(indexToDelete,1);
    }
     console.log("actual tags indexes selected" , this.actualIndexes);
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
    this.selectedID = value.id;
  }

  // public removed(value: any): void {
  //   console.log('Removed value is: ', value);
  //   this.selectedID = this.units[0].id;
  // }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  ingredientForm: FormGroup;

  constructor(private fb: FormBuilder, private ingredientService: IngredientService, private unitService: UnitTypeService, private tagService: TagServiceService) {
  }

  submitForm() {
    this.ingredient = new ingredient(this.ingredientForm.value.name, this.ingredientForm.value.calories,
      this.ingredientForm.value.quantity, "", this.selectedID, this.ingredientForm.value.fats, this.ingredientForm.value.protien,
      this.ingredientForm.value.carbohydrate, this.ingredientForm.value.vitaminA, this.ingredientForm.value.vitaminC,
      this.ingredientForm.value.vitaminD, this.ingredientForm.value.vitaminE, this.ingredientForm.value.iron,
      this.ingredientForm.value.calcium, this.ingredientForm.value.magnesium, this.ingredientForm.value.phosphorus,
      this.ingredientForm.value.potassium, this.ingredientForm.value.zinc, this.ingredientForm.value.fiber,
      ...this.actualIndexes);
      // console.log(this.ingredient);
    this.ingredientService.AddIngredients(this.ingredient).subscribe(ingredient => {
      alert("Successfuly added");
    });

  }

  ngOnInit() {

    this.tagService.getAllTags().subscribe(tags => {
      this.tags=tags;
    })

    this.unitService.getAllUnits().subscribe(units => {
      console.log(units);
      units.forEach(unit => {
        this.units.push(new select(unit._id,unit.name));
      });
        // console.log("units",this.units);      
      this.flag = true;
      this.selectedID = this.units[0].id;
    })

    this.ingredientForm = this.fb.group({
      'name': [null,Validators.compose([ Validators.required , Validators.minLength(3)])],
      'calories': [0, Validators.compose([Validators.required])],
      'quantity': [0, Validators.compose([Validators.required])],
      'fats': 0,
      'protien': 0,
      'carbohydrate': 0,
      'vitaminA': 0,
      'vitaminC': 0,
      'vitaminD': 0,
      'vitaminE': 0,
      'iron': 0,
      'calcium': 0,
      'magnesium': 0,
      'phosphorus': 0,
      'potassium': 0,
      'zinc': 0,
      'fiber': 0,
      'tags': []
    })
  }

  // ngDoCheck() {
  //   console.log("hena");
  //   console.log(this.items);
  // }
}

class select{
  id:string;
  text:string;
  constructor(id:string,text:string){
    this.id=id;
    this.text=text;
  }
}

class ingredient {
  name: String;
  calorie: Number;
  quantity: Number;
  note: String;
  unitType: String;
  fats: Number;
  protein: Number;
  carbohydrate: Number;
  vitaminA: Number;
  vitaminC: Number;
  vitaminD: Number;
  vitaminE: Number;
  iron: Number;
  calcium: Number;
  magnesium: Number;
  phosphorus: Number;
  potassium: Number;
  zinc: Number;
  fiber: Number;
  tags: Array<String>;
  constructor(name: String, calorie: Number, quantity: Number, note: String, unitType: String,
    fats: Number, protein: Number, carbohydrate: Number, vitaminA: Number, vitaminC: Number,
    vitaminD: Number, vitaminE: Number, iron: Number, calcium: Number, magnesium: Number,
    phosphorus: Number, potassium: Number, zinc: Number, fiber: Number, ...tags: Array<String>) {
    this.name = name;
    this.calorie = calorie;
    this.quantity = quantity;
    this.note = note;
    this.unitType = unitType;
    this.fats = fats;
    this.protein = protein;
    this.carbohydrate = carbohydrate;
    this.vitaminA = vitaminA;
    this.vitaminC = vitaminC;
    this.vitaminD = vitaminD;
    this.vitaminE = vitaminE;
    this.iron = iron;
    this.calcium = calcium;
    this.magnesium = magnesium;
    this.phosphorus = phosphorus;
    this.potassium = potassium;
    this.zinc = zinc;
    this.fiber = fiber;
    this.tags = tags;
  }
}
