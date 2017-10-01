window.onload = function () {
    var TIP_DOM = Utils.$('.tip')
    var CLOSE_BUTTON_DOM = Utils.$('.close-button')
    var BANNER_DOM = Utils.$('.banner')
    var COURSE_DOM = Utils.$('.course')
    var RANKING_DOM = Utils.$('.ranking-lists')


    Banner.init(BANNER_DOM)
    isTipNone()
    

    Utils.addEvent(CLOSE_BUTTON_DOM, 'click', handleCloseButton)


    Utils.ajax({
        type: 'get',
        url: Urls.hotcouresByCategory,
        success: function (response) {
            gethotRanking(response)
        },
        error: function (error) {
            alert('error' + error)
        }
    })
    Utils.ajax({
        type: 'get',
        url: Urls.couresByCategory,
        success: function (response) {
            getCourse(response)
        },
        error: function (error) {
            alert('error' + error)
        }
    })







    function handleCloseButton() {
        if (!isTip()) {
            console.log(document.cookie)
            document.cookie = "tip=true;"
            isTipNone()
        }
    }

    function isTipNone() {
        if (isTip()) {
            Utils.addClass(TIP_DOM, 'none')
        }
    }

    function isTip() {
        return document.cookie.replace(/(?:(?:^|.*;\s*)tip\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "true"
    }

    function getCourse(response) {
        var list = response.result.list
        var courseItemHtml = ''

        for (var i = 0; i < 20; i++) {
            courseItemHtml += '<li class="course-item">' +
                '<div class="course-picture"><img src="' + list[i].bigImgUrl + '"alt="' + list[i].productName + '"></div>' +
                '<p class="course-des">' + list[i].productName + '</p>' +
                '<p class="course-tag">' + list[i].provider + '</p>' +
                '<p class="course-count"><span><i class="iconfont icon-man"></i>' + list[i].learnerCount + '</span></p>' +
                '<p class="course-pirce">￥' + list[i].originalPrice + '</p></li>'
        }
        COURSE_DOM.innerHTML = courseItemHtml
    }


    function gethotRanking(response) {
        var rankdingItemHtml = ''
        for (var i = 0; i < 10; i++) {
            rankdingItemHtml += '<li class="ranking-item">' +
                '<img  class="ranking-image" src="' + response[i].smallPhotoUrl + '" alt="' + response[i].name + '">' +
                '<div class="ranking-enter">' +
                '<p class="ranking-title"><a href="javascript:void(0)">' + response[i].name + '</a></p> ' +
                '<p class="ranking-count"><i class="iconfont icon-man"></i>' + response[i].learnerCount + '</p></div></li>'
        }
        RANKING_DOM.innerHTML = rankdingItemHtml
    }
}