import "./CardProducts.css";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    urlImage: string;
}

interface Props {
    product: Product;
}

export default function CardProduct({ product }: Props) {
    const [like, setLike] = useState(false);
    const [top, setTop] = useState(false)

    const onPressLike = () => {
        setLike(!like);
    }

    useEffect(() => {
        const randomNumber = Math.random() * (10 - 1) + 1;

        if (randomNumber > 7) {
            setTop(true)
        }
    }, [])

    return (
        <div className="products-grid">
            <div key={product.id} className="card">
                <button className="favorite-btn" onClick={() => onPressLike()}>
                    <Heart style={like ? { color: 'red' } : { color: 'black' }} />
                </button>

                <div className="image-wrapper">
                    <img src={product.urlImage} alt={product.name} />
                </div>
                <p className="product-name">{product.name}</p>

                {
                    top ?
                        <span className="badge">
                            <p>Top item</p>
                        </span>
                        : ""
                }

                <div className="price-wrapper">
                    <span className="price">${product.price}</span>
                </div>
            </div>
        </div>
    );
}
