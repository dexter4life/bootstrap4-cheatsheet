var card_collapse = 0;

$(document).ready(function(){
    initCardCollapse();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    if($('.twitter-sharrre-nav').length != 0){
        $('.twitter-sharrre-nav').sharrre({
          share: {
            twitter: true
          },
          enableHover: false,
          enableTracking: true,
          enableCounter: false,
          buttons: { twitter: {via: 'CreativeTim'}},
          click: function(api, options){
            api.simulateClick();
            api.openPopup('twitter');
          },
          template: '<i class="fa fa-twitter"></i><p class="hidden-lg-up">Twitter</p>',
          url: 'http://demos.creative-tim.com/now-ui-kit/index.html'
        });
    }

    if($('.facebook-sharrre-nav').length != 0){
        $('.facebook-sharrre-nav').sharrre({
          share: {
            facebook: true
          },
          enableHover: false,
          enableTracking: true,
          enableCounter: false,
          click: function(api, options){
            api.simulateClick();
            api.openPopup('facebook');
          },
          template: '<i class="fa fa-facebook-square"></i><p class="hidden-lg-up">Facebook</p>',
          url: 'http://demos.creative-tim.com/now-ui-kit/index.html'
        });
    }

    if($('.linkedin-sharrre-nav').length != 0){
        $('.linkedin-sharrre-nav').sharrre({
          share: {
            linkedin: true
          },
          enableCounter: false,
          enableHover: false,
          enableTracking: true,
          click: function(api, options){
            api.simulateClick();
            api.openPopup('linkedin');
          },
          template: '<i class="fa fa-linkedin"></i><p class="hidden-lg-up">LinkedIn</p>',
          url: 'http://demos.creative-tim.com/now-ui-kit/index.html'
        });
    }

    var $input = $('.main .brand').find("#filter");
    $input.jcOnPageFilter({
        animateHideNShow: true,
        focusOnLoad: false,
        highlightColor: "yellow",
        textColorForHighlights: "#000000",
        caseSensitive: false,
        hideNegatives: false,
        childBlockClass: "jcorgFilterTextChild"
    });

    card_collapse = $('.card-collapse');
    SetCard(card_collapse);
});

$(document).on('click', '#expand-all', function(){
    $(this).html('Collapse-all');
    $(this).attr('id', 'collapse-all').attr('class', 'btn btn-info');

    $('.card-collapse').addClass('active');
    $('.card-collapse .card-header').siblings('.collapse').addClass('show');
});

$(document).on('click', '#collapse-all', function(){
    $(this).html('Expand-all');
    $(this).attr('id', 'expand-all').attr('class', 'btn btn-default');

    if($('.card-collapse.active').length != 0){
        $('.card-collapse').removeClass('active');
        $('.card-collapse .card-header').siblings('.collapse').removeClass('show');
    }
});

$(document).on('click', '#new', function(){
    if($('.card-collapse.active').length == 0){
        $('.card-collapse').addClass('active');
        $('.card-collapse .card-header').siblings('.collapse').addClass('show');
    }

    $('body').toggleClass('show-highlight');

    if($('body').hasClass('show-highlight')){
        $(this).attr('class', 'btn btn-info');
    } else{
        $(this).attr('class', 'btn btn-default');
    }


    $('#expand-all').html('collapse-all').attr('id', 'collapse-all').attr('class', 'btn btn-info');
});

$(document).on('click', '#close', function(){
    $(this).parent().removeClass('open');
});

$(document).on('click', '.card-block li > a', function(){
    $html_container = $(this).siblings('.html-code');

        var html_code = $html_container.html();
        console.log('intru in if')
        // $('.editor-preview #editor').html(html_code);

        $('.container-editor').addClass('open');

        editor = ace.edit("editor");
        editor.setTheme("ace/theme/twilight");
        editor.session.setMode("ace/mode/html");

        editor.setValue(html_code);

        function showHTML() {
           $('#return').html(editor.getValue());
           console.log('intru in functie');
        }

        editor.on("input", showHTML);
        showHTML();
});




$("#filter").keyup(function(){
    $('.card-collapse').removeClass('active');
    $('.collapse').removeClass('show');
    $('.card-collapse').removeClass('hidden');
    setTimeout(function(){
        if($('.jcorgFilterTextChild').children('span').length != 0){
            $('.jcorgFilterTextChild').each(function(){
                if($(this).children('span').length != 0) {
                    $(this).children('span').closest('.card-collapse').removeClass('hidden');
                    $(this).children('span').closest('.card-collapse').addClass('active');
                    $(this).children('span').closest('.card-header').siblings('.collapse').addClass('show');
                    $(this).children('span').closest('.card-block').closest('.collapse').addClass('show');
                } else {
                    $(this).closest('.card-collapse').addClass('hidden');
                }
            });
            SetCard($('.card-collapse.active'));
        }else{
            SetCard(card_collapse);
        }
    }, 100);
});


function SetCard(cards){
    $('.card-collapse.active').remove();
    console.log(cards);

    var nr = 1;

    cards.each(function(){
        if(nr == 1){
            $('#col1').append($(this));
            console.log('intra pe 1');
            nr = 2;
        } else if(nr == 2){
            $('#col2').append($(this));
            console.log('intra pe 2');
            nr = 3;
        } else if(nr == 3){
            $('#col3').append($(this));
            console.log('intra pe 3');
            nr = 4;
        } else if(nr == 4){
            $('#col4').append($(this));
            console.log('intra pe 4');
            nr = 1;
        }
    });

    initCardCollapse();
}

function initCardCollapse(){
    $('.card.card-collapse').find('.collapse.show').each(function(){
        $(this).parent().addClass('active');
    });

    $('.card.card-collapse').on('click', function(){
        $(this).addClass('active');
    }).on('hidden.bs.collapse', function(){
        $(this).removeClass('active');
    });
}
