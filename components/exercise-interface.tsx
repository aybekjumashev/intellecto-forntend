"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Star, ArrowRight, RotateCcw } from "lucide-react"

// Mock exercises data
const getExercisesForTopic = (topicId: number) => {
  const exerciseBank: { [key: number]: any[] } = {
    1: [
      // Present Simple
      {
        id: 1,
        type: "fill_in_blank",
        question: 'Complete the sentence: "She _____ to work every day."',
        sentence: "She _____ to work every day.",
        correctAnswer: "goes",
        options: ["go", "goes", "going", "went"],
        explanation: 'We use "goes" with third person singular (she/he/it) in present simple.',
      },
      {
        id: 2,
        type: "multiple_choice",
        question: 'Choose the correct form: "They _____ football on weekends."',
        options: ["play", "plays", "playing", "played"],
        correctAnswer: 0,
        explanation: 'We use "play" with plural subjects (they/we) in present simple.',
      },
      {
        id: 3,
        type: "sentence_construction",
        question: "Arrange these words to make a correct sentence:",
        words: ["every", "coffee", "drinks", "morning", "he"],
        correctOrder: [4, 2, 1, 0, 3],
        correctSentence: "He drinks coffee every morning.",
      },
    ],
    2: [
      // Articles
      {
        id: 4,
        type: "fill_in_blank",
        question: 'Choose the correct article: "I saw _____ elephant at the zoo."',
        sentence: "I saw _____ elephant at the zoo.",
        correctAnswer: "an",
        options: ["a", "an", "the", "no article"],
        explanation: 'We use "an" before words that start with vowel sounds like "elephant".',
      },
      {
        id: 5,
        type: "multiple_choice",
        question: 'Complete: "_____ sun is very bright today."',
        options: ["A", "An", "The", "No article"],
        correctAnswer: 2,
        explanation: 'We use "the" with unique things like the sun, the moon, the earth.',
      },
    ],
    5: [
      // Past Simple
      {
        id: 6,
        type: "fill_in_blank",
        question: 'Complete: "I _____ to the store yesterday."',
        sentence: "I _____ to the store yesterday.",
        correctAnswer: "went",
        options: ["go", "went", "going", "goes"],
        explanation: '"Went" is the past form of "go". We use it for completed actions in the past.',
      },
      {
        id: 7,
        type: "multiple_choice",
        question: 'What is the past tense of "eat"?',
        options: ["eated", "ate", "eaten", "eating"],
        correctAnswer: 1,
        explanation: '"Ate" is the irregular past form of "eat".',
      },
    ],
    7: [
      // Prepositions
      {
        id: 8,
        type: "fill_in_blank",
        question: 'Complete: "The meeting is _____ 3 o\'clock."',
        sentence: "The meeting is _____ 3 o'clock.",
        correctAnswer: "at",
        options: ["in", "on", "at", "by"],
        explanation: 'We use "at" with specific times like "at 3 o\'clock", "at noon".',
      },
      {
        id: 9,
        type: "multiple_choice",
        question: 'Choose: "I was born _____ 1995."',
        options: ["in", "on", "at", "by"],
        correctAnswer: 0,
        explanation: 'We use "in" with years, months, and seasons.',
      },
    ],
  }

  return exerciseBank[topicId] || []
}

interface ExerciseInterfaceProps {
  topic: any
  onNavigateBack?: () => void
  onReviewTopic?: () => void
}

