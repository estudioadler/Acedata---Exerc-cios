"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

// Função para encontrar o menor e o maior número em uma sequência
function encontrarMinMax(sequencia: number[]): { menorN: number, maiorN: number } {
    let menorN = sequencia[0];
    let maiorN = sequencia[0];
    // Encontrar o menor e o maior número na sequência
    for (let i = 1; i < sequencia.length; i++) {
        if (sequencia[i] < menorN) {
            menorN = sequencia[i];
        }
        if (sequencia[i] > maiorN) {
            maiorN = sequencia[i];
        }
    } return { menorN, maiorN };
}

export default function Home() {
    // Definir o estado das variáveis
    const [quantidade, setQuantidade] = useState(0);
    const [sequencia, setSequencia] = useState<number[]>([]);
    const [menorN, setMenor] = useState<number | null>(null);
    const [maiorN, setMaior] = useState<number | null>(null);
    const [erro, setErro] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
      
    // Função para lidar com a submissão do formulário
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Verificar se o preenchimento dos campos foi correto
        if (sequencia === undefined || quantidade === 0) {
            setErro('Preenchimento obrigatório');
            return;
        } else {
            setErro('');
            setLoading(true);
        }
        // Encontrar o menor e o maior número na sequência
        const { menorN, maiorN } = encontrarMinMax(sequencia);
        // Atualizar os estados com o menor e o maior número
        setMenor(menorN);
        setMaior(maiorN);
        // Aguardar 1 segundo antes de mostrar o resultado
        setTimeout(() => {
            setLoading(false);
            toast("Concluído com sucesso");
        }, 1000);
    };

    // Função para lidar com a adição de números à sequência
    function adicionarNumero(numero: string) {
        if (!isNumber(numero)) {
            setErro('Digite apenas números');
            return;
        }
        // Adicionar o número à sequência
        setSequencia([...sequencia, parseFloat(numero)]); 
        setErro('');
    }
    // Função para verificar se é um número
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
                        type="submit"
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
                 {/* Verificar se a sequência foi preenchida antes de mostrar os resultados */}
                { !loading && (menorN || maiorN ) ? ( // Se estiver carregando, mostra o componente de carregamento, senão mostra os resultados
                    <div className="flex flex-col">
                        <h2>Resultado:</h2>
                        <p>Sequência digitada: {JSON.stringify(sequencia)}</p>
                        <p>Menor número: {menorN}</p>
                        <p>Maior número: {maiorN}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Link href={'/'} className='mt-4 hover:underline'>Voltar</Link>
        </div>
    );
}
