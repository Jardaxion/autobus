$(document).ready(function () {
    //Изменение в range для select
    $('input[type=range]').on('input', function(e){
        let val = e.target.value;

        $('.range__select').prop('selectedIndex', val);
        
        $('.select__range-date.active').text($('.range__select option:selected').html());
    });

    //Изменение input при наличии текста
    $('input').each(function(e){
        if($(this).val() != ''){
            $(this).addClass('active');
        } else{
            $(this).removeClass('active');
        }
    })
    

    $('input').change(function (e) { 
        e.preventDefault();
        
        if(e.target.value != ''){
            $(this).addClass('active');
        } else{
            $(this).removeClass('active');
        }
    });

    //Кнопка замены левого select на правый
    $('.select__reverseButton').click(function (e) { 
        e.preventDefault();

        let left = $('.select__label:first-of-type .select_body .select p:first-of-type')
            right = $('.select__label:last-of-type .select_body .select p:first-of-type')
            rightValue = right.html()
            leftValue = left.html();
        
        $('.select__label:first-of-type .select_body .option').each(function(){
            if(!$(this).html().indexOf(rightValue)){
                $('.select__label:first-of-type .select_body select').prop('selectedIndex', $(this).attr('class').replace('option ', '').replace(/[^\d]/g, ''))
            }
        })
        $('.select__label:last-of-type .select_body .option').each(function(){
            if(!$(this).html().indexOf(leftValue)){
                $('.select__label:last-of-type .select_body select').prop('selectedIndex', $(this).attr('class').replace('option ', '').replace(/[^\d]/g, ''))
            }
        })
        left.html(rightValue)
        right.html(leftValue)
    });

    //Открывающий список
    $('.questions__question').click(function (e) { 
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).children('.question__content').slideToggle();
    });
    //Модальное окно
    //Открытие 
    $('.js-openModal').click(function(e){
        e.preventDefault();
        openModal($(this).data('openmodal'));
    });
    //Закрытие на кнопку
    $('.js-closeModal').click(function(e)
    {
        e.preventDefault();
        closeModal($(this).data('closemodal'));
    });
    //Закрытие одного модального окна и открытие другого
    $('.js-reOpenModal').click(function(e){
        e.preventDefault();
        closeOpenModal($(this).data('closemodal'), $(this).data('openmodal'));
    })
    //Закрытие по клику по заднему фону
    $(document).click(function(e){
        if($(e.target).is($('.modal.active'))){
            closeAllModal();
        }
    });

    template();
    setInterval(function(){
        template();
        templateActive();
        if($('.profile__page[data-page="tickets"]').hasClass('active')){
            $('.profile__page[data-page="tickets"]').css({
                'padding': '40px 0 0 0',
                'background': '#52598B'
            })
        }
    }, 100);

    //Автоширина импровизированной таблицы
    //В показе купленных билетов
    $('.profile__tickets-item').width($('.profile__page').width() / $('.profile__tickets-item').length);
    $('.profile__ticket-item').width($('.profile__page').width() / $('.profile__tickets-item').length);
    //В продаваемых билетах
    $('.races__top-item').each(function(){
        if($(this).hasClass('big')){
            width = ($('.races__top').width() / $('.races__top-item').length) + (20 * ($('.races__top-item').length - 1));
        } else {
            width = ($('.races__top').width() / $('.races__top-item').length) - 20;
        }

        $(this).width(width);
    })
    $('.races__race-item').each(function(){
        if($(this).hasClass('big')){
            width = ($('.races__top').width() / $('.races__top-item').length) + (20 * ($('.races__top-item').length - 1));
        } else {
            width = ($('.races__top').width() / $('.races__top-item').length) - 20;
        }

        $(this).width(width);
    })

    //Переключение страниц в профиле
    $('.js-select-profilePage').click(function (e) { 
        e.preventDefault();

        if(!$(this).hasClass('active')){
            let data = $(this).data('select-page');

            $('.profile__page.active').removeClass('active');
            $('.profile__page[data-page='+data+']').addClass('active');

            $('.js-select-profilePage.active').removeClass('active');
            $('.profile__link[data-select-page='+data+']').addClass('active');

            if(data == 'templateEdit'){
                $('.profile__link[data-select-page="template"').addClass('active');
            };

            setInterval(function(){
                if(data == 'templateEdit'){
                    $('.profile__link[data-select-page="template"').addClass('active');
                };
            }, 1000);
        };
    });

    $('.js-open-mobilePage').click(function(e){
        e.preventDefault();

        if(!$(this).hasClass('acitve')){
            let data = $(this).data('selectMobilepage');

            $('.profileMobile__page-page.active').removeClass('active');
            $('.profileMobile__page-page[data-mobilePage='+data+']').addClass('active');

            $('.js-open-mobilePage.active').removeClass('active');
            $('.profileMobile__page-title[data-select-mobilePage='+data+']').addClass('active');
        }
    })
    //Если переключатель внутри самой страницы и нужно оставить активным ссылку сверху
    $('.js-select_inner-mobileProfilePage').click(function (e) { 
        e.preventDefault();
        
        let data = $(this).data('selectMobilepage');

        $('.profileMobile__page-page.active').removeClass('active');
        $('.profileMobile__page-page[data-mobilePage='+data+']').addClass('active');
    });

    $('.js-select_inner-profilePage').click(function (e) { 
        e.preventDefault();
        
        let data = $(this).data('select-page');

        $('.profile__page.active').removeClass('active');
        $('.profile__page[data-page='+data+']').addClass('active');
    });

    //Появление изчезание текста с отсутствием билетов
    if($('.profile__ticket').length === 0){
        $('.noTicket').show();
        $('.profile__tickets').hide();
    } else{
        $('.noTicket').hide();
        $('.profile__tickets').show();
    }

    //Появление изчезание текста с отсутствием билетов
    if($('.profileMobile__page-ticket').length === 0){
        $('.profileMobile__page-noTickets').show();
        $('.profileMobile__page-tickets').hide();
    } else{
        $('.profileMobile__page-noTickets').hide();
        $('.profileMobile__page-tickets').show();
    }

    //Progress бар в input range
    $('input[type=range]').on('input', function(e){
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;
        
        $(e.target).css({
          'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
        });
      }).trigger('input');

    //Бокове мобильное меню
    //Открытие
    $('.header__hamburger-button').click(function (e) { 
        e.preventDefault();
        
        $('.modal__background').addClass('active');
        $('.header__burger').addClass('active');
        $('body').addClass('offScroll');
    });

    //Закрытие
    $('.header__burger-close').click(function (e) { 
        e.preventDefault();
        
        $('.header__burger').removeClass('active');
        $('.modal__background').removeClass('active');
        $('body').removeClass('offScroll');
    });
});

