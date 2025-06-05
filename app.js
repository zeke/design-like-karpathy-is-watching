const { useState, useEffect, useCallback } = React;

const SLIDE_STORAGE_KEY = 'currentSlideIndex';

const slides = [
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-orange-400">
        <div className="relative w-screen h-screen">
          <img src="https://replicate.delivery/xezq/wKCKXTthCZJoEJUU7nZwriZs5NOKOJugwIZAImUJO6ZreqZKA/tmp0l9992gl.png" className="absolute w-screen h-screen object-cover"></img>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-yellow-300">
        <img src="images/talk-github-repo-qr-code.png" className="w-[90vw] h-[90vh] object-contain mix-blend-multiply"></img>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-yellow-300">
        <h2 className="text-[12vw] text-black font-bold"><span className="opacity-20">@</span>zeke</h2>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-yellow-300">
        <img src="images/replicate-logos.png" className="max-h-[50%] h-auto object-contain"></img>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/AeGpTAnJJaV1eUrGOODBYushnz8MeZHx2kRmw9hIfbVQIhNTB/tmpqh08kic3.jpg" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[6vw] px-64 py-16 text-center goudy-bookletter-1911-regular relative z-10">Who is Andrej Karpathy?</blockquote>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative" style={{ backgroundColor: 'rgb(2, 91, 99)' }}>
        <ul className="list-disc space-y-10 text-7xl goudy-bookletter-1911-regular">
          <li>AI researcher at Google / OpenAI / Tesla / OpenAI / Eureka Labs</li>
          <li>Stanford professor</li>
          <li>YouTube educator</li>
          <li>Coined the term "vibe coding"</li>
          <li>Thinks the hottest new programming language is English</li>
          <li>Wrote the Software 2.0 manifesto (7 years ago)</li>
        </ul>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <blockquote className="text-[6vw] px-64 py-16 text-center goudy-bookletter-1911-regular relative z-10">What is MenuGen?</blockquote>
      </div>
    ),
  },
  
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">

        <iframe width="60%" height="100%"
src="https://www.youtube.com/embed/V8FqzYu3Zb4"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen></iframe>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[5vw] max-w-[80%] py-16 goudy-bookletter-1911-regular relative z-10"><span className="opacity-50">&quot;Vibe coding menugen was [an] exhilarating and </span><em>fun escapade</em><span className="opacity-50"> as a local demo, but a bit of a </span><em>painful slog</em><span className="opacity-50"> as a deployed, real app.&quot;</span></blockquote>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[5vw] max-w-[80%] py-16 goudy-bookletter-1911-regular relative z-10"><span className="opacity-50">&quot;Here is where some of the troubles started [with]</span> OpenAI, Replicate, Vercel, Clerk, Stripe...&quot;</blockquote>
      </div>  
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[3vw] max-w-[90%] py-16 goudy-bookletter-1911-regular relative z-10">&quot;I needed to generate images [...] I signed up for a new Replicate API key and ran into issues relatively quickly. My queries didn't work because LLM knowledge was deprecated, but in addition, this time even the official docs were a little bit out of date due to recent changes in the API, which now don't return the JSON directly but instead some kind of a Streaming object that neither I or Claude understood. I then faced rate limiting on the API so it was difficult to debug the app. I was told later that these are common protection measures by these services to mitigate fraud, but they also make it harder to get started with new, legitimate accounts.&quot;</blockquote>
      </div>  
    ),
  },
  // {
  //   content: (
  //     <div className="flex flex-col items-center justify-center h-full w-full">
  //       <img src="https://replicate.delivery/xezq/ssZ7s25lkV5DCNQQy6cvduiYzEQEM5TsI0l9jfIeuNW0x9yUA/tmptlyi0lma.png" className="w-screen h-screen object-cover"></img>
  //     </div>
  //   ),
  // },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <blockquote className="text-[6vw] px-64 py-16 text-center goudy-bookletter-1911-regular relative z-10">What can Replicate do better?</blockquote>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <blockquote className="text-[6vw] px-64 py-16 text-center goudy-bookletter-1911-regular relative z-10"><span className="opacity-30">Embrace</span> llms.txt</blockquote>
      </div>
    ),
  },



  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">

      <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
      <blockquote className="text-[3vw] max-w-[80%] py-16 goudy-bookletter-1911-regular relative z-10">Tired: elaborate docs pages with fancy color palettes, branding, animations, transitions, dark mode.<br /><br />
      Wired: one single docs .md file and a "copy to clipboard" button.
      <br /><br />
      <span className="opacity-50">-- Karpathy</span>
      </blockquote>
      </div>
    ),
  },
  
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <video src="videos/llm-buttons.mp4" className="w-screen h-screen object-cover" controls muted />
      </div>  
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[4vw] max-w-[80%] py-16 goudy-bookletter-1911-regular relative z-10">&quot;LLMs don’t like to click, they like to curl.&quot;
          <br /><br />
        <span className="opacity-50">-- Karpathy</span></blockquote>
      </div>  
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img src="https://replicate.delivery/xezq/owAeiYaNdqQZPC7X2e72MqKAh79fstL9IPyAMFtn5SmC3tmpA/out-0.png" className="w-screen h-screen object-cover"></img>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <video src="videos/curl-cog-llms-txt.mp4" className="w-screen h-screen object-cover" controls muted />
      </div>  
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        {/* curl screenshot with all the parts */}
        <img src="images/ray-so-export.png" className="w-[95vw] h-[95vh] object-contain"></img>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[4vw] max-w-[80%] py-16 goudy-bookletter-1911-regular relative z-10">&quot;The primary audience of your thing (product, service, library, …) is now an LLM, not a human.&quot;
          <br /><br />
        <span className="opacity-50">-- Karpathy</span></blockquote>
      </div>  
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img src="https://replicate.delivery/xezq/9hxY5CDez1Rf1U8ht93wjxWswkY1wYJzHgQWA4laKoM6fsmpA/tmpejwc0a3z.jpg" className="w-screen h-screen object-cover"></img>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <video src="videos/openapi-mcp.mp4" className="w-screen h-screen object-cover" controls muted />
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <video src="videos/claude-mcp.mp4" className="w-screen h-screen object-cover" controls muted />
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-rose-700">        
        <p className="text-6xl goudy-bookletter-1911-regular">
          Takeaways<br /><br />

          <ol className="list-decimal space-y-10">
            <li>Accept payments <span className="opacity-50">(so power users can scale up quickly)</span></li>
            <li>Document your shit <span className="opacity-50">(using OpenAPI)</span></li>
            <li>Feed the machines <span className="opacity-50">(llms.txt, curl, markdown, schemas)</span></li>
            <li>Use boring technology <span className="opacity-50">(LLMs know them well)</span></li>
            <li>Practice good API hygiene <span className="opacity-50">(so your MCP users love you)</span></li>
          </ol>
        </p>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <img src="https://replicate.delivery/xezq/hD9ekOUwBTUMQy9ZQObEUuiSjbpZM6qOpAzZJ79hhAWfwXzUA/out-0.png" className="absolute inset-0 w-full h-full object-cover" />
        <blockquote className="text-[6vw] px-64 py-16 text-center goudy-bookletter-1911-regular relative z-10">-- FIN --</blockquote>
      </div>
    ),
  },

];

