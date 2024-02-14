import Gallery from "./Gallery.js";

const galeria = new Gallery("Galeria");

let mute = false;
let pause = false;

const getData = async() =>{
    const request = await fetch("./Data.json");
    const result = await request.json();
    console.log(result)
    return result
}

const loadData = (data,galeria) =>{

    data.forEach(item => {
        galeria.add(item);
    });

    console.log(galeria.peacesOfArt);
}

const showElement = (i) =>{
    const galeriaDisplayElemento = document.querySelector("#galeriaDisplay");
    
    if(galeria.peacesOfArt[i]){
        galeriaDisplayElemento.style.display="flex";
        galeriaDisplayElemento.innerHTML = renderSlideShow(i, galeria.peacesOfArt[i])
        galeriaDisplayElemento.scrollIntoView();
        loadNextElementEvents(i)
        if(galeria.peacesOfArt[i].type === "music"){
            loadMusicElementEvents(i)
        } else{

            /* SAMPLE CODE */
            let el = document.getElementById('display')
            
            const height = el.clientHeight
            const width = el.clientWidth

            el.addEventListener('mousemove', handleMove)

            function handleMove(e) {
                const xVal = e.layerX
                const yVal = e.layerY
                
                const yRotation = 20 * ((xVal - width / 2) / width)
                
                const xRotation = -20 * ((yVal - height / 2) / height)
                
                const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
                
                el.style.transform = string
            }

            el.addEventListener('mouseout', function() {
                el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
            })

            el.addEventListener('mousedown', function() {
                el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
            })

            el.addEventListener('mouseup', function() {
                el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
            })
            /* SAMPLE CODE */

        }
    }
}

const loadGalleryEvents = (galeria) =>{
    for(let i = 0; i<galeria.length;i++){
        document.getElementById(i).onclick = () =>{
            showElement(i);
        }
    };
}

const loadNextElementEvents = (i) =>{
    document.getElementById("next").onclick = () =>{
        if(i !== galeria.peacesOfArt.length-1)
            showElement(i+1);
        else
            showElement(0);
        
    }
    
    document.getElementById("prev").onclick = () =>{
        if(i !== 0)
            showElement(i-1);
        else
            showElement(galeria.peacesOfArt.length-1);
    }

}

const loadMusicElementEvents = (i) =>{
    const audio = document.getElementById("audio");
    document.getElementById("time").onclick = () =>{
        if(!pause){
            audio.pause()
            document.getElementById("time").src="content/images/play.png"
        } else{
            audio.play()
            document.getElementById("time").src="content/images/pause.png"
        }
        pause = !pause;
    }
    
    document.getElementById("sound").onclick = () =>{
        document.getElementById("sound").muted != document.getElementById("sound").muted;
        if(!mute)
            document.getElementById("sound").src="content/images/unmute.png"
        else
            document.getElementById("sound").src="content/images/mute.png"

        mute = !mute;
    }

}

window.onload = async() =>{
    let i = 0;
    const data = await getData();
    loadData(data,galeria)

    const divGallery = document.querySelector("#galeria");
    divGallery.innerHTML = renderGallery(galeria.peacesOfArt)

    loadGalleryEvents(galeria.peacesOfArt)
    
}