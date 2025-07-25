import React, { useCallback, useEffect, useState, useRef } from "react";
import "./index.css";

const App = () => {
  const [length, setLength] = useState(8);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (characterAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    if (numberAllowed) {
      str += "0123456789";
    }

    for (let i = 0; i < length; i++) {
      let charIdx = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIdx);
    }
    setPassword(pass);
  }, [length, characterAllowed, numberAllowed]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  };
  useEffect(() => {
    passwordGenerator();
  }, [length, characterAllowed, numberAllowed]);
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center font-sans ">
      <div className="w-full max-w-md mx-auto  rounded-lg p-6 my-8 bg-gray-800 text-white shadow-xl shadow-gray-500">
        <h1 className="text-3xl font-bold text-center mb-6">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-gray-700 "
            placeholder="Your Secure Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-4 py-1.5 shrink-0 font-semibold"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-sm gap-y-4 sm:gap-x-4">
          <div className="flex items-center gap-x-3 flex-grow">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-full accent-blue-500 youtube-slider"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-medium whitespace-nowrap">
              Length: {length}
            </label>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="numberInput"
                className="w-4 h-4 accent-blue-500"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="charInput"
                className="w-4 h-4 accent-blue-500"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
