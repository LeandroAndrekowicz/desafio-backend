import "./Header.css";
import { ShoppingCart, Heart, Box, User2Icon, Menu } from "lucide-react";
import { useState } from "react";
import SearchProducts from "../SearchProducts/SearchProducts";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

interface Props {
    onSearchChange: (value: string) => void;
    getProducts: (value: string) => void;
    searchValue: string;
}

export default function Header({ onSearchChange, getProducts, searchValue }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <Link to={'/'}>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
            </Link>

            <SearchProducts
                onSearchChange={onSearchChange}
                getProducts={getProducts}
                searchValue={searchValue}
            />

            <div className="icons desktop-icons">
                <button>
                    <Box size={20} /> Pedidos
                </button>
                <button>
                    <Heart size={20} /> Favoritos
                </button>
                <button className="cart-button">
                    <ShoppingCart size={20} />
                    <span className="cart-badge">3</span>
                </button>
                <User2Icon />
            </div>

            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <Menu size={24} />
            </button>

            <div className={`mobile-dropdown ${menuOpen ? 'open' : ''}`}>
                <button><User2Icon /><span>Minha conta</span></button>
                <button><Box size={20} /><span>Pedidos</span></button>
                <button><Heart size={20} /><span>Favoritos</span></button>
                <button className="cart-button">
                    <ShoppingCart size={20} /><span>Carrinho</span>
                    <span className="cart-badge">3</span>
                </button>
            </div>
        </header>
    );
}
