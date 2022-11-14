import { Component, EventEmitter, OnInit, Output  } from '@angular/core';



@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {
  //reCaptcha
  captcha: string;

  @Output() token: EventEmitter<string> =   new EventEmitter();
  
  constructor() { 
    this.captcha = '';
  }

  ngOnInit(): void {
    this.reset()
  }

  async resolved(captchaResponse: string){
    this.captcha = captchaResponse;
    this.token.emit(this.captcha)
  }

  execute(){
    let btnExecute = document.getElementById('btnExecute')
    btnExecute.click()
  }

  reset(){
    let btnReset = document.getElementById('btnReset')
    btnReset.click()
  }

  getToken(){
    return Promise.resolve(this.captcha)
  }

}
