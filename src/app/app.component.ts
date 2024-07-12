import { Component } from '@angular/core';
import {  ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './youtube.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  videos: any[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  title = 'youtube Castores';
  constructor(private router: Router,private spinner: NgxSpinnerService, private youTubeService: YoutubeService){
  }

  ngOnInit() {
    this.videos = [];
    this.youTubeService
    .getVideosForChanel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(lista => {
    // for (let element of lista) {
    // this.videos.push(element)
    
    // }
    this.videos.push(lista)

  });
    }
}

 
