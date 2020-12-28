class VNode {
    /**
     * 
     * @param {String} tag 
     * @param {Object} data 
     * @param {Array} children 
     * @param {*} text 
     * @param {*} elm 
     */
    constructor (tag, data, children, text, elm) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
    }
}

function render() {
    return new VNode(
        'span',
        {
            //指令集合数组
            directives: [
                {
                    //v-show
                    rawName: 'v-show',
                    expression: 'isShow',
                    name: 'show',
                    value: true
                }
            ],
            //静态class
            staticClass: 'demo',
        },
        
    )
}