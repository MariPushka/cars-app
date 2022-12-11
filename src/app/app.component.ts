import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required]
  })

  carsData:any;

  /*carsData = [
    {
      image: "1.png",
      name: "Lamborghini Huracan Spyder",
      gears: "Полный",
      engine: 5.2,
      places: 2
    },
    {
      image: "2.png",
      name: "Chevrolet Corvette",
      gears: "Полный",
      engine: 6.2,
      places: 2
    },

    {
      image: "3.png",
      name: "Ferrari California",
      gears: "Полный",
      engine: 3.9,
      places: 4
    },

    {
      image: "4.png",
      name: "Lamborghini Urus",
      gears: "Полный",
      engine: 4.0,
      places: 5
    },

    {
      image: "52.png",
      name: "Audi R8",
      gears: "Полный",
      engine: 5.2,
      places: 2
    },

    {
      image: "6.png",
      name: "Аренда Chevrolet Camaro",
      gears: "Полный",
      engine: 2.0,
      places: 4
    },

    {
      image: "6.png",
      name: "Аренда Chevrolet Camaro",
      gears: "Полный",
      engine: 2.0,
      places: 4
    }
  ] */

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit(){
    this.appService.getData().subscribe(carsData => this.carsData = carsData);
  }
  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name});
    }
  }


  trans: any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }


  goSubmit() {

    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
              this.priceForm.reset();
            },

            error: (response) => {
              alert(response.error.message);
            }
          }
        );
    }
  }

}




