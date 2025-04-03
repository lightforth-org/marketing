import Image from "next/image";

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-x-5">
    <Image src="/icons/check.svg" alt="Check" width={14} height={14} />
    <span className="text-sm md:text-md">{text}</span>
  </li>
);

export default FeatureItem;
