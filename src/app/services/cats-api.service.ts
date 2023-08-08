import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatsApiService {

  url: string = 'https://api.thecatapi.com/v1/'
  API_KEY: string = '&api_key=live_YnL6r4CuORmbi8AuD7KL3stabZwcBDhsSS4obPmi8LV3ClWshCQctEWGJ8Th87cZ'
//Список лінків на картинки
  imgs_url: Subject<string[]> = new Subject<string[]>()

  constructor(private http: HttpClient) {
  }
//Отримання порід
  getBreeds() {
    return this.http.get(this.url + 'breeds')
  }
//Виконання пошуку
  getAllCatsImages(limit: number = 10, breeds?: string) {
    if (!breeds) {
      return this.http.get(this.url + `images/search?limit=${limit}` + this.API_KEY)
    } else if (breeds) {
      return this.http.get(this.url + `images/search?limit=${limit}&?breed_ids=${breeds}` + this.API_KEY)
    } else {
      return
    }
  }
}

