import FeatureItem from "./features-item";

const PricingPlan = ({
  isPopular = false,
  isBestValue = false,
  formerPrice,
  newPrice,
  features = [],
  isSelected,
  onClick,
}: {
  isPopular?: boolean;
  isBestValue?: boolean;
  formerPrice: string;
  newPrice: string;
  perMonth: string;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`border rounded-lg overflow-hidden shadow-sm cursor-pointer transition ease-in-out ${
      isSelected ? "border-2 border-[#0494FC] shadow-xl  " : "border-gray-200"
    }`}
    onClick={onClick}
  >
    {/* Top Banner */}
    {(isPopular || isBestValue) && (
      <div
        className={`py-1 px-4 ${
          isPopular ? "bg-[#16A249]" : "bg-[#0A4063]"
        } text-white flex items-center`}
      >
        {isPopular && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        )}
        {isBestValue && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
        <span className="font-medium text-xs">
          {isPopular ? "Most Popular" : "Best Value"}
        </span>
      </div>
    )}

    {/* Main Content */}
    <div className="p-4">
      {/* Selection & Price */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <input
            type="radio"
            checked={isSelected}
            className="h-5 w-5 text-blue-600"
          />
          <div className="ml-3 flex items-center gap-x-3">
            <p className="font-medium p-1 text-xs bg-gray-50 border rounded-sm border-gray-100 text-gray-700">
              {isBestValue ? "PREMIUM" : "PRO"}
            </p>
            <p className="text-gray-500">
              <span className="line-through text-2xl">{formerPrice}</span>{" "}
              <span className="text-2xl font-bold text-gray-900">
                {newPrice}
              </span>
              <span className="text-sm">/month</span>
            </p>
          </div>
        </div>
      </div>

      {/* Lightning Bolt and 3 Days Free */}
      <div className="flex items-center border-b border-gray-100 pb-3 mb-3">
        <span className="ml-2 font-bold text-xl">⚡️ 3days free </span>
        <span className="ml-2 text-red-500 font-bold text-xl">
          {" "}
          - no payment now
        </span>
      </div>

      {/* Features List */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </ul>
    </div>

    {/* Footer */}
    <div className="bg-[#323232] text-[#8A8C8D] px-4 py-2 text-sm shadow ">
      After 3 days free access, your subscription starts at {newPrice} billed
      every monthly.
      <span className="text-[#B8E1FE] cursor-pointer ml-1">
        Cancel Anytime*
      </span>
    </div>
  </div>
);

export default PricingPlan;
