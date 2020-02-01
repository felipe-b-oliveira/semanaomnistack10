import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

function App() {
  // PROGRAMAÇÂO IMPERATIVA
  // Uso de estados, o componente decide seu comportamento de acordo com o estado.
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  // A função useEffect serve para disparar uma função toda vez em que uma informação se alterar
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    })

    setGithubUsername('');
    setTechs('');
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)} 
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e => setTechs(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)} 
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47614568?s=460&v=4" alt="Felipe Oliveira"></img>
              <div className="user-info">
                <strong>Felipe Oliveira</strong>
                <span>.NET, React</span>
              </div>
            </header>
            <p>Felipe Oliveira, 23 anos, carioca e bacharel em Sistemas de Informação pela Universidade Unigranrio.</p>
            <a href="https://github.com/felipe-b-oliveira">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47614568?s=460&v=4" alt="Felipe Oliveira"></img>
              <div className="user-info">
                <strong>Felipe Oliveira</strong>
                <span>.NET, React</span>
              </div>
            </header>
            <p>Felipe Oliveira, 23 anos, carioca e bacharel em Sistemas de Informação pela Universidade Unigranrio.</p>
            <a href="https://github.com/felipe-b-oliveira">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47614568?s=460&v=4" alt="Felipe Oliveira"></img>
              <div className="user-info">
                <strong>Felipe Oliveira</strong>
                <span>.NET, React</span>
              </div>
            </header>
            <p>Felipe Oliveira, 23 anos, carioca e bacharel em Sistemas de Informação pela Universidade Unigranrio.</p>
            <a href="https://github.com/felipe-b-oliveira">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47614568?s=460&v=4" alt="Felipe Oliveira"></img>
              <div className="user-info">
                <strong>Felipe Oliveira</strong>
                <span>.NET, React</span>
              </div>
            </header>
            <p>Felipe Oliveira, 23 anos, carioca e bacharel em Sistemas de Informação pela Universidade Unigranrio.</p>
            <a href="https://github.com/felipe-b-oliveira">Acessar perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
