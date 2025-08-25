import './Home.css';
import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { API } from '../../api/api';
import Header from '../../components/Header/Header';
import CardProduct from '../../components/CardProducts/CardProducts';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import ProductNotFound from '../../components/NotFound/NotFound';

interface Product {
    id: number;
    name: string;
    price: number;
    urlImage: string;
    description: string;
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState("ASC");
    const [searchParams, setSearchParams] = useSearchParams();

    const getProducts = async (query?: string) => {
        try {
            const params = {
                name: query || "",
                sort: order
            };

            const newParams = new URLSearchParams(searchParams.toString());
            if (!query) {
                newParams.delete("produto");
            } else {
                newParams.set("produto", query);
            }
            setSearchParams(newParams);

            const response = await API.get("api/products", { params });
            setProducts(response.data.products);
            setLoading(false);
        } catch (err) {
            const error = isAxiosError(err);
            if (error && err.response && err.response.status === 404) {
                setProducts([]);
            }
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getProducts(search);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, order]);

    useEffect(() => {
        const productParam = searchParams.get("produto") || "";
        setSearch(productParam);

        getProducts(productParam);
    }, []);

    return (
        <div className='home'>
            <div className='header'>
                <Header
                    onSearchChange={setSearch}
                    searchValue={search}
                    getProducts={getProducts}
                />
            </div>

            <div className="filter-container">
                <div className="filter-group">
                    <label>Ordenar:</label>
                    <select
                        id="order"
                        name="order"
                        className="filter-select"
                        onChange={(e) => setOrder(e.target.value)}
                        value={order}
                    >
                        <option value="ASC">Crescente (ASC)</option>
                        <option value="DESC">Decrescente (DESC)</option>
                    </select>
                </div>
            </div>

            <div className='container-products'>
                {loading ? (
                    <Loading />
                ) : products?.length > 0 ? (
                    <div className="products">
                        {products.map((product) => (
                            <Link
                                className='product'
                                key={product.id}
                                to={`/produto/${product.id}`}
                            >
                                <CardProduct product={product} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <ProductNotFound setSearch={setSearch} />
                )}
            </div>
        </div>
    );
}
