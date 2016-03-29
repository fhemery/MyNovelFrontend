angular.module('myNovel.service.chapters', ['restangular'])
.factory('chaptersService', function (Restangular) {
    return {
        create: create,
        getChapterDetails: getChapterDetails
    };

    function create(novelId, chapter){
        return Restangular.one('novel/', novelId)
        .one('chapter/').post('', {title: chapter.title, summary: chapter.summary});
    }

    function getChapterDetails(novelId, chapterId){
        return Restangular.one('novel/', novelId)
            .one('chapter/', chapterId).get();
    }
});
