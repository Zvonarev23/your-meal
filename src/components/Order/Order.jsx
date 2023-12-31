import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalDelivery/modalDeliverySlice";
import { orderRequestAsync } from "../../store/order/orderSlice";
import { OrderGoods } from "../OrderGoods/OrderGoods";
import style from "./Order.module.css";

export const Order = () => {
  const { totalPrice, totalCount, orderList, orderGoods } = useSelector(
    (state) => state.order
  );

  const [isOpen, setIsOpen] = useState(false);

  const showOrder = () => {
    setIsOpen(true);
  };

  const hideOrder = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderRequestAsync());
  }, [orderList.length]);

  return (
    <div className={isOpen ? style.order_open : style.order}>
      <section className={style.wrapper}>
        <div
          onClick={showOrder}
          className={style.header}
          tabIndex="0"
          role="button"
        >
          <h2 className={style.title}>Корзина</h2>

          <span className={style.count}>{totalCount}</span>
        </div>

        <div className={style.wrap_list}>
          <ul className={style.list}>
            {orderGoods.map((item) => (
              <OrderGoods key={item.id} {...item} />
            ))}
          </ul>

          <div className={style.total}>
            <p>Итого</p>
            <p>
              <span className={style.amount}>{totalPrice}</span>
              <span className="currency">&nbsp;₽</span>
            </p>
          </div>

          <button
            className={style.submit}
            disabled={orderGoods.length === 0}
            onClick={() => {
              dispatch(openModal());
            }}
          >
            Оформить заказ
          </button>

          <div className={style.apeal}>
            <p className={style.text}>Бесплатная доставка</p>
            <button onClick={hideOrder} className={style.close}>
              Свернуть
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
