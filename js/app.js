class PecaDeArte {

    type
    title
    medium
    image
    artist
    
    constructor(data){
        this.type = data.type
        this.title = data.title
        this.medium = data.medium
        this.image = data.image
        this.artist = data.artist
    }

    getType(){
        return this.type
    }

    getTitle(){
        return this.title
    }

    getMedium(){
        return this.medium
    }

    getImage(){
        return this.image
    }

    getArtist(){
        return this.artist
    }
       
}

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
    if(galeria[i])
        galeriaDisplayElemento.innerHTML = renderSlideShow(i, galeria[i])
        galeriaDisplayElemento.scrollIntoView();
}

const renderSlideShow = (i,item) =>{
    return `
        <div class="scene">
            <div class="cube">
                <div class="cube__face cube__face--front">front</div>
                <div class="cube__face cube__face--back">back</div>
                <div class="cube__face cube__face--right">right</div>
                <div class="cube__face cube__face--left">left</div>
                <div class="cube__face cube__face--top">top</div>
                <div class="cube__face cube__face--bottom">bottom</div>
                
                <a class="prev seta" onclick="showElement(${i-1})">&#10094;</a>
                    ${renderElement(i,item)}
                <a class="next seta" onclick="showElement(${i+1})">&#10095;</a>
            </div>
        </div>
    `
}

const renderElement = (i,item) =>{
    return `<div class="galeriaElemento" onclick="showElement(${i})">
                <figure>
                    <div class="outerBevel">
                        <div class="flatSurface">
                            <div class="innerBevel">
                                <img src="${item.getImage()}">
                            </div>
                        </div>
                    </div>
                </figure>
                <h1>${item.getType()}</h1>
                <h1>${item.getTitle()}</h1>
                <h1>${item.getMedium()}</h1>
                <h1>${item.getArtist()}</h1>
            </div>
            `
}

const renderRowElement = (part) =>{
    if(part === 1)
        return `<div class="galeriaRow">`
    
    return `</div>`
}

window.onload = async() =>{
    let i = 0;
    const data = await getData();
    galeria = loadData(data)
    const body = document.querySelector("#galeria");
    let content = ""

    galeria.forEach(item => {
        if (i % 3 === 0) {
            content += renderRowElement(1)
        }

        content += renderElement(i,item)

        if ((i + 1) % 3 === 0 || i === (galeria.length-1)) {
            content += renderRowElement(2)
        }

        i++

    });

    body.innerHTML += content
}