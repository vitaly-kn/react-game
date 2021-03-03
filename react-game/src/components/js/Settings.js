import "../css/ModalContainer.css";
import "../css/Settings.css";
import { useContext } from "react";
import Button from "./Button";
import { GameContext } from "./contexts";

function Settings() {
  let { setSettings } = useContext(GameContext);
  let { cadence, setCadence } = useContext(GameContext);
  let { maxTries, setMaxTries } = useContext(GameContext);
  let { soundEnabled, setSoundEnabled } = useContext(GameContext);

  function onCadenceChange(event) {
    setCadence(event.target.value);
    localStorage.setItem("cadence", event.target.value);
  }

  function onMaxTriesChange(event) {
    setMaxTries(event.target.value);
    localStorage.setItem("tries", event.target.value);
  }

  function onSoundStateChange(event) {
    setSoundEnabled(String(event.target.checked));
    localStorage.setItem("sound", String(event.target.checked));
  }

  function closeWindow() {
    setSettings(false);
  }

  return (
    <div className="ModalContainer">
      <div className="Settings">
        <h2>Settings</h2>
        <div>
          <div className="control">
            <label htmlFor="respawn">Apples Respawn Frequency</label>
            <select id="respawn" name="respawn" value={cadence} onChange={onCadenceChange}>
              <option value="7000">7 sec</option>
              <option value="10000">10 sec</option>
              <option value="12000">12 sec</option>
            </select>
          </div>
          <div className="control">
            <label htmlFor="respawn">Max Tries</label>
            <select id="respawn" name="respawn" value={maxTries} onChange={onMaxTriesChange}>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>

          <div className="control">
            <label htmlFor="sound">Enable Sound</label>
            <input id="sound" type="checkbox" name="sound" checked={soundEnabled === "true" ? true : false} onChange={onSoundStateChange} />
          </div>
        </div>
        <Button disabled="false" id="settingsOk" caption="Ok" onClick={closeWindow} />
      </div>
    </div>
  );
}

export default Settings;
