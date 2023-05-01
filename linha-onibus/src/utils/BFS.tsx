interface Vertice {
  origem: string;
  adjacencias: string[];
}

export interface Grafo {
  [key: string]: Vertice;
}

export function BFS(g: Grafo, origem: string, destino: string) {
  const visitados: {[key: string]: boolean} = {}; 
  const fila: string[] = [origem];
  const pai: {[key: string]: string} = {}; 
  let noAtual: string;

  visitados[origem] = true;
  pai[origem] = ''; 

  while (fila.length) {
    noAtual = fila.shift()!;
    if (noAtual === destino) {
      console.log('Encontrado! O caminho é:');
      let caminho: string[] = [destino];
      let no: string = pai[destino];
      while (no) { 
        caminho.unshift(no);
        no = pai[no];
      }
      console.log(caminho.join(' -> '));
      console.log(caminho);
      return caminho;

    }
    g[noAtual].adjacencias.forEach((adj: string) => {
      if (!visitados[adj]) {
        visitados[adj] = true;
        pai[adj] = noAtual; 
        fila.push(adj);
      }
    });
  }
  console.log('Não encontrado!');
  return;
}
