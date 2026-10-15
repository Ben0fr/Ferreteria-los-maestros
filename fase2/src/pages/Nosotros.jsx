// Página "Sobre Nosotros": historia, valores y datos de la empresa
const Nosotros = () => {
    // Valores de la ferretería (se muestran como tarjetas)
    const valores = [
        { icono: "🤝", titulo: "Atención Personalizada", texto: "Asesoría técnica para seleccionar los materiales adecuados." },
        { icono: "⚡", titulo: "Entrega Rápida", texto: "Despachos a domicilio y retiros prioritarios en tienda." },
        { icono: "🛡️", titulo: "Garantía Directa", texto: "Todos nuestros productos cuentan con respaldo de fábrica." }
    ]

    return (
        <>
            <div className="hero-ferreteria mb-5">
                <div className="container py-5 text-center">
                    <h1 className="display-4 fw-bold">Sobre Nosotros</h1>
                    <p className="fs-5 text-muted">
                        Más de 20 años acompañando a los maestros y familias en sus proyectos de construcción y hogar.
                    </p>
                </div>
            </div>

            <div className="container mb-5">
                {/* Historia */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-6">
                        <h2>Nuestra Historia</h2>
                        <p>Ferretería Los Maestros nació con el compromiso de ofrecer herramientas de calidad, materiales resistentes y la mejor atención técnica de la zona.</p>
                        <p>Nos enorgullece trabajar de la mano con maestros constructores, hobbistas y empresas locales para llevar cada proyecto al éxito.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <div className="p-5 bg-light rounded border">
                            <span className="fs-1">🏗️ 🏠 🛠️</span>
                            <p className="mt-2 text-muted fw-bold">Compromiso y Calidad Garantizada</p>
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <h2 className="text-center mb-4">Lo que nos define</h2>
                <div className="row text-center mb-5">
                    {valores.map((valor) => (
                        <div className="col-md-4 mb-3" key={valor.titulo}>
                            <div className="card h-100 p-3">
                                <div className="fs-1 text-primary">{valor.icono}</div>
                                <h5 className="card-title mt-2">{valor.titulo}</h5>
                                <p className="card-text text-muted">{valor.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Datos de la empresa */}
                <div className="card bg-light border-0 p-4">
                    <h3 className="mb-4 text-center">Datos de la Empresa</h3>
                    <div className="row">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h5>📍 Dirección</h5>
                            <p className="text-muted mb-0">Av. Los Maestros 1234, Local 5<br />La serena, Chile</p>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h5>📞 Teléfonos</h5>
                            <p className="text-muted mb-0">Mesa Central: +56 2 2345 6789<br />Ventas WhatsApp: +56 9 8765 4321</p>
                        </div>
                        <div className="col-md-4">
                            <h5>⏰ Horarios de Atención</h5>
                            <p className="text-muted mb-0">Lunes a Viernes: 08:00 - 18:30 hrs<br />Sábados: 09:00 - 14:00 hrs</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nosotros
