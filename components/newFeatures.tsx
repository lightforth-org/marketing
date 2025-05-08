import Image from 'next/image';
import { useState, useEffect } from 'react';
import CountdownTimer from './timer';

interface FeatureSectionProps {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  imageRight?: boolean;
  image?: string | boolean;
  isFinal?: boolean;
  onClickScroll?: () => void;
}

const FeatureSection = ({
  number,
  title,
  subtitle,
  description,
  image,
  isFinal = false,
  onClickScroll,
}: FeatureSectionProps) => {
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(56);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <div className=" py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4  ">
        <div className={`flex flex-col md:flex-row items-center gap-8`}>
          {/* Text Content */}
          <div
            className={`${
              isFinal ? 'w-full' : image ? 'w-full' : 'w-full'
            } space-y-3 text-left md:text-center max-w-[494px]`}
          >
            <div className="text-blue-500 text-5xl font-bold mb-3 text-left md:text-center">
              {number}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

            {subtitle && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_62_10327)">
                    <path
                      d="M19.0625 8.52817C20.3531 8.22607 21.6745 8.07506 23 8.07817C36.125 8.07817 43.625 23.0782 43.625 23.0782C42.4868 25.2074 41.1295 27.2121 39.575 29.0594M26.975 27.0532C26.46 27.6058 25.839 28.0491 25.149 28.3565C24.459 28.664 23.7142 28.8293 22.9589 28.8426C22.2036 28.8559 21.4534 28.717 20.753 28.4341C20.0526 28.1512 19.4164 27.7301 18.8822 27.196C18.3481 26.6618 17.927 26.0256 17.6441 25.3252C17.3612 24.6247 17.2222 23.8745 17.2356 23.1193C17.2489 22.364 17.4142 21.6191 17.7216 20.9291C18.0291 20.2391 18.4723 19.6181 19.025 19.1032M34.1375 34.2157C30.9324 36.6588 27.0296 38.0123 23 38.0782C9.875 38.0782 2.375 23.0782 2.375 23.0782C4.70729 18.7317 7.94213 14.9343 11.8625 11.9407L34.1375 34.2157Z"
                      stroke="black"
                      strokeWidth="3.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.375 2.45312L43.625 43.7031"
                      stroke="black"
                      strokeWidth="3.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_62_10327">
                      <rect
                        width="45"
                        height="45"
                        fill="white"
                        transform="translate(0.5 0.578125)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-2xl font-bold text-gray-900 mb-2">
                  {subtitle}
                </span>
              </div>
            )}

            <p className="text-gray-600 text-sm text-center">{description}</p>
          </div>

          {isFinal && (
            <div className="text-center mt-12 md:w-1/2">
              <h3 className="text-3xl font-bold mb-2">
                Try everything
                <br />
                for 3 days for
                <br />
                free
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mt-6">THIS OFFER ENDS IN</p>
                <p className="text-3xl font-bold text-gray-800">
                  <CountdownTimer
                    durationInMinutes={7}
                    className="text-[#0494FC]"
                  />
                </p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full font-bold transition mt-4"
                onClick={onClickScroll}
              >
                Start Getting Jobs - 3 days free
              </button>
            </div>
          )}
          {/* Image Content */}
          {image && (
            <div className="md:w-1/2">
              <Image
                width={600}
                height={400}
                src={typeof image === 'string' ? image : ''}
                alt={title}
                className="w-full h-auto rounded-lg "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewFeaturesSection = ({
  onClickScroll,
}: {
  onClickScroll: () => void;
}) => {
  const features = [
    {
      number: '01',
      title: 'Auto Apply to Global Jobs while you sleep',
      description:
        'Industry-leading, comprehensive courses that are entirely practical. All action, built for purpose. Master: Ideation | Product Development | Marketing | Branding | So much more...',
      image: '/images/jobs.png',
    },
    {
      number: '02',
      title: 'Interview AI Simulator to help you practice interviews.',
      description:
        'Industry-leading, comprehensive courses that are entirely practical. All action, built for purpose. Master: Ideation | Product Development | Marketing | Branding | So much more...',
      image: '/images/copilot.png',
    },
    {
      number: '03',
      title: '1000+ jobs recommended to you daily.',
      description:
        'Industry-leading, comprehensive courses that are entirely practical. All action, built for purpose. Master: Ideation | Product Development | Marketing | Branding | So much more...',
      image: '/images/matchedJobs.png',
    },
    {
      number: '04',
      title: 'AI Interview Co pilot.',
      subtitle: 'Stealth Mode',
      description:
        'Industry-leading, comprehensive courses that are entirely practical. All action, built for purpose. Master: Ideation | Product Development | Marketing | Branding | So much more...',
      image: '/images/copilot2.png',
    },
    {
      number: '04',
      title: 'ATS Resume that gets past bots',
      description:
        'Industry-leading, comprehensive courses that are entirely practical. All action, built for purpose. Master: Ideation | Product Development | Marketing | Branding | So much more...',
      isFinal: true,
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          {` YOU'RE ONE CLICK AWAY FROM`}
          <br />
          INTERVIEW INVITES.
        </h2>
        <p className="text-2xl font-bold text-gray-800">
          AND THE TRIAL IS ON US FOR
          <br />
          FREE, CANCEL ANYTIME
        </p>
      </div>

      {/* Feature Sections */}
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          number={feature.number}
          title={feature.title}
          subtitle={feature.subtitle}
          description={feature.description}
          image={feature.image}
          isFinal={feature.isFinal}
          onClickScroll={onClickScroll}
        />
      ))}
    </div>
  );
};

export default NewFeaturesSection;
