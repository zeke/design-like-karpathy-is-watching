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
        <img src="images/replicate-logos.png" className="max-w-[50%] h-auto object-contain"></img>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full" style={{ backgroundColor: 'rgb(32, 32, 34)' }}>
        <blockquote className="text-[4vw] max-w-[50%] py-16 text-center goudy-bookletter-1911-regular">This talk is for people who make products for software developers.</blockquote>
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
        <blockquote className="text-[5vw] max-w-[80%] py-16 goudy-bookletter-1911-regular relative z-10">&quot;Here is where some of the troubles started [with] OpenAI, Replicate, Vercel, Clerk, Stripe...&quot;</blockquote>
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


  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-rose-500">        
        <p className="text-6xl">
          <ol className="list-decimal space-y-10">
            <li>Accept payments</li>
            <li>Document your shit</li>
            <li>Feed the machines</li>
            <li>Use boring technology</li>
            <li>Practice good hygiene</li>
            <li>Deploy early and often</li>
          </ol>
        </p>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img src="https://replicate.delivery/xezq/ssZ7s25lkV5DCNQQy6cvduiYzEQEM5TsI0l9jfIeuNW0x9yUA/tmptlyi0lma.png" className="w-screen h-screen object-cover"></img>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <p className="text-6xl">Document your shit (write OpenAPI docs)</p>
      </div>
    ),
  },


  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <p className="text-6xl">Feed the machines</p>
      </div>
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <p className="text-6xl">$ curl https://cog.run/llms.txt</p>
      </div>  
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img src="images/replicate-llm-button.png" className="absolute inset-0 w-full h-full object-cover" />
      </div>  
    ),
  },

  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full" style={{ backgroundColor: '#BC694A' }}>
        <img src="images/open-in-claude.png" className="object-contain" />
      </div>  
    ),
  },


  {
  content: (
    <div className="flex flex-col items-center justify-center h-full w-full" style={{ backgroundColor: '#BC694A' }}>
      <img src="images/claude.png" className="object-contain" />
    </div>  
  ),
  },



  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full" style={{ backgroundColor: 'rgb(30, 79, 13)' }}>
        <p className="text-6xl">
          <ol className="list-decimal space-y-10">
            <li className="opacity-30">Accept payments</li>
            <li className="opacity-30">Document your shit</li>
            <li className="opacity-30">Feed the machines</li>
            <li className="opacity-100">Use boring technology <span className="opacity-50">(cURL, SQL, HTTP, OpenAPI)</span></li>
            <li className="opacity-30">Practice good hygiene</li>
            <li className="opacity-30">Be mindful of context window limits</li>
            <li className="opacity-30">Deploy early and often</li>
          </ol>
        </p>
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
        <img src="images/ray-so-export.png" className="w-[95vw] h-[95vh] object-contain"></img>
      </div>
    ),
  },

  // {
  //   content: (
  //     <div className="flex flex-col items-center justify-center h-screen w-screen">
  //       <img src="https://replicate.delivery/xezq/4MIVrd8lUaamJN35dJzUNtYI0onNIDejuHwmqehaK7ist7yUA/tmpfrmkmech.png" className="w-screen h-screen object-cover"></img>
  //     </div>
  //   ),
  // },
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
        <h2 className="text-8xl font-extrabold mb-4" style={{ fontFamily: 'Noto Serif, serif' }}>Lean into OpenAPI</h2>
        <p className="text-2xl">Everything will build on top of OpenAPI: docs, SDKs, MCP servers, etc.</p>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h2 className="text-8xl font-extrabold mb-4" style={{ fontFamily: 'Noto Serif, serif' }}>Mind the context window</h2>
        <p className="text-2xl">In the age of MCP, it's too easy to blow your context window budget.</p>
      </div>
    ),
  },
];

function SlideShow() {
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem(SLIDE_STORAGE_KEY);
    return saved !== null ? Number(saved) : 0;
  });

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
