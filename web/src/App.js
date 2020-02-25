import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);



  // O array vazio [], indica que o efeito sera executado apenas uma unica vez
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)



    // Adição dentro de um array no ES6
    // Para remoção usaríamos o .filter
    // Para alteração usariamos o .map
    setDevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {/* O Map() percorre um array e retorna uma informação */}
          {devs.map(dev => (
            // O Id vem para o DevItem pois agora é o mesmo que está dentro do map
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
