var importViewHot;
var importViewSettings;
var importViewPopupSettings;
var importViewIndex = 9999;
var importViewScrollTp = true;
var impShipViewHot;
var impShipViewSettings;
var importViewLanHot;
var importViewLanSettings;
var importViewSpecHot;
var importViewSpecSettings;
var excelStatus = null;
var isProgressing = false;

$( document ).ready(function() {
	 //달력 사용시 반드시 넣어주세요.
    $('.band-calendar').each(function(){ regCal(this) ;})
	  //캘린더 포맷
    $('.datepicker').datepicker("option","dateFormat",calFormat);

	  var date = new Date();
	  var month = date.getMonth();
	  var dayday = date.getDate();
	  
	  var today = new Date().toISOString().substring(0,10);
	  var mtoday = new Date(new Date().setDate(dayday - 6)).toISOString().substring(0,10);
	  var yesterDay = new Date(new Date().setDate(dayday - 1)).toISOString().substring(0,10)
	  
	  $("#importView_srch2").val(mtoday);
	  $("#importView_srch3").val(today);
	  $("#impDetailDate2").val(yesterDay);
	  $("#impDetailDate").val(mtoday);
	  
	  var importViewElement = document.querySelector('#importViewTable');
	  var importViewElementContainer = importViewElement.parentNode;
	  importViewHot = new Handsontable(importViewElement, importViewSettings);

	  var impShipViewElement = document.querySelector('#impShipViewTable');
	  var impShipViewElementContainer = impShipViewElement.parentNode;
	  impShipViewHot = new Handsontable(impShipViewElement, impShipViewSettings);
	  
	  var impViewListPopupElement = document.querySelector('#impViewListPopupTable');
	  var impViewListPopupElementContainer = impViewListPopupElement.parentNode;
	  impViewListPopupSettings = fn_handsonGridImpViewListPopupOption();
	  impViewListHot = new Handsontable(impViewListPopupElement, impViewListPopupSettings);
	  
	  var importViewLanElement = document.querySelector('#importViewLanTable');
	  var importViewLanElementContainer = importViewLanElement.parentNode;
	  importViewLanHot = new Handsontable(importViewLanElement, importViewLanSettings);
	  
	  var importViewSpecElement = document.querySelector('#importViewSpecTable');
	  var importViewSpecElementContainer = importViewSpecElement.parentNode;
	  importViewSpecHot = new Handsontable(importViewSpecElement, importViewSpecSettings);
	  
	  fn_changeImportView('read');
	
	  $("article").show();
	  //scroll 이벤트
	  fn_impViewasEventReg();
	  //importViewUseEventReg();
	  $("#impViewTextView").text("전체");
      $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
	  

	  $(document).on("click", '.itemCdClass', function(){
		  alert($(this).index());
	  });
	  
	 function restrictFutureDates(inputElement) {
		 // console.log("onchange 호출됨");
		 var today = new Date();
		 $(inputElement).bandCalendar('option', 'maxDate', today); // maxDate를 오늘 날짜로 설정
    }
 
});
/** 이벤트 Start **/


$(document).mousedown(function(e){	
	if(e.target.name == "importView1_date" || e.target.name == "importView2_date" || e.target.name == "toDt" || e.target.name == "fromDt" ){
		if($(".calendar-popup-container").hasClass("calendar-popup-container_active")){
			return;
		}
		$(".calendar-popup-container").remove();
		$('.band-calendar').each(function(){ regCal(this);});
	}else{
		if($(".calendar-popup-container").hasClass("calendar-popup-container_active")){
			$(".calendar-popup-container").attr("class", "calendar-popup-container");
		}	
	}
});


$("input:radio[name=importView_srch20]").change(function(){
	$("input[name=importViewType][value=read]").prop("checked", true);
	fn_changeImportView("read");
})

// 테이블 타입 변경
$("input[name=importViewType]").change(function(){
	  fn_changeImportView($(this).val());
});


function fn_impViewchgDate1() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
  
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setMonth(month - 1)).toISOString().substring(0,10);
  
	$("#importView_srch2").val(today);
	$("#importView_srch3").val(today);
}

function fn_impViewchgDate2() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setDate(dayday - day)).toISOString().substring(0,10);
	
	$("#importView_srch2").val(mtoday);
	$("#importView_srch3").val(today);
}

function fn_impViewchgDate3() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setDate(dayday - dayday + 1)).toISOString().substring(0,10);
	
	$("#importView_srch2").val(mtoday);
	$("#importView_srch3").val(today);
}
function fn_impViewchgDate4() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	
	  var startDt = new Date();
	  startDt.setDate(1);
	  startDt.setMonth(startDt.getMonth() - 1);

	  var endDt = new Date();
	  endDt.setMonth(endDt.getMonth(), 1);
	  endDt.setDate(endDt.getDate() - 1);
	
	var today = startDt.toISOString().substring(0,10);
	var mtoday = endDt.toISOString().substring(0,10);
	
	$("#importView_srch2").val(today);
	$("#importView_srch3").val(mtoday);
}

//정렬항목
/*$("select[name=alignImportView]").change(function(){
	  fn_searchImportView();
});
*/
//row 수
$("select[name=importViewPageCnt]").change(function(){
	  fn_searchImportView("");
});


function fn_impViewasEventReg(){
	
 $("#importViewTable .wtHolder").scroll(function(){
	  //fn_impViewFileList(row, col)
  	  var scrollTop = $("#importViewTable .wtHolder").scrollTop();
  	  var countPerPage = $("#importViewPageCnt option:selected").val();
  	  var rowHeight = importViewHot.getRowHeight();
  	  var addCnt = 790;
  	  if(countPerPage == "50"){
  		  addCnt = 790;
  	  }else if(countPerPage == "100"){
  		  addCnt = 2040;
  	  }else if(countPerPage == "200"){
  		  addCnt = 3290;
  	  }else if(countPerPage == "500"){
  		  addCnt = 4540;
  	  }

  	  if(importViewScrollTp && importViewIndex != 9999 && scrollTop >= (countPerPage * importViewIndex * rowHeight) + addCnt){
  		  fn_importViewScroll();
  	  }
  });
}
/** 이벤트 End **/
//스크롤
function fn_importViewScroll(type){
	if( $("input[name=importViewType]:checked").val() == "enrol")
		return;
	fn_loading(true);
	importViewScrollTp = false;
	importViewIndex++;
	var data = fn_setImportViewForm();

	
	if (impType != "") {
        const currentDate = new Date().toISOString().split('T')[0];
        data["srch2"] = currentDate;
        data["srch3"] = currentDate;
        data["srch6"] = impType;
    } else {
        document.getElementById("impTodayType").value = "";
    }
	
	$.ajax({
		type : "POST",
		url : "/import/selectImportViewList.do",
		data : JSON.stringify(data),
		contentType: "application/json; charset=utf-8", 
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        	var getData = importViewHot.getSourceData();
        	var meargeJson = getData.concat(data.resultList);
        	importViewHot.loadData(meargeJson);
        	importViewSpecHot.loadData([]);
    		importViewLanHot.loadData([]);
        	importViewScrollTp = true;
        	fn_loading(false);
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("Your request is up. Please log back in if you wish continue");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	//alert(msgSearchError);
        	}
        }
	});
}

