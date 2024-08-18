import React, { useState } from "react";
import { Scanner as ScannerComp, IScannerProps, outline, boundingBox, centerText, useDevices } from "@yudiel/react-qr-scanner";
import { useNavigate } from "@tanstack/react-router";

const styles = {
  container: {
    width: 400,
    margin: "auto"
  },
  controls: {
    marginBottom: 8
  }
};

export function Scanner(args: IScannerProps) {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [tracker, setTracker] = useState<string | undefined>("centerText");
  const navigation = useNavigate();

  const [pause, setPause] = useState(false);

  const devices = useDevices();

  function getTracker() {
    switch (tracker) {
      case "outline":
        return outline;
      case "boundingBox":
        return boundingBox;
      case "centerText":
        return centerText;
      default:
        return undefined;
    }
  }

  return (
    <div style={styles.container}>
      <button style={{ marginBottom: 5 }} onClick={() => setPause((val) => !val)}>
        {pause ? "Pause Off" : "Pause On"}
      </button>
      <div style={styles.controls}>
        <select onChange={(e) => setDeviceId(e.target.value)}>
          <option value={undefined}>Select a device</option>
          {devices.map((device: {
            deviceId: string | number | readonly string[] | undefined;
            label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
          }, index: React.Key | null | undefined) => (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
        <select style={{ marginLeft: 5 }} onChange={(e) => setTracker(e.target.value)}>
          <option value="centerText">Center Text</option>
          <option value="outline">Outline</option>
          <option value="boundingBox">Bounding Box</option>
          <option value={undefined}>No Tracker</option>
        </select>
      </div>
      <ScannerComp
        {...args}
        formats={[
          "qr_code",
          "micro_qr_code",
          "rm_qr_code",
          "maxi_code",
          "pdf417",
          "aztec",
          "data_matrix",
          "matrix_codes",
          "dx_film_edge",
          "databar",
          "databar_expanded",
          "codabar",
          "code_39",
          "code_93",
          "code_128",
          "ean_8",
          "ean_13",
          "itf",
          "linear_codes",
          "upc_a",
          "upc_e"
        ]}
        constraints={{
          deviceId: deviceId
        }}
        onScan={(detectedCodes: any) => {
          console.log("detectedCodes", detectedCodes[0].rawValue);

          navigation({
            to: `/${detectedCodes[0].rawValue}`,
          });

          // if (detectedCodes) {
          //   // Check if includes a part of this path
          //   // http://192.168.100.11:5173/customers/2
          //   if (detectedCodes[0].data.includes("customers")) {
          //     console.log("detectedCodes[0].data", detectedCodes[0].data);
          //   }
          // }
        }}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: getTracker()
        }}
        allowMultiple={true}
        scanDelay={2000}
        paused={pause}
      />
    </div>
  );
}
