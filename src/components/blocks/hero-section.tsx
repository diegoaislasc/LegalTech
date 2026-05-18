'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { NeuralBackground } from '@/components/ui/neural-background'
import { NovalexLogo } from '@/components/ui/novalex-logo'
import SplitText from '@/components/SplitText'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight, Scale, ShieldCheck, Cpu } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'

export function HeroSection() {
    return (
        <div className="font-body text-foreground bg-background">
            <HeroHeader />
            <main className="relative">
                <section className="relative overflow-hidden">
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72 min-h-[90vh] flex flex-col justify-center">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:max-w-full">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex justify-center"
                                >
                                    <SplitText
                                        text="Automatiza tu Operación Legal con IA"
                                        className="font-heading mt-8 max-w-4xl text-balance text-5xl font-bold md:text-6xl lg:mt-16 xl:text-7xl text-primary"
                                        delay={40}
                                        duration={0.8}
                                        splitType="chars"
                                        ease="power4.out"
                                        tag="h1"
                                        textAlign="center"
                                        onLetterAnimationComplete={() => {}}
                                    />
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="mt-8 mx-auto max-w-2xl text-balance text-xl text-muted-foreground text-center">
                                    Implementamos soluciones AI-native que eliminan el trabajo manual y potencian la eficiencia de tu equipo.
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-14 rounded-full bg-accent hover:bg-accent/90 px-8 text-lg font-semibold shadow-lg shadow-accent/20 transition-all hover:scale-105">
                                        <Link href="#contact">
                                            <span className="text-nowrap">Agendar Consultoría</span>
                                            <ChevronRight className="ml-2 size-5" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="h-14 rounded-full border-primary/20 px-8 text-lg font-semibold hover:bg-primary/5 transition-all">
                                        <Link href="#solutions">
                                            <span className="text-nowrap">Ver Soluciones</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-primary/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5 opacity-80">
                            <NeuralBackground />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

const menuItems = [
    { name: 'Módulos', href: '#modules' },
    { name: 'Nosotros', href: '#about' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-50 w-full pt-4 px-4">
                <div className={cn(
                    'mx-auto max-w-7xl rounded-full border border-transparent px-6 transition-all duration-300 lg:px-12 py-2', 
                    scrolled ? 'bg-background/80 backdrop-blur-lg border-primary/10 shadow-lg' : 'bg-transparent'
                )}>
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-12">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center group/logo cursor-pointer">
                                <NovalexLogo className="h-14 w-auto" />
                            </Link>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm font-medium">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3">
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-full hover:bg-primary/5 cursor-pointer">
                                    <Link href="#login">Acceso</Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="rounded-full bg-background border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
                                    <Link href="#start">Empezar</Link>
                                </Button>
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Cerrar Menú' : 'Abrir Menú'}
                                className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden text-primary">
                                {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {menuState && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 right-0 mt-4 bg-background border border-primary/10 rounded-3xl p-6 shadow-2xl lg:hidden mx-4">
                            <ul className="space-y-6 text-lg font-medium">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuState(false)}
                                            className="text-muted-foreground hover:text-primary block transition-colors">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex flex-col gap-4">
                                <Button asChild variant="outline" className="rounded-full w-full">
                                    <Link href="#login">Acceso Clientes</Link>
                                </Button>
                                <Button asChild className="rounded-full w-full bg-primary shadow-lg shadow-primary/20">
                                    <Link href="#start">Contactar Ahora</Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <Scale className={cn('size-8 text-accent', className)} strokeWidth={2.5} />
    )
}
