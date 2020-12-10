import * as Cesium from "cesium";
export class Application {
  private _containerId: string;
  private _viewer: Cesium.Viewer;
  constructor(containerId: string) {
    this._containerId = containerId;
  }
  run() {
    this._viewer = new Cesium.Viewer(this._containerId);
    let options = {
      defaultResetView: Cesium.Rectangle.fromDegrees(71, 3, 90, 14),
      // Only the compass will show on the map
      enableCompass: true,
      enableZoomControls: true,
      enableDistanceLegend: true,
      enableCompassOuterRing: true,
    };
    this._viewer.extend(Cesium.viewerCesiumNavigationMixin, options);
  }
  dispose() {
    this._viewer.cesiumNavigation.destroy();
    this._viewer.destroy();
  }
}
