export interface ComponentModel {
  id: string;
  name: string;
  series: string;
  generation: string;
  specs: Record<string, string>;
  price: number;
  image: string;
}

// ===== MOTHERBOARDS =====
export const motherboardModels: ComponentModel[] = [
  // Intel Motherboards
  { id: "mb-z790-asus", name: "ASUS ROG Strix Z790-E Gaming", series: "Intel", generation: "Z790 (LGA 1700)", specs: { Chipset: "Z790", Socket: "LGA 1700", RAM: "DDR5", "M.2 Slots": "4" }, price: 42999, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
  { id: "mb-z790-msi", name: "MSI MAG Z790 Tomahawk WiFi", series: "Intel", generation: "Z790 (LGA 1700)", specs: { Chipset: "Z790", Socket: "LGA 1700", RAM: "DDR5", "M.2 Slots": "4" }, price: 34999, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "mb-b760-asus", name: "ASUS TUF Gaming B760M-Plus WiFi", series: "Intel", generation: "B760 (LGA 1700)", specs: { Chipset: "B760", Socket: "LGA 1700", RAM: "DDR5", "M.2 Slots": "2" }, price: 18999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "mb-b760-giga", name: "Gigabyte B760M DS3H AX DDR4", series: "Intel", generation: "B760 (LGA 1700)", specs: { Chipset: "B760", Socket: "LGA 1700", RAM: "DDR4", "M.2 Slots": "2" }, price: 12499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { id: "mb-h610-asus", name: "ASUS Prime H610M-E D4", series: "Intel", generation: "H610 (LGA 1700)", specs: { Chipset: "H610", Socket: "LGA 1700", RAM: "DDR4", "M.2 Slots": "1" }, price: 7999, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "mb-h610-giga", name: "Gigabyte H610M H DDR4", series: "Intel", generation: "H610 (LGA 1700)", specs: { Chipset: "H610", Socket: "LGA 1700", RAM: "DDR4", "M.2 Slots": "1" }, price: 6499, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
  // AMD Motherboards
  { id: "mb-x670e-asus", name: "ASUS ROG Crosshair X670E Hero", series: "AMD", generation: "X670E (AM5)", specs: { Chipset: "X670E", Socket: "AM5", RAM: "DDR5", "M.2 Slots": "5" }, price: 59999, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "mb-b650-msi", name: "MSI MAG B650 Tomahawk WiFi", series: "AMD", generation: "B650 (AM5)", specs: { Chipset: "B650", Socket: "AM5", RAM: "DDR5", "M.2 Slots": "3" }, price: 24999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "mb-b650-giga", name: "Gigabyte B650M DS3H", series: "AMD", generation: "B650 (AM5)", specs: { Chipset: "B650", Socket: "AM5", RAM: "DDR5", "M.2 Slots": "2" }, price: 14999, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { id: "mb-b550-asus", name: "ASUS TUF Gaming B550M-Plus WiFi II", series: "AMD", generation: "B550 (AM4)", specs: { Chipset: "B550", Socket: "AM4", RAM: "DDR4", "M.2 Slots": "2" }, price: 14499, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "mb-a520-giga", name: "Gigabyte A520M DS3H", series: "AMD", generation: "A520 (AM4)", specs: { Chipset: "A520", Socket: "AM4", RAM: "DDR4", "M.2 Slots": "1" }, price: 6299, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
  { id: "mb-x570-asus", name: "ASUS ROG Strix X570-E Gaming", series: "AMD", generation: "X570 (AM4)", specs: { Chipset: "X570", Socket: "AM4", RAM: "DDR4", "M.2 Slots": "2" }, price: 32999, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
];

// ===== RAM =====
export const ramModels: ComponentModel[] = [
  // DDR4 8GB
  { id: "ram-ddr4-8-corsair", name: "Corsair Vengeance LPX 8GB DDR4 3200MHz", series: "DDR4-8GB", generation: "DDR4", specs: { Capacity: "8GB", Speed: "3200MHz", Type: "DDR4", CAS: "CL16" }, price: 1899, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  { id: "ram-ddr4-8-kingston", name: "Kingston Fury Beast 8GB DDR4 3200MHz", series: "DDR4-8GB", generation: "DDR4", specs: { Capacity: "8GB", Speed: "3200MHz", Type: "DDR4", CAS: "CL16" }, price: 1799, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "ram-ddr4-8-gskill", name: "G.Skill Ripjaws V 8GB DDR4 3600MHz", series: "DDR4-8GB", generation: "DDR4", specs: { Capacity: "8GB", Speed: "3600MHz", Type: "DDR4", CAS: "CL18" }, price: 2099, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  // DDR4 16GB
  { id: "ram-ddr4-16-corsair", name: "Corsair Vengeance LPX 16GB (2x8) DDR4 3200MHz", series: "DDR4-16GB", generation: "DDR4", specs: { Capacity: "16GB (2x8)", Speed: "3200MHz", Type: "DDR4", CAS: "CL16" }, price: 3499, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  { id: "ram-ddr4-16-kingston", name: "Kingston Fury Beast 16GB (2x8) DDR4 3200MHz", series: "DDR4-16GB", generation: "DDR4", specs: { Capacity: "16GB (2x8)", Speed: "3200MHz", Type: "DDR4", CAS: "CL16" }, price: 3299, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "ram-ddr4-16-gskill", name: "G.Skill Trident Z RGB 16GB (2x8) DDR4 3600MHz", series: "DDR4-16GB", generation: "DDR4", specs: { Capacity: "16GB (2x8)", Speed: "3600MHz", Type: "DDR4", CAS: "CL18" }, price: 4299, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  // DDR4 32GB
  { id: "ram-ddr4-32-corsair", name: "Corsair Vengeance LPX 32GB (2x16) DDR4 3200MHz", series: "DDR4-32GB", generation: "DDR4", specs: { Capacity: "32GB (2x16)", Speed: "3200MHz", Type: "DDR4", CAS: "CL16" }, price: 6799, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  { id: "ram-ddr4-32-gskill", name: "G.Skill Trident Z Neo 32GB (2x16) DDR4 3600MHz", series: "DDR4-32GB", generation: "DDR4", specs: { Capacity: "32GB (2x16)", Speed: "3600MHz", Type: "DDR4", CAS: "CL18" }, price: 8499, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  // DDR5 8GB
  { id: "ram-ddr5-8-kingston", name: "Kingston Fury Beast 8GB DDR5 5600MHz", series: "DDR5-8GB", generation: "DDR5", specs: { Capacity: "8GB", Speed: "5600MHz", Type: "DDR5", CAS: "CL36" }, price: 2499, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "ram-ddr5-8-corsair", name: "Corsair Vengeance 8GB DDR5 5200MHz", series: "DDR5-8GB", generation: "DDR5", specs: { Capacity: "8GB", Speed: "5200MHz", Type: "DDR5", CAS: "CL40" }, price: 2299, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  // DDR5 16GB
  { id: "ram-ddr5-16-corsair", name: "Corsair Vengeance 16GB (2x8) DDR5 5600MHz", series: "DDR5-16GB", generation: "DDR5", specs: { Capacity: "16GB (2x8)", Speed: "5600MHz", Type: "DDR5", CAS: "CL36" }, price: 4999, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  { id: "ram-ddr5-16-gskill", name: "G.Skill Trident Z5 RGB 16GB (2x8) DDR5 6000MHz", series: "DDR5-16GB", generation: "DDR5", specs: { Capacity: "16GB (2x8)", Speed: "6000MHz", Type: "DDR5", CAS: "CL30" }, price: 6499, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "ram-ddr5-16-kingston", name: "Kingston Fury Beast 16GB (2x8) DDR5 5600MHz", series: "DDR5-16GB", generation: "DDR5", specs: { Capacity: "16GB (2x8)", Speed: "5600MHz", Type: "DDR5", CAS: "CL36" }, price: 4699, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  // DDR5 32GB
  { id: "ram-ddr5-32-corsair", name: "Corsair Dominator Platinum RGB 32GB (2x16) DDR5 6000MHz", series: "DDR5-32GB", generation: "DDR5", specs: { Capacity: "32GB (2x16)", Speed: "6000MHz", Type: "DDR5", CAS: "CL30" }, price: 13499, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  { id: "ram-ddr5-32-gskill", name: "G.Skill Trident Z5 Neo 32GB (2x16) DDR5 6000MHz", series: "DDR5-32GB", generation: "DDR5", specs: { Capacity: "32GB (2x16)", Speed: "6000MHz", Type: "DDR5", CAS: "CL30" }, price: 12999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  // DDR5 64GB
  { id: "ram-ddr5-64-corsair", name: "Corsair Dominator Platinum RGB 64GB (2x32) DDR5 5600MHz", series: "DDR5-64GB", generation: "DDR5", specs: { Capacity: "64GB (2x32)", Speed: "5600MHz", Type: "DDR5", CAS: "CL36" }, price: 24999, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
  { id: "ram-ddr4-64-corsair", name: "Corsair Vengeance LPX 64GB (2x32) DDR4 3200MHz", series: "DDR4-64GB", generation: "DDR4", specs: { Capacity: "64GB (2x32)", Speed: "3200MHz", Type: "DDR4", CAS: "CL16" }, price: 13999, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop" },
];

// ===== STORAGE =====
export const storageModels: ComponentModel[] = [
  // SSD
  { id: "ssd-samsung-980pro", name: "Samsung 980 PRO 1TB NVMe M.2 SSD", series: "SSD", generation: "NVMe Gen4", specs: { Capacity: "1TB", Interface: "NVMe M.2", Read: "7000 MB/s", Write: "5000 MB/s" }, price: 7999, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop" },
  { id: "ssd-samsung-990pro", name: "Samsung 990 PRO 2TB NVMe M.2 SSD", series: "SSD", generation: "NVMe Gen4", specs: { Capacity: "2TB", Interface: "NVMe M.2", Read: "7450 MB/s", Write: "6900 MB/s" }, price: 16499, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop" },
  { id: "ssd-wd-sn850x", name: "WD Black SN850X 1TB NVMe M.2 SSD", series: "SSD", generation: "NVMe Gen4", specs: { Capacity: "1TB", Interface: "NVMe M.2", Read: "7300 MB/s", Write: "6300 MB/s" }, price: 7499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { id: "ssd-crucial-p5", name: "Crucial P5 Plus 1TB NVMe M.2 SSD", series: "SSD", generation: "NVMe Gen4", specs: { Capacity: "1TB", Interface: "NVMe M.2", Read: "6600 MB/s", Write: "5000 MB/s" }, price: 5999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "ssd-kingston-a2000", name: "Kingston A2000 500GB NVMe M.2 SSD", series: "SSD", generation: "NVMe Gen3", specs: { Capacity: "500GB", Interface: "NVMe M.2", Read: "2200 MB/s", Write: "2000 MB/s" }, price: 3499, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "ssd-samsung-870evo", name: "Samsung 870 EVO 1TB SATA SSD", series: "SSD", generation: "SATA III", specs: { Capacity: "1TB", Interface: "SATA III 2.5\"", Read: "560 MB/s", Write: "530 MB/s" }, price: 5499, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop" },
  // HDD
  { id: "hdd-seagate-1tb", name: "Seagate Barracuda 1TB 7200RPM HDD", series: "HDD", generation: "3.5\" SATA", specs: { Capacity: "1TB", Interface: "SATA III", Speed: "7200 RPM", Cache: "64MB" }, price: 3199, image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop" },
  { id: "hdd-seagate-2tb", name: "Seagate Barracuda 2TB 7200RPM HDD", series: "HDD", generation: "3.5\" SATA", specs: { Capacity: "2TB", Interface: "SATA III", Speed: "7200 RPM", Cache: "256MB" }, price: 4799, image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop" },
  { id: "hdd-wd-blue-1tb", name: "WD Blue 1TB 7200RPM HDD", series: "HDD", generation: "3.5\" SATA", specs: { Capacity: "1TB", Interface: "SATA III", Speed: "7200 RPM", Cache: "64MB" }, price: 3099, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { id: "hdd-toshiba-4tb", name: "Toshiba X300 4TB Performance HDD", series: "HDD", generation: "3.5\" SATA", specs: { Capacity: "4TB", Interface: "SATA III", Speed: "7200 RPM", Cache: "256MB" }, price: 8999, image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop" },
];

// ===== GRAPHICS CARDS =====
export const gpuModels: ComponentModel[] = [
  // NVIDIA
  { id: "gpu-rtx5060", name: "MSI GeForce RTX 5060 8G Ventus 2X", series: "NVIDIA", generation: "RTX 50 Series", specs: { VRAM: "8GB GDDR7", Boost: "2.6 GHz", TDP: "150W", Ports: "3x DP, 1x HDMI" }, price: 49149, image: "https://images.unsplash.com/photo-1625225233840-695456021cde?w=400&h=300&fit=crop" },
  { id: "gpu-rtx4060", name: "ASUS Dual GeForce RTX 4060 OC 8GB", series: "NVIDIA", generation: "RTX 40 Series", specs: { VRAM: "8GB GDDR6", Boost: "2.46 GHz", TDP: "115W", Ports: "3x DP, 1x HDMI" }, price: 29999, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop" },
  { id: "gpu-rtx4070ti", name: "ASUS ROG Strix RTX 4070 Ti OC", series: "NVIDIA", generation: "RTX 40 Series", specs: { VRAM: "12GB GDDR6X", Boost: "2.76 GHz", TDP: "285W", Ports: "3x DP, 2x HDMI" }, price: 121149, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop" },
  { id: "gpu-rtx5070ti", name: "MSI Gaming RTX 5070 Ti 16G", series: "NVIDIA", generation: "RTX 50 Series", specs: { VRAM: "16GB GDDR7", Boost: "2.62 GHz", TDP: "300W", Ports: "3x DP, 1x HDMI" }, price: 455216, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop" },
  { id: "gpu-rtx5080", name: "ASUS ROG Astral RTX 5080 OC 16GB", series: "NVIDIA", generation: "RTX 50 Series", specs: { VRAM: "16GB GDDR7", Boost: "2.62 GHz", TDP: "360W", Ports: "3x DP, 1x HDMI" }, price: 305031, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop" },
  { id: "gpu-rtx3050", name: "Gigabyte RTX 3050 Windforce OC 6GB", series: "NVIDIA", generation: "RTX 30 Series", specs: { VRAM: "6GB GDDR6", Boost: "1.50 GHz", TDP: "115W", Ports: "2x DP, 2x HDMI" }, price: 25999, image: "https://images.unsplash.com/photo-1620283085068-5aab80ee3e13?w=400&h=300&fit=crop" },
  // AMD
  { id: "gpu-rx7900xtx", name: "Sapphire Nitro+ RX 7900 XTX 24GB", series: "AMD", generation: "RX 7000 Series", specs: { VRAM: "24GB GDDR6", Boost: "2.68 GHz", TDP: "355W", Ports: "2x DP, 2x HDMI" }, price: 95999, image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=400&h=300&fit=crop" },
  { id: "gpu-rx7800xt", name: "PowerColor Red Devil RX 7800 XT 16GB", series: "AMD", generation: "RX 7000 Series", specs: { VRAM: "16GB GDDR6", Boost: "2.48 GHz", TDP: "263W", Ports: "2x DP, 2x HDMI" }, price: 52999, image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=400&h=300&fit=crop" },
  { id: "gpu-rx7600", name: "MSI MECH RX 7600 8GB", series: "AMD", generation: "RX 7000 Series", specs: { VRAM: "8GB GDDR6", Boost: "2.66 GHz", TDP: "165W", Ports: "2x DP, 1x HDMI" }, price: 27999, image: "https://images.unsplash.com/photo-1625225233840-695456021cde?w=400&h=300&fit=crop" },
  { id: "gpu-rx6650xt", name: "Sapphire Pulse RX 6650 XT 8GB", series: "AMD", generation: "RX 6000 Series", specs: { VRAM: "8GB GDDR6", Boost: "2.63 GHz", TDP: "180W", Ports: "2x DP, 1x HDMI" }, price: 22499, image: "https://images.unsplash.com/photo-1620283085068-5aab80ee3e13?w=400&h=300&fit=crop" },
  { id: "gpu-rx6500xt", name: "MSI MECH RX 6500 XT 4GB", series: "AMD", generation: "RX 6000 Series", specs: { VRAM: "4GB GDDR6", Boost: "2.82 GHz", TDP: "107W", Ports: "1x DP, 1x HDMI" }, price: 14999, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop" },
];

// ===== CPU COOLERS =====
export const coolerModels: ComponentModel[] = [
  // Air Cooler
  { id: "cool-noctua-d15", name: "Noctua NH-D15 Chromax Black", series: "Air Cooler", generation: "Dual Tower", specs: { Type: "Air", Fan: "2x 140mm", TDP: "250W", Noise: "24.6 dBA" }, price: 9499, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cool-deepcool-ak620", name: "DeepCool AK620 Digital", series: "Air Cooler", generation: "Dual Tower", specs: { Type: "Air", Fan: "2x 120mm", TDP: "260W", Noise: "28 dBA" }, price: 5499, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cool-coolermaster-212", name: "Cooler Master Hyper 212 RGB", series: "Air Cooler", generation: "Single Tower", specs: { Type: "Air", Fan: "1x 120mm", TDP: "150W", Noise: "27 dBA" }, price: 2999, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cool-thermaltake-ux200", name: "Thermaltake UX200 SE ARGB", series: "Air Cooler", generation: "Single Tower", specs: { Type: "Air", Fan: "1x 120mm", TDP: "170W", Noise: "29 dBA" }, price: 1999, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  // Liquid Cooler
  { id: "cool-nzxt-x73", name: "NZXT Kraken X73 RGB 360mm", series: "Liquid Cooler", generation: "360mm AIO", specs: { Type: "AIO Liquid", Radiator: "360mm", Fan: "3x 120mm", Noise: "21-36 dBA" }, price: 16999, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop" },
  { id: "cool-corsair-h150", name: "Corsair iCUE H150i Elite Capellix", series: "Liquid Cooler", generation: "360mm AIO", specs: { Type: "AIO Liquid", Radiator: "360mm", Fan: "3x 120mm ML", Noise: "10-36 dBA" }, price: 14999, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop" },
  { id: "cool-deepcool-lt720", name: "DeepCool LT720 360mm AIO", series: "Liquid Cooler", generation: "360mm AIO", specs: { Type: "AIO Liquid", Radiator: "360mm", Fan: "3x 120mm", Noise: "32.9 dBA" }, price: 9999, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop" },
  { id: "cool-coolermaster-ml240", name: "Cooler Master MasterLiquid ML240L V2 RGB", series: "Liquid Cooler", generation: "240mm AIO", specs: { Type: "AIO Liquid", Radiator: "240mm", Fan: "2x 120mm", Noise: "27 dBA" }, price: 5499, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop" },
  { id: "cool-lian-galahad", name: "Lian Li Galahad II Trinity 360mm", series: "Liquid Cooler", generation: "360mm AIO", specs: { Type: "AIO Liquid", Radiator: "360mm", Fan: "3x 120mm", Noise: "28 dBA" }, price: 12499, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop" },
];

// ===== POWER SUPPLY =====
export const psuModels: ComponentModel[] = [
  { id: "psu-corsair-rm550", name: "Corsair RM550x 80+ Gold", series: "550W", generation: "80+ Gold", specs: { Wattage: "550W", Rating: "80+ Gold", Modular: "Full", Fan: "120mm" }, price: 6499, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-coolermaster-550", name: "Cooler Master MWE 550 V2 80+ Bronze", series: "550W", generation: "80+ Bronze", specs: { Wattage: "550W", Rating: "80+ Bronze", Modular: "Non-Modular", Fan: "120mm" }, price: 3999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-corsair-rm650", name: "Corsair RM650x 80+ Gold", series: "650W", generation: "80+ Gold", specs: { Wattage: "650W", Rating: "80+ Gold", Modular: "Full", Fan: "135mm" }, price: 7499, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-seasonic-650", name: "Seasonic Focus GX-650 80+ Gold", series: "650W", generation: "80+ Gold", specs: { Wattage: "650W", Rating: "80+ Gold", Modular: "Full", Fan: "120mm" }, price: 7999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-deepcool-650", name: "DeepCool PF650 80+ White", series: "650W", generation: "80+ White", specs: { Wattage: "650W", Rating: "80+ White", Modular: "Non-Modular", Fan: "120mm" }, price: 3799, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-corsair-rm750", name: "Corsair RM750x 80+ Gold", series: "750W", generation: "80+ Gold", specs: { Wattage: "750W", Rating: "80+ Gold", Modular: "Full", Fan: "135mm" }, price: 8999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-seasonic-750", name: "Seasonic Focus GX-750 80+ Gold", series: "750W", generation: "80+ Gold", specs: { Wattage: "750W", Rating: "80+ Gold", Modular: "Full", Fan: "120mm" }, price: 9499, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-msi-750", name: "MSI MAG A750GL 80+ Gold", series: "750W", generation: "80+ Gold", specs: { Wattage: "750W", Rating: "80+ Gold", Modular: "Full", Fan: "120mm" }, price: 7499, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-corsair-rm850", name: "Corsair RM850x 80+ Gold", series: "850W", generation: "80+ Gold", specs: { Wattage: "850W", Rating: "80+ Gold", Modular: "Full", Fan: "135mm" }, price: 10999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-seasonic-850", name: "Seasonic Focus PX-850 80+ Platinum", series: "850W", generation: "80+ Platinum", specs: { Wattage: "850W", Rating: "80+ Platinum", Modular: "Full", Fan: "120mm" }, price: 14999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-corsair-rm1000", name: "Corsair RM1000x 80+ Gold", series: "1000W", generation: "80+ Gold", specs: { Wattage: "1000W", Rating: "80+ Gold", Modular: "Full", Fan: "135mm" }, price: 14999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-seasonic-1000", name: "Seasonic Prime TX-1000 80+ Titanium", series: "1000W", generation: "80+ Titanium", specs: { Wattage: "1000W", Rating: "80+ Titanium", Modular: "Full", Fan: "135mm" }, price: 24999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  { id: "psu-asus-1000", name: "ASUS ROG Thor 1000W 80+ Platinum II", series: "1000W", generation: "80+ Platinum", specs: { Wattage: "1000W", Rating: "80+ Platinum", Modular: "Full", Fan: "135mm" }, price: 21999, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
];

// ===== CABINETS =====
export const cabinetModels: ComponentModel[] = [
  // ATX
  { id: "cab-lianli-o11", name: "Lian Li O11 Dynamic EVO", series: "ATX", generation: "ATX Mid Tower", specs: { Form: "ATX Mid Tower", "GPU Length": "420mm", "Fan Slots": "10", "Radiator": "360mm top/side" }, price: 14999, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cab-corsair-4000d", name: "Corsair 4000D Airflow", series: "ATX", generation: "ATX Mid Tower", specs: { Form: "ATX Mid Tower", "GPU Length": "360mm", "Fan Slots": "6", "Radiator": "360mm front" }, price: 8999, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cab-nzxt-h7", name: "NZXT H7 Flow", series: "ATX", generation: "ATX Mid Tower", specs: { Form: "ATX Mid Tower", "GPU Length": "400mm", "Fan Slots": "7", "Radiator": "360mm top/front" }, price: 11499, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop" },
  { id: "cab-antec-torque", name: "Antec Torque Mid Tower Aluminum", series: "ATX", generation: "ATX Mid Tower", specs: { Form: "ATX Open Frame", "GPU Length": "450mm", "Fan Slots": "6", "Radiator": "360mm" }, price: 33818, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop" },
  { id: "cab-gigabyte-c500", name: "GIGABYTE C500 Panoramic Stealth ICE", series: "ATX", generation: "ATX Mid Tower", specs: { Form: "ATX Mid Tower", "GPU Length": "400mm", "Fan Slots": "8", "Radiator": "360mm" }, price: 10099, image: "https://images.unsplash.com/photo-1600348759986-381f5eff98f5?w=400&h=300&fit=crop" },
  // Micro ATX
  { id: "cab-coolermaster-q300l", name: "Cooler Master MasterBox Q300L", series: "Micro ATX", generation: "mATX Mini Tower", specs: { Form: "mATX Mini Tower", "GPU Length": "360mm", "Fan Slots": "6", "Radiator": "240mm" }, price: 3999, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cab-antesports-crystal", name: "Ant Esports Crystal Z2 Mid-Tower", series: "Micro ATX", generation: "mATX Mid Tower", specs: { Form: "mATX Mid Tower", "GPU Length": "340mm", "Fan Slots": "4", "Radiator": "240mm" }, price: 3539, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop" },
  { id: "cab-zebronics-robust", name: "ZEBRONICS ROBUST Premium Chassis", series: "Micro ATX", generation: "mATX Mid Tower", specs: { Form: "mATX Mid Tower", "GPU Length": "320mm", "Fan Slots": "4", "Radiator": "240mm" }, price: 2299, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "cab-deepcool-matrexx40", name: "DeepCool Matrexx 40 3FS", series: "Micro ATX", generation: "mATX Mini Tower", specs: { Form: "mATX Mini Tower", "GPU Length": "320mm", "Fan Slots": "4", "Radiator": "240mm front" }, price: 3299, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  // Mini ITX
  { id: "cab-nzxt-h1", name: "NZXT H1 V2", series: "Mini ITX", generation: "ITX SFF", specs: { Form: "Mini ITX SFF", "GPU Length": "324mm", "Fan Slots": "1", "Radiator": "140mm AIO included" }, price: 24999, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop" },
  { id: "cab-coolermaster-nr200", name: "Cooler Master MasterBox NR200P Max", series: "Mini ITX", generation: "ITX SFF", specs: { Form: "Mini ITX SFF", "GPU Length": "330mm", "Fan Slots": "5", "Radiator": "280mm AIO included" }, price: 17999, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { id: "cab-lianli-a4", name: "Lian Li A4-H2O X4", series: "Mini ITX", generation: "ITX SFF", specs: { Form: "Mini ITX SFF", "GPU Length": "322mm", "Fan Slots": "3", "Radiator": "240mm" }, price: 12499, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop" },
];

// Helper functions
export const getComponentsBySeries = (models: ComponentModel[], series: string) =>
  models.filter(m => m.series === series);
