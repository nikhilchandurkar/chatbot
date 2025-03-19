"use client"

import { useEffect, useState } from "react"
import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import CodeBlock from "./code-block"

interface ChatMessageProps {
  role: string
  content: string
  isLastMessage: boolean
}

export default function ChatMessage({ role, content, isLastMessage }: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const isUser = role === "user"

  // Typewriter effect for assistant messages
  useEffect(() => {
    if (isUser) {
      setDisplayedContent(content)
      setIsComplete(true)
      return
    }

    if (isLastMessage) {
      setDisplayedContent("")
      setIsComplete(false)

      let index = 0
      const timer = setInterval(() => {
        setDisplayedContent(content.substring(0, index + 1))
        index++

        if (index >= content.length) {
          clearInterval(timer)
          setIsComplete(true)
        }
      }, 15) // Speed of typewriter effect

      return () => clearInterval(timer)
    } else {
      setDisplayedContent(content)
      setIsComplete(true)
    }
  }, [content, isUser, isLastMessage])

  return (
    <div className={cn("flex gap-3 animate-fadeIn", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4",
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "")
                  return !inline && match ? (
                    <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} {...props} />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {displayedContent}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  )
}

