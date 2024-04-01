"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

// Função para encontrar o menor e o maior número em uma sequência
function encontrarMinMax(sequencia: number[]): { menor: number, maior: number } {
    let menor = sequencia[0];
    let maior = sequencia[0];

    for (let i = 1; i < sequencia.length; i++) {
        if (sequencia[i] < menor) {
            menor = sequencia[i];
        }
        if (sequencia[i] > maior) {
            maior = sequencia[i];
        }
    } return { menor, maior };
}

export default function Home() {
    const [quantidade, setQuantidade] = useState(0);
    const [sequencia, setSequencia] = useState<number[]>([]);
    const [menor, setMenor] = useState<number | null>(null);
    const [maior, setMaior] = useState<number | null>(null);
    const [erro, setErro] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const resultado = (event: React.MouseEvent) => {
        event.preventDefault();
      
        if (sequencia === undefined || quantidade === 0) {
          setErro('Preenchimento obrigatório');
        } else {
          setErro('');
          setLoading(true);
          setTimeout(() => {
            // Encontrar o menor e o maior número na sequência
            const { menor, maior } = encontrarMinMax(sequencia);
      
            // Atualizar os estados com o menor e o maior número
            setMenor(menor);
            setMaior(maior);
      
            setLoading(false);
            toast("Concluído com sucesso");
          }, 1000);
        }
      };
      
    // Função para lidar com a submissão do formulário
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Encontrar o menor e o maior número na sequência
        const { menor, maior } = encontrarMinMax(sequencia);
        // Atualizar os estados com o menor e o maior número
        setMenor(menor);
        setMaior(maior);
    };

    // Função para lidar com a adição de números à sequência
    function adicionarNumero(numero: string) {
        if (!isNumber(numero)) {
            setErro('Digite apenas números');
            return;
        }

        setSequencia([...sequencia, parseFloat(numero)]);
        setErro('');
    }

    function isNumber(valor: string) {
        return !isNaN(parseFloat(valor));
    }


    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <div className='bg-white p-6 rounded shadow w-96 flex flex-col gap-2'>
                <h2 className="text-xl font-bold mb-4">Sequência de Números</h2>
                <form onSubmit={handleSubmit}>
                    <Label>
                        Quantidade de números:
                        <Input
                            type="number"
                            value={quantidade || ''}
                            onChange={(e) => setQuantidade(parseInt(e.target.value))}
                            placeholder='Ex: 5'

                        />
                        {erro && <p className="text-red-500 text-xs">{erro}</p>}
                    </Label>
                    {sequencia.length < quantidade
                        ? (
                            <div>
                                {`Digite o número ${sequencia.length + 1}: `}
                                <Input
                                    type="number"
                                    autoFocus
                                    onChange={(e) => adicionarNumero(e.target.value)}
                                    placeholder='Ex: 54321'
                                />
                                {erro && <p className="text-red-500 text-xs">{erro}</p>}
                            </div>
                        ) : null}
                    <Button
                        variant="default"
                        className='w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-4'
                        onClick={resultado}
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
                </form>
                { !loading && (menor || maior ) ? (
                    <div className="flex flex-col">
                        <h2>Resultado:</h2>
                        <p>Sequência digitada: {JSON.stringify(sequencia)}</p>
                        <p>Menor número: {menor}</p>
                        <p>Maior número: {maior}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Link href={'/'} className='mt-4 hover:underline'>Voltar</Link>
        </div>
    );
}
