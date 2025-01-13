import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import Map, { 
  Marker, 
  Popup, 
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { samplePins } from '../data/mapData';
import Image from 'next/image';
import { MapPin } from '../types/map';

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGFudWRlbm5qIiwiYSI6ImNsbjRmZWRzYjA0ZGgya3FoOWZyYTFnczIifQ.ZCLrfouIIbufGF-T3tBj9Q";

// Custom map style with brand colors
const customMapStyle = {
  version: 8,
  name: 'Portfolio Dark',
  sources: {
    'mapbox': {
      type: 'raster',
      tiles: ['https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=' + MAPBOX_TOKEN],
      tileSize: 512,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#121212'
      }
    },
    {
      id: 'mapbox-dark',
      type: 'raster',
      source: 'mapbox',
      paint: {
        'raster-opacity': 0.8,
        'raster-brightness-min': 0.2,
        'raster-brightness-max': 0.8,
      }
    }
  ]
};

// Helper function to extract start and end years from date string
const getYearRange = (dateStr: string) => {
  const matches = dateStr.match(/\d{4}/g);
  if (!matches) return null;

  const startYear = parseInt(matches[0], 10);
  const endYear = dateStr.includes('Present') 
    ? new Date().getFullYear() 
    : (matches[1] ? parseInt(matches[1], 10) : startYear);

  return { startYear, endYear };
};

const Explorer = () => {
  const [selectedPin, setSelectedPin] = React.useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = React.useState<string | null>(null);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  
  // Calculate center point and bounds
  const coordinates = samplePins.map(pin => pin.coordinates);
  const longitudes = coordinates.map(coord => coord[0]);
  const latitudes = coordinates.map(coord => coord[1]);
  
  const center = {
    longitude: (Math.max(...longitudes) + Math.min(...longitudes)) / 2,
    latitude: (Math.max(...latitudes) + Math.min(...latitudes)) / 2
  };

  // Filter pins based on selected year (showing all experiences up to that year)
  const filteredPins = React.useMemo(() => {
    if (!selectedYear) return samplePins;
    
    return samplePins.filter(pin => {
      const range = getYearRange(pin.date);
      if (!range) return false;
      
      // Show the pin if:
      // 1. It started before or in the selected year
      // 2. And it hasn't ended before the selected year
      return range.startYear <= selectedYear;
    });
  }, [selectedYear]);

  // Get all unique years from pins
  const years = React.useMemo(() => {
    const yearSet = new Set<number>();
    samplePins.forEach(pin => {
      const range = getYearRange(pin.date);
      if (range) {
        yearSet.add(range.startYear);
        if (range.endYear !== range.startYear) {
          yearSet.add(range.endYear);
        }
      }
    });
    return Array.from(yearSet).sort((a, b) => a - b);
  }, []);

  return (
    <section className="py-16 bg-[#121212]" id="explorer">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Explorer</h2>
          <p className="text-gray-400">My journey across the map</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="h-[600px] rounded-lg overflow-hidden relative"
          >
            <Map
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{
                longitude: center.longitude,
                latitude: center.latitude,
                zoom: 10,
                padding: { top: 40, bottom: 40, left: 40, right: 40 }
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle={customMapStyle}
              renderWorldCopies={false}
              dragRotate={false}
            >
              <NavigationControl position="top-right" />
              <FullscreenControl position="top-right" />
              <ScaleControl position="bottom-right" />

              <AnimatePresence>
                {filteredPins.map((pin) => (
                  <Marker
                    key={pin.id}
                    longitude={pin.coordinates[0]}
                    latitude={pin.coordinates[1]}
                    anchor="bottom"
                    onClick={() => setSelectedPin(pin.id)}
                    onMouseEnter={() => setHoveredPin(pin.id)}
                    onMouseLeave={() => setHoveredPin(null)}
                  >
                    <motion.div 
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, y: 20 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className={`relative w-10 h-10 cursor-pointer transition-all duration-300 ${
                        hoveredPin === pin.id || selectedPin === pin.id
                          ? 'transform scale-125 -translate-y-1'
                          : ''
                      }`}
                    >
                      {pin.logo ? (
                        <div className="w-10 h-10 relative">
                          <div className="absolute inset-0 bg-white rounded-full" />
                          <Image
                            src={pin.logo}
                            alt={pin.title}
                            fill
                            className="rounded-full border-2 border-white shadow-lg object-contain p-1"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">📍</span>
                        </div>
                      )}
                      {hoveredPin === pin.id && !selectedPin && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                        >
                          {pin.title}
                        </motion.div>
                      )}
                    </motion.div>
                  </Marker>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {selectedPin && (
                  <Popup
                    longitude={samplePins.find(p => p.id === selectedPin)?.coordinates[0] || 0}
                    latitude={samplePins.find(p => p.id === selectedPin)?.coordinates[1] || 0}
                    anchor="bottom"
                    onClose={() => setSelectedPin(null)}
                    closeOnClick={false}
                    className="z-50 !bg-[#1E1E1E]"
                    maxWidth="300px"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      {(() => {
                        const pin = samplePins.find(p => p.id === selectedPin);
                        if (!pin) return null;
                        return (
                          <div className="p-3 bg-[#1E1E1E] text-white">
                            <div className="flex items-center gap-3 mb-2">
                              {pin.logo && (
                                <div className="w-8 h-8 relative flex-shrink-0">
                                  <div className="absolute inset-0 bg-white rounded-full" />
                                  <Image
                                    src={pin.logo}
                                    alt={pin.title}
                                    fill
                                    className="rounded-full object-contain p-1"
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="font-semibold text-lg leading-tight">{pin.title}</h3>
                                <p className="text-sm text-gray-400">{pin.date}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-300 mt-2">{pin.description}</p>
                            {pin.skills && (
                              <div className="mt-3 flex flex-wrap gap-1">
                                {pin.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-blue-900 text-blue-100 px-2 py-1 rounded"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </motion.div>
                  </Popup>
                )}
              </AnimatePresence>
            </Map>

            {/* Timeline Filter */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1E1E1E] bg-opacity-90 p-4 rounded-lg">
              <div className="flex items-center justify-between text-white text-sm">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                    className={`cursor-pointer transition-colors px-2 py-1 rounded ${
                      year === selectedYear
                        ? 'text-blue-400 bg-blue-900 bg-opacity-30'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
              <div className="h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ 
                    width: selectedYear 
                      ? `${((selectedYear - years[0]) / (years[years.length - 1] - years[0])) * 100}%`
                      : '100%' 
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Explorer;
