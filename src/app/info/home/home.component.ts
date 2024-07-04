import { Component, OnInit } from '@angular/core';
import { PrivateMessage } from 'src/app/model/private-message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.getPrivateMessage().subscribe((data: PrivateMessage) => {
        console.log('Received private message response:', data);
        this.userName = data.message;
      });
  }
}
