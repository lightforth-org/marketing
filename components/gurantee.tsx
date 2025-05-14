import Image from "next/image";

const Gurantee = () => {
  return (
    <section className="max-w-5xl mx-auto rounded-2xl my-10 p-3 bg-[#f7f7f7]">
      <div className="bg-white">
        <div className="h-full py-10 px-4 md:px-6 mx-auto rounded-2xl flex flex-col md:flex-row gap-6 md:gap-10 ">
          {/* Left Side - Badge */}
          <div className="flex-shrink-0 h-full bg-[#831b44] text-white rounded-2xl p-6 flex flex-col items-center justify-center md:w-1/3 w-full text-center md:h-auto">
            <div className="relative">
              <Image
                src="/images/gurantee.png"
                alt="21days gurantee"
                width={344}
                height={130}
              />
            </div>
            <p className="mt-4 md:text-lg font-light">
              {`If you don't land interviews in 21 days, you'll never hear from us
          again (unless you want a refund)`}
            </p>
          </div>

          {/* Right Side - Copy */}
          <div className="space-y-4 md:w-2/3 w-full !text-[#747474]">
            <p className="text-base md:text-lg leading-relaxed">
              {` You're here to land jobs, not "optimize a resume" or listen to
          "motivational speeches".`}
            </p>

            <p className="font-semibold text-base md:text-lg">{`So here's our Promise:`}</p>

            <p className="text-base md:text-lg leading-relaxed">
              {`If Lightforth doesn't help you book real, qualified interviews in the
          next 21 days, we'll give you your money back.`}
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              Why? Because Lightforth wasn’t built to make a passive income. We
              built it to wreck job search anxiety, help people like you lead
              better, fulfilled lives and prove that getting hired can be fast,
              human and on your terms.
            </p>

            <p className="text-base md:text-lg">
              Try it. Use it. Break it if you want.
            </p>

            <p className="text-base md:text-lg font-medium">
              {` But if it doesn't land you interviews? We don’t deserve your money.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gurantee;
