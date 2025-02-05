import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import DictaphoneControls from "./components/DictaphoneControls";
import BackgroundPattern from "./components/BackgroundPattern";
import Alert from "./components/Alert";

interface AlertState {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const Dictaphone = () => {
  const {
    transcript: currentTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(true);
  const [savedTranscript, setSavedTranscript] = useState("");
  const [alert, setAlert] = useState<AlertState>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({
      message,
      type,
      isVisible: true,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  // Load saved transcript on initial render
  useEffect(() => {
    const saved = localStorage.getItem("transcript");
    if (saved) {
      setSavedTranscript(saved);
    }
  }, []);

  // Check microphone availability
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {
      setIsMicrophoneAvailable(false);
    });
  }, []);

  const copyToClipboard = () => {
    const textToCopy = savedTranscript || currentTranscript;
    if (!textToCopy) {
      showAlert("No text to copy!", "error");
      return;
    }
    navigator.clipboard.writeText(textToCopy);
    showAlert("Transcript copied to clipboard!", "success");
  };

  const saveToLocalStorage = () => {
    const textToSave = currentTranscript || savedTranscript;
    if (!textToSave) {
      showAlert("No text to save!", "error");
      return;
    }
    localStorage.setItem("transcript", textToSave);
    setSavedTranscript(textToSave);
    showAlert("Transcript saved successfully!", "success");
  };

  const handleReset = () => {
    resetTranscript();
    localStorage.removeItem("transcript");
    setSavedTranscript("");
    showAlert("Transcript reset successfully!", "success");
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "id-ID" });
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <ErrorMessage message="Browser doesn't support speech recognition." />
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <ErrorMessage message="Microphone is not available. Please check your permissions or device settings." />
    );
  }

  const displayTranscript = currentTranscript || savedTranscript;

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundPattern />
      <Alert
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={hideAlert}
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 h-full mx-auto my-16">
        <div className="max-w-3xl text-center">
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-white">
            Real-Time <span className="text-sky-400">Speech</span> Recognition
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            Seamlessly convert your speech to text with an intuitive, modern
            interface. Powered by advanced technology to meet your every need.
          </p>
          <DictaphoneControls
            listening={listening}
            startListening={startListening}
            stopListening={SpeechRecognition.stopListening}
            handleReset={handleReset}
            copyToClipboard={copyToClipboard}
            saveToLocalStorage={saveToLocalStorage}
            transcript={displayTranscript}
          />
        </div>
      </div>
    </div>
  );
};

export default Dictaphone;
