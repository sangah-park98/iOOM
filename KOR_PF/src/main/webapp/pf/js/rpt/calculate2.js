var calculateHot;
var calculateSettings;
var calculatePopupSettings;
var calculateIndex = 9999;
var calculateScrollTp = true;

var calculateDetailHot;
var calculateDetailSettings;

/*var calculateDetailHot2;
var calculateDetailSettings2;*/
var partnCmpnyNm = "";
var colCount = 0;
var excelUploadHot;
var selectedList = {};
var callBackList = [];

$( document ).ready(function() {
	
	  //달력 사용시 반드시 넣어주세요.
      $('.band-calendar').each(function(){ regCal(this) ;})
	  //캘린더 포맷
      $('.datepicker').datepicker("option","dateFormat",calFormat);

	  	var date = new Date();
		var month = date.getMonth();
		var dayday = date.getDate();
		var day = date.getDay();
		
		var today = new Date().toISOString().substring(0,10);
		var mtoday = new Date(new Date().setDate(dayday - day)).toISOString().substring(0,10);
	  
	  $("#calculate_srch2").val(mtoday);
	  $("#calculate_srch3").val(today);
	  
	  var calculateElement = document.querySelector('#calculateTable');
	  var calculateElementContainer = calculateElement.parentNode;

	  calculateHot = new Handsontable(calculateElement, calculateSettings);
	  
	  var calculateDetailElement = document.querySelector('#calculateDetailTable');
	  var calculateDetailElementContainer = calculateDetailElement.parentNode;
	  calculateDetailSettings = fn_handsonGridCalDetailOption();
	  calculateDetailHot = new Handsontable(calculateDetailElement, calculateDetailSettings);
	  
	 /* var calculateDetailElement2 = document.querySelector('#calculateDetailTable2');
	  var calculateDetailElementContainer2 = calculateDetailElement2.parentNode;
	  calculateDetailSettings2 = fn_handsonGridCalDetailOption2();
	  calculateDetailHot2 = new Handsontable(calculateDetailElement2, calculateDetailSettings2);*/

	  $("#calculate_div1").show();
	  $("#calculate_div2").show();
	  $("#calculate_div3").hide();
	  $("#calculate_div4").hide();
	  $("#btnCalculViewSave").hide();
	  $("#calculateInfo1").hide();
	  $("#calculateInfo2").hide();
	  $("#btnCalculateViewSave").hide();
	  fn_changeCalculView('read');
	  //fn_searchcalculateDetailView2();
	  //fn_searchCalView();
	 
	  //scroll 이벤트
	 // fn_calculateasEventReg();
	 // calculateUseEventReg();
	  
	  $("#calculTextView").text("전체");
	  $("#calculTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	  
	  /*var excelUploadPopupElement = document.querySelector('#excelUploadPopUpTable');
	  var excelUploadPopupElementContainer = excelUploadPopupElement.parentNode;
	  excelUploadPopupSettings = fn_handsonGridexcelUploadPopupOption();
	  excelUploadHot = new Handsontable(excelUploadPopupElement, excelUploadPopupSettings);*/
	  
});
/** 이벤트 Start **/

$(document).mousedown(function(e){	
	if(e.target.name == "calculate1_date" || e.target.name == "calculate2_date"){
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

$("input:radio[name=calculate_srch20]").change(function(){
	$("input[name=calculateType][value=read]").prop("checked", true);
	fn_changeCalculView("read");
})

//검색구분 변경
/*$("input[name=calculate_srch1]").change(function(){

	  fn_changeCalculView($("#calculateType").val());
	  
	  var radioValue = document.querySelector('input[name="calculate_srch1"]:checked').value;
	  if (radioValue === '02') {
	      document.getElementById('blNoLabel').innerText = 'Invoice 번호';
	      document.getElementById('calculate_srch7').placeholder = 'Invoice 번호를 입력해주세요.';
	      document.getElementById('poNoLabel').innerText = 'SO 번호';
	      document.getElementById('calculate_srch9').placeholder = 'SO 번호를 입력해주세요.';
	      $("#calculTextView").text("수출");
	      $("#calculTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	  } else {
		  document.getElementById('blNoLabel').innerText = 'B/L 번호';
		  document.getElementById('calculate_srch7').placeholder = 'B/L 번호를 입력해주세요.';
		  document.getElementById('poNoLabel').innerText = 'PO 번호';
		  document.getElementById('calculate_srch9').placeholder = 'PO 번호를 입력해주세요.';
		  $("#calculTextView").text("전체");
	      $("#calculTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	  }
});*/


//테이블 타입 변경
$("input[name=calculViewType]").change(function(){
	  fn_changeCalculView($(this).val());
});

function fn_calculChgDate1() {
	  var date = new Date();
	  var month = date.getMonth();
	  var dayday = date.getDate();
	  var day = date.getDay();
	  
	  var today = new Date().toISOString().substring(0,10);
	  var mtoday = new Date(new Date().setMonth(month - 1)).toISOString().substring(0,10);
	  
	  $("#calculate_srch2").val(today);
	  $("#calculate_srch3").val(today);
}

function fn_calculChgDate2() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setDate(dayday - day)).toISOString().substring(0,10);
	
	$("#calculate_srch2").val(mtoday);
	$("#calculate_srch3").val(today);
}
function fn_calculChgDate3() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setDate(dayday - dayday + 1)).toISOString().substring(0,10);
	
	$("#calculate_srch2").val(mtoday);
	$("#calculate_srch3").val(today);
}
function fn_calculChgDate4() {
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
	
	$("#calculate_srch2").val(today);
	$("#calculate_srch3").val(mtoday);
}

//정렬항목
/*$("select[name=alignImportView]").change(function(){
	  fn_searchImportView();
});
*/

function fn_setCalculView(){
	var sData = {};
	sData["srch1"] = $("input:radio[name=calculate_srch1]:checked").val(); //srch1: 검색구분
	sData["srch2"] = $("input[name=calculate1_date]").val(); // srch7: 신고일자 처음
	sData["srch3"] = $("input[name=calculate2_date]").val(); // srch8: 신고일자 끝
	sData["srch6"] = $("#calculate_srch6").val();
	sData["srch7"] = $("#calculate_srch7").val();
	sData["srch8"] = $("#calculate_srch8").val();
	sData["srch9"] = $("#calculate_srch9").val();
	sData["srch10"] = $("input:radio[name=calculViewType]:checked").val();
	sData["srch33"] = $("#calculate_day option:selected").val(); // srch33: 신고일자 select
	
	sData["recordCountPerPage"] = $("#calculatePageCnt option:selected").val();
	
	// console.log(sData);
	
	return sData;
};


//이체정보 편집 view
/*function fn_searchBankInsertView(){
	
	fn_loading(true);
	
	var sData = fn_setCalculView();
	
	
	$.ajax({
		type : "POST",
		url : "/rpt/bankEditView.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        	//calculateHot.loadData([]);
        	//calculateDetailHot.loadData([]);
        	calculateDetailHot2.loadData([]);
        	calculateDetailHot2.loadData(data.resultList);
        	var totCnt = (data.resultList.length > 0) ? data.resultList.length : 0;
        	console.log("data"+data.resultList.length);
        	console.log("totCnt"+totCnt);
        	$("#calculateCnt").text(totCnt); //검색결과 총 갯수
        	
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


//이체정보
function fn_searchcalculateDetailView2(){
	
	fn_loading(true);
	
	
	var sData = fn_setCalculView();
	sData["srch1"] = $("input:radio[name=calculate_srch1]:checked").val(); //srch1: 검색구분
	sData["srch2"] = $("input[name=calculate1_date]").val(); // srch7: 신고일자 처음
	sData["srch3"] = $("input[name=calculate2_date]").val(); // srch8: 신고일자 끝
	sData["srch33"] = $("#calculate_day option:selected").val(); // srch33: 신고일자 select
	
	//console.log(sData);
	
	$.ajax({
		type : "POST",
		url : "/rpt/bankinoutView.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        	//calculateHot.loadData([]);
        	//calculateDetailHot.loadData([]);
        	calculateDetailHot2.loadData([]);
        	calculateDetailHot2.loadData(data.resultList);
        	var totCnt = (data.resultList.length > 0) ? data.resultList.length : 0;
        	console.log("data"+data.resultList.length);
        	console.log("totCnt"+totCnt);
        	$("#calculateCnt").text(totCnt); //검색결과 총 갯수
        	
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
};*/

function fn_searchCalView(){
	fn_searchCalViewInfo();
	fn_searchCalDetailView();
	// fn_searchcalculateDetailView2();
}

