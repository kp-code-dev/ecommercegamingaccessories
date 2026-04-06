import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { FaHeadphonesAlt, FaGamepad, FaLaptopCode } from "react-icons/fa";
import { SiIntel, SiAmd, SiYoutubegaming } from "react-icons/si";
import { BsDeviceHdd, BsDeviceSsd, BsKeyboard, BsMouse3Fill, BsNvidia } from "react-icons/bs";
import { MdScreenshotMonitor } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { getProcessorsBySeries, type ProcessorModel } from "@/data/processorSeries";

type Selections = {
  purpose: string; platform: string; processor: string; motherboard: string;
  ramSize: string; ramCategory: string; storageType: string; gpu: string;
  cooler: string; psu: string; cabinet: string; monitor: string;
  keyboard: string; mouse: string; headset: string;
};

const categoryOrder: (keyof Selections)[] = [
  "purpose","platform","processor","motherboard","ramSize","ramCategory",
  "storageType","gpu","cooler","psu","cabinet","monitor","keyboard","mouse","headset",
];

const ChoiceBtn = ({ label, selected, onClick, icon }: { label: string; selected: boolean; onClick: () => void; icon?: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-heading text-xs uppercase tracking-wider border transition-all cursor-pointer ${
      selected
        ? "bg-primary text-primary-foreground border-primary shadow-[var(--glow-primary-sm)]"
        : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
    }`}
  >
    {icon && <span className="text-base">{icon}</span>}
    {label}
  </button>
);

function BuildPC() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [budget, setBudget] = useState(20000);
  const [showAllProcessors, setShowAllProcessors] = useState(false);
  const [selectedProcessorModel, setSelectedProcessorModel] = useState<ProcessorModel | null>(null);
  const [selections, setSelections] = useState<Selections>({
    purpose:"", platform:"", processor:"", motherboard:"",
    ramSize:"", ramCategory:"", storageType:"", gpu:"",
    cooler:"", psu:"", cabinet:"", monitor:"", keyboard:"", mouse:"", headset:"",
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const activeTab = searchParams.get("type");

  const handleSelectTab = (type: string) => setSearchParams({ type });

  const handleSelect = (category: keyof Selections, value: string) => {
    setSelections(prev => {
      const next = { ...prev, [category]: value };
      if (prev[category] !== value) {
        const idx = categoryOrder.indexOf(category);
        for (let i = idx + 1; i < categoryOrder.length; i++) next[categoryOrder[i]] = "";
        if (category === "processor" || categoryOrder.indexOf(category) < categoryOrder.indexOf("processor")) {
          setShowAllProcessors(false);
          setSelectedProcessorModel(null);
        }
      }
      return next;
    });
  };

  const sectionLabel = "text-primary font-heading text-xs uppercase tracking-widest mt-6 mb-3";
  const subLabel = "text-muted-foreground font-heading text-[0.65rem] uppercase tracking-wider mt-4 mb-2 flex items-center gap-2";

  if (!activeTab) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heading title="Select Your Path" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div onClick={() => handleSelectTab("custom")} className="bg-card border border-border rounded-xl p-8 cursor-pointer hover:border-primary hover:shadow-[var(--glow-primary-sm)] transition-all group">
                <FaGamepad className="text-4xl text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-4" />
                <h2 className="font-heading text-lg font-bold text-foreground mb-2">Custom Build PC</h2>
                <p className="text-muted-foreground font-body text-sm">Pick specific components tailored to your needs.</p>
              </div>
              <div onClick={() => handleSelectTab("budget")} className="bg-card border border-border rounded-xl p-8 cursor-pointer hover:border-primary hover:shadow-[var(--glow-primary-sm)] transition-all group">
                <FaLaptopCode className="text-4xl text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-4" />
                <h2 className="font-heading text-lg font-bold text-foreground mb-2">Budget PC</h2>
                <p className="text-muted-foreground font-body text-sm">Set a price and let us find the best PC for you.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Builder */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button onClick={() => handleSelectTab("custom")} className={`px-5 py-2.5 rounded-md font-heading text-xs uppercase tracking-wider border transition-all cursor-pointer ${activeTab === "custom" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary"}`}>
                  Custom PC
                </button>
                <button onClick={() => handleSelectTab("budget")} className={`px-5 py-2.5 rounded-md font-heading text-xs uppercase tracking-wider border transition-all cursor-pointer ${activeTab === "budget" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary"}`}>
                  Budget PC
                </button>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                {activeTab === "custom" && (
                  <div>
                    <p className={sectionLabel}>Select Purpose</p>
                    <div className="flex flex-wrap gap-3">
                      <ChoiceBtn label="Gaming" selected={selections.purpose === "Gaming"} onClick={() => handleSelect("purpose", "Gaming")} icon={<SiYoutubegaming />} />
                      <ChoiceBtn label="Productivity (Coding & Editing)" selected={selections.purpose === "Productivity"} onClick={() => handleSelect("purpose", "Productivity")} icon={<FaLaptopCode />} />
                    </div>

                    {selections.purpose && (<>
                      <p className={sectionLabel}>Choose Your Platform</p>
                      <div className="flex flex-wrap gap-3">
                        <ChoiceBtn label="Intel" selected={selections.platform === "Intel"} onClick={() => handleSelect("platform", "Intel")} icon={<SiIntel />} />
                        <ChoiceBtn label="AMD" selected={selections.platform === "AMD"} onClick={() => handleSelect("platform", "AMD")} icon={<SiAmd />} />
                      </div>
                    </>)}

                    {selections.platform && (<>
                      <p className={sectionLabel}>Select Processor Series</p>
                      <div className="flex flex-wrap gap-3">
                        {(selections.platform === "Intel"
                          ? ["Intel Core i3","Intel Core i5","Intel Core i7","Intel Core i9"]
                          : ["AMD Ryzen 3","AMD Ryzen 5","AMD Ryzen 7","AMD Ryzen 9"]
                        ).map(p => <ChoiceBtn key={p} label={p} selected={selections.processor === p} onClick={() => handleSelect("processor", p)} />)}
                      </div>

                      {/* Processor Models Grid */}
                      {selections.processor && (() => {
                        const allModels = getProcessorsBySeries(selections.processor);
                        const displayModels = showAllProcessors ? allModels : allModels.slice(0, 3);
                        const generations = [...new Set(allModels.map(p => p.generation))];

                        return (
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-muted-foreground font-heading text-[0.65rem] uppercase tracking-wider flex items-center gap-2">
                                Latest {selections.processor} Processors
                              </p>
                              {allModels.length > 3 && (
                                <button
                                  onClick={() => setShowAllProcessors(!showAllProcessors)}
                                  className="text-primary font-heading text-[0.65rem] uppercase tracking-wider hover:underline cursor-pointer transition-colors"
                                >
                                  {showAllProcessors ? "Show Less" : `View More (${allModels.length})`}
                                </button>
                              )}
                            </div>

                            {/* Generation filter tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {generations.map(gen => (
                                <span key={gen} className="text-[0.6rem] font-heading uppercase tracking-wider px-2 py-1 rounded bg-secondary text-muted-foreground border border-border">
                                  {gen}
                                </span>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {displayModels.map(proc => (
                                <div
                                  key={proc.id}
                                  onClick={() => setSelectedProcessorModel(proc)}
                                  className={`bg-secondary/50 border rounded-lg p-3 cursor-pointer transition-all hover:border-primary hover:shadow-[var(--glow-primary-sm)] ${
                                    selectedProcessorModel?.id === proc.id
                                      ? "border-primary shadow-[var(--glow-primary-sm)]"
                                      : "border-border"
                                  }`}
                                >
                                  <div className="aspect-video rounded-md overflow-hidden mb-2 bg-background">
                                    <img
                                      src={proc.image}
                                      alt={proc.name}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                  <h4 className="font-heading text-xs font-bold text-foreground truncate">{proc.name}</h4>
                                  <p className="text-[0.6rem] text-primary font-heading uppercase tracking-wider mt-0.5">{proc.generation}</p>
                                  <div className="mt-2 space-y-0.5 text-[0.6rem] text-muted-foreground font-body">
                                    <div className="flex justify-between"><span>Cores/Threads</span><span className="text-foreground">{proc.cores}C / {proc.threads}T</span></div>
                                    <div className="flex justify-between"><span>Base / Boost</span><span className="text-foreground">{proc.baseClock} / {proc.boostClock}</span></div>
                                    <div className="flex justify-between"><span>TDP</span><span className="text-foreground">{proc.tdp}</span></div>
                                  </div>
                                  <p className="font-heading font-bold text-sm text-primary mt-2">₹{proc.price.toLocaleString("en-IN")}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </>)}

                    {selectedProcessorModel && (<>
                      <p className={sectionLabel}>Select Motherboard</p>
                      <div className="flex flex-wrap gap-3">
                        <ChoiceBtn label={selections.platform} selected={selections.motherboard === selections.platform} onClick={() => handleSelect("motherboard", selections.platform)} />
                      </div>
                    </>)}

                    {selections.motherboard && (<>
                      <p className={sectionLabel}>Choose Your RAM</p>
                      <p className={subLabel}>Select Size:</p>
                      <div className="flex flex-wrap gap-3">
                        {["8GB","16GB","32GB","64GB","64GB+"].map(s => <ChoiceBtn key={s} label={s} selected={selections.ramSize === s} onClick={() => handleSelect("ramSize", s)} />)}
                      </div>
                      {selections.ramSize && (<>
                        <p className={subLabel}>Select Category:</p>
                        <div className="flex flex-wrap gap-3">
                          {["DDR4","DDR5"].map(c => <ChoiceBtn key={c} label={c} selected={selections.ramCategory === c} onClick={() => handleSelect("ramCategory", c)} />)}
                        </div>
                      </>)}
                    </>)}

                    {selections.ramCategory && (<>
                      <p className={sectionLabel}>Choose Storage</p>
                      <div className="flex flex-wrap gap-3">
                        <ChoiceBtn label="SSD" selected={selections.storageType === "SSD"} onClick={() => handleSelect("storageType", "SSD")} icon={<BsDeviceSsd />} />
                        <ChoiceBtn label="HDD" selected={selections.storageType === "HDD"} onClick={() => handleSelect("storageType", "HDD")} icon={<BsDeviceHdd />} />
                      </div>
                    </>)}

                    {selections.storageType && (<>
                      <p className={sectionLabel}>Select Graphics Card (GPU)</p>
                      <div className="flex flex-wrap gap-3">
                        <ChoiceBtn label="NVIDIA" selected={selections.gpu === "NVIDIA"} onClick={() => handleSelect("gpu", "NVIDIA")} icon={<BsNvidia />} />
                        <ChoiceBtn label="AMD" selected={selections.gpu === "AMD"} onClick={() => handleSelect("gpu", "AMD")} icon={<SiAmd />} />
                      </div>
                    </>)}

                    {selections.gpu && (<>
                      <p className={sectionLabel}>Select CPU Cooler</p>
                      <div className="flex flex-wrap gap-3">
                        {["Air Cooler","Liquid Cooler"].map(c => <ChoiceBtn key={c} label={c} selected={selections.cooler === c} onClick={() => handleSelect("cooler", c)} />)}
                      </div>
                    </>)}

                    {selections.cooler && (<>
                      <p className={sectionLabel}>Select Power Supply (PSU)</p>
                      <div className="flex flex-wrap gap-3">
                        {["550W","650W","750W","850W","1000W"].map(p => <ChoiceBtn key={p} label={p} selected={selections.psu === p} onClick={() => handleSelect("psu", p)} />)}
                      </div>
                    </>)}

                    {selections.psu && (<>
                      <p className={sectionLabel}>Select Cabinet (PC Case)</p>
                      <div className="flex flex-wrap gap-3">
                        {["ATX","Micro ATX","Mini ITX"].map(c => <ChoiceBtn key={c} label={c} selected={selections.cabinet === c} onClick={() => handleSelect("cabinet", c)} />)}
                      </div>
                    </>)}

                    {selections.cabinet && (<>
                      <p className={sectionLabel}>Select Peripherals</p>
                      <p className={subLabel}><MdScreenshotMonitor size={16} /> Monitor</p>
                      <div className="flex flex-wrap gap-3">
                        {["24 inch","27 inch","32 inch"].map(m => <ChoiceBtn key={m} label={m} selected={selections.monitor === m} onClick={() => handleSelect("monitor", m)} />)}
                      </div>

                      {selections.monitor && (<>
                        <p className={subLabel}><BsKeyboard size={16} /> Keyboard</p>
                        <div className="flex flex-wrap gap-3">
                          {["Mechanical","Membrane"].map(k => <ChoiceBtn key={k} label={k} selected={selections.keyboard === k} onClick={() => handleSelect("keyboard", k)} />)}
                        </div>
                      </>)}

                      {selections.keyboard && (<>
                        <p className={subLabel}><BsMouse3Fill size={16} /> Mouse</p>
                        <div className="flex flex-wrap gap-3">
                          {["Gaming","Office"].map(m => <ChoiceBtn key={m} label={m} selected={selections.mouse === m} onClick={() => handleSelect("mouse", m)} />)}
                        </div>
                      </>)}

                      {selections.mouse && (<>
                        <p className={subLabel}><FaHeadphonesAlt size={16} /> Headset</p>
                        <div className="flex flex-wrap gap-3">
                          {["Gaming","Office"].map(h => <ChoiceBtn key={h} label={h} selected={selections.headset === h} onClick={() => handleSelect("headset", h)} />)}
                        </div>
                      </>)}
                    </>)}

                    {selections.headset && (
                      <div className="mt-8">
                        <div className="bg-secondary/50 border border-primary/30 rounded-lg p-6">
                          <p className="text-primary font-heading text-xs uppercase tracking-widest mb-2">The Final Reveal</p>
                          <h3 className="font-heading text-lg font-bold text-foreground mb-4">Your Custom Beast</h3>
                          <ul className="space-y-2 text-muted-foreground font-body text-sm">
                            <li>🎮 <strong className="text-foreground">Gaming:</strong> GTA V (Ultra): 110 FPS | Valorant: 350+ FPS</li>
                            <li>💻 <strong className="text-foreground">Productivity:</strong> 4K Render Time: Fast | Multitasking: Excellent</li>
                            <li>✅ <strong className="text-foreground">System Health Check (Compatibility Seal)</strong></li>
                            <li>✅ 100% Compatible — Motherboard, CPU, and RAM fit perfectly.</li>
                            <li>⚡ Power Check — Your Build: 380W | PSU Capacity: {selections.psu} (Safe Buffer)</li>
                            <li>🌡️ Thermal Check — Airflow is optimized for {selections.cabinet} Cabinet.</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <button className="px-5 py-2.5 bg-primary text-primary-foreground border-none rounded-md font-heading font-bold text-xs uppercase cursor-pointer hover:shadow-[var(--glow-primary)] transition-all">
                            Download Quotation (PDF)
                          </button>
                          <button className="px-5 py-2.5 bg-card border border-primary text-primary rounded-md font-heading font-bold text-xs uppercase cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                            Share Configuration
                          </button>
                          <button className="px-5 py-2.5 bg-card border border-border text-muted-foreground rounded-md font-heading font-bold text-xs uppercase cursor-pointer hover:border-primary hover:text-foreground transition-all">
                            Save for Later
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "budget" && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground font-body mb-4">Set The Gaming PC Budget:</p>
                    <div className="flex items-center gap-4 justify-center mb-4">
                      <span className="text-muted-foreground font-heading text-xs">₹20K</span>
                      <input
                        type="range" min="20000" max="200000" step="5000"
                        value={budget} onChange={e => setBudget(Number(e.target.value))}
                        className="w-64 accent-primary"
                      />
                      <span className="text-muted-foreground font-heading text-xs">₹2L+</span>
                    </div>
                    <p className="text-foreground font-heading text-xl font-bold mb-4">₹{budget.toLocaleString("en-IN")}</p>
                    <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-heading font-bold text-xs uppercase border-none cursor-pointer hover:shadow-[var(--glow-primary)] transition-all">
                      Find PCs
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-28">
                <h3 className="font-heading text-sm uppercase text-primary tracking-wider mb-4">Final Pricing & Actions</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Selected Type</span>
                    <span className="text-foreground">{activeTab === "custom" ? "Custom Parts" : "Pre-built Base"}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">₹0</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (18% Included)</span>
                    <span className="text-foreground">₹0</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground">FREE</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-foreground pt-2 border-t border-border">
                    <span>Grand Total</span>
                    <span className="text-primary">₹0</span>
                  </div>
                </div>
                <button
                  disabled
                  className="w-full mt-4 py-3 bg-muted text-muted-foreground rounded-md font-heading font-bold text-xs uppercase border-none cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BuildPC;
