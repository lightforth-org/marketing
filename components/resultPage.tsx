import Image from 'next/image';

// Image paths - replace these with your actual image paths
const resultImages = [
  '/images/result1.png',
  '/images/result2.png',
  '/images/result3.png',
  '/images/result4.png',
];

const ResultsGallerySection = () => {
  // const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative vertical dotted line on the left */}
      <div className="absolute left-12 top-0 bottom-0 border-l-2 border-dashed border-blue-300 opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            MORE RESULTS?
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold uppercase">
            SEE RECIPTS
          </h3>
        </div>

        {/* Images Grid */}
        <div className="flex  justify-center gap-2">
          {resultImages.map((src, index) => (
            <div
              key={index}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <Image
                src={src}
                alt={`Result ${index + 1}`}
                className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                width={400}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsGallerySection;
