const NotFound = () => {
  return (
    <div className="pt-12 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="h-1 w-32 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-gray-300">
            Esta ruta está más perdida que Bitcoin en 2010
          </h2>
          <p className="text-lg text-gray-400">
            Parece que esta página hizo un rug pull
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-700 space-y-4">
          <p className="text-gray-400">
            <span className="font-semibold text-gray-300">Error:</span> Liquidación total de la URL
          </p>
          <p className="text-sm text-gray-500">
            La página que buscas se fue to the moon y no volvió
          </p>
        </div>

        <a 
          href="/" 
          className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Volver al exchange
        </a>

        <p className="text-sm text-gray-500 pt-4">
          Consejo: HODL tu paciencia y regresa al inicio
        </p>
      </div>
    </div>
  )
}

export default NotFound