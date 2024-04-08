'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Fibonacci() {
  const [numeroN, setNumeroN] = useState<number>(0);
  const [sequencia, setSequencia] = useState<number[]>([]);
  const [pertence, setPertence] = useState<boolean>(false);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value, 10);
    if (!isNaN(valor)) {
      setNumeroN(valor);
    }
  };

  const calcularFibonacci = (n: number) => {
    let fibonacciSequence: number[] = [1, 1];
    for (let i = 2; i < n; i++) {
      if (fibonacciSequence[i - 1] % 2 === 0) {
        const nextNum = fibonacciSequence[i - 1] + fibonacciSequence[i - 2] + fibonacciSequence[i - 3];
        fibonacciSequence.push(nextNum);
      } else {
        const nextNum = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
        fibonacciSequence.push(nextNum);
      }
    }
    setSequencia(fibonacciSequence);
    setPertence(fibonacciSequence.includes(numeroN));
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow w-96 flex flex-col gap-2">
        <h1 className="text-xl font-bold mb-4">Sequência de Fibonacci</h1>
        <p>Digite um número N:</p>
        <Input
          type="number"
          value={numeroN || ''}
          onChange={handleInputChange}
          placeholder="Ex: 7"
          min={0}
        />
        {erro && <p className="text-red-500 text-xs">{erro}</p>}
        <Button
          variant="default"
          className="w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            if (numeroN > 0) {
              setSequencia([]);
              setLoading(true);
              calcularFibonacci(numeroN);
            } else {
              setErro("Por favor, insira um número válido.");
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            'Calcular'
          )}
        </Button>
        <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
          Limpar
        </Button>
        {!loading && sequencia.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p>Os {numeroN} primeiros números da sequência de Fibonacci são:</p>
            <ul className="grid grid-cols-6 gap-3">
              {sequencia.map((numero, index) => (
                <li className="py-2 px-4 bg-neutral-100 flex items-center justify-center" key={index}>
                  {numero}
                </li>
              ))}
            </ul>
            <p>
              O número {numeroN} {pertence ? 'faz' : 'não faz'} parte da sequência de Fibonacci.
            </p>
          </div>
        ) : (
          <></>
        )}
        <Link href={'/'} className='mt-4 hover:underline'>Voltar</Link>
      </div>
    </div>
  );
}
