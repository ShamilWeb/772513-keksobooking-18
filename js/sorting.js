'use strict';

(function () {

  var getRank = function (advert) {
    var rank = 0;

    if (advert.offer.type === window.selectedTypeHous) {
      rank += 1;
    }

    return rank;
  };

  window.sorting = function (arry) {
    var sortArry = arry.slice().sort(function (right, left) {
      var rankDiff = getRank(left) - getRank(right);
      return rankDiff;
    });

    return sortArry;
  };


})();
