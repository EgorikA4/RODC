let $button = $('button[type="submit"]');

$button.on('click', function() {
	var $this = $(this);
	if($this.hasClass('active') || $this.hasClass('success')) {
		return false;
	}
	$this.addClass('active');
	setTimeout(()=> {
		$this.addClass('loader');
	}, 125);
	setTimeout(()=> {
		$this.removeClass('loader active');
		$this.text('Успешно');
		$this.addClass('success');
	}, 1600);
	setTimeout(()=> {
		$this.text('Сохранить');
		$this.removeClass('success');
		$this.blur();
	}, 2900);
});
