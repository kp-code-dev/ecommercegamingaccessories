export interface ProcessorModel {
  id: string;
  name: string;
  series: string;
  generation: string;
  cores: number;
  threads: number;
  baseClock: string;
  boostClock: string;
  tdp: string;
  price: number;
  image: string;
}

export const processorModels: ProcessorModel[] = [
  // Intel Core i3
  { id: "i3-14100", name: "Intel Core i3-14100", series: "Intel Core i3", generation: "14th Gen", cores: 4, threads: 8, baseClock: "3.5 GHz", boostClock: "4.7 GHz", tdp: "60W", price: 11499, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "i3-13100", name: "Intel Core i3-13100", series: "Intel Core i3", generation: "13th Gen", cores: 4, threads: 8, baseClock: "3.4 GHz", boostClock: "4.5 GHz", tdp: "60W", price: 10299, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "i3-12100", name: "Intel Core i3-12100", series: "Intel Core i3", generation: "12th Gen", cores: 4, threads: 8, baseClock: "3.3 GHz", boostClock: "4.3 GHz", tdp: "60W", price: 8999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "i3-10100", name: "Intel Core i3-10100", series: "Intel Core i3", generation: "10th Gen", cores: 4, threads: 8, baseClock: "3.6 GHz", boostClock: "4.3 GHz", tdp: "65W", price: 7499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },

  // Intel Core i5
  { id: "i5-14600K", name: "Intel Core i5-14600K", series: "Intel Core i5", generation: "14th Gen", cores: 14, threads: 20, baseClock: "3.5 GHz", boostClock: "5.3 GHz", tdp: "125W", price: 26999, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "i5-14400F", name: "Intel Core i5-14400F", series: "Intel Core i5", generation: "14th Gen", cores: 10, threads: 16, baseClock: "2.5 GHz", boostClock: "4.7 GHz", tdp: "65W", price: 18499, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "i5-13400F", name: "Intel Core i5-13400F", series: "Intel Core i5", generation: "13th Gen", cores: 10, threads: 16, baseClock: "2.5 GHz", boostClock: "4.6 GHz", tdp: "65W", price: 17700, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "i5-12400F", name: "Intel Core i5-12400F", series: "Intel Core i5", generation: "12th Gen", cores: 6, threads: 12, baseClock: "2.5 GHz", boostClock: "4.4 GHz", tdp: "65W", price: 13999, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { id: "i5-11400F", name: "Intel Core i5-11400F", series: "Intel Core i5", generation: "11th Gen", cores: 6, threads: 12, baseClock: "2.6 GHz", boostClock: "4.4 GHz", tdp: "65W", price: 11499, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },

  // Intel Core i7
  { id: "i7-14700K", name: "Intel Core i7-14700K", series: "Intel Core i7", generation: "14th Gen", cores: 20, threads: 28, baseClock: "3.4 GHz", boostClock: "5.6 GHz", tdp: "125W", price: 39649, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "i7-14700F", name: "Intel Core i7-14700F", series: "Intel Core i7", generation: "14th Gen", cores: 20, threads: 28, baseClock: "2.1 GHz", boostClock: "5.4 GHz", tdp: "65W", price: 35999, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "i7-13700K", name: "Intel Core i7-13700K", series: "Intel Core i7", generation: "13th Gen", cores: 16, threads: 24, baseClock: "3.4 GHz", boostClock: "5.4 GHz", tdp: "125W", price: 34999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "i7-12700K", name: "Intel Core i7-12700K", series: "Intel Core i7", generation: "12th Gen", cores: 12, threads: 20, baseClock: "3.6 GHz", boostClock: "5.0 GHz", tdp: "125W", price: 29999, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },

  // Intel Core i9
  { id: "i9-14900K", name: "Intel Core i9-14900K", series: "Intel Core i9", generation: "14th Gen", cores: 24, threads: 32, baseClock: "3.2 GHz", boostClock: "6.0 GHz", tdp: "125W", price: 56535, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "i9-14900KS", name: "Intel Core i9-14900KS", series: "Intel Core i9", generation: "14th Gen", cores: 24, threads: 32, baseClock: "3.2 GHz", boostClock: "6.2 GHz", tdp: "150W", price: 62999, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "i9-13900K", name: "Intel Core i9-13900K", series: "Intel Core i9", generation: "13th Gen", cores: 24, threads: 32, baseClock: "3.0 GHz", boostClock: "5.8 GHz", tdp: "125W", price: 52999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "i9-12900K", name: "Intel Core i9-12900K", series: "Intel Core i9", generation: "12th Gen", cores: 16, threads: 24, baseClock: "3.2 GHz", boostClock: "5.2 GHz", tdp: "125W", price: 44999, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },

  // AMD Ryzen 3
  { id: "r3-4100", name: "AMD Ryzen 3 4100", series: "AMD Ryzen 3", generation: "Zen 2", cores: 4, threads: 8, baseClock: "3.8 GHz", boostClock: "4.0 GHz", tdp: "65W", price: 6499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { id: "r3-4300G", name: "AMD Ryzen 3 4300G", series: "AMD Ryzen 3", generation: "Zen 2", cores: 4, threads: 8, baseClock: "3.8 GHz", boostClock: "4.0 GHz", tdp: "65W", price: 7999, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "r3-5300G", name: "AMD Ryzen 3 5300G", series: "AMD Ryzen 3", generation: "Zen 3", cores: 4, threads: 8, baseClock: "4.0 GHz", boostClock: "4.2 GHz", tdp: "65W", price: 9499, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },

  // AMD Ryzen 5
  { id: "r5-7600X", name: "AMD Ryzen 5 7600X", series: "AMD Ryzen 5", generation: "Zen 4", cores: 6, threads: 12, baseClock: "4.7 GHz", boostClock: "5.3 GHz", tdp: "105W", price: 22499, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "r5-9600X", name: "AMD Ryzen 5 9600X", series: "AMD Ryzen 5", generation: "Zen 5", cores: 6, threads: 12, baseClock: "3.9 GHz", boostClock: "5.4 GHz", tdp: "65W", price: 25999, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "r5-5600X", name: "AMD Ryzen 5 5600X", series: "AMD Ryzen 5", generation: "Zen 3", cores: 6, threads: 12, baseClock: "3.7 GHz", boostClock: "4.6 GHz", tdp: "65W", price: 15249, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "r5-5600", name: "AMD Ryzen 5 5600", series: "AMD Ryzen 5", generation: "Zen 3", cores: 6, threads: 12, baseClock: "3.5 GHz", boostClock: "4.4 GHz", tdp: "65W", price: 13499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },

  // AMD Ryzen 7
  { id: "r7-9700X", name: "AMD Ryzen 7 9700X", series: "AMD Ryzen 7", generation: "Zen 5", cores: 8, threads: 16, baseClock: "3.8 GHz", boostClock: "5.5 GHz", tdp: "65W", price: 34899, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "r7-7800X3D", name: "AMD Ryzen 7 7800X3D", series: "AMD Ryzen 7", generation: "Zen 4", cores: 8, threads: 16, baseClock: "4.2 GHz", boostClock: "5.0 GHz", tdp: "120W", price: 38999, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "r7-5800X", name: "AMD Ryzen 7 5800X", series: "AMD Ryzen 7", generation: "Zen 3", cores: 8, threads: 16, baseClock: "3.8 GHz", boostClock: "4.7 GHz", tdp: "105W", price: 24999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "r7-5700X", name: "AMD Ryzen 7 5700X", series: "AMD Ryzen 7", generation: "Zen 3", cores: 8, threads: 16, baseClock: "3.4 GHz", boostClock: "4.6 GHz", tdp: "65W", price: 21499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },

  // AMD Ryzen 9
  { id: "r9-9950X3D", name: "AMD Ryzen 9 9950X3D", series: "AMD Ryzen 9", generation: "Zen 5", cores: 16, threads: 32, baseClock: "4.3 GHz", boostClock: "5.7 GHz", tdp: "170W", price: 78469, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop" },
  { id: "r9-9900X", name: "AMD Ryzen 9 9900X", series: "AMD Ryzen 9", generation: "Zen 5", cores: 12, threads: 24, baseClock: "4.4 GHz", boostClock: "5.6 GHz", tdp: "120W", price: 52999, image: "https://images.unsplash.com/photo-1592664474505-51c4063e3116?w=400&h=300&fit=crop" },
  { id: "r9-7950X", name: "AMD Ryzen 9 7950X", series: "AMD Ryzen 9", generation: "Zen 4", cores: 16, threads: 32, baseClock: "4.5 GHz", boostClock: "5.7 GHz", tdp: "170W", price: 59999, image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop" },
  { id: "r9-5900X", name: "AMD Ryzen 9 5900X", series: "AMD Ryzen 9", generation: "Zen 3", cores: 12, threads: 24, baseClock: "3.7 GHz", boostClock: "4.8 GHz", tdp: "105W", price: 39999, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
];

export const getProcessorsBySeries = (series: string) =>
  processorModels.filter(p => p.series === series);
