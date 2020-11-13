'use strict';

class PriorityQueue {
    #container = [];

    enter(element, priority = 0) {
        let obj = {
            element,
            priority
        };
        if (priority === 0) {
            this.#container.push(obj);
            return
        }
        for (let i = this.#container.length - 1; i >= 0; i -= 1) {
            if (this.#container[i].priority >= priority) {
                this.#container.splice(i + 1, 0, obj);
                return;
            }
        }
        this.#container.unshift(obj)
    }

    leave() {
        if (this.#container.length === 0) return;
        return this.#container.shift().element;
    }

    size() {
        return this.#container.length;
    }
}

module.exports = PriorityQueue;