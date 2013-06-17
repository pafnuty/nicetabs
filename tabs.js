jQuery(document).ready(function($) {
	/*! Скрипт табов с поддержкой события, поддержкой перехода к табу по хешу в адресе, по "ссылке" на странице и возможностью отключения таба (с блекджеком и девками).
	 * Версия	:	1.0 (17.06.2013)
	 * Автор плагина	:	Dimox (dimox.name) 
	 * Автор доработок	:	ПафНутиЙ (pafnuty.name)
	*/

	// $('body').on('click') - работает немного быстрее и подцепит новый блок с табами если что.
	// Используется класс tab-section т.к. в битриксе класс section используется системой, дибилизм, но уж так случилось.
	
	// Функция для скролла страницы к нужному id (её можно юзать не только в табах :))
	function tabScroll (tab) {
		$("html, body").animate({scrollTop:$('#'+tab).offset().top-50}, 500);
	}
	// Собственно сам скрипт с пояснениями
	$('body').on('click', '.tabs li:not(.current):not(.disabled)', function(callback) {
		// Обрабатываем клик
		thisTab = $(this);                 // Определяем переменную текущего таба
		thisTab
		.addClass('current')               // добавляем класс текущему табу
		.siblings().removeClass('current') // Удаляем класс у остальных табов в блоке
		.parents('.tab-section')           // Находим родительский блок
		.find('.box').eq(thisTab.index())  // Находим нужный нам блок
		.fadeIn(150, function () {         // Показываем его 
			thisTab.trigger('tabClick');   // и генерируем событие tabClick
		})
		.siblings('.box').hide();          // Прячим остальные блоки с контентом
	});
	
	// Смотрим за адресной строкой
	tabIndex = window.location.hash.replace('#',''); 
	if ($('.tabs li[id="'+tabIndex+'"]').length > 0) {
		// Если id элемента <li> таба совпадает с тем, что написано в строке - эмулируем клик по этому элементу
		// .trigger('click') используется вместо .click() т.к. имеет более широкие возможности, но на ~2% медленнее работает.
		$('.tabs li[id="'+tabIndex+'"]').trigger('click');
		// Ну и запускаем скролл к табу, для красоты
		tabScroll(tabIndex);
	}

	// Отслеживаем нажатие на "кнопку" вызова нужного таба на странице
	$('body').on('click', '[data-tab-target]', function() {
		// Ищем на странице id и "кликаем" по нему
		$('li[id="'+$(this).data('tabTarget')+'"]').trigger('click');
		// Прокручиваем страницу чуть выше положения цели
		tabScroll($(this).data('tabTarget'));				 
		return false;
	});

});