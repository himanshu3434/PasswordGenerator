import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setcharacter] = useState(false);

  const pass_ref = useRef("");

  const passwordGenerate = useCallback(() => {
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number === true) {
      str += "0123456789";
      console.log("inside Number");
    }

    if (character === true) str += "$#@!&*.,';:><";
    let s_length = str.length;
    let pass = "";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * s_length + 1);

      pass += str[index];
    }
    // console.log(pass);
    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerate();
    console.log("inside usee effect");
  }, [length, number, character, passwordGenerate]);

  if (password === "") passwordGenerate();

  return (
    <>
      <div className="  flex justify-center mt-10 ">
        <div className="bg-neutral-800 w-1/2  rounded-lg  ">
          <div className="flex justify-center my-3 mt-6  ">
            <h1 className="text-2xl text-white ">Password Generator</h1>
          </div>

          <div className="mt-7 px-6">
            <div className="flex justify-center mb-5 ">
              <input
                className="w-full h-10 rounded-l-md outline-none text-orange-700"
                placeholder="  Password"
                readOnly
                type="text"
                ref={pass_ref}
                value={password}
                id="pass-store"
              />
              <button
                className=" bg-blue-600 w-20 rounded-r-md text-white"
                onClick={() => {
                  navigator.clipboard.writeText(pass_ref.current.value);
                  pass_ref.current?.select();
                }}
              >
                Copy
              </button>
            </div>
            <div className=" flex align-center mb-5">
              <div className="flex align-center  w-50 text-orange-600 ">
                <input
                  className="w-40  mr-4"
                  min="6"
                  max="25"
                  type="range"
                  onChange={(event) => {
                    setLength(event.target.value);
                  }}
                />
                <label>Length: {length} </label>
              </div>
              <div className="mx-3 text-orange-600">
                <input
                  className=" mr-3 "
                  type="checkbox"
                  onChange={() => {
                    setNumber((prev) => !prev);
                  }}
                />
                <label>Number</label>
              </div>
              <div className="text-orange-600">
                <input
                  className="mr-3"
                  type="checkbox"
                  onChange={() => {
                    setcharacter((prev) => !prev);
                  }}
                />
                <label>Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
