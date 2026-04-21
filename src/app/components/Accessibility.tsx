import { useState } from "react";
import {
  Eye,
  Type,
  Contrast,
  MousePointer,
  Keyboard,
  Volume2,
  Languages,
  Moon,
  Sun,
  Palette,
  Mic,
  BookOpen,
  Target,
  Minimize2,
  Check,
  Settings as SettingsIcon,
  Zap,
} from "lucide-react";

export function Accessibility() {
  const [settings, setSettings] = useState({
    textSize: 16,
    highContrast: false,
    darkMode: false,
    colorBlindMode: "none",
    keyboardNav: false,
    reduceMotion: false,
    largeClickTargets: false,
    screenReader: false,
    voiceNav: false,
    readAloud: false,
    language: "en",
  });

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
  ];

  const colorBlindModes = [
    { id: "none", label: "None", description: "Standard colors" },
    { id: "protanopia", label: "Protanopia", description: "Red-green (red weak)" },
    { id: "deuteranopia", label: "Deuteranopia", description: "Red-green (green weak)" },
    { id: "tritanopia", label: "Tritanopia", description: "Blue-yellow" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-b border-[#E5E7EB]">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#0A2540] rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl text-[#0A2540]">
                Accessibility Settings
              </h1>
            </div>
            <p className="text-lg text-[#64748B] leading-relaxed">
              Customize your experience to match your needs. All settings sync across your devices.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <a href="#visual" className="block px-4 py-3 bg-white rounded-lg border-2 border-blue-200 text-[#0A2540] font-medium hover:border-blue-400 transition-all">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>Visual</span>
                </div>
              </a>
              <a href="#interaction" className="block px-4 py-3 bg-white rounded-lg border border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540] hover:text-[#0A2540] transition-all">
                <div className="flex items-center gap-3">
                  <MousePointer className="w-5 h-5" />
                  <span>Interaction</span>
                </div>
              </a>
              <a href="#assistive" className="block px-4 py-3 bg-white rounded-lg border border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540] hover:text-[#0A2540] transition-all">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  <span>Assistive</span>
                </div>
              </a>
              <a href="#language" className="block px-4 py-3 bg-white rounded-lg border border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540] hover:text-[#0A2540] transition-all">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5" />
                  <span>Language</span>
                </div>
              </a>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Quick Tip</span>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  All changes are saved automatically and sync across your devices.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Visual Settings */}
            <section id="visual">
              <div className="mb-6">
                <h2 className="text-2xl text-[#0A2540] mb-2">Visual Settings</h2>
                <p className="text-[#64748B]">Adjust display and appearance preferences</p>
              </div>

              <div className="space-y-6">
                {/* Text Size */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Type className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg text-[#0A2540] font-medium">Text Size</h3>
                        <p className="text-sm text-[#64748B]">Adjust for comfortable reading</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-50 rounded-md">
                      <span className="text-sm font-bold text-blue-600">{settings.textSize}px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={settings.textSize}
                    onChange={(e) => updateSetting("textSize", Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between mt-2 mb-4">
                    <span className="text-xs text-[#64748B]">Small</span>
                    <span className="text-xs text-[#64748B]">Large</span>
                  </div>
                  <div
                    className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]"
                    style={{ fontSize: `${settings.textSize}px` }}
                  >
                    <p className="text-[#0A2540]">Preview: The quick brown fox jumps over the lazy dog</p>
                  </div>
                </div>

                {/* Row of 3 toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* High Contrast */}
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Contrast className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-[#0A2540] font-medium">High Contrast</h3>
                    </div>
                    <p className="text-sm text-[#64748B] mb-4">Enhanced text visibility</p>
                    <label className="relative inline-flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={settings.highContrast}
                        onChange={(e) => updateSetting("highContrast", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-lg peer peer-checked:bg-blue-600 flex items-center justify-center transition-all">
                        <span className={`font-medium ${settings.highContrast ? "text-white" : "text-[#64748B]"}`}>
                          {settings.highContrast ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Dark Mode */}
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {settings.darkMode ? <Moon className="w-5 h-5 text-blue-600" /> : <Sun className="w-5 h-5 text-blue-600" />}
                      </div>
                      <h3 className="text-[#0A2540] font-medium">Dark Mode</h3>
                    </div>
                    <p className="text-sm text-[#64748B] mb-4">Reduce eye strain</p>
                    <label className="relative inline-flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={(e) => updateSetting("darkMode", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-lg peer peer-checked:bg-blue-600 flex items-center justify-center transition-all">
                        <span className={`font-medium ${settings.darkMode ? "text-white" : "text-[#64748B]"}`}>
                          {settings.darkMode ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Color Blind Mode - Compact */}
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-[#0A2540] font-medium">Color Mode</h3>
                    </div>
                    <p className="text-sm text-[#64748B] mb-4">Optimized palette</p>
                    <select
                      value={settings.colorBlindMode}
                      onChange={(e) => updateSetting("colorBlindMode", e.target.value)}
                      className="w-full h-12 px-4 bg-[#F8FAFC] border-2 border-[#E5E7EB] rounded-lg text-[#0A2540] font-medium focus:outline-none focus:border-blue-600 cursor-pointer"
                    >
                      {colorBlindModes.map((mode) => (
                        <option key={mode.id} value={mode.id}>
                          {mode.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Interaction Settings */}
            <section id="interaction">
              <div className="mb-6">
                <h2 className="text-2xl text-[#0A2540] mb-2">Interaction Settings</h2>
                <p className="text-[#64748B]">Control navigation and interface behavior</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Keyboard Navigation */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Keyboard className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-[#0A2540] font-medium">Keyboard Nav</h3>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Tab, Enter, Arrows</p>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={settings.keyboardNav}
                      onChange={(e) => updateSetting("keyboardNav", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-200 rounded-lg peer peer-checked:bg-green-600 flex items-center justify-center transition-all">
                      <span className={`font-medium ${settings.keyboardNav ? "text-white" : "text-[#64748B]"}`}>
                        {settings.keyboardNav ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Reduce Motion */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Minimize2 className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-[#0A2540] font-medium">Reduce Motion</h3>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Minimize animations</p>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={settings.reduceMotion}
                      onChange={(e) => updateSetting("reduceMotion", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-200 rounded-lg peer peer-checked:bg-green-600 flex items-center justify-center transition-all">
                      <span className={`font-medium ${settings.reduceMotion ? "text-white" : "text-[#64748B]"}`}>
                        {settings.reduceMotion ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Large Click Targets */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-[#0A2540] font-medium">Large Targets</h3>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Bigger buttons</p>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={settings.largeClickTargets}
                      onChange={(e) => updateSetting("largeClickTargets", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-200 rounded-lg peer peer-checked:bg-green-600 flex items-center justify-center transition-all">
                      <span className={`font-medium ${settings.largeClickTargets ? "text-white" : "text-[#64748B]"}`}>
                        {settings.largeClickTargets ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Assistive Features */}
            <section id="assistive">
              <div className="mb-6">
                <h2 className="text-2xl text-[#0A2540] mb-2">Assistive Features</h2>
                <p className="text-[#64748B]">Audio and voice assistance tools</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Screen Reader */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-[#0A2540] font-medium">Screen Reader</h3>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">NVDA, JAWS support</p>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={settings.screenReader}
                      onChange={(e) => updateSetting("screenReader", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-lg peer peer-checked:bg-purple-600 flex items-center justify-center transition-all">
                      <span className={`font-medium ${settings.screenReader ? "text-white" : "text-[#64748B]"}`}>
                        {settings.screenReader ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Voice Navigation */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mic className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-[#0A2540] font-medium">Voice Nav</h3>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Voice commands</p>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={settings.voiceNav}
                      onChange={(e) => updateSetting("voiceNav", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-lg peer peer-checked:bg-purple-600 flex items-center justify-center transition-all">
                      <span className={`font-medium ${settings.voiceNav ? "text-white" : "text-[#64748B]"}`}>
                        {settings.voiceNav ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Read Aloud */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-[#0A2540] font-medium">Read Aloud</h3>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Audio statements</p>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={settings.readAloud}
                      onChange={(e) => updateSetting("readAloud", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-12 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-lg peer peer-checked:bg-purple-600 flex items-center justify-center transition-all">
                      <span className={`font-medium ${settings.readAloud ? "text-white" : "text-[#64748B]"}`}>
                        {settings.readAloud ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Language Settings */}
            <section id="language">
              <div className="mb-6">
                <h2 className="text-2xl text-[#0A2540] mb-2">Language Preferences</h2>
                <p className="text-[#64748B]">Choose your preferred language</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => updateSetting("language", lang.code)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      settings.language === lang.code
                        ? "border-[#0A2540] bg-blue-50"
                        : "border-[#E5E7EB] bg-white hover:border-[#0A2540]"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2 font-bold text-[#0A2540]">{lang.native}</div>
                      <div className={`text-sm ${
                        settings.language === lang.code ? "text-[#0A2540] font-medium" : "text-[#64748B]"
                      }`}>
                        {lang.name}
                      </div>
                      {settings.language === lang.code && (
                        <div className="mt-3 flex justify-center">
                          <div className="w-6 h-6 bg-[#0A2540] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Save Settings */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl mb-2">Ready to save your preferences?</h3>
                  <p className="text-blue-100">
                    Settings will sync across all your devices automatically
                  </p>
                </div>
                <button className="px-8 py-4 bg-white text-[#0A2540] rounded-xl hover:bg-blue-50 transition-all shadow-lg font-medium text-lg">
                  Save All Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
