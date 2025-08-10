"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Star, ArrowRight, Volume2 } from "lucide-react"

// Mock exercises for a topic
const mockExercises = [
  {
    id: 1,
    type: "fill_in_blank",
    question: 'Complete the sentence: "I _____ to the store yesterday."',
    sentence: "I _____ to the store yesterday.",
    correctAnswer: "went",
    options: ["go", "went", "going", "goes"],
    explanation: 'We use "went" (past tense of "go") because the action happened yesterday.',
  },
  {
    id: 2,
    type: "multiple_choice",
    question: 'Choose the correct form: "She _____ her homework every day."',
    options: ["do", "does", "doing", "did"],
    correctAnswer: 1,
    explanation: 'We use "does" with third person singular (she/he/it) in present simple.',
  },
  {
    id: 3,
    type: "sentence_construction",
    question: "Arrange these words to make a correct sentence:",
    words: ["always", "coffee", "drinks", "morning", "in", "the", "he"],
    correctOrder: [6, 0, 2, 1, 4, 5, 3],
    correctSentence: "He always drinks coffee in the morning.",
  },
  {
    id: 4,
    type: "listening",
    question: "Listen and type what you hear:",
    audioText: "The weather is beautiful today.",
    correctAnswer: "The weather is beautiful today.",
  },
]

export default function Exercise() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [wordOrder, setWordOrder] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const exercise = mockExercises[currentExercise]
  const progress = ((currentExercise + 1) / mockExercises.length) * 100

  const checkAnswer = () => {
    let correct = false

    switch (exercise.type) {
      case "fill_in_blank":
        correct = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase()
        break
      case "multiple_choice":
        correct = selectedOption === exercise.correctAnswer
        break
      case "sentence_construction":
        const userSentence = wordOrder.join(" ")
        correct = userSentence.toLowerCase() === exercise.correctSentence.toLowerCase()
        break
      case "listening":
        correct = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase()
        break
    }

    setIsCorrect(correct)
    setShowFeedback(true)
  }

  const nextExercise = () => {
    const newResults = [...exerciseResults, isCorrect]
    setExerciseResults(newResults)

    if (currentExercise < mockExercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      resetForm()
    } else {
      setIsComplete(true)
    }
  }

  const resetForm = () => {
    setUserAnswer("")
    setSelectedOption(null)
    setWordOrder([])
    setShowFeedback(false)
    setIsCorrect(false)
  }

  const addWordToSentence = (word: string, index: number) => {
    if (!wordOrder.includes(word)) {
      setWordOrder([...wordOrder, word])
    }
  }

  const removeWordFromSentence = (index: number) => {
    const newOrder = wordOrder.filter((_, i) => i !== index)
    setWordOrder(newOrder)
  }

  const playAudio = () => {
    // Mock audio play - in real app would play actual audio
    const utterance = new SpeechSynthesisUtterance(exercise.audioText)
    speechSynthesis.speak(utterance)
  }

  if (isComplete) {
    const correctCount = exerciseResults.filter(Boolean).length
    const stars = correctCount >= 4 ? 3 : correctCount >= 3 ? 2 : correctCount >= 2 ? 1 : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${star <= stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <CardTitle className="text-2xl">Topic Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stars}/3</div>
              <p className="text-gray-600">Stars Earned</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Correct Answers</span>
                <span className="font-semibold">
                  {correctCount}/{mockExercises.length}
                </span>
              </div>
              <Progress value={(correctCount / mockExercises.length) * 100} className="h-2" />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Performance Analysis</h3>
              <p className="text-sm text-blue-800">
                {stars >= 2
                  ? "Great job! You can move to the next topic."
                  : "You might want to review this topic again to improve your understanding."}
              </p>
            </div>

            <div className="flex gap-2">
              {stars < 2 && (
                <Button variant="outline" className="flex-1 bg-transparent">
                  Review Topic
                </Button>
              )}
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600">
                {stars >= 2 ? "Next Topic" : "Try Again"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Past Simple</h1>
            <p className="text-sm text-gray-600">
              Exercise {currentExercise + 1} of {mockExercises.length}
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Grammar
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Exercise Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{exercise.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercise.type === "fill_in_blank" && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg">{exercise.sentence}</p>
                </div>
                <Input
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showFeedback}
                />
              </div>
            )}

            {exercise.type === "multiple_choice" && (
              <div className="space-y-2">
                {exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showFeedback && setSelectedOption(index)}
                    disabled={showFeedback}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedOption === index ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                    } ${showFeedback && index === exercise.correctAnswer ? "border-green-500 bg-green-50" : ""}
                    ${showFeedback && selectedOption === index && index !== exercise.correctAnswer ? "border-red-500 bg-red-50" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {exercise.type === "sentence_construction" && (
              <div className="space-y-4">
                <div className="min-h-[60px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {wordOrder.map((word, index) => (
                      <button
                        key={index}
                        onClick={() => !showFeedback && removeWordFromSentence(index)}
                        disabled={showFeedback}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exercise.words.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => addWordToSentence(word, index)}
                      disabled={showFeedback || wordOrder.includes(word)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        wordOrder.includes(word)
                          ? "border-gray-200 bg-gray-100 text-gray-400"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      }`}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {exercise.type === "listening" && (
              <div className="space-y-4">
                <div className="text-center">
                  <Button
                    onClick={playAudio}
                    variant="outline"
                    size="lg"
                    className="w-20 h-20 rounded-full bg-transparent"
                  >
                    <Volume2 className="w-8 h-8" />
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Click to play audio</p>
                </div>
                <Input
                  placeholder="Type what you hear..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showFeedback}
                />
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div
                className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{exercise.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" disabled={currentExercise === 0}>
            Previous
          </Button>
          {showFeedback ? (
            <Button onClick={nextExercise} className="bg-gradient-to-r from-blue-500 to-indigo-600">
              {currentExercise === mockExercises.length - 1 ? "Finish" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={checkAnswer}
              disabled={
                (exercise.type === "fill_in_blank" && !userAnswer.trim()) ||
                (exercise.type === "multiple_choice" && selectedOption === null) ||
                (exercise.type === "sentence_construction" && wordOrder.length === 0) ||
                (exercise.type === "listening" && !userAnswer.trim())
              }
              className="bg-gradient-to-r from-blue-500 to-indigo-600"
            >
              Check Answer
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
