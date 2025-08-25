import "./SearchProducts.css";

interface Props {
    onSearchChange: (value: string) => void;
    getProducts: (value: string) => void;
    searchValue: string;
}

export default function SearchProducts({ onSearchChange, getProducts, searchValue }: Props) {

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                    onSearchChange(e.target.value);
                }}
            />
            <button
                className="search-btn"
                onClick={() => getProducts(searchValue)}
            >
                🔍
            </button>
        </div>
    );
}
