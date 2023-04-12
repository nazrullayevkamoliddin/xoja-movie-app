import { useContext, useState } from "react";
import { AiOutlineHourglass, AiOutlineVideoCamera } from "react-icons/ai";
import { RiVipCrown2Line } from "react-icons/ri";
import { AuthContext } from "src/context/auth.context";
import { PlanCardProps } from "./plan-card-props";

const PlanCard = ({ product }: PlanCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useContext(AuthContext);

  const onSubmitSubscription = async(priceId: string) => {
    setIsLoading(true)
    const payload = {email: user?.email, priceId}
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(data)
      window.open(data.subscription.url);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {" "}
      <div
        className="max-w-sm bg-white/20 px-6 pt-6 pb-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
      >
        <h3 className="mb-3 text-xl font-bold text-[#e10856]">
          {product.name}
        </h3>
        <div className="relative">
          {/* eslint-disable-next-line */}
          <img
            src={product.images[0]}
            alt="Colors"
            className="rounded-xl w-full"
          />
          <p className="absolute top-0 bg-black/70 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
            {(product.default_price.unit_amount / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
          </p>
          <div className="absolute left-0 right-0 bottom-0 top-0 bg-black/20 w-full h-full" />
        </div>
        <div className="border-[1px] border-white/20 mt-4" />
        <button onClick={() => onSubmitSubscription(product.default_price.id)} className="mt-4 w-full bg-[#e10856] hover:opacity-80 py-4 font-semibold rounded" disabled={isLoading}> 
          {isLoading ? 'Loading...' : 'BUY PLAN'}
        </button>
        <div className="my-4 flex flex-col space-y-2">
          {product.metadata.adv.split(", ").map((c, id) => (
            <div key={id} className="flex space-x-2 items-center">
              {id == 0 && <RiVipCrown2Line className="w-5 h-5" />}
              {id == 1 && <AiOutlineHourglass className="w-5 h-5" />}
              {id == 2 && <AiOutlineVideoCamera className="w-5 h-5" />}
              <p>{c}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
