import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> | undefined

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getLoggedInUser();
  }

  editProfile() {

  }

  logout() {

  }
}
