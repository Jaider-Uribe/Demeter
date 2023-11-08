import React from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import '../css/style.css'
import '../css/landing.css'

function Login() {
  return (
    <div className="">
         <div class="auth-wrapper">
	<div class="auth-content">
		<div class="card">
			<div class="row align-items-center text-center">
				<div class="col-md-12">
					<div class="card-body">
						<img src={logo} alt="" class="img-fluid mb-4"/>
						<div class="input-group mb-3">
							<span class="input-group-text"><i data-feather="mail"><AiOutlineMail/></i></span>
							<input type="email" class="form-control" placeholder="Correo electrónico *"/>
						</div>
						<div class="input-group mb-4">
							<span class="input-group-text"><i data-feather="lock"><AiOutlineLock/></i></span>
							<input type="password" class="form-control" placeholder="Contraseña *"/>
						</div>
						<button class="btn btn-block btn-primary mb-4" onclick="location.href='index.html'">Iniciar sesión</button>
						<p class="mb-0 text-muted">¿Desea restablecer la contrase&ntilde;a? <a href="#" class="f-w-400">Recuperar</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


    </div>
   
  )
}

export default Login