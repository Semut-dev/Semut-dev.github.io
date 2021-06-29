// TODO
/**
 * totalRate - total pemberi rate
 * rate - rate yang diberikan, (0 - 5)
 * iPenulis - inisial penulis
 * iJudul - inisial buku 
 */
document.addEventListener("DOMContentLoaded", function(event)
{ 
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200")
        {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);  
}
function parseNumber(strg)
{
    var strg = strg || "";
    var decimal = '.';
    strg = strg.replace(/[^0-9$.,]/g, '');
    if(strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
    if((strg.match(new RegExp("\\" + decimal,"g")) || []).length > 1) decimal="";
    if (decimal != "" && (strg.length - strg.indexOf(decimal) - 1 == 3) && strg.indexOf("0" + decimal)!==0) decimal = "";
    strg = strg.replace(new RegExp("[^0-9$" + decimal + "]","g"), "");
    strg = strg.replace(',', '.');
    return parseFloat(strg);
}
function isLetter(i)
{
    return ((i >= 'a' && i <= 'z') || (i >= 'A' && i <= 'Z'));
}
function sortJson(arr, prop, dir) {
    return arr.sort(function(a,b) {
        var propA, propB;
        if (prop == "total") {
            propA = a['total']
            propB = b['total']
        }
        else {
            propA = a[prop];
            propB = b[prop];
        }

        if (dir=='asc') {
            return propA - propB;
        } else {
            return propB - propA;
        }
    });
}
loadJSON((bookList) => {
    var total_rate = {
        ke0: 0, // 0 - 100
        ke100: 0, // 100 - 999
        ke1000: 0, // 1.000 - 9.999
        ke10000: 0, // 10.000 - 99.999
        ke100000: 0, // 100.000 - 999.999
        ke1000000: 0, // > 1.000.000
    }

    var skala_rate = {
        nilai0: 0, // 0 - 0.9
        nilai1: 0, // 1 - 1.9
        nilai2: 0, // 2 - 2.9
        nilai3: 0, // 3 - 3.9
        nilai4: 0 // 4 - 5
    }

    var iPenulis_rate = {
        a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, other: 0
    }
    var iFixPenulisRate = [];
    var iBuku_rate = {
        a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, other: 0
    }
    var iFixBukuRate = [];

    bookList.data.forEach((value, index, array) => {
        var jTotalRate = parseNumber(value.rate_total);
        var jSkalaRate = parseFloat(value.rate_avg);
        var jPenulis = value.author[0].toLowerCase();
        var jBuku = value.judul[0].toLowerCase();

        if (jTotalRate >= 0 && jTotalRate < 100) total_rate.ke0++;
        else if (jTotalRate >= 100 && jTotalRate < 1000) total_rate.ke100++;
        else if (jTotalRate >= 1000 && jTotalRate < 10000) total_rate.ke1000++;
        else if (jTotalRate >= 10000 && jTotalRate < 100000) total_rate.ke10000++;
        else if (jTotalRate >= 100000 && jTotalRate < 1000000) total_rate.ke100000++;
        else if (jTotalRate >= 1000000) total_rate.ke1000000++;

        if (!isLetter(jPenulis)) jPenulis = "other";
        if (!isLetter(jBuku)) jBuku = "other";
        iPenulis_rate[jPenulis]++;
        iBuku_rate[jBuku]++;

        if (jSkalaRate >= 0 && jSkalaRate < 1) skala_rate.nilai0++;
        else if (jSkalaRate >= 1 && jSkalaRate < 2) skala_rate.nilai1++;
        else if (jSkalaRate >= 2 && jSkalaRate < 3) skala_rate.nilai2++;
        else if (jSkalaRate >= 3 && jSkalaRate < 4) skala_rate.nilai3++;
        else if (jSkalaRate >= 4) skala_rate.nilai4++;
    });

    for (const [key, value] of Object.entries(iPenulis_rate))
    {
        if (isNaN(value)) continue;
        iFixPenulisRate.push({inisial: key.toUpperCase(), total: value});
    }
    for (const [key, value] of Object.entries(iBuku_rate))
    {
        if (isNaN(value)) continue;
        iFixBukuRate.push({inisial: key.toUpperCase(), total: value});
    }
    
    iFixPenulisRate = sortJson(iFixPenulisRate, "total", "desc");
    iFixBukuRate = sortJson(iFixBukuRate, "total", "desc");

    var totalRatectx = document.getElementById('totalRate');
    var ratectx = document.getElementById('rate');
    var iPenulisctx = document.getElementById('iPenulis');
    var iJudulctx = document.getElementById('iJudul');

    var totalRateChart = new Chart(totalRatectx, {
        type: 'doughnut',
        data: {
            labels: ['0 - 99', '100 - 999', '1.000 - 9.999', '10.000 - 99.999', '100.000 - 999.999', '1.000.000 ke atas'],
            datasets: [{
                label: 'Banyaknya Jumlah Rating pada Buku',
                data: [total_rate.ke0, total_rate.ke100, total_rate.ke1000, total_rate.ke10000, total_rate.ke100000, total_rate.ke1000000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            aspectRatio: 0,
        }
    });
    var rateChart = new Chart(ratectx, {
        type: 'pie',
        data: {
            labels: ['0 - 0.9', '1 - 1.9', '2 - 2.9', '3 - 3.9', '4 ke atas'],
            datasets: [{
                data: [skala_rate.nilai0, skala_rate.nilai1, skala_rate.nilai2, skala_rate.nilai3, skala_rate.nilai4],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            aspectRatio: 0,
        }
    });
    var iPenulisChart = new Chart(iPenulisctx, {
        type: 'bar',
        data: {
            labels: [iFixPenulisRate[0].inisial, iFixPenulisRate[1].inisial, iFixPenulisRate[2].inisial, iFixPenulisRate[3].inisial, iFixPenulisRate[4].inisial],
            datasets: [{
                data: [iFixPenulisRate[0].total, iFixPenulisRate[1].total, iFixPenulisRate[2].total, iFixPenulisRate[3].total, iFixPenulisRate[4].total],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
            }
        }
    });
    var iJudulChart = new Chart(iJudulctx, {
        type: 'line',
        data: {
            labels: [iFixBukuRate[0].inisial, iFixBukuRate[1].inisial, iFixBukuRate[2].inisial, iFixBukuRate[3].inisial, iFixBukuRate[4].inisial],
            datasets: [{
                data: [iFixBukuRate[0].total, iFixBukuRate[1].total, iFixBukuRate[2].total, iFixBukuRate[3].total, iFixBukuRate[4].total],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
            }
        }
    });
});
});