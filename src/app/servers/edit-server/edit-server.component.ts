import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate} from "./can-deactivate-guard.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;

  constructor(private serversService: ServersService, private router: ActivatedRoute,private route: Router) { }

  ngOnInit() {
    //console.log(this.router.snapshot.queryParams)
    //console.log(this.router.snapshot.fragment)
    this.router.queryParams.subscribe(
      (param: Params)=>{
        this.allowEdit = param['allowEdit'] === '1' ? true : false
      }
    );
    this.router.fragment.subscribe();
    const id1 = +this.router.snapshot.params['id'];
    this.server = this.serversService.getServer(id1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.route.navigate(['../'],{relativeTo: this.router})
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean
  {
    if(!this.allowEdit)
    {
      return true;
    }
    if((this.serverName != this.server.name || this.serverStatus != this.server.status) && !this.changeSaved)
    {
      return confirm("Do you want to discard the changes ?");
    }
    else {
      return true;
    }

  }
}
