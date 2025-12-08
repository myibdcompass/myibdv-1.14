"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface WaitlistFormProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistForm({ isOpen, onClose }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")
    
    try {
      const response = await fetch("https://formspree.io/f/xeorwkgl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          _subject: `New Waitlist Sign-up: ${formData.role} - ${formData.name}`
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setTimeout(() => {
          onClose()
          setStatus("idle")
          setFormData({ name: "", email: "", role: "" })
        }, 2000)
      } else {
        throw new Error(data.error || "Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit form")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">Join the Waitlist</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Be the first to know when MyIBDCompass launches in January 2026
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="clinician">Clinician</SelectItem>
                <SelectItem value="sponsor">Sponsor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {status === "error" && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 mb-4">
              {errorMessage || "Something went wrong. Please try again."}
            </div>
          )}
          {status === "success" && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 mb-4">
              Thanks for joining! We'll keep you updated about the launch.
            </div>
          )}
          <Button 
            type="submit" 
            className={`w-full transition-all duration-200 ${
              status === "success" 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-accent hover:bg-accent/90"
            } text-white`}
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Joining...
              </div>
            ) : status === "success" ? (
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Joined Successfully!
              </div>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}