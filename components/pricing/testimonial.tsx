import Image from "next/image";
const Testimonial = ({
  quote,
  role,
  company,
  imageSrc,
}: {
  quote: string;
  role: string;
  company: string;
  imageSrc?: string;
}) => (
  <div className="flex items-center w-full gap-x-2">
    <div>
      <Image
        src="/icons/round-arrow-up.svg"
        alt="RoundArrowUp"
        width={80}
        height={80}
      />
    </div>
    <div className="bg-[#F5F5F5] flex items-center p-2 gap-x-2">
      <div>
        <p className="text-xs font-semibold text-gray-700">{quote}</p>
        <p className="text-xs text-gray-500 mt-1">
          {role}, {company}
        </p>
      </div>
      <div className="relative flex-shrink-0">
        <Image
          src={imageSrc ?? ""}
          alt="Testimonial"
          className="rounded-md"
          width={60}
          height={60}
        />
      </div>
    </div>
  </div>
);

export default Testimonial;
