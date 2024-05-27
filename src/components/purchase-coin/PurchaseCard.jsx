const PurchaseCard = ({ price, coin }) => {
  return (
    <>
      <div className="bg-white p-8 shadow">
        <div className="flex flex-col items-center text-xl font-semibold">
          <span>
            <sub className="text-base">$</sub>
            <span>{price}</span>
          </span>
          <span className="text-sm">/{coin} coins</span>
        </div>
        <button className="w-full py-2 text-white px-4 rounded-lg hover:bg-opacity-70 bg-dark-blue hover:text-white shadow-lg">
          Purchases
        </button>
      </div>
    </>
  );
};

export default PurchaseCard;
