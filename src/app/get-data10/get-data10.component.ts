import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BooksService} from '../Service/books.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-get-data10',
  templateUrl: './get-data10.component.html',
  styleUrls: ['./get-data10.component.css']
})
export class GetData10Component implements OnInit, OnDestroy {

  time = 10000;
  poll = true;
  subj: Subject<any>;
  @ViewChild('my_div') myDiv;
  hello: any;
  value: any;


  constructor(private service: BooksService) {
    this.subj.subscribe(data => {
      this.myDiv.nativeElement.innerHTML = data.divValue;
    });
  }

  ngOnInit(): void {
    this.updateEvery10();
  }

  updateEvery10() {

      setTimeout(function(){ this.service.getData().subscribe( data =>
        {
          this.myDiv.nativeElement.innerHTML = data.divValue;
          this.updateEvery10();
        }
      ); }, this.time);


  }

  ngOnDestroy(){
    this.poll = false;
  }

}
