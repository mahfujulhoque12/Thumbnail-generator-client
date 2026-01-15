"use client";
import { IThumbnail } from "@/public/assets";
import { useParams } from "next/navigation";
import { useState } from "react";
import SoftBackdrop from "../common/SoftBackdrop";

const Generate = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SoftBackdrop />
      <div className="wrapper min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* left side start */}
            <div className={`space-y-6 ${slug && "pointer-events-none"}`}>
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
                  </div>
                </div>

                {/* button  */}

                {!slug && (
                  <button className="text-base w-full py-3.5 font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors rounded-xl ">
                    {" "}
                    {loading ? "Generating..." : "Generate Thumbnail"}
                  </button>
                )}
              </div>
            </div>
            {/* left side end */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
