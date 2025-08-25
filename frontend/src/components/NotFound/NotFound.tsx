import "./NotFound.css";
import { Link } from "react-router-dom";
import { HomeIcon } from 'lucide-react'

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function ProductNotFound({ setSearch }: Props) {
  return (
    <div className="notfound-container">
      <div className="notfound-icon">😕</div>
      <h2>Produto não encontrado</h2>
      <p>Desculpe, não conseguimos encontrar o produto que você está procurando.</p>
      <Link className="link-button" to={'/'} onClick={() => setSearch("")}>
        <button className="button">
          <span>Voltar ao inicio</span>
          <span>
            <HomeIcon />
          </span>
        </button>
      </Link>
    </div>
  );
}
