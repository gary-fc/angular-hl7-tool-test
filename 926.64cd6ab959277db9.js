"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[926],{42926:function(j,T,s){s.r(T),s.d(T,{PagesModule:function(){return J}});var l=s(43144),d=s(15671),v=s(99291),m=s(69808),c=s(93075),k=s(44809),h=s(17140),f=s(92340),w=s(35226),u=s.n(w),e=s(91891),y=s(29434),Z=s(29633),C=s(77446),q=function(){var i=function(){function o(n,t,a,r){(0,d.Z)(this,o),this._getUseUsecase=n,this._router=t,this._state=a,this.formBuilder=r,this.test=new Date,this.form=r.group({username:["",c.kI.required],name:["",c.kI.required],email:["",c.kI.required,c.kI.email],password:["",c.kI.required]}),this.user=new k.n,this.environment=f.N.brand}return(0,l.Z)(o,[{key:"ngOnInit",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.add("register-page"),t.classList.add("off-canvas-sidebar")}},{key:"ngOnDestroy",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.remove("register-page"),t.classList.remove("off-canvas-sidebar")}},{key:"executeToken",value:function(){this.recaptcha.execute()}},{key:"getToken",value:function(t){u().fire({title:"Please wait",allowOutsideClick:!1,allowEscapeKey:!1}),u().showLoading(),this.recaptchaToken=t,this.register()}},{key:"register",value:function(){var t=this,a=this._state.getValue().user,r=this._state.getValue().groups;localStorage.setItem("guest_auth",JSON.stringify(a)),localStorage.setItem("guest_group",JSON.stringify(r)),this.user.type_user=2,this._getUseUsecase.register({username:this.user.username,name:this.user.name,email:this.user.email,password:this.user.password,type_user:this.user.type_user},this.recaptchaToken).subscribe(function(p){p.success&&(u().close(),t._router.navigateByUrl("auth/login")),u().close()})}}]),o}();return i.\u0275fac=function(n){return new(n||i)(e.Y36(y.f),e.Y36(v.F0),e.Y36(Z.ZM),e.Y36(c.qu))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-register-cmp"]],viewQuery:function(n,t){var a;1&n&&e.Gf(h.w,7),2&n&&e.iGM(a=e.CRH())&&(t.recaptcha=a.first)},decls:104,vars:7,consts:[[1,"wrapper","wrapper-full-page"],["filter-color","black",1,"page-header","register-page","header-filter",2,"background-image","url('./assets/img/register.jpg')","background-size","cover","background-position","top center"],[1,"container"],[1,"row"],[1,"col-md-10","ml-auto","mr-auto"],[1,"card","card-signup"],[1,"card-title","text-center"],[1,"card-body"],[1,"col-md-5","ml-auto"],[1,"info","info-horizontal"],[1,"icon","icon-rose"],[1,"material-icons"],[1,"description"],[1,"info-title"],[1,"icon","icon-primary"],[1,"icon","icon-info"],[1,"col-md-5","mr-auto"],["method","","action","",1,"form",3,"formGroup"],[1,"form-group","has-default"],[1,"input-group"],[1,"input-group-prepend"],[1,"input-group-text"],["type","text","placeholder","First Name...","formControlName","name",1,"form-control",3,"ngModel","ngModelChange"],["type","text","placeholder","Username...","formControlName","username",1,"form-control",3,"ngModel","ngModelChange"],["type","text","placeholder","Email...","formControlName","email",1,"form-control",3,"ngModel","ngModelChange"],["type","password","placeholder","Password...","formControlName","password",1,"form-control",3,"ngModel","ngModelChange"],[3,"token"],[1,"form-check"],["href","#something"],[1,"text-center"],[1,"btn","btn-primary","btn-round","mt-4",3,"click"],[1,"footer"],[1,"pull-left"],["href","https://www.integrationdevelopers.com"],[1,"copyright","pull-right"],["href","https://www.integrationdevelopers.com","target","_blank"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h2",6),e._uU(7,"Register"),e.qZA(),e.TgZ(8,"div",7)(9,"div",3)(10,"div",8)(11,"div",9)(12,"div",10)(13,"i",11),e._uU(14,"timeline"),e.qZA()(),e.TgZ(15,"div",12)(16,"h4",13),e._uU(17,"Marketing"),e.qZA(),e.TgZ(18,"p",12),e._uU(19," We've created the marketing campaign of the website. It was a very interesting collaboration. "),e.qZA()()(),e.TgZ(20,"div",9)(21,"div",14)(22,"i",11),e._uU(23,"code"),e.qZA()(),e.TgZ(24,"div",12)(25,"h4",13),e._uU(26,"Fully Coded in HTML5"),e.qZA(),e.TgZ(27,"p",12),e._uU(28," We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub. "),e.qZA()()(),e.TgZ(29,"div",9)(30,"div",15)(31,"i",11),e._uU(32,"group"),e.qZA()(),e.TgZ(33,"div",12)(34,"h4",13),e._uU(35,"Built Audience"),e.qZA(),e.TgZ(36,"p",12),e._uU(37," There is also a Fully Customizable CMS Admin Dashboard for this product. "),e.qZA()()()(),e.TgZ(38,"div",16)(39,"form",17)(40,"div",18)(41,"div",19)(42,"div",20)(43,"span",21)(44,"i",11),e._uU(45,"face"),e.qZA()()(),e.TgZ(46,"input",22),e.NdJ("ngModelChange",function(r){return t.user.name=r}),e.qZA()()(),e.TgZ(47,"div",18)(48,"div",19)(49,"div",20)(50,"span",21)(51,"i",11),e._uU(52,"person"),e.qZA()()(),e.TgZ(53,"input",23),e.NdJ("ngModelChange",function(r){return t.user.username=r}),e.qZA()()(),e.TgZ(54,"div",18)(55,"div",19)(56,"div",20)(57,"span",21)(58,"i",11),e._uU(59,"mail"),e.qZA()()(),e.TgZ(60,"input",24),e.NdJ("ngModelChange",function(r){return t.user.email=r}),e.qZA()()(),e.TgZ(61,"div",18)(62,"div",19)(63,"div",20)(64,"span",21)(65,"i",11),e._uU(66,"lock_outline"),e.qZA()()(),e.TgZ(67,"input",25),e.NdJ("ngModelChange",function(r){return t.user.password=r}),e.qZA()()(),e.TgZ(68,"div",18)(69,"div",19)(70,"div")(71,"app-recaptcha",26),e.NdJ("token",function(r){return t.getToken(r)}),e.qZA()()()(),e.TgZ(72,"mat-checkbox",27),e._uU(73," I agree to the "),e.TgZ(74,"a",28),e._uU(75,"terms and conditions"),e.qZA(),e._uU(76,". "),e.qZA(),e.TgZ(77,"div",29)(78,"button",30),e.NdJ("click",function(){return t.executeToken()}),e._uU(79,"Get Started"),e.qZA()()()()()()()()()(),e.TgZ(80,"footer",31)(81,"div",2)(82,"nav",32)(83,"ul")(84,"li")(85,"a",33),e._uU(86," Integration Dev "),e.qZA()(),e.TgZ(87,"li")(88,"a",33),e._uU(89," About Us "),e.qZA()(),e.TgZ(90,"li")(91,"a",33),e._uU(92," Blog "),e.qZA()(),e.TgZ(93,"li")(94,"a",33),e._uU(95," Licenses "),e.qZA()()()(),e.TgZ(96,"div",34),e._uU(97),e.TgZ(98,"i",11),e._uU(99,"favorite"),e.qZA(),e._uU(100," by "),e.TgZ(101,"a",35),e._uU(102),e.qZA(),e._uU(103," for a better web. "),e.qZA()()()()()),2&n&&(e.xp6(39),e.Q6J("formGroup",t.form),e.xp6(7),e.Q6J("ngModel",t.user.name),e.xp6(7),e.Q6J("ngModel",t.user.username),e.xp6(7),e.Q6J("ngModel",t.user.email),e.xp6(7),e.Q6J("ngModel",t.user.password),e.xp6(30),e.hij(" \xa9 ",t.test,", made with "),e.xp6(5),e.Oqu(t.environment.made_with))},directives:[c._Y,c.JL,c.sg,c.Fj,c.JJ,c.u,h.w,C.oG],encapsulation:2}),i}(),S=function(){var i=function(){function o(){(0,d.Z)(this,o),this.test=new Date}return(0,l.Z)(o,[{key:"ngOnInit",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.add("pricing-page"),t.classList.add("off-canvas-sidebar")}},{key:"ngOnDestroy",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.remove("pricing-page"),t.classList.remove("off-canvas-sidebar")}}]),o}();return i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-pricing-cmp"]],decls:94,vars:1,consts:[[1,"wrapper","wrapper-full-page"],[1,"page-header","pricing-page","header-filter",2,"background-image","url('./assets/img/bg-pricing.jpg')","background-size","cover","background-position","top center"],[1,"container"],[1,"row"],[1,"col-md-6","ml-auto","mr-auto","text-center"],[1,"title"],[1,"description"],[1,"col-lg-3","col-md-6"],[1,"card","card-pricing","card-plain"],[1,"card-category"],[1,"card-body"],[1,"card-icon","icon-white"],[1,"material-icons"],[1,"card-title"],[1,"card-description"],[1,"card-footer","justify-content-center"],["href","#pablo",1,"btn","btn-round","btn-white"],[1,"card","card-pricing"],[1,"card-icon","icon-rose"],["href","#pablo",1,"btn","btn-round","btn-rose"],[1,"footer"],[1,"pull-left"],["href","https://www.creative-tim.com"],["href","https://creative-tim.com/about-us"],["href","http://blog.creative-tim.com"],["href","https://www.creative-tim.com/license"],[1,"copyright","pull-right"],["href","https://www.creative-tim.com","target","_blank"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),e._uU(6,"Pick the best plan for you"),e.qZA(),e.TgZ(7,"h5",6),e._uU(8,"You have Free Unlimited Updates and Premium Support on each package."),e.qZA()()(),e.TgZ(9,"div",3)(10,"div",7)(11,"div",8)(12,"h6",9),e._uU(13," Freelancer"),e.qZA(),e.TgZ(14,"div",10)(15,"div",11)(16,"i",12),e._uU(17,"weekend"),e.qZA()(),e.TgZ(18,"h3",13),e._uU(19,"Free"),e.qZA(),e.TgZ(20,"p",14),e._uU(21,"This is good if your company size is between 2 and 10 Persons."),e.qZA()(),e.TgZ(22,"div",15)(23,"a",16),e._uU(24,"Choose Plan"),e.qZA()()()(),e.TgZ(25,"div",7)(26,"div",17)(27,"h6",9),e._uU(28," Small Company"),e.qZA(),e.TgZ(29,"div",10)(30,"div",18)(31,"i",12),e._uU(32,"home"),e.qZA()(),e.TgZ(33,"h3",13),e._uU(34,"29$"),e.qZA(),e.TgZ(35,"p",14),e._uU(36,"This is good if your company size is between 2 and 10 Persons."),e.qZA()(),e.TgZ(37,"div",15)(38,"a",19),e._uU(39,"Choose Plan"),e.qZA()()()(),e.TgZ(40,"div",7)(41,"div",8)(42,"h6",9),e._uU(43," Medium Company"),e.qZA(),e.TgZ(44,"div",10)(45,"div",11)(46,"i",12),e._uU(47,"business"),e.qZA()(),e.TgZ(48,"h3",13),e._uU(49,"69$"),e.qZA(),e.TgZ(50,"p",14),e._uU(51,"This is good if your company size is between 11 and 99 Persons."),e.qZA()(),e.TgZ(52,"div",15)(53,"a",16),e._uU(54,"Choose Plan"),e.qZA()()()(),e.TgZ(55,"div",7)(56,"div",8)(57,"h6",9),e._uU(58," Extra Pack"),e.qZA(),e.TgZ(59,"div",10)(60,"div",11)(61,"i",12),e._uU(62,"account_balance"),e.qZA()(),e.TgZ(63,"h3",13),e._uU(64,"159$"),e.qZA(),e.TgZ(65,"p",14),e._uU(66,"This is good if your company size is 99+ Persons."),e.qZA()(),e.TgZ(67,"div",15)(68,"a",16),e._uU(69,"Choose Plan"),e.qZA()()()()()(),e.TgZ(70,"footer",20)(71,"div",2)(72,"nav",21)(73,"ul")(74,"li")(75,"a",22),e._uU(76," Creative Tim "),e.qZA()(),e.TgZ(77,"li")(78,"a",23),e._uU(79," About Us "),e.qZA()(),e.TgZ(80,"li")(81,"a",24),e._uU(82," Blog "),e.qZA()(),e.TgZ(83,"li")(84,"a",25),e._uU(85," Licenses "),e.qZA()()()(),e.TgZ(86,"div",26),e._uU(87),e.TgZ(88,"i",12),e._uU(89,"favorite"),e.qZA(),e._uU(90," by "),e.TgZ(91,"a",27),e._uU(92,"Creative Tim"),e.qZA(),e._uU(93," for a better web. "),e.qZA()()()()()),2&n&&(e.xp6(87),e.hij(" \xa9 ",t.test,", made with "))},encapsulation:2}),i}(),L=s(67322),M=s(77531),N=function(){var i=function(){function o(){(0,d.Z)(this,o),this.test=new Date,this.environment=f.N.brand}return(0,l.Z)(o,[{key:"ngOnInit",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.add("lock-page"),t.classList.add("off-canvas-sidebar");var a=document.getElementsByClassName("card")[0];setTimeout(function(){a.classList.remove("card-hidden")},700)}},{key:"ngOnDestroy",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.remove("lock-page"),t.classList.remove("off-canvas-sidebar")}}]),o}();return i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-lock-cmp"]],decls:43,vars:5,consts:[[1,"wrapper","wrapper-full-page"],[1,"page-header","lock-page","header-filter",2,"background-image","url('./assets/img/lock.jpg')","background-size","cover","background-position","top center"],[1,"container"],[1,"row"],[1,"col-md-4","ml-auto","mr-auto"],[1,"card","card-profile","text-center","card-hidden"],[1,"card-header"],[1,"card-avatar"],["href","#pablo"],["src","./assets/img/faces/avatar.jpg",1,"img"],[1,"card-body"],[1,"card-title"],[1,"example-full-width"],["matInput","","placeholder","Enter Password","type","password"],[1,"card-footer","justify-content-center"],["href","#pablo",1,"btn","btn-rose","btn-round"],[1,"footer"],[1,"pull-left"],["href","https://www.integrationdevelopers.com"],[1,"copyright","pull-right"],[1,"material-icons"],["href","https://www.integrationdevelopers.com","target","_blank"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"a",8),e._UZ(9,"img",9),e.qZA()()(),e.TgZ(10,"div",10)(11,"h4",11),e._uU(12,"Tania Andrew"),e.qZA(),e.TgZ(13,"mat-form-field",12),e._UZ(14,"input",13),e.qZA()(),e.TgZ(15,"div",14)(16,"a",15),e._uU(17,"Unlock"),e.qZA()()()()()()(),e.TgZ(18,"footer",16)(19,"div",2)(20,"nav",17)(21,"ul")(22,"li")(23,"a",18),e._uU(24," Integration Developers "),e.qZA()(),e.TgZ(25,"li")(26,"a",18),e._uU(27," About Us "),e.qZA()(),e.TgZ(28,"li")(29,"a",18),e._uU(30," Blog "),e.qZA()(),e.TgZ(31,"li")(32,"a",18),e._uU(33," Licenses "),e.qZA()()()(),e.TgZ(34,"div",19),e._uU(35),e.ALo(36,"date"),e.TgZ(37,"i",20),e._uU(38,"favorite"),e.qZA(),e._uU(39," by "),e.TgZ(40,"a",21),e._uU(41),e.qZA(),e._uU(42," for a better web. "),e.qZA()()()()),2&n&&(e.xp6(35),e.hij(" \xa9 ",e.xi3(36,2,t.test,"yyyy"),", made with "),e.xp6(6),e.Oqu(t.environment.made_with))},directives:[L.KE,M.Nt],pipes:[m.uU],encapsulation:2}),i}(),_=s(77579),x=s(50727),U=s(82722),b=s(22160),A=function(){var i=function(){function o(n,t){(0,d.Z)(this,o),this._getUserUseCase=n,this._cookie=t,this._TYPE_USER="HL7_TYPE_USER",this._USER_SESSION="auth",this._USER_TOKEN="HL7_USER_TOKEN",this._USER_ID="HL7_USER_ID",this._unsubscribeSubject=new _.x,this._logged=new _.x}return(0,l.Z)(o,[{key:"login",value:function(t,a,r){var g=this;return this._getUserUseCase.login({email:t,password:a},r).pipe((0,U.R)(this._unsubscribeSubject)).subscribe(function(R){g._setUserLogged(R)},function(){g.logout()}),this._logged.asObservable()}},{key:"logout",value:function(){this._userSession=void 0,this._clearSessionStorageValue(),this._logged.next({success:!1,typeUser:""})}},{key:"_setUserLogged",value:function(t){this._userSession=t,this._setSessionStorageValue(),this._logged.next({success:!0,typeUser:t.type_user.toString()})}},{key:"_setSessionStorageValue",value:function(){this._clearSessionStorageValue(),localStorage.setItem(this._USER_SESSION,JSON.stringify(this._userSession));var t=JSON.parse(localStorage.getItem("auth"));this._cookie.delete("csrftoken"),this._cookie.set("csrftoken",t.csrf_token,null,"/")}},{key:"_clearSessionStorageValue",value:function(){}}]),o}();return i.\u0275fac=function(n){return new(n||i)(e.LFG(y.f),e.LFG(b.N))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac}),i}();function E(i,o){1&i&&(e.TgZ(0,"p",27),e._uU(1," Invalid Username or Password"),e.qZA())}var I=[{path:"",children:[{path:"login",component:function(){var i=function(){function o(n,t,a,r,g,p){(0,d.Z)(this,o),this._sessionService=n,this.element=t,this._store=a,this._state=r,this._router=g,this._cookie=p,this.test=new Date,this.email="",this.password="",this._unsubscribeSubject=new _.x,this.nativeElement=t.nativeElement,this._subscription=new x.w0,this.environment=f.N.brand,this.incorrectCredentials=!1,this.sidebarVisible=!1}return(0,l.Z)(o,[{key:"ngAfterViewInit",value:function(){this._initialize()}},{key:"ngOnDestroy",value:function(){this._finalize()}},{key:"_initialize",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.add("login-page"),t.classList.add("off-canvas-sidebar"),document.getElementsByClassName("card-login")[0].classList.remove("card-hidden")}},{key:"_finalize",value:function(){var t=document.getElementsByTagName("body")[0];t.classList.remove("login-page"),t.classList.remove("off-canvas-sidebar"),this._subscription.unsubscribe()}},{key:"executeToken",value:function(){this.recaptcha.execute()}},{key:"getToken",value:function(t){u().fire({title:"Please wait",allowOutsideClick:!1,allowEscapeKey:!1}),u().showLoading(),this.recaptchaToken=t,this._login()}},{key:"_login",value:function(){var t=this;this._sessionService.login(this.email,this.password,this.recaptchaToken).pipe((0,U.R)(this._unsubscribeSubject)).subscribe(function(a){a.success&&(u().close(),t._router.navigate("1"===a.typeUser?["/admin/messages/upload-file"]:["/"])),u().close(),t._incorrectCredentials()})}},{key:"_incorrectCredentials",value:function(){this.recaptcha.reset(),this.email="",this.password="",this.incorrectCredentials=!0}}]),o}();return i.\u0275fac=function(n){return new(n||i)(e.Y36(A),e.Y36(e.SBq),e.Y36(Z.yh),e.Y36(Z.ZM),e.Y36(v.F0),e.Y36(b.N))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-login-cmp"]],viewQuery:function(n,t){var a;1&n&&e.Gf(h.w,7),2&n&&e.iGM(a=e.CRH())&&(t.recaptcha=a.first)},decls:58,vars:8,consts:[[1,"wrapper","wrapper-full-page"],["filter-color","black",1,"page-header","login-page","header-filter",2,"background-image","url('./assets/img/login.jpg')","background-size","cover","background-position","top center"],[1,"container"],[1,"row"],[1,"col-lg-4","col-md-6","col-sm-6","ml-auto","mr-auto"],["method","","action","",1,"form"],[1,"card","card-login","card-hidden"],[1,"card-header","card-header-warning","text-center"],[1,"card-title"],[1,"card-body"],[1,"card-description","text-center"],["class","card-description text-center text-danger",4,"ngIf"],[1,"bmd-form-group"],[1,"input-group"],[1,"input-group-prepend"],[1,"input-group-text"],[1,"material-icons"],["type","email","placeholder","Email...",1,"form-control",3,"ngModel","ngModelChange"],["type","password","placeholder","Password...",1,"form-control",3,"ngModel","ngModelChange"],[1,"card-footer","justify-content-center"],[1,"btn","btn-rose","btn-link","btn-lg",3,"keyup.enter","click"],[1,"footer"],[1,"pull-left"],["href","https://www.integrationdevelopers.com"],[1,"copyright","pull-right"],["href","https://www.integrationdevelopers.com","target","_blank"],[3,"token"],[1,"card-description","text-center","text-danger"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"form",5)(6,"div",6)(7,"div",7)(8,"h4",8),e._uU(9,"Log in"),e.qZA()(),e.TgZ(10,"div",9)(11,"p",10),e._uU(12,"Or Be Classical"),e.qZA(),e.YNc(13,E,2,0,"p",11),e.TgZ(14,"span",12)(15,"div",13)(16,"div",14)(17,"span",15)(18,"i",16),e._uU(19,"email"),e.qZA()()(),e.TgZ(20,"input",17),e.NdJ("ngModelChange",function(r){return t.email=r}),e.qZA()()(),e.TgZ(21,"span",12)(22,"div",13)(23,"div",14)(24,"span",15)(25,"i",16),e._uU(26,"lock_outline"),e.qZA()()(),e.TgZ(27,"input",18),e.NdJ("ngModelChange",function(r){return t.password=r}),e.qZA()()()(),e.TgZ(28,"div",19)(29,"button",20),e.NdJ("keyup.enter",function(){return t.executeToken()})("click",function(){return t.executeToken()}),e._uU(30," Lets Go "),e.qZA()()()()()()(),e.TgZ(31,"footer",21)(32,"div",2)(33,"nav",22)(34,"ul")(35,"li")(36,"a",23),e._uU(37," Integration Developers "),e.qZA()(),e.TgZ(38,"li")(39,"a",23),e._uU(40," About Us "),e.qZA()(),e.TgZ(41,"li")(42,"a",23),e._uU(43," Blog "),e.qZA()(),e.TgZ(44,"li")(45,"a",23),e._uU(46," Licenses "),e.qZA()()()(),e.TgZ(47,"div",24),e._uU(48),e.ALo(49,"date"),e.TgZ(50,"i",16),e._uU(51,"favorite"),e.qZA(),e._uU(52," by "),e.TgZ(53,"a",25),e._uU(54),e.qZA(),e._uU(55," for a better web. "),e.qZA()()()()(),e.TgZ(56,"div")(57,"app-recaptcha",26),e.NdJ("token",function(r){return t.getToken(r)}),e.qZA()()),2&n&&(e.xp6(13),e.Q6J("ngIf",t.incorrectCredentials),e.xp6(7),e.Q6J("ngModel",t.email),e.xp6(7),e.Q6J("ngModel",t.password),e.xp6(21),e.hij(" \xa9 ",e.xi3(49,5,t.test,"yyyy"),", made with "),e.xp6(6),e.Oqu(t.environment.made_with))},directives:[c._Y,c.JL,c.F,m.O5,c.Fj,c.JJ,c.On,h.w],pipes:[m.uU],encapsulation:2}),i}()},{path:"lock",component:N},{path:"register",component:q},{path:"pricing",component:S}]}],P=s(39152),J=function(){var i=(0,l.Z)(function o(){(0,d.Z)(this,o)});return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[A],imports:[[m.ez,v.Bz.forChild(I),c.u5,P.m,c.UX]]}),i}()}}]);