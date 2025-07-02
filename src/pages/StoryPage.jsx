import React, { useState, useEffect } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import StoryDisplay from "@/components/StoryDisplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const StoryPage = () => {
  const [file, setFile] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState("None");
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const [activeTab, setActiveTab] = useState("Filters");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [aspect, setAspect] = useState(9 / 16); 

  const [storyCaption, setStoryCaption] = useState("");
  const [storyVisibility, setStoryVisibility] = useState("followers");
  const [storyTags, setStoryTags] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

const filterMap = {
  None: "",
  Grayscale: "grayscale(100%)",
  Sepia: "sepia(100%)",
  Blur: "blur(2px)",
  Brightness: "brightness(120%)",
  Contrast: "contrast(120%)",
  Invert: "invert(100%)",
  HueRotate: "hue-rotate(90deg)",
  Opacity: "opacity(70%)",
  DropShadow: "drop-shadow(2px 4px 6px black)",

  Cool: "contrast(110%) brightness(105%) saturate(130%) hue-rotate(180deg)",
  Warm: "contrast(110%) brightness(105%) saturate(130%) hue-rotate(340deg)",
  Vintage: "sepia(50%) contrast(90%) brightness(110%)",
  Retro: "sepia(30%) saturate(150%) contrast(90%) hue-rotate(340deg)",
  Fade: "brightness(120%) contrast(80%)",
  Dramatic: "contrast(140%) brightness(90%) saturate(120%)",
  Soft: "brightness(110%) contrast(90%) saturate(110%) blur(1px)",
  Dreamy: "brightness(120%) saturate(140%) blur(1px)",
  BlackWhiteStrong: "grayscale(100%) contrast(150%)",
  BlackWhiteSoft: "grayscale(100%) contrast(80%) brightness(110%)",
  Ocean: "contrast(120%) brightness(110%) hue-rotate(180deg) saturate(130%)",
  Forest: "contrast(110%) brightness(105%) hue-rotate(60deg) saturate(140%)",
  Sunset: "contrast(115%) brightness(105%) hue-rotate(30deg) saturate(130%)",
  Cinematic: "contrast(120%) brightness(90%) saturate(110%)",
  GoldenHour: "contrast(110%) brightness(105%) sepia(20%) hue-rotate(350deg)",
  Midnight: "brightness(80%) contrast(130%) saturate(110%) hue-rotate(210deg)",
  Lavender: "contrast(100%) brightness(105%) hue-rotate(270deg) saturate(130%)",
  PinkPop: "contrast(110%) brightness(105%) hue-rotate(300deg) saturate(140%)",
  Arctic: "contrast(120%) brightness(110%) hue-rotate(190deg) saturate(120%)",
  Noir: "grayscale(100%) contrast(120%) brightness(90%)",
  Clarity: "contrast(130%) brightness(105%) saturate(115%)",
  Film: "sepia(25%) contrast(105%) brightness(100%) saturate(120%)",
  SoftPastel: "brightness(110%) contrast(90%) saturate(120%) opacity(90%)",
  Shadow: "contrast(120%) brightness(90%) drop-shadow(4px 4px 6px black)",

  // Instagram-style inspired
  Clarendon: "contrast(130%) saturate(125%) brightness(105%)",
  Gingham: "brightness(105%) contrast(90%) sepia(20%)",
  Moon: "grayscale(100%) contrast(110%) brightness(90%)",
  Lark: "brightness(115%) saturate(110%) contrast(105%)",
  Reyes: "brightness(120%) contrast(85%) sepia(20%)",
  Juno: "contrast(130%) saturate(140%)",
  Slumber: "brightness(105%) contrast(90%) sepia(35%)",
  Crema: "brightness(110%) contrast(90%) sepia(20%)",
  Ludwig: "brightness(100%) contrast(105%) saturate(110%)",
  Aden: "brightness(120%) contrast(90%) hue-rotate(20deg) sepia(20%)",
  Perpetua: "brightness(115%) contrast(100%) saturate(110%) hue-rotate(30deg)",
  Amaro: "brightness(110%) contrast(90%) sepia(20%)",
  Mayfair: "contrast(110%) brightness(105%) drop-shadow(0 0 10px rgba(255,200,150,0.4))",
  Valencia: "sepia(25%) brightness(110%) contrast(90%)",
  Rise: "brightness(120%) contrast(90%) sepia(20%)",
  Hudson: "contrast(120%) brightness(105%) hue-rotate(180deg)",
  Sierra: "contrast(90%) brightness(110%) sepia(15%)",
  Willow: "grayscale(100%) brightness(105%) contrast(95%)",
  XPro2: "contrast(150%) saturate(130%) brightness(90%)",
  LoFi: "contrast(150%) saturate(150%) brightness(95%)",
  Earlybird: "sepia(25%) brightness(115%) contrast(100%)",
  Toaster: "sepia(30%) brightness(90%) contrast(130%)",
  Brannan: "contrast(140%) brightness(95%) sepia(20%)",
  Hefe: "contrast(140%) saturate(130%) brightness(95%)",
  Nashville: "contrast(90%) brightness(110%) sepia(25%) hue-rotate(350deg)"
};




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setCurrentUserId(data.user._id);
          console.log("✅ User ID loaded:", data.user._id);
        } else {
          console.warn("⚠️ User info not loaded:", data.message);
        }
      } catch (err) {
        console.error("❌ Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImg = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );
      setCroppedImage(croppedImg);
      console.log("✅ Cropped image generated");
      setStep(2);
    } catch (e) {
      console.error("❌ Cropping failed:", e);
      alert("Cropping failed. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setShowDialog(true);
      setStep(1);
      console.log("📂 File selected:", selected.name);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const applyFiltersToCanvas = async () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = croppedImage;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');

        ctx.filter = `
          brightness(${adjustments.brightness}%)
          contrast(${adjustments.contrast}%)
          saturate(${adjustments.saturation}%)
          ${filterMap[filters]}
        `.trim();

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas export failed'));
        }, 'image/jpeg');
      };

      img.onerror = (e) => reject(new Error('Image load failed: ' + e.message));
    });
  };


