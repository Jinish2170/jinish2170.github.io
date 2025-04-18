"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Calendar, Code, Clock, FileText, Lightbulb, CheckCircle } from "lucide-react"

const ProjectShowcase = ({ project }) => {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
      id={project.id}
    >
      <Card className="bg-gray-900/30 border border-gray-800 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
              <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                <div className="flex items-center text-sm text-gray-300 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{project.createdAt}</span>
                  <span className="mx-2">•</span>
                  <Code className="h-4 w-4 mr-1" />
                  <span>{project.language}</span>
                  {project.license && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{project.license}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-black/50 text-gray-300 px-2 py-1 rounded-md border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                  <div className="space-y-4">
                    <p className="text-gray-300">{project.longDescription}</p>

                    <div className="flex flex-wrap gap-4 mt-6">
                      <Button variant="outline" className="border-techBlue text-techBlue hover:bg-techBlue/10" asChild>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> View Code
                        </Link>
                      </Button>
                      <Button className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90" asChild>
                        <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="challenges" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium flex items-center text-techPurple mb-2">
                        <Lightbulb className="h-5 w-5 mr-2" /> Challenges
                      </h4>
                      <p className="text-gray-300">{project.challenges}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium flex items-center text-techGreen mb-2">
                        <CheckCircle className="h-5 w-5 mr-2" /> Solutions
                      </h4>
                      <p className="text-gray-300">{project.solutions}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Created</h4>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-techBlue" />
                          {project.createdAt}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Last Updated</h4>
                        <p className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-techPurple" />
                          {project.updatedAt}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Language</h4>
                        <p className="flex items-center">
                          <Code className="h-4 w-4 mr-2 text-techGreen" />
                          {project.language || "Multiple"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">License</h4>
                        <p className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-techBlue" />
                          {project.license || "None"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Repository</h4>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-techBlue hover:underline flex items-center"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {project.githubUrl}
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProjectShowcase
