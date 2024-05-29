import { useState } from "react";
import PurchaseCard from "../components/purchase-coin/PurchaseCard";
import Payment from "../components/stripe/Payment";

const PurchaseCoin = () => {
  const cards = [
    {
      price: 1,
      coin: 100,
      id: 1
    },
    {
      price: 5,
      coin: 500,
      id: 2
    },
    {
      price: 10,
      coin: 1000,
      id: 3
    }
  ];

  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState(1);
  function handlePrice(price) {
    setPrice(price * 1);
    setOpenModal(true);
  }

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-semibold text-center text-dark-blue mt-12">
        Purchase Coin
      </h1>
      <div className="container mx-auto px-4 flex flex-wrap gap-5 justify-center pt-12">
        {cards.map(card => (
          <PurchaseCard
            key={card.id}
            price={card.price}
            coin={card.coin}
            handlePurchase={handlePrice}
          />
        ))}
      </div>
      <div
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? "opacity-1 visible" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          className={`min-w-96 absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
            openModal ? "scale-1 opacity-1 duration-300" : "scale-0 opacity-0 duration-150"
          } `}
        >
          <svg
            onClick={() => setOpenModal(false)}
            className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
            </g>
          </svg>
          <Payment price={price} setOpenModal={setOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoin;