const handleUpload = async () => {
  if (!currentUserId) {
    alert("Missing user ID");
    return;
  }

  setLoading(true);
  setProgress(0);

  try {
    const blob = await applyFiltersToCanvas();

    // Convert blob to base64
    const base64 = await fileToBase64(blob);

    console.log("🚀 Uploading filtered image...");

    const response = await axios.post(
      "http://localhost:4000/api/stories/upload",
      {
        fileName: file.name,
        fileData: `data:${blob.type};base64,${base64}`,
        caption: storyCaption,
        visibility: storyVisibility,
        author: currentUserId,
      },
      {
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
            console.log(`📤 Upload progress: ${percent}%`);
          }
        },
      }
    );

    setProgress(100);
    setAlertType("success");
    setAlertMsg("Upload successful!");
    console.log("✅ Upload successful:", response.data);
    setLoading(false);
    resetFlow();
  } catch (err) {
    console.error("❌ Upload failed:", err);
    setAlertType("error");
    setAlertMsg("Upload failed! Try again.");
    setLoading(false);
  }
};


  const resetFlow = () => {
    setFile(null);
    setShowDialog(false);
    setStep(1);
    setFilters("None");
    setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
    setProgress(0);
    setAlertMsg(null);
    setStoryCaption("");
    setStoryVisibility("followers");
    setStoryTags("");
    console.log("🔄 Flow reset");
  };

  const getFilterStyle = () => ({
    filter: `
      brightness(${adjustments.brightness}%)
      contrast(${adjustments.contrast}%)
      saturate(${adjustments.saturation}%)
      ${filterMap[filters]}
    `.trim(),
  });

  return (
    <div className="p-4">
      <label
        htmlFor="story-upload"
        className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
      >
        +
      </label>
      <input
        id="story-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg w-[90vw] md:w-[calc(100vw-100px)] max-w-[1200px] h-[90vh] md:h-[600px] p-4 overflow-hidden flex flex-col">
            <button
              onClick={resetFlow}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              ✖
            </button>

            {file && step === 1 && (
              <div className="flex flex-col h-full">
                <div className="relative w-full flex-1 bg-black">
                  <Cropper
                    image={URL.createObjectURL(file)}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="bg-white/80 p-2 rounded mt-2">
                  <div className="flex gap-2 justify-center flex-wrap mb-2">
                    <Button size="sm" onClick={() => setAspect(9 / 16)}>
                      Story 9:16
                    </Button>
                    <Button size="sm" onClick={() => setAspect(1)}>
                      Post 1:1
                    </Button>
                    <Button size="sm" onClick={() => setAspect(4 / 3)}>
                      Landscape 4:3
                    </Button>
                    <Button size="sm" onClick={() => setAspect(3 / 4)}>
                      Portrait 3:4
                    </Button>
                  </div>

                  {/* 🌟 THIS IS THE TRANSFORMATION SCALE SLIDER */}
                  <label className="block text-xs font-medium mb-1 text-center">
                    Zoom / Scale
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />

                  <div className="flex gap-2 mt-2 justify-center">
                    <Button variant="secondary" onClick={resetFlow}>
                      Cancel
                    </Button>
                    <Button onClick={showCroppedImage}>Next</Button>
                  </div>
                </div>
              </div>
            )}


            {file && step === 2 && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Left: Cropped image preview */}
                <div className="md:w-2/3 flex items-center justify-center h-[300px] md:h-full">
                  <img
                    src={croppedImage}
                    alt="preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={getFilterStyle()}
                  />
                </div>

                {/* Right: Filters & Adjustments */}
                <div className="flex flex-col md:w-1/3 h-full overflow-y-auto p-2 space-y-2">
                  
                  {/* Tabs */}
                  <div className="flex gap-1 mb-2">
                    <Button
                      size="sm"
                      variant={activeTab === "Filters" ? "default" : "outline"}
                      onClick={() => setActiveTab("Filters")}
                    >
                      Filters
                    </Button>
                    <Button
                      size="sm"
                      variant={activeTab === "Adjustments" ? "default" : "outline"}
                      onClick={() => setActiveTab("Adjustments")}
                    >
                      Adjustments
                    </Button>
                  </div>

                  {/* Filters tab */}
                  {activeTab === "Filters" && (
                    <>
                      {/* Desktop vertical filters */}
                      <div className="hidden md:block">
                        <div className="flex flex-col gap-2">
                          {Object.keys(filterMap).map((f) => (
                            <div
                              key={f}
                              className={`border ${
                                filters === f ? "border-blue-500" : "border-gray-300"
                              } rounded p-1 cursor-pointer`}
                              onClick={() => setFilters(f)}
                            >
                              <img
                                src={croppedImage}
                                alt={f}
                                className="w-full h-12 object-cover rounded"
                                style={{ filter: filterMap[f] }}
                              />
                              <div className="text-xs text-center">{f}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mobile swiper filters */}
                      <div className="md:hidden">
                        <Swiper
                          slidesPerView={3}
                          spaceBetween={12}
                          modules={[FreeMode]}
                          resistanceRatio={0}
                          watchOverflow={true}
                          loop={false}
                          centeredSlides={false}
                          breakpoints={{
                            640: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            1024: { slidesPerView: 6 },
                          }}
                        >
                          {Object.keys(filterMap).map((f) => (
                            <SwiperSlide key={f} className="!w-auto">
                              <div
                                className={`border ${
                                  filters === f ? "border-blue-500" : "border-gray-300"
                                } rounded p-1 cursor-pointer w-20 h-24 flex flex-col items-center`}
                                onClick={() => setFilters(f)}
                              >
                                <img
                                  src={croppedImage}
                                  alt={f}
                                  className="w-full h-12 object-cover rounded mb-1"
                                  style={{ filter: filterMap[f] }}
                                />
                                <div className="text-[10px] text-center">{f}</div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </>
                  )}

                  {/* Adjustments tab */}
                  {activeTab === "Adjustments" && (
                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="text-xs">Brightness</label>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={adjustments.brightness}
                          onChange={(e) =>
                            setAdjustments({
                              ...adjustments,
                              brightness: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs">Contrast</label>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={adjustments.contrast}
                          onChange={(e) =>
                            setAdjustments({
                              ...adjustments,
                              contrast: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs">Saturation</label>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={adjustments.saturation}
                          onChange={(e) =>
                            setAdjustments({
                              ...adjustments,
                              saturation: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Proceed button */}
                  <Button
                    className="w-full mt-2"
                    onClick={() => setStep(3)}
                  >
                    Next: Add Details
                  </Button>
                </div>
              </div>
            )}


            {file && step === 3 && (
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/3 flex items-center justify-center h-[300px] md:h-full">
                  <img
                    src={croppedImage}
                    alt="preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={getFilterStyle()}
                  />
                </div>
                <div className="flex flex-col md:w-1/3 h-full overflow-y-auto p-2 space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Caption
                    </label>
                    <Textarea
                      placeholder="Write a caption..."
                      value={storyCaption}
                      onChange={(e) => setStoryCaption(e.target.value)}
                      maxLength={1000}
                      className="resize-none"
                    />
                    <div className="text-xs text-right text-gray-500">
                      {storyCaption.length}/1000
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Visibility
                    </label>
                    <Select
                      value={storyVisibility}
                      onValueChange={setStoryVisibility}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="followers">Followers</SelectItem>
                        <SelectItem value="favourite">Favourite</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <Input
                      placeholder="Tag friends (coming soon)"
                      value={storyTags}
                      onChange={(e) => setStoryTags(e.target.value)}
                      disabled
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Post Story"}
                  </Button>

                  {loading && (
                    <div className="text-xs text-center mt-1">
                      Uploading... {progress}%
                    </div>
                  )}
                  {alertMsg && (
                    <div
                      className={`mt-1 text-xs text-center ${
                        alertType === "success"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {alertMsg}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <StoryDisplay />
    </div>
  );
};

export default StoryPage;