//검색
var impType = "";
function fn_searchImportView(type){
	impType = type;
	var selectedValue = $("input[name=importView_srch1]:checked").val();
    
    if(selectedValue === "01") {
        $("#impViewTextView").text("전체");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    } else if(selectedValue === "02") {
        $("#impViewTextView").text("수리");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    } else if(selectedValue === "03") {
        $("#impViewTextView").text("대기");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    } else if(selectedValue === "04") {
        $("#impViewTextView").text("결재");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    } else if(selectedValue === "05") {
        $("#impViewTextView").text("미결");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    } else if(selectedValue === "06") {
        $("#impViewTextView").text("신고 전");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    } else {
        $("#impViewTextView").text("신고 후");
        $("#impViewTextView").prepend('<i class="fa-duotone fa-chart-network text-primary-900"></i>'); 
    }
    
	importViewIndex = 0;
	var data = fn_setImportViewForm();
	var valid = fn_validateSearchDate(data["srch2"], data["srch3"]);

	if(valid === "false"){
		data["srch2"] = null;
		data["srch3"] = null;
		$("#importView_srch2").val("");
		$("#importView_srch3").val("");
		return;
	} else {
		data["srch2"] = $("#importView_srch2").val();
		data["srch3"] = $("#importView_srch3").val();
	}
	
	if(data["srch2"] == null || data["srch2"] == "" || data["srch3"] == "" || data["srch3"] == null){
		alert("날짜를 입력해 주세요.");
		return;
	}

	if (impType != "") {
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().split('T')[0];
		data["srch2"] = formattedDate;
		data["srch3"] = formattedDate;
		data["srch6"] = impType;
	} else {
		document.getElementById("impTodayType").value = "";
	}
	fn_loading(true);
	
	// console.log(data);
	$.ajax({
		type : "POST",
		url : "/import/selectImportViewList.do",
		data : JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
    		importViewHot.loadData([]);
        	importViewHot.loadData(data.resultList);
        	var totCnt = (data.resultList.length > 0) ? data.resultList[0].cnt : 0;
        	$("#importViewCnt").text(totCnt);
        	fn_loading(false);
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("Your request is up. Please log back in if you wish continue");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSearchError);
        	}
        }
	});
};

function enterkey() {
	if (window.event.keyCode == 13) {
		fn_searchImportView("");
    }
}

// 검색조건 생성
function fn_setImportViewForm(){
	var sData = {};
	sData["srch1"] = $("input:radio[name=importView_srch1]:checked").val();
	sData["srch2"] = $("#importView_srch2").val();
	sData["srch3"] = $("#importView_srch3").val();
	sData["srch4"] = $("#importView_srch4").val();
	
	sData["srch5"] = $("#importView_srch5").val();
	var list2 = sData["srch5"].split(/[, ]+/).map(function(item) {
        return item.trim();
    }).filter(function(item) {
        return item.length > 0;
    });
	
	sData["srch6"] = "";
	
	sData["list2"] = list2;
	sData["srch8"] = $("#importViewDateType option:selected").val();
	
	sData["recordCountPerPage"] = $("#importViewPageCnt option:selected").val();
	sData["pageIndex"] = importViewIndex;
	
	sData["srchType1"] = $("#importViewSrchType1 option:selected").val();
	sData["srchText1"] = $("#importViewSrchText1").val();
	
	sData["srchType2"] = $("#importViewSrchType2 option:selected").val();
	sData["srchText2"] = $("#importViewSrchText2").val();
	
	return sData;
};

// 검색조건 초기화
function fn_clearImportView(){
	
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
  
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setDate(dayday - 6)).toISOString().substring(0,10);
	
	$("input:radio[name=importView_srch1][value=01]").prop('checked', true);
	$("#importView_srch2").val(mtoday);
	$("#importView_srch3").val(today);
	$("#importView_srch4").val("");
	$("#importView_srch5").val("");
	$("#importViewDateType").val("01");
	
	$("#importViewSrchType1").val("");
	$("#importViewSrchType2").val("");
	
	$("#importViewSrchText1").val("");
	$("#importViewSrchText2").val("");
	
};


