import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css'
import api from "./services/api";


function App() {

  const [input, setInpunt] = useState('');
  const [cep, setCep] = useState({});

   async function handleSearch() {
    if(input === "") {
      alert("Preencha o campo cep")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInpunt("")
    } catch {
      alert("Ops... Algo deu errado")
    }
  }

  return (
    <div className="container">
    
    <h1 className="title">Buscador CEP</h1>
    
    <div className="containerInput">
    
      <input  
      placeholder="Digite seu cep..." 
      type="text"
      value={input}
      onChange={(e) => setInpunt(e.target.value)}
      />
    
      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#fff"/>
      </button>

    </div>

      {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>Cep: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>

      )}

    </div>

    );
  }
  
  export default App;
  