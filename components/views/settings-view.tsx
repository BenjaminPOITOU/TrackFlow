"use client"
import { Button } from "@/components/ui/button"
import { Save, User, Briefcase, Globe } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SettingsView() {
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">ACCOUNT_SYS</h1>
          <p className="text-[#EFEFEF]">CONFIGURE_YOUR_PROFILE</p>
        </div>
        <div className="w-8 h-8">
          <MiniVisualizer type="grid" />
        </div>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="account" className="w-full">
        <div className="flex">
          <TabsList className="bg-[#0D0D0D] border border-[#333333] p-1 flex-col h-auto mr-6 space-y-1">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF] justify-start"
            >
              <User size={16} className="mr-2" /> ACCOUNT
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="account" className="mt-0">
              <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                <h2 className="text-lg font-medium mb-6 glow-text-sm">ACCOUNT_SETTINGS</h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center">
                      <span className="text-xl">US</span>
                    </div>
                    <div>
                      <h3 className="font-medium">USER_STUDIO</h3>
                      <p className="text-sm text-[#EFEFEF]">user@soundflow.io</p>
                    </div>
                    <Button className="ml-auto bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF]">
                      CHANGE_AVATAR
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="display-name" className="text-[#EFEFEF]">
                        DISPLAY_NAME
                      </Label>
                      <Input
                        id="display-name"
                        defaultValue="USER_STUDIO"
                        className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#EFEFEF]">
                        EMAIL
                      </Label>
                      <Input
                        id="email"
                        defaultValue="user@soundflow.io"
                        className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[#EFEFEF]">
                        PASSWORD
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        defaultValue="********"
                        className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-[#EFEFEF]">
                        LANGUAGE
                      </Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                          <SelectItem value="en">ENGLISH</SelectItem>
                          <SelectItem value="fr">FRENCH</SelectItem>
                          <SelectItem value="es">SPANISH</SelectItem>
                          <SelectItem value="de">GERMAN</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Champ Role */}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-[#EFEFEF] flex items-center gap-2">
                        <Briefcase size={14} /> ROLE
                      </Label>
                      <Select defaultValue="producer">
                        <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                          <SelectItem value="producer">PRODUCER</SelectItem>
                          <SelectItem value="artist">ARTIST</SelectItem>
                          <SelectItem value="engineer">ENGINEER</SelectItem>
                          <SelectItem value="manager">MANAGER</SelectItem>
                          <SelectItem value="other">OTHER</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-[#EFEFEF] flex items-center gap-2">
                        <Globe size={14} /> WEBSITE
                      </Label>
                      <Input
                        id="website"
                        placeholder="https://your-website.com"
                        className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="biography" className="text-[#EFEFEF] flex items-center gap-2">
                        <User size={14} /> BIOGRAPHY
                      </Label>
                      <Textarea
                        id="biography"
                        placeholder="Tell us about yourself and your work..."
                        className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF] min-h-[120px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">
                      <Save size={16} className="mr-2" /> SAVE_CHANGES
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

