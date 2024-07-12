import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  RegObj: any = {
    "nombre": "",
    "email": "",
    "usuario": "",
    "contrasenia": "",
    "contraseniaConfi": ""
  }

  http = inject(HttpClient);

  constructor(private router: Router) {

  }

  onRegister() {
    if (this.RegObj.contrasenia == this.RegObj.contraseniaConfi) {
      this.http.post("http://localhost:3000/usuarioNuevo", this.RegObj).subscribe((res: any) => {
        if (!res) {
          this.router.navigateByUrl("login")
          alert('usuario creado por favor inicie seción')
        } else {
          alert('Usuario no creado intente mas tarde')
        }
      })
    } else {
      alert('Contraseñas diferentes')
    }

  }

}
