import { Component, OnInit, Directive } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { RecipeAddService } from '../../services/recipeaddServices/recipe-add.service';
import { IngredientService } from '../../services/IngredientServices/ingredient.service';
import { UnitTypeService } from '../../services/unitServices/unit-type.service';
import { SelectModule } from 'ng2-select';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [SelectModule]
})

export class AddRecipeComponent implements OnInit {

  public selectedObject: any;
  public selectedID: string = "";
  // seleted unit types 
  public selectedUnitObject: any;
  public selectedUnitID: string = "";
  //public selectedObject: any ;
  public selectedIngredients: Array<select> = [];
  public selectedUnitTypes: Array<select> = [] ;
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private flag: boolean = false;
  private flag2: boolean = false;
  private flag3: boolean = false;
  public unit: string = "";
  // da tb3 a sora
  URL: string = "";
  src: string = "https://www.cryingoverspiltmilk.co.nz/wp-content/uploads/2015/03/pixabay/b/recipe_1426460443.png";
  x: string = ""
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 250,
    resizeMaxWidth: 250
  };
  // my arries of data 
  private IngerdientsData : Array<any> = [] ;
  private StepsData : Array<any> = [] ;
  private Sections : Array<any> = [] ;
  private RecipesData : Array<any> = [] ;
  private unitTypeData: Array<any> = [] ;

  // my local variables
  private localRecipeIngredients : Array<recipeIngerdient> =[] ;
  private localRecipeIngrdientsAllObjects: Array<any> =[] ;
  private localStepObject: step;
  private localStepArray : Array<step> =[] ;
  private localSectionObject:section ;
  private localSectionArray : Array<section> = [] ; 
  allCalories : number = 0 ;
  private current_user : any = {} ;
  
  

  public selectedIng(value: any): void {
    console.log('Selected value is: ', value);
    this.selectedID = value.id;
    console.log("selected ID", this.selectedID);
    this.ingredientService.getById(this.selectedID).subscribe(ing => {
    this.selectedObject = ing;
    });
   }
   public selectedUnit(value:any): void {
    console.log('Selected unit value is: ', value);
    this.selectedUnitID = value.id;
    console.log("selected unit ID", this.selectedUnitID);
    this.selectedUnitObject = this.unitTypeData.find(x => x._id === this.selectedUnitID) ;
   // console.log("selected unit hah => " ,this.selectedUnitObject ) ;
    this.flag3 = true;
    this.flag2 = true ;

  }
  public typed(value: any): void {
        console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  // upload image
  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.URL = imageResult.file.name;
    console.log("name", this.URL);
  }


 // The FormGroup object as you may remember from the simple form example exposes various API’s for dealing with forms. Here we are creating a new object and setting its type to FormGroup
 private  recipeForm: FormGroup;
 private ingredientForm: FormGroup;
 private stepForm: FormGroup;

  postedComponent: any;
  comIds: Array<string> = [];
  postedRecipe: any;
  myrecipe: recipe;
  myingerdients: Array<ingredients> = [];
  addedIngredients : Array<recipeIngerdient> ;
  // We are passing an instance of the FormBuilder to our constructor
  constructor(private fb: FormBuilder,
    private recipeService: RecipeAddService,
    private ingredientService: IngredientService,
    private unitTypeService: UnitTypeService,
    private localStorage : LocalStorageService) {
    // Here we are using the FormBuilder to build out our form.
  }
  stepFormSubmit() {
    // el logic bta3y hena b2a ya m3lm 
    console.log("inside step ") ;
    console.log("legth : " + this.localStepArray.length +
    "step data: " + this.stepForm.value.step ) ;
      let mystep  = new step(
      this.localStepArray.length + 1,
      this.stepForm.value.step,
      ["5943b7c5be6a19591e7e13a1"],
      ["5916e6c82ae77b36d85d5408"]
    );
    this.localStepArray.push(new step(
      this.localStepArray.length + 1,
      this.stepForm.value.step,
      ["5943b7c5be6a19591e7e13a1"],
      ["5916e6c82ae77b36d85d5408"]
    ));
    console.log("hiiiiiii  => " , this.localStepArray);
  }

  AddSection(){
    let mysection = new section(
      this.localSectionArray.length+1,
      this.localRecipeIngredients,
      this.localStepArray
    ) ;
    this.localSectionArray.push(mysection);
    console.log("my sectionss  " ,this.localSectionArray)
  }

  calculateTotalCalories():Number{
    return 4;
  }

  AddRecipe(){
  let myrecipe =
  new recipe(
  this.src,
  this.recipeForm.value.recipeName,
  this.recipeForm.value.recipeSize,
  Date.now().toString(),
  this.recipeForm.value.recipeVideo,
  this.recipeForm.value.recipeHrs,
  this.allCalories,
  this.recipeForm.value.recipedescription,
  this.current_user._id,
  this.localSectionArray
  ) ;

  this.recipeService.AddRecipe(myrecipe)
  .subscribe(res => {
    console.log("recipe added: " , res); 
  }) ;
}

  ingredientFormSubmit() {
    let oneIngrdient = {
      selectedIngreidient: this.selectedObject.name,
      selectedUnit: this.selectedUnitObject.name,
      quantity: this.ingredientForm.value.quantity
    }
    this.localRecipeIngrdientsAllObjects.push(oneIngrdient) ;
    let ingredient = this.selectedObject;
    let recipeIngre = new recipeIngerdient(
    ingredient._id,
    this.selectedUnitID,
    this.ingredientForm.value.quantity) ;
    this.localRecipeIngredients.push(recipeIngre) ;
    console.log("my ingredient =>  " ,ingredient)
    console.log("hello from local ingredient=>  ", this.localRecipeIngredients) ;
  }

  submitFormRecipe() {
    this.myingerdients.forEach(element => {
      this.ingredientService.AddIngredients(element).subscribe(res => {
        this.postedComponent = res._id;
        this.comIds.push(this.postedComponent);
      })

    });

    console.log("myrecipe", this.myrecipe);
    this.recipeService.AddRecipe(this.myrecipe).subscribe(res => {
      this.postedRecipe = res;
      console.log("posted recipe ", this.postedRecipe);
    });
  }

  removeIngredient(i:number){
    this.localRecipeIngredients.splice(i,1);
  }

  removeStep(i: number) {
  //this.mysteps.splice(i, 1);
  }

  ngOnInit() {
    // get ingredients data 
      this.ingredientService.getAllIngredients().subscribe(ingredients => {
      console.log(ingredients);
      ingredients.forEach(ing => {
        this.selectedIngredients.push(new select(ing._id, ing.name));
        this.IngerdientsData.push(ing);
      });
      console.log("ingredients", this.selectedIngredients);
      this.flag = true;
      this.selectedID = this.selectedIngredients[0].id;
     })
     /**
      * get recipes data
      */
      this.recipeService.getAllRecipes().subscribe(res => {
      res.forEach(recipe => {
      this.RecipesData.push(recipe) ; 
     });
          console.log("recipes: =>  ",res);
          }) ;
        /**
         * get sections 
         */
        this.recipeService.getAllSections()
        .subscribe(res=>{
          res.forEach(section => {
            this.Sections.push(section);
          }) ;
          console.log("sections => " , res) ;
        })
        /**
         * get unit type select 
         */
        this.unitTypeService.getAllUnits()
        .subscribe(res=> { 
          //this.unitTypeData= res;
          res.forEach(unit => {
            this.selectedUnitTypes.push(new select(unit._id , unit.name));
            this.unitTypeData.push(unit) ;
          // console.log("unit=> " , unit) ;
          this.flag3 = true ;
          });
        }) ;

        this.recipeForm = this.fb.group({
          // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
          'recipeName': '',
          'recipedescription':'',
          'recipeSize': 0,
          'recipeHrs': 0,
          'recipeMins': 0,
          'recipeVideo': ''
        })
          this.ingredientForm = this.fb.group({
            'quantity': '',
            'unit': '',
            'ingerdient':''
          })
          this.stepForm = this.fb.group({
          'step':''
        }) ;
        this.current_user = this.localStorage.get("currentUser") ;
        console.log("the user => " ,this.current_user);
        }

  }

