mdc.autoInit();

var toolbar = mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');

var drawerEl = document.querySelector('.mdc-temporary-drawer');
var MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
var drawer = new MDCTemporaryDrawer(drawerEl);
document.querySelector('.demo-menu').addEventListener('click', function() {
  drawer.open = true;
});

for (var links = document.links, i = 0, a; a = links[i]; i++) {
  if (a.host !== location.host) {
    a.target = '_blank';
  }
}
