"use client";
import {
  AspectRatio,
  colorSchemes,
  dummyThumbnails,
  IThumbnail,
  ThumbnailStyle,
} from "@/public/assets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SoftBackdrop from "../common/SoftBackdrop";
import AspectRatioSelector from "./AspectRatioSelector";
import StyleSecletor from "./StyleSecletor";
import ColorSchemeSelector from "./ColorSchemeSelector";
import PreviewPannel from "./PreviewPannel";

const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRation, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorScheme, setColorScheme] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [dropdown, setDropdown] = useState(false);

  const handleGenerate = async () => {};
  const fetchThumbnail = async () => {
    if (id) {
      const thumbnail: any = dummyThumbnails.find(
        (thumbnail) => thumbnail?._id === id
      );
      setThumbnail(thumbnail);
      setAdditionalDetails(thumbnail.user_prompt);
      setTitle(thumbnail.title);
      setColorScheme(thumbnail.color_scheme);
      setAspectRatio(thumbnail.aspect_ratio);
      setStyle(thumbnail.style);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchThumbnail();
    }
  }, [id]);

  return (
    <>
      <SoftBackdrop />
      <div className="wrapper min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* left side start */}
            <div
              className={`w-full md:w-[40%] space-y-6 ${
                id && "pointer-events-none"
              }`}
            >
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    Create your thumbnail
                  </h2>
                  <p className="text-sm font-normal text-zinc-100">
                    Describe your vision and let AI bring into it live
                  </p>
                </div>

                <div className="space-y-6">
                  {/* label input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., 10 Tips for better sleep "
                      className="w-full px-4 py-3 border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs font-normal text-zinc-400">
                        {title.length}/100
                      </span>
                    </div>
                  </div>
                </div>
                {/* label input end */}

                {/* aspectRatioSelector  */}
                <AspectRatioSelector
                  value={aspectRation}
                  onChange={setAspectRatio}
                />
                <StyleSecletor
                  value={style}
                  onChange={setStyle}
                  isOpen={dropdown}
                  setIsOpen={setDropdown}
                />

                <ColorSchemeSelector
                  value={colorScheme}
                  onChange={setColorScheme}
                />

                {/* details start  */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Additional Prompts{" "}
                    <span className="text-xs text-zinc-400">(Optional)</span>
                  </label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows={3}
                    placeholder="and any speechify elements , mood or style preferences..."
                    className="w-full px-4 py-3 border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg resize-none"
                  />
                </div>
                {/* details end  */}

                {/* button  */}

                {!id && (
                  <button
                    onClick={handleGenerate}
                    className="text-base w-full py-3.5 font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors rounded-xl "
                  >
                    {" "}
                    {loading ? "Generating..." : "Generate Thumbnail"}
                  </button>
                )}
              </div>
            </div>
            {/* left side end */}

            {/* right side start  */}
            <div className="w-full md:w-[60%]">
              <div className="p-6 rounded-xl bg-white/8 border border-white/10 shadow-xl ">
                <h2 className="text-xl font-semibold text-zinc-100 mb-3">
                  Preview{" "}
                </h2>
                <PreviewPannel
                  aspectRatio={aspectRation}
                  isLoading={loading}
                  thumbnail={thumbnail}
                />
              </div>
            </div>
            {/* right side end  */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