//테이블 컬럼
function fn_impViewTableCol(){
	var tableType = $("input:radio[name=importViewType]:checked").val();
	// 사용여부
	var importView_srch20 = $("input:radio[name=importView_srch20]:checked").val(); 

	var impViewFileLoadRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        var $fileButton;
        if (value != '' && value != null) {
            $fileButton = $('<i class="fas fa-search search-icon" style="cursor:pointer;" onclick="fn_impViewFileList('+row+','+col+')"></i>');
        } else {}
        $(td).empty().append($fileButton).append("  " + value);
	};
	
	var cusMemoRenderer = function (instance, td, row, col, prop, value, cellProperties) {
		var $cusMemo = $('<input type="text" style="height:14px;" id="cusMemo" /><div class="btn btn-primary new-button">SAVE</div>');
		$(td).empty().append(value+"	").append($cusMemo).css("text-align", "right");
		};
	
	var unreMemoRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	    var $unreMemoInput = $('<input type="text" class="row-start-3 col-start-2 bg-gray-50 border border-gray-300 rounded-lg" id="unreMemo' + row + '" style="height:8px; width:150px;" value="' + value + '"/>');
	    var $unreMemoButton = $('<button type="button" onclick="fn_memoSave(' + row + ',' + col + ')" class="save-button p-0.5 text-sm rounded text-white hover:opacity-50 duration-150 bg-rose-700 ml-1 hover:bg-rose-500">저장</button>');
	    $(td).empty().append($unreMemoInput).append($unreMemoButton).css("text-align", "right");
	    $unreMemoInput.css({
	        'font-family': '맑은 고딕',
	        'font-size': '13px'
	    });
	    $unreMemoButton.css({
	        'font-family': '맑은 고딕',
	        'font-size': '13px'
	    });
	    $unreMemoInput.val(value);
	};

	
	var chipRenderer = function (instance, td, row, col, prop, value, cellProperties) {
		  Handsontable.renderers.BaseRenderer.apply(this, arguments);
		  td.classList.add('chip-cell');
		  td.classList.add('text-center');
		  switch (value) {
		    case "예":
		    case "접수":
		    case "Y":
		      td.innerHTML = `<span class="chip chip-blue">${value}</span>`;
		      break;
		    case "수리":
		      td.innerHTML = `<span class="chip chip-green">${value}</span>`;
		      break;
		    case "N":
		    case "서류 미비":
		      td.innerHTML = `<span class="chip chip-red">${value}</span>`;
		      break;
		    case "자수":
		      td.innerHTML = `<span class="chip chip-yellow">${value}</span>`;
		      break;
		    case "대기":
		      td.innerHTML = `<span class="chip chip-primary">${value}</span>`;
		      break;
		    case "결재":
		      td.innerHTML = `<span class="chip chip-primary">${value}</span>`;
		      break;
		    case "":
		      td.innerHTML = `<span>${value}</span>`;
		      break;
		    default:
		      td.innerHTML = `<span class="chip chip-primary">${value}</span>`;
		      break;
		  }
	};

	
	function saveRenderer(instance, td, row, col, prop, value, cellProperties) {
		  Handsontable.renderers.BaseRenderer.apply(this, arguments);
		  td.classList.add('save-cell');
		  td.classList.add('text-center');
		  td.classList.add('text-center');
		  td.innerHTML = `${value}<button type="button" class="save-button p-0.5 text-sm rounded text-white hover:opacity-50 duration-150 bg-rose-700 ml-1 hover:bg-rose-500">저장</button>`
	}
	
	var colorStateRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.BaseRenderer.apply(this, arguments);
	    td.classList.add('chip-cell');
	    td.classList.add('text-center');
	    
	    switch (value) {
	        case "예":
	        case "N":
	        case "배차":
	            td.innerHTML = `<span class="chip chip-green">${value}</span>`;
	            break;
	        case "도착":
	            td.innerHTML = `<span class="chip chip-complete">${value}</span>`;
	            break;
	        case "배차 취소":
	        	td.innerHTML = `<span class="chip chip-red">${value}</span>`;
		        break;
	        case "운송 취소":
	            td.innerHTML = `<span class="chip chip-red">${value}</span>`;
	            break;
	        case "요청 취소":
	        	td.innerHTML = `<span class="chip chip-red">${value}</span>`;
	        	break;
	        case "접수":
	        	td.innerHTML = `<span class="chip chip-yellow">${value}</span>`;
	        	break;
	        case "입차":
	        	td.innerHTML = `<span class="chip chip-primary">${value}</span>`;
	        	break;
	        case "출발":
	        	td.innerHTML = `<span class="chip chip-primary">${value}</span>`;
	        	break;
	        default:
	            td.innerHTML = value;
	            break;
	    }
	};
	
	
	this.impViewCol = [
		{data : 'sn', className : "htCenter", width: 50,wordWrap: false, className : "htCenter", readOnly:true, renderer : chipRenderer},
		{data : 'rece', className : "htCenter", width: lang === 'en' ? 130 : 80, wordWrap: false, className : "htCenter", readOnly:true, renderer : chipRenderer},
		{data : 'orderState', className : "htCenter", width: lang === 'en' ? 150 : 80, wordWrap: false, className : "htCenter", readOnly:true, renderer : colorStateRenderer},
		/*{data : 'cs', className : "htCenter", width: 60,wordWrap: false, className : "htCenter", readOnly:true},*/
		{data : 'rptNo', className : "htCenter", width: 160, wordWrap: false, className : "htCenter", readOnly:true, renderer : impViewFileLoadRenderer},
		{data : 'blno', className : "htCenter", width: 130,wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'nabFirm', className : "htCenter",width: 180, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'supFirm', className : "htCenter", width: 200, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'incDay', className : "htCenter", width: 90, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'rptDay', className : "htCenter", width: 120, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'lisDay', className : "htCenter", width: 120, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'excCot', className : "htCenter", width: 120, wordWrap: false, className : "htCenter", readOnly:true},
		
		{data : 'conKiCot', className : "htCenter", width: 120, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'conCod', className : "htCenter", width: 90, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'freKrw', className : "htCenter", width: 90, wordWrap: false, type : 'numeric', className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		{data : 'insuKrw', className : "htCenter",width: 90, wordWrap: false, type : 'numeric', className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		{data : 'totWt', className : "htCenter",width: 120, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'totPackCnt', className : "htCenter", width: lang === 'en' ? 100 : 90, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'conCur', className : "htCenter", width: lang === 'en' ? 100 : 90, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'conTotAmt', className : "htCenter",width: 120, wordWrap: false, type : 'numeric', className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		{data : 'totTaxSum', className : "htCenter",width: 120, wordWrap: false, type : 'numeric', className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		/*{data : 'lawCd', className : "htCenter", width: 90,wordWrap: false, className : "htCenter", readOnly:true},*/
		{data : 'supSt', className : "htCenter", width: lang === 'en' ? 200 : 150, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'fodMark', className : "htCenter", width: 120, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'oriStPrfYn', className : "htCenter", width: lang === 'en' ? 150 : 120, wordWrap: false, className : "htCenter", readOnly:true,renderer : chipRenderer},
		/*{data : 'rmv', className : "htCenter", width: 90,wordWrap: false, className : "htCenter", readOnly:true,renderer : chipRenderer},*/
		/*{data : 'rptYn', className : "htCenter",width: 110, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'plntCd', className : "htCenter",width: 90, wordWrap: false, className : "htCenter", readOnly:true},
		{data : 'prOrdr', className : "htCenter", width: 90,wordWrap: false, className : "htCenter", readOnly:true},*/
		/*{data : 'userMemo', className : "htCenter", width: 250,wordWrap: false, className : "htCenter", readOnly:true, renderer : unreMemoRenderer},*/
		{data : 'reporter', className : "htCenter", width: 120, wordWrap: false, className : "htCenter", readOnly:true},
	] ;

	//판정 사용 내역 컬럼
	//Handsontable.renderers.registerRenderer('chip', chipRenderer);
	//Handsontable.renderers.registerRenderer('save', saveRenderer);
}

//테이블 헤더
function fn_impViewTableHeader(){
	var tableType = $("input:radio[name=importViewType]:checked").val();
	this.impViewHeader = [
		"", state, shipState, rptNo, blNo, nabFirm, tradePartner, entryDt, rptday, lisDay, tradeType,
		 payment, incoterms, freight, insurance, totWeight, totPackCnt, currency, declarePrice, taxPaid, 
		 overseasNationMark, mark, FtaStatus, reporter

/*		"", "상태(신고)", "상태(운송)",  "C/S검사", "신고번호", "B/L번호", "납세의무자", "무역거래처", "반입일자", "신고일자", "수리일자", "거래구분",
		"결제방법", "인도조건", "운임", "보험료", "총중량", "총포장개수", "통화단위", "신고금액", "납부세액", "요건승인", 
		"해외공급자국가부호", "적출국(부호)", "FTA적용여부", "감면여부", "확정신고대상여부", "부서코드", "PO", "신고인"
*/	 ] ;
}

//테이블 히든컬럼
function fn_impViewTableHidden(){
	this.impViewHidden = [0];
}

function fn_impShipViewTableHidden(){
	this.impShipViewHidden = [];
}

function fn_impTodayViewTableHidden(){
	this.impTodayViewHidden = [];
}


//table
function fn_handsonGridViewOption(col, header, hidden){
	var tableType = $("input:radio[name=importViewType]:checked").val();

	importViewSettings = {
	  columns : col,
	  colHeaders : header,
	  hiddenColumns : {
    	  copyPasteEnabled : false,
    	  indicators : false,
    	  columns : hidden
      },
	  stretchH : 'all',
	  width : '100%',
	  autoWrapRow : true,
	  height : 380,
	  rowHeights : 27,
	  rowHeaders : true,
	  columnHeaderHeight : 25,
	  manualRowResize : true,
	  manualRowMove : true,
	  manualColumnResize : true,
	  manualColumnMove : false,
	  licenseKey: 'non-commercial-and-evaluation', // for non-commercial use only
	  //dropdownMenu : true,

	  contextMenu : (tableType == "enrol") ? ['row_above', 'row_below', '---------', 'undo', 'redo', 'remove_row'] : false,
	  filters : true,
	  readOnly : (tableType == "read") ? true : false,
	  allowInsertRow : true,
	  allowRemoveRow : true,
	 // columnSorting : {indicator : true},
	  autoColumnSize : {samplingRatio : 30},
      mergeCells : false,
      wordWrap : true,
      afterOnCellMouseDown : function(event, coords){
    	  var excludedColumns = [2,26];
    	  
    	  if (excludedColumns.includes(coords.col)) {
    		  return; // 함수 실행 중단
    	  }
    	  var dataList = "";
    	  var rptNo = "";
    	  var dataList = importViewHot.getSourceData(coords.row, 35);
    	  var rptNo = dataList[dataList.length-1].rptNo.replace(/-/g, '');
    	  var sn = dataList[dataList.length-1].sn.replace(/-/g, '');
    	  fn_searchImpShipView(rptNo);
    	  fn_searchImportViewLan(sn, rptNo);
          setTimeout(function() {
              fn_searchImportViewSpec(sn, rptNo, "001");
          }, 100);
      }
	};

	return importViewSettings;
}


//테이블 타입 변경
function fn_changeImportView(type){

	var searchTp = $("input:radio[name=importView_srch1]:checked").val();

	importViewHot.updateSettings({readOnly:true, contextMenu : false});
	$("#btnImportViewSave").hide();
	$("#impExcel").show();
	$("#docBtn").children().show();
	fn_changeImportViewType(searchTp);
};

//검색구분 변경
function fn_changeImportViewType(type){
	let impViewCol = new fn_impViewTableCol();
	let impViewHeader = new fn_impViewTableHeader();
	let impViewHidden = new fn_impViewTableHidden();
	
	let impShipViewCol = new fn_impShipViewTableCol();
	let impShipViewHeader = new fn_impShipViewTableHeader();
	let impShipViewHidden = new fn_impShipViewTableHidden();
	
	let impViewLanCol = new fn_impViewLanTableCol();
	let impViewLanHeader = new fn_impViewLanTableHeader();
	let impViewLanHidden = new fn_impViewLanTableHidden();
	
	let impViewSpecCol = new fn_impViewSpecTableCol();
	let impViewSpecHeader = new fn_impViewSpecTableHeader();
	let impViewSpecHidden = new fn_impViewSpecTableHidden();
	
	var col, header, hidden, col2, header2, hidden2, col4, header4, hidden4, col5, header5, hidden5;

	col = impViewCol.impViewCol;
	header = impViewHeader.impViewHeader;
	hidden = impViewHidden.impViewHidden;
	
	col2 = impShipViewCol.impShipViewCol;
	header2 = impShipViewHeader.impShipViewHeader;
	hidden2 = impShipViewHidden.impShipViewHidden;
	
	col4 = impViewLanCol.impViewLanCol;
	header4 = impViewLanHeader.impViewLanHeader;
	hidden4 = impViewLanHidden.impViewLanHidden;
	
	col5 = impViewSpecCol.impViewSpecCol;
	header5 = impViewSpecHeader.impViewSpecHeader;
	hidden5 = impViewSpecHidden.impViewSpecHidden;
	
	importViewHot.updateSettings(fn_handsonGridViewOption(col, header, hidden));
	impShipViewHot.updateSettings(fn_handsonGridImpShipOption(col2, header2, hidden2));
	importViewLanHot.updateSettings(fn_handsonGridLanOption(col4, header4, hidden4));
	importViewSpecHot.updateSettings(fn_handsonGridSpecOption(col5, header5, hidden5));
	
	fn_searchImpTodayView();
	fn_searchImportView("");
};


function fn_impViewFileList(row, col){

	var data = importViewHot.getSourceDataAtRow(row);
	console.log(data);
	$("#impViewFileListPopUp").modal("show");
	
	var rptNoTitle = rptNo + ": " + data.rptNo;
    
    var uploadImpViewFileListTitle = document.querySelector('.modal-content .impModal-title span');
	uploadImpViewFileListTitle.textContent = rptNoTitle;
	
    var sData = fn_rptNoForPopup(data);
    fn_searchImpViewFilesPopup(sData);
};

function fn_rptNoForPopup(selectedRow){
	var sData = {};

	sData["srch1"] = selectedRow["rptNo"].replace(/-/g, '');
	sData["srch2"] = selectedRow["name"];
	sData["srch3"] = selectedRow["orgFileName"];
	return sData;
}


function fn_searchImpViewFilesPopup(data){
	fn_loading(true);
	
    $.ajax({
		type : "POST",
		url : "/import/selectImpViewFilesList.do",
		data : data,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType : 'json',
		async: false,
        success : function(data) {
        	impViewListHot.loadData([]);
        	impViewListHot.loadData(data.impViewList);
			setTimeout(function() {impViewListHot.render()}, 200);
			fn_loading(false);
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("에러 발생");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSearchError);
        	}
        }
	});
}

function fn_handsonGridImpViewListPopupOption() {
	impViewListPopupSettings = {
        columns: [
        	{ data :'checkBox', type :'text', className :"htCenter", width: 30, type:'checkbox', checkedTemplate:'yes', uncheckedTemplate:'no', readOnly:false },
        	{ data : 'rptNo', type: 'text', className: "htCenter", readOnly: true, 
        		renderer: function(instance, td, row, col, prop, value, cellProperties) {
                value = value.replace(/^(\d{5})(\d{2})(\d{6})(\w)$/, '$1-$2-$3$4');
                Handsontable.renderers.TextRenderer.apply(this, arguments);
                }
        	  },
            {
                data: 'docuType',
                type: 'text',
                className: "htCenter",
                readOnly: true, width: 50,
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                	if (value === 'CI') {
                        td.innerHTML = '<div style="text-align: center;">INVOICE</div>';
                    } else if (value === 'PL') {
                        td.innerHTML = '<div style="text-align: center;">Packing List</div>';
                    } else if (value === 'DC') {
                        td.innerHTML = '<div style="text-align: center;">신고필증</div>';
                    } else if (value === 'CB') {
                        td.innerHTML = '<div style="text-align: center;">통합</div>';
                    } else if (value === 'UC') {
                        td.innerHTML = '<div style="text-align: center;">정정 통합</div>';
                    } else if (value === 'CO') {
                        td.innerHTML = '<div style="text-align: center;">원산지증명서</div>';
                    } else if (value === 'RQ') {
                        td.innerHTML = '<div style="text-align: center;">요건 서류</div>';
                    } else if (value === 'OT') {
                        td.innerHTML = '<div style="text-align: center;">기타</div>';
                    } else if (value === 'AC') {
                        td.innerHTML = '<div style="text-align: center;">정산서</div>';
                    } else {
                        td.innerHTML = '<div style="text-align: center;">B/L</div>';
                    }
                }
            },
            { data: 'docuOrgFile', type: 'text', className: "htCenter", readOnly: true },
            { data: 'docuFile', type: 'text', className: "htCenter", readOnly: true },
            { data: 'uploadDt', type: 'text', width : 50, className: "htCenter", readOnly: true },
            { data: 'docuPath', type: 'text', className: "htCenter", readOnly: true },
            { data: 'blno', type: 'text', className: "htCenter", readOnly: true }
        ],
        stretchH: 'all',
        width: '100%',
        autoWrapRow: true,
        height: 250,
        rowHeights: 25,
        rowHeaders: true,
        columnHeaderHeight: 25,
        colHeaders: ["", rptNo, fileType, fileName, "", uploadDt, "파일 경로"],
        /*colHeaders: ["", "신고번호", "파일 타입", "파일명", "", "업로드 일자", "파일 경로"],*/
        manualRowResize: true,
        manualColumnResize: true,
        manualRowMove: true,
        manualColumnMove: false,
        contextMenu: false,
        dropdownMenu: false,
        filters: true,
        readOnly: false,
        columnSorting: { indicator: true },
        autoColumnSize: { samplingRatio: 23 },
        mergeCells: false,
        allowInsertRow: false,
        hiddenColumns: { copyPasteEnabled: false, indicators: false, columns: [1,4,6,7]},
        afterGetColHeader: function(col, TH){
        	if(col == 0){
          	TH.innerHTML = "<input type='checkbox'  class='checker' id='id_impViewAllClick' onclick='fn_impViewAllClick();'>";
          }
        }
    };

    return impViewListPopupSettings;
}


