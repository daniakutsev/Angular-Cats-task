import {Component,  OnInit} from '@angular/core';
import {CatsApiService} from "../../services/cats-api.service";

@Component({
  selector: 'app-image-main-block',
  templateUrl: './image-main-block.component.html',
  styleUrls: ['./image-main-block.component.scss']
})
export class ImageMainBlockComponent implements OnInit {
//Локальний список картинок
  imgs_list: string[] = []


  constructor(
    private catsApiService: CatsApiService) {
  }
//Підписка на список
  ngOnInit(): void {
    this.catsApiService.imgs_url
      .subscribe(res => {
        this.imgs_list.push(...res)
        console.log(this.imgs_list)
      })
  }

}
