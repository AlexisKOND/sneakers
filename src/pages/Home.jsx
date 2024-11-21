import Card from '../components/Card/Card.jsx';


const Home = ({
    searchValue,
    items,
    onChangeSearchInput,
    setSearchValue,
    onAddToFavorite,
    onAddToCart,
    isLoading,
}) => {

    const renderItems = () => {
        const filteredItems = items.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filteredItems).map(
            (item, index) => (
                <Card
                    key={index}
                    onPlus={obj => onAddToCart(obj)}
                    onFavorite={obj => onAddToFavorite(obj)}
                    loading={isLoading}
                    {...item}
                />
            )
        );
    };

    return (
        <div className="content">
            <div className="contentHeader">
                <h1 className="contentTitle">
                    {searchValue
                        ? `Поиск по запросу: "${searchValue}"`
                        : 'Все кроссовки'}
                </h1>
                <div className="contentSearch">
                    <img src="/img/search.svg" alt="search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className="searchClose"
                            src="/img/card/button-close.svg"
                            alt="button-close"
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        type="text"
                        placeholder="Поиск..."
                    />
                </div>
            </div>
            <div className="sneakers">{renderItems()}</div>
        </div>
    );
};

export default Home;