function fn_impViewAllClick(){
	var check = "" ;
	var changeArr = [];
	if ( $("#id_impViewAllClick").prop("checked") == false) {
		check = "yes" ;
	} else {
		check = "no" ;
	}

	var data = impViewListHot.getData();

	for(var i=0; i<data.length; i++){
		changeArr.push([i,0,check])
	}
	impViewListHot.setDataAtCell(changeArr);
	if(check == "yes"){
		$("#id_impViewAllClick").prop("checked", true);
	} else {
		$("#id_impViewAllClick").prop("checked", false);
	}
}

$("#importViewTable .wtHolder").scroll(function(){
    var scrollTop = $("#impViewListPopupTable .wtHolder").scrollTop();
    var countPerPage = 50;
    var rowHeight = overHot.getRowHeight();
    var addCnt = 790;
});


$("#popOverTable .wtHolder").scroll(function(){
	fn_impViewFileList(row, col)
	var data = importViewHot.getSourceData();
	var scrollTop = $("#importViewTable .wtHolder").scrollTop();
	var countPerPage = 50;
	var rowHeight = filesHot.getRowHeight();
	var addCnt = 790;
	
});

$("#impShipViewTable .wtHolder").scroll(function(){
    var scrollTop = $("#impShipViewTable .wtHolder").scrollTop();
    var countPerPage = 50;
    var rowHeight = overHot.getRowHeight();
    var addCnt = 790;
});

function fn_impViewFileDown(){
    var data = impViewListHot.getSourceData();
    var selectedData = [];
    var rptNo = data[0].rptNo;
    var blNo = data[0].blno;
    var cnt = 0;
    
    for (var i = 0; i < data.length; i++) {
    	if (data[i].checkBox === "yes") { 
    		selectedData.push(data[i]);
    		cnt++;
    	}
    }
    
    if (cnt == 0){
    	alert(msgSelectFile); // "다운로드할 파일을 선택해 주세요."
    	return;
    }
    if (cnt == 1) {
        $("#impDocuPath").val(selectedData[0].docuPath);
        $("#impDocuFile").val(selectedData[0].docuFile);
        $("#impDocuOrgFile").val(selectedData[0].docuOrgFile);
        document.impViewZipDownForm.action = "/base/impDownloadFile.do";
        document.impViewZipDownForm.submit();
    } else {
	    $.ajax({
	        type: "POST",
	        url: "/import/impViewZipCreate.do",
	        data: JSON.stringify(selectedData), 
	        contentType: 'application/json',
	        beforeSend: function(xhr) {
	            xhr.setRequestHeader("AJAX", "true");
	        },
	        success: function(response) {
	        	$("#impViewZipDown").val(blNo + "_" + rptNo);
	        	document.impViewZipDownForm.action = "/import/downloadImpViewFile.do";
	          	document.impViewZipDownForm.submit();
	        },
	        error: function(xhr, status, error) {
	            console.error("다운로드 실패:", error);
	        }
	    });
    }
};


