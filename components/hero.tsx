const HeroSection = () => {
  return (
    <div className="pt-20 pb-5 lg:pt-32 lg:pb-10">
      <div className="md:max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            Here&apos;s How We&apos;ll Flood Your Inbox with
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0494FC] mb-8">
            5+ Job Offers in 21 Days (Or You Don&apos;t Pay!)
          </h2>

          <div
            style={{
              position: "relative",
              paddingTop:
                "56.25%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */,
              width: "100%",
              marginTop: "1.5rem",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/oRCGjicLWkQ"
              title="Lightforth"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
            ></iframe>
          </div>
        </div>
      </div>
      <div className="text-xs md:text-md text-gray-800 text-center mt-4">
        Results are not typical. Individual results may vary.
      </div>
    </div>
  );
};

export default HeroSection;
