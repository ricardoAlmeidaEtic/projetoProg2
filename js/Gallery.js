import Music from "./Music.js";
import Painting from "./Painting.js";
import Sculpture from "./Sculpture.js";

export default class Gallery {

    name
    peacesOfArt = []
    
    constructor(data){
        this.name = data.name
    }

    add(peaceOfArt){
        let nextPeace = null;
        switch (peaceOfArt.type) {
            case "music":
                nextPeace = new Music(peaceOfArt);
                break;
            case "paiting":
                nextPeace = new Painting(peaceOfArt);
                break;
            case "sculpture":
                nextPeace = new Sculpture(peaceOfArt);
                break;
            default:
                break;
        }
        this.peacesOfArt.push(nextPeace);
    }

    set peacesOfArt(peacesOfArt){
        this.peacesOfArt = peacesOfArt
    }

    set name(name){
        this.name = name
    }

    get peacesOfArt(){
        return this.peacesOfArt
    }

    get name(){
        return this.name
    }
       
}