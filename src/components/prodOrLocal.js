export default function prodOrLocal() {
  var path = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    path = "http://localhost:8000";
    return path;
  } else {
    const host = window.location.host;
    const protocol = window.location.protocol;
    path = `${protocol}//${host}`;
    return path;
  }
}
