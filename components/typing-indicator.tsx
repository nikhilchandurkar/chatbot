export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 animate-fadeIn">
      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
        <span className="sr-only">AI is typing</span>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 max-w-[80%]">
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

