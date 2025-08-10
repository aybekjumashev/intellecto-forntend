"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, CheckCircle } from "lucide-react"

// Mock assessment questions
const mockQuestions = [
  {
    id: 1,
    type: "multiple_choice",
    question: 'Choose the correct form: "I _____ to school every day."',
    options: ["go", "goes", "going", "went"],
    correct: 0,
    category: "grammar",
  },
  {
    id: 2,
    type: "multiple_choice",
    question: 'What is the past tense of "eat"?',
    options: ["eated", "ate", "eaten", "eating"],
    correct: 1,
    category: "grammar",
  },
  {
    id: 3,
    type: "multiple_choice",
    question: 'Choose the correct article: "I saw _____ elephant at the zoo."',
    options: ["a", "an", "the", "no article"],
    correct: 1,
    category: "grammar",
  },
  {
    id: 4,
    type: "vocabulary",
    question: 'What does "beautiful" mean?',
    options: ["ugly", "pretty", "big", "small"],
    correct: 1,
    category: "vocabulary",
  },
  {
    id: 5,
    type: "multiple_choice",
    question: 'Complete: "She _____ working here for 3 years."',
    options: ["is", "has been", "was", "will be"],
    correct: 1,
    category: "grammar",
  },
]

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        // Assessment complete
        setIsComplete(true)
        calculateResult(newAnswers)
      }
    }
  }

  const calculateResult = (userAnswers: number[]) => {
    const correctCount = userAnswers.reduce((count, answer, index) => {
      return count + (answer === mockQuestions[index].correct ? 1 : 0)
    }, 0)

    const percentage = (correctCount / mockQuestions.length) * 100

    // Simulate AI analysis delay
    setTimeout(() => {
      setShowResult(true)
    }, 2000)
  }

  const getLevel = () => {
    const correctCount = answers.reduce((count, answer, index) => {
      return count + (answer === mockQuestions[index].correct ? 1 : 0)
    }, 0)

    const percentage = (correctCount / mockQuestions.length) * 100

    if (percentage >= 80) return "B1"
    if (percentage >= 60) return "A2"
    return "A1"
  }

  if (isComplete && !showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Analyzing Your Results</h2>
            <p className="text-gray-600">AI is processing your answers to determine your level...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const level = getLevel()
    const correctCount = answers.reduce((count, answer, index) => {
      return count + (answer === mockQuestions[index].correct ? 1 : 0)
    }, 0)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{level}</div>
              <p className="text-gray-600">Your English Level</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Correct Answers</span>
                <span className="font-semibold">
                  {correctCount}/{mockQuestions.length}
                </span>
              </div>
              <Progress value={(correctCount / mockQuestions.length) * 100} className="h-2" />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-blue-800">
                Based on your answers, you show strong understanding of basic grammar but could improve on advanced
                tenses. Your first personalized module is being prepared!
              </p>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600" size="lg">
              Start Learning Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = mockQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Level Assessment</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1)
                setSelectedAnswer(answers[currentQuestion - 1] || null)
              }
            }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            {currentQuestion === mockQuestions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
