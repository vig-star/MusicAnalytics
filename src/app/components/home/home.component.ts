import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user = {'email':'nathan.wang2323@gmail.com'}
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.get().subscribe((data: any) => {
      console.log(data);
      this.user = data;
    });
  }

  logout() {
    const url = 'https://www.spotify.com/logout/'
    let left = (screen.width/2)-(700/2);
    let top = (screen.height/2)-(700/2);
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=700,top='+top+',left='+left);
    setTimeout(() => spotifyLogoutWindow.close(), 2000)
  }
}
