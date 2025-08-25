import './ProductDetails.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { API } from "../../api/api";
import Header from '../../components/Header/Header';
import ProductNotFound from '../../components/NotFound/NotFound';

interface Product {
    id: number;
    name: string;
    price: number;
    urlImage: string;
    description: string;
}

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [search, setSearch] = useState<string>("");

    const getProduct = async () => {
        try {
            const response = await API.get("api/products", {
                params: { productId: id, name: search },
            });

            setProduct(response?.data?.products[0] || []);
        } catch (err) {
            const error = isAxiosError(err);
            if (error && err.response && err.response.status === 404) {
                setProduct(null);
            }
            console.error(err);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    if (!product) return <ProductNotFound setSearch={setSearch}/>;

    return (
        <>
            <Header getProducts={getProduct} key={product.id} onSearchChange={setSearch} searchValue={search}/>
            <div className="product-details">
                <div className="product-image">
                    <img src={product.urlImage} alt={product.name} />
                </div>
                <div className="product-description">
                    <h1>{product.name}</h1>
                    <p className="desc">{product.description}</p>
                    <p className="price">{product.price}</p>
                </div>

            </div>
        </>
    );
}
