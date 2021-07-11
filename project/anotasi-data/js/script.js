/**
 * Source JavaScript
 * @author Kelompok 4
 */

function loadJSON(path)
{
   return $.getJSON(path).then(data => {
      return data['videos']
   })
}
function getAbbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000)
    {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}
function getProperDuration(seconds)
{
   let minute = 0
   while (seconds > 60)
   {
      minute++
      seconds -= 60
   }
   return minute.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function fetchExpression(data, unique = false)
{
    let items = []
    data['anotasi'].forEach(a => {
       let datax = items.find(f => f.value == a.value)
       if (unique)
       {
          if (!datax)
          {
             items.push({
                value: a.value,
                url: a.img
             })
          }
       }
       else
       {
          items.push({
             value: a.value,
             url: a.img
          })
       }
    })
    return items
 }
function getRandomColor() {
   var r = Math.floor(Math.random() * 255);
   var g = Math.floor(Math.random() * 255);
   var b = Math.floor(Math.random() * 255);
   return "rgba(" + r + "," + g + "," + b + ", 0)";
};