function start_bad_apple(){
    fetch('https://raw.githubusercontent.com/SmolLemon/Bad-Apple/main/data.json') 
    .then((response) => response.json())
    .then((json) => {
        let frame = json.frame;
        let dStyle = document.querySelector('head');
        dStyle.innerHTML += '<style> .mono {font-family: monospace;} </style>';


        let rows = document.getElementsByTagName("tr");
        setTimeout(() => {
                for (let i=0; i<rows.length; ++i) {
                if(i === 1 || i == 3 || i === 5) continue;
                let item = rows[i].getElementsByTagName("td")[1];
                item.removeChild(item.firstElementChild); //remove the "Accepted" text
                
                for (let j=0; j<33; ++j) {
                    let a = document.createElement("span");
                    a.appendChild(document.createTextNode("AC"));
                    a.setAttribute("title", "Accepted");
                    a.setAttribute("class", "case-AC mono");
                    item.appendChild(a);
                }
            }
        }, 15000);

        
        async function print(fr){
            let frames = frame[fr];
            for (let k=0, i = 0; k<rows.length; k++) {
                if(k === 1 || k == 3 || k === 5) continue;
                let item = rows[k].getElementsByTagName("td")[1];
                let pixels = item.getElementsByTagName("span");
                for (let j=0; j<frames[i].length; j++) {
                    // AC for white pixels, WA for black pixels
                    if (frames[i][j] === 1) {
                        pixels[j].textContent = "AC";
                        pixels[j].setAttribute("title", "Accepted");
                        pixels[j].setAttribute("class", "case-AC mono");  
                    } else {
                        pixels[j].textContent = "WA";
                        pixels[j].setAttribute("title", "Wrong Answer");
                        pixels[j].setAttribute("class", "case-WA mono");  
                    }
                }
                ++i;
            }
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function run(fr) {
            //The bad apple video runs in 30 frames per second.
            //I tried to run 30 frames but it was too laggy to put on video
            //So I slowed it down to 10 frames per second
            await sleep(fr * 100 + 10000);
            print(fr);
        }
        for(let fr = 0; fr < frame.length;){
            run(fr);
            ++fr;
        }
    });
}
