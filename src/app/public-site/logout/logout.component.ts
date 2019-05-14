import { Component, OnInit } from '@angular/core';
import { AbstractKeycloakService } from './../../services/keycloak/abstract.keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private keycloakService: AbstractKeycloakService, private router: Router) { }

  ngOnInit() {

    this.keycloakService.getKeycloakTokenParsed$().subscribe(token => {
      if (token) {
        
        this.keycloakService.logout(window.location.href.replace('logout', ''));
      }
    });
  }

}
