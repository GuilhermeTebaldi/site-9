import { useState } from "react";
import { motion } from "framer-motion";

// Tipagem para TypeScript
interface Gasto {
  nome: string;
  valor: number;
}

const gastosFixosBase: Gasto[] = [
  { nome: "Luz", valor: 120 },
  { nome: "Internet Celular 1", valor: 10 },
  { nome: "Internet Celular 2", valor: 10 },
  { nome: "Gás (média mensal)", valor: 30 },
  { nome: "WiFi", valor: 45 },
  { nome: "Água", valor: 40 },
  { nome: "Aluguel", valor: 450 },
  { nome: "Mercado", valor: 200 },
];

export default function App() {
  const [salario, setSalario] = useState<number>(0);
  const [gastosFixos, setGastosFixos] = useState<Gasto[]>(gastosFixosBase);
  const [gastosExtras, setGastosExtras] = useState<Gasto[]>([]);
  const [novoNome, setNovoNome] = useState<string>("");
  const [novoValor, setNovoValor] = useState<string>("");

  const todosGastos = [...gastosFixos, ...gastosExtras];
  const totalGastos = todosGastos.reduce((acc, item) => acc + item.valor, 0);
  const saldoRestante = salario - totalGastos;
  const cotacaoEuroParaReal = 5.8;
  const saldoEmReais = saldoRestante * cotacaoEuroParaReal;

  const adicionarGasto = () => {
    if (novoNome.trim() && !isNaN(parseFloat(novoValor))) {
      setGastosExtras([
        ...gastosExtras,
        { nome: novoNome, valor: parseFloat(novoValor) },
      ]);
      setNovoNome("");
      setNovoValor("");
    }
  };

  const editarGastoFixo = (idx: number, novoValor: string) => {
    const atualizados = [...gastosFixos];
    atualizados[idx].valor = parseFloat(novoValor);
    setGastosFixos(atualizados);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-700">
          Orçamento Mensal
        </h1>

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Salário (€):
        </label>
        <input
          type="number"
          value={salario}
          onChange={(e) => setSalario(Number(e.target.value))}
          className="mb-6 w-full rounded-xl border border-blue-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite seu salário"
        />

        <h2 className="mb-3 text-lg font-semibold text-gray-700">
          Gastos Fixos
        </h2>
        <ul className="mb-4 space-y-2">
          {gastosFixos.map((gasto, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between gap-2 text-gray-600"
            >
              <span>{gasto.nome}</span>
              <input
                type="number"
                value={gasto.valor}
                onChange={(e) => editarGastoFixo(idx, e.target.value)}
                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-right"
              />
            </li>
          ))}
        </ul>

        {gastosExtras.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-lg font-semibold text-gray-700">
              Gastos Adicionados
            </h2>
            <ul className="mb-4 space-y-1">
              {gastosExtras.map((gasto, idx) => (
                <li
                  key={idx}
                  className="flex justify-between py-1 text-gray-600"
                >
                  <span>{gasto.nome}</span>
                  <span>€ {gasto.valor.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Novo gasto"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="€"
            value={novoValor}
            onChange={(e) => setNovoValor(e.target.value)}
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={adicionarGasto}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
          >
            +
          </button>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold text-gray-700">
            <span>Total de Gastos:</span>
            <span>€ {totalGastos.toFixed(2)}</span>
          </div>
          <div
            className={`mt-2 flex justify-between text-lg font-bold ${saldoRestante < 0 ? "text-red-600" : "text-green-600"}`}
          >
            <span>Saldo Restante:</span>
            <div className="text-right">
              <div>€ {saldoRestante.toFixed(2)}</div>
              <div className="text-sm text-gray-500">
                R$ {saldoEmReais.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
