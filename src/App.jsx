/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { requestToGroqAI } from "./utils/groq";
import { Light as Syntaxhighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showData, setShowData] = useState(false);

  const handleSumbit = async () => {
    setLoading(true); // Mulai loading
    setShowData(false); // Sembunyikan hasil sebelumnya
    setTypedText(""); // Reset teks yang akan diketik
    setTimeout(async () => {
      const ai = await requestToGroqAI(content.value);
      setData(ai);
      setLoading(false); // Selesai loading
      setShowData(true); // Tampilkan hasil
    }, 2000); // Simulasi delay 2 detik
  };

  // Efek mengetik
  useEffect(() => {
    if (showData && data) {
      let currentIndex = 0;
      const typingEffect = setInterval(() => {
        setTypedText((prev) => prev + data[currentIndex]);
        currentIndex++;
        if (currentIndex === data.length) {
          clearInterval(typingEffect);
        }
      }, 5); // Kecepatan pengetikan, bisa diatur sesuai kebutuhan
      return () => clearInterval(typingEffect); // Cleanup
    }
  }, [showData, data]);

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-x-full mx-auto">
      <h1 className="text-4xl text-indigo-500">React | Groq AI</h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input
          placeholder="ketik permintaan disini"
          className="py-2 px-4 text-md rounded-nd"
          id="content"
          type="text"
        />
        <button
          onClick={handleSumbit}
          type="button"
          className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {showData ? (
          <div className="typing-container"> {/* Kontainer untuk efek mengetik */}
            <Syntaxhighlight language="swift" style={darcula} wrapLongLines={true}>
              {typedText}
            </Syntaxhighlight>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
