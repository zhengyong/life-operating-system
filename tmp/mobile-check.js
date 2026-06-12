const width = window.innerWidth;
const doc = document.documentElement;
const body = document.body;
const h1 = document.querySelector('h1');
const img = document.querySelector('figure img');
console.log(JSON.stringify({
  width,
  docClientWidth: doc.clientWidth,
  docScrollWidth: doc.scrollWidth,
  bodyScrollWidth: body.scrollWidth,
  h1: h1 ? {text: h1.textContent, rect: h1.getBoundingClientRect().toJSON?.() || null, overflowWrap: getComputedStyle(h1).overflowWrap, wordBreak: getComputedStyle(h1).wordBreak} : null,
  img: img ? {src: img.getAttribute('src'), rect: img.getBoundingClientRect().toJSON?.() || null, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight} : null
}, null, 2));
