export default class PeaceOfArt {

    #data;
    constructor(data) {
        this.#data = data;
    }

    get type() {
        return this.#data.type;
    }

    get title() {
        return this.#data.title;
    }

    get medium() {
        return this.#data.medium;
    }

    get content() {
        return this.#data.content;
    }

    get artist() {
        return this.#data.artist;
    }

    get music() {
        return this.#data.music;
    }

}