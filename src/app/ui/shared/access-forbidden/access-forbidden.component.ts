import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-forbidden',
  templateUrl: './access-forbidden.component.html',
  styleUrls: ['./access-forbidden.component.css']
})
export class AccessForbiddenComponent implements OnInit {

  constructor(private _router: Router) { }
  time = 3

  ngOnInit(): void {
    this.startRedirect()
  }

  startRedirect(){
    window.setInterval(() => {
      this.redirectLogin()
     }, 1000);
  }

  redirectLogin(){
    this.time = this.time - 1;
    if(this.time == -1){
      this._router.navigateByUrl('/auth/login')
    }
  }

}
