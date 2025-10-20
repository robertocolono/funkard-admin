import * as React from "react"
import { TestTube, Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface TestSuite {
  name: string
  status: "passed" | "failed" | "running" | "pending"
  duration: number
  tests: {
    name: string
    status: "passed" | "failed" | "skipped"
    duration: number
    error?: string
  }[]
}

interface TestingProps {
  suites: TestSuite[]
  className?: string
}

export function Testing({ suites, className }: TestingProps) {
  const [isRunning, setIsRunning] = React.useState(false)
  const [selectedSuite, setSelectedSuite] = React.useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed": return <XCircle className="h-4 w-4 text-red-500" />
      case "running": return <Clock className="h-4 w-4 text-blue-500" />
      case "pending": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "success"
      case "failed": return "error"
      case "running": return "info"
      case "pending": return "warning"
      default: return "outline"
    }
  }

  const getTestStatusIcon = (status: string) => {
    switch (status) {
      case "passed": return <CheckCircle className="h-3 w-3 text-green-500" />
      case "failed": return <XCircle className="h-3 w-3 text-red-500" />
      case "skipped": return <AlertTriangle className="h-3 w-3 text-yellow-500" />
      default: return <Clock className="h-3 w-3 text-gray-500" />
    }
  }

  const totalTests = suites.reduce((acc, suite) => acc + suite.tests.length, 0)
  const passedTests = suites.reduce((acc, suite) => 
    acc + suite.tests.filter(test => test.status === "passed").length, 0)
  const failedTests = suites.reduce((acc, suite) => 
    acc + suite.tests.filter(test => test.status === "failed").length, 0)
  const skippedTests = suites.reduce((acc, suite) => 
    acc + suite.tests.filter(test => test.status === "skipped").length, 0)

  const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0

  return (
    <div className={cn("space-y-6", className)}>
      {/* Test Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale test</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTests}</div>
            <p className="text-xs text-muted-foreground">
              {suites.length} suite di test
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passati</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{passedTests}</div>
            <p className="text-xs text-muted-foreground">
              {successRate}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Falliti</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{failedTests}</div>
            <p className="text-xs text-muted-foreground">
              {totalTests > 0 ? Math.round((failedTests / totalTests) * 100) : 0}% fallimento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saltati</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{skippedTests}</div>
            <p className="text-xs text-muted-foreground">
              {totalTests > 0 ? Math.round((skippedTests / totalTests) * 100) : 0}% saltati
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Controlli test</CardTitle>
          <CardDescription>Esegui e gestisci i test</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              disabled={isRunning}
            >
              {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isRunning ? "Pausa" : "Esegui"}
            </Button>
            <Button variant="outline" onClick={() => setIsRunning(false)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Suites */}
      <div className="space-y-4">
        {suites.map((suite, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(suite.status)}
                  <CardTitle className="text-lg">{suite.name}</CardTitle>
                  <Badge variant={getStatusColor(suite.status)}>
                    {suite.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {suite.duration}ms
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSuite(selectedSuite === suite.name ? null : suite.name)}
                  >
                    {selectedSuite === suite.name ? "Nascondi" : "Mostra"} dettagli
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {selectedSuite === suite.name && (
              <CardContent>
                <div className="space-y-2">
                  {suite.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        {getTestStatusIcon(test.status)}
                        <span className="text-sm font-medium">{test.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {test.duration}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