function impViewFileListClose(){
	$("#impViewFileListPopUp").modal("hide");
}

function fn_importViewExcelDownload(){

	var type = document.getElementById("impTodayType").value;
	var	searchType = $("input:radio[name=importView_srch1]:checked").val();
	
	var exTitArr = [];
	var exTit = "";
	var exColArr = [];
	var exCol = "";
    var exTitDivArr = [];
    var exTitDiv = "";
    
	let impViewCol = new fn_impViewTableCol();
	let impViewHeader = new fn_impViewTableHeader();
	
    exColArr.push(fn_getExcelCol(impViewCol.impViewCol));
	exTitArr.push(fn_getExcelHead(impViewHeader.impViewHeader));
 	exCol = exColArr.join("|||");
	exTit = exTitArr.join("||||");
	exTitDiv = "1|수입신고현황";
    var parameters = {exCol : "", exTit: "", exTitDiv: "", exType: "", srch40: ""};
	
    $.each(fn_setImportViewForm(), function(attrName, attrValue){
    	parameters[attrName] = attrValue;
    });
	
	parameters.exCol = exCol.replace(/ /g,"_");
	parameters.exTit = exTit.replace(/ /g,"_");
	parameters.exTitDiv = exTitDiv.replace(/ /g,"_");
	parameters.exType = searchType;
	parameters.srch40 = "수입신고현황";
	

	if (type != "") {
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().split('T')[0];
		parameters.srch2 = formattedDate;
		parameters.srch3 = formattedDate;
		parameters.srch6 = type;
	} 
	
	fn_loading(true);

	$.ajax({
		 url: "/import/importDownloadExcel.do",
		 data: parameters,
		 type: 'POST',
		 cache: false,
		 timeout: 200000,
		 xhrFields: {
			 responseType: "blob",
		 },
	     success: function(blob, status, xhr) {
	    	try {
				// check for a filename
				 var fileName = "";
				 var disposition = xhr.getResponseHeader("Content-Disposition");

			       if (disposition && disposition.indexOf("attachment") !== -1) {
			      	 var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			           var matches = filenameRegex.exec(disposition);

			           if (matches != null && matches[1]) {
			               fileName = decodeURI(matches[1].replace(/['"]/g, ""));
			           }
			       }

			       // for IE
			       if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			           window.navigator.msSaveOrOpenBlob(blob, fileName);
			       } else {
			           var URL = window.URL || window.webkitURL;
			           var downloadUrl = URL.createObjectURL(blob);

			           if (fileName) {
			               var a = document.createElement("a");

			               // for safari
			               if (a.download === undefined) {
			                   window.location.href = downloadUrl;
			               } else {
			                   a.href = downloadUrl;
			                   a.download = fileName;
			                   document.body.appendChild(a);
			                   a.click();
			               }
			           } else {
			               window.location.href = downloadUrl;
			           }
			       }
		       fn_loading(false);
			} catch (e) {
				console.log(e);
				fn_loading(false);
			};
	    },
	    error: function(e, textStatus, errorThrown) {
	    	if(e.status == 400){
	    		alert("Your request is up. Please log back in if you wish continue");
	    		location.href = document.referrer;
	    	} else {
	        	console.log(errorThrown);
	    	}
	    }
	});
}


function fn_getExcelCol(viewCol){
    return viewCol.map(item => item['data'] + '|' + item['className'] + '|' + item['width']).join("||");
}
 
function fn_getExcelHead(viewHead){
    var result = [];
    
    if(viewHead.length > 1 && typeof(viewHead[0][0]) == 'object') {
        for(var i=0; i < viewHead.length; i++) {
            if(i == viewHead.length -1){
                result.push(viewHead[i].join("|null||") + "|null");
            }else {
                result.push(viewHead[i].map(item => (item['label'] ? item['label'] : 'null') + '|' + (item['colspan'] ? item['colspan'] : 'null')).join("||"));
            }
        }
        return result.join("|||");
    }else{
        return viewHead.join("|null||") + "|null";
    };
}

function fn_handsonGridImpShipOption(col, header, hidden){
	var tableType = $("input:radio[name=importViewType]:checked").val();
	
	impShipViewSettings = {
		columns : col,
		colHeaders : header,
		hiddenColumns : {
			copyPasteEnabled : false,
			indicators : false,
			columns : hidden
		},
		stretchH : 'all',
		width : '100%',
		autoWrapRow : true,
		height : 150,
		border : 1,
		rowHeights : 25,
		columnHeaderHeight : 25,
		rowHeaders: true,
		manualRowResize : true,
		manualColumnResize : true,
		manualRowMove : true,
		manualColumnMove : false,
		licenseKey: 'non-commercial-and-evaluation',
		filters : true,
		readOnly :  true ,
		allowInsertRow : true,
		allowRemoveRow : true,
		 // columnSorting : {indicator : true},
		autoColumnSize : {samplingRatio : 30},
	    mergeCells : false,
	    wordWrap : true,

		afterOnCellMouseDown : function(event, coords){
			var dataList = "";
			var rptNo = "";
			var dataList = impShipViewHot.getSourceData(coords.row, 35);
			var rptNo = dataList[dataList.length-1].rptNo;
		}
	};
	
	return impShipViewSettings;
}


function fn_impShipViewTableCol(){
	this.impShipViewCol = [
		{data : 'cargTrcnRelaBsopTpcd', className : "htCenter", width: 150, wordWrap: false, readOnly:true},
		{data : 'prcsDttm', className : "htCenter", width: 200, wordWrap: false, readOnly:true},
		{data : 'shedSgn', className : "htCenter", width: lang === 'en' ? 300 : 200, wordWrap: false, readOnly:true},
		{data : 'shedNm', className : "htCenter", width: 200, wordWrap: false, readOnly:true},
		{data : 'packCnt', className : "htCenter", width: lang === 'en' ? 150 : 80, wordWrap: false, readOnly:true},
		{data : 'weightCnt', className : "htCenter", width: 80, wordWrap: false, readOnly:true},
		{data : 'rlbrDttm', className : "htCenter", width: lang === 'en' ? 220 : 200, wordWrap: false, readOnly:true},
		{data : 'rlbrCn', className : "htCenter", width: lang === 'en' ? 190 : 180, wordWrap: false, readOnly:true},
		{data : 'dclrNo', className : "htCenter", width: 200, wordWrap: false, readOnly:true},
		{data : 'rlbrBssNo', className : "htCenter", width: lang === 'en' ? 250 : 200, wordWrap: false, readOnly:true},
	];
}

function fn_impShipViewTableHeader(){
	this.impShipViewHeader = [
		shipProcess, shipDt, arrivalAdress, blockName, packCnt, weight, impExpDt, impExpContent, rptNo, impExpNo
		/*"처리단계", "처리일시", "도착지주소/장치장/장치위치", "장치장명", "포장개수", "중량", "반출입일시", "반출입내용", "신고번호", "반출입근거번호"*/
	];
}

function fn_searchImpShipView(rptNo) {
	rptNo = rptNo.replace(/-/g, '');
	var lData = {};
	
	lData["srch18"] = rptNo;
	lData["recordCountPerPage"] = $("#importViewPageCnt option:selected").val();
	lData["pageIndex"] = importViewIndex;
	
	$.ajax({
		type : "POST",
		url : "/import/selectImpShipViewList.do",
		data : lData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
		success : function(data) {
			//console.log("resultList: " + JSON.stringify(data.resultList, null, 2));
			//console.log("resultList2: " + JSON.stringify(data.resultList2, null, 2));
			if (data.resultList.length > 0) {
			    for (let i = 0; i < data.resultList.length; i++) {
			        impShipViewHot.setDataAtCell(i, 0, data.resultList[i].orderState);
			        impShipViewHot.setDataAtCell(i, 1, data.resultList[i].regDt);
			        impShipViewHot.setDataAtCell(i, 2, data.resultList[i].orderNote);
			    }
			}

			if (data.resultList2.length > 0) {
			    let startRow = data.resultList.length;
			    data.resultList2.forEach((rowData, index) => {
			        let rowIndex = startRow + index;
			        const columnsMap = {
			            'cargTrcnRelaBsopTpcd': 0, 'prcsDttm': 1, 'shedSgn': 2, 'shedNm': 3, 'packCnt': 4,
			            'weightCnt': 5, 'rlbrDttm': 6, 'rlbrCn': 7, 'dclrNo': 8, 'rlbrBssNo': 9
			        };
			        Object.keys(columnsMap).forEach(key => {
			            if (rowData[key] !== undefined) {
			                impShipViewHot.setDataAtCell(rowIndex, columnsMap[key], rowData[key]);
			            }
			        });
			    });
			}
		},
	    error : function(e, textStatus, errorThrown) {
	    	if(e.status == 400){
	    		alert("Your request is up. Please log back in if you wish continue");
	    		location.href = document.referrer;
	    	} else {
	        	console.log(errorThrown);
	        	alert(msgSearchError);
	    	}
	    }
	});
};


document.querySelectorAll('.impToday-cell').forEach(cell => {
	cell.addEventListener('click', function() {
		var type = this.getAttribute('data-type');
	    if (type) {
	    	var selectedValue = "01";
	    	$("input[name=importView_srch1][value='01']").prop("checked", true);
	    	$("#impViewTextView").html('<i class="fa-duotone fa-chart-network text-primary-900"></i> 전체');
	    	document.getElementById("impTodayType").value = type;
	    	fn_searchImportView(type);
	   }
	});
});

function fn_impTodayInclOth(){
	var searchTp = $("input[name='importView_srch7']:checked").val();
	fn_searchImpTodayView(searchTp);
}

function fn_searchImpTodayView() {
	var sData = {};
	sData["srch7"] = $("input[name='importView_srch7']:checked").val();
	impTodayViewIndex = 0;
	
	$.ajax({
        type : "POST",
        url : "/import/selectImpTodayViewList.do",
        data : JSON.stringify(sData),
        contentType: "application/json; charset=utf-8",
        beforeSend : function(xmlHttpRequest) {
            xmlHttpRequest.setRequestHeader("AJAX", "true");
        },
        dataType: "json",
        success: function(data) {
            var item = data.resultList[0];
            $("#reqCnt").text(Number(item.reqCnt).toLocaleString());
            $("#ingCnt").text(Number(item.ingCnt).toLocaleString());
            $("#failCnt").text(Number(item.failCnt).toLocaleString());
            $("#stbCnt").text(Number(item.stbCnt).toLocaleString());
            $("#apvCnt").text(Number(item.apvCnt).toLocaleString());
            $("#cmpCnt").text(Number(item.cmpCnt).toLocaleString());

            var totCnt = (data.resultList.length > 0) ? item.cnt : 0;
            $("#importViewCnt").text(totCnt);
        },

        error : function(e, textStatus, errorThrown) {
            if(e.status == 400){
                alert("Your request is up. Please log back in if you wish continue");
                location.href = document.referrer;
            } else {
                console.log(errorThrown);
                alert(msgSearchError);
            }
        }
    });
};



function fn_searchImportViewLan(sn, rptNo) {
	//fn_loading(true);
	rptNo = rptNo.replace(/-/g, '');
	
	var lData = {};
	
	lData["srch1"] = sn;
	lData["srch2"] = rptNo;
	lData["recordCountPerPage"] = $("#importViewPageCnt option:selected").val();
	lData["pageIndex"] = importViewIndex;
	
	//console.log(lData);
	
	$.ajax({
		type : "POST",
		url : "/import/selectImportViewLanList.do",
		data : lData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        		importViewSpecHot.loadData([]);
        		importViewLanHot.loadData([]);
            	importViewLanHot.loadData(data.resultList);
            	importViewLanHot.updateSettings({
            	        autoColumnSize: {samplingRatio: 30}
            	    });
        	//fn_loading(false);
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("Your request is up. Please log back in if you wish continue");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSearchError);
        	}
        }
	});
};

