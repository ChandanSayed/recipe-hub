import PurchaseCard from "../components/purchase-coin/PurchaseCard";

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
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-semibold text-center text-dark-blue mt-12">
        Purchase Coin
      </h1>
      <div className="container mx-auto px-4 flex flex-wrap gap-5 justify-center pt-12">
        {cards.map(card => (
          <PurchaseCard key={card.id} price={card.price} coin={card.coin} />
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
