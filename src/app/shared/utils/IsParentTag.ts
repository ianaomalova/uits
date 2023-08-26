export const IsParentTag = (nativeElement: HTMLElement, parentTag: string): boolean => {
    let parentIsTag = false
    let parent = nativeElement.parentElement
    let findLen = 3, lowerName = ''
    while (findLen) {
        lowerName = parent.localName.toLowerCase()
        if (lowerName.indexOf('el') > -1) {
            parentIsTag = lowerName === parentTag
            findLen = 0
        } else {
            parent = parent.parentElement
            findLen --
        }
    }
    return parentIsTag
}