const fs = require('fs');

// Genel(80 ile 600 arasındaki profile idlerde 0-10 sum score)
let id=1000;
let startProfileId = 80;
let endProfileId = 93;
let startsumScore = 0;
let endsumScore = 10;

// Özel durumlar
let specialCases = [
    { startProfileId: 83, endProfileId: 86, startsumScore: 6, endsumScore: 10 },
    { startProfileId: 88, endProfileId: 90, startsumScore: 8, endsumScore: 10 }
];

function generate() {
    let output = '';
    for (let profile_id = startProfileId; profile_id <= endProfileId; profile_id++) {
        let isSpecialCase = false;
        let specialSumScores = [];
        
        for (let i = 0; i < specialCases.length; i++) {
            let specialCase = specialCases[i];
            if (profile_id >= specialCase.startProfileId && profile_id <= specialCase.endProfileId) {
                isSpecialCase = true;
                for (let j = specialCase.startsumScore; j <= specialCase.endsumScore; j++) {
                    specialSumScores.push(j);
                }
                break; 
            }
        }

        for (let sum_score = startsumScore; sum_score <= endsumScore; sum_score++) {
            if (isSpecialCase && !specialSumScores.includes(sum_score)) {
                continue;
            }
            output += `VALUES (${id}, '2023-09-21 09:34:28.157349','2023-09-21 09:34:28.157349',-1, 'Advance_On_Invoicing','Advance On Invoicing', ${profile_id}, ${sum_score}),\n`;
            id++;
        }
    }
    fs.writeFile('output.txt', output, (err) => {
        if (err) {
            console.error('Dosyaya yazma hatası:', err);
            return;
        }
        console.log('Çıktı başarıyla output.txt dosyasına yazıldı.');
    });
}

generate();