//검색 버튼 클릭 시 호출되는 함수
function fn_searchCalViewInfo(){
	fn_loading(true);
	var sData = fn_setCalculView();
	var tableType = $("input:radio[name=calculViewType]:checked").val();
	//console.log(sData);
	//console.log("sData",sData);
	$.ajax({
		type : "POST",
		url : "/rpt/selectCalculInfo2.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        	calculateHot.loadData([]);
        	calculateDetailHot.loadData([]);
        	//calculateDetailHot2.loadData([]);
        	calculateHot.loadData(data.resultList);
        	if(tableType !== 'edit'){
	        	// 중복된 BL 값 걸러내기
	        	const blNoSet = new Set(data.resultList.map(item => item.blNo)); // Set을 사용하여 중복 제거
	        	var blNoCount = blNoSet.size; // 고유한 B/L No.의 갯수
	        	//console.log("blNoCount"+blNoCount);
	        	
	        	// 'clearFee','inlandFee',`supAmt`, `taxAmt`, `totAmt` 합계를 계산
	        	const sumClearFee = data.resultList.reduce((total, item) => total + (parseFloat(item.clearFee) || 0), 0);
	        	const sumShippingFee = data.resultList.reduce((total, item) => total + (parseFloat(item.shippingFee) || 0), 0);
	        	const sumFareFee = data.resultList.reduce((total, item) => total + (parseFloat(item.fareFee) || 0), 0);
	        	const sumWareFee = data.resultList.reduce((total, item) => total + (parseFloat(item.wareFee) || 0), 0);
	        	const sumEtcFee = data.resultList.reduce((total, item) => total + (parseFloat(item.etcFee) || 0), 0);
	        	const sumSupplyAmount = data.resultList.reduce((total, item) => total + (parseFloat(item.supplyAmount) || 0), 0);
	        	const sumTotalVat = data.resultList.reduce((total, item) => total + (parseFloat(item.totalVat) || 0), 0);
	        	const sumTotalAmount = data.resultList.reduce((total, item) => total + (parseFloat(item.totalAmount) || 0), 0);
	
	        	
	        	// 합계 행 설정
	        	var sumRow = {
	        				partnCmpny: "TOTAL", // Summary label
	        			    blNo: "",
	        			    rptNo: "",
	        			    rptDay: "",
	        			    lisDay: "",
	        			    clearFee: sumClearFee.toLocaleString(),
	        			    shippingFee: sumShippingFee.toLocaleString(),
	        			    fareFee: sumFareFee.toLocaleString(),
	        			    wareFee: sumWareFee.toLocaleString(),
	        			    etcFee: sumEtcFee.toLocaleString(),
	        			    supplyAmount: sumSupplyAmount.toLocaleString(),
	        			    calculVat: "",
	        			    totalVat: sumTotalVat.toLocaleString(),
	        			    totalAmount: sumTotalAmount.toLocaleString(), 
	        			    end: ""
	                };
	
	        	// 합계 행을 데이터 리스트에 추가
	            data.resultList.push(sumRow); // sumRow를 resultList에 추가
	            // 새 데이터를 Handsontable에 로드
	            calculateHot.loadData(data.resultList); // 새 데이터로 테이블 업데이트
	            
	            // 합계 행 스타일 설정 (예: 중앙 정렬)
	            const lastRowIndex = data.resultList.length - 1; // 마지막 행 인덱스
	            
	            calculateHot.updateSettings({
	                mergeCells: [
	                    { row: lastRowIndex, col: 1, rowspan: 1, colspan: 5 } // rptNo부터 description까지 열을 병합
	                ]
	            });
	            calculateHot.setCellMeta(lastRowIndex, 0, 'className', 'htCenter boldText');
	            calculateHot.setCellMeta(lastRowIndex, 1, 'className', 'htCenter boldText');
	            calculateHot.setCellMeta(lastRowIndex, 6, 'className', 'boldText htRight');  
	            calculateHot.setCellMeta(lastRowIndex, 7, 'className', 'boldText htRight');  
	            calculateHot.setCellMeta(lastRowIndex, 8, 'className', 'boldText htRight');  
	            calculateHot.setCellMeta(lastRowIndex, 9, 'className', 'boldText htRight');  
	            calculateHot.setCellMeta(lastRowIndex, 10, 'className', 'boldText htRight'); 
	            calculateHot.setCellMeta(lastRowIndex, 11, 'className', 'boldText htRight'); 
	            calculateHot.setCellMeta(lastRowIndex, 12, 'className', 'boldText htRight'); 
	            calculateHot.setCellMeta(lastRowIndex, 15, 'className', 'boldText htRight'); 
	            calculateHot.setCellMeta(lastRowIndex, 16, 'className', 'boldText htRight'); 
	            
	            // 테이블 렌더링
	            calculateHot.render();
        	}
        	var totCnt = (data.resultList.length > 0) ? data.resultList.length : 0;
        	if(tableType == 'read'){
        		var displayCnt = (totCnt - 1 >= 0) ? totCnt - 1 : 0; // 값이 -1이면 0으로 설정
            	$("#calculateCnt").text(displayCnt); //검색결과 총 갯수
        	}else{
        		$("#calculateCnt").text(totCnt);
        	}
        	
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


//검색 버튼 클릭 시 호출되는 함수
function fn_searchCalDetailView(partnCmpny){
	
	//fn_loading(true);
	
	//console.log(partnCmpny);

	//calculateIndex = 0;
	var sData = {};
	
	sData["srch1"] = partnCmpny;
	sData["srch2"] = $("input[name=calculate1_date]").val(); // srch7: 신고일자 처음
	sData["srch3"] = $("input[name=calculate2_date]").val(); // srch8: 신고일자 끝
	sData["srch33"] = $("#calculate_day option:selected").val(); // srch33: 신고일자 select
	
	//console.log("sData",sData);
	
	
	$.ajax({
		type : "POST",
		url : "/rpt/selectCalculDetailInfo2.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
		success : function(data) {
			//console.log(data,"data");
			//calculateHot.loadData([]);
        	calculateDetailHot.loadData([]);
        	//calculateDetailHot2.loadData([]);
			calculateDetailHot.loadData(data.resultList);
		
				// 중복된 BL 값 걸러내기
	        	const blNoSet2 = new Set(data.resultList.map(item => item.blNo)); // Set을 사용하여 중복 제거
	        	var blNoCount2 = blNoSet2.size; // 고유한 B/L No.의 갯수
	        	//console.log("blNoCount2"+blNoCount2);
	        	
	        	const sumFareFee = data.resultList.reduce((total, item) => total + (parseFloat(item.fareFee) || 0), 0);
	        	const sumFareFeeVat = data.resultList.reduce((total, item) => total + (parseFloat(item.fareFeeVat) || 0), 0);
	        	const sumTotalAmount = data.resultList.reduce((total, item) => total + (parseFloat(item.totalAmount) || 0), 0);
	        	
	        	// 합계 행 설정
	        	var sumRow2 = {
	        			partnCmpny: "TOTAL", // Summary label
	        			blNo: blNoCount2 + "건", // Unique B/L No. count
	        			rptNo : "",
	        			fareFee: sumFareFee.toLocaleString(),  
	        			fareFeeVat: sumFareFeeVat.toLocaleString(), 
	        			totalAmount: sumTotalAmount.toLocaleString(), 
	                };
	        	
	        	// 합계 행을 데이터 리스트에 추가
	            data.resultList.push(sumRow2); // sumRow를 resultList에 추가
	            // 새 데이터를 Handsontable에 로드
	            calculateDetailHot.loadData(data.resultList); // 새 데이터로 테이블 업데이트
		
            // 합계 행 스타일 설정 (예: 중앙 정렬)
            const lastRowIndex2 = data.resultList.length - 1; // 마지막 행 인덱스
            calculateDetailHot.updateSettings({
                mergeCells: [
                    { row: lastRowIndex2, col: 1, rowspan: 1, colspan: 3 } // rptNo부터 description까지 열을 병합
                ]
            });
            calculateDetailHot.setCellMeta(lastRowIndex2, 0, 'className', 'htCenter boldText'); 
            calculateDetailHot.setCellMeta(lastRowIndex2, 1, 'className', 'htCenter boldText'); 
            //calculateDetailHot.setCellMeta(lastRowIndex2, 1, 'className', 'htCenter boldText');
            calculateDetailHot.setCellMeta(lastRowIndex2, 7, 'className', 'boldText htRight');  // supAmt 열
            calculateDetailHot.setCellMeta(lastRowIndex2, 8, 'className', 'boldText htRight');  // taxAmt 열
            calculateDetailHot.setCellMeta(lastRowIndex2, 15, 'className', 'boldText htRight');  // totAmt 열
            
            // 테이블 렌더링
            calculateDetailHot.render();
            var totCnt = (data.resultList.length > 0) ? data.resultList.length : 0;
        	$("#forwardCnt").text(totCnt-1); //검색결과 총 갯수
			
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

//비용체크박스 
function fn_CalculAllClick(){
	var check = "" ;
	var changeArr = [];
	if ( $("#id_checkCalculAll").prop("checked") == false) {
		check = "yes" ;
	} else {
		check = "no" ;
	}

	var data = calculateHot.getData();

	for(var i=0; i< data.length; i++){
		changeArr.push([i,0,check])
	}
	calculateHot.setDataAtCell(changeArr);
	if(check == "yes"){
		$("#id_checkCalculAll").prop("checked", true);
	} else {
		$("#id_checkCalculAll").prop("checked", false);
	}
}

//포워더체크박스 
function fn_ForwardAllClick(){
	var check = "" ;
	var changeArr = [];
	if ( $("#id_checkForwardAll").prop("checked") == false) {
		check = "yes" ;
	} else {
		check = "no" ;
	}

	var data = calculateDetailHot.getData();

	for(var i=0; i< data.length; i++){
		changeArr.push([i,0,check])
	}
	calculateDetailHot.setDataAtCell(changeArr);
	if(check == "yes"){
		$("#id_checkForwardAll").prop("checked", true);
	} else {
		$("#id_checkForwardAll").prop("checked", false);
	}
}


//row 수
$("select[name=calculatePageCnt]").change(function(){
	fn_searchCalView();
});


// 스크롤할 때 행이 자동으로 추가 로드될 수 있게 하는 함수
function fn_calculateasEventReg(){
 $("#calculateTable .wtHolder").scroll(function(){
	  	  var scrollTop = $("#calculateTable .wtHolder").scrollTop();
	  	  var countPerPage = $("#calculatePageCnt option:selected").val();
	  	  var rowHeight = calculateHot.getRowHeight();
	  	  console.log("scrollTop"+scrollTop);
	  	  console.log("countPerPage"+countPerPage);
	  	  console.log("rowHeight"+rowHeight);
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
	  	  if(calculateScrollTp && calculateIndex != 9999 && scrollTop >= (countPerPage * calculateIndex * rowHeight) + addCnt){
	  		  fn_calculateScroll();
	  	  }
	  });

}


//스크롤
function fn_calculateScroll(){
	if( $("input[name=calculateType]:checked").val() == "enrol")
		return;
	fn_loading(true);
	calculateScrollTp = false;
	calculateIndex++;
	var sData = fn_setCalculView();
	
	$.ajax({
		type : "POST",
		url : "/rpt/selectCalculInfo2.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        	var getData = calculateHot.getSourceData();
        	var meargeJson = getData.concat(data.resultList);
        	calculateHot.loadData(meargeJson);
        	calculateScrollTp = true;
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
}


//Popup 테이블 스크롤
function calculateUseEventReg(){
	$("#popUsedTable .wtHolder").scroll(function(){
	  fn_popUsedStories(row, col)
	  var data = exportViewHot.getSourceData();
	  var scrollTop = $("#popUsedTable .wtHolder").scrollTop();
	  var countPerPage = 50;
	  var rowHeight = jdgmntUsageHot.getRowHeight();
	  var addCnt = 790;

//	  var addCnt = 790;
//	  if(countPerPage == "50"){
//		  addCnt = 790;
//	  }else if(countPerPage == "100"){
//		  addCnt = 2040;
//	  }else if(countPerPage == "200"){
//		  addCnt = 3290;
//	  }else if(countPerPage == "500"){
//		  addCnt = 4540;
//	  }

	  if(calculatePopScrollTp && calculateIndex != 9999 && scrollTop >= (countPerPage * calculateIndex * rowHeight) + addCnt){
		  fn_calculatePopScroll(data[row]);
	  }
});

}


function enterkey() {
	if (window.event.keyCode == 13) {
		fn_searchCalView();
    }
}


//검색조건 초기화
function fn_clearCalView(){
	
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	  
	var today = new Date().toISOString().substring(0,10);
	var mtoday = new Date(new Date().setDate(dayday - 6)).toISOString().substring(0,10);
	
	$("#calculate_srch2").val(mtoday);
	$("#calculate_srch3").val(today);
	$("#calculate_srch4").val("");
	$("#calculate_srch5").val("");
	$("#calculate_srch6").val("");
	$("#calculate_srch7").val("");
};


//테이블 컬럼
function fn_calculateTableCol(){
	
	var itemPkNoneEdit = function(instance, td, row, col, prop, value, cellProperties) {
	    // Handsontable 기본 셀 스타일 적용
	    Handsontable.renderers.TextRenderer.apply(this, arguments);

	    // 숫자 형식화 (value가 숫자인 경우)
	    var formattedValue = value;
	    if (typeof value === 'number') {
	        formattedValue = Handsontable.helper.stringify(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	    }

	    // 스타일 및 내용 설정
	    $(td)
	        .empty()
	        .css("background-color", "#E6E6E6")
	        .css("text-align", "center")
	        .text(formattedValue);
	};
	
	var tableType = $("input:radio[name=calculViewType]:checked").val();
	
	
	var paymentYnRenderer = function (instance, td, row, col, prop, value, cellProperties) {
		
		// 합계 행일 경우에는 빈 값을 표시
	    if (row === instance.countRows() - 1) { // 마지막 행이 합계 행이라고 가정
	        $(td).empty().text(''); // 빈 텍스트로 설정
	        return; // 나머지 렌더링 작업을 하지 않음
	    }
	    
		
	    var $paymentYnSelect = $('<select class="row-start-2 col-start-2 bg-gray-50 border border-gray-300 rounded-lg" id="paymentYn' + row + '" style="height:50px; width:80px; text-align: center; line-height: 25px;">' +
	        '<option value="N"' + (value === 'N' ? ' selected' : '') + '>N</option>' +
	        '<option value="Y"' + (value === 'Y' ? ' selected' : '') + '>Y</option>' +
	        '</select>');
	    
	    var $paymentButton = $('<button type="button" onclick="fn_paymentSave(' + row + ',' + col + ')" class="save-button p-0.5 text-sm rounded text-white hover:opacity-50 duration-150 bg-rose-700 ml-1 hover:bg-rose-500">저장</button>');
	    
	    // Empty and setup td with flexbox for centering
	    $(td).empty().css({
	    	"display": "flex",
	         "flex-direction": "row",         // 가로로 배치
	         "justify-content": "center",     // 가운데 정렬
	         "align-items": "center",         // 세로 정렬
	         "text-align": "center",
	         "gap": "5px",                    // 요소 간의 간격
	         "padding": "0",                  // 패딩 제거
	         "height": "100%",                // 셀의 전체 높이에 맞추기
	    }).append($paymentYnSelect).append($paymentButton);

	    // Style the select element
	    $paymentYnSelect.css({
	    	'font-family': '맑은 고딕',
	         'font-size': '13px',
	         'border-radius': '5px',
	         'margin': '0',
	         'padding': '0',                  // 패딩 제거
	         'height': '25px',                // 높이 조정
	         'line-height': '25px',           // 텍스트 수직 중앙 정렬
	    });

	    // Style the button
	    $paymentButton.css({
	        'font-family': '맑은 고딕',
	        'font-size': '13px',
	        'border-radius': '7px'   
	    });

	    // Set the select value
	    $paymentYnSelect.val(value);
	};
	
		//console.log("tableType"+tableType);
		this.calculateCol = (tableType == "edit") ? [
			{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
			{data : 'partnCmpny', type : 'text',className : "htCenter", width: 150, className : "htCenter"},
			{data : 'blNo',type : 'text', className : "htCenter", width: 150,readOnly: true, renderer:itemPkNoneEdit},
			{data : 'rptNo', type : 'text',className : "htCenter", width: 150,readOnly: true, renderer:itemPkNoneEdit},
			{data : 'rptDay', type : 'text',className : "htCenter", width: 150,readOnly: true, renderer:itemPkNoneEdit},
			{data : 'lisDay', type : 'text',className : "htCenter", width: 150,readOnly: true, renderer:itemPkNoneEdit},
			// 통관수수료
			{data : 'clearFee', width: 150, type : 'numeric', className : "htRight", readOnly: true, renderer:itemPkNoneEdit, numericFormat : {pattern : '0,0'}},
			{data : 'taxEk', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			//내룩운송료
			{data : 'shippingFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'fareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, editor: 'numeric'},
			{data : 'fareFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, editor: 'numeric'},
			{data : 'wareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, editor: 'numeric'},
			{data : 'wareFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, editor: 'numeric'},
			{data : 'etcFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, editor: 'numeric'},
			{data : 'etcFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, editor: 'numeric'},
			{data : 'supplyAmount', width: 150, type : 'numeric', className : "htRight",readOnly: true,renderer:itemPkNoneEdit,numericFormat : {pattern : '0,0'}},
			{data : 'calculVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'vat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'totalVat', width: 150, type : 'numeric', className : "htRight", renderer:itemPkNoneEdit,readOnly: true,numericFormat : {pattern : '0,0'}},
			{data : 'totalAmount', width: 150, type : 'numeric', className : "htRight",readOnly: true,renderer:itemPkNoneEdit, numericFormat : {pattern : '0,0'}},
			{data : 'end', className : "htCenter", width: 50, className : "htCenter", readOnly:true}
			] : 
			(tableType == "enrol") ? [
				{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
			{data : 'partnCmpny', type : 'text',className : "htCenter", width: 150, className : "htCenter"},
			{data : 'blNo',type : 'text', className : "htCenter", width: 150,},
			{data : 'rptNo', type : 'text',className : "htCenter", width: 150,},
			{data : 'rptDay', type : 'text',className : "htCenter", width: 150,},
			{data : 'lisDay', type : 'text',className : "htCenter", width: 150,},
			// 통관수수료
			{data : 'clearFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'},readOnly: true, renderer:itemPkNoneEdit},
			{data : 'taxEk', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			//내룩운송료
			{data : 'shippingFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'fareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'wareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'etcFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'supplyAmount', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'calculVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'vat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'totalVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'totalAmount', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, renderer:itemPkNoneEdit},
			{data : 'end', className : "htCenter", width: 50, className : "htCenter", readOnly:true, renderer:itemPkNoneEdit}
			] : 
			[
			{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
			{data : 'partnCmpny', className : "htCenter", width: 150, readOnly:true},
			{data : 'blNo', className : "htCenter", width: 150, readOnly:true},
			{data : 'rptNo', className : "htCenter", width: 150,  readOnly:true},
			{data : 'rptDay', className : "htCenter", width: 150,  readOnly:true},
			{data : 'lisDay', className : "htCenter", width: 150, readOnly:true},
			// 통관수수료
			{data : 'clearFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'taxEk', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			//내룩운송료
			{data : 'shippingFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'fareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'wareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'etcFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'supplyAmount', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'calculVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'vat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'totalVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'totalAmount', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
			{data : 'end', className : "htCenter", width: 50, className : "htCenter", readOnly:true}
			];
}


// 엑셀 컬럼
function fn_calculateTableExcelCol(){
	
		this.calculateExcelCol =  [
			{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
			{data : 'partnCmpny', type : 'text',className : "htCenter", width: 150, className : "htCenter"},
			{data : 'blNo',type : 'text', className : "htCenter", width: 150,readOnly: true},
			{data : 'rptNo', type : 'text',className : "htCenter", width: 150,readOnly: true},
			{data : 'rptDay', type : 'text',className : "htCenter", width: 150,readOnly: true},
			{data : 'lisDay', type : 'text',className : "htCenter", width: 150,readOnly: true},
			// 통관수수료
			{data : 'clearFee', width: 150, type : 'numeric', className : "htRight", readOnly: true, numericFormat : {pattern : '0,0'}},
			{data : 'taxEk', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			//내룩운송료
			{data : 'shippingFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'fareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'fareFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'wareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'wareFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'etcFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'etcFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'supplyAmount', width: 150, type : 'numeric', className : "htRight",readOnly: true,numericFormat : {pattern : '0,0'}},
			{data : 'calculVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'vat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}},
			{data : 'totalVat', width: 150, type : 'numeric', className : "htRight",readOnly: true,numericFormat : {pattern : '0,0'}},
			{data : 'totalAmount', width: 150, type : 'numeric', className : "htRight",readOnly: true,numericFormat : {pattern : '0,0'}},
			{data : 'end', className : "htCenter", width: 50, className : "htCenter", readOnly:true}
			] 
}

//엑셀 헤더
function fn_calculateTableExcelHeader(){
	this.calculateExcelHeader = [
			"","구분","B/LNo.", "신고번호", "신고일자","수리일자", "통관수수료","통관수수료VAT","내륙운송료","운임","운임(VAT)","창고료","창고료(VAT)","기타","기타(VAT)","공급가액","(통관VAT+내륙운송료*0.1)","입력VAT", "VAT", "합계","마감"	
		]; 
}


//테이블 컬럼
function fn_calculateDetailTableCol(){
	  
	var paymentYnRenderer = function (instance, td, row, col, prop, value, cellProperties) {
		 
		// 합계 행일 경우에는 빈 값을 표시
	    if (row === instance.countRows() - 1) { // 마지막 행이 합계 행이라고 가정
	        $(td).empty().text(''); // 빈 텍스트로 설정
	        return; // 나머지 렌더링 작업을 하지 않음
	    }
		
		
		var $paymentYnSelect2 = $('<select class="row-start-2 col-start-2 bg-gray-50 border border-gray-300 rounded-lg" id="paymentYn2' + row + '" style="height:25px; width:80px; text-align: center; line-height: 25px;">' +
	        '<option value="N"' + (value === 'N' ? ' selected' : '') + '>N</option>' +
	        '<option value="Y"' + (value === 'Y' ? ' selected' : '') + '>Y</option>' +
	        '</select>');
	    
	    var $paymentButton2 = $('<button type="button" onclick="fn_paymentSave2(' + row + ',' + col + ')" class="save-button p-0.5 text-sm rounded text-white hover:opacity-50 duration-150 bg-rose-700 ml-1 hover:bg-rose-500">저장</button>');
	    
	    
	    $(td).empty().css({
	    	 "display": "flex",
	         "flex-direction": "row",         // 가로로 배치
	         "justify-content": "center",     // 가운데 정렬
	         "align-items": "center",         // 세로 정렬
	         "text-align": "center",
	         "gap": "5px",                    // 요소 간의 간격
	         "padding": "0",                  // 패딩 제거
	         "height": "100%",                // 셀의 전체 높이에 맞추기
	    }).append($paymentYnSelect2).append($paymentButton2);

	    $paymentYnSelect2.css({
	    	 'font-family': '맑은 고딕',
	         'font-size': '13px',
	         'border-radius': '5px',
	         'margin': '0',
	         'padding': '0',                  // 패딩 제거
	         'height': '25px',                // 높이 조정
	         'line-height': '25px',           // 텍스트 수직 중앙 정렬
	    });

	    $paymentButton2.css({
	        'font-family': '맑은 고딕',
	        'font-size': '13px',
	        'border-radius': '7px'   
	    });

	   
	    $paymentYnSelect2.val(value);
	};
	
	this.calculateDetailCol = [
		{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
		{data : 'partnCmpny', className : "htCenter", width: 150, className : "htCenter", readOnly:true},
		{data : 'blNo', className : "htCenter", width: 150, className : "htCenter", readOnly:true},
		{data : 'rptNo', className : "htCenter", width: 150, className : "htCenter", readOnly:true},
		// 통관수수료
		{data : 'clearFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'taxEk', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		//내룩운송료
		{data : 'inlandFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'fareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'fareFeeVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'wareFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'etcFee', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'supplyAmount', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'calculVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'vat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'totalVat', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'totalAmount', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true},
		{data : 'end', className : "htCenter", width: 50, className : "htCenter", readOnly:true}
		];
}

//테이블 컬럼
function fn_calculateDetailTableCol2(){
	
	var tableType = $("input:radio[name=calculViewType]:checked").val();
	
	this.calculateDetailCol2 =  (tableType == "enrol") ? [
		//{data : 'cmpnyNm', type : 'text', className : "htCenter", width: 60,type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
		{data : 'cmpnyNm', className : "htCenter", className : "htCenter"},
		{data : 'bankNm', className : "htCenter", className : "htCenter"},
		{data : 'accNo', className : "htCenter", className : "htCenter"},
		{data : 'inoutEk', className : "htCenter", className : "htCenter"},
		{data : 'adjType', className : "htCenter", className : "htCenter"},
		//{data : 'adjType', className : "htCenter", className : "htCenter", readOnly:true},
		] : (tableType == "edit") ? [
			{data : 'seq', className : "htCenter", className : "htCenter"},
			{data : 'cmpnyNm', className : "htCenter", className : "htCenter"},
			{data : 'bankNm', className : "htCenter", className : "htCenter"},
			{data : 'accNo', className : "htCenter", className : "htCenter"},
			{data : 'inoutEk', className : "htCenter", className : "htCenter"},
			{data : 'adjType', className : "htCenter", className : "htCenter"},
		] :[
			{data : 'cmpnyNm', className : "htCenter", className : "htCenter", readOnly:true},
			{data : 'bankNm', className : "htCenter", className : "htCenter", readOnly:true},
			{data : 'accNo', className : "htCenter", className : "htCenter", readOnly:true},
			{data : 'inoutEk', className : "htCenter", className : "htCenter", readOnly:true},
			{data : 'adjType', className : "htCenter", className : "htCenter"},
		];
}


function chipRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
	  Handsontable.renderers.BaseRenderer.apply(this, arguments);
	  td.classList.add('chip-cell');
	  td.classList.add('text-center');
	  switch (value) {
	    case "수출":
	      td.innerHTML = `<span class="chip chip-blue">${value}</span>`
	      break
	    case "수입":
	      td.innerHTML = `<span class="chip chip-yellow">${value}</span>`
	      break
	    default:
	      td.innerHTML = ``
	      break
	  }
}


//테이블 헤더
function fn_calculateTableHeader(){
	var tableType = $("input:radio[name=calculViewType]:checked").val();
		/*if($("input:radio[name=calculate_srch1]:checked").val() == '01'){*/
			this.calculateHeader =(tableType == "read")? [
				"","구분","B/LNo.", "신고번호", "신고일자","수리일자", "통관수수료","통관수수료VAT","내륙운송료","운임","창고료","기타","공급가액","(통관VAT+내륙운송료*0.1)","입력VAT", "VAT", "합계","마감"
				]:[
					"","구분","B/LNo.", "신고번호", "신고일자","수리일자", "통관수수료","통관수수료VAT","내륙운송료","운임","운임(VAT)","창고료","창고료(VAT)","기타","기타(VAT)","공급가액","(통관VAT+내륙운송료*0.1)","입력VAT", "VAT", "합계","마감"	
				]; 
		/*}*/
	
}

//테이블 헤더
function fn_calculateDetailTableHeader(){
	
	this.calculateDetailHeader = [
		"","구분","B/LNo.", "신고번호", "통관수수료","통관수수료 VAT","내륙운송료","운임","VAT","창고료","기타","공급가액","(통관 VAT+내륙운송료*0.1)","입력VAT", "VAT", "합계","마감"
		]; 
}

function fn_calculateDetailTableHeader2(){
var tableType = $("input:radio[name=calculateViewType]:checked").val();
	
	this.calculateDetailHeader2 = (tableType == "edit") ? [
		"SEQ","구분", "은행", "계좌번호", "비용","정산"
		] : [
		 "구분", "은행", "계좌번호", "비용","정산"
		]; 
}


//테이블 히든컬럼
function fn_calculateTableHidden(){
	var tableType = $("input:radio[name=calculViewType]:checked").val();
	if(tableType == "edit"){
		this.calculateHidden = [0,7,16,17,20];
		//this.calculateHidden = [0];
	}else{
		this.calculateHidden = [7,13,14,17];
	}
	
}

function fn_calculateDetailTableHidden(){
	var tableType = $("input:radio[name=calculViewType]:checked").val();
		this.calculateDetailHidden = [4,5,6,9,10,11,12,13,14,16];
	
}

function fn_calculateDetailTableHidden2(){
	var tableType = $("input:radio[name=calculateViewType]:checked").val();
	this.calculateDetailHidden2 = [];
	if(tableType == "edit") {
		this.calculateDetailHidden2 = [];
	}
}

//전체 - 대납정보 저장 
function fn_paymentSave(row, col){
var rowData = calculateHot.getSourceDataAtRow(row);
	
	var blNo = rowData.blNo;
	var partnCmpny = rowData.partnCmpny;
	var description = rowData.description;
	var supAmt = rowData.supAmt;
	var taxAmt = rowData.taxAmt;
	var remarks = rowData.remarks;
	var totAmt =  rowData.totAmt;
	var value2 = $("#paymentYn"+row).val();
	
	
	var sData = {};
	sData["srch1"] = blNo;
	sData["srch2"] = partnCmpny;
	sData["srch3"] = description;
	sData["srch4"] = supAmt;
	sData["srch5"] = taxAmt;
	sData["srch6"] = remarks;
	sData["srch7"] = totAmt;
	sData["srch8"] = value2;
	
	/*console.log("sData",sData);
	console.log("sData2"+sData);*/
	
	if(confirm("저장하시겠습니까?")){
		
		$.ajax({
			type : "POST",
			url : "/rpt/savePaymentYn.do",
			data : sData,
			beforeSend : function(xmlHttpRequest){
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			dataType: "json",
			success : function(data) {
				alert('저장되었습니다.')
				//$('input[name="calculateViewType"]:radio[value="read"]').prop('checked',true);
        		//fn_searchCalView(); 
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
	} else {
		return;
	}
}

//요약 - 대납정보 저장 
function fn_paymentSave2(row, col){
var rowData = calculateDetailHot.getSourceDataAtRow(row);
	
	var blNo = rowData.blNo;
	var partnCmpny = rowData.partnCmpny;
	var supAmt = rowData.supAmt;
	var taxAmt = rowData.taxAmt;
	var totAmt =  rowData.totAmt;
	var value2 = $("#paymentYn2"+row).val();
	
	
	var sData = {};
	sData["srch1"] = blNo;
	sData["srch2"] = partnCmpny;
	sData["srch3"] = supAmt;
	sData["srch4"] = taxAmt;
	sData["srch5"] = totAmt;
	sData["srch6"] = value2;
	
	/*console.log("sData",sData);
	console.log("sData2"+sData);*/
	
	if(confirm("저장하시겠습니까?")){
		
		$.ajax({
			type : "POST",
			url : "/rpt/savePaymentYn2.do",
			data : sData,
			beforeSend : function(xmlHttpRequest){
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			dataType: "json",
			success : function(data) {
				alert('저장되었습니다.')
				//$('input[name="calculateViewType"]:radio[value="read"]').prop('checked',true);
				//fn_searchCalView(); 
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
	} else {
		return;
	}
}

//이체정보 저장
function fn_saveBankInsertCheck() {
    var isEmpty = false;
    var invalidCells = [];

    // 모든 셀을 검사하여 값이 비어 있는지 확인
    calculateDetailHot2.getData().forEach(function(row, rowIndex) {
        row.forEach(function(cellValue, colIndex) {
            if (cellValue === null || (typeof cellValue === 'string' && cellValue.trim() === '')) {
                // 빈 값이거나 빈 문자열인 경우
                isEmpty = true;
                invalidCells.push([rowIndex, colIndex]); // 비어 있는 셀의 위치 저장
            }
        });
    });
    // 비어 있는 셀이 있으면 해당 셀을 빨간색으로 표시
    if (isEmpty) {
        invalidCells.forEach(function(cell) {
        	 calculateDetailHot2.setCellMeta(cell[0], cell[1], 'renderer', function(instance, td, row, col, prop, value, cellProperties) {
                 Handsontable.renderers.TextRenderer.apply(this, arguments); // 기본 텍스트 렌더러 적용
                 td.style.backgroundColor = '#ffcccc'; // 빨간색 배경 적용
                 td.style.color = '#000000'; // 검은색 텍스트 적용
             });
         });

        calculateDetailHot2.render(); // 테이블 다시 렌더링
        alert("모든 값을 입력해주세요.");
        return;
    }
    // 값이 모두 있으면 다음 단계로 진행
    fn_saveBankInsert();
}

//이체정보 저장 
function fn_saveBankInsert(){
	if(!confirm("저장하시겠습니까?")){ return;}
	
	var tableType = $("input:radio[name=calculateViewType]:checked").val();
	
	var saveBankCheckData = calculateDetailHot2.getSourceData();
	
	for(var i=0; i<saveBankCheckData.length; i++){
		saveBankCheckData[i]["tableType"] = tableType;
	}
	$.ajax({
		type : "POST",
		url : "/rpt/saveBankCheckData.do",
		data : JSON.stringify(saveBankCheckData),
		contentType: "application/json; charset=utf-8",
        success : function(data) {
        	if(data == "success"){
        		alert("저장되었습니다.");
        		$('input[name="calculateViewType"]:radio[value="read"]').prop('checked',true);
        		fn_searchCalView(); 
        	}
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("Your request is up. Please log back in if you wish continue");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSaveError);
        	}
        }
	});
};
	

//table
function fn_handsonGridCalOption(col, header, hidden){
	var tableType = $("input:radio[name=calculViewType]:checked").val();
	
	calculateSettings = {
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
	  height : 300,
	  rowHeights : 25,
	  columnHeaderHeight : 25,
	  manualRowResize : true,
	  //manualColumnResize : true,
	  manualRowMove : true,
	  manualColumnMove : false,
	  //dropdownMenu : true,
	  copyPaste: true, // 엑셀 복사-붙여넣기 활성화
	  contextMenu : (tableType == "enrol") ? ['row_above', 'row_below', '---------', 'undo', 'redo', 'remove_row'] : false,
	  filters : true,
	  readOnly : (tableType == "read") ? true : false,
	  allowInsertRow : true,
	  allowRemoveRow : true,
	  columnSorting : {indicator : true},
      autoColumnSize : {samplingRatio : 23},
      ergeCells : false,
      wordWrap : true,
      afterGetColHeader: function(col, TH){
      	if(col == 0){
        	TH.innerHTML = "<input type='checkbox'  class='checker' id='id_checkCalculAll' onclick='fn_CalculAllClick();'>";
        }
      } ,
      beforeChange: function(changes, source) {
          if (source === 'edit') {
              for (let i = 0; i < changes.length; i++) {
                  const [row, prop, oldValue, newValue] = changes[i];
                  if (['shippingFee','fareFee', 'fareFeeVat', 'wareFee' , 'wareFeeVat' , 'etcFee' , 'etcFeeVat'].includes(prop) && isNaN(newValue)) {
                      changes.splice(i, 1); // 변경을 제거하여 적용되지 않도록 차단
                      return false;
                  }
              }
          }
      },
      afterOnCellMouseDown: function(event, coords) {
    	    // Handsontable 인스턴스에서 데이터 가져오기
    	    var hotInstance = this; // 'this'가 Handsontable 인스턴스인 경우
    	    var row = coords.row; // 클릭된 행 인덱스
    	    var col = coords.col; // 클릭된 열 인덱스
    	    var tableType = $("input:radio[name=calculViewType]:checked").val();
    	    if (col === 1 && tableType == 'read') { // 첫 번째 열일 경우
    	    // 클릭된 행의 데이터 가져오기
    	    var rowData = hotInstance.getDataAtRow(row); // 전체 행 데이터 가져오기

    	    if (rowData) {
    	         partnCmpnyNm = rowData[1]; // partnCmpnyNm은 두 번째 열이므로 인덱스 1 (배열 인덱스 기준)

    	        console.log("partnCmpnyNm: " + partnCmpnyNm);

    	        // 값이 존재하면 함수 호출
    	        if (partnCmpnyNm) {
    	            fn_searchCalDetailView(partnCmpnyNm);
    	        } else {
    	            console.warn("partnCmpnyNm 값이 없습니다.");
    	        }
    	    } else {
    	        console.warn("행 데이터를 가져오지 못했습니다.");
    	    }
    	   }
    	},
    	 cells: function (row, col) {
    	        var cellProperties = {};
    	        
    	        var hotInstance = calculateHot; // Handsontable 인스턴스를 가져옴.
    	        var colName = hotInstance.getSettings().columns[col].data; // 인스턴스에서 컬럼 데이터 가져오기
    	        var lastRowIndex = hotInstance.countRows() - 1; // 마지막 행 인덱스 계산
    	        var rowData = hotInstance.getDataAtRow(row); // hotInstance로 변경
    	        var endValue = rowData[17]; 
    	        // inlandFee, fareFee, wareFee, etcFee 컬럼에 대해 값이 없으면 빨간 배경색을 적용
    	        var targetColumns = ['inlandFee', 'fareFee', 'wareFee', 'etcFee'];

    	        if (tableType == 'edit' && targetColumns.includes(colName)) {
    	            var cellValue = hotInstance.getDataAtCell(row, col);
    	            if (!cellValue) {  // 값이 없으면
    	                cellProperties.renderer = function (instance, td, row, col, prop, value) {
    	                    td.style.backgroundColor = '#ffcccc';  // 배경을 빨간색으로 설정
    	                    Handsontable.renderers.TextRenderer.apply(this, arguments);  // 기본 텍스트 렌더러 적용
    	                };
    	            }
    	        }
    	        if (endValue === 'Y') {
    	            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
    	                // 배경을 회색으로 설정
    	                td.style.backgroundColor = '#BDBDBD';

    	                // 첫 번째 열이 체크박스일 경우
    	                if (col === 0) {
    	                    // 기본 체크박스 렌더러 적용
    	                    Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
    	                } 
    	                // 숫자 형식이 필요한 경우
    	                else if (cellProperties.type === 'numeric') {
    	                    // 기본 NumericRenderer를 호출하여 숫자 포맷 적용
    	                    Handsontable.renderers.NumericRenderer.apply(this, arguments);
    	                } 
    	                // 그 외 텍스트 형식
    	                else {
    	                    Handsontable.renderers.TextRenderer.apply(this, arguments);
    	                }
    	            };
    	        }
    	        

    	        // 체크박스 열 (첫 번째 열)이고 마지막 행일 경우 체크박스를 비활성화
    	        if (tableType == 'read' && col === 0 && row === lastRowIndex) {
    	            cellProperties.renderer = function (instance, td, row, col, prop, value) {
    	                td.innerHTML = ""; // 체크박스를 제거
    	            };
    	        }
    	        return cellProperties;
    	    }
	};
	return calculateSettings;
}


//table
function fn_handsonGridCalDetailOption(col, header, hidden){
	var tableType = $("input:radio[name=calculateType]:checked").val();
	var tableType2 = $("input:radio[name=calculate_srch1]:checked").val();
	
	calculateDetailSettings = {
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
			manualRowMove : true,
			manualColumnMove : false,
			cells: function(row, col) {
		        const cellProperties = {};
		        const lastRowIndex = this.instance.countRows() - 1; // 마지막 행 인덱스 계산
		        if (col === 0 && row === lastRowIndex) { 
		            // 첫 번째 열(checkBox)이고 마지막 행인 경우
		            cellProperties.renderer = function(TD) {
		                TD.innerHTML = ""; // 체크박스를 없애기 위해 비움
		            };
		        }
		        return cellProperties;
		    },
			//dropdownMenu : true,
			 afterGetColHeader: function(col, TH){
			      	if(col == 0){
			        	TH.innerHTML = "<input type='checkbox'  class='checker' id='id_checkForwardAll' onclick='fn_ForwardAllClick();'>";
			        }
			      } ,
			contextMenu : (tableType == "enrol") ? ['row_above', 'row_below', '---------', 'undo', 'redo', 'remove_row'] : false,
					filters : true,
					readOnly : (tableType == "read") ? true : false,
							allowInsertRow : true,
							allowRemoveRow : true,
							// columnSorting : {indicator : true},
							autoColumnSize : {samplingRatio : 23},
							mergeCells : false,
							wordWrap : true,
	};
	
	return calculateDetailSettings;
}

//table
function fn_handsonGridCalDetailOption2(col, header, hidden){
	var tableType = $("input:radio[name=calculateViewType]:checked").val();
	var tableType2 = $("input:radio[name=calculate_srch1]:checked").val();
	
	calculateDetailSettings2 = {
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
			height : 250,
			rowHeights : 25,
			columnHeaderHeight : 25,
			manualRowResize : true,
			manualColumnResize : true,
			manualRowMove : true,
			manualColumnMove : false,
			
			//dropdownMenu : true,
			contextMenu : (tableType == "enrol") ? ['row_above', 'row_below', '---------', 'undo', 'redo', 'remove_row'] : false,
					filters : true,
					readOnly : (tableType == "read") ? true : false,
							allowInsertRow :  (tableType != "read"),
							allowRemoveRow :  (tableType != "read"),
							// columnSorting : {indicator : true},
							autoColumnSize : {samplingRatio : 23},
							mergeCells : false,
							wordWrap : true,
	};
	
	return calculateDetailSettings2;
}


//검색 그리드
function fn_searchGridPurchOption(type){
	if(type){
		$("#calculateEnrol").show();
		$("#calculate_div1").show();
		$("#calculate_div2").show();
		$("#calculate_div3").hide();
		$("#calculate_div4").hide();
		$("#calculate_div5").show();
		$("#calculate_div6").show();
		$("#calculate_div7").show();
		$("#calculate_div8").show();
		$("#calculate_div12").hide();
		$("#calculateInfo1").hide();
		$("#calculateInfo2").hide();
		$("#docBtn").show();
	}else{
		$("#calculateEnrol").hide();
		$("#calculate_div1").show();
		$("#calculate_div2").hide();
		$("#calculate_div3").show();
		$("#calculate_div4").show();
		$("#calculate_div5").hide();
		$("#calculate_div12").hide();
		$("#calculate_div6").show();
		$("#calculate_div7").hide();
		$("#calculate_div8").show();
		$("#calculateInfo1").show();
		$("#calculateInfo2").show();
		$("#docBtn").hide();
	}
}

function fn_searchGridPurchOption2(){
	
		$("#calculateEnrol").show();
		$("#calculate_div1").show();
		$("#calculate_div12").show();
		$("#calculate_div2").hide();
		$("#calculate_div3").hide();
		$("#calculate_div4").hide();
		$("#calculate_div5").hide();
		$("#calculate_div6").hide();
		$("#calculate_div7").hide();
		$("#calculate_div8").hide();
		$("#calculateInfo1").hide();
		$("#calculateInfo2").hide();
		$("#docBtn").hide();		
}

//테이블 타입 변경
function fn_changeCalculView(type){

	var searchTp = $("input:radio[name=calculViewType]:checked").val();
	if(searchTp == "edit"){
		$("#calculExcelDown").hide();
		$("#calculExcelUpload").hide();
		$("#endBtn").hide();
		$("#calculSaveBtn").show();
			fn_changeCalculViewType(searchTp);
	}else if(type == "enrol"){
			$("#calculExcelUpload").show();
			$("#calculExcelDown").hide();
			$("#endBtn").hide();
			fn_changeCalculViewType(searchTp);
			
	}else{
		calculateHot.updateSettings({readOnly:true, contextMenu : false});
		$("#calculExcelUpload").show();
		$("#calculExcelDown").show();
		$("#endBtn").show();
		$("#calculSaveBtn").hide();
		fn_changeCalculViewType(searchTp);
	}
	
	//fn_changeCalculViewType(type);
	/*calculateHot.render();*/
	/*console.log('22222');
	calculateHot.updateSettings({
		afterUpdateSettings: function() {
			console.log('11111');
		    document.getElementById('id_checkAll').onclick = checkAll;
		  }
	});*/
};
//마감완료
function fn_closeDown(){
	
	var data = calculateHot.getData();
	var selectedRows  = []; 
  	var checked = false;
	
  	for (var i = 0; i < data.length; i++) {
        // 체크박스를 선택한 항목만 처리
        if (data[i][0] === 'yes') {
            checked = true;
            selectedRows.push({
                blNo: data[i][2], // blNo는 데이터 배열의 세 번째 열
                rptNo: data[i][3] // rptNo는 데이터 배열의 네 번째 열
            });
        }
     }
    if (!checked) {
        alert("체크박스를 선택해주세요.");
        return false;
    }
    console.log("selectedRows", selectedRows);
    fn_loading(true);
    $.ajax({
    	type:"POST",
        data: JSON.stringify(selectedRows), // JSON 형식으로 데이터 전송
        beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		contentType: "application/json; charset=utf-8",
        url: "/rpt/saveCloseDown.do",
        success: function (data) {
            if (data =="success") {
            	alert("마감 처리가 완료되었습니다.");
            	 fn_loading(false);
            	fn_searchCalView(); 
            } else {
                alert("마감 처리에 실패했습니다. 다시 시도해주세요.");
            }
           
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Error: ", errorThrown);
            alert("서버와 통신 중 문제가 발생했습니다.");
        }
    });
    
}

//마감취소
function fn_closeCancel(){
	
	var data = calculateHot.getData();
	var selectedRows  = []; 
  	var checked = false;
	
  	for (var i = 0; i < data.length; i++) {
        // 체크박스를 선택한 항목만 처리
        if (data[i][0] === 'yes') {
            checked = true;
            selectedRows.push({
                blNo: data[i][2], // blNo는 데이터 배열의 세 번째 열
                rptNo: data[i][3] // rptNo는 데이터 배열의 네 번째 열
            });
        }
     }
    if (!checked) {
        alert("체크박스를 선택해주세요.");
        return false;
    }
    console.log("selectedRows", selectedRows);
    fn_loading(true);
    $.ajax({
    	type:"POST",
        data: JSON.stringify(selectedRows), // JSON 형식으로 데이터 전송
        beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		contentType: "application/json; charset=utf-8",
        url: "/rpt/saveCloseCancel.do",
        success: function (data) {
            if (data =="success") {
            	alert("마감이 취소되었습니다.");
            	 fn_loading(false);
            	fn_searchCalView(); 
            } else {
                alert("마감 취소에 실패했습니다. 다시 시도해주세요.");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Error: ", errorThrown);
            alert("서버와 통신 중 문제가 발생했습니다.");
        }
    });
}

//편집 저장 
function fn_saveCalculSave(){
	fn_loading(true);
	var editeData = calculateHot.getSourceData();
	var popData = [];
	for(var i=0; i<editeData.length; i++){
		popData.push(editeData[i]);
	}
	
	$.ajax({
		type : "POST",
		url : "/rpt/saveCalculSave.do",
		data : JSON.stringify(popData),
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		contentType: "application/json; charset=utf-8",
        success : function(data) {
        	if(data == "success"){
        		alert("저장이 완료되었습니다.");
        		$("input:radio[name=calculViewType]:input[value='read']").trigger("click");
        		fn_searchCalView();
        	}
        	fn_loading(false);
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("Your request is up. Please log back in if you wish continue");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSaveError);
        	}
        }
	});
}
//검색구분 변경
function fn_changeCalculViewType(type){
	let calculateCol = new fn_calculateTableCol();
	let calculateHeader = new fn_calculateTableHeader();
	let calculateHidden = new fn_calculateTableHidden();
	
	let calculateDetailCol = new fn_calculateDetailTableCol();
	let calculateDetailHeader = new fn_calculateDetailTableHeader();
	let calculateDetailHidden = new fn_calculateDetailTableHidden();
	
	let calculateDetailCol2 = new fn_calculateDetailTableCol2();
	let calculateDetailHeader2 = new fn_calculateDetailTableHeader2();
	let calculateDetailHidden2 = new fn_calculateDetailTableHidden2();
	
	var col, header, hidden, col2, header2, hidden2, col3, header3, hidden3 ;

	//$('#alignImportView option:eq(0)').prop('selected', true);

	//구매원장
	fn_searchGridPurchOption(true);
	col = calculateCol.calculateCol;
	header = calculateHeader.calculateHeader;
	hidden = calculateHidden.calculateHidden;
	//searchHeader = documentSearchHeader.documentSearchHeader;
	col2 = calculateDetailCol.calculateDetailCol;
	header2 = calculateDetailHeader.calculateDetailHeader;
	hidden2 = calculateDetailHidden.calculateDetailHidden;
	
	col3 = calculateDetailCol2.calculateDetailCol2;
	header3 = calculateDetailHeader2.calculateDetailHeader2;
	hidden3 = calculateDetailHidden2.calculateDetailHidden2;
	
	calculateHot.updateSettings(fn_handsonGridCalOption(col, header, hidden));
	calculateDetailHot.updateSettings(fn_handsonGridCalDetailOption(col2, header2, hidden2));
	//calculateDetailHot2.updateSettings(fn_handsonGridCalDetailOption2(col3, header3, hidden3));
	//calculateHot.render();
	var tableType = $("input:radio[name=calculViewType]:checked").val();
	if(tableType == "read"){
		fn_searchCalView();
		$("btnCalculateViewSave").hide();
		}if(tableType == 'enrol'){
			calculateHot.loadData([]);
			calculateHot.alter('insert_row_below', 1, 1);
			fn_loading(false);
		}if(tableType == 'edit'){
			//calculateDetailHot2.loadData([]);
			console.log("5");
			fn_searchCalView();
		}
	
	
	
	//fn_searchCalView();
	
	
};
	


// 드롭다운 
excelFile = document.getElementById('excelUploadFile');

// 파일이 추가되었을 때 이벤트 처리
excelFile.addEventListener('change', (event) => {
    event.preventDefault();

    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });

        // 첫 번째 시트 가져오기
        var sheetName = workbook.SheetNames[0];
        var sheet = workbook.Sheets[sheetName];

        // 데이터를 담을 배열 초기화
        var rowData = [];

        // 고정된 헤더 행
        var colHeaders = ["NO.", "적요", "B/L번호", "공급가액", "VAT", "총합계", "비고"];
        var expectedColCount = colHeaders.length; // 고정된 열 개수

        // 엑셀의 행 데이터를 추출하여 rowData 배열에 추가
        for (var rowIndex = 6; rowIndex <= XLSX.utils.decode_range(sheet['!ref']).e.r; rowIndex++) {
            var row = [];
            for (var colIndex = 0; colIndex < expectedColCount; colIndex++) {
                var cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
                var cell = sheet[cellAddress];

                // 셀 데이터 추출
                var cellData = null;
                if (cell && cell.t === 'n') {
                    cellData = cell.w;
                } else if (cell && cell.t === 's') {
                    cellData = cell.v;
                }
                row.push(cellData);
            }
            rowData.push(row);
        }

        // 엑셀 파일의 열 수가 예상보다 많으면 alert
        var actualColCount = XLSX.utils.decode_range(sheet['!ref']).e.c + 1; // 실제 열 개수
        if (actualColCount > expectedColCount) {
            alert(`열 수가 초과되었습니다. 최대 ${expectedColCount}개의 열만 허용됩니다.`);
            return;
        }

        // Handsontable 초기화
        var hotElement = document.getElementById('excelUploadPopUpTable');
        var hotSettings = {
            data: rowData,
            colHeaders: colHeaders,
            stretchH: 'all',
            width: '100%',
            contextMenu: ['undo', 'redo', 'remove_row'],
            manualRowResize: true,
            manualColumnResize: true,
            manualRowMove: true,
            manualColumnMove: false,
            columnHeaderHeight: 25,
            rowHeights: 25,
            height: 500,
            columnSorting: { indicator: true },
			autoColumnSize: { samplingRatio: 23 },
			columns: [
		        { width: 50, className: 'htCenter' },   // NO. 컬럼 너비 고정 (자동 조정되지 않음)
		        {className: 'htCenter'},              // 적요 컬럼 자동 조정
		        {className: 'htCenter'},              // B/L번호 컬럼 자동 조정
		        {className: 'htRight'},  // 공급가액 컬럼 너비 고정
		        {className: 'htRight'},   // VAT 컬럼 너비 고정
		        {className: 'htRight'},  // 총합계 컬럼 너비 고정
		        {className: 'htCenter'}   // 비고 컬럼 너비 고정
		    ]
            //columnSorting: { indicator: true },
            //filters: true
        };

        // Handsontable 초기화
        excelUploadHot = new Handsontable(hotElement, hotSettings);
    };

    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsBinaryString(file);
});


excelFile.addEventListener('dragover', (event) => {
	event.preventDefault(); 
	
});
  
excelFile.addEventListener('drop', (event) => {
	event.preventDefault(); 
	
});

/*$(document).on('change', 'select[id^="calData"]', function() {
    var id = $(this).attr('id').replace('calData', ''); // 해당 select 요소의 숫자를 가져옴
    var selectedValue = $(this).val(); // 선택된 값
	selectedList['calData' + id] = selectedValue;
	console.log(selectedList);
});
*/

document.querySelector('.excel-upload-button').addEventListener('click', function() {
	
	//fn_searchCalCodeList();
    document.getElementById('excelUploadFile').click(); // 파일 입력 요소 클릭
});

document.querySelector('.excel-save-button').addEventListener('click', function() {
	
	var dbArrayList = excelUploadHot.getSourceData();
	var verder = '';
	if($("#calculate_vender").val() !== ""){
		verder = $("#calculate_vender").val();
	}
	// 각 행에 verder 값을 추가
	dbArrayList.forEach(row => {
	    row.push(verder); // 맨 끝에 verder 추가
	});
	
	var requestData = {
			dbArrayList: dbArrayList,
	       
	    };

	//console.log("requestData"+JSON.stringify(requestData));
	
	if($("#calculate_vender").val() == ""){
		alert('Verder를 입력해주세요.');
		$("#calculate_vender").focus();
		return;
	}
	
	
	

fn_loading(true);
	
	$.ajax({
		type : "POST",
		url : "/rpt/saveCalExcel2.do",
		data : JSON.stringify(requestData),
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		contentType: "application/json; charset=utf-8",
        success : function(data) {
        	alert('저장 되었습니다.');
        	
        	excelUploadClose();
        	fn_searchCalView();
        	fn_loading(false);
        	
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("Your request is up. Please log back in if you wish continue");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSaveError);
        	}
        }
	});
	
});
function showCalculFilePop(){
	$("#filePopupCalcul").modal("show");
}

document.getElementById('fileSelectButton').addEventListener('click', function () {
    document.getElementById('calculFile').click(); // 숨겨진 input을 클릭
});

// 파일 선택 시 파일명을 표시
document.getElementById('calculFile').addEventListener('change', function (event) {
    const files = event.target.files; // 선택된 파일 목록
    if (files.length > 0) {
        document.getElementById('fileNameDisplay').textContent = files[0].name;
    } else {
    	document.getElementById('fileNameDisplay').textContent = "파일이 선택되지 않았습니다.";
    }
});

function calculReqModalClose() {
    // 모달 숨기기
    $("#filePopupCalcul").modal("hide");

    // 파일 선택 초기화
    document.getElementById('calculFile').value = ""; // input 파일 초기화
    document.getElementById('fileNameDisplay').textContent = "파일이 선택되지 않았습니다."; // 파일명 초기화
}

// 모달이 닫힐 때 파일을 초기화
$('#filePopupCalcul').on('hidden.bs.modal', function () {
    // 파일 초기화
    document.getElementById('calculFile').value = ""; // input 파일 초기화
    document.getElementById('fileNameDisplay').textContent = "파일이 선택되지 않았습니다."; // 파일명 초기화
});

//엑셀 파일 insert 
function saveUploadedFile() {
    const fileInput = document.getElementById('calculFile');
    const file = fileInput.files[0]; // 단일 파일만 선택되도록 설정된 경우

    if (!file) {
        alert("파일을 선택해주세요.");
        return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('file', file);  // 파일을 'file'이라는 이름으로 추가
    fn_loading(true);
    // AJAX 요청 보내기 (파일 전송)
    $.ajax({
        url: '/rpt/saveUploadFile.do',  
        type: 'POST',
        data: formData,
        contentType: false,  // multipart/form-data로 보내는 경우
        processData: false,  // 자동으로 데이터 처리를 하지 않음
        dataType: 'json',  
        success: function(response) {
            console.log("Response Object:", response); 
            console.log("Response Status:", response.status);
             if (response.status === "success")  {
                alert("파일 업로드가 완료되었습니다.");
                // 추가적으로 필요하면 테이블 갱신 등의 후속 작업
                calculReqModalClose();
            	fn_searchCalView();
            } else {
            	alert("파일 업로드가 실패하였습니다.\n파일을 확인해주세요.");
            }
            fn_loading(false);
        },
        error: function(xhr, status, error) {
        	  console.error("HTTP Status Code:", xhr.status); // 상태 코드 확인
        	    console.error("Response Text:", xhr.responseText); // 서버 응답 확인
        	    console.error("AJAX Error:", error); // 에러 메시지
            alert("파일 업로드 중 오류가 발생했습니다.");
            fn_loading(false);
        }
    });
}

/* 엑셀 표 모달
function fn_excelUploadPopUp(){
	excelUploadHot.loadData([]);
	
	$("#excelUploadPopUp").modal("show");
	$("#calculate_vender").val("");
	
	$("#cal1").show();
	
};

function excelUploadClose(){
	$("#excelUploadPopUp").modal("hide");
	excelUploadHot.loadData([]);
}


function fn_handsonGridexcelUploadPopupOption() {
	excelUploadPopupSettings = {
			columns: [
				"",
				"",
				"",
				"",
				"",
				"",
				""	
				],
				stretchH: 'all',
				width: '100%',
				height: 500,
				rowHeights: 25,
				columnHeaderHeight: 25,
				colHeaders: ["NO.","적요", "B/L번호", "공급가액", "VAT", "총합계", "비고"],
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
				allowInsertRow: false
	};
	
	return excelUploadPopupSettings;
}*/

//전체 엑셀 다운로드 
function fn_calculateExcelDownload(button){
   $("#calculateExcelForm").html("");
    $("#calculateExcelForm").attr("action","/rpt/downloadcalculExcel.do");
    
    
    var downloadType = $(button).data("download-type"); // data-download-type 속성 값
    const hiddenIndices = [0,7,16,17,20];
    const hiddenForward = [0,4,5,6,9,10,11,12,13,14,16];
    var selectedCmpnyCd = []; 
    //검색조건
    $.each(fn_setCalculView(),function(attrName,attrValue){
        $("#calculateExcelForm").append("<input type='hidden' value=" + attrValue + " name=" + attrName + ">");
    });
    
    //엑셀 옵션
    //전체
    if(downloadType == '01'){
    	 var data = calculateHot.getData();
    	 var checked = false;
    	 var calculateExcelCol = new fn_calculateTableExcelCol();
     	 var calculateExcelHeader = new fn_calculateTableExcelHeader();
     	 var calculateHidden = new fn_calculateTableHidden();
     	 
     	for (var i = 0; i < data.length; i++) {
            // 체크박스를 선택한 항목만 처리
            if (data[i][0] === 'yes') {
                checked = true;
                selectedCmpnyCd.push(data[i][3]);
                //console.log("선택된 항목 데이터:", selectedCmpnyCd); // 선택된 항목만 출력
                exCol = fn_getExcelCol(calculateExcelCol.calculateExcelCol.filter((item, index) => !hiddenIndices.includes(index)));
                exTit = fn_getExcelHead(calculateExcelHeader.calculateExcelHeader.filter((item, index) => !hiddenIndices.includes(index)));
            }
        }
        if (!checked) {
            alert("체크박스를 선택해주세요.");
            return false;
        }
    }
    //비용요약
    else if(downloadType == '02'){
    	var data = calculateDetailHot.getData();
    	var calculateDetailCol = new fn_calculateDetailTableCol();
    	var calculateDetailHeader = new fn_calculateDetailTableHeader();
    	let calculateDetailHidden = new fn_calculateDetailTableHidden();
    	var partnCmpnyValue = calculateDetailHot.getDataAtCell(0, 1); // (row=0, col=1)
        console.log("partnCmpnyValue"+partnCmpnyValue);
    	for (var i = 0; i < data.length; i++) {
            // 체크박스를 선택한 항목만 처리
            if (data[i][0] === 'yes') {
                checked = true;
               /* var partnCmpnyColIndex = 0; // partnCmpny 열의 인덱스 (첫 번째 열)
                var partnCmpnyValue = calculateDetailHot.getDataAtCell(2);*/
                selectedCmpnyCd.push(data[i][3]);
                exCol = fn_getExcelCol(calculateDetailCol.calculateDetailCol.filter((item, index) => !hiddenForward.includes(index)));
                exTit = fn_getExcelHead(calculateDetailHeader.calculateDetailHeader.filter((item, index) => !hiddenForward.includes(index)));
            }
        }
        if (!checked) {
            alert("체크박스를 선택해주세요.");
            return false;
        }
   //이체정보
    }else if(downloadType == '03'){
    	var calculateDetailCol2 = new fn_calculateDetailTableCol2();
    	var calculateDetailHeader2 = new fn_calculateDetailTableHeader2();
    	
       console.log("calculateDetailValue"+calculateDetailValue);
        if(calculateDetailValue == null){
            alert("데이터가 존재하지 않습니다.");
            return;
        }
    }
    
    $("#calculateExcelForm").append("<input type='hidden' name='list2' value='" + selectedCmpnyCd.join(",") + "'>");
    $("#calculateExcelForm").append("<input type='hidden' name='exCol' value="+ exCol +">");
    $("#calculateExcelForm").append("<input type='hidden' name='exTit' value="+ exTit +">");
    $("#calculateExcelForm").append("<input type='hidden' name='exType' value="+ downloadType +">");
    $("#calculateExcelForm").append("<input type='hidden' name='partnCmpnyNm' value='" + partnCmpnyNm.replace(/ /g, '-') + "'>");
    
   console.log($("#calculateExcelForm").serializeArray());
   $("#calculateExcelForm").submit();
    
    
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
