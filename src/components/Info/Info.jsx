import { useContext } from 'react';
import AppContext from '../../context';
import styles from './Info.module.scss';

const Info = ({ image, title, description, arrow }) => {
    const { setCartOpened } = useContext(AppContext);

    return (
        <div className={styles.cartEmpty}>
            <img src={image} alt="emptyCart" width={120} height={120} />
            <h2 className={styles.cartTitle}>{title}</h2>
            <p className={styles.cartDescription}>{description}</p>
            <div className={styles.cartFooterInfo}>
                <button
                    onClick={() => setCartOpened(false)}
                    className={styles.greenButton}
                >
                    <img src={arrow} alt="arrow" width={12} height={12} />
                    <span>Вернуться назад</span>
                </button>
            </div>
        </div>
    );
};

export default Info;
