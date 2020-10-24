import tzLookup from "tz-lookup";

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

let dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short"
};

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(timestamp));
}

export function formatDateTimeInTZ(timestamp, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    ...dateOptions,
    timeZone: timeZone
  }).format(new Date(timestamp));
}

export function getTimeZoneFromLatLong(lat, long) {
  return tzLookup(lat, long);
}