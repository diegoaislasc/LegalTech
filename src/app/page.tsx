import { HeroSection } from "@/components/blocks/hero-section";
import MagicBento from "@/components/MagicBento";

const legalModules = [
  {
    title: 'Consulta de Expedientes',
    description: '¿Es para ti? Ideal para despachos que manejan volúmenes masivos. Automatiza el seguimiento judicial en tiempo real y recibe alertas de "quick wins" procesales.',
    label: 'Para Litigantes',
    image: '/Imagen-ConsultaDeExpedientes.png',
    color: '#A88B5A'
  },
  {
    title: 'Gestión de Contratos',
    description: '¿Tu equipo pierde horas en firmas? Segmentado para Departamentos Legales Corporativos. Centralización inteligente con validez jurídica inmediata.',
    label: 'Para C-Suite',
    image: '/Imagen-GestionContratosYFirmas.png',
    color: '#A88B5A'
  },
  {
    title: 'Consultoría IA Especializada',
    description: '¿Tu flujo actual es lento? Rediseñamos tu forma de trabajar con Playbooks de IA personalizados. Teoría mínima, implementación máxima.',
    label: 'Estratégico',
    image: '/Imagen-ConsultoriaIA.png',
    color: '#A88B5A'
  }
];

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      
      <section id="modules" className="py-32 px-6 relative overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,139,90,0.03),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center lg:text-left">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
              Módulos de Inteligencia Legal
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
              Soluciones diseñadas para resolver dolores específicos de la práctica jurídica moderna, desde la automatización técnica hasta la optimización estratégica.
            </p>
          </div>
          
          <div className="flex justify-center">
            <MagicBento 
              cards={legalModules} 
              enableTilt={true}
              glowColor="168, 139, 90"
              particleCount={15}
            />
          </div>
        </div>
      </section>

      {/* Nueva Sección de Metodología */}
      <section className="py-32 px-6 bg-primary/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-20 text-center">
            Metodología NovaLex
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <span className="text-7xl font-bold text-primary/10 block italic">01</span>
              <h3 className="text-2xl font-bold text-primary italic">Analiza</h3>
              <p className="text-muted-foreground text-lg italic">
                Diagnosticamos tus cuellos de botella operativos y diseñamos un Playbook de automatización a medida.
              </p>
            </div>
            <div className="space-y-6">
              <span className="text-7xl font-bold text-primary/10 block italic">02</span>
              <h3 className="text-2xl font-bold text-primary italic">Implementa</h3>
              <p className="text-muted-foreground text-lg italic">
                Desplegamos agentes de IA y RPA en tu infraestructura actual. Sin fricción, con resultados inmediatos.
              </p>
            </div>
            <div className="space-y-6">
              <span className="text-7xl font-bold text-primary/10 block italic">03</span>
              <h3 className="text-2xl font-bold text-primary italic">Escala</h3>
              <p className="text-muted-foreground text-lg italic">
                Optimizamos el flujo continuamente para maximizar tu ROI y liberar a tu equipo de tareas repetitivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-primary/5 text-center text-sm text-muted-foreground bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>&copy; {new Date().getFullYear()} NOVALEX. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
