function Error404() {
    return (
        // Contenedor principal que ocupa toda la altura de la pantalla y centra el contenido
        <main className="grid min-h-screen place-items-center bg-white px-6 py-12 sm:py-16 lg:px-8">
            <div className="text-center">
                {/* Código de error 404 en color rojo */}
                <p className="text-base font-semibold text-[#ff204e]">404</p>
                
                {/* Título principal con diferentes tamaños según el tamaño de la pantalla */}
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Página no encontrada
                </h1>
                
                {/* Mensaje informativo para el usuario */}
                <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
                    Lo sentimos, no pudimos encontrar la página que buscas.
                </p>
                
                {/* Contenedor de botones con enlaces de acción */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {/* Botón para regresar a la página de inicio */}
                    <a 
                        href="/" 
                        className="rounded-md bg-[#ff204e] px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-[#84001a] focus:outline-none focus:ring-2 focus:ring-[#ff204e] focus:ring-offset-2"
                    >
                        Volver al inicio
                    </a>
                    
                    {/* Enlace para contactar con soporte */}
                    <a 
                        href="/contact" 
                        className="text-lg font-semibold text-[#ff204e] hover:text-[#84001a]"
                    >
                        Contactar con soporte <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </main>
    );
}

export default Error404;
