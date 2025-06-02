const { useState, useEffect, useCallback } = React;

const slides = [
  {
    id: 1,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-extrabold mb-4">Welcome to Slide 1</h1>
        <p className="text-2xl">This is a placeholder for your content.</p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-extrabold mb-4">This is Slide 2</h1>
        <p className="text-2xl">Add more details or images here.</p>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-extrabold mb-4">Here is Slide 3</h1>
        <p className="text-2xl">You can customize this slide as needed.</p>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-extrabold mb-4">Another Slide 4</h1>
        <p className="text-2xl">Try adding images, videos, or more text.</p>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-extrabold mb-4">Final Slide 5</h1>
        <p className="text-2xl">Thanks for watching!</p>
      </div>
    ),
  },
];

function SlideShow() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx) => {
    setCurrent((prev) => {
      if (idx < 0) return 0;
      if (idx >= slides.length) return slides.length - 1;
      return idx;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goTo(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goTo(current - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, goTo]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {slides.map((slide, idx) => (
        <section
          key={slide.id}
          className={`fixed inset-0 w-screen h-screen flex items-center justify-center transition-opacity duration-500 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          style={{ background: `hsl(${idx * 60}, 70%, 30%)` }}
        >
          {slide.content}
        </section>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SlideShow />);
