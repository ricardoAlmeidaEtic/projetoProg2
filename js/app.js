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

window.onload = async() =>{
    let i = 0;
    const data = await getData();
    const galeria = loadData(data)
    const body = document.querySelector("#galeria");
    let content = ""

    galeria.forEach(item => {
        if (i % 3 === 0) {
            content += `<div class="galeriaRow">`
        }

        content += `<div class="galeriaElemento" id="${i}">`
        //content += item.getType()
        //content += item.getTitle()
        //content += item.getMedium()
        content += `<figure>
                        <div class="outerBevel">
                            <div class="flatSurface">
                                <div class="innerBevel">
                                    <img src="${item.getImage()}">`
        //content += item.getArtist()
        content += `                </div>
                                </div>
                            </div>
                        </div>
                    </figure>`

        if ((i + 1) % 3 === 0 || i === (galeria.length-1)) {
            content += `</div>`
        }
        
        body.innerHTML += content
        const id = document.querySelector(i)

        id.onclick = () =>{
            document.querySelector("#galeriaDisplayElemento").innerHTML += `
                <figure>
                    <div class="outerBevel">
                        <div class="flatSurface">
                            <div class="innerBevel">
                                <img src="${galeria[i].getImage()}">
                            </div>
                        </div>
                    </div>
                </figure>`
        }

        i++
    });

}