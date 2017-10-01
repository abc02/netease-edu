var Banner = (function(){



    function Silder(parentNode){
        this.parentNode = parentNode
        this.bannerLists =  parentNode.children[0].children
        this.bannerLenght = parentNode.children[0].children.length
        this.bullets =  parentNode.children[1].children
        this.curIndex = 0
        this.timer
        this.autoPlay()
        this.bindEvent()
    }
    Silder.prototype = {
        play: function(curIndex){
            for(var i = 0; i < this.bannerLenght; i++){
                Utils.removeClass(this.bannerLists[i], 'action')
                Utils.removeClass(this.bullets[i], 'action')
            }
            Utils.addClass(this.bannerLists[this.curIndex], 'action')
            Utils.addClass(this.bullets[this.curIndex], 'action')
            
            
            this.curIndex += curIndex

            if(this.curIndex > this.bannerLenght - 1){
                this.curIndex = 0
            }
        },
        bindEvent: function(){
            Utils.addEvent(this.parentNode.children[0], 'mouseover', this.stopPlay.bind(this))
            Utils.addEvent(this.parentNode.children[0], 'mouseout', this.autoPlay.bind(this))
            
        },
        autoPlay: function() {
            this.timer = setInterval(function(){
                this.play(1)
            }.bind(this),5000)
        },
        stopPlay: function(){
            clearInterval(this.timer)
        }
    }








    function init(parentNode){
        new Silder(parentNode)
    }

    return {
        init:init
    }
})()