function fn_searchImportViewSpec(sn, rptNo, ranNo) {
	
	//fn_loading(true);
	
	var pData = {};
	pData["srch1"] = sn;
	pData["srch2"] = rptNo;
	pData["srch3"] = ranNo;
	
	pData["recordCountPerPage"] = $("#importViewPageCnt option:selected").val();
	pData["pageIndex"] = importViewIndex;
	
	console.log(pData);
	
	$.ajax({
		type : "POST",
		url : "/import/selectImportViewSpecList.do",
		data : pData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
		success : function(data) {
				importViewSpecHot.loadData([]);
				importViewSpecHot.loadData(data.resultList);
			//fn_loading(false);
		},
		error : function(e, textStatus, errorThrown) {
			if(e.status == 400){
				alert("Your request is up. Please log back in if you wish continue");
				location.href = document.referrer;
			} else {
				console.log(errorThrown);
				alert(msgSearchError);
			}
		}
	});
};


function fn_impViewLanTableCol(){
	this.impViewLanCol = [
        { data: 'sna1', className: "htCenter", width: lang === 'en' ? 180 : 160, wordWrap: false },
        { data: 'rptNo', className: "htCenter", width: lang === 'en' ? 180 : 160, wordWrap: false },
        { data: 'ranNo', className: "htCenter", width: lang === 'en' ? 120 : 100, wordWrap: false },
        { data: 'hs', className: "htCenter", width: lang === 'en' ? 120 : 100, wordWrap: false },
        { data: 'na', className: "htCenter", width: lang === 'en' ? 120 : 100, wordWrap: false },
        { data: 'gsRate', className: "htCenter", width: lang === 'en' ? 120 : 100, wordWrap: false },
        { data: 'stdGname1', className: "htCenter", width: lang === 'en' ? 220 : 200, wordWrap: false },
        { data: 'excGname1', className: "htCenter", width: lang === 'en' ? 220 : 200, wordWrap: false },
        { data: 'taxKrw', wordWrap: false, width: lang === 'en' ? 150 : 95, type: 'numeric', className: 'htRight', numericFormat: { pattern: '0,0' }, readOnly: true },
        { data: 'sunWt', wordWrap: false, width: 95, type: 'numeric', className: 'htRight', numericFormat: { pattern: '0,0' }, readOnly: true },
        { data: 'gs', wordWrap: false, width: lang === 'en' ? 120 : 100, type: 'numeric', className: 'htRight', numericFormat: { pattern: '0,0' }, readOnly: true },
        { data: 'vat', wordWrap: false, width: lang === 'en' ? 120 : 100, type: 'numeric', className: 'htRight', numericFormat: { pattern: '0,0' }, readOnly: true },
        { data: 'csChkCot', className: "htCenter", width: lang === 'en' ? 120 : 100, wordWrap: false },
        { data: 'rmv', className: "htCenter", width: lang === 'en' ? 170 : 100, wordWrap: false }
    ];
}

function fn_impViewLanTableHeader(){
	this.impViewLanHeader = [
		"", rptNo, lanNo, hsCd, type, taxRate, description1, goodsName, dutiableVal, netWeight, tax, vat, cs, abetment 
		/*"", "신고번호","란번호","세번부호","구분","세율","품명","거래품명","과세가격(KRW)","순중량", "관세","부가세","CS", "감면여부"*/
	];
}

