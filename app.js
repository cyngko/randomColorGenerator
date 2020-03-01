var colorName = document.querySelector('#colorName');
var inputField = document.getElementById('inputField');
var csColorCode = document.querySelectorAll('.csColorCode');
var monoCsName = document.querySelectorAll('.csName');
var monoCsValue = document.querySelectorAll('.csValue');
var csColorBlock = document.querySelectorAll('.csColorBlock');
var analogicCsName = document.querySelectorAll('.analogicCsName');
var analogicCsValue = document.querySelectorAll('.analogicCsValue');
var analogicColorBlock = document.querySelectorAll('.analogicColorBlock');

var analogicComplementCsName = document.querySelectorAll(
  '.analogicComplementCsName'
);
var analogicComplementCsValue = document.querySelectorAll(
  '.analogicComplementCsValue'
);
var analogicComplementColorBlock = document.querySelectorAll(
  '.analogicComplementColorBlock'
);

var colorCodes = document.querySelectorAll('.colorCodes');
var csModuleContainer = document.querySelectorAll('.csModuleContainer');
var randomHexBtn = document.getElementById('randomHexBtn');
var colorSchemeLink = document.querySelector('#colorSchemeLink');

var elements = ['A', 'B', 'C', 'D', 'E', 'F', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function randomHex(list) {
  var i = 0;
  var hex = '';
  while (i < 6) {
    i++;
    var iNr = Math.floor(Math.random() * 20);
    if (iNr < 5) iNr = iNr - 4 + 4;
    else iNr = iNr - 4;
    hex += list[iNr];
  }
  return hex;
}
document.body.style.backgroundColor = '#' + randomHex(elements);

//fetch color values
var fetchCv = function(api) {
  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(color => {
      document.querySelector('body').style.backgroundColor = color.hex.value;
      colorName.innerText = color.name.value;
      colorName.style.borderBottom = `4px solid ${color.hex.value}`;
      colorCodes[0].innerHTML = color.cmyk.value;
      colorCodes[1].innerHTML = color.rgb.value;
      colorCodes[2].innerHTML = color.hsl.value;
    });
};
//fetch monochrome color scheme
var fetchCs = function(schemeAPI) {
  fetch(schemeAPI)
    .then(res => {
      return res.json();
    })
    .then(schemeColor => {
      for (let i = 0; i < 5; i++) {
        csColorBlock[i].style.backgroundColor = schemeColor.colors[i].hex.value;
        monoCsName[i].innerText = schemeColor.colors[i].name.value;
        monoCsValue[i].innerText = schemeColor.colors[i].hex.value;
      }
    });
};
//fetch analogic color scheme
var fetchAnalogicCs = function(schemeAPI) {
  fetch(schemeAPI)
    .then(res => {
      return res.json();
    })
    .then(schemeColor => {
      for (let i = 0; i < 5; i++) {
        analogicColorBlock[i].style.backgroundColor =
          schemeColor.colors[i].hex.value;
        analogicCsName[i].innerText = schemeColor.colors[i].name.value;
        analogicCsValue[i].innerText = schemeColor.colors[i].hex.value;
      }
    });
};
//fetch analogic complement color scheme
var fetchAnalogicComplementCs = function(schemeAPI) {
  fetch(schemeAPI)
    .then(res => {
      return res.json();
    })
    .then(schemeColor => {
      for (let i = 0; i < 5; i++) {
        analogicComplementColorBlock[i].style.backgroundColor =
          schemeColor.colors[i].hex.value;
        analogicComplementCsName[i].innerText =
          schemeColor.colors[i].name.value;
        analogicComplementCsValue[i].innerText =
          schemeColor.colors[i].hex.value;
      }
    });
};
//Keyup Event
inputField.addEventListener('keyup', e => {
  var hex = inputField.value;
  var schemeMonoAPI =
    'https://www.thecolorapi.com/scheme?hex=' +
    hex +
    '&mode=monochrome&count=5&format=json';
  fetchCs(schemeMonoAPI);
  var schemeAnalogicAPI =
    'https://www.thecolorapi.com/scheme?hex=' +
    hex +
    '&mode=analogic&count=5&format=json';
  fetchAnalogicCs(schemeAnalogicAPI);
  var api = 'https://www.thecolorapi.com/id?hex=' + hex;
  fetchCv(api);
  var schemeAnalogicComplementAPI =
    'https://www.thecolorapi.com/scheme?hex=' +
    hex +
    '&mode=analogic-complement&count=5&format=json';
  fetchAnalogicComplementCs(schemeAnalogicComplementAPI);
});
//Random Hex Btn
randomHexBtn.addEventListener('click', e => {
  var hexValue = randomHex(elements);
  inputField.value = hexValue;
  var schemeMonoAPI =
    'https://www.thecolorapi.com/scheme?hex=' +
    hexValue +
    '&mode=monochrome&count=5&format=json';
  fetchCs(schemeMonoAPI);
  var api = 'https://www.thecolorapi.com/id?hex=' + hexValue;
  fetchCv(api);
  var schemeAnalogicAPI =
    'https://www.thecolorapi.com/scheme?hex=' +
    hexValue +
    '&mode=analogic&count=5&format=json';
  fetchAnalogicCs(schemeAnalogicAPI);
  var schemeAnalogicComplementAPI =
    'https://www.thecolorapi.com/scheme?hex=' +
    hexValue +
    '&mode=analogic-complement&count=5&format=json';
  fetchAnalogicComplementCs(schemeAnalogicComplementAPI);
});
colorSchemeLink.addEventListener('click', e => {
  if (colorSchemeLink.innerText == 'Show Color Schemes') {
    colorSchemeLink.innerText = 'Hide Color Schemes';
  } else {
    colorSchemeLink.innerText = 'Show Color Schemes';
  }
  document.querySelector('#controlPanel').classList.toggle('activeCsFlex');
  document.querySelector('#monoSchemeContainer').classList.toggle('activeCs');
  document
    .querySelector('#analogicSchemeContainer')
    .classList.toggle('activeAnalogicCs');
  document
    .querySelector('#analogicComplementSchemeContainer')
    .classList.toggle('activeAnalogicComplementCs');
});
