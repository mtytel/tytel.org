$(document).ready(function initDownload() {
  var download_link = $("#download-link");
  if (navigator.appVersion.indexOf("Win") != -1)
    download_link.prop("href", "/win");
  else if (navigator.appVersion.indexOf("Mac") != -1)
    download_link.prop("href", "/osx");
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1)
    download_link.prop("href", "/linux");
});
