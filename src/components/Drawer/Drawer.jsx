import Info from '../Info/Info';
import styles from './Drawer.module.scss';
import { useContext, useState } from 'react';
import AppContext from '../../context';

const Drawer = ({ onClose, onRemove, items = [] }) => {
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);
    const { setCartItems } = useContext(AppContext);

    const onClickOrder =  () => {
        setIsOrderCompleted(true);
        setCartItems([]);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <div className={styles.drawerHeader}>
                    <h3 className={styles.drawerTitle}>корзина</h3>
                    <img
                        onClick={onClose}
                        className={styles.removeButton}
                        src="/img/card/button-close.svg"
                        alt="button-close"
                    />
                </div>
                {items.length > 0 ? (
                    <>
                        <div className={styles.cartItems}>
                            {items.map(obj => (
                                <div className={styles.cartItem} key={obj.id}>
                                    <img
                                        className={styles.cartImg}
                                        src={obj.img}
                                        width={70}
                                        height={70}
                                        alt="sneakers"
                                    />
                                    <div className={styles.cartDetail}>
                                        <p className={styles.cartTitle}>{obj.title}</p>
                                        <span className={styles.cartPrice}>
                                            {obj.price}
                                        </span>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className={styles.removeButton}
                                        src="/img/card/button-close.svg"
                                        alt="button-close"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={styles.cartFooter}>
                            <ul className={styles.cartTotalBlock}>
                                <li className={styles.cartFooterItem}>
                                    <span className={styles.footerItemText}>Итого:</span>
                                    <div className={styles.dashRow}></div>
                                    <b className={styles.texation}>21 000 грн.</b>
                                </li>
                                <li className={styles.cartFooterItem}>
                                    <span className={styles.footerItemText}>
                                        Налог 5%
                                    </span>
                                    <div className={styles.dashRow}></div>
                                    <b className={styles.texation}>1032 грн.</b>
                                </li>
                            </ul>

                            <button onClick={onClickOrder} className={styles.greenButton}>
                                <span>Оформить заказ</span>
                                <img
                                    src="/img/cart-arrow.svg"
                                    alt="cart-arrow"
                                    width={13}
                                    height={12}
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
                        image={
                            isOrderCompleted
                                ? '/img/card/get-order.svg'
                                : '/img/card/empty-cart.png'
                        }
                        arrow={'/img/cart-arrow.svg'}
                        description={
                            isOrderCompleted
                                ? 'Ваш заказ #18 скоро будет передан курьерской доставке'
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
