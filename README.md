# 📊 Chart Component - React + TypeScript + Vite

Um projeto React moderno que demonstra a implementação de um gráfico de rosca (Doughnut Chart) interativo usando [react-chartjs-2](https://react-chartjs-2.js.org/components/doughnut) e Chart.js.

## 🚀 Funcionalidades

- **Gráfico de Rosca Interativo**: Visualização de dados com seções clicáveis
- **Texto Central Personalizado**: Exibe informações no centro do gráfico
- **Links Dinâmicos**: Cada seção do gráfico pode abrir URLs específicas
- **Design Responsivo**: Interface moderna e adaptável
- **Tooltips Informativos**: Exibição de detalhes ao passar o mouse
- **Legenda Customizada**: Legendas com valores e cores personalizadas

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápida e moderna
- **Chart.js** - Biblioteca de gráficos JavaScript
- **react-chartjs-2** - Wrapper React para Chart.js
- **Tailwind CSS** - Framework CSS utilitário

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd chart
```

2. **Instale as dependências**
```bash
npm install
# ou
pnpm install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
pnpm dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🎯 Componente ChartComponent

### Estrutura do Gráfico

O componente `ChartComponent` implementa um gráfico de rosca que exibe dados sobre parcelas vencidas:

```typescript
const data = {
  labels: [
    'Próximas do vencimento',
    'Vencidas recentemente', 
    'Vencidas 6 a 30 dias',
    'Vencidas 31 a 60 dias',
    'Acimas de 61 dias.'
  ],
  datasets: [{
    data: [35, 25, 20, 20, 5],
    backgroundColor: [
      '#024E8D', '#00326B', '#3E7301', 
      '#709C02', '#035847'
    ],
    cutout: '70%'
  }]
}
```

### Plugin de Texto Central

Implementa um plugin personalizado para exibir texto no centro do gráfico:

```typescript
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    // Lógica para desenhar texto no centro
    ctx.fillText('80', centerX, centerY - 10);
    ctx.fillText('PARCELAS', centerX, centerY + 20);
    ctx.fillText('VENCIDAS', centerX, centerY + 32);
  }
};
```

### Interatividade

Cada seção do gráfico é clicável e pode abrir URLs específicas:

```typescript
onClick: (event: any, elements: any) => {
  if (elements.length > 0) {
    const index = elements[0].index;
    const url = urls[index];
    window.open(url, '_blank');
  }
}
```

## 🎨 Personalização

### Cores do Gráfico
```typescript
backgroundColor: [
  '#024E8D', // Azul principal
  '#00326B', // Azul escuro
  '#3E7301', // Verde oliva escuro
  '#709C02', // Verde oliva claro
  '#035847'  // Verde azulado
]
```

### URLs das Seções
```typescript
const urls = [
  '/proximas-vencimento',
  '/vencidas-recentemente', 
  '/vencidas-6-30-dias',
  '/vencidas-31-60-dias',
  '/acima-61-dias'
];
```

### Texto Central
- **Número principal**: "80" (tamanho 46px, negrito)
- **Texto secundário**: "PARCELAS VENCIDAS" (tamanho 10px)

## 📁 Estrutura do Projeto

```
chart/
├── src/
│   ├── components/
│   │   └── ChartComponent.tsx    # Componente principal do gráfico
│   ├── App.tsx                   # Componente raiz
│   ├── main.tsx                  # Ponto de entrada
│   └── index.css                 # Estilos globais
├── public/                       # Arquivos estáticos
├── package.json                  # Dependências do projeto
├── vite.config.ts               # Configuração do Vite
├── tailwind.config.ts           # Configuração do Tailwind
└── tsconfig.json                # Configuração do TypeScript
```

## 🔧 Scripts Disponíveis

```json
{
  "dev": "vite",           // Servidor de desenvolvimento
  "build": "tsc && vite build", // Build de produção
  "preview": "vite preview"     // Preview do build
}
```

## 📚 Documentação Adicional

- [react-chartjs-2 Documentation](https://react-chartjs-2.js.org/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React, TypeScript e Chart.js.

---

**Nota**: Este projeto demonstra a implementação de gráficos interativos usando react-chartjs-2, incluindo plugins personalizados e funcionalidades de interação avançadas.
