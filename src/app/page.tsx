import { HeroSection } from "@/components/blocks/hero-section";
import MagicBento from "@/components/MagicBento";

const legalModules = [
  {
    title: 'Consulta de Expedientes',
    description: 'Automatización y seguimiento inteligente de procesos judiciales en tiempo real. Obtén actualizaciones instantáneas sin intervención manual.',
    label: 'Módulo A',
    image: '/Imagen-ConsultaDeExpedientes.png'
  },
  {
    title: 'Gestión de Contratos y Firmas',
    description: 'Centralización y firma digital segura para todo tipo de documentos legales. Agiliza el cierre de acuerdos con validez jurídica.',
    label: 'Módulo B',
    image: '/Imagen-GestionContratosYFirmas.png'
  },
  {
    title: 'Consultoría de IA para flujos legales',
    description: 'Optimización de procesos internos mediante inteligencia artificial personalizada. Rediseñamos tu forma de trabajar.',
    label: 'Módulo C',
    image: '/Imagen-ConsultoriaIA.png'
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
              Nuestras soluciones AI-native están diseñadas para cubrir cada aspecto crítico de la práctica jurídica moderna, combinando precisión técnica con agilidad digital.
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
