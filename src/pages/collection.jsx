

import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StoryDisplay from "@/components/StoryDisplay";

const Collection = () => {
  const [file, setFile] = useState(null);
  const [filters, setFilters] = useState("");
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("Filters");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertType, setAlertType] = useState("success");

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
  };
  const filterNames = Object.keys(filterMap);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setStep(1);
      setShowDialog(true);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    setAlertMsg(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        for (let i = 1; i <= 80; i += 10) {
          setProgress(i);
          await new Promise((r) => setTimeout(r, 100));
        }

        await axios.post(
          "http://localhost:4000/api/stories/upload",
          {
            fileName: file.name,
            fileData: reader.result,
            filters,
            adjustments,
          },
          {
            onUploadProgress: (e) => {
              if (e.total) {
                const percent = Math.round((e.loaded * 100) / e.total);
                setProgress(percent);
              }
            },
          }
        );

        setProgress(100);
        setAlertType("success");
        setAlertMsg("Upload successful!");
        setLoading(false);

        setTimeout(() => {
          resetFlow();
        }, 1500);

      } catch (err) {
        console.error("Upload failed", err);
        setAlertType("error");
        setAlertMsg("Upload failed! Please try again.");
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetFlow = () => {
    setFile(null);
    setFilters("");
    setAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
    setShowDialog(false);
    setActiveTab("Filters");
    setProgress(0);
    setAlertMsg(null);
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${adjustments.brightness}%)
        contrast(${adjustments.contrast}%)
        saturate(${adjustments.saturation}%)
        ${filterMap[filters] || ""}
      `.trim(),
    };
  };

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
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Dialog open={showDialog} onOpenChange={resetFlow}>
        <DialogContent className="w-[calc(100vw-200px)] h-[calc(100vh-200px)] p-4 overflow-hidden">
          {file && step === 1 && (
            <div className="flex flex-col items-center justify-center h-full">
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-full h-full max-w-full max-h-full object-contain rounded-lg shadow mb-4"
              />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={resetFlow}>Cancel</Button>
                <Button onClick={() => setStep(2)}>Next</Button>
              </div>
            </div>
          )}

          {file && step === 2 && (
            <div className="flex h-full">
              <div className="w-2/3 pr-2 flex items-center justify-center overflow-hidden">
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="w-full h-full max-w-full max-h-full object-contain rounded-lg"
                  style={getFilterStyle()}
                />
              </div>

              <div className="w-1/3 flex flex-col h-full overflow-hidden">
                <div className="flex gap-2 mb-2">
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

                <div className="flex-1 overflow-y-auto">
                  {activeTab === "Filters" && (
                    <div className="grid grid-cols-2 gap-2">
                      {filterNames.map((f) => (
                        <div
                          key={f}
                          className={`border ${
                            filters === f ? "border-blue-500" : "border-gray-300"
                          } rounded p-1 cursor-pointer`}
                          onClick={() => setFilters(f)}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={f}
                            className="w-full h-16 object-cover rounded"
                            style={{ filter: filterMap[f] }}
                          />
                          <div className="text-xs text-center">{f}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "Adjustments" && (
                    <div className="flex flex-col gap-2 mt-2">
                      {["brightness", "contrast", "saturation"].map((adj) => (
                        <div key={adj}>
                          <label className="text-xs">
                            {adj.charAt(0).toUpperCase() + adj.slice(1)}
                          </label>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={adjustments[adj]}
                            onChange={(e) =>
                              setAdjustments({
                                ...adjustments,
                                [adj]: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <Button className="w-full" onClick={handleUpload} disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                  </Button>

                  {loading && (
                    <div className="text-xs text-center mt-1">
                      Uploading... {progress}%
                    </div>
                  )}

                  {alertMsg && (
                    <div
                      className={`mt-1 text-xs text-center ${
                        alertType === "success" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {alertMsg}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <StoryDisplay />
    </div>
  );
};

export default Collection;
