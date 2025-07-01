"use client";
import React, { useState, useRef, useCallback, MouseEvent } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import { TbCapture } from "react-icons/tb";
import { X, UploadCloud } from "lucide-react";
import { ImageEditor } from "./imageeditor";
import { FaQuestion } from "react-icons/fa";
import Image from "next/image";

interface ImageUploaderProps {
    onSearch: (image: File) => void;
    loading?: boolean;
    remove: () => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onSearch,
    remove
}) => {
    const [mount, setMount] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
            setCapturedImage(null);
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Error accessing camera");
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");

            if (context) {
                context.translate(canvas.width, 0);
                context.scale(-1, 1);

                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                context.setTransform(1, 0, 0, 1, 0, 0);
                const imageDataUrl = canvas.toDataURL("image/png");
                setCapturedImage(imageDataUrl);
                setSelectedFile(null);
            }
            setIsCameraOpen(false);
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
        }
    };

    const dataURLtoFile = (dataurl: string, filename: string): File => {
        const arr = dataurl.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "";
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile && !capturedImage) {
            setError("Please upload or capture an image.");
            return;
        };
        if (selectedFile) {
            onSearch(selectedFile);
        } else if (capturedImage) {
            const fileFromCaptured = dataURLtoFile(capturedImage, "capturedImage.png");
            onSearch(fileFromCaptured);
        }
        setMount(true);
        setIsExpanded(false);
    };

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setSelectedFile(null);
        remove();
        setCapturedImage(null);
        setError(null);
        setMount(false);
    };

    const previewSrc = capturedImage || (selectedFile ? URL.createObjectURL(selectedFile) : "");
    if (mount && previewSrc) {
        if (!isExpanded) {
            return (
                <div className="fixed bottom-4 right-4 z-50">
                    <div
                        onClick={() => setIsExpanded(true)}
                        className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                    >
                        <Image
                            src={previewSrc}
                            alt="Preview Icon"
                            width={64}
                            height={64}
                            className="rounded-full border-2 border-gray-600 shadow-md object-cover"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black opacity-50 transition-opacity"
                        onClick={() => setIsExpanded(false)}
                    />
                    <div className="relative bg-gray-800 p-9 rounded-3xl shadow-xl z-10 transform transition-all duration-300 w-full max-w-2xl">
                        <div className="relative">
                            <Image
                                src={previewSrc}
                                alt="Preview"
                                className="w-full h-96 object-contain rounded-2xl shadow-md border-2 border-gray-600" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-5">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                onClick={handleSubmit}
                            >
                                <FaQuestion className="w-4 h-4" /> Unexpected Result
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500/10 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                onClick={handleClear}
                            >
                                <X className="w-5 h-5" /> Remove
                            </button>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors focus:outline-none"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            );
        }
    }
    return (
        <div className="pt-10 pb-10 px-3 md:px-4 flex flex-col items-center">
            {!selectedFile && !capturedImage && !isCameraOpen && (
                <div className="flex flex-col items-center gap-7 w-full">
                    <div
                        {...getRootProps()}
                        className={`w-full max-w-3xl p-10 border-2 border-dashed rounded-2xl 
               bg-gray-800/80 cursor-pointer flex flex-col items-center text-center 
               shadow-2xl relative overflow-hidden transition-all duration-300 
                hover:bg-gray-900/90
               group 
               ${isDragActive ? "border-orange-500 bg-gray-900/80 shadow-gray-600/50 scale-105" : "border-gray-600"}`}
                    >
                        <input {...getInputProps()} />
                        <UploadCloud
                            className={`w-28 h-28 mb-6 transition-transform duration-200 
                   group-hover:scale-110 group-hover:text-orange-400 drop-shadow-lg 
                   ${isDragActive ? "text-orange-500 scale-125 -translate-y-4" : "text-orange-500 hover:-translate-y-2"}`}
                        />
                        <p className={`hidden md:block text-gray-300 font-medium text-lg transition-all duration-300 
                  ${isDragActive ? "text-orange-400 animate-pulse " : "group-hover:text-orange-400"}`}>
                            {isDragActive ? "Release to Upload!" : "Drag & drop an image, or click to select"}
                        </p>
                        <p className={`block md:hidden text-gray-300 font-medium text-base transition-all duration-300 
                  ${isDragActive ? "text-orange-400 animate-pulse " : "group-hover:text-orange-400"}`}>
                            {isDragActive ? "Release to Upload!" : "Drag & drop, or click to select"}
                        </p>
                        <p className={`text-xs md:text-sm mt-3 transition-all duration-300 font-medium md:font-none
                  ${isDragActive ? "text-orange-400" : "text-gray-300 group-hover:text-gray-200"}`}>
                            Supported formats: JPG, PNG, JPEG
                        </p>
                        <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-orange-400/10 
                     to-transparent opacity-0 transition-opacity duration-500 rounded-2xl 
                     pointer-events-none 
                     ${isDragActive ? "opacity-100 scale-105 animate-pulse" : "group-hover:opacity-100"}`}>
                        </div>
                    </div>
                    <div className="flex w-full max-w-3xl px-4 items-center justify-center">
                        <hr className="border-b-[1px] border-gray-700 w-full bg-orange-500" />

                        <span className="text-[13px] md:text-[16px] px-4 text-center text-gray-100 uppercase">
                            OR
                        </span>
                        <hr className="border-b-[1px] border-gray-700 w-full bg-orange-500" />

                    </div>
                    <button
                        className="flex items-center gap-2 px-[16px] py-[9px] bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-700 border-[1px] border-gray-100 text-white font-[520] rounded-3xl shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onClick={openCamera}>
                        <FaCamera className="w-[18px] h-[18px] md:w-5 md:h-5" /> <span className="text-sm md:text-[16px]">Capture Photo</span>
                    </button>
                </div>
            )}
            {isCameraOpen && (
                <div className="w-full max-w-[600px] mt-10 flex flex-col items-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-full rounded-xl shadow-md border-2 border-gray-700 transform scale-x-[-1]"
                    />

                    <div className="flex items-center gap-6 mt-6">
                        <button
                            className="flex items-center gap-2 px-[16px] py-[9px] bg-gradient-to-r rounded-3xl from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-[1px] border-gray-100 text-white font-semibold shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onClick={capturePhoto}>
                            <TbCapture className="w-6 h-6" /> Capture
                        </button>
                        <button
                            className="flex items-center gap-2 px-[16px] py-[9px] bg-gray-700 hover:bg-gray-600 rounded-3xl border-[1px] border-gray-100 text-white font-semibold shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onClick={() => {
                                setIsCameraOpen(false);
                                if (videoRef.current && videoRef.current.srcObject) {
                                    const stream = videoRef.current.srcObject as MediaStream;
                                    stream.getTracks().forEach((track) => track.stop());
                                }
                            }}
                        >
                            <X className="w-6 h-6" /> Close
                        </button>
                    </div>
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                </div>
            )}

            {(selectedFile || capturedImage) && !mount && (

                <ImageEditor previewSrc={previewSrc} handleSubmit={handleSubmit} handleClear={handleClear} setSelectedFile={setSelectedFile} />


                // <div className="w-full max-w-[600px] mt-10 flex flex-col items-center gap-6 p-6 border border-gray-700 rounded-3xl bg-gray-800/80 text-center shadow-2xl">
                //     <img
                //         src={previewSrc}
                //         alt="Preview"
                //         className="w-full h-96 object-cover rounded-2xl shadow-md border-2 border-gray-600"
                //     />
                //     <div className="flex flex-col sm:flex-row gap-4 w-full">
                //         <button
                //             className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                //             onClick={handleSubmit}
                //         >
                //             <FaSearch className="w-5 h-5" /> Search
                //         </button>
                //         <button
                //             className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500/10 font-semibold rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                //             onClick={handleClear}
                //         >
                //             <X className="w-5 h-5" /> Clear
                //         </button>
                //     </div>
                // </div>
            )}
            {error && <div className="mt-4 text-red-500 font-medium">{error}</div>}
        </div>
    );
};

export default ImageUploader;
