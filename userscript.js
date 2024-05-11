function start_bad_apple(){
    fetch('https://raw.githubusercontent.com/SmolLemon/Bad-Apple/main/data.json') 
    .then((response) => response.json())
    .then((json) => {
        let frame = json.frame;
        let dStyle = document.querySelector('head');
        dStyle.innerHTML += '<style> .mono {font-family: monospace;} </style>';
        let rows = document.getElementsByTagName("tr");
        setTimeout(() => {
                for (let i = 0; i < rows.length; ++i) {
                if(rows[i].id.slice(-1) === "t") continue;
                let item = rows[i].getElementsByTagName("td")[1];
                item.removeChild(item.firstElementChild); //remove the "Accepted" text
                
                for (let j = 0; j < 33; ++j) {
                    let a = document.createElement("span");
                    a.appendChild(document.createTextNode("AC"));
                    a.setAttribute("title", "Accepted");
                    a.setAttribute("class", "case-AC mono");
                    item.appendChild(a);
                }
            }
        }, 5000);

        
        async function makeApple(fr){
            let frames = frame[fr];
            for (let k = 0, i = 0; k < rows.length; ++k) {
                if(rows[k].id.slice(-1) === "t") continue;
                let item = rows[k].getElementsByTagName("td")[1];
                let pixels = item.getElementsByTagName("span");
                for (let j = 0; j < frames[i].length; ++j) {
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
            await sleep(fr * 100 + 8000);
            makeApple(fr);
            if(fr === 0) console.log("Start Bad Apple on VNOJ by SmolLemon");
            if((fr + 1) % 100 === 0) console.log(fr + 1);
        }
        for(let fr = 0; fr < frame.length; ++fr){
            run(fr);
        }
    });
}
