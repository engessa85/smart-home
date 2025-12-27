
import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../utils/fireBaseConfig";

function Devices() {
  const [servo, setServo] = useState<0 | 1>(0);
  const [relay, setRelay] = useState<0 | 1>(0);
  const [led, setLed] = useState<0 | 1>(0);
  const [remote, setRemote] = useState<0 | 1>(0);
  const [temp, setTemp] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [smoke, setSmoke] = useState<number | null>(null);
  const [motion, setMotion] = useState<number | null>(null);
  const [ldr, setLdr] = useState<number | null>(null);
  const [gasAlert, setGasAlert] = useState<number | null>(null);

  const db = getDatabase(app);

  useEffect(() => {
    // 🔹 Listen for devices state
    const devicesRef = ref(db, "devices");
    onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.servo === "number") setServo(data.servo);
        if (typeof data.relay === "number") setRelay(data.relay);
        if (typeof data.led === "number") setLed(data.led);
        if (typeof data.remote === "number") setRemote(data.remote);
      }
    });

    // 🔹 Listen for signals (temp, humidity, smoke, motion, ldr, gas_alert)
    const signalsRef = ref(db, "signals");
    onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.temp === "number") setTemp(data.temp);
        if (typeof data.humidity === "number") setHumidity(data.humidity);
        if (typeof data.smoke === "number") setSmoke(data.smoke);
        if (typeof data.motion === "number") setMotion(data.motion);
        if (typeof data.ldr === "number") setLdr(data.ldr);
        if (typeof data.gas_alert === "number") setGasAlert(data.gas_alert);
      }
    });
  }, [db]);

  const toggleServo = () => {
    set(ref(db, "devices/servo"), servo ? 0 : 1);
  };

  const toggleRelay = () => {
    set(ref(db, "devices/relay"), relay ? 0 : 1);
  };

  const toggleLed = () => {
    set(ref(db, "devices/led"), led ? 0 : 1);
  };

  const toggleRemote = () => {
    set(ref(db, "devices/remote"), remote ? 0 : 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
              Smart Home Dashboard
            </h1>
            <p className="text-slate-600 text-lg">Control your devices and monitor your environment</p>
          </div>
          <button
            className={`group relative overflow-hidden bg-gradient-to-r ${
              remote === 1
                ? "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                : "from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600"
            } text-white font-medium py-3 px-5 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
            onClick={toggleRemote}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">📱</span>
              <span>Remote {remote === 1 ? "ON" : "OFF"}</span>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Devices Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Devices</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                className={`group relative overflow-hidden bg-gradient-to-r ${
                  servo === 1
                    ? "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    : "from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600"
                } text-white font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
                onClick={toggleServo}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">⚙️</span>
                  <span>Servo Motor {servo === 1 ? "ON" : "OFF"}</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              <button
                className={`group relative overflow-hidden bg-gradient-to-r ${
                  relay === 1
                    ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : "from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600"
                } text-white font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
                onClick={toggleRelay}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">🔌</span>
                  <span>Fan Motor {relay === 1 ? "ON" : "OFF"}</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              <button
                className={`group relative overflow-hidden bg-gradient-to-r ${
                  led === 1
                    ? "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    : "from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600"
                } text-white font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
                onClick={toggleLed}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">💡</span>
                  <span>Light {led === 1 ? "ON" : "OFF"}</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Signals Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Environment</h2>
            <div className="space-y-4">
              <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌡️</span>
                  <div>
                    <p className="text-sm text-slate-600">Temperature</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {temp !== null ? `${temp} °C` : "—"}
                    </p>
                  </div>
                </div>
                <p className={`absolute top-2 right-2 text-xs text-slate-500 px-2 py-1 rounded font-bold animate-pulse ${temp !== null ? (temp > 50 ? "bg-red-500 text-white" : "bg-green-500 text-white") : ""}`}>
                  {temp !== null ? (temp > 50 ? "High" : "Normal") : ""}
                </p>
              </div>

              <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <p className="text-sm text-slate-600">Humidity</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {humidity !== null ? `${humidity} %` : "—"}
                    </p>
                  </div>
                </div>
                 <p className={`absolute top-2 right-2 text-xs text-slate-500 px-2 py-1 rounded font-bold animate-pulse ${humidity !== null ? (humidity > 60 ? "bg-red-500 text-white" : "bg-green-500 text-white") : ""}`}>
                  {humidity !== null ? (humidity > 60 ? "High" : "Normal") : ""}
                </p>
              </div>

              <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-sm text-slate-600">Smoke</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {smoke !== null ? smoke : "—"} ppm
                    </p>
                  </div>
                </div>
                <p className={`absolute top-2 right-2 text-xs px-2 py-1 rounded font-bold ${(smoke !== null && smoke > 3000) || gasAlert === 1 ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white"}`}>
                  {(smoke !== null && smoke > 3000) || gasAlert === 1 ? "Fire" : "Normal"}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚶</span>
                  <div>
                    <p className="text-sm text-slate-600">Motion</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {motion !== null ? (motion === 1 ? "Intruder Detected!" : "No Intruder Detected") : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-sm text-slate-600">Light Level</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {ldr !== null ? (ldr > 100 ? "Night-time" : "Day-time") : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices;
