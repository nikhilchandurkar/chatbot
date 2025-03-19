"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "@/hooks/use-theme"

interface CodeBlockProps {
  language: string
  value: string
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 text-white">
        <span className="text-sm font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded hover:bg-gray-700 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-300" />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === "dark" ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: "0 0 0.5rem 0.5rem",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

