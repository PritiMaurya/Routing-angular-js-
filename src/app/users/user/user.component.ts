import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy{
  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user ={
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    this.paramSubscription = this.route.params.subscribe(
      ()=>{
          this.user.id = this.route.snapshot.params['id'],
          this.user.name= this.route.snapshot.params['name']
      }
    )
  }

  ngOnDestroy()
  {
    this.paramSubscription.unsubscribe();
  }

}
