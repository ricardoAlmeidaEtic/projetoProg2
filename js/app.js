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
    if(galeria[i]){
        galeriaDisplayElemento.innerHTML = renderSlideShow(i, galeria[i])
        galeriaDisplayElemento.scrollIntoView();
        /* Store the element in el */
        let el = document.getElementById('display')
        
        /* Get the height and width of the element */
        const height = el.clientHeight
        const width = el.clientWidth

        /*
        * Add a listener for mousemove event
        * Which will trigger function 'handleMove'
        * On mousemove
        */
        el.addEventListener('mousemove', handleMove)

        /* Define function a */
        function handleMove(e) {
        /*
            * Get position of mouse cursor
            * With respect to the element
            * On mouseover
            */
        /* Store the x position */
        const xVal = e.layerX
        /* Store the y position */
        const yVal = e.layerY
        
        /*
            * Calculate rotation valuee along the Y-axis
            * Here the multiplier 20 is to
            * Control the rotation
            * You can change the value and see the results
            */
        const yRotation = 20 * ((xVal - width / 2) / width)
        
        /* Calculate the rotation along the X-axis */
        const xRotation = -20 * ((yVal - height / 2) / height)
        
        /* Generate string for CSS transform property */
        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
        
        /* Apply the calculated transformation */
        el.style.transform = string
        }

        /* Add listener for mouseout event, remove the rotation */
        el.addEventListener('mouseout', function() {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
        })

        /* Add listener for mousedown event, to simulate click */
        el.addEventListener('mousedown', function() {
        el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
        })

        /* Add listener for mouseup, simulate release of mouse click */
        el.addEventListener('mouseup', function() {
        el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
        })
    }
}

const renderSlideShow = (i,item) =>{
    let classe = ""

    if(i === 0)
        classe="right"
    if(i === galeria.length-1)
        classe="left"

    render =  `
        <div class="room">
            <div class="diagonal-line top-left-line"></div>
            <div class="diagonal-line top-right-line"></div>
            <div class="diagonal-line bottom-left-line"></div>
            <div class="diagonal-line bottom-right-line"></div>
            <div class="wall ${classe}">`
    if(galeria[i-1])
        render +=
            `<a class="prev seta" onclick="showElement(${i-1})">&#10094;</a>`

    render += renderElement(i,item, "display")
    
    if(galeria[i+1])
        render +=  `
            <a class="next seta" onclick="showElement(${i+1})">&#10095;</a></div>`
    
    render +=  `
            </div>
        </div>
    `

    return render
}

const renderElement = (i,item, id="") =>{
    return `<div class="galeriaElemento" onclick="showElement(${i})">
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