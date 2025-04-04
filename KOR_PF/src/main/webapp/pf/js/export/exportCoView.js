var exportCoViewHot;
var exportCoViewSettings;
/*var documentViewPopupSettings;*/
var eportCoViewIndex = 9999;
var eportCoViewScrollTp = true;
var eportCoViewData = {};
var natSelect = [];
var incotermsSelect = [];
var thisNatCd = '';
var thisTaxbilNo = '';
var thisCustomExpNo = '';
var checkBoxRptNo;
var eportCoViewDownloadHot;
var checkData = [];
var uploaderButtonDocu;
var modalCloseDocu;
var docuDropzone; 
var docuLoadedFiles = [];
var docuCheckAll;
var isAllChecked = false;
var fileDownChecked = false;
var modalFileType;
var modalRptNo;
var modalInvoice;
var modalCoDate;
var modalCoName;
var datas = [];
var isDetailView = false;

$( document ).ready(function() {
	
      $('.band-calendar').each(function(){ regCal(this) ;})
      $('.datepicker').datepicker("option","dateFormat",calFormat);

	  var date = new Date();
	  var month = date.getMonth();
	  var today = new Date().toISOString().substring(0,10);
	  var mtoday = new Date(new Date().setMonth(month - 1)).toISOString().substring(0,10);
	  
	  $("#exportCoView_srch2").val(mtoday);
	  $("#exportCoView_srch3").val(today);
	  
	  var documentViewElement = document.querySelector('#exportCoViewTable');
	  var documentViewElementContainer = documentViewElement.parentNode;
	  exportCoViewHot = new Handsontable(documentViewElement, exportCoViewSettings);

	  $("#exportCoView_div1").show();
	  $("#btnExportCoSave").hide();
	  fn_changeDocumentView('read');
	  
	  
	  $("#docuTextView").text("전체");
      $("#docuTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	 
	  //scroll 이벤트
	  fn_documentViewasEventReg();
	  documentViewUseEventReg();
	  
		
	  var docuListPopupElement = document.querySelector('#docuListPopupTable');
	  var docuListPopupElementContainer = docuListPopupElement.parentNode;
	  docuListPopupSettings = fn_handsonGridDocuListPopupOption();
	  docuListHot = new Handsontable(docuListPopupElement, docuListPopupSettings);
	  
	  /*if(corpNos != 1){
		 $("#uploadDocuDiv").hide();
		 $("#uploadDocuSaveBtn").hide();
	  }*/
	  
});
/** 이벤트 Start **/

/*$("input:radio[name=exportCoView_srch20]").change(function(){
	$("input[name=itemViewType][value=read]").prop("checked", true);
	fn_changeDocumentView("read");
})*/

//검색구분 변경
$("input[name=exportCoView_srch1]").change(function(){

	  fn_changeDocumentView($("#exportCoViewType").val());
	  
	  var radioValue = document.querySelector('input[name="exportCoView_srch1"]:checked').value;
	 /* if (radioValue === '03') {
		  document.getElementById('blNoLabel').innerText = 'Invoice 번호';
		  document.getElementById('exportCoView_srch7').placeholder = 'Invoice 번호를 입력해주세요.';
		  document.getElementById('poNoLabel').innerText = 'SO 번호';
		  document.getElementById('exportCoView_srch9').placeholder = 'SO 번호를 입력해주세요.';
		  $("#docuTextView").text("수출");
	      $("#docuTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
        
	  } else {
		  document.getElementById('blNoLabel').innerText = 'B/L 번호';
		  document.getElementById('exportCoView_srch7').placeholder = 'B/L 번호를 입력해주세요.';
		  document.getElementById('poNoLabel').innerText = 'PO 번호';
		  document.getElementById('exportCoView_srch9').placeholder = 'PO 번호를 입력해주세요.';
		  $("#docuTextView").text("수입");
	      $("#docuTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	  }*/
	  //fn_changeItemtView($("#itemViewType").val());
});

$(document).mousedown(function(e){	
	if(e.target.name == "exportCoView1_date" || e.target.name == "exportCoView2_date"){
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


//테이블 타입 변경
$("input[name=exportCoViewType]").change(function(){
	  fn_changeDocumentView($(this).val());
});

function fn_chgDate1() {
	 var date = new Date();
	  var month = date.getMonth();
	  var dayday = date.getDate();
	  var day = date.getDay();
	  var today = new Date().toISOString().substring(0,10).replace(/-/g,'-');
	  var mtoday = new Date(new Date().setMonth(month - 1)).toISOString().substring(0,10).replace(/-/g,'-');
	  
	  $("#exportCoView_srch2").val(today);
	  $("#exportCoView_srch3").val(today);
}
function fn_chgDate2() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	var today = new Date().toISOString().substring(0,10).replace(/-/g,'-');
	var mtoday = new Date(new Date().setDate(dayday - day)).toISOString().substring(0,10).replace(/-/g,'-');
 
     $("#exportCoView_srch2").val(mtoday);
     $("#exportCoView_srch3").val(today);
}
function fn_chgDate3() {
	var date = new Date();
	var month = date.getMonth();
	var dayday = date.getDate();
	var day = date.getDay();
	var today = new Date().toISOString().substring(0,10).replace(/-/g,'-');
	var mtoday = new Date(new Date().setDate(dayday - dayday + 1)).toISOString().substring(0,10).replace(/-/g,'-');

    $("#exportCoView_srch2").val(mtoday);
    $("#exportCoView_srch3").val(today);
}
function fn_chgDate4() {
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
	
	var today = startDt.toISOString().substring(0,10).replace(/-/g,'-')
	var mtoday = endDt.toISOString().substring(0,10).replace(/-/g,'-')

    $("#exportCoView_srch2").val(mtoday);
    $("#exportCoView_srch3").val(today);
}

//정렬항목
/*$("select[name=alignImportView]").change(function(){
	  fn_searchImportView();
});
*/


function fn_setexportCoView(){
	
	var selectedValue = $("input:radio[name=exportCoView_srch1]:checked").val();
	 if(selectedValue === "02") {
	        $("#FtaCoTextView").text("전체");
	        $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    } else if(selectedValue === "03") {
	        $("#FtaCoTextView").text("의뢰");
	        $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    } else if(selectedValue === "04") {
	        $("#FtaCoTextView").text("판정");
	        $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    } else if(selectedValue === "05") {
	        $("#FtaCoTextView").text("접수");
	        $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    }else if(selectedValue === "06") {
	        $("#FtaCoTextView").text("승인");
	        $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    }else if(selectedValue === "07") {
	        $("#FtaCoTextView").text("발송");
	        $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    }else{
	    	 $("#FtaCoTextView").text("정정");
	    	 $("#FtaCoTextView").prepend('<i class="fa-duotone fa-feather text-primary-900"></i>'); 
	    }
	
	var sData = {};
	sData["srch1"] = $("input:radio[name=exportCoView_srch1]:checked").val(); //srch1: 검색구분
	sData["srch2"] = $("#exportCoView_srch7").val(); // invoice번호 
	sData["srch3"] = $("#exportCoView_srch6").val(); //신고번호
	sData["srch4"] = $("input[name=exportCoView1_date]").val(); // 시작일자
	sData["srch5"] = $("input[name=exportCoView2_date]").val(); // 종료일자
	sData["srch7"] = $("select[name=exportCoView_day]").val(); // 검색기간
	sData["srch8"] = $("input:radio[name=exportCoViewType]:checked").val(); // 테이블 타입
	sData["recordCountPerPage"] = $("#documentViewPageCnt option:selected").val();
	sData["pageIndex"] = eportCoViewIndex;
	
	return sData;
};

//그룹화된 항목을 토글하는 함수
function toggleGroupVisibility(row, subNum) {
    
	// 제출번호가 없으면 skip
    if (!subNum || subNum.trim() === "") {
        console.log("Invalid or empty 'subNum', skipping toggle.");
        return;
    }
	
	console.log("row :" + row);
    console.log("subNum :" + subNum);

    var rowCount = exportCoViewHot.countRows(); // 전체 행 수
    var subNumIndex = exportCoViewHot.getColHeader().indexOf('제출번호'); // '제출번호' 열 인덱스
    

    if (subNumIndex === -1) {
        console.log("제출번호 열을 찾을 수 없습니다.");
        return;
    }


    // 현재 토글 상태 확인
    var isGroupVisible  = true;
    for (var i = 0; i < rowCount; i++) {
        if (exportCoViewHot.getDataAtCell(i, subNumIndex) === subNum && i !== row) {
        	isGroupVisible  = exportCoViewHot.getRowHeight(i) > 0; // 숨겨진 상태인지 확인
            break;
        }
    }

    // 그룹 내 행들 토글 (보이거나 숨기기)
    for (var i = 0; i < rowCount; i++) {
        if (exportCoViewHot.getDataAtCell(i, subNumIndex) === subNum && i !== row) {
            if (isGroupVisible) {
                // 행 숨기기
                exportCoViewHot.getPlugin('hiddenRows').hideRow(i);
            } else {
                // 행 보이기
                exportCoViewHot.getPlugin('hiddenRows').showRow(i);
            }
        }
    }
 // 첫 번째 행의 토글 버튼 상태 업데이트
    setTimeout(() => {
        const cell = exportCoViewHot.getCell(row, subNumIndex);
        if (cell) {
            const toggleButton = $(cell).find(".toggle-btn");
            if (toggleButton.length > 0) {
                toggleButton.text(isGroupVisible ? '+' : '–'); // 보이는 상태일 때 "+" 표시
            }
        }
        exportCoViewHot.render();
    }, 100); // DOM 업데이트 후 실행
}





//편집 
function fn_searchCoEditView(){
	fn_loading(true);
	eportCoViewIndex = 0;
	var sData = fn_setexportCoView();
	
	$.ajax({
		type : "POST",
		url : "/export/selectCoList.do",
		data : JSON.stringify(sData),
		contentType: "application/json; charset=utf-8",
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
		success: function (data) {
		    if ($("input[name=exportCoViewType]:checked").val() == 'enrol') {
		        let resultData =  [];

		        // 빈 행을 하나 추가
		        resultData.unshift({}); // 빈 객체를 배열의 첫 번째에 추가

		        // 데이터 로드
		        exportCoViewHot.loadData(resultData);
		        exportCoViewHot.render(); // 그리드 렌더링

		        fn_loading(false);
		    }else {
		    // 기존 데이터 초기화 및 새로운 데이터 로드
			console.log("ddd");	
		    exportCoViewHot.loadData([]);
		    exportCoViewHot.loadData(data.resultList);
		    const totCnt = data.resultList.length > 0 ? data.resultList.length : 0;
		    $("#FtaCoTextViewCnt").text(totCnt);
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
        	fn_loading(false);
        }
	});
};

//검색 버튼 클릭 시 호출되는 함수
function fn_searchCoDocuView(){
	fn_loading(true);
	eportCoViewIndex = 0;
	var sData = fn_setexportCoView();
	
	$.ajax({
		type : "POST",
		url : "/export/selectCoList.do",
		data : JSON.stringify(sData),
		contentType: "application/json; charset=utf-8",
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
		success: function (data) {
		    //console.log("Data received:", data);

		    // 기존 데이터 초기화 및 새로운 데이터 로드
		    exportCoViewHot.loadData([]);
		    exportCoViewHot.loadData(data.resultList);

		    const totCnt = data.resultList.length > 0 ? data.resultList.length : 0;
		    $("#FtaCoTextViewCnt").text(totCnt);
		    fn_loading(false);

		    const subNumMap = new Map(); // 제출번호별 첫 번째 행을 저장
            const subNumCounts = new Map(); // 제출번호별 행 개수를 저장
            const hiddenRows = []; // 숨길 행의 인덱스를 저장
            const rowCount = exportCoViewHot.countRows();

            if (rowCount > 0) {
                const subNumIndex = exportCoViewHot.getColHeader().indexOf('제출번호');
                const requestIndex = exportCoViewHot.getColHeader().indexOf('request');

                if (subNumIndex !== -1 && requestIndex !== -1) {
                    for (let i = 0; i < rowCount; i++) {
                        const subNum = exportCoViewHot.getDataAtCell(i, subNumIndex);
                        const request = exportCoViewHot.getDataAtCell(i, requestIndex);

                        //console.log("Processing row:", i, "subNum:", subNum, "request:", request);
                        
                        if (!subNum || subNum.trim() === "") {
                            continue; // 제출번호가 없으면 스킵
                        }

                        // 제출번호 그룹에 대한 카운트 업데이트
                        subNumCounts.set(subNum, (subNumCounts.get(subNum) || 0) + 1);
                        // 제출
                        //console.log("subNumCounts",subNumCounts);
                        if (!subNumMap.has(subNum)) {
                            // 제출번호 첫 번째 행으로 request 값이 "01"인 것을 선택
                            if (request === "01") {
                                subNumMap.set(subNum, i);
                            } else {
                                // "01"이 없는 경우 첫 번째 등장하는 행 저장
                                subNumMap.set(subNum, i);
                            }
                        } else {
                            // 중복된 제출번호인 경우 숨김 처리
                            hiddenRows.push(i);

                            // 중복된 행의 특정 셀 초기화
                            exportCoViewHot.setDataAtCell(i, 3, ""); // 상태
                            exportCoViewHot.setDataAtCell(i, 22, ""); // 발급번호
                            exportCoViewHot.setDataAtCell(i, 23, ""); // 발급일자
                            exportCoViewHot.setDataAtCell(i, 24, ""); // 원산지증명서
                            exportCoViewHot.setDataAtCell(i, 25, ""); // 제출서류
                            exportCoViewHot.setDataAtCell(i, 26, ""); // 판정비용
                            exportCoViewHot.setDataAtCell(i, 27, ""); // 발행비용
                        }
                    }

                    // 숨길 행 처리
                    exportCoViewHot.updateSettings({
                        hiddenRows: {
                            rows: hiddenRows, // 숨길 행 설정
                            indicators: false // 숨긴 행 표시 아이콘 비활성화
                        }
                    });

                 // 토글 버튼 추가
                subNumMap.forEach((rowIndex, subNum) => {
                    const groupCount = subNumCounts.get(subNum); // 해당 제출번호 그룹의 행 개수
                    //console.log("groupCount"+groupCount);
                    // 제출번호가 1개뿐이라면 토글 버튼 추가하지 않음
                    if (groupCount <= 1) return;

                    const cell = exportCoViewHot.getCell(rowIndex, subNumIndex);
                    $(cell).find(".toggle-btn").remove(); // 기존 버튼 제거
                    $(cell).append('<span class="toggle-btn" style="cursor:pointer; font-weight:bold; font-size:16px;" onclick="toggleGroupVisibility(' + rowIndex + ', \'' + subNum + '\')">+</span>');
                });

                exportCoViewHot.render();
            } else {
                    console.log("제출번호 또는 request column not found.");
                }
            } else {
                console.log("No rows to process.");
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
        	fn_loading(false);
        }
	});
};

//row 수
$("select[name=documentViewPageCnt]").change(function(){
	fn_searchCoDocuView();
});


// 스크롤할 때 행이 자동으로 추가 로드될 수 있게 하는 함수
function fn_documentViewasEventReg(){
   $("#exportCoViewTable .wtHolder").scroll(function(){
  	  var scrollTop = $("#exportCoViewTable .wtHolder").scrollTop();
  	  var countPerPage = $("#documentViewPageCnt option:selected").val();
  	  var rowHeight = exportCoViewHot.getRowHeight();
  	  var addCnt = 750;
  	  if(countPerPage == "50"){
  		  addCnt = 750;
  	  }else if(countPerPage == "100"){
  		  addCnt = 1990;
  	  }else if(countPerPage == "200"){
  		  addCnt = 4490;
  	  }else if(countPerPage == "500"){
  		  addCnt = 11990;
  	  }
  	  if(eportCoViewScrollTp && eportCoViewIndex != 9999 && scrollTop >= (countPerPage * eportCoViewIndex * rowHeight) + addCnt){
  		  fn_documentViewScroll();
  	  }
   });
}


//스크롤
function fn_documentViewScroll(){
	fn_loading(true);
	eportCoViewScrollTp = false;
	eportCoViewIndex++;
	
	
	var sData = fn_setexportCoView();
	
	
	$.ajax({
		type : "POST",
		url : "/export/selectCoList.do",
		data : JSON.stringify(sData),
		contentType: "application/json; charset=utf-8",
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: "json",
        success : function(data) {
        	
        	var getData = exportCoViewHot.getSourceData();
        	var meargeJson = getData.concat(data.resultList);
        	exportCoViewHot.loadData(meargeJson);
        	eportCoViewScrollTp = true;
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
function documentViewUseEventReg(){
	$("#popUsedTable .wtHolder").scroll(function(){
	  fn_popUsedStories(row, col)
	  var data = exportViewHot.getSourceData();
	  var scrollTop = $("#popUsedTable .wtHolder").scrollTop();
	  var countPerPage = 50;
	  var rowHeight = jdgmntUsageHot.getRowHeight();
	  var addCnt = 790;

	  if(documentViewPopScrollTp && eportCoViewIndex != 9999 && scrollTop >= (countPerPage * eportCoViewIndex * rowHeight) + addCnt){
		  fn_documentViewPopScroll(data[row]);
	  }
   });
}


function enterkey() {
	if (window.event.keyCode == 13) {
		fn_searchCoDocuView();
    }
}


//검색조건 초기화
function fn_clearDocuView(){
	$("#exportCoView_srch2").val("");
	$("#exportCoView_srch3").val("");
	$("#documentView_srch4").val("");
	$("#documentView_srch5").val("");
	$("#exportCoView_srch6").val("");
	$("#exportCoView_srch7").val("");
	/*$("#exportCoView_srch9").val("");*/
};


//테이블 컬럼
function fn_exportCoViewTableCol(){
	var searchType = $("input:radio[name=exportCoView_srch1]:checked").val();
	var tableType = $("input:radio[name=exportCoViewType]:checked").val();
	
	var docuFileLoadRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        var $fileButton;
        var fileType = (prop === 'coFile') ? 'coFile' : 'summitFile'
    	 // null이나 빈 값을 처리
        if (value == null || value === 'null' || value === '') {
            value = ''; // 공백으로 표시
        }
     // 제출번호 가져오기
        var subNum = instance.getDataAtCell(row, instance.getColHeader().indexOf('제출번호'));
        var rowCount = instance.countRows();

        // 제출번호 그룹의 개수를 계산
        var subNumCount = 0;
        for (var i = 0; i < rowCount; i++) {
            if (instance.getDataAtCell(i, instance.getColHeader().indexOf('제출번호')) === subNum) {
                subNumCount++;
            }
        }

        // 같은 제출번호 그룹의 첫 번째 행인지 확인
        var isFirstRow = true;
        for (var i = 0; i < rowCount; i++) {
            if (instance.getDataAtCell(i, instance.getColHeader().indexOf('제출번호')) === subNum) {
                if (i < row) {
                    isFirstRow = false; // 자신보다 위에 같은 제출번호가 있으면 첫 번째 행이 아님
                    break;
                }
            }
        }

        // 첫 번째 행이거나 제출번호 그룹의 개수가 1개일 경우에만 버튼 생성
        if (isFirstRow || subNumCount === 1) {
            $fileButton = $('<i class="fa-solid fa-magnifying-glass" style="cursor:pointer;" onclick="fn_docuGlassesBtn(\'' + fileType + '\', ' + row + ', ' + col + ')"></i>');
        }

        // 셀 내용 업데이트
        $(td).empty();
        if ($fileButton) {
            $(td).append($fileButton);
        }
        $(td).append(" " + value);
    };
	
	var subNumLoadRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	    // 제출번호 가져오기
	    var subNum = instance.getDataAtCell(row, instance.getColHeader().indexOf('제출번호'));
	    var requestIndex = instance.getColHeader().indexOf('request');
	    
	    // 제출번호가 없으면 버튼 없이 value만 추가
	    if (!subNum || subNum.trim() === "") {
	        $(td).empty().append(value || ""); // 제출번호가 없으면 버튼 없이 값을 표시
	        return;
	    }
	    
	    // 제출번호 그룹의 개수를 계산
	    var rowCount = instance.countRows();
	    var subNumCount = 0;

	    for (var i = 0; i < rowCount; i++) {
	        if (instance.getDataAtCell(i, instance.getColHeader().indexOf('제출번호')) === subNum) {
	            subNumCount++;
	        }
	    }

	    // 제출번호 그룹의 개수가 2개 미만이라면 버튼을 추가하지 않음
	    if (subNumCount < 2) {
	        $(td).empty().append(value || ""); // 제출번호가 1개만 있으면 버튼 없이 값을 표시
	        return;
	    }
	    

	    // 같은 제출번호 그룹의 첫 번째 행인지 확인
	    var isFirstRow = true;
	    var rowCount = instance.countRows();
	    for (var i = 0; i < rowCount; i++) {
	        if (instance.getDataAtCell(i, instance.getColHeader().indexOf('제출번호')) === subNum) {
	            if (i < row) {
	                isFirstRow = false; // 자신보다 위에 같은 제출번호가 있으면 첫 번째 행이 아님
	                break;
	            }
	        }
	    }

	    // 첫 번째 행이 아닌 경우 토글 버튼 추가하지 않음
	    if (!isFirstRow) {
	        $(td).empty().append(value || ""); // 값만 추가
	        return;
	    }

	    // 같은 그룹의 행이 보이는지 여부 확인
	    var isVisible = false;
	    for (var i = 0; i < rowCount; i++) {
	        if (
	            instance.getDataAtCell(i, instance.getColHeader().indexOf('제출번호')) === subNum && i !== row) {
	            isVisible = instance.getRowHeight(i) > 0; // 행이 보이는지 확인
	            break;
	        }
	    }

	    // 상태에 따른 토글 버튼 텍스트 설정
	    var toggleText = isVisible ? '–' : '+';

	    // 토글 버튼 생성
	    var $toggleButton = $('<span class="toggle-btn" style="cursor:pointer; font-weight:bold; font-size:16px;" onclick="toggleGroupVisibility(' + row + ', \'' + subNum + '\')">' + toggleText + '</span>');

	    // 셀 내용 업데이트
	    $(td).empty().append($toggleButton).append(" " + value); // 토글 버튼과 value 추가
	};
	
	var pkNoneEdit = function(instance, td, row, col, prop, value, cellProperties) {
		$(td).empty().css("background-color", "#E6E6E6").css("text-align","center").append(value);
	};

		this.exportCoViewCol = (tableType == "read") ? [
			{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
			{data : 'seq', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'request', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'state', className : "htCenter", width: 90, readOnly:true,renderer : chipRenderer,wordWrap: false},
			{data : 'subNum', className : "htCenter", width: 180, readOnly:true, renderer : subNumLoadRenderer,wordWrap: false},
			{data : 'coDate', className : "htCenter",width: 150, wordWrap: false, readOnly:true},
			{data : 'formatDate', className : "htCenter",width: 150,readOnly:true,wordWrap: false},
			{data : 'coName', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'invoiceNo', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'rptNo', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'lisDay', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'producer', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'importCountry', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'importer', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'impgname', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'qty', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'ut', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'amt', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'concod', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'hsCode', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'deterOrigin', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'freeName', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'issueNo', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'issueDate', className : "htCenter", width: 150,  readOnly:true,wordWrap: false},
			{data : 'coFile', className : "htCenter", width: 100,  readOnly:true , renderer : docuFileLoadRenderer,wordWrap: false},
			{data : 'summitFile', className : "htCenter", width: 100, readOnly:true , renderer : docuFileLoadRenderer,wordWrap: false},
			{data : 'issuanceCost', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true,wordWrap: false},
			{data : 'judgmentCost', width: 150, type : 'numeric', className : "htRight", 	numericFormat : {pattern : '0,0'}, readOnly:true,wordWrap: false},
		] :  (tableType == "edit") ? [
			{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false,wordWrap: false},
			{data : 'seq', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'request', className : "htCenter", width: 150, readOnly:true,wordWrap: false},
			{data : 'state', type: 'dropdown', source: ['의뢰', '판정', '접수','정정','승인','발송','재발급'], className : "htCenter", width: 90,wordWrap: false},
			{data : 'subNum', className : "htCenter", width: 150,wordWrap: false},
			{data : 'coDate', className : "htCenter",width: 150, readOnly:true, renderer : pkNoneEdit,wordWrap: false},
			{data : 'formatDate', className : "htCenter",width: 150, readOnly:true, renderer : pkNoneEdit,wordWrap: false},
			{data : 'coName', className : "htCenter", width: 150,  readOnly:true, renderer : pkNoneEdit,wordWrap: false},
			{data : 'invoiceNo', className : "htCenter", width: 150,wordWrap: false},
			{data : 'rptNo', className : "htCenter", width: 150,wordWrap: false},
			{data : 'lisDay',type : 'date', dateFormat: gridCalFormat, className : "htCenter", width: 150,wordWrap: false},
			{data : 'producer', className : "htCenter", width: 150,wordWrap: false },
			{data : 'importCountry', className : "htCenter", width: 150,wordWrap: false},
			{data : 'importer', className : "htCenter", width: 150,wordWrap: false},
			{data : 'impgname', className : "htCenter", width: 150,wordWrap: false},
			{data : 'qty', className : "htCenter", width: 150,wordWrap: false},
			{data : 'ut', className : "htCenter", width: 150,wordWrap: false},
			{data : 'amt', className : "htRight", width: 150,wordWrap: false},
			{data : 'concod', className : "htCenter", width: 150,wordWrap: false},
			{data : 'hsCode', className : "htCenter", width: 150,wordWrap: false},
			{data : 'deterOrigin', className : "htCenter", width: 150,wordWrap: false},
			{data : 'freeName', className : "htCenter", width: 150,wordWrap: false},
			{data : 'issueNo', className : "htCenter", width: 150,wordWrap: false},
			{data : 'issueDate', type : 'date', dateFormat: gridCalFormat,className : "htCenter", width: 150,wordWrap: false},
			{data : 'coFile', className : "htCenter", width: 100, readOnly:true , renderer : docuFileLoadRenderer,wordWrap: false},
			{data : 'summitFile', className : "htCenter", width: 100,  readOnly:true , renderer : docuFileLoadRenderer,wordWrap: false},
			{data : 'issuanceCost', width: 150, className : "htRight"},
			{data : 'judgmentCost', width: 150, className : "htRight"},
			{data : 'ex', width: 150, className : "htRight",width: 1},
			] : 
			[
			{data : 'checkBox', type : 'text', className : "htCenter", width: 60, type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no'},
			{data : 'seq', className : "htCenter", width: 150, readOnly:true},
			{data : 'request', className : "htCenter", width: 150, readOnly:true},
			{data : 'state', type: 'dropdown', source: ['의뢰', '판정', '접수','정정','승인','발송','재발급'], className : "htCenter", width: 90},
			{data : 'subNum', className : "htCenter", width: 150},
			{data : 'coDate', className : "htCenter",width: 150, wordWrap: false,  renderer : pkNoneEdit},
			{data : 'formatDate', className : "htCenter",width: 150, wordWrap: false,  renderer : pkNoneEdit},
			{data : 'coName', className : "htCenter", width: 150, renderer : pkNoneEdit},
			{data : 'invoiceNo', className : "htCenter", width: 150},
			{data : 'rptNo', className : "htCenter", width: 150},
			{data : 'lisDay',type : 'date', dateFormat: gridCalFormat, className : "htCenter", width: 150},
			{data : 'producer', className : "htCenter", width: 150, },
			{data : 'importCountry', className : "htCenter", width: 150},
			
			{data : 'importer', className : "htCenter", width: 150},
			{data : 'impgname', className : "htCenter", width: 150},
			{data : 'qty', className : "htCenter", width: 150},
			{data : 'ut', className : "htCenter", width: 150},
			{data : 'amt', className : "htRight", width: 150},
			{data : 'concod', className : "htCenter", width: 150},
			{data : 'hsCode', className : "htCenter", width: 150},
			{data : 'deterOrigin', className : "htCenter", width: 150},
			{data : 'freeName', className : "htCenter", width: 150},
			{data : 'issueNo', className : "htCenter", width: 150},
			{data : 'issueDate', type : 'date', dateFormat: gridCalFormat,className : "htCenter", width: 150},
			{data : 'coFile', className : "htCenter", width: 100,  renderer : docuFileLoadRenderer},
			{data : 'summitFile', className : "htCenter", width: 100,  renderer : docuFileLoadRenderer},
			{data : 'issuanceCost', width: 150, className : "htRight"},
			{data : 'judgmentCost', width: 150, className : "htRight"},
			{data : 'ex', width: 150, className : "htRight",width: 1},	
			] ;
			
	}



function chipRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
	Handsontable.renderers.BaseRenderer.apply(this, arguments);
	td.classList.add('chip-cell');
	td.classList.add('text-center');
		switch (value) {
		case "의뢰":
		case "승인":
			td.innerHTML = `<span class="chip chip-blue">${value}</span>`
		break
		case "판정":
		case "발송":
			td.innerHTML = `<span class="chip chip-green">${value}</span>`
		break
		case "재발급":
			td.innerHTML = `<span class="chip chip-red">${value}</span>`
		break
		case "접수":
		case "정정":
			td.innerHTML = `<span class="chip chip-yellow">${value}</span>`
		break
		case null :
		case "":
			td.innerHTML = `<span></span>`
		break
		default:
			td.innerHTML = `<span class="chip chip-primary">${value}</span>`
		break
		}
}


//테이블 헤더
function fn_exportCoViewTableHeader(){
	this.exportCoViewHeader = [
		"","seq","request","상태",
		"제출번호","z", "CO요청일자", "요청자", "Invoice번호", "수출신고번호", "수리일자", "생산자", "수입국", "수입자", "품명", "수량", "단위", "금액", "인코텀즈", "HSCODE", "원산지결정기준"
		,"자유무역협정명칭","발급번호","발급일자","원산지증명서","제출서류","판정비용","발행비용","ex",
		]; 
	
}


//테이블 히든컬럼
function fn_exportCoViewTableHidden(){
	var tableType = $("input:radio[name=exportCoViewType]:checked").val();
	
	if (tableType === "edit") {
		    this.exportCoViewHidden = [1, 2, 5];
		  } else if (tableType === "read" && isDetailView) {
		    // read 상태 + detail 뷰일 때
		    this.exportCoViewHidden = [/*0,*/ 1, 2, 5/*, 6, 7*/];
		  } else if (tableType === "read" && !isDetailView) {
		    // read 상태 + 일반 뷰일 때
		    this.exportCoViewHidden = [/*0,*/ 1, 2, 5,/* 6, 7,*/ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
		  } else if (tableType === "enrol") {
		    this.exportCoViewHidden = [0, 1, 2, 5, 6, 7];
		  }
}


//table
function fn_handsonGridViewOption(col, header, hidden){
	var tableType = $("input:radio[name=exportCoViewType]:checked").val();

	exportCoViewSettings = {
	  data: [],
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
	  height : 500,
	  hiddenRows: true,
	  rowHeights : 25,
	  rowHeaders : true,
	  columnHeaderHeight : 25,
	  contextMenu : (tableType == 'enrol') ? ['row_above', 'row_below', '---------', 'undo', 'redo', 'remove_row'] : false,
	  manualRowResize : true,
	  manualColumnResize : true,
	  manualRowMove : true,
	  manualColumnMove : false,
	  fixedColumnsLeft: 1,
	  //dropdownMenu : true,
	  filters : true,
	  readOnly : (tableType == "read") ?  true : false,
	  allowInsertRow : true,
	  allowRemoveRow : true,
      autoColumnSize : {samplingRatio : 23},
      mergeCells : false,
      wordWrap : true,
     beforeChange: function (changes, source) {
    	    if (source === "edit" || source === "Autofill.fill") {
    	        changes.forEach(change => {
    	            const [row, col, oldValue, newValue] = change;
    	            // 모든 열 헤더 가져오기
    	            const columnHeaders = exportCoViewHot.getColHeader();
    	            if (typeof col === "number") {
    	                // col이 숫자일 경우: 해당 인덱스의 헤더를 가져옴
    	                columnName = columnHeaders[col];
    	            } else if (typeof col === "string") {
    	                // col이 문자열일 경우: 이미 열 이름으로 전달된 것으로 간주
    	                columnName = columnHeaders.find(header => header.toLowerCase() === col.toLowerCase());
    	            }
    	            if (columnName === "HSCODE" && newValue) {
    	                // 숫자 이외의 문자 제거
    	                const sanitizedValue = newValue.replace(/[^0-9]/g, '');
    	                if (sanitizedValue !== newValue) {
    	                    setTimeout(() => {
    	                        exportCoViewHot.setDataAtCell(row, columnHeaders.indexOf(columnName), sanitizedValue); // 값 수정
    	                    }, 0);
    	                }
    	            }
    	        });
    	    }
    	},
    	afterGetColHeader: function(col, TH){
        	if(col == 0){
          	TH.innerHTML = "<input type='checkbox'  class='checker' id='id_checkDocuAll' onclick='fn_docuAllClick();'>";
          }
        }
	};

	return exportCoViewSettings;
}


//상세내역 +,-
function toggleDetailView(){
	isDetailView = !isDetailView;
	
	//버튼 텍스트와 아이콘 토글
	var btn = document.getElementById("btnExportCoDetail");
	 if (isDetailView) {
	      btn.innerHTML = '상세내역<i class="fa-solid fa-minus"></i>';
	      fn_changeDocumentView('detail');
	    } else {
	      btn.innerHTML = '상세내역<i class="fa-solid fa-plus"></i>';
	      fn_changeDocumentView('read');
	    }

	 // 히든 컬럼 업데이트
	fn_exportCoViewTableHidden();
	
	// 데이터 다시 렌더링
    exportCoViewHot.render();
}

//테이블 타입 변경
function fn_changeDocumentView(type){
	var searchTp = $("input:radio[name=exportCoView_srch1]:checked").val();
	
    if (type === "edit") {
        $("#btnExportCoExcel").hide();
        $("#btnExportCoDetail").hide();
        $("#btnExportCoDelete").show();
        $("#btnExportCoSave").show();
        fn_changeDocumentViewType(searchTp);
      } else if (type === "read") {
        $("#btnExportCoExcel").show();
        $("#btnExportCoDetail").show();
        $("#btnExportCoDelete").hide();
        $("#btnExportCoSave").hide();
        fn_changeDocumentViewType(searchTp);
      } else if (type === "enrol") {
        $("#btnExportCoExcel").hide();
        $("#btnExportCoDetail").hide();
        $("#btnExportCoDelete").hide();
        $("#btnExportCoSave").show();
        fn_changeDocumentViewType(searchTp);
      } else if (type === "detail") {
        fn_changeDocumentViewType("detail");
        $("#btnExportCoExcel").show();
        $("#btnExportCoDetail").show();
        $("#btnExportCoDelete").hide();
        $("#btnExportCoSave").hide();
      }
	
	exportCoViewHot.render();

};

//검색구분 변경
function fn_changeDocumentViewType(type){
	var tableType = $("input:radio[name=exportCoViewType]:checked").val();
	let exportCoViewCol = new fn_exportCoViewTableCol();
	let exportCoViewHeader = new fn_exportCoViewTableHeader();
	let exportCoViewHidden = new fn_exportCoViewTableHidden();
	
	var col, header, hidden;


	
	col = exportCoViewCol.exportCoViewCol;
	header = exportCoViewHeader.exportCoViewHeader;
	hidden = exportCoViewHidden.exportCoViewHidden;
	
	exportCoViewHot.updateSettings(fn_handsonGridViewOption(col, header, hidden));

	exportCoViewHot.render();
	if(tableType == 'read' || type == "detail"){
		fn_searchCoDocuView();
	}else{
		fn_searchCoEditView();
	}
};


modalCloseDocu = document.querySelectorAll('.modal-close');

modalCloseDocu.forEach((el) => {
	 el.addEventListener('click', () => {
	 const modalDocu = document.querySelector('.modal-popup-docu')
	 //const contactModal = document.querySelector('.contact-modal')
	 const uploaderModalDocu = document.querySelector('.uploader-modal-docu')
	 modalDocu.classList.remove('flex')
	 modalDocu.classList.add('hidden')
	 uploaderModalDocu.classList.remove('block')
	 uploaderModalDocu.classList.add('hidden')
	 popupState = false
	 })
})

// 드롭다운 
dropzoneDocu = document.getElementById('dropzone-file-docu');

// 파일이 추가되었을 때 이벤트 처리
dropzoneDocu.addEventListener('change', (event) => {
	event.preventDefault(); 
	const files = event.target.files; // 선택된 파일 객체들
	Array.from(files).forEach((file) => {
    	docuLoadedFiles.push(file);
    });
	
    uploadFilesDocu(files);
});

dropzoneDocu.addEventListener('dragover', (event) => {
	 event.preventDefault(); 
});
  
dropzoneDocu.addEventListener('drop', (event) => {
     event.preventDefault(); 
     const fileList = event.dataTransfer.files; // Get dropped files
     const files = Array.from(fileList); // Convert FileList to array
  
     Array.from(files).forEach((file) => {
    	docuLoadedFiles.push(file);
     });
     uploadFilesDocu(files);
     
     const fileInput = document.getElementById('dropzone-file-docu');
     fileInput.files = fileList;
});

 

function uploadFilesDocu(files) {
	
	const fileInput = document.getElementById('dropzone-file-docu');
	const filess = fileInput.files;
	const fileListElement = document.querySelector('.file-list-docu');
	const dropzoneFileInput = document.getElementById('dropzone-file-docu');
    // 기존 파일 목록을 가져옴
    const existingFiles = Array.from(fileListElement.querySelectorAll('li'));
    // 현재 날짜를 가져와서 포맷팅
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    // 새로운 파일을 기존 목록에 추가
    files.forEach(file => {
      const li = document.createElement('li');
      li.classList.add('flex', 'items-center', 'py-1', 'px-4', 'rounded', 'justify-between', 'hover:bg-gray-100', 'duration-150', 'gap-10');
      li.innerHTML = `
       <p class="flex items-end gap-2">
        <a href="#" target="_blank" class="font-semibold text-xl underline" maxlength='10' style="text-overflow: ellipsis;">${file.name}</a>
        <span class="text-base pl-3 text-gray-400">${formattedDate}</span>
        <button type="button" class="delete-button hover:opacity-50 text-rose-600" onclick="deleteFile(event)"><i class="fa-regular fa-trash-can"></i></button>
       </p>
       <select class="min-w-40 text-primary-700 bg-primary-50 border border-primary-500 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center justify-between dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >
	      <option value="dc">신고필증</option>
    	  <option value="cb">통합</option>
    	  <option value="cb">정정 통합</option>
	      <option value="ci">INVOICE</option>
	      <option value="pl">PACKING LIST</option>
	      <option value="bl">BL</option>
	      <option value="co">원산지증명서</option>
	      <option value="rq">요건 서류</option>
	      <option value="ot">기타</option>
	      <option value="ac">정산서</option>
       </select>
      `;
      fileListElement.appendChild(li);
    });
}


function deleteFile(event) {
    const fileElement = event.target.closest('li');
    if (fileElement) {
	   const ulElement = fileElement.parentNode;
	   const liElements = Array.from(ulElement.children);
	   const index = liElements.indexOf(fileElement);
	   docuLoadedFiles.splice(index, 1);
	   fileElement.remove();
    }
}

//파일 업로드
function fn_fileDocuSave(){
    const fileInput = document.getElementById('dropzone-file-docuUpload');
    const files = fileInput.files; // 파일 리스트 가져오기
    const formData = new FormData();
    const rowData = docuListHot.getSourceData(); // 테이블 데이터 가져오기
    
    
 // fileInput 요소 확인
if (fileInput) {
    // 업로드된 파일 목록 출력
    console.log("fileInput exists. Files:", fileInput.files);

    // FileList가 비어 있지 않을 경우 파일 정보 출력
    if (fileInput.files.length > 0) {
        Array.from(fileInput.files).forEach((file, index) => {
            console.log(`File ${index + 1}:`, file.name, file.size, file.type);
        });
    } else {
        console.log("No files uploaded.");
    }
} else {
    console.error("File input element with id 'dropzone-file-docuUpload' not found.");
}
    
    
    
    
    // 필요한 데이터 추가
    formData.append('fileType', modalFileType);
    formData.append('coDate', modalCoDate);
    formData.append('coName', modalCoName);
    formData.append('rptNo', modalRptNo || ''); // rptNo가 undefined인 경우 공백 추가
    formData.append('invoiceNo', modalInvoice || ''); // invoiceNo가 undefined인 경우 공백 추가
    // rptNo가 비어있는 경우 업로드 불가
    if (modalRptNo === undefined || modalRptNo === null || modalRptNo === '') {
        alert("신고번호가 존재해야 파일 업로드가 가능합니다.");
        return; 
    }
    
    // 업로드된 파일 추가
    for (let i = 0; i < files.length; i++) {
        console.log("files"+files);
    	formData.append('files', files[i]); // 'files'는 서버에서 받을 필드 이름
    }
    
    // 테이블에서 guide가 '2'인 파일만 추가
    const filteredFiles = rowData.filter(row => row.guide === '2');
    if (filteredFiles.length === 0) {
        alert('새로 저장할 파일이 없습니다.');
        return;
    }
    
    
    filteredFiles.forEach((row, index) => {
        if (row.docuFile) {
            formData.append(`files[${index}].docuFile`, row.docuFile); // 파일 이름
        }
    });
    
    
    
    // liFileData 추가 (JSON 형식으로 전달)
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    
    
    
	$.ajax({
		type: 'POST',
		url: "/export/insertDocuFilesInfo.do",
		data: formData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function (data) {
			
			const modalDocu = document.querySelector('.modal-popup-docu')
			const uploaderModalDocu = document.querySelector('.uploader-modal-docu')
			modalDocu.classList.remove('flex')
			modalDocu.classList.add('hidden')
			uploaderModalDocu.classList.remove('block')
			uploaderModalDocu.classList.add('hidden')
			popupState = false
			alert('파일이 저장되었습니다.');
			filecoDocuListClose();
			fn_searchCoDocuView();
		},
		error: function (e, textStatus, jqXHR) {}
	});
};





function fn_docuAllClick(){
	var check = "" ;
	var changeArr = [];
	if ( $("#id_checkDocuAll").prop("checked") == false) {
		check = "yes" ;
	} else {
		check = "no" ;
	}

	var data = exportCoViewHot.getData();

	for(var i=0; i< data.length; i++){
		changeArr.push([i,0,check])
	}
	exportCoViewHot.setDataAtCell(changeArr);
	if(check == "yes"){
		$("#id_checkDocuAll").prop("checked", true);
	} else {
		$("#id_checkDocuAll").prop("checked", false);
	}
}

// 돋보기
function fn_docuGlassesBtn(fileType,row, col){
	isAllChecked = false;
	modalInvoice = "";
	modalRptNo = "";
	console.log("fileType"+fileType);
	var data = exportCoViewHot.getSourceDataAtRow(row);
    modalInvoice = data.invoiceNo;
    modalRptNo = data.rptNo;
    modalCoDate = data.coDate;
    modalCoName = data.coName;
    modalFileType = fileType;
    docuLoadedFiles = [];
	$("#docuFileListPopUp").modal("show");

    var sData = fn_docuForPopup(data,fileType);
    
    var text = "";
   
    if (modalInvoice && modalRptNo) {
        // 둘 다 있을 때
        text = "Invoice 번호: " + modalInvoice + " / 신고번호: " + modalRptNo.replace(/-/g, '');
    } else if (modalInvoice) {
        // Invoice 번호만 있을 때
        text = "Invoice 번호: " + modalInvoice;
    } else if (modalRptNo) {
        // 신고번호만 있을 때
        text = "신고번호: " + modalRptNo.replace(/-/g, '');
    } else {
        // 둘 다 없을 때
        text = "";
    }
    
    var uploadDocuImpFileListTitle = document.querySelector('.modal-content .docuModal-title span');
	uploadDocuImpFileListTitle.textContent = text;
    
    
    let docuListPopupCol = new fn_docuListPopupCol();
	let docuListPopupHeader = new fn_docuListPopupHeader();
	
	var col, header;
	
	col = docuListPopupCol.docuListPopupCol;
	header = docuListPopupHeader.docuListPopupHeader;
    
    docuListHot.updateSettings(fn_handsonGridDocuListPopupOption(col, header));
    
    fn_searchCoListFilesPopup(sData);
};


function fn_docuForPopup(selectedRow,fileType){
	
	var sData = {};
	
	sData["srch1"] = selectedRow["rptNo"] || '';
	sData["srch2"] = selectedRow["invoiceNo"] || '';
	sData["srch3"] = selectedRow["orgFileName"];
	sData["srch4"] = fileType;
	sData["srch5"] = selectedRow["coDate"];
	sData["srch6"] = selectedRow["coName"];
	return sData;
}

function filecoDocuListClose(){
	$("#docuFileListPopUp").modal("hide");
}

// 팝업리스트
function fn_searchCoListFilesPopup(sData){
	var searchTp = $("input:radio[name=exportCoView_srch1]:checked").val();
	
	console.log("sData2",sData);
	
	
	fn_loading(true);
	$.ajax({
		type : "POST",
		url : "/export/selectFileModalUpdateList.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType : 'json',
		async: false,
        success : function(data) {
        	docuListHot.loadData([]);
        	docuListHot.loadData(data.resultList);
			setTimeout(function() {docuListHot.render()}, 200);
			fn_loading(false);
        },
        error : function(e, textStatus, errorThrown) {
        	if(e.status == 400){
        		alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        		location.href = document.referrer;
        	} else {
	        	console.log(errorThrown);
	        	alert(msgSearchError);
        	}
        }
	});
}

function fn_docuListPopupCol(){
		this.docuListPopupCol =  [
			{ data : 'checkBox', type : 'text', width:30, className : "htCenter",type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no', readOnly:false},
			{ data: 'guide', type: 'text', className: "htCenter", readOnly: true },
			{ data: 'docuFile', type: 'text', className: "htCenter", readOnly: true },
            { data: 'docuOrgFile', type: 'text', width:250 , className: "htCenter", readOnly: true },
            { data: 'uploadDt', type: 'text', width:80, className: "htCenter", readOnly: true },
           // { data: 'docuPath', type: 'text', className: "htCenter", readOnly: true },
		];
}

function fn_docuListPopupHeader(){
	
	this.docuListPopupHeader =
	 ["",'가이드','파일명2','파일명','업로드 일자'/*,'path'*/];
};


function fn_handsonGridDocuListPopupOption(col, header) {
	docuListPopupSettings = {
        columns: col,
        stretchH: 'all',
        width: '100%',
        autoWrapRow: true,
        height: 250,
        rowHeights: 25,
        rowHeaders: true,
        columnHeaderHeight: 25,
        colHeaders: header,
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
        hiddenColumns: { copyPasteEnabled: false, indicators: false, columns: [1,2/*,5*/]},
        afterGetColHeader: function(col, TH){
        	if(col == 0){
          	TH.innerHTML = "<input type='checkbox' class='checker' id='id_checkAllDocuListPopup' onclick='fn_checkAllDocuListPopup();'>";
          }
        }
    };

    return docuListPopupSettings;
}

// --------------------- 신고번호 돋보기 모달 내 파일 업로드 팝업창 ---------------------
dropzoneDocuImpUpload = document.getElementById('dropzone-file-docuUpload');

dropzoneDocuImpUpload.addEventListener('change', (event) => {
	 event.preventDefault(); 
	 const files = event.target.files; // 선택된 파일 객체들
	 Array.from(files).forEach((file) => {
		 docuLoadedFiles.push(file);
	 });
	 
	 uploadFilesDocuImp(files); // 파일 업로드 함수 호출
});

 
dropzoneDocuImpUpload.addEventListener('dragover', (event) => {
	 event.preventDefault(); 
});
 
dropzoneDocuImpUpload.addEventListener('drop', (event) => {
	 event.preventDefault(); 
	 const fileList = event.dataTransfer.files; 
	 const files = Array.from(fileList);
	 Array.from(files).forEach((file) => {
		 docuLoadedFiles.push(file);
	 });
	 
	 uploadFilesDocuImp(files);
	 
	 const fileInput = document.getElementById('dropzone-file-docuUpload');
	 fileInput.files = fileList;
});

function uploadFilesDocuImp(files) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    
    files.forEach(file => {
        console.log("Adding File:", file.name); // 파일 이름 확인
        
        const newRowIdx = docuListHot.countRows();
        docuListHot.alter('insert_row_below', newRowIdx); // 새로운 행 추가
        
        docuListHot.setDataAtCell(newRowIdx, 3, file.name); // 파일 이름
        docuListHot.setDataAtCell(newRowIdx, 1, '2'); // 가이드 번호
        docuListHot.setDataAtCell(newRowIdx, 4, formattedDate); // 업로드 날짜
    });

    docuListHot.render(); // 테이블 강제 렌더링
}

//삭제
function fn_exportCoDelete(){
	
	 var data = exportCoViewHot.getData();
	 var checked = false;
	 var list = []; 
	 
	 for (var i = 0; i < data.length; i++) {
         // 체크박스를 선택한 항목만 처리
         if (data[i][0] === 'yes') {
             checked = true;
             list.push(data[i][1]);
             console.log("선택된 항목 데이터:", list); // 선택된 항목만 출력
         }
     }
     if (!checked) {
         alert("체크박스를 선택해주세요.");
         return false;
     }
     
     if(!confirm("삭제 하시겠습니까?")){ return;}
	 
     var payload = { list: list };
     
	$.ajax({
		type : "POST",
		url : "/export/delteCoInfo.do",
		data : JSON.stringify(payload),
		contentType: "application/json; charset=utf-8",
		success : function(data) {
        	if(data == "success"){
        		alert("삭제되었습니다.");
        		$('input[name="exportCoViewType"]:radio[value="edit"]').prop('checked',true);
        		fn_changeDocumentView('edit');
        	}
        },
        error: function(e, textStatus, errorThrown) {
            console.log("HTTP Status: " + e.status);
            console.log("Response Text: " + e.responseText);
            alert("Error: " + e.responseText);
        }
	});
};

//저장
function fn_saveCoInfo(){
	if(!confirm("저장하시겠습니까?")){ return;}
	
	var saveCoInfoData = exportCoViewHot.getSourceData();
	
	var tableType = $("input:radio[name=exportCoViewType]:checked").val();
	
	for(var i=0; i<saveCoInfoData.length; i++){
		saveCoInfoData[i]["tableType"] = tableType;
	}
	
	$.ajax({
		type : "POST",
		url : "/export/saveCoInfo.do",
		data : JSON.stringify(saveCoInfoData),
		contentType: "application/json; charset=utf-8",
		success : function(data) {
        	if(data == "success"){
        		alert("저장되었습니다.");
        		$('input[name="exportCoViewType"]:radio[value="read"]').prop('checked',true);
        		fn_changeDocumentView('read');
        	}
        },
        error: function(e, textStatus, errorThrown) {
            console.log("HTTP Status: " + e.status);
            console.log("Response Text: " + e.responseText);
            alert("Error: " + e.responseText);
        }
	});
};


function fn_fileDocuModalSave() {
	
	if(docuLoadedFiles.length == 0){
		alert("저장할 파일이 없습니다.")
		return;
	}
	
 	var rptNo = "";
 	var invoiceNo = "";
 	var fileType = "";
 	var coDate = "";
 	var coName = "";
 	
	var insertDocuFile = docuListHot.getSourceData();
	
	rptNo = modalRptNo;
	invoiceNo = modalInvoice;
	fileType = modalFileType;
	coDate = modalCoDate;
	coName = modalCoName;
	
	
	$.ajax({
 		type: 'POST',
 		url: "/export/insertDocuFilesInfo.do",
 		data: formData,
 		beforeSend : function(xmlHttpRequest){
 			xmlHttpRequest.setRequestHeader("AJAX", "true");
 		},
 		dataType: 'json',
 		processData: false,
 		contentType: false,
 		success: function (data) {
 			alert('파일이 저장되었습니다.');
 			var vData = {};
 			vData["srch1"] = rptNo;
 			vData["srch2"] = blNo;
 			vData["srch4"] = invoiceNo;
 			fn_searchCoListFilesPopup(vData);
 			fn_searchCoDocuView();
 			docuLoadedFiles = [];
 		},
 		error: function (e, textStatus, jqXHR) {}
 	});
};
 

// 엑셀 다운로드 
function fn_exportCoExcelDownload(){
	$("#exportCoExcelForm").html("");
    $("#exportCoExcelForm").attr("action","/export/downloadexportCoExcel.do");
    
    //var downloadType = $(button).data("download-type");
    const hiddenIndices = [0,1,2,5,28];
    var selectedRptNo = []; 	
    $.each(fn_setexportCoView(),function(attrName,attrValue){
        $("#exportCoExcelForm").append("<input type='hidden' value=" + attrValue + " name=" + attrName + ">");
    });
    
     var data = exportCoViewHot.getData();
	 var checked = false;
	 var exportCoViewCol = new fn_exportCoViewTableCol();
	 var exportCoViewHeader = new fn_exportCoViewTableHeader();
	 var exportCoViewHidden = new fn_exportCoViewTableHidden();
	
	 
	 for (var i = 0; i < data.length; i++) {
         // 체크박스를 선택한 항목만 처리
         if (data[i][0] === 'yes') {
             checked = true;
             selectedRptNo.push(data[i][9]);
             console.log("선택된 항목 데이터:", selectedRptNo); // 선택된 항목만 출력
             exCol = fn_getExcelCol(exportCoViewCol.exportCoViewCol.filter((item, index) => !hiddenIndices.includes(index)));
             exTit = fn_getExcelHead(exportCoViewHeader.exportCoViewHeader.filter((item, index) => !hiddenIndices.includes(index)));
         }
     }
     if (!checked) {
         alert("체크박스를 선택해주세요.");
         return false;
         
     }
     
     $("#exportCoExcelForm").append("<input type='hidden' name='list2' value='" + selectedRptNo.join(",") + "'>");
     $("#exportCoExcelForm").append("<input type='hidden' name='exCol' value="+ exCol +">");
     $("#exportCoExcelForm").append("<input type='hidden' name='exTit' value="+ exTit +">");
    // $("#exportCoExcelForm").append("<input type='hidden' name='exType' value="+ downloadType +">");
    // $("#exportCoExcelForm").append("<input type='hidden' name='partnCmpnyNm' value='" + partnCmpnyNm.replace(/ /g, '-') + "'>");
     
    console.log($("#exportCoExcelForm").serializeArray());
    $("#exportCoExcelForm").submit();
    
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


function fn_checkAllDocuListPopup(){
	var check = "" ;
	var changeArr = [];
	if ( $("#id_checkAllDocuListPopup").prop("checked") == false) {
		check = "yes" ;
		isAllChecked = true;
	} else {
		check = "no" ;
		isAllChecked = false;
	}

	var data = docuListHot.getData();

	for(var i=0; i< data.length; i++){
		changeArr.push([i,0,check])
	}
	docuListHot.setDataAtCell(changeArr);
	if(check == "yes"){
		$("#id_checkAllDocuListPopup").prop("checked", true);
	} else {
		$("#id_checkAllDocuListPopup").prop("checked", false);
	}
}

// 파일 다운로드 
function fn_coDocuPopupDownload() {
	var searchTp = $("input:radio[name=exportCoView_srch1]:checked").val();
    var rowData = docuListHot.getSourceData();
    var cnt = 0;
    var docuFiles = [];
    // 현재 날짜 가져오기
    const now = new Date();

    // yymmdd 형식으로 변환
    const year = now.getFullYear().toString().slice(-2); // 뒤의 2자리
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월 (2자리)
    const day = now.getDate().toString().padStart(2, '0'); // 일 (2자리)
    const formattedDate = `${year}${month}${day}`;
    
    for (let i = 0; i < rowData.length; i++) {
        if (rowData[i].checkBox === "yes") {
            cnt++;
            //rowData[i].docuType = modalFileType;
            docuFiles.push(rowData[i]);
        }
    }
    
    if (cnt == 0) {
        alert("다운로드할 파일을 선택해 주세요.");
        return;
    }
    
    if (cnt == 1) { // 단일 파일 다운로드
    	console.log("docuFiles",docuFiles);
    	
    	$("#docuPath").val('/home/files');
        $("#docuFile").val(docuFiles[0].docuFile);
        $("#docuOrgFile").val(docuFiles[0].docuOrgFile);
        document.downloadFileOne.action = "/base/downloadFile.do";
        document.downloadFileOne.submit();
    } else {
    	var zipName = "";
        $.ajax({
            type: "POST",
            url: "/export/downloadCoFileZip.do",
            data: JSON.stringify(docuFiles),
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("AJAX", "true");
            },
            success: function(response) {
                if (response === "fail") {
                    alert("다운로드할 파일을 확인해 주세요.");
                    return;
                }
                const delay = 1000;
                if(modalFileType == 'coFile'){
                	 zipName = "FTA document" + "_" +formattedDate ;
                }else{
                	 zipName = "FTA document" + "_" + formattedDate;
                }
                $("#zipDownloadName").val(zipName);
                document.zipDownloadForm.action = "/export/downloadCoDocuFile.do";
                document.zipDownloadForm.submit();
            },
            error: function(xhr, status, error) {
                console.error("다운로드 실패:", error);
            }
        });
    }
}

function fn_coDocuPopupDelete() {
	var rowData = docuListHot.getSourceData();
	
	let itemsToDelete = [];
	let itemsToDeleteDB = []; // guide가 1인 경우 (DB에 저장된 항목들)
    let itemsToDeleteClient = []; // guide가 2인 경우 (클라이언트에서만 삭제할 항목들)
    var cnt = 0;

    // 삭제할 항목 분류
    for (let i = 0; i < rowData.length; i++) {
        if (rowData[i].checkBox === "yes") {
            cnt++;
            if (rowData[i].guide === "1") {
            	 rowData[i].docuType  = modalFileType;
                 itemsToDeleteDB.push(rowData[i]); // guide가 1인 항목
            } else if (rowData[i].guide === "2") {
                itemsToDeleteClient.push(i); // guide가 2인 항목의 인덱스
            }
        }
    }
    
    
    
    if (cnt == 0){
    	alert("선택된 파일이 없습니다.");
    	return;
    }
    console.log("modal"+modalFileType);
    console.log("JSON.stringify(itemsToDeleteDB)"+JSON.stringify(itemsToDeleteDB));
    if (confirm("파일을 삭제하시겠습니까?")) {
        // 1.서버에 저장된 파일 삭제 요청(guide가 1일때)
    	if(itemsToDeleteDB.length > 0){
    		$.ajax({
                type: "POST",
                url: "/export/deleteCoDocuFile.do",
                data: JSON.stringify(itemsToDeleteDB),
                contentType: 'application/json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("AJAX", "true");
                },
                success: function(data) {
                    // 삭제 성공 시 해당 항목 삭제
                   
                	for (let i = itemsToDeleteDB.length - 1; i >= 0; i--) {
                        const rowIndex = rowData.findIndex(row => row === itemsToDeleteDB[i]);
                        if (rowIndex > -1) {
                            docuListHot.alter('remove_row', rowIndex);
                        }
                    }
                    alert("파일이 삭제되었습니다.");
                    filecoDocuListClose();
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 400) {
                        alert("에러 발생");
                        location.href = document.referrer;
                    } else {
                        console.log(errorThrown);
                        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                    }
                }
            });
    	}
    	
    	 // 2. 클라이언트에서만 삭제 (guide가 2인 항목)
        if (itemsToDeleteClient.length > 0) {
            for (let i = itemsToDeleteClient.length - 1; i >= 0; i--) {
                docuListHot.alter('remove_row', itemsToDeleteClient[i]); // 클라이언트 행 삭제
            }
            console.log('클라이언트에서 업로드된 파일이 삭제되었습니다.');
        }
    } 
}

