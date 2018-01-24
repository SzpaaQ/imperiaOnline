/*
IMPERIA SCRIPT
V2.1
*/

var limit	 					= 4;var minLevel = 8;var maxLevel = 10;var SQ_sendAll= true;var SQ_page = 1;var SQ_onlyHorses = true;var SQ_formation				= 'flanks-flank-archers';var SQ_attackWorking 			= false;var SQ_Interval					= false;var SQ_btns 					= [];var SQ_barbes					= [];var SQ_temp 					= 99999999;
var SQ_openBarbes 				= function(){ if($('SQ_START').hasClass('start') || limit - 1 < parseInt($('.mission-my').find('.m-count').html()) || ($('.mission-my').length > 0 && SQ_sendAll == true)) return;clearInterval(SQ_Interval); $('.ui-fast-attack-barb')[0].click(); SQ_Interval = setInterval(SQ_openPage,2000);}
var SQ_getBarbeLevel 			= function(e){return parseInt($(e).find('.gp-flags').html());}
var SQ_nextPage					= function(){if(SQ_page == 4){SQ_closeAll(); setTimeout(SQ_openBarbes, 2000);SQ_page=1;return}SQ_page++;$('.pager-nums').find('a[title='+SQ_page+']')[0].click();}
var SQ_closeAll 				= function(){setTimeout(function(){	$.each($('.window-title').find('a.close'), function(){$(this)[0].click()});},2000);}
var SQ_openPage					= function(){if(!$('.pager-nums').length) return;$('.pager-nums').find('a[title='+SQ_page+']')[0].click();clearInterval(SQ_Interval);SQ_Interval = setInterval(SQ_chooseBarbe,2000);}
var SQ_chooseBarbe 				= function(){var myMissions = ($('.mission-my').find('.m-count').length) ? parseInt($('.mission-my').find('.m-count').html()) : 0;if(limit < myMissions) return;clearInterval(SQ_Interval);var cards = $('.barb-card');var ll = cards.length;	for(var i = 0; i<9;i++){SQ_temp = 'b_'+cards.eq(i).find('.barb-card-name').html().replace(/\D/g,'');if(SQ_barbes[SQ_temp]==true) continue;SQ_level = SQ_getBarbeLevel(cards.eq(i));if(SQ_level < minLevel) continue;if(SQ_level > maxLevel){SQ_page--;return SQ_openPage();}SQ_barbes[SQ_temp] = true;cards.eq(i).find('.barb-card-buttons').find('a')[1].click();SQ_Interval= setInterval(SQ_setArmy, 2000);return true;}SQ_page++;return SQ_openPage();SQ_Interval = setInterval(SQ_chooseBarbe,2000);}
var SQ_setArmy 					= function(){if(!$("#army_K2").length) return;clearInterval(SQ_Interval);var kuc = 2000;var miecz = 0;var luk = 0;if(SQ_level == 2)kuc = 2000;if(SQ_level == 3)kuc = 3000;if(SQ_level == 4)kuc = 4000;if(SQ_level == 5)kuc = 15000;if(SQ_level == 6)kuc = 20000;if(SQ_level == 7)kuc = 25000;if(SQ_level == 8)kuc = 40000;if(SQ_level == 9)kuc = 50000;if(SQ_level == 10)kuc = 70000;if(SQ_level == 11)kuc = 100000;
if($('.'+SQ_formation).length) $('.'+SQ_formation)[0].click();$('#army_K2').val(kuc);
if(SQ_sendAll == true){if(SQ_onlyHorses == true){
	if($('#current_max_army_K1').length) $('#current_max_army_K1')[0].click();
	if($('#current_max_army_K2').length) $('#current_max_army_K2')[0].click();
	if(!$('#current_max_army_K2').length && !$('#current_max_army_K1').length) return;}else{ $("#select-all-army")[0].click();}}
	pickGeneral();
	setTimeout(SQ_sendAttack, 4000);}
