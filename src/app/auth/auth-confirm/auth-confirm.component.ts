import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Stitch, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-auth-confirm',
  templateUrl: './auth-confirm.component.html',
  styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const confirmationCredentials = {...this.route.snapshot.queryParams};
    // console.log(confirmationCredentials);
    
    Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory)
    .confirmUser(confirmationCredentials.token, confirmationCredentials.tokenId)
    .then((params) => {
      this.router.navigate(['/'])
    })
    .catch((error) => {
    })
  }

}
