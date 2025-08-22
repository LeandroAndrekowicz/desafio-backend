import { v4 as uuidv4 } from 'uuid';

export const products = [
  {
    id: uuidv4(),
    name: "Camiseta Básica",
    description: "Camiseta 100% algodão, disponível em várias cores.",
    price: 49.90,
    url_image: "https://i.pinimg.com/736x/70/11/b2/7011b22e2ba6da33b158260c4645fa53.jpg",
    quantity: 120
  },
  {
    id: uuidv4(),
    name: "Tênis Esportivo",
    description: "Tênis confortável para corridas e atividades físicas.",
    price: 299.99,
    url_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNsYP5qrgsxNtuQr0R7fqgTe_rDpPrp_CdEQ&s",
    quantity: 50
  },
  {
    id: uuidv4(),
    name: "Mochila Escolar",
    description: "Mochila resistente, com vários compartimentos.",
    price: 89.50,
    url_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWzcySn68VCb3fANLA5rRMm2k0tbGAMjlyqg&s",
    quantity: 75
  },
  {
    id: uuidv4(),
    name: "Fone de Ouvido Bluetooth",
    description: "Fone sem fio com cancelamento de ruído e bateria duradoura.",
    price: 199.90,
    url_image: "https://img.freepik.com/fotos-premium/fones-de-ouvido-acusticos-sem-fios-sobre-um-fundo-branco-em-isolamento_185667-16744.jpg?semt=ais_hybrid&w=740&q=80",
    quantity: 40
  },
  {
    id: uuidv4(),
    name: " ",
    description: "Relógio à prova d'água com várias funções esportivas.",
    price: 149.00,
    url_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0s-_dAyhE1Qo2Xx-TlG_XMKgnGsae7ye1A&s",
    quantity: 60
  }
];