var pickGeneral					= function(){xajax_viewAssignGeneral(container.open({saveName: 'modal',load: function(name) {$('#attack-general').clone().removeAttr('id').appendTo('#overlayContent').css({ position: 'absolute' }).position({ my: 'center', at: 'center', of: '#attack-general' }).find('.change').remove();container.position('modal', { my: 'left center', at: 'right+20 center', of: '#overlayContent > div' });}}),{ 'assignmentType': 1});setTimeout(function(){$('#generalsCarousel').find('a')[3].click();}, 1000);}
var SQ_sendAttack				= function(){$("#actionButtons").find('button[name=sendAttack]')[0].click();setTimeout(SQ_closeAll, 1000);SQ_Interval = setInterval(SQ_openBarbes, 3000);SQ_closeAll();}
/* only horses */
var SQ_setOnlyHorses = function(that){$(that).closest('.ui-buttons').toggleClass('working');if($(that).closest('.ui-buttons').hasClass('working')){SQ_onlyHorses = true;}else SQ_onlyHorses = false;}
/* Select all army (sends only one attack ) */
var SQ_allArmy = function(that){$(that).closest('.ui-buttons').toggleClass('working');if($(that).closest('.ui-buttons').hasClass('working')){SQ_sendAll = true;$('#SQ_limit').hide();}else{ SQ_sendAll = false;$('#SQ_limit').show();}}
/* Set minimum and maximum level and limit */
var SQ_setMinLevel 	= function(that){minLevel = $(that).val();}
var SQ_setMaxLevel 	= function(that){maxLevel = $(that).val();}
var SQ_setLimit 	= function(that){limit = $(that).val();}
/* Start attack */
var toggleStart = function(){$("#SQ_START").toggleClass('start');if($("#SQ_START").hasClass('start')){SQ_Interval = setInterval(SQ_openBarbes, 3000);}else{clearInterval(SQ_Interval);}}
/* Market Trading */
var _Interval = false;
var SQ_resourceType 	= 1; /* 1 = wood, 2 = iron 3 = stone */
var SQ_changeResourceType = function(that){SQ_resourceType = $(that).val();}
var SQ_openMarket = function(){xajax_viewTradeScreen(container.open({saveName:'market',title:'Rynek'}),{'tab':1,'resType':SQ_resourceType});}
var SQ_startSell = function(){if(!$('#messageboxmarket').length) SQ_openMarket();if(!$('#am1').length){clearInterval(_Interval);SQ_openMarket();_Interval = setInterval(SQ_startSell, 10000);}else{clearInterval(_Interval);$('.btnSellLabel')[0].click();$('#pr1').val(SQ_getAmount());setTimeout(function(){$('.w100').find('.doSellResource')[0].click()}, 2000);_Interval = setInterval(SQ_startSell, 5000);}}
var SQ_startSale = function(that){var v = $(that).closest('.ui-buttons');if(!v.hasClass('working')){v.addClass('working');_Interval = setInterval(SQ_startSell, 2000);}else{clearInterval(_Interval);v.removeClass('working');}}
var SQ_getAmount = function(){return $('#SQ_amountResource').val();}
/* END Market Trading*/
/* ICONS */
var SQ_sellIcon = 'https://static.nationwide.com/static/icon-opt-link-dollarsign-orange.gif';
var SQ_attackIcon = 'https://vignette.wikia.nocookie.net/play-rust/images/7/77/Salvaged_Sword_icon.png/revision/latest/scale-to-width-down/50?cb=20151106061458';
var SQ_horseIcon = 'https://image.flaticon.com/icons/svg/32/32406.svg';
var SQ_allArmyIcon = 'https://d30y9cdsu7xlg0.cloudfront.net/png/2181-200.png';
/* END ICONS*/
/* style */
var _SQ_Style = '<style> \
	.ui-buttons.working,.ui-buttons.start{opacity:1 !important;background-color:white; color:white;} \
	.ui-buttons.not-working{opacity:.5;} \
	.SQ_menu{width:200px; height:200px;position:fixed;color:white;transition:.5s all;top:40%;left:5px;padding:2px;z-index:9999999;margin-left:-145px;} \
	.SQ_menu:hover{margin-left:0;} \
	.SQ_menu .ui-buttons{}\
</style>';
/* END style */
/* Starters */
/* (bottom buttons - only starters without options) */
/* Start Sale */
var _SQ_ = '<div class="ui-bg ui-buttons not-working"><a class="ui-small-icon zoom ps2" onclick="SQ_startSale(this)"  style="background:url('+SQ_sellIcon+');background-size:60%;background-position:center center;background-repeat:no-repeat;"></a></div>';
/* Barbes Attack */
_SQ_ += '<div class="ui-bg ui-buttons not-working" id="SQ_START"><a class="ui-small-icon zoom ps2" onclick="toggleStart(this)" style="background:url('+SQ_attackIcon+');background-size:60%;background-position:center center;background-repeat:no-repeat;"></a></div>';
/*END Starters */
/* Options block */
/* Barbes */
var SQ_barbySettings = '';
/* only horses */
SQ_barbySettings += '<div class="ui-bg ui-buttons not-working working"><a class="ui-small-icon ps2" onclick="SQ_setOnlyHorses(this)" style="background:url('+SQ_horseIcon+');background-size:60%;background-position:center center;background-repeat:no-repeat;"></a></div>';
/* select All ARMY */
SQ_barbySettings += '<div class="ui-bg ui-buttons not-working working"><a class="ui-small-icon ps2" onclick="SQ_allArmy(this)" style="background:url('+SQ_allArmyIcon+');background-size:60%;background-position:center center;background-repeat:no-repeat;"></a></div>';
/* select minlevel and maxLevel */
SQ_barbySettings += '<div class="ui-bg ui-buttons"><input type="text" value="8" onkeyup="SQ_setMinLevel(this)" title="Min Level" style="width:23px; height:23px;margin:1px;border-radius:2px;padding:0;border:none;outline:none;background:none"></div>';
SQ_barbySettings += '<div class="ui-bg ui-buttons"><input type="text" value="10" onkeyup="SQ_setMaxLevel(this)" title="Max Level" style="width:23px; height:23px;margin:1px;border-radius:2px;padding:0;border:none;outline:none;background:none"></div>';
SQ_barbySettings += '<div class="ui-bg ui-buttons" id="SQ_limit"><input type="text" value="1" onkeyup="SQ_setLimit(this)" title="Limit" style="display:none;width:23px; height:23px;margin:1px;border-radius:2px;padding:0;border:none;outline:none;background:none"></div>';
/* Amoun resource */
SQ_barbySettings += '<br>SALE:<br><div class="ui-bg ui-buttons not-working" title="Price"><input type="text" id="SQ_amountResource" style="width:100%;height:100%;border:none;outline:none;" value="0.5"></div>';
/* Select Resource Field */
SQ_barbySettings += '<div class="ui-bg ui-buttons not-working"><select style="width:100%;height:100%;" title="Resource" onchange="SQ_changeResourceType(this)"><option value="1">W</option><option value="2">I</option><option value="3">S</option></select></div>';
/* END options block */

var _SQ_menu_ = '<div class="SQ_menu">'+SQ_barbySettings+'</div>';
$('.ui-bottom-right').append(_SQ_);
$('body').append(_SQ_Style + _SQ_menu_);

