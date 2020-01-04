// Migrations that should happen after App is instantiated
import App from "../app";
import {InterfaceDevice} from "../classes/interface";
export default () => {
  return new Promise(done => {
    if (App.interfaceDevices.length === 0) {
      App.interfaceDevices = [
        new InterfaceDevice({
          id: "interface-device-1",
          class: "InterfaceDevice",
          name: "iPhone SE",
          width: 320,
          height: 568,
        }),
        new InterfaceDevice({
          id: "interface-device-2",
          class: "InterfaceDevice",
          name: "Desktop HD",
          width: 1920,
          height: 1080,
        }),
        new InterfaceDevice({
          id: "interface-device-3",
          class: "InterfaceDevice",
          name: "Desktop Widescreen",
          width: 1600,
          height: 900,
        }),
        new InterfaceDevice({
          id: "interface-device-4",
          class: "InterfaceDevice",
          name: "iPad Landscape",
          width: 1024,
          height: 768,
        }),
        new InterfaceDevice({
          id: "interface-device-5",
          class: "InterfaceDevice",
          name: "iPad Portrait",
          width: 768,
          height: 1024,
        }),
        new InterfaceDevice({
          id: "interface-device-6",
          class: "InterfaceDevice",
          name: "Pixel 2",
          width: 411,
          height: 731,
        }),
      ];
    }
    done();
  });
};
