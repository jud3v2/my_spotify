class history { 
    constructor() {
        if (!localStorage.getItem('history')) {
            localStorage.setItem('history', JSON.stringify([]));
        }
        this.history = JSON.parse(localStorage.getItem('history')) || [];
    }

    addHistory(history) {
        const index = this.history.findIndex(item => item.id === history.id && item.album_id === history.album_id);
        if (index > -1) {
            this.history.splice(index, 1);
        }
        this.history.push(history);
    }

    getHistory() {
        return this.history.slice().reverse();
    }

    clearHistory() {
        this.history = [];
        this.save();
    }

    save() {
        localStorage.setItem('history', JSON.stringify(this.history));
    }

    removeHistory(index) {
        this.history.splice(index, 1);
    }
}

export default new history();