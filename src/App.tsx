// ✅ CÓDIGO COMPLETO 100% FUNCIONAL COM MENU MOBILE ANIMADO
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

export default function DaviTattooLanding() {
  const [showModal, setShowModal] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  const [showContato, setShowContato] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [nome, setNome] = useState("");
  const [estilos, setEstilos] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const estiloOptions = [
    "Old School",
    "Blackwork",
    "Realismo",
    "Pontilhismo",
    "Geométrico",
    "Minimalista",
    "Colorido",
  ];

  const imagens = [
    "https://i.pinimg.com/736x/e5/81/f6/e581f6d6224cb59e5ba22af30a58fb53.jpg",
    "https://i.pinimg.com/736x/59/92/8c/59928c31b05155e4c35c441d8ce219ed.jpg",
    "https://i.pinimg.com/736x/ae/df/8e/aedf8ee2194bdfd6b7bd777789fc858a.jpg",
    "https://i.pinimg.com/736x/1b/d6/f5/1bd6f59b4f80a032aeaedd2a9bf7ff39.jpg",
    "https://i.pinimg.com/736x/db/6b/96/db6b964afa48814212a79833b4191cf3.jpg",
    "https://i.pinimg.com/736x/85/50/75/8550759f72d5c516e704655945403720.jpg",
    "https://i.pinimg.com/736x/48/55/ba/4855ba2899b66d4990949b483145af3f.jpg",
    "https://i.pinimg.com/736x/53/d1/0d/53d10d629c03d4f470deb0a837ba1dde.jpg",
    "https://i.pinimg.com/736x/67/25/a3/6725a3ae50792c1ccaed6e0de50f2454.jpg",
    "https://i.pinimg.com/736x/1b/76/42/1b76423a22bc71f1541f5406bbf29c7e.jpg",
    "https://i.pinimg.com/736x/3f/02/c1/3f02c1a16a67a2683b300b6954da0a8b.jpg",
    "https://i.pinimg.com/736x/af/c3/f0/afc3f0aa8f6c44ac03a8d65394f98a93.jpg",
    "https://i.pinimg.com/736x/61/54/fd/6154fd9ac8f371a10ac95a77cad1c048.jpg",
    "https://i.pinimg.com/736x/8f/6d/a8/8f6da8e793bb0a1999a4a9e497554b3a.jpg",
    "https://i.pinimg.com/736x/d8/71/f3/d871f37581fa3f710a8079afe4a76632.jpg",
    "https://i.pinimg.com/736x/6f/87/80/6f8780d9675165ef6fa6746df9ce74b3.jpg",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".fade-section").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !(mobileMenuRef.current as any).contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnviar = () => {
    const msg = `Olá, meu nome é ${nome}. Estou interessado(a) nos estilos: ${estilos.join(", ")}.`;
    const url = `https://wa.me/5599999999999?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const toggleEstilo = (estilo: string) => {
    setEstilos((prev) =>
      prev.includes(estilo)
        ? prev.filter((e) => e !== estilo)
        : [...prev, estilo],
    );
  };

  const InfoBar = ({
    children,
    onClose,
  }: {
    children: ReactNode;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-xl border border-white bg-black bg-opacity-80 p-6 sm:p-8">
        {children}
        <div className="mt-6 text-right">
          <Button
            onClick={onClose}
            className="bg-neutral-700 px-6 py-2 text-white hover:bg-neutral-600"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-black via-black/70 to-transparent p-4">
        <h1 className="text-xl font-bold tracking-wide sm:text-2xl">
          DAVI TATTOO
        </h1>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-xl text-white focus:outline-none"
        >
          ☰
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed bottom-0 left-0 right-0 top-[64px] z-40 bg-black/90 p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowPortfolio(true);
                  setMobileMenuOpen(false);
                }}
              >
                Portfólio
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                Agendamento
              </button>
              <button
                onClick={() => {
                  setShowStudio(true);
                  setMobileMenuOpen(false);
                }}
              >
                Estúdio
              </button>
              <button
                onClick={() => {
                  setShowContato(true);
                  setMobileMenuOpen(false);
                }}
              >
                Contato
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="relative flex h-[85vh] items-end justify-start bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/d8/71/f3/d871f37581fa3f710a8079afe4a76632.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 max-w-lg p-6 sm:p-10">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            Arte na pele, identidade na alma
          </h2>
          <p className="mb-6 text-base sm:text-lg">
            Tatuagens únicas com estilo e personalidade.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-300"
            >
              Agendar agora
            </Button>
            <Button
              onClick={() => setShowPortfolio(true)}
              className="bg-neutral-700 px-5 py-2 text-sm text-white hover:bg-neutral-600"
            >
              Ver portfólio
            </Button>
          </div>
        </div>
      </section>

      <section className="fade-section px-4 py-10">
        <h3 className="mb-4 text-xl font-semibold sm:text-2xl">
          Últimas Tatuagens
        </h3>
        <div className="scrollbar-hide flex gap-4 overflow-x-auto">
          {imagens.map((url, i) => (
            <Card
              key={i}
              className="h-[240px] min-w-[160px] cursor-pointer bg-neutral-800 transition-transform duration-300 hover:scale-105 sm:h-[300px] sm:min-w-[200px]"
            >
              <CardContent
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${url}')` }}
              >
                {/* Adicionando fragmento vazio para satisfazer children */}
                <> </>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reaproveitando InfoBars */}
      {showModal && (
        <InfoBar onClose={() => setShowModal(false)}>
          <h3 className="mb-4 text-xl font-bold sm:text-2xl">Agendar Sessão</h3>
          <input
            type="text"
            placeholder="Seu nome"
            className="mb-4 w-full rounded bg-neutral-800 p-2 text-white placeholder-neutral-400"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className="mb-4">
            <p className="mb-2 font-semibold">Estilo(s) desejado(s):</p>
            <div className="grid grid-cols-2 gap-2">
              {estiloOptions.map((estilo) => (
                <button
                  key={estilo}
                  onClick={() => toggleEstilo(estilo)}
                  className={`rounded border p-2 text-sm font-medium ${
                    estilos.includes(estilo)
                      ? "border-white bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white hover:bg-neutral-700"
                  }`}
                >
                  {estilo}
                </button>
              ))}
            </div>
          </div>
          <Button
            onClick={handleEnviar}
            className="bg-white px-6 py-2 font-semibold text-black hover:bg-neutral-300"
          >
            Enviar
          </Button>
        </InfoBar>
      )}

      {showPortfolio && (
        <InfoBar onClose={() => setShowPortfolio(false)}>
          <h3 className="mb-4 text-xl font-bold sm:text-2xl">
            Exemplo de Portfólio
          </h3>
          <div className="space-y-4">
            <img
              src="https://i.pinimg.com/736x/d8/71/f3/d871f37581fa3f710a8079afe4a76632.jpg"
              alt="Tatuagem"
              className="w-full rounded-xl"
            />
            <p className="text-sm text-neutral-300">
              Confira nossos trabalhos mais marcantes no estilo que representa
              sua história.
            </p>
          </div>
        </InfoBar>
      )}

      {showStudio && (
        <InfoBar onClose={() => setShowStudio(false)}>
          <h3 className="mb-4 text-xl font-bold sm:text-2xl">Nosso Estúdio</h3>
          <img
            src="https://i.pinimg.com/736x/5e/eb/7a/5eeb7a13e27304f1de6955e145ddcdd1.jpg"
            alt="Estúdio"
            className="mb-4 w-full rounded-xl"
          />
          <p className="text-sm text-neutral-300">
            Localizado na Rua Criativa, 123 – Bairro Arte, a 5min do centro.
          </p>
        </InfoBar>
      )}

      {showContato && (
        <InfoBar onClose={() => setShowContato(false)}>
          <h3 className="mb-4 text-xl font-bold sm:text-2xl">Contato</h3>
          <div className="mb-4 flex items-center space-x-4">
            <img
              src="https://i.pinimg.com/736x/bd/a9/9c/bda99ccdb2ce7cd3d18d1fc98ff2bec5.jpg"
              alt="Contato"
              className="h-16 w-16 rounded-full border border-white"
            />
            <div>
              <p className="text-lg font-semibold">Daniel Davi</p>
              <p className="text-sm text-neutral-300">
                Especialista em Tatuagens .
              </p>
            </div>
          </div>
          <p className="text-sm">📞 (99) 99999-9999</p>
        </InfoBar>
      )}

      <footer className="mt-10 bg-neutral-900 px-6 py-10 text-xs text-neutral-400 sm:text-sm">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="mb-2">Idioma</p>
            <select className="w-full rounded bg-neutral-800 p-1 text-white">
              <option>Português</option>
              <option>English</option>
            </select>
          </div>
          <div className="space-y-1">
            <p>Atendimento</p>
            <p>Horários</p>
            <p>Política de Agendamento</p>
            <p>FAQ</p>
          </div>
          <div className="space-y-1">
            <p>Sobre o Estúdio</p>
            <p>Equipe</p>
            <p>Localização</p>
          </div>
          <div className="space-y-1">
            <p>Siga nas Redes</p>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>WhatsApp</p>
          </div>
        </div>
        <p className="mt-8 text-center">
          © 2025 DAVI TATTOO. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
