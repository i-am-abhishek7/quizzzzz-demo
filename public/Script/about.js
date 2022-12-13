
 window.console = window.console || function(t) {};
 if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
  }
 let menu = $('.menu li');
menu.on('click', function () {

  let click_li = $(this);

  if (click_li.is('.selected')) {
    return;
  }

  click_li.addClass('selected');
  click_li.siblings('li').removeClass('selected');
  showContent(click_li);
});


function showContent(selected) {
  let content = $('section'),
  nonActualCard = content.find('.show-card');

  let nameCard = selected.attr('data-card'),
  nameCardId = '#' + nameCard,
  actualCard = content.find(nameCardId),
  boxArea = $('#box_area');

  nonActualCard.addClass('hide-card').delay(1000).queue(function () {
    actualCard.addClass('show-card');
    actualCard.siblings().removeClass('show-card').removeClass('hide-card').dequeue();

  });



  boxArea.removeClass().addClass(nameCard + '-bg');

}

    