export default function ExerciseInterface({ topic, onNavigateBack, onReviewTopic }: ExerciseInterfaceProps) {
  const exercises = getExercisesForTopic(topic?.id)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [wordOrder, setWordOrder] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [isComplete, setIsComplete] = useState(false)

  if (!exercises.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-semibold mb-2">Exercises Coming Soon</h3>
          <p className="text-gray-600 mb-6">Exercises for "{topic?.title}" are being prepared by our AI system.</p>
          <Button variant="outline">Notify When Ready</Button>
        </CardContent>
      </Card>
    )
  }

  const exercise = exercises[currentExercise]
  const progress = ((currentExercise + 1) / exercises.length) * 100

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
    }

    setIsCorrect(correct)
    setShowFeedback(true)
  }

  const nextExercise = () => {
    const newResults = [...exerciseResults, isCorrect]
    setExerciseResults(newResults)

    if (currentExercise < exercises.length - 1) {
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

  const restartExercises = () => {
    setCurrentExercise(0)
    setExerciseResults([])
    setIsComplete(false)
    resetForm()
  }

  const addWordToSentence = (word: string) => {
    if (!wordOrder.includes(word)) {
      setWordOrder([...wordOrder, word])
    }
  }

  const removeWordFromSentence = (index: number) => {
    const newOrder = wordOrder.filter((_, i) => i !== index)
    setWordOrder(newOrder)
  }

  if (isComplete) {
    const correctCount = exerciseResults.filter(Boolean).length
    const stars =
      correctCount >= Math.ceil(exercises.length * 0.9)
        ? 3
        : correctCount >= Math.ceil(exercises.length * 0.7)
          ? 2
          : correctCount >= Math.ceil(exercises.length * 0.5)
            ? 1
            : 0

    return (
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${star <= stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <CardTitle className="text-2xl">Exercise Complete!</CardTitle>
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
                {correctCount}/{exercises.length}
              </span>
            </div>
            <Progress value={(correctCount / exercises.length) * 100} className="h-2" />
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
            <Button variant="outline" className="flex-1 bg-transparent" onClick={restartExercises}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600"
              onClick={() => {
                if (stars >= 2) {
                  // Navigate back to topics list to show next topic
                  if (onNavigateBack) {
                    onNavigateBack()
                  }
                } else {
                  // Review topic - go to Learn tab instead of restarting exercises
                  if (onReviewTopic) {
                    onReviewTopic()
                  }
                }
              }}
            >
              {stars >= 2 ? "Next Topic" : "Review Topic"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Exercise Progress</span>
            <span className="text-sm text-gray-600">
              {currentExercise + 1} of {exercises.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Exercise Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {exercise.type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
            <span className="text-sm text-gray-500">Question {currentExercise + 1}</span>
          </div>
          <CardTitle className="text-lg">{exercise.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {exercise.type === "fill_in_blank" && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium">{exercise.sentence}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {exercise.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant={userAnswer === option ? "default" : "outline"}
                    onClick={() => !showFeedback && setUserAnswer(option)}
                    disabled={showFeedback}
                    className="h-12"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {exercise.type === "multiple_choice" && (
            <div className="space-y-2">
              {exercise.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && setSelectedOption(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedOption === index ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  } ${showFeedback && index === exercise.correctAnswer ? "border-green-500 bg-green-50" : ""}
                  ${showFeedback && selectedOption === index && index !== exercise.correctAnswer ? "border-red-500 bg-red-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedOption === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      }`}
                    >
                      {selectedOption === index && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          )}

          {exercise.type === "sentence_construction" && (
            <div className="space-y-4">
              <div className="min-h-[80px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Your sentence:</p>
                <div className="flex flex-wrap gap-2">
                  {wordOrder.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => !showFeedback && removeWordFromSentence(index)}
                      disabled={showFeedback}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {word} ×
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Available words:</p>
                <div className="flex flex-wrap gap-2">
                  {exercise.words.map((word: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => addWordToSentence(word)}
                      disabled={showFeedback || wordOrder.includes(word)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
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
        <Button
          variant="outline"
          disabled={currentExercise === 0}
          onClick={() => {
            if (currentExercise > 0) {
              setCurrentExercise(currentExercise - 1)
              resetForm()
            }
          }}
        >
          Previous
        </Button>
        {showFeedback ? (
          <Button onClick={nextExercise} className="bg-gradient-to-r from-blue-500 to-indigo-600">
            {currentExercise === exercises.length - 1 ? "Finish" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={checkAnswer}
            disabled={
              (exercise.type === "fill_in_blank" && !userAnswer) ||
              (exercise.type === "multiple_choice" && selectedOption === null) ||
              (exercise.type === "sentence_construction" && wordOrder.length === 0)
            }
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            Check Answer
          </Button>
        )}
      </div>
    </div>
  )
}
