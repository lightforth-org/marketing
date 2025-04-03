import FeatureItem from "./features-item";

const PricingPlan = ({
  type,
  perDay,
  isPopular = false,
  formerPrice,
  newPrice,
  tagColor = "#FFB800",
  features = [],
  isSelected,
  onClick,
}: {
  type: string;
  perDay: string;
  formerPrice: string;
  newPrice: string;
  isPopular?: boolean;
  tagColor: string;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`p-6 relative border rounded-xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 ${
      isSelected
        ? "border-blue-500 shadow-blue-100 bg-blue-50"
        : "border-gray-100 shadow-gray-100 hover:border-gray-300"
    }`}
  >
    {isPopular && (
      <div className="absolute top-0 -right-2 flex justify-center">
        <div
          style={{ backgroundColor: tagColor }}
          className="text-white text-[10px] font-medium uppercase tracking-widest py-1 px-4 rounded-bl-xl"
        >
          Most Popular
        </div>
      </div>
    )}

    <div className="flex justify-between items-center mt-2 mb-6">
      <div>
        <div className="flex items-center gap-x-2">
          <div
            className={`h-4 w-4 rounded-full border-2 ${
              isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
            } mr-2`}
          ></div>
          <div>
            <h3 className="font-medium text-xl">{type}</h3>
            <p className="text-[10px] text-gray-400 space-x-2">
              <span className="line-through">{formerPrice}</span>
              <span>{newPrice}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-right !text-[#8F8F8F]">
        <div className="flex items-start">
          <span className="text-xs font-medium">$</span>
          <span className="text-2xl font-bold">{perDay}</span>
        </div>
        <p className="text-sm text-gray-500">per day</p>
      </div>
    </div>

    <ul className="space-y-3">
      {features.map((feature, index) => (
        <FeatureItem key={index} text={feature} />
      ))}
    </ul>
  </div>
);

export default PricingPlan;
