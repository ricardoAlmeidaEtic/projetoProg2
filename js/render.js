const renderSlideShow = (i,item, galeria) =>{
    let render = ""

    render =  `
        <div class="room">
            <div class="diagonal-line top-left-line"></div>
            <div class="diagonal-line top-right-line"></div>
            <div class="diagonal-line bottom-left-line"></div>
            <div class="diagonal-line bottom-right-line"></div>

            <div class="wall">
    
            <a class="prev seta" id="prev">&#10094;</a>`

    render += renderElement(i,item, "display")
    
        render +=  `
            <a class="next seta" id="next">&#10095;</a>

            </div>
            ${renderElementDescription(item)}
        </div>
        `

    return render
}

const renderElement = (i,item, id="") =>{
    return `<div class="galeriaElemento" id="${i}">
                <figure id="${id}">
                    <div class="outerBevel">
                        <div class="flatSurface">
                            <div class="innerBevel">
                                <img src="${item.getImage()}">
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
                    <li>Tipo: ${item.getType()}</li>
                    <li>Titulo: ${item.getTitle()}</li>
                    <li>Medium: ${item.getMedium()}</li>
                    <li>Artist: ${item.getArtist()}</li>
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

    return content
}
