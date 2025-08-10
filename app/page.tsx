"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Lock, Play, Trophy, User, BookOpen, BarChart3 } from "lucide-react"
import ExerciseInterface from "@/components/exercise-interface"

// Mock data
const mockUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  currentLevel: "A2",
  totalStars: 47,
  completedModules: 2,
}

// Mock data bo'limiga topic content qo'shish
const mockModules = [
  {
    id: 1,
    title: "Beginner Basics",
    status: "completed",
    topics: [
      {
        id: 1,
        title: "Present Simple",
        stars: 3,
        status: "completed",
        content: {
          title: "Present Simple Tense",
          sections: [
            {
              heading: "What is Present Simple?",
              text: "The Present Simple tense is used to describe habits, general truths, and repeated actions. It's one of the most important tenses in English.",
            },
            {
              heading: "Formation",
              text: "For positive sentences:\n• I/You/We/They + base verb\n• He/She/It + base verb + s/es\n\nExamples:\n• I work every day.\n• She works in a bank.\n• They play football on weekends.",
            },
            {
              heading: "Negative Form",
              text: "Use 'do not' (don't) or 'does not' (doesn't):\n• I don't like coffee.\n• He doesn't speak French.\n• We don't watch TV in the morning.",
            },
            {
              heading: "Question Form",
              text: "Use 'Do' or 'Does' at the beginning:\n• Do you like pizza?\n• Does she work here?\n• Do they have a car?",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Articles (a, an, the)",
        stars: 2,
        status: "completed",
        content: {
          title: "Articles in English",
          sections: [
            {
              heading: "What are Articles?",
              text: "Articles are small words that come before nouns. English has three articles: 'a', 'an', and 'the'.",
            },
            {
              heading: "Indefinite Articles (a, an)",
              text: "Use 'a' before consonant sounds:\n• a book, a car, a university\n\nUse 'an' before vowel sounds:\n• an apple, an hour, an umbrella",
            },
            {
              heading: "Definite Article (the)",
              text: "Use 'the' when:\n• Talking about something specific\n• Both speaker and listener know what you mean\n• There's only one of something\n\nExamples:\n• The sun is bright.\n• Please close the door.\n• The book on the table is mine.",
            },
          ],
        },
      },
      {
        id: 3,
        title: "Basic Vocabulary",
        stars: 3,
        status: "completed",
        content: {
          title: "Essential English Vocabulary",
          sections: [
            {
              heading: "Family Members",
              text: "• Mother, Father, Sister, Brother\n• Grandmother, Grandfather\n• Aunt, Uncle, Cousin\n• Daughter, Son",
            },
            {
              heading: "Common Verbs",
              text: "• be, have, do, say, get, make\n• go, know, take, see, come\n• think, look, want, give, use",
            },
            {
              heading: "Colors",
              text: "• Red, Blue, Green, Yellow\n• Black, White, Gray, Brown\n• Pink, Purple, Orange",
            },
          ],
        },
      },
      {
        id: 4,
        title: "Question Formation",
        stars: 2,
        status: "completed",
        content: {
          title: "How to Form Questions",
          sections: [
            {
              heading: "Yes/No Questions",
              text: "Start with auxiliary verbs (do, does, is, are, can, will):\n• Do you speak English?\n• Is she your sister?\n• Can you help me?",
            },
            {
              heading: "Wh- Questions",
              text: "Use question words + auxiliary verb:\n• What do you do?\n• Where are you from?\n• When does the class start?\n• Why are you late?\n• How old are you?",
            },
          ],
        },
      },
    ],
    finalScore: 85,
  },
  {
    id: 2,
    title: "Elementary Progress",
    status: "active",
    topics: [
      {
        id: 5,
        title: "Past Simple",
        stars: 3,
        status: "completed",
        content: {
          title: "Past Simple Tense",
          sections: [
            {
              heading: "What is Past Simple?",
              text: "Past Simple is used to talk about completed actions in the past. It tells us that something happened at a specific time in the past.",
            },
            {
              heading: "Regular Verbs",
              text: "Add -ed to the base form:\n• work → worked\n• play → played\n• study → studied\n• stop → stopped",
            },
            {
              heading: "Irregular Verbs",
              text: "These verbs have special past forms:\n• go → went\n• eat → ate\n• see → saw\n• come → came\n• take → took",
            },
            {
              heading: "Negative and Questions",
              text: "Negative: didn't + base verb\n• I didn't go to school yesterday.\n\nQuestions: Did + subject + base verb?\n• Did you see the movie?\n• Did she call you?",
            },
          ],
        },
      },
      {
        id: 6,
        title: "Travel Vocabulary",
        stars: 2,
        status: "completed",
        content: {
          title: "Travel and Transportation",
          sections: [
            {
              heading: "Transportation",
              text: "• Car, Bus, Train, Plane, Taxi\n• Bicycle, Motorcycle, Boat, Ship\n• Subway, Tram",
            },
            {
              heading: "At the Airport",
              text: "• Check-in, Boarding pass, Gate\n• Departure, Arrival, Delay\n• Luggage, Baggage claim\n• Security check, Passport control",
            },
            {
              heading: "Hotel Vocabulary",
              text: "• Reception, Room key, Checkout\n• Single room, Double room\n• Breakfast included, Wi-Fi\n• Elevator, Stairs, Restaurant",
            },
          ],
        },
      },
      {
        id: 7,
        title: "Prepositions",
        stars: 1,
        status: "active",
        content: {
          title: "Prepositions of Time and Place",
          sections: [
            {
              heading: "Prepositions of Time",
              text: "• IN: months, years, seasons (in January, in 2023, in summer)\n• ON: days, dates (on Monday, on March 15th)\n• AT: specific times (at 3 o'clock, at noon, at night)",
            },
            {
              heading: "Prepositions of Place",
              text: "• IN: inside something (in the room, in the car)\n• ON: on a surface (on the table, on the wall)\n• AT: specific locations (at home, at school, at the station)",
            },
            {
              heading: "Movement Prepositions",
              text: "• TO: direction (go to school, come to me)\n• FROM: origin (from London, from home)\n• INTO: entering (go into the house)\n• OUT OF: exiting (come out of the building)",
            },
          ],
        },
      },
      { id: 8, title: "Future Tense", stars: 0, status: "locked" },
      { id: 9, title: "Comparatives", stars: 0, status: "locked" },
    ],
  },
  {
    id: 3,
    title: "Pre-Intermediate Skills",
    status: "locked",
    topics: [
      { id: 10, title: "Present Perfect", stars: 0, status: "locked" },
      { id: 11, title: "Modal Verbs", stars: 0, status: "locked" },
      { id: 12, title: "Business Vocabulary", stars: 0, status: "locked" },
    ],
  },
]

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState<"home" | "progress" | "profile" | "topics" | "exercise">("home")
  const [selectedModule, setSelectedModule] = useState<any>(null)
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [exerciseTab, setExerciseTab] = useState<"learn" | "practice">("learn")

  const activeModule = mockModules.find((m) => m.status === "active")
  const completedTopics = mockModules.flatMap((m) => m.topics).filter((t) => t.status === "completed").length
  const totalTopics = mockModules.flatMap((m) => m.topics).length

  const navigateToTopics = (module: any) => {
    setSelectedModule(module)
    setSelectedView("topics")
  }

  const navigateToExercise = (topic: any) => {
    setSelectedTopic(topic)
    setSelectedView("exercise")
    // Always start with Learn tab when opening a topic
    setExerciseTab("learn")
  }

  const navigateBack = () => {
    if (selectedView === "topics") {
      setSelectedView("home")
      setSelectedModule(null)
    } else if (selectedView === "exercise") {
      setSelectedView("topics")
      setSelectedTopic(null)
    }
  }

  const getNextTopic = (currentTopic: any) => {
    const currentModule = mockModules.find((m) => m.topics.some((t) => t.id === currentTopic.id))

    if (!currentModule) return null

    const currentIndex = currentModule.topics.findIndex((t) => t.id === currentTopic.id)
    const nextTopic = currentModule.topics[currentIndex + 1]

    // Return next topic if it exists and is not locked
    return nextTopic && nextTopic.status !== "locked" ? nextTopic : null
  }

  const handleExerciseComplete = (completedTopic: any, stars: number) => {
    if (stars >= 2) {
      const nextTopic = getNextTopic(completedTopic)
      if (nextTopic) {
        // Auto-navigate to next topic
        setSelectedTopic(nextTopic)
        setExerciseTab("learn")
      } else {
        // No next topic, go back to topics list
        setSelectedView("topics")
        setSelectedTopic(null)
      }
    }
  }

  const renderContent = () => {
    switch (selectedView) {
      case "home":
        return (
          <>
            {/* All Modules */}
            <Card className="mb-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">All Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockModules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        module.status === "completed"
                          ? "bg-green-50 border-green-200"
                          : module.status === "active"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-gray-50 border-gray-200"
                      }`}
                      onClick={() => module.status !== "locked" && navigateToTopics(module)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <Badge
                          variant={
                            module.status === "completed"
                              ? "default"
                              : module.status === "active"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            module.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : module.status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : ""
                          }
                        >
                          {module.status === "completed"
                            ? "Completed"
                            : module.status === "active"
                              ? "Active"
                              : "Locked"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{module.topics.length} topics</span>
                        {module.status === "locked" ? (
                          <Button
                            size="sm"
                            onClick={() => setShowPaymentModal(true)}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600"
                          >
                            Unlock - $9.99
                          </Button>
                        ) : module.status === "completed" ? (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <Trophy className="w-4 h-4" />
                            {module.finalScore}%
                          </div>
                        ) : (
                          <Button size="sm" variant="outline">
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )

      case "progress":
        return (
          <div className="mb-20">
            {/* User Progress Overview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Learning Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{mockUser.currentLevel}</div>
                    <div className="text-sm text-blue-600 font-medium">Current Level</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-700">{mockUser.totalStars}</div>
                    <div className="text-sm text-yellow-600 font-medium">Total Stars</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-700">{mockUser.completedModules}</div>
                    <div className="text-sm text-green-600 font-medium">Modules Done</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-700">{completedTopics}</div>
                    <div className="text-sm text-purple-600 font-medium">Topics Done</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Learning Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">7</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-gray-600">Words Learned</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">23h</div>
                    <div className="text-sm text-gray-600">Study Time</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Grammar</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Vocabulary</span>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Listening</span>
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Reading</span>
                      <span className="text-sm text-gray-600">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Mistakes - Moved from Practice */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div
                    className="p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => {
                      // Navigate to Articles practice
                      const articleTopic = mockModules
                        .flatMap((m) => m.topics)
                        .find((t) => t.title.toLowerCase().includes("articles"))

                      if (articleTopic) {
                        setSelectedTopic(articleTopic)
                        setExerciseTab("practice")
                        setSelectedView("exercise")
                      }
                    }}
                  >
                    <div className="font-medium text-red-800">Articles (a, an, the)</div>
                    <div className="text-sm text-red-600">65% accuracy • Needs practice</div>
                  </div>
                  <div
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                    onClick={() => {
                      // Navigate to Past Simple practice
                      const pastTopic = mockModules
                        .flatMap((m) => m.topics)
                        .find((t) => t.title.toLowerCase().includes("past"))

                      if (pastTopic) {
                        setSelectedTopic(pastTopic)
                        setExerciseTab("practice")
                        setSelectedView("exercise")
                      }
                    }}
                  >
                    <div className="font-medium text-yellow-800">Past Simple vs Present Perfect</div>
                    <div className="text-sm text-yellow-600">72% accuracy • Review recommended</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
                    <div className="font-medium text-orange-800">Prepositions of Time</div>
                    <div className="text-sm text-orange-600">78% accuracy • Minor improvements needed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                    <div key={day} className="text-center">
                      <div className="text-xs text-gray-600 mb-2">{day}</div>
                      <div
                        className={`w-8 h-8 rounded-full mx-auto ${
                          index < 5 ? "bg-green-500" : index === 5 ? "bg-yellow-500" : "bg-gray-200"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "profile":
        return (
          <div className="mb-20">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{mockUser.name}</h3>
                      <p className="text-gray-600">@{mockUser.username}</p>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 mt-2">
                        Level {mockUser.currentLevel}
                      </Badge>
                    </div>
                  </div>

                  {/* Account Info */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Account Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member since</span>
                        <span>March 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent py-4 px-4">
                    <div className="text-left">
                      <div className="font-medium">Help Center</div>
                      <div className="text-xs text-gray-500">FAQs and guides</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent py-4 px-4">
                    <div className="text-left">
                      <div className="font-medium">Contact Support</div>
                      <div className="text-xs text-gray-500">Get help from our team</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "topics":
        return (
          <div className="mb-20">
            {/* Header with back button */}
            <div className="flex items-center gap-3 mb-6">
              <Button variant="outline" size="sm" onClick={navigateBack}>
                ← Back
              </Button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedModule?.title}</h2>
                <p className="text-sm text-gray-600">{selectedModule?.topics?.length} topics</p>
              </div>
            </div>

            {/* Topics List */}
            <div className="space-y-3">
              {selectedModule?.topics?.map((topic: any) => (
                <Card
                  key={topic.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    topic.status === "locked" ? "opacity-60" : ""
                  }`}
                  onClick={() => topic.status !== "locked" && navigateToExercise(topic)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {topic.status === "locked" ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : topic.status === "completed" ? (
                          <Trophy className="w-5 h-5 text-green-600" />
                        ) : (
                          <Play className="w-5 h-5 text-blue-600" />
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                          <p className="text-sm text-gray-600">
                            {topic.status === "completed"
                              ? "Completed"
                              : topic.status === "active"
                                ? "In Progress"
                                : "Locked"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= topic.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        {topic.status !== "locked" && (
                          <Button size="sm" variant={topic.status === "active" ? "default" : "outline"}>
                            {topic.status === "active" ? "Continue" : topic.status === "completed" ? "Review" : "Start"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      // Exercise view'ni yangilash
      case "exercise":
        return (
          <div className="mb-20">
            {/* Header with back button */}
            <div className="flex items-center gap-3 mb-6">
              <Button variant="outline" size="sm" onClick={navigateBack}>
                ← Back
              </Button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedTopic?.title}</h2>
                <p className="text-sm text-gray-600">Learn and practice</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setExerciseTab("learn")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  exerciseTab === "learn" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                📖 Learn
              </button>
              <button
                onClick={() => setExerciseTab("practice")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  exerciseTab === "practice" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🧠 Practice
              </button>
            </div>

            {/* Content */}
            {exerciseTab === "learn" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{selectedTopic?.content?.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedTopic?.content?.sections?.map((section: any, index: number) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">{section.heading}</h3>
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed">{section.text}</div>
                      {index < selectedTopic.content.sections.length - 1 && <hr className="border-gray-200" />}
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      size="lg"
                      onClick={() => setExerciseTab("practice")}
                    >
                      Start Practice →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <ExerciseInterface
                topic={selectedTopic}
                onNavigateBack={() => {
                  setSelectedView("topics")
                  setSelectedTopic(null)
                }}
                onReviewTopic={() => {
                  setExerciseTab("learn")
                }}
              />
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Intellecto</h1>
              <p className="text-sm text-gray-600">AI Language Learning</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-2">{renderContent()}</div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-around">
              <button
                onClick={() => setSelectedView("progress")}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  selectedView === "progress" ? "text-blue-600 bg-blue-50" : "text-gray-600"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs font-medium">Progress</span>
              </button>
              <button
                onClick={() => setSelectedView("home")}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${
                  selectedView === "home" ? "text-blue-600 bg-blue-50" : "text-gray-600"
                }`}
              >
                <div className="relative">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Learn</span>
              </button>
              <button
                onClick={() => setSelectedView("profile")}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  selectedView === "profile" ? "text-blue-600 bg-blue-50" : "text-gray-600"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-lg">Unlock Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">$9.99</div>
                    <p className="text-sm text-gray-600">
                      Unlock "Pre-Intermediate Skills" module with personalized AI-generated content
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600">Pay with Telegram</Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
