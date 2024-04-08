'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SequenciaNumeros() {
    const [quantidade, setQuantidade] = useState(0);
    const [sequencia, setSequencia] = useState<number[]>([]);
    const [menor, setMenor] = useState<number | null>(null);
    const [maior, setMaior] = useState<number | null>(null);
    const [segundoMaior, setSegundoMaior] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [calculado, setCalculado] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setQuantidade(value);
    };

    const handleSequenciaChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newSequencia = [...sequencia];
        newSequencia[index] = parseInt(event.target.value);
        setSequencia(newSequencia);
    };

    const calcularResultados = () => {
        setCalculado(true);

        if (sequencia.length === quantidade) {
            const sortedSequence = [...sequencia].sort((a, b) => a - b);
            setMenor(sortedSequence[0]);
            setMaior(sortedSequence[quantidade - 1]);
            setSegundoMaior(sortedSequence[quantidade - 2]);
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='bg-white p-6 rounded shadow w-96 flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>Sequência de Números</h1>
                <form className=''>
                    <Label>
                        Quantidade de números:
                        <Input
                            type="number"
                            value={quantidade || ''}
                            placeholder='Ex: 3'
                            onChange={handleInputChange} />
                    </Label>
                    <div className='grid grid-cols-4 gap-2'>
                        {Array.from({ length: quantidade }, (_, index) => (
                            <div key={index}>
                                <Label className='text-xs'>
                                    Número {index + 1}:
                                    <Input type="number" onChange={(e) => handleSequenciaChange(e, index)} />
                                </Label>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="default"
                        className='w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-4'
                        onClick={calcularResultados}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Calculando...
                            </>
                        ) : (
                            'Calcular'
                        )}
                    </Button>
                    <Button variant={'outline'} className='w-full' onClick={() => window.location.reload()}>Limpar</Button>
                </form>
                {calculado && !loading && sequencia.length === quantidade ? (
                    <div className='flex flex-col gap-2'>
                        <div>
                            Sequência digitada: {sequencia.join(', ')}
                        </div>
                        <div>
                            Menor número: {menor}
                        </div>
                        <div>
                            Maior número: {maior}
                        </div>
                        <div>
                            Segundo maior número: {segundoMaior}
                        </div>
                    </div>
                ) : null}
            </div>
            <Link href={'/'} className='mt-4 hover:underline'>Voltar</Link>
        </div>
    );
};