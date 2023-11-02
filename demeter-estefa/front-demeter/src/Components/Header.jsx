import React from 'react'
import users from '../img/users.png'

function Header() {
  return (
    <header class="pc-header ">
		<div class="header-wrapper">
			<div class="mr-auto pc-mob-drp">
				<ul class="list-unstyled">
					<li class="dropdown pc-h-item">
                        <h3>Gestión de "Nombre del Modulo"</h3>
					</li>
				</ul>
			</div>
			<div class="ml-auto">
				<ul class="list-unstyled">
					<li class="dropdown pc-h-item">
						<a class="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
							<img src={users} alt="user-image" class="user-avtar"/>
							<span>
								<span class="user-name">Alvaro Perez N</span>
								<span class="user-desc">Administrator</span>
							</span>
						</a>
						<div class="dropdown-menu dropdown-menu-right pc-h-dropdown">				
							<a href="auth-signin.html" class="dropdown-item">
								<i class="material-icons-two-tone">chrome_reader_mode</i>
								<span>Editar perfil</span>
							</a>
                            <a href="auth-signin.html" class="dropdown-item">
								<i class="material-icons-two-tone">lock</i>
								<span>Cambio contraseña</span>
							</a>
                            <br/>
                            <a href="auth-signin.html" class="dropdown-item">
								<i class="material-icons-two-tone">exit_to_app</i>
								<span>Logout</span>
							</a>
						</div>
					</li>
				</ul>
			</div>

		</div>
	</header>
  )
}

export default Header