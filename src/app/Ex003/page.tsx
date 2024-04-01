'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

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

  const calcularFibonacci = () => {
    if (!numeroN) {
      setErro('Por favor, digite um número.');
      return;
    } else {
      setErro('');
      setErro('');
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                toast("Concluído com sucesso");
            }, 1000);
    }

    if (!numeroN) return;

    const novaSequencia: number[] = [];
    let a = 1;
    let b = 1;
    for (let i = 0; i < numeroN; i++) {
      novaSequencia.push(a);
      const proximo = a + b;
      a = b;
      b = proximo;
    }

    let encontrado = false;
    while (a <= numeroN) {
      if (a === numeroN) {
        encontrado = true;
        break;
      }
      const proximo = a + b;
      a = b;
      b = proximo;
    }

    setSequencia(novaSequencia);
    setPertence(encontrado);
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <div className='bg-white p-6 rounded shadow w-96 flex flex-col gap-2'>
        <h1 className="text-xl font-bold mb-4">Sequência de Fibonacci</h1>
        <p>Digite um número N:</p>
        <Input
          type="number"
          value={numeroN || ''}
          onChange={handleInputChange}
          placeholder='Ex: 7'
        />
        {erro && <p className="text-red-500 text-xs">{erro}</p>}
        <Button
          variant="default"
          className='w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-4'
          onClick={calcularFibonacci}
          disabled={loading} // Desativa o botão enquanto estiver carregando
        >
          {loading ? ( // Se estiver carregando, mostra o componente de carga, senão mostra o texto 'Calcular'
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            'Resultado'
          )}
        </Button>
        <Button variant={'outline'} className='w-full' onClick={() => window.location.reload()}>Limpar</Button>
        {!loading && sequencia.length > 0 ? (
          <div>
            <p>Os {numeroN} primeiros números da sequência de Fibonacci são:</p>
            <ul>
              {sequencia.map((numero) => (
                <li key={numero}>{numero}</li>
              ))}
            </ul>
            <p>
              O número {numeroN} {pertence ? 'faz' : 'não faz'} parte da sequência de Fibonacci.
            </p>
          </div>
        ): (
        <></>
      )}
      </div>
      <Link href={'/'} className='mt-4 hover:underline'>Voltar</Link>
    </div>
  );
};
