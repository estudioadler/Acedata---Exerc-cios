'use client' 
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2} from 'lucide-react';
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';


export default function Home() {
  const [salarioHora, setSalarioHora] = useState(''); 
  const [horasTrabalhadas, setHorasTrabalhadas] = useState(''); 
  const [filhos, setFilhos] = useState('');
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [salarioFamilia, setSalarioFamilia] = useState(0);
  const [salarioLiquido, setSalarioLiquido] = useState(0);
  const [erroSalarioHora, setErroSalarioHora] = useState('');
  const [erroHorasTrabalhadas, setErroHorasTrabalhadas] = useState('');
  const [erroFilhos, setErroFilhos] = useState('');
  const [loading, setLoading] = useState(false);

  // Funções de manipulação de estado para os inputs
  const handleSalarioHoraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const salarioH = parseFloat(e.target.value).toString();
    setSalarioHora(salarioH); // Atualizar o estado com o valor do input
    setErroSalarioHora(''); // Limpar o estado de erro
  };

  const handleHorasTrabalhadasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const horasTrabalhadas = parseFloat(e.target.value).toString();
    setHorasTrabalhadas(horasTrabalhadas);
    setErroHorasTrabalhadas('');
  };

  const handleFilhosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filhos = parseInt(e.target.value).toString();
    setFilhos(filhos);
    setErroFilhos(''); 
  };


  // Função para calcular o salário e exibir os resultados
  const calcularSalario = (event: React.MouseEvent) => {
    event.preventDefault(); // Previnir o comportamento padrão do formulário 
    // Verificar se todos os campos foram preenchidos
    if (!salarioHora || salarioHora === '' ) {
      setErroSalarioHora('Preenchimento obrigatório');
      return; // Stop if salaryHora is empty
    } else if (isNaN(parseFloat(salarioHora))) {
      setErroSalarioHora('Por favor, insira um valor.');
      return; // Stop if salaryHora is not a number
    }
  
    if (!horasTrabalhadas || horasTrabalhadas === '') {
      setErroHorasTrabalhadas('Preenchimento obrigatório');
      return; // Stop if horasTrabalhadas is empty
    } else if (isNaN(parseFloat(horasTrabalhadas))) {
      setErroHorasTrabalhadas('Por favor, insira um valor.');
      return; // Stop if horasTrabalhadas is not a number
    }
  
    if (!filhos || filhos === '') {
      setErroFilhos('Preenchimento obrigatório');
      return; // Stop if filhos is empty
    } else if (isNaN(parseInt(filhos))) {
      setErroFilhos('Por favor, insira um valor.');
      return; // Stop if filhos is not a number
    }

      // Calcular o salário bruto
      let salarioBruto = Number(salarioHora) * Number(horasTrabalhadas);
      let salarioFamiliaPorFilho;
      // Verificar o valor do salário bruto
      if (salarioBruto <= 788) {
        salarioFamiliaPorFilho = 30.50;
      } else if (salarioBruto <= 1100) {
        salarioFamiliaPorFilho = 18.50;
      } else {
        salarioFamiliaPorFilho = 11.90;
      }
      // Calcular o salário líquido
      let salarioFamiliaTotal = salarioFamiliaPorFilho * Number(filhos);
      let salarioLiquido = salarioBruto + salarioFamiliaTotal; // salário líquido = salário bruto + salário familiar
      // Exibir os resultados
      setSalarioBruto(salarioBruto);
      setSalarioFamilia(salarioFamiliaTotal);
      setSalarioLiquido(salarioLiquido);
      // Aguardar 1 segundo antes de mostrar o resultado
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast("Cálculo concluído com sucesso!");
      }, 1000);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-white p-6 rounded shadow w-96 flex flex-col gap-2'>
        <form action="" className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold mb-4'>Cálculo de Salário Horista</h2>
          <Label className='flex flex-col text-sm gap-2'>Salário por hora:</Label>
          <Input
            type="number"
            required
            value={salarioHora}
            onChange={handleSalarioHoraChange}
            placeholder='Ex: 18 ou 18.54'
          />
          {erroSalarioHora && <p className="text-red-500 text-xs">{erroSalarioHora}</p>}
          <Label className='flex flex-col text-sm gap-2'>Horas trabalhadas no mês:</Label>
          <Input
            type="number"
            pattern="[0-9]{3}:[0-9]{2}"
            maxLength={5}
            required
            value={horasTrabalhadas}
            onChange={handleHorasTrabalhadasChange}
            placeholder='Ex: 160 ou 160.59'
          />
          {erroHorasTrabalhadas && <p className="text-red-500 text-xs">{erroHorasTrabalhadas}</p>}
          <Label className='flex flex-col text-sm gap-2'>Filhos menores de 14 anos:</Label>
          <Input
            type="number"
            required
            value={filhos}
            onChange={handleFilhosChange}
            placeholder='Ex: 2'
            min={'0'}
          />
          {erroFilhos && <p className="text-red-500 text-xs">{erroFilhos}</p>}
          <Button
            variant="default"
            className='w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-4'
            onClick={calcularSalario}
            disabled={loading} // Desativa o botão enquanto estiver carregando
          >
            {loading ? ( // Se estiver carregando, mostra o componente de carga, senão mostra o texto 'Calcular'
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculando...
              </>
            ) : (
              'Calcular'
            )}
          </Button>
          <Button variant={'outline'} className='' onClick={() => window.location.reload()}>Limpar</Button>
        </form>
        {/* Exibir os resultados se houver algum valor preenchido no formulário */}
        { !loading && (salarioBruto || salarioFamilia || salarioLiquido) ? (
          <> 
          <Table className='w-full mt-3'>
              <TableHeader className='bg-neutral-100 w-full'>
                <TableRow>
                  <TableHead>Salario Bruto:</TableHead>
                  <TableHead>Salario Familia:</TableHead>
                  <TableHead>Salario Liquido:</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody className='w-full'>
              <TableRow>
                <TableCell>{salarioBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>{salarioFamilia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>{salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </>
        ) : (
          <></>
        )}
      </div>
      <Link href={'/'} className='mt-4 hover:underline'>Voltar</Link>
    </div>
  );
}
