"use client";
import React, { FC, useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";
import Loader from "./loader";

interface RecordingComponentProps {
  recording: boolean;
  setRecording: React.Dispatch<React.SetStateAction<boolean>>;
  hide?: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent, voiceQuery: string) => Promise<void>;
  // const handleVoiceSearch = async (e: React.FormEvent, voiceQuery: string) => {
}

const RecordingComponent: FC<RecordingComponentProps> = ({
  recording,
  setRecording,
  hide = false,
  handleSearch,
  // searchQuery,
  setSearchQuery,
}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [loading, setLoading] = useState(false);

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setRecording(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMicClick = async () => {
    if (recording) {
      handleStopRecording();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorder.onstop = async () => {
          setLoading(true);
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.webm");
          try {
            const response = await axios.post(
              `${process.env.NEXT_PYTHON_API}/api/transcribe`,
              formData
            );
            console.log("Transcription:", response.data.transcription);
            setSearchQuery(response.data.transcription);
            const dummyEvent = { preventDefault: () => {} } as React.FormEvent;
            await handleSearch(dummyEvent, response.data.transcription);
          } catch (error) {
            console.error("Error during transcription:", error);
          } finally {
            setLoading(false);
          }
        };
        mediaRecorder.start();
        setRecording(true);
        timerRef.current = setTimeout(() => {
          handleStopRecording();
        }, 5000);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  // Hide the entire component if hide prop is true
  if (hide) return null;

  return (
    <>
      {recording ? (
        <FaMicrophone
          onClick={handleMicClick}
          className="cursor-pointer transition-colors duration-300 absolute right-[60px] animate-colorAndMove"
        />
      ) : loading ? (
        <Loader />
      ) : (
        <FaMicrophone
          onClick={handleMicClick}
          className="absolute right-[60px] text-gray-300 cursor-pointer hover:text-gray-200"
        />
      )}
    </>
  );
};

export default RecordingComponent;
