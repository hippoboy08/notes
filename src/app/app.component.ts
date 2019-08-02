import { Component, OnInit, OnDestroy } from '@angular/core';

import { Stitch } from "mongodb-stitch-browser-sdk";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Notes';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    Stitch.initializeDefaultAppClient(environment.mongoDbAppID);
    // console.log(Stitch.defaultAppClient.auth.user.profile.email || 'No active user')
  }
}
