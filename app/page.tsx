import Link from 'next/link';
import { ArrowRight, Shield, Zap, Users, Star } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="min-h-screen funkard-hero theme-transition">
      {/* Navbar */}
      <nav className="funkard-navbar border-b theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold funkard-text-primary">
                FUNKARD
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/dashboard"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold funkard-text-primary mb-6">
            FUNKARD
          </h1>
          <p className="text-xl md:text-2xl funkard-text-secondary mb-8 max-w-3xl mx-auto">
            La piattaforma definitiva per il collezionismo di carte. 
            Compra, vendi e scambia con sicurezza e trasparenza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/market"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors glow-yellow"
            >
              Esplora il Market
              <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Pannello Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold funkard-text-primary mb-4">
              Perché scegliere Funkard?
            </h2>
            <p className="text-xl funkard-text-secondary max-w-2xl mx-auto">
              Una piattaforma completa progettata per i collezionisti moderni
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="funkard-card border rounded-2xl p-8 theme-transition glow-yellow">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6">
                <Shield size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold funkard-text-primary mb-4">
                Sicurezza Garantita
              </h3>
              <p className="funkard-text-secondary">
                Transazioni protette e verifica autenticità delle carte. 
                La tua collezione è al sicuro con noi.
              </p>
            </div>
            
            <div className="funkard-card border rounded-2xl p-8 theme-transition glow-yellow">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6">
                <Zap size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold funkard-text-primary mb-4">
                Transazioni Veloci
              </h3>
              <p className="funkard-text-secondary">
                Sistema di pagamento integrato per scambi istantanei. 
                Niente attese, solo risultati.
              </p>
            </div>
            
            <div className="funkard-card border rounded-2xl p-8 theme-transition glow-yellow">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold funkard-text-primary mb-4">
                Community Attiva
              </h3>
              <p className="funkard-text-secondary">
                Connessi con migliaia di collezionisti. 
                Scopri, scambia e cresci insieme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GradeLens Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="funkard-card border rounded-2xl p-12 text-center theme-transition">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Star size={32} className="text-black" />
            </div>
            <h2 className="text-4xl font-bold funkard-text-primary mb-6">
              GradeLens AI
            </h2>
            <p className="text-xl funkard-text-secondary mb-8 max-w-2xl mx-auto">
              La tecnologia di intelligenza artificiale più avanzata per la valutazione 
              automatica delle condizioni delle tue carte.
            </p>
            <Link
              href="/gradelens"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors glow-yellow inline-flex items-center"
            >
              Prova GradeLens
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Support & Community */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold funkard-text-primary mb-6">
            Supporto & Community
          </h2>
          <p className="text-xl funkard-text-secondary mb-8 max-w-2xl mx-auto">
            Il nostro team è sempre pronto ad aiutarti. 
            Unisciti alla community più attiva del collezionismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Contatta Supporto
            </Link>
            <Link
              href="/community"
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Unisciti alla Community
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold funkard-text-primary mb-4">
                FUNKARD
              </h3>
              <p className="funkard-text-secondary">
                La piattaforma definitiva per il collezionismo di carte.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold funkard-text-primary mb-4">Market</h4>
              <ul className="space-y-2">
                <li><Link href="/market" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Esplora</Link></li>
                <li><Link href="/sell" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Vendi</Link></li>
                <li><Link href="/buy" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Compra</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold funkard-text-primary mb-4">Supporto</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Aiuto</Link></li>
                <li><Link href="/contact" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Contatti</Link></li>
                <li><Link href="/faq" className="funkard-text-secondary hover:text-yellow-500 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold funkard-text-primary mb-4">Admin</h4>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Dashboard</Link></li>
                <li><Link href="/admin/support" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Support</Link></li>
                <li><Link href="/admin/stats" className="funkard-text-secondary hover:text-yellow-500 transition-colors">Statistiche</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-8 text-center">
            <p className="funkard-text-muted">
              © 2024 Funkard. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}