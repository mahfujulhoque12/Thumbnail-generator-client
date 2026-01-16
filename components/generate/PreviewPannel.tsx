import { AspectRatio, IThumbnail } from "@/public/assets";
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";

const PreviewPannel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  // Function to open image in new tab
  const openThumbnailInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent
    if (!thumbnail?.image_url) return;

    // Check if image_url is a string or an imported image object
    let imageUrl: string;

    if (typeof thumbnail.image_url === "string") {
      // If it's already a string URL
      imageUrl = thumbnail.image_url;
    } else if (thumbnail.image_url && typeof thumbnail.image_url === "object") {
      // If it's an imported image object, get the src property
      // Type assertion to handle the imported image object
      const imgObj = thumbnail.image_url as any;
      imageUrl = imgObj.src || imgObj.default?.src || "";
    } else {
      return;
    }

    if (!imageUrl) return;

    // Open image in new tab
    const newWindow = window.open(imageUrl, "_blank", "noopener,noreferrer");

    // Security best practice
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  // Helper function to get the actual image URL
  const getImageUrl = () => {
    if (!thumbnail?.image_url) return "";

    if (typeof thumbnail.image_url === "string") {
      return thumbnail.image_url;
    } else if (thumbnail.image_url && typeof thumbnail.image_url === "object") {
      const imgObj = thumbnail.image_url as any;
      return imgObj.src || imgObj.default?.src || "";
    }
    return "";
  };

  // Get the actual image source for display
  const imageSrc = getImageUrl();

  return (
    <div className="relative mx-auto max-w-2xl w-full">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
        {/* loading start  */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
            <Loader2Icon className="text-zinc-400 size-8 animate-spin" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is creating your thumbnails
              </p>
              <p className="text-xs font-medium text-zinc-400 mt">
                This may take 10-20 seconds
              </p>
            </div>
          </div>
        )}
        {/* loading end  */}

        {/* image preview  */}
        {!isLoading && imageSrc && (
          <div className="relative w-full h-full group">
            {/* Image */}
            <Image
              src={imageSrc}
              alt={thumbnail?.title || "Thumbnail"}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />

            {/* Overlay with button */}
            <div className="absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={openThumbnailInNewTab}
                className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95 cursor-pointer"
              >
                <DownloadIcon className="size-4" /> Open in New Tab
              </button>
            </div>
          </div>
        )}
        {/* image preview  end*/}

        {/* empty state  */}
        {!isLoading && !imageSrc && (
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-white/10 bg-black/25">
            <div className="max-sm:hidden flex size-20 items-center justify-center bg-white/10 rounded-full ">
              <ImageIcon className="text-white size-10 opacity-50" />
            </div>

            <div className="px-4 text-center ">
              <p className="text-sm font-medium text-zinc-200 ">
                Generate Your first Thumbnail
              </p>
              <p className="text-xs text-zinc-400 font-medium">
                Fill Out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPannel;
