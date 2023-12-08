export default class ScrollRestoration {
    constructor(
        private tabId: string,
        private genreId: string
    ) { }

    visibleIds: number[] = [];
    key: string = this.tabId + '/' + this.genreId;

    saveScroll(index: number, isVisible: boolean, isTop: boolean) {
        if (isVisible) {
            if (isTop) {
                this.visibleIds.unshift(index);
            } else {
                this.visibleIds.push(index);
            }
        } else {
            this.visibleIds = this.visibleIds.filter(id => id !== index);
        }
        if (this.visibleIds.length) {
            sessionStorage.setItem(this.key, this.visibleIds[0].toString());
        }
    }

    getScrollIndex() {
        return sessionStorage.getItem(this.key);
    }

    rescroll() {
        const scrollIndex = this.getScrollIndex();
        if (scrollIndex) {
            const element = document.getElementById(scrollIndex);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return true;
            }
        }
        return false;
    }

    findScrollRoot(element: HTMLElement) {
        let parent = element.parentNode as HTMLElement;
        while (parent) {
            if (parent.scrollHeight > parent.clientHeight) {
                return parent;
            }
            parent = parent.parentNode as HTMLElement;
        }
    }
}