mdc.autoInit();

var toolbar = mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');

for (var links = document.links, i = 0, a; a = links[i]; i++) {
  if (a.host !== location.host) {
    a.target = '_blank';
  }
}