function SlideShow() {
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem(SLIDE_STORAGE_KEY);
    return saved !== null ? Number(saved) : 0;
  });
  const [gridView, setGridView] = useState(false);

  const goTo = useCallback((idx) => {
    setCurrent((prev) => {
      let next = idx;
      if (next < 0) next = 0;
      if (next >= slides.length) next = slides.length - 1;
      localStorage.setItem(SLIDE_STORAGE_KEY, next);
      return next;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(SLIDE_STORAGE_KEY, current);
  }, [current]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gridView) {
        if (e.key === 'Escape') {
          setGridView(false);
        }
        return;
      }
      if (e.key === 'Escape') {
        setGridView(true);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goTo(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goTo(current - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, goTo, gridView]);

  if (gridView) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black/80 flex flex-col items-center justify-center z-50 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 max-w-full max-h-full">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              className="relative aspect-video w-64 bg-white rounded-lg overflow-hidden shadow-lg border-4 border-transparent hover:border-yellow-400 transition-all duration-200 focus:outline-none"
              onClick={() => {
                goTo(idx);
                setGridView(false);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">{idx + 1}</div>
              <div className="w-full h-full pointer-events-none scale-75 origin-top-left">
                {slide.content}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 text-white text-lg opacity-70">Click a slide to zoom in. Press Escape to exit grid view.</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {slides.map((slide, idx) => (
        <section
          key={idx}
          className={`fixed inset-0 w-screen h-screen flex items-center justify-center transition-opacity duration-500 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
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

// Add this to inject the Noto Serif font link if not already present
if (!document.getElementById('noto-serif-font')) {
  const link = document.createElement('link');
  link.id = 'noto-serif-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Goudy+Bookletter+1911&display=swap';
  document.head.appendChild(link);
}

const style = document.createElement('style');
style.innerHTML = `\n.goudy-bookletter-1911-regular {\n  font-family: \"Goudy Bookletter 1911\", serif;\n  font-weight: 400;\n  font-style: normal;\n}\n`;
document.head.appendChild(style);