class recipe {
  img: string;
  name: string;
  size: number;
  time: string;
  video: string;
  durationTime: number ;
  totalCalories: number ;
  description: string ;
  user: string ;
  sections : Array<section>;
  constructor(
  recipeImage: string,
  recipeName: string,
  recipeSize: number,
  time: string,
  recipeVideo: string,
  durationTime: number,
  totalCalories: number,
  description: string,
  userId: string,
  sections : Array<section>){
  this.img = recipeImage ;
  this.name = recipeName ;
  this.size= recipeSize ;
  this.time = time ; 
  this.video = recipeVideo ;
  this.durationTime = durationTime ;
  this.totalCalories = totalCalories ;
  this.description = description;
  this.user = userId ;
  this.sections = sections
  }
}

class section {
  sectionNumber : number ;
  ingerdients: Array<recipeIngerdient> ;
  steps: Array<step> ;
  constructor(sectionNo: number , ingredients: Array<recipeIngerdient>, steps: Array<step>  ){
    this.sectionNumber = sectionNo ;
    this.ingerdients = ingredients ;
    this.steps = steps; 
  }
}
class step {
  stepNo: number ;
  text: string ;
  ingredientLinks:Array<string> ;
  sectionsLinks: Array<string>;
  constructor( stepNo: number,
  text: string ,
  ingredientLinks:Array<string>,
  sectionsLinks: Array<string>){
    this.stepNo = stepNo ;
    this.text = text ;
    this.ingredientLinks = ingredientLinks ;
    this.sectionsLinks = sectionsLinks ;
  }

}
class select {
  id: string;
  text: string;
  constructor(id: string, text: string) {
    this.id = id;
    this.text = text;
  }
}
class recipeIngerdient {
  ingredient : any;
  unitType: string ;
  qunatity : string ;
  constructor (ingredient: any , unitType: string ,quantity :string) {
    this.ingredient = ingredient ;
    this.unitType = unitType ; 
    this.qunatity = quantity ;
  }
}

class ingredients {
  id: string ;
  name: string;
  calorie: number;
  quantity: number;
  note: string;
  constructor(name: string, calorie: number, note: string, quantity: number ) {
    this.calorie = calorie;
    this.note = note;
    this.quantity = quantity;
    }
}