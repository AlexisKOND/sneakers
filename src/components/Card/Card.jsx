import styles from './Card.module.scss';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useContext } from 'react';
import AppContext from '../../context.js';

const Card = ({ id, title, img, price, onPlus, onFavorite, loading = false }) => {
    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(false);

    const onClickAdd = () => {
        onPlus({ title, img, price, id });
    };

    const onClickFavorite = () => {
        onFavorite({ title, img, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#cfcece"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="150" height="90" />
                    <rect x="81" y="52" rx="0" ry="0" width="1" height="0" />
                    <rect x="18" y="10" rx="0" ry="0" width="18" height="19" />
                    <rect x="2" y="98" rx="4" ry="4" width="150" height="15" />
                    <rect x="3" y="120" rx="5" ry="5" width="93" height="15" />
                    <rect x="4" y="158" rx="5" ry="5" width="80" height="24" />
                    <rect x="117" y="153" rx="4" ry="4" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    <div className={styles.favorite} onClick={onClickFavorite}>
                        <img
                            src={
                                isFavorite
                                    ? '/img/card/pink-heart.svg'
                                    : '/img/card/card-heart.svg'
                            }
                            alt="unliked"
                        />
                    </div>
                    <img src={img} width="100%" height="135%" alt="" />
                    <div className={styles.cardDescription}>
                        <p>{title}</p>
                    </div>
                    <div className={styles.cardFooter}>
                        <div className={styles.cardPrice}>
                            <span className={styles.priceLiteral}>Цена:</span>
                            <span className={styles.priceInt}>{price}</span>
                        </div>
                        <button className={styles.priceButton}>
                            <img
                                src={
                                    isItemAdded(id)
                                        ? '/img/card/green-button.svg'
                                        : '/img/card/add.svg'
                                }
                                alt=""
                                onClick={onClickAdd}
                            />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
