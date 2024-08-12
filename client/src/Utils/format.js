const formatViews = (views) => {
  views = parseInt(views);
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K";
  }
  return views.toString();
};

const formatDuration = (duration) => {
  let hours = duration.split(":")[0];
  let minutes = duration.split(":")[1];
  let formattedDuration = "";
  if (hours !== "00") {
    hours = hours.replace(/^0+/, "");
    formattedDuration += hours + "hrs";
  }
  if (formattedDuration && minutes !== "00") {
    formattedDuration += " ";
  }
  if (minutes !== "00") {
    minutes = minutes.replace(/^0+/, "");
    formattedDuration += minutes + "mins";
  }
  return formattedDuration;
};

export { formatViews, formatDuration };
