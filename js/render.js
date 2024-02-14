const renderSlideShow = (i,item) =>{
    let render =  ` 
        <button id='close'>close</button>`;
    if(item.type === "painting"){
        render +=  `
            <div class="room">
                <div class="diagonal-line top-left-line"></div>
                <div class="diagonal-line top-right-line"></div>
                <div class="diagonal-line bottom-left-line"></div>
                <div class="diagonal-line bottom-right-line"></div>

                <div class="wall">
        
                    <a class="prev seta" id="prev">&#10094;</a>`

        render += renderPaintingElement(i,item, "display")
            
        render +=  `
                    <a class="next seta" id="next">&#10095;</a>

                </div>
                ${renderElementDescription(item)}
            </div>
            `
            return render
    } else if (item.type === "sculpture"){
        render +=  `
            <div class="room">
                <div class="diagonal-line top-left-line"></div>
                <div class="diagonal-line top-right-line"></div>
                <div class="diagonal-line bottom-left-line"></div>
                <div class="diagonal-line bottom-right-line"></div>

                <div class="wall">
        
                    <a class="prev seta" id="prev">&#10094;</a>`

        render += renderSculptureElement(i,item, "display")
            
        render +=  `
                    <a class="next seta" id="next">&#10095;</a>

                </div>
                ${renderElementDescription(item)}
            </div>
            `
            return render
    }

    render += `
            <div class="room">
                <div class="diagonal-line top-left-line"></div>
                <div class="diagonal-line top-right-line"></div>
                <div class="diagonal-line bottom-left-line"></div>
                <div class="diagonal-line bottom-right-line"></div>

                <div class="wall">
                    <a class="prev seta" id="prev">&#10094;</a>

                    <img src="content/images/pause.png" class="icon" id="time"></img>
                    <audio src="${item.music}" id="audio"></audio>
                    <img src="content/images/mute.png" class="icon" id="sound"></img>

                    <a class="next seta" id="next">&#10095;</a>

                </div>
                ${renderElementDescription(item)}
            </div>
`
    return render

}

const renderSculptureElement = (i,item, id="") =>{
    return `<div class="galeriaElemento" id="${i}">
                <img src="${item.content}">
            </div>
            `
}

const renderPaintingElement = (i,item, id="") =>{
    return `<div class="galeriaElemento" id="${i}">
                <figure id="${id}">
                    <div class="outerBevel">
                        <div class="flatSurface">
                            <div class="innerBevel">
                                <img src="${item.content}">
                            </div>
                        </div>
                    </div>
                </figure>
            </div>
            `
}

const renderElementDescription = (item) =>{
    return `<div class="galleryElementDescription">
                <ul>
                    <li>Tipo: ${item.type}</li>
                    <li>Titulo: ${item.title}</li>
                    <li>Medium: ${item.medium}</li>
                    <li>Artist: ${item.artist}</li>
                </ul>
            </div>
            `
}

const renderRowElement = (part) =>{
    if(part === 1)
        return `<div class="galeriaRow">`
    
    return `</div>`
}

const renderGallery = (galeria) =>{
    let content = ""
    let i = 0

    console.log(galeria)
    
    galeria.forEach(item => {
        if (i % 3 === 0) {
            content += renderRowElement(1)
        }

        content += renderPaintingElement(i,item)

        if ((i + 1) % 3 === 0 || i === (galeria.length-1)) {
            content += renderRowElement(2)
        }

        i++

    });

    return content
}
