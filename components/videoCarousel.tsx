import { useRef, useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <div
      className="flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg"
      style={{
        width: '400px',
        height: '618px',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}?mute=0`}
        title={video.title}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const VideoCarousel = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Video data with YouTube IDs
  const videos = [
    {
      id: 'video1',
      title: 'Video 1',
      youtubeId: 'VqNAgQpJGng',
    },
    {
      id: 'video2',
      title: 'Video 2',
      youtubeId: 'UPjBnXtEoZc',
    },
    {
      id: 'video3',
      title: 'Video 3',
      youtubeId: 'oRCGjicLWkQ',
    },
    {
      id: 'video4',
      title: 'Video 4',
      youtubeId: 'oRCGjicLWkQ',
    },
  ];

  // Create duplicates for seamless looping
  const allVideos = [...videos, ...videos, ...videos];

  // Autoscroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isScrolling) return;

    let animationId: number;
    const scrollSpeed = 1; // Adjust speed as needed

    const scroll = () => {
      if (!scrollContainer) return;

      scrollContainer.scrollLeft += scrollSpeed;

      // Reset scroll position when needed for infinite loop
      if (
        scrollContainer.scrollLeft >=
        (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2
      ) {
        scrollContainer.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isScrolling]);

  // Pause scrolling when mouse is over the carousel
  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <div className="w-full py-8">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {allVideos.map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} />
        ))}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoCarousel;
