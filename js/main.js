$(document).ready(function () {
    //Изменение в range для select
    $('input[type=range]').on('input', function(e){
        let val = e.target.value;

        $('.range__select').prop('selectedIndex', val);

        console.log();
        
        $('.select__range-date.active').text($('.range__select option:selected').html());
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
});

//Открыть модальное окно
function openModal(modal){
    $('*[data-modal="'+modal+'"]').addClass('active');
    $('.modal__background').addClass('active');
    $('body').addClass('offScroll');
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