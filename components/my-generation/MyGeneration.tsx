"use client";
import { useEffect, useState } from "react";
import SoftBackdrop from "../common/SoftBackdrop";
import { dummyThumbnails, IThumbnail } from "@/public/assets";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

const MyGeneration = () => {
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>();
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  // Helper function to get image URL from either string or imported object
  const getImageUrl = (imageInput: string | any): string => {
    if (typeof imageInput === "string") {
      return imageInput;
    } else if (imageInput && typeof imageInput === "object") {
      const imgObj = imageInput as any;
      // Try different possible properties
      return (
        imgObj.src ||
        imgObj.default?.src ||
        imgObj.default ||
        (typeof imgObj === "string" ? imgObj : "")
      );
    }
    return "";
  };

  const fetchThumbnails = async () => {
    setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    setLoading(false);
  };

  const handleDownload = (image_url: string | any) => {
    // Check if image_url is a string or an imported image object
    let urlToOpen: string;

    if (typeof image_url === "string") {
      // If it's already a string URL
      urlToOpen = image_url;
    } else if (image_url && typeof image_url === "object") {
      // If it's an imported image object, get the src property
      const imgObj = image_url as any;
      urlToOpen = imgObj.src || imgObj.default?.src || imgObj.default || "";
    } else {
      console.error("Invalid image URL");
      return;
    }

    if (!urlToOpen) return;

    window.open(urlToOpen, "_blank");
  };

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

  return (
    <>
      <SoftBackdrop />
      <div className="px-6 min-h-screen md:px-16 lg:px-24 xl:px-32">
        {/* header  */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-200"> My Generation</h2>
          <p className="text-sm font-medium text-zinc-400 mt-1">
            View and Manage your all AI generated thumbnails
          </p>
        </div>

        {/* loading  */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-2xl bg-white/6 border-white/10 animate-pulse h-[260px]"
              />
            ))}
          </div>
        )}
        {/* loading  end*/}

        {/* empty estate  */}
        {!loading && (!thumbnails || thumbnails.length === 0) && (
          <div className="text-center py-24">
            <h2 className="text-lg font-semibold text-zinc-200">
              No Thumbnails yet
            </h2>
            <p className="text-sm font-normal mt-1 text-zinc-400">
              Generate your 1st thumbnails to see it here
            </p>
          </div>
        )}
        {/* empty estate  end*/}

        {/* grid start  */}

        {!loading && (thumbnails?.length ?? 0) > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {thumbnails?.map((thum: IThumbnail) => {
              const aspectClass =
                aspectRatioClassMap[thum.aspect_ratio || "16:9"];

              return (
                <div
                  key={thum._id}
                  onClick={() => navigate.push(`/generate/${thum._id}`)}
                  className=" group relative cursor-pointer  bg-white/6 rounded-2xl border border-white/10 break-inside-avoid transition shadow-xl"
                >
                  {/* image */}
                  <div
                    className={`relative overflow-hidden rounded-t-2xl h-[200px] w-full ${aspectClass} bg-black`}
                  >
                    {thum.image_url ? (
                      <Image
                        src={thum.image_url}
                        alt="tile"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 "
                      />
                    ) : (
                      <div className="text-sm text-zinc-400 w-full h-full justify-center items-center">
                        {thum.isGenerating ? "Generating... " : " No Image"}
                      </div>
                    )}

                    {thum.isGenerating && (
                      <div className="absolute inset-0 bg-black/50  flex items-center justify-center text-sm font-medium text-white">
                        Generating...
                      </div>
                    )}
                  </div>
                  {/* content  */}
                  <div className="space-y-3 p-4">
                    <h2 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                      {thum.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400 ">
                      <span className="px-2 py-0.5 rouned bg-white/8">
                        {thum.style}
                      </span>
                      <span className="px-2 py-0.5 rouned bg-white/8">
                        {thum.color_scheme}
                      </span>
                      <span className="px-2 py-0.5 rouned bg-white/8">
                        {thum.aspect_ratio}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {new Date(thum.createdAt!).toDateString()}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                  >
                    <TrashIcon
                      onClick={() => handleDelete(thum._id)}
                      className="size-6 bg-black/50 p-1 transition-all hover:bg-pink-600 "
                    />

                    <DownloadIcon
                      onClick={() => handleDownload(thum.image_url!)}
                      className="size-6 bg-black/50 p-1 transition-all hover:bg-pink-600 "
                    />

                    <Link
                      target="_blank"
                      href={`/preview?thumbnail_url=${encodeURIComponent(
                        getImageUrl(thum.image_url)
                      )}&title=${encodeURIComponent(thum.title)}`}
                    >
                      <ArrowUpRightIcon className="size-6 bg-black/50 p-1 transition-all hover:bg-pink-600 " />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
