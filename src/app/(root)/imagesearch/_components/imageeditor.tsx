"use client";

import React, { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { FaSearch } from "react-icons/fa";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageEditorProps {
  previewSrc: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  handleClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ImageEditor({
  previewSrc,
  setSelectedFile,
  handleSubmit,
  handleClear,
}: ImageEditorProps) {
  const [maskApplied, setMaskApplied] = useState(false);
  const [editedUrl, setEditedUrl] = useState<string>("");
  const [brushRadius, setBrushRadius] = useState(4);
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<CanvasDraw>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgWidth, setImgWidth] = useState(200);
  const [imgHeight, setImgHeight] = useState(384);

  useEffect(() => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.clientWidth);
      setImgHeight(imgRef.current.clientHeight);
    }
  }, [previewSrc]);

  const handleApplyMask = () => {
    if (!canvasRef.current) return;
    const drawingDataUrl = (canvasRef.current as unknown as { getDataURL(format: string): string }).getDataURL("png");
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    const baseImage = new window.Image() as HTMLImageElement;
    baseImage.crossOrigin = "anonymous";
    baseImage.src = previewSrc;

    baseImage.onload = () => {
      const naturalWidth = baseImage.naturalWidth;
      const naturalHeight = baseImage.naturalHeight;

      offCanvas.width = naturalWidth;
      offCanvas.height = naturalHeight;

      offCtx.fillStyle = "white";
      offCtx.fillRect(0, 0, naturalWidth, naturalHeight);
      offCtx.drawImage(baseImage, 0, 0, naturalWidth, naturalHeight);

      const drawingImage = new window.Image() as HTMLImageElement;
      drawingImage.crossOrigin = "anonymous";
      drawingImage.src = drawingDataUrl;

      drawingImage.onload = () => {
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = naturalWidth;
        maskCanvas.height = naturalHeight;
        const maskCtx = maskCanvas.getContext("2d");
        if (!maskCtx) return;

        maskCtx.drawImage(
          drawingImage,
          0, 0, imgWidth, imgHeight,
          0, 0, naturalWidth, naturalHeight
        );

        const imageData = maskCtx.getImageData(0, 0, naturalWidth, naturalHeight);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 50) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;
          } else {
            data[i + 3] = 0;
          }
        }

        maskCtx.putImageData(imageData, 0, 0);

        offCtx.globalCompositeOperation = "destination-in";
        offCtx.drawImage(maskCanvas, 0, 0, naturalWidth, naturalHeight);

        offCtx.globalCompositeOperation = "destination-over";
        offCtx.fillStyle = "white";
        offCtx.fillRect(0, 0, naturalWidth, naturalHeight);

        offCanvas.toBlob((blob) => {
          if (blob) {
            const editedFile = new File([blob], "edited.png", { type: blob.type });
            setSelectedFile(editedFile);
            const url = URL.createObjectURL(blob);
            setEditedUrl(url);
            setMaskApplied(true);
            setHasDrawn(false);
          }
        }, "image/png");
      };
    };
  };

  const handleClearMask = (e: React.FormEvent) => {
    setMaskApplied(false);
    setHasDrawn(false);
    setEditedUrl("");
    if (canvasRef.current) canvasRef.current.clear();
    if (handleClear) handleClear(e as unknown as React.MouseEvent<HTMLButtonElement>);
  };

  const handleCancelDrawing = () => {
    setHasDrawn(false);
    if (canvasRef.current) canvasRef.current.clear();
  };

  return (
    <div className="w-full max-w-[600px] mt-10 flex flex-col items-center gap-4 p-6 border border-gray-700 rounded-3xl bg-gray-900/30 text-center shadow-2xl relative">
      <h1 className="text-xl md:text-2xl font-bold text-orange-500">Shade the area to refine your search</h1>
      <div className="relative w-full flex justify-center">
        {maskApplied ? (
          <div className="relative w-[200px] md:w-[250px] h-96 rounded-2xl overflow-hidden border-2 border-gray-600 shadow-md">
            <Image
              src={editedUrl}
              alt="Edited Preview"
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        ) : (
          <>
            <div
              ref={imgRef}
              className="relative w-[200px] md:w-[250px] aspect-[3/5] rounded-2xl overflow-hidden border-2 border-gray-600 shadow-md"
            >
              <Image
                src={previewSrc}
                alt="Preview"
                fill
                className="object-cover rounded-2xl"
                onLoadingComplete={() => {
                  if (imgRef.current) {
                    setImgHeight(imgRef.current.clientHeight);
                    console.log("Image loaded, height:", imgRef.current.clientHeight);
                  }
                }}
              />
            </div>
            <div className="absolute pointer-events-auto flex justify-center items-center" style={{ width: imgWidth, height: imgHeight }}>
              <CanvasDraw
                ref={canvasRef}
                brushColor="rgba(255, 165, 0, 0.8)"
                brushRadius={brushRadius}
                lazyRadius={0}
                canvasWidth={imgWidth}
                canvasHeight={imgHeight}
                hideGrid
                style={{ background: "transparent" }}
                onChange={() => setHasDrawn(true)}
              />
            </div>
          </>
        )}
      </div>

      {!maskApplied && (
        <div className="w-full flex items-center justify-center gap-2">
          <label htmlFor="brush-size" className="text-white font-bold">
            Brush:
          </label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="50"
            value={brushRadius}
            onChange={(e) => setBrushRadius(Number(e.target.value))}
            className="w-40 accent-orange-800"
            style={{ accentColor: "orange" }}
          />
          <span className="text-white">{brushRadius}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {!hasDrawn ? (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={handleSubmit}
            >
              <FaSearch className="w-5 h-5" /> Search
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500/10 font-semibold rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={(e) => {
                handleClearMask(e);
                if (handleClear) handleClear(e as unknown as React.MouseEvent<HTMLButtonElement>);
              }}
            >
              <X className="w-5 h-5" /> Clear
            </button>
          </>
        ) : (
          <>
            <button
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={handleApplyMask}
            >
              Apply
            </button>
            <button
              className="flex-1 px-4 py-2 border border-gray-400 text-gray-300 hover:bg-gray-500/20 font-semibold rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleCancelDrawing}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
