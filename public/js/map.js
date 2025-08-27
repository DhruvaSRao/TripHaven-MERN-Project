const map = new maptilersdk.Map({
  container: 'map',
  style: maptilersdk.MapStyle.STREETS,
  center: [77.2088, 28.6139], // [lng, lat]
  zoom: 10,
  apiKey: mapToken   // use the variable you defined in EJS
});