function fn_impViewSpecTableCol(){
	this.impViewSpecCol = [
		{data : 'rptNo', className : "htCenter", width: 100, wordWrap: false, className : "htCenter"},
		{data : 'ranNo', className : "htCenter", width: 100, wordWrap: false, className : "htCenter"},
		{data : 'sil', className : "htCenter", width: 120, wordWrap: false, className : "htCenter"},
		{data : 'impGname1', className : "htCenter", width: 200, wordWrap: false, className : "htCenter"},
		{data : 'qty', wordWrap: false, type : 'numeric', width: 100, className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		{data : 'ut', className : "htCenter", width: 100, wordWrap: false, className : "htCenter"},
		{data : 'upi', wordWrap: false, type : 'numeric', width: 100, className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		{data : 'amt', wordWrap: false, type : 'numeric', width: 100, className: 'htRight', numericFormat : {pattern : '0,0'}, readOnly:true },
		{data : 'impGname2', className : "htCenter", width: 200, wordWrap: false, className : "htCenter"},
		{data : 'compoent1', className : "htCenter", width: 100, wordWrap: false, className : "htCenter"},
		{data : 'compoent2', className : "htCenter", width: 110, wordWrap: false, className : "htCenter"},
		];
}

function fn_impViewSpecTableHeader(){
	this.impViewSpecHeader = [
		rptNo, lanNo, specNo, description1, qty, unit, unitPrice, price, description2, ingredient, ingredient2
		/*"신고번호","란번호","규격번호","품명","수량","단위","단가","금액","품명2","성분1","성분2"*/
	];
}


function fn_impViewLanTableHidden(){
	this.impViewLanHidden = [0,1];
}

function fn_impViewSpecTableHidden(){
	this.impViewSpecHidden = [0];
}

function fn_handsonGridLanOption(col, header, hidden){
	var tableType = $("input:radio[name=importViewType]:checked").val();
	
	importViewLanSettings = {
			columns : col,
			colHeaders : header,
			hiddenColumns : {
				copyPasteEnabled : false,
				indicators : false,
				columns : hidden
			},
			stretchH : 'all',
			width : '100%',
			autoWrapRow : true,
			height : 200,
			border : 1,
			rowHeights : 25,
			columnHeaderHeight : 25,
			manualRowResize : true,
			manualColumnResize : true,
			manualRowMove : true,
			manualColumnMove : false,
			licenseKey: 'non-commercial-and-evaluation',
			  filters : true,
			  readOnly :  true ,
			  allowInsertRow : true,
			  allowRemoveRow : true,
			 // columnSorting : {indicator : true},
			  autoColumnSize : {samplingRatio : 30},
		      mergeCells : false,
		      wordWrap : true,

			afterOnCellMouseDown : function(event, coords){
				var dataList = "";
				var rptNo = "";
				var ranNo = "";
				var dataList = importViewLanHot.getSourceData(coords.row, 35);
				var sn = dataList[dataList.length-1].sna1;
				var rptNo = dataList[dataList.length-1].rptNo;
				var ranNo = dataList[dataList.length-1].ranNo;
				fn_searchImportViewSpec(sn, rptNo, ranNo);
			}
	};
	
	return importViewLanSettings;
}

function fn_handsonGridSpecOption(col, header, hidden){
	
	importViewSpecSettings = {
			columns : col,
			colHeaders : header,
			hiddenColumns : {
				copyPasteEnabled : false,
				indicators : false,
				columns : hidden
			},
			stretchH : 'all',
			width : '100%',
			autoWrapRow : true,
			height : 200,
			rowHeights : 25,
			columnHeaderHeight : 25,
			manualRowResize : true,
			manualColumnResize : true,
			licenseKey: 'non-commercial-and-evaluation',
			manualRowMove : true,
			manualColumnMove : false,
			
			filters : true,
			readOnly : true ,
			allowInsertRow : true,
			allowRemoveRow : true,
			autoColumnSize : {samplingRatio : 30},
			mergeCells : false,
			wordWrap : true,
	};
	
	return importViewSpecSettings;
}

function lanAndSpecToggle() {
  const container = document.getElementById("impLanSpecContainer");
  const icon = document.getElementById("table-toggle-icon");

  if (container.classList.contains("hidden")) {
    container.classList.remove("hidden");
    icon.classList.remove("fa-chevron-down");
    icon.classList.toggle("rotate-180");
    
  } else {
    container.classList.add("hidden");
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
    icon.classList.toggle("rotate-180");
  }
}



function fn_impDetailModalShow() {
	$('#impDetailViewListPopUp').modal("show");
}
function impDetailModalClose() {
	$('#impDetailViewListPopUp').modal("hide");
	resetProgressBar();
}


function fn_impDetailTableCol(){
	var tableType = $("input:radio[name=importViewType]:checked").val();
	var importView_srch20 = $("input:radio[name=importView_srch20]:checked").val();
	
	this.impDetailCol = [
		{data : 'rptNo', className : "htCenter", width: 160, wordWrap: false, readOnly:true},
		{data : 'rptDay', className : "htCenter", width: 90, wordWrap: false, readOnly:true},
		{data : 'lisDay', className : "htCenter", width: 90, wordWrap: false, readOnly:true},
		{data : 'impFirm', className : "htCenter", width: 50, wordWrap: false, readOnly:true},
		{data : 'nabFirm', className : "htCenter",width: 180, wordWrap: false, readOnly:true},
		{data : 'fosFirm', className : "htCenter", width: 200, wordWrap: false, readOnly:true},
		{data : 'blno', className : "htCenter", width: 130, wordWrap: false, readOnly:true},
		{data : 'conCod', className : "htCenter", width: 90, wordWrap: false, readOnly:true},
		{data : 'conCur', className : "htCenter", width: 90, wordWrap: false, readOnly:true},
		{data : 'conAmt', className : "htRight", width: 90, wordWrap: false, readOnly:true},
		{data : 'freKrw', className : "htRight", width: 90, wordWrap: false, readOnly:true},
		{data : 'insuKrw', className : "htRight",width: 90, wordWrap: false, readOnly:true},
		{data : 'totPackCnt', className : "htRight", width: 90, wordWrap: false, readOnly:true},
		{data : 'totPackUt', className : "htCenter", width: 90, wordWrap: false, readOnly:true},
		{data : 'totWt', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totUt', className : "htCenter", width: 120, wordWrap: false, readOnly:true},
		{data : 'totGs', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totTs', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totHof', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totGt', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totKy', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totNt', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totBlank', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totVat', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'totTaxSum', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		
		{data : 'ranNo', className : "htLeft",width: 120, wordWrap: false, readOnly:true },
		{data : 'hs', className : "htLeft", width: 120, wordWrap: false, readOnly:true},
		{data : 'gsDivi', className : "htCenter", width: 120, wordWrap: false, readOnly:true},
		{data : 'stdGname1', className : "htCenter", width: 120, wordWrap: false, readOnly:true},
		{data : 'taxUsgUsd', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'gsRate', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'upiTax', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'gsRmvRate', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'ranTaxSum', className: 'htRight', width: 120, wordWrap: false, readOnly:true},
		
		{data : 'sil', className : "htLeft", width: 120, wordWrap: false, readOnly:true},
		{data : 'rgCode', className : "htCenter", width: 120, wordWrap: false, readOnly:true},
		{data : 'impGname1', className : "htCenter", width: 120, wordWrap: false, readOnly:true},
		{data : 'qty', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'ut', className : "htCenter", width: 120, wordWrap: false, readOnly:true },
		{data : 'upi', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		{data : 'amt', className : "htRight", width: 120, wordWrap: false, readOnly:true},
		
	] ;
}

function fn_impDetailTableHeader(){
	var tableType = $("input:radio[name=importViewType]:checked").val();
	this.impDetailHeader = [
		"신고번호", "신고일자", "수리일자", "수입자상호", "납세자상호", "무역거래처상호", "B/L번호", "인도조건", "결제통화단위", "입력결제금액", "계산된운임원화", "계산된보험료원화",
		"총포장수량", "포장수량단위", "총중량", "중량단위", "관세", "개소세", "교통세", "주세", "내국세", "교육세", "농특세", "부가세", "총세액",
		
		"란번호", "세번부호", "세율구분", "거래품명", "란결제금액", "관세실행세율", "면세관세", "경감관세", "란총세액",
		
		"행번호", "자재코드", "규격", "수량_1", "수량단위_1", "단가", "금액"
	 ] ;
}

function impDetailExcelDown() {
	if (isProgressing) {
        return;
    }
	resetProgressBar();
    var impDetailDate = $("#impDetailDate").val();
    var impDetailDate2 = $("#impDetailDate2").val();

    var today = new Date();
    today.setHours(0, 0, 0, 0); // 날짜만 비교

    var impDetailDateObj = new Date(impDetailDate);
    var impDetailDate2Obj = new Date(impDetailDate2);

    if (impDetailDateObj > today || impDetailDate2Obj > today) {
        alert(msgDetailExcelDown); // "상세 Excel 다운로드는 이전 날짜까지만 선택 가능합니다."
        return;
    }

    var type = $("input:radio[name=importView_srch1]:checked").val();
    var data = fn_setImportViewForm();

    var exTitArr = [];
    var exTit = "";
    var exColArr = [];
    var exCol = "";
    var exTitDivArr = [];
    var exTitDiv = "";
    
    let impDetailCol = new fn_impDetailTableCol();
    let impDetailHeader = new fn_impDetailTableHeader();

    exColArr.push(fn_getExcelCol(impDetailCol.impDetailCol));
    exTitArr.push(fn_getExcelHead(impDetailHeader.impDetailHeader));

    exCol = exColArr.join("|||");
    exTit = exTitArr.join("||||");
    exTitDiv = "1|수입신고상세현황";

    var parameters = { exCol: "", exTit: "", exTitDiv: "", exType: "", srch40: "" };

    $.each(fn_setImportViewForm(), function(attrName, attrValue) {
        parameters[attrName] = attrValue;
    });

    parameters.exCol = exCol.replace(/ /g, "_");
    parameters.exTit = exTit.replace(/ /g, "_");
    parameters.exTitDiv = exTitDiv.replace(/ /g, "_");
    parameters.exType = type;
    parameters.srch40 = "수입신고상세현황";
    parameters.srch1 = $("#impDetailDate").val();
    parameters.srch2 = $("#impDetailDate2").val();
    parameters.srch3 = $("#impDetailDateType option:selected").val();
    
    // --------------------
    isProgressing = true;
    impDetailProgressBar(); 

    $.ajax({
        url: "/import/impDetailExcelDown.do",
        data: parameters,
        type: 'POST',
        cache: false,
        xhrFields: {responseType: "blob"},
        success: function(blob, status, xhr) {
        	
        	try {
                var fileName = "";
                var disposition = xhr.getResponseHeader("Content-Disposition");

                if (disposition && disposition.indexOf("attachment") !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);

                    if (matches != null && matches[1]) {
                        fileName = decodeURI(matches[1].replace(/['"]/g, ""));
                    }
                }

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName);
                } else {
                    var URL = window.URL || window.webkitURL;
                    var downloadUrl = URL.createObjectURL(blob);

                    if (fileName) {
                        var a = document.createElement("a");
                        if (a.download === undefined) {
                            window.location.href = downloadUrl;
                        } else {
                            a.href = downloadUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                        }
                    } else {
                        window.location.href = downloadUrl;
                    }
                }
                $('#impDetailViewListPopUp').modal("hide");
                resetProgressBar();
                isProgressing = false;
            } catch (e) {
                fn_loading(false);
            }
            isProgressing = false;
            
        },
        error: function(e, textStatus, errorThrown) {
            if (e.status == 400) {
                alert("Your request has expired. Please log back in if you wish to continue.");
                location.href = document.referrer;
            } else {
                console.log(errorThrown);
            }
        }
    });
}


function fn_calcPercentage(jobCnt, totalCnt, intervalId) {
	var percent = Math.round(jobCnt / totalCnt * 100, 2);
   
	updateProgressBar(percent);

	if (jobCnt === 0 && totalCnt === 0){
		clearInterval(intervalId); 
	}
   
	if (percent === 100) {
        clearInterval(intervalId);
    }
}

function impDetailProgressBar(){
	if (!isProgressing) {
        return;
    }
	var pData = {};
	
	var intervalId = setInterval(function() {
		if (!isProgressing) {
	        clearInterval(intervalId);
	        return;
	    }
		$.ajax({
			type : "POST",
			url : "/import/selectImpDetailProgress.do",
			data : JSON.stringify(pData), 
			contentType: "application/json", 
			dataType: "json",
			success : function(data) {
				if(data.resultList.length > 0){
					fn_calcPercentage(data.resultList[0].jobCnt, data.resultList[0].totalCnt, intervalId)	
				}
			},
			error : function(e, textStatus, errorThrown) {
				if(e.status == 400){
					alert("Your request is up. Please log back in if you wish continue");
					location.href = document.referrer;
				} else {
					console.log(errorThrown);
					alert(msgSearchError);
				}
			}
		});
	}, 1000);
}

function updateProgressBar(percent) {
    $('#progressBar').css({
        'width': percent + '%', 
        'background-color': '#2d7e62'
    });
    $('#progressBar').text(Math.round(percent) + '%');
}

/*function resetProgressBar() {
    $('#progressBar').css({
        'width': '0%', 
        'background-color': '#2d7e62',
        'transition': 'none'
    });
    $('#progressBar').text('0%');
    setTimeout(function() {
        $('#progressBar').css('transition', 'width 0.3s ease');
        var today = new Date();
        var fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);
        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        
        var mtoday = fiveDaysAgo.toISOString().substring(0, 10);
        var yesterDay = yesterday.toISOString().substring(0, 10);
        
        $("#impDetailDate").val(mtoday);
        $("#impDetailDate2").val(yesterDay);
    }, 50);
}*/

function resetProgressBar() {
	$('#progressBar').css({
		'width': '0%', 
		'background-color': '#2d7e62',
		'transition': 'none'
	});
	$('#progressBar').text('0%');
	setTimeout(function() {
		$('#progressBar').css('transition', 'width 0.3s ease');
	}, 50);
}

function dateDeadLine(inputElement) {
    if (inputElement._flatpickr) {
        inputElement._flatpickr.open();
        return;
    }

    var today = new Date();
    var calendar1 = new Date(today);
    calendar1.setDate(today.getDate() - 6);
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    var defaultDate = calendar1.toISOString().split('T')[0];
    var maxDate = yesterday.toISOString().split('T')[0];

    flatpickr(inputElement, {
        maxDate: maxDate,
        disableMobile: true,
        defaultDate: defaultDate,
        onOpen: function () {
            setTimeout(() => applyCustomStyles(inputElement), 0);
        },
        onMonthChange: function () {
            setTimeout(() => applyCustomStyles(inputElement), 0);
        },
        onYearChange: function () {
            setTimeout(() => applyCustomStyles(inputElement), 0);
        },
        onClose: function () {
            inputElement.blur();
        }
    });

    inputElement._flatpickr.open();

    function applyCustomStyles(inputElement) {
        const calendar = inputElement._flatpickr.calendarContainer;
        if (calendar) {
        	calendar.style.padding = '6px';
            const days = calendar.querySelectorAll('.flatpickr-day');
            days.forEach(day => {
                day.style.width = '24px';
                day.style.height = '24px';
                day.style.fontSize = '13px';
                day.style.lineHeight = '24px';
            });

            const selectedDay = calendar.querySelector('.flatpickr-day.selected');
            if (selectedDay) {
                selectedDay.style.borderRadius = '0';
            }

            const weekdayContainer = calendar.querySelector('.flatpickr-weekdaycontainer');
            if (weekdayContainer) {
                weekdayContainer.style.backgroundColor = '#e8e8e8';
                weekdayContainer.style.borderBottom = '1px solid #dee2e6';
                weekdayContainer.style.padding = '5px 0';

                const weekdays = weekdayContainer.querySelectorAll('.flatpickr-weekday');
                weekdays.forEach(weekday => {
                    weekday.style.color = '#6c757d';
                    weekday.style.fontSize = '12px';
                    weekday.style.fontWeight = 'bold';
                });
            }
            
            const disabledDays = calendar.querySelectorAll('.flatpickr-day.flatpickr-disabled');
            disabledDays.forEach(day => {
                day.style.pointerEvents = 'none';
                // 삼각형 커서
                day.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 16 16%22%3E%3Cpolygon points=%220,0 16,0 8,16%22 fill=%22black%22 /%3E%3C/svg%3E") 8 8, auto'; 
            });
        }
    }
}

function dateDeadLine2(inputElement) {
    dateDeadLine(inputElement);
}
