import React from 'react'

const LoginForm = () => {
    return (
        <div className="flex-1 max-w-sm p-6 rounded overflow-hidden shadow-lg bg-gray-50 align-middle justify-center">
            <div className="px-6 py-4">
                <div className="font-bold text-3xl mb-2 text-center">Bienvenido</div>
                <p className="text-gray-700 text-base text-center">
                    Ingrese sus datos para continuar
                </p>

                <div className="w-full max-w-xs">
                    <form className="rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Usuario
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className="flex flex-col items-center justify-between gap-3">
                            <button className="w-full  bg-purple-950 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Ingresar
                            </button>
                            <div className="w-full flex-grow border-t border-gray-400"></div>
                            <button className="w-full text-purple-800 bg-white border-2 border-purple-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Registrarse
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2020 Acme Corp. All rights reserved.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default LoginForm