import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { Subject, takeUntil } from 'rxjs';
import { YoutubeService } from '../youtube.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxSpinnerModule,FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {

  id: any = localStorage.getItem("authLoginId")
  Nombre: any = localStorage.getItem("authLoginNombre")


  videos: any[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  title = 'youtube Castores';
  constructor(private router: Router, private spinner: NgxSpinnerService, private youTubeService: YoutubeService) {
  }

  ngOnInit() {
    // this.spinner.show()
    // setTimeout(() => {
    //   this.spinner.hide()
    // }, 3000)
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UCdulIs-x_xrRd1ezwJZR9ww', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        const iterableArray = Object.entries(lista);

        for (const [key, value] of iterableArray) {
          if (key=='items') {
            for (const iterator of value) {
              this.videos.push(iterator)              
            }
            
          }
        }
      });
  }

  logOut() {
    localStorage.setItem("authLoginNombre", '')
    localStorage.setItem("authLoginId", '')
    this.router.navigateByUrl('login')
  }

}
