import PecaDeArte from "./PecaDeArte.js";

let galeria = null;

const getData = async() =>{
    const request = await fetch("./Data.json");
    const result = await request.json();
    console.log(result)
    return result
}

const loadData = (data) =>{
    let galeria = []

    data.forEach(item => {
        galeria.push(new PecaDeArte(item));
    });

    return galeria
}

const showElement = (i) =>{
    const galeriaDisplayElemento = document.querySelector("#galeriaDisplay");

    if(galeria[i]){
        galeriaDisplayElemento.style.display="flex";
        galeriaDisplayElemento.innerHTML = renderSlideShow(i, galeria[i], galeria)
        galeriaDisplayElemento.scrollIntoView();
        nextElementEvents(i)
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
    }
}

const loadGalleryEvents = (galeria) =>{
    for(let i = 0; i<galeria.length;i++){
        document.getElementById(i).onclick = () =>{
            showElement(i);
        }
    };
}

const nextElementEvents = (i) =>{
    document.getElementById("next").onclick = () =>{
        if(i !== galeria.length-1)
            showElement(i+1);
        else
            showElement(0);
        
    }
    
    document.getElementById("prev").onclick = () =>{
        if(i !== 0)
            showElement(i-1);
        else
            showElement(galeria.length-1);
    }

}

window.onload = async() =>{
    let i = 0;
    const data = await getData();
    galeria = loadData(data)
    const divGallery = document.querySelector("#galeria");
    divGallery.innerHTML = renderGallery(galeria)

    loadGalleryEvents(galeria)
    
}