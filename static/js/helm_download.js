$(document).ready(function initDownload() {
  var download_link = $("#download-link");
  if (navigator.appVersion.indexOf("Mac") != -1)
    download_link.prop("href", "/static/dist/Helm.pkg");
  else if (navigator.appVersion.indexOf("Win") != -1) {
    if (navigator.oscpu.indexOf("64") != -1)
      download_link.prop("href", "/static/dist/Helm_64.msi");
    else
      download_link.prop("href", "/static/dist/Helm_32.msi");
  }
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1) {
    if (navigator.oscpu.indexOf("64") != -1)
      download_link.prop("href", "https://launchpad.net/~tytel/+archive/ubuntu/helm/+build/7630257/+files/helm_0.3-2_amd64.deb");
    else
      download_link.prop("href", "https://launchpad.net/~tytel/+archive/ubuntu/helm/+build/7630258/+files/helm_0.3-2_i386.deb");
  }
});
