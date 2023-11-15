'use client'

import { useState } from 'react'

export default function Home() {

  const [input, setInput] = useState('');
  const [nama, setNama] = useState('Nurfadillah');

  const handlerGantiNama = (event) => {
    setInput(event.target.value);
  };

  const handlerTampilkanNama = () => {
    setNama(input || 'Nurfadillah');
  };

  return (
    <div className='body'>
      <div className='container'>
        <div className='header'>
          <div className='foto-profile'>
            <img
              src="/assets/profil-banner.png"
              alt="Profil Banner"
              fill
              objectFit='contain'
            ></img>
          </div>
          <div className='content-header'>
            <h1>{nama}</h1>
            <div className='nim-bio'>
              <p>D121211004</p>
              <p>Fakultas Teknik</p>
            </div>
          </div>
        </div>
        <div className='cta-banner'>
          <div className='inputan'>
            <input
            type="text"
            value={input}
            onChange={handlerGantiNama}
            placeholder="Masukkan nama"
            />
          </div>
          <div className='button'>
            <button onClick={handlerTampilkanNama}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}


