import {Component, OnInit} from '@angular/core';
import {CatsApiService} from "../../services/cats-api.service";
import {ICatsBreeds} from "../../services/cats.interface";


@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit {

  //Повний Список Порід
  cats_breeds: ICatsBreeds[] = []
  //Остання вибрана порода
  currentBreed: string
  //Вибрані породи
  selected_breeds: ICatsBreeds[] = []
//Кількість фото
  limit: number = 10


  constructor(private catsApiService: CatsApiService) {
  }
//Отримання порід
  ngOnInit(): void {
    this.catsApiService.getBreeds()
      .subscribe(res => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {

            // @ts-ignore
            const innerObject = res[key];

            const buffCatBreed: ICatsBreeds = {
              id: innerObject.id,
              name: innerObject.name
            };

            this.cats_breeds.push(buffCatBreed)
          }
        }

      });

  }
//Змінення массиву з обраними породами
  onChange(e: any) {
    let buff = this.cats_breeds.find((n) => n.id === e)
    for (let i = 0; i < this.selected_breeds.length; i++) {
      if (buff?.name === this.selected_breeds[i].name) return
    }
    if (buff) {
      this.selected_breeds.push(buff)
    }

  }
//Видалення породи з массиву
  deleteBreed(breed: string) {
    let buff_for_delete = this.selected_breeds
    this.selected_breeds = buff_for_delete.filter(n => n.name !== breed)
  }
//Створення лінку для запиту в залежності від обраних категорій
  createUrl() {
    if (this.selected_breeds) {
      let buff_url = this.selected_breeds.map(n => n.id)
      return buff_url.join(',')
    } else return null

  }
//Пошук
  find() {
    this.catsApiService.imgs_url.next( [''])
    if (this.selected_breeds) {

      // @ts-ignore
      this.catsApiService.getAllCatsImages(this.limit, this.createUrl())
        .subscribe(res => {
          // @ts-ignore
          this.catsApiService.imgs_url.next( res.map(u => u.url))
        })
    } else {
      // @ts-ignore
      this.catsApiService.getAllCatsImages(this.limit)
        .subscribe(res => {
          // @ts-ignore
          this.catsApiService.imgs_url.next( res.map(u => u.url))
        })
    }

  }

}
