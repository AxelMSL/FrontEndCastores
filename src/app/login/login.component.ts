import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  loginObj: any ={
    "usuario":"",
    "contrasenia":""
  }

  http = inject(HttpClient);

  constructor(private router:Router){

  }

  onlogin(){
    this.http.post("http://localhost:3000/login",this.loginObj).subscribe((res:any)=>{
      if (res.length>0) {
        localStorage.setItem("authLoginNombre",res[0].NombreCompleto)
        localStorage.setItem("authLoginId",res[0].id)
        this.router.navigateByUrl("principal")
      } else {
        alert('Usuario o contraseña incorrecto')        
      }
    })
  }

}
