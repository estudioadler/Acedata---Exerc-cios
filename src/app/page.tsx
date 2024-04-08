import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col gap-10 items-center text-left justify-center h-screen">
      <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold underline mb-4">Acedata - Exercicios</h1>
        <Link href="/Ex001">
          <h2 className="font-semibold">Exercicio 01</h2>
          <div>
            <h3 className="hover:underline">Cálculo de Salário Horista</h3>
          </div>
        </Link>
        <Link href="/Ex002">
          <h2 className="font-semibold">Exercício 02</h2>
          <div>
            <h3 className="hover:underline">Sequência de Números</h3>
          </div>
        </Link>
        <Link href="/Ex003">
          <h2 className="font-semibold">Exercício 03</h2>
          <div>
            <h3 className="hover:underline">Sequência de Fibonacci</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}



