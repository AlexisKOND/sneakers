import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = ({ onClickCart }) => {
    return (
        <header className={styles.header}>
            <Link to="/">
                <div className={styles.headerLeft}>
                    <img
                        src="/img/header/logo.png"
                        width={40}
                        height={40}
                        alt="logo"
                    />

                    <div>
                        <h3 className={styles.headerTitle}>Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className={styles.headerRight}>
                <li onClick={onClickCart}>
                    <img
                        src="/img/header/cart.svg"
                        width={18}
                        height={18}
                        alt="cart"
                    />
                    <p>Корзина</p>
                </li>

                <Link to="/favorites">
                    <li>
                        <img
                            src="/img/header/heart.svg"
                            width={18}
                            height={18}
                            alt="heart"
                        />
                        <p>Избранное</p>
                    </li>
                </Link>

                <li>
                    <img
                        src="/img/header/Union.svg"
                        width={18}
                        height={18}
                        alt="union"
                    />
                    <p>Профиль</p>
                </li>
            </ul>
        </header>
    );
};

export default Header;
