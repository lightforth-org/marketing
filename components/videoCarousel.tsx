import { useState } from "react";

// Video data structure
interface Video {
  id: string;
  title: string;
  src: string;
  type: "youtube" | "instagram";
}

// Component to display a single video
const VideoCard = ({ video }: { video: Video }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract YouTube ID from different URL formats
  const extractYoutubeId = (url: string) => {
    // Handle shorts format
    if (url.includes("youtube.com/shorts/")) {
      return url.split("youtube.com/shorts/")[1].split("?")[0];
    }

    // Handle standard YouTube URLs
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  // Function to extract Instagram post ID
  const extractInstagramId = (url: string) => {
    // Extract the Instagram post ID from URL
    if (url.includes("instagram.com/p/")) {
      return url.split("instagram.com/p/")[1].split("/")[0];
    }
    return "";
  };

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg">
      {video.type === "youtube" && (
        <div className="relative pb-[150.7%] object-cover">
          {" "}
          {/* 16:9 aspect ratio */}
          <iframe
            src={`https://www.youtube.com/embed/${extractYoutubeId(
              video.src
            )}?mute=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0 object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse"></div>
          )}
        </div>
      )}

      {video.type === "instagram" && (
        <>
          {" "}
          {/* Square aspect ratio for Instagram */}
          <iframe
            src={`https://www.instagram.com/p/${extractInstagramId(
              video.src
            )}/embed/`}
            title={video.title}
            // className="absolute inset-0 w-full h-full border-0"
            className="relative w-full h-full border-0"
            height={700}
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
          {/* {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse"></div>
          )} */}
        </>
      )}
    </div>
  );
};

const VideoGrid = () => {
  // Video data with the links you provided
  const videos: Video[] = [
    {
      id: "video1",
      title: "Short Video 1",
      src: "https://youtube.com/shorts/02SQZIeRI3U",
      type: "youtube",
    },
    {
      id: "video2",
      title: "Short Video 2",
      src: "https://youtube.com/shorts/UPjBnXtEoZc",
      type: "youtube",
    },
    {
      id: "video3",
      title: "Short Video 3",
      src: "https://youtube.com/shorts/VqNAgQpJGng",
      type: "youtube",
    },
    {
      id: "video4",
      title: "Short Video 4",
      src: "https://youtube.com/shorts/a0tnYSMtLDA",
      type: "youtube",
    },
    // {
    //   id: "video4",
    //   title: "Instagram Post",
    //   src: "https://www.instagram.com/p/DJULXYKujGb/",
    //   type: "insctagram",
    // },
  ];

  return (
    <div className="container mx-auto px-2 md:px-4 md:py-8 space-y-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl uppercase text-black md:text-4xl font-extrabold leading-tight md:leading-snug">
          {`Your current job search strategy isn’t working. That’s why you’re here.`}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
