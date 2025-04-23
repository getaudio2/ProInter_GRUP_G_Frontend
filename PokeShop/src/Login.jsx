function Login() {
    const submitLogin = function(){
        
    }

    return(
        <>
            <p>Login</p>
            <form action="">
                <p>Usuario:</p>
                <input type="text" />
                <p>Contraseña:</p>
                <input type="password" />
                <button onSubmit={()=>submitLogin()}>Iniciar sesión</button>
            </form>
        </>
    )
}

export default Login