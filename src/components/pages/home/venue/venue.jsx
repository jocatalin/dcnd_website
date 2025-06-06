import { ChevronLeft, ChevronRight, Users, Calendar, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// Icons aus dem ursprünglichen Code
const IconMapPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconUtensils = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconParty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="M4 3h.01" />
    <path d="M22 8h.01" />
    <path d="M15 2h.01" />
    <path d="M22 20h.01" />
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
    <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
    <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
    <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
  </svg>
);

const IconExternal = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Card = ({ children, className = '' }) => <div className={` ${className}`}>{children}</div>;

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setFade(true); // Startet die Animation
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
          setFade(false); // Entfernt die Animation
        }, 500); // Animation-Dauer (500ms) synchronisieren
      }, 5000); // Intervall für den Bildwechsel

      return () => clearInterval(timer);
    }
  }, [images.length, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const goToPrevious = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFade(false);
    }, 500);
  };

  const goToNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      setFade(false);
    }, 500);
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full transition-all duration-500 ease-in-out">
        <img
          src={images[currentImageIndex]}
          alt={`Venue slide ${currentImageIndex + 1}`}
          className={`h-full w-full object-cover transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'
            }`}
        />

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          onClick={goToNext}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const Venue = ({
  images = [
    'https://www.jaarbeurs.nl/wp-content/uploads/2024/08/20221004-Red-hat-by-MichielTon-websize73.jpg',
    'https://www.jaarbeurs.nl/wp-content/uploads/2024/08/20230921-Frankwatching-CC-by-MichielTon-websize79.jpg',
    'https://www.jaarbeurs.nl/wp-content/uploads/2024/08/2023.10.19-Enactus-competition-day-1-3-by-MichielTon-18.jpg',
    "https://www.jaarbeurs.nl/wp-content/uploads/2024/08/20221004-Red-hat-by-MichielTon-websize51.jpg"
  ],
}) => {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="section-title">Venue Information</h2>
      <div className="gap-8 ">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
            <ImageSlider images={images} />
          </div>
          <Card>
            <div
              className="p-6"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div
                className="mb-4"
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              >
                <h2 className="text-2xl font-bold text-[#004258]">Supernova Jaarbeurs</h2>
                <h3 className="text-xl text-gray-600">at Utrecht Jaarbeurs</h3>
              </div>

              <div className="mb-4 flex gap-2 text-gray-600">
                <IconMapPin />
                <div>
                  <p>Jaarbeursplein 6</p>
                  <p>3521 AL Utrecht</p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/PgUeuWL1JVk3F7G18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all"
                style={{ backgroundColor: '#004258' }}
              >
                Open in Google Maps
              </a>
            </div>
          </Card>
        </div>

        {/* What to Expect Section */}
        <div className="expect-section">
          <div className="features-grid justify-items-center md:justify-items-start">
            <div className="feature-item">
              <Users className="feature-icon" />
              <div className="feature-content">
                <h3 className="feature-title">Catering</h3>
                <p className="feature-text">Vegetarian & Vegan options</p>
              </div>
            </div>

            <div className="feature-item">
              <Calendar className="feature-icon" />
              <div className="feature-content">
                <h3 className="feature-title">1-Day Event</h3>
                <p className="feature-text">With many activities</p>
              </div>
            </div>

            <div className="feature-item">
              <MapPin className="feature-icon" />
              <div className="feature-content">
                <h3 className="feature-title">Networking Event</h3>
                <p className="feature-text">Connect with your peers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
