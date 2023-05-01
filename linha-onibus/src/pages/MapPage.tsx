import { useState } from 'react';
import Select from 'react-select';
import { BFS, Grafo } from "../utils/BFS";
import grafoJson from '../sources/grafo.json'
import "./MapPage.css";
import { InlineIcon } from '@iconify/react'
import { Icon } from '@iconify/react';


const grafo: Grafo = JSON.parse(JSON.stringify(grafoJson));

// opções no menu
function menuOptions(): { value: string; label: string }[] {
  const ids = Object.keys(grafo);
  return ids.map((stationId) => {
    return {
      value: stationId,
      label: grafo[stationId].origem,
    };
  });
}


const MapPage = () => {

  const [partida, setPartida] = useState('');
  const [destino, setDestino] = useState('');
  const [caminho, setCaminho] = useState<string[]>([]);


  function CaixaDeAlerta(mensagem:string) {
    return (
     alert(mensagem)
    );
  }


  // Crie a função para atualizar o caminho
  function encontrarRota() {

    if (partida && destino) {
      const resultado = BFS(grafo, partida, destino);
      if(resultado){
        setCaminho(resultado)
      }else{
        CaixaDeAlerta("Rota não encontrada!");
      }
    }else{
      CaixaDeAlerta("Selecione um local de partida e destino!");
    }
  }

  // Crie a lista de opções para os menus suspensos
  const options = menuOptions();

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className="title-wrapper">
          <Icon icon="material-symbols:directions-bus-outline" className="icon"/>
          <div className="title">Linhas de ônibus RJ</div>
        </div>
        <div className='subtitle'>Encontre uma rota de ônibus para o seu destino</div>
          <div>
            <Select
              options={options}
              onChange={(option) => option && setPartida(option.value)}
              className='select-estilo'
              placeholder="Selecione a estação de partida"
            />
            <Select
              options={options}
              onChange={(option) => option && setDestino(option.value)}
              className='select-estilo'
              placeholder="Selecione a estação de destino"
            />
            <div className='container2'><button onClick={encontrarRota} className='custom-button'>Encontrar rota</button></div>
          </div>
          
          <div className='content'>
            {caminho.length > 0 && (
            <div>
              <div className="title-wrapper">
                <Icon icon="material-symbols:info-outline-rounded" className="icon2"/>
                <div className="info">Instruções</div>
              </div>
              <div className='caminho'>Faça este caminho:</div>
                <ul>
                  {caminho.map((estacao) => (
                  <li key={estacao}>{estacao}</li>
                ))}
                </ul>
            </div>        
          )}
          </div>
      </div>
      <div className="image-wrapper">
        <img src="./estacoes.png"/>
      </div>
    </div>
  );
};
export default MapPage;