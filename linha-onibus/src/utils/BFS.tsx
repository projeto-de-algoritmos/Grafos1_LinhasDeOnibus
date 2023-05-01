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
  
  
// Defina a função BFS para encontrar o menor caminho
export function BFS(g: Grafo, origem: string, destino: string): string[] {
  const visitados: string[] = [];
  const fila: string[][] = [[origem]];
  let caminho: string[];
  const pai: {[key: string]: string} = {};
  
  pai[origem] = '';
  while (fila.length) {
    caminho = fila.shift()!;
    const noAtual = caminho[caminho.length - 1];

    if (noAtual === destino) {
      return caminho;
    }
    if (g[noAtual].adjs) {
      
      if (!visitados.includes(noAtual)) {
        visitados.push(noAtual);
        console.log(visitados)
        for (const adj of g[noAtual].adjs) {
          fila.push([...caminho, adj]);

        }
      }
    }
  }

  return [];
}
  
  