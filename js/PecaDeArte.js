export default class PecaDeArte {

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