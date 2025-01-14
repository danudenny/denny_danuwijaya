import { AnimatePresence, motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import React from 'react';
import Map, {
    FullscreenControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
    type LngLatLike,
} from 'react-map-gl';
import { fadeIn } from '../../utils/motion';
import { samplePins } from '../data/mapData';
import { MapPin } from '../types/map';

const MAPBOX_TOKEN =
    'pk.eyJ1IjoiZGFudWRlbm5qIiwiYSI6ImNsbjRmZWRzYjA0ZGgya3FoOWZyYTFnczIifQ.ZCLrfouIIbufGF-T3tBj9Q';

// Helper function to extract start and end years from date string
const getYearRange = (dateStr: string) => {
    const matches = dateStr.match(/\d{4}/g);
    if (!matches) return null;

    const startYear = parseInt(matches[0], 10);
    const endYear = dateStr.includes('Present')
        ? new Date().getFullYear()
        : matches[1]
        ? parseInt(matches[1], 10)
        : startYear;

    return { startYear, endYear };
};

// Custom marker glow animation
const markerGlow = {
    initial: {
        scale: 0,
        y: 20,
        opacity: 0,
    },
    animate: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
            scale: { type: 'spring', duration: 0.5 },
            y: { type: 'spring', duration: 0.5 },
        },
    },
    exit: {
        scale: 0,
        y: 20,
        opacity: 0,
    },
};

