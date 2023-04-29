export interface Grafo {
    [key: string]: {
      origem: string;
      adjs: string[];
    };
  }
  
  //const cont = fs.readFileSync('../sources/grafo.json', 'utf-8');
  //const grafo: Grafo = JSON.parse(cont);
  // Exemplo de uso:
  //console.log(BFS(grafo, "A", "E"))
  
  
  export function BFS(g: Grafo, origem: string, destino: string) {
    const visitados: string[] = [];
    const fila: string[] = [origem];
    let noAtual: string;
  
    while (fila.length) {
      noAtual = fila.shift()!;
      if (noAtual === destino) {
        console.log(Encontrado! A rota é ${g[noAtual].origem} - ${noAtual});
        return;
      }
      if (!visitados.includes(noAtual)) {
        visitados.push(noAtual);
        fila.push(...g[noAtual].adjs);
      }
    }
    console.log('Não encontrado!');
  }
  