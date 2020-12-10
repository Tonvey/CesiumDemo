import * as Cesium from "cesium";
export class Application {
  private _containerId: string;
  constructor(containerId: string) {
    this._containerId = containerId;
  }
  run() {
    let viewer = new Cesium.Viewer(this._containerId);
  }
}