const Explorer = () => {
    const [selectedPin, setSelectedPin] = React.useState<string | null>(null);
    const [hoveredPin, setHoveredPin] = React.useState<string | null>(null);
    const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
    const mapRef = React.useRef<any>(null);

    // Calculate bounds from pins
    const getBounds = (pins: MapPin[]): [LngLatLike, LngLatLike] => {
        const coordinates = pins.map((pin) => pin.coordinates);
        const longitudes = coordinates.map((coord) => coord[0]);
        const latitudes = coordinates.map((coord) => coord[1]);

        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);

        // Add padding to bounds (10% of the range)
        const lngPadding = (maxLng - minLng) * 0.1;
        const latPadding = (maxLat - minLat) * 0.1;

        return [
            { lng: minLng - lngPadding, lat: minLat - latPadding }, // southwest
            { lng: maxLng + lngPadding, lat: maxLat + latPadding }, // northeast
        ];
    };

    // Initial bounds for all pins
    const initialBounds = React.useMemo(() => getBounds(samplePins), []);

    // Get unique years from pins
    const years = React.useMemo(() => {
        const yearSet = new Set<number>();
        samplePins.forEach((pin) => {
            const range = getYearRange(pin.date);
            if (range) {
                yearSet.add(range.startYear);
            }
        });
        return Array.from(yearSet).sort((a, b) => a - b);
    }, []);

    // Sort pins by date
    const sortedPins = React.useMemo(() => {
        return [...samplePins].sort((a, b) => {
            const rangeA = getYearRange(a.date);
            const rangeB = getYearRange(b.date);
            return (rangeA?.startYear || 0) - (rangeB?.startYear || 0);
        });
    }, []);

    // Filter pins based on selected year (showing all experiences up to that year)
    const filteredPins = React.useMemo(() => {
        if (!selectedYear) return sortedPins;
        return sortedPins.filter((pin) => {
            const range = getYearRange(pin.date);
            if (!range) return false;
            return range.startYear <= selectedYear;
        });
    }, [selectedYear, sortedPins]);

    // Update map bounds when filtered pins change
    React.useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current.getMap();
        const bounds =
            filteredPins.length > 0 ? getBounds(filteredPins) : initialBounds;

        map.fitBounds(bounds, {
            padding: 50,
            maxZoom: 11,
            duration: 1000, // Animation duration in milliseconds
        });
    }, [filteredPins, initialBounds]);

    // Identify pins that are new for the selected year
    const newPins = React.useMemo(() => {
        if (!selectedYear) return new Set<string>();
        return new Set(
            sortedPins
                .filter((pin) => {
                    const range = getYearRange(pin.date);
                    return range?.startYear === selectedYear;
                })
                .map((pin) => pin.id)
        );
    }, [selectedYear, sortedPins]);

    return (
        <section className="py-12 md:py-24" id="explorer">
            <div className="max-w-6xl mx-auto px-8">
                <motion.div
                    variants={fadeIn('right', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                    className="brutal-box brutal-box-blue mb-8"
                >
                    <h2 className="text-4xl font-bold mb-4">Explorer</h2>
                    <p className="text-lg opacity-80">
                        Discover my professional journey across the globe. Each
                        marker represents a significant milestone in my career.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeIn('up', 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                    className="brutal-box space-y-4"
                >
                    {/* Map Container */}
                    <div className="h-[600px] overflow-hidden relative">
                        <Map
                            ref={mapRef}
                            mapboxAccessToken={MAPBOX_TOKEN}
                            initialViewState={{
                                bounds: initialBounds,
                                fitBoundsOptions: {
                                    padding: 50,
                                    maxZoom: 11,
                                },
                            }}
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/dark-v11"
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
                                    >
                                        <motion.div
                                            variants={markerGlow}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className={`relative cursor-pointer transition-all duration-300`}
                                        >
                                            <motion.div
                                                animate={{
                                                    scale:
                                                        hoveredPin === pin.id ||
                                                        selectedPin === pin.id
                                                            ? 1.2
                                                            : 1,
                                                    y:
                                                        hoveredPin === pin.id ||
                                                        selectedPin === pin.id
                                                            ? -4
                                                            : 0,
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 300,
                                                }}
                                                className="w-10 h-10 relative"
                                            >
                                                {/* Pulse effect for new markers */}
                                                {newPins.has(pin.id) && (
                                                    <div className="absolute -inset-1">
                                                        <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping" />
                                                        <div className="absolute inset-0 rounded-full border-2 border-blue-400/20" />
                                                    </div>
                                                )}

                                                {pin.logo ? (
                                                    <div className="w-10 h-10 relative rounded-full overflow-hidden bg-white shadow-lg transform-gpu">
                                                        <Image
                                                            src={pin.logo}
                                                            alt={pin.title}
                                                            fill
                                                            className="object-contain p-1"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <span className="text-white text-xs">
                                                            📍
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Hover tooltip */}
                                                <AnimatePresence>
                                                    {hoveredPin === pin.id &&
                                                        !selectedPin && (
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: -10,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: -5,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    y: -10,
                                                                }}
                                                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full whitespace-nowrap z-50"
                                                            >
                                                                {pin.title}
                                                            </motion.div>
                                                        )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.div>
                                    </Marker>
                                ))}
                            </AnimatePresence>

                            <AnimatePresence>
                                {selectedPin && (
                                    <Popup
                                        longitude={
                                            samplePins.find(
                                                (p) => p.id === selectedPin
                                            )?.coordinates[0] || 0
                                        }
                                        latitude={
                                            samplePins.find(
                                                (p) => p.id === selectedPin
                                            )?.coordinates[1] || 0
                                        }
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
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                            }}
                                        >
                                            {(() => {
                                                const pin = samplePins.find(
                                                    (p) => p.id === selectedPin
                                                );
                                                if (!pin) return null;
                                                return (
                                                    <div className="p-3 bg-[#1E1E1E] text-white">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            {pin.logo && (
                                                                <div className="w-8 h-8 relative flex-shrink-0">
                                                                    <div className="absolute inset-0 bg-white rounded-full" />
                                                                    <Image
                                                                        src={
                                                                            pin.logo
                                                                        }
                                                                        alt={
                                                                            pin.title
                                                                        }
                                                                        fill
                                                                        className="rounded-full object-contain p-1"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h3 className="font-semibold text-lg leading-tight">
                                                                    {pin.title}
                                                                </h3>
                                                                <p className="text-sm text-gray-400">
                                                                    {pin.date}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-300 mt-2">
                                                            {pin.description}
                                                        </p>
                                                        {pin.skills && (
                                                            <div className="mt-3 flex flex-wrap gap-1">
                                                                {pin.skills.map(
                                                                    (
                                                                        skill,
                                                                        idx
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="text-xs bg-blue-900 text-blue-100 px-2 py-1 rounded"
                                                                        >
                                                                            {
                                                                                skill
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
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
                    </div>

                    {/* Timeline Filter - Now below the map */}
                    <div className="brutal-box bg-white p-4">
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm opacity-80">
                                    {selectedYear
                                        ? `Showing experiences up to ${selectedYear}`
                                        : 'All experiences'}
                                </div>
                                {selectedYear && (
                                    <button
                                        onClick={() => setSelectedYear(null)}
                                        className="brutal-btn p-2 text-sm"
                                    >
                                        Reset View
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-2 text-sm">
                                {years.map((year) => (
                                    <motion.button
                                        key={year}
                                        onClick={() =>
                                            setSelectedYear(
                                                selectedYear === year
                                                    ? null
                                                    : year
                                            )
                                        }
                                        className={`relative px-3 py-1.5 brutal-btn ${
                                            year === selectedYear
                                                ? 'brutal-btn-active'
                                                : ''
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="relative z-10">
                                            {year}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500 rounded-full"
                                    initial={{ width: '100%' }}
                                    animate={{
                                        width: selectedYear
                                            ? `${
                                                  ((selectedYear - years[0]) /
                                                      (years[years.length - 1] -
                                                          years[0])) *
                                                  100
                                              }%`
                                            : '100%',
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Explorer;
