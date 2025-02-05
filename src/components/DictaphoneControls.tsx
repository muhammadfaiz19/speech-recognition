import Button from "./Button";

const DictaphoneControls = ({
  listening,
  startListening,
  stopListening,
  handleReset,
  copyToClipboard,
  saveToLocalStorage,
  transcript,
}: {
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
  handleReset: () => void;
  copyToClipboard: () => void;
  saveToLocalStorage: () => void;
  transcript: string;
}) => {
  return (
    <div className="bg-transparent shadow-md rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto">
      <p className="text-white sm:text-lg font-medium mb-4">
        Microphone:{" "}
        <span className={listening ? "text-green-400" : "text-red-500"}>
          {listening ? "on" : "off"}
        </span>
      </p>
      <div className="flex flex-col w-full gap-4 mb-4 items-center">
        <Button
          color="bg-green-500"
          textColor="text-white"
          label="Start"
          onClick={startListening}
          className="w-full" 
        />
        <Button
          color="bg-red-500"
          textColor="text-white"
          label="Stop"
          onClick={stopListening}
          className="w-full" 
        />
        <Button
          color="bg-gray-500"
          textColor="text-white"
          label="Reset"
          onClick={handleReset}
          className="w-full" 
        />
      </div>
      <div className="bg-gray-900/30 bg-blur-md p-3 sm:p-4 rounded-lg border border-gray-700 text-gray-200 text-sm min-h-[120px] sm:h-40 overflow-y-auto mb-4">
        {transcript || "Your speech will appear here..."}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          color="bg-green-500"
          textColor="text-white"
          label="Copy"
          onClick={copyToClipboard}
        />
        <Button
          color="bg-yellow-500"
          textColor="text-white"
          label="Save"
          onClick={saveToLocalStorage}
        />
      </div>
    </div>
  );
};

export default DictaphoneControls;