//Открыть модальное окно
function openModal(modal){
    $('*[data-modal="'+modal+'"]').addClass('active');
    $('.modal__background').addClass('active');
    $('body').addClass('offScroll');
    $('.header__burger').removeClass('active');
}
//Закрыть
function closeModal(modal){
    $('*[data-modal="'+modal+'"]').removeClass('active');
    $('.modal__background').removeClass('active');
    $('body').removeClass('offScroll');
}
//Открыть и закрыть
function closeOpenModal(closeModal, openModal){
    //Закрытие предущего
    $('*[data-modal="'+closeModal+'"]').removeClass('active');
    //Открытие нынешнего
    $('*[data-modal="'+openModal+'"]').addClass('active');
}
//Закрыть все модальные окна
function closeAllModal(){
    $('.modal').removeClass('active');
    $('.modal__background').removeClass('active');
    $('body').removeClass('offScroll');
}

//Проверка на существование шаблонов
function template(){
    if($('.profile__page-template').length === 0){
        $('.js-select-profilePage[data-select-page="template"]').data('select-page', 'templateEdit');
        $('a.profile__page-cancel.js-select_inner-profilePage[data-select-page="template"]').addClass('inactive');
    } else {
        $('.js-select-profilePage[data-select-page="template"]').data('select-page', 'template');
        $('a.profile__page-cancel.js-select_inner-profilePage[data-select-page="template"]').removeClass('inactive');
    }
}
//Проверка на существование шаблона, когда пользователь находится на странице с шаблонами
function templateActive(){
    if($('.profile__page[data-page="template"]').hasClass('active') && $('.profile__page-template').length === 0){
        $('.profile__page[data-page="template"]').removeClass('active');
        $('.profile__page[data-page="templateEdit"]').addClass('active');
        $('a.profile__page-cancel.js-select_inner-profilePage[data-select-page="template"]').addClass('inactive');
    }
}