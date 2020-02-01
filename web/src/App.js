import React, { useState } from 'react';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
// Propriedade: Informações que um componente PAI passa para o componente filho
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

// Componente App
function App() {
  // useState: Usado para se trabalhar com estados no React
  // O React não fica monitorando o estado da aplicação para musar a view
  // O use State retorna um vetor, por isso vamos desinstrutrar o mesmo

  // Por causa da imutabilidade precisamos usar a função auxiliar set
  // A função setCounter irá criar um novo counter ao invés de atualizar o valor do counter original (imutabilidade)
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
