<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%
    Date today = new Date();
    SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
%>
<!doctype html>
<html lang="ko">
<head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <title>수입 신고 현황</title>
 <script src="/pf/js/import/importView.js?v=<%=fmt.format(today)%>" charset="UTF-8"></script>
 <script src="/pf/js/function.js"></script>
 <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
 <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=87cd230a90cc4f535debc44be63d4245&libraries=services" defer></script>
 <script type="text/javascript">
 	var grpCd = "${grpCd}";
 </script>
 <!-- Flatpickr CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<!-- Flatpickr JS -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
 
 <style>
   .truncate-text {
      display: inline-block;
      max-width: 330px; 
      white-space: nowrap; 
      overflow: hidden;  
      text-overflow: ellipsis;  
   }
	#impTodayViewTable {
	    display: flex;
	    flex-direction: column;
	    padding: 15px;
	    box-sizing: border-box;
	}
	.impToday-row {
	    display: flex;
	    gap: 10px;
	}
	.impToday-cell {
	    flex: 1;
	    padding: 15px 20px;
	    border: 1px dashed #ccc;
	    text-align: center;
	    border-radius: 8px;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    border: 1px dashed rgb(45, 126, 98);
	    margin-right: 30px;
	    margin-left: 30px;
	}

	.modal-popup-analysis {
    display: flex;
    align-items: center;
    justify-content: center;
	}
	
	.modal-popup-analysis.hidden {
	    display: none;
	}
	.progress-bar {
	    width: 0%;
	    height: 30px;
	}
 </style>

</head>
<body class="flex flex-col max-h-fit">
<main class="p-2 grow flex flex-col gap-2">
  <form class="w-full shrink-0 grid grid-rows-5 grid-cols-[auto_repeat(5,1fr)_auto_repeat(5,1fr)]
    			row-start-1 col-start-1 col-span-2 bg-white dark:bg-slate-800 shadow-sm rounded-lg
    			border border-slate-200 dark:border-slate-700 px-4 py-3 gap-1 z-1 text-base *:text-base items-center">
    <input type="hidden" id="grpCd" value="${grpCd}">
    <div class="row-start-1 col-span-6 col-end-13 flex flex-row gap-2 items-end justify-end">
      <button type="button" onclick="fn_searchImportView('');"
        	  class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700
        			 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none
        			 duration-300 row-start-1"><i class="fa-regular fa-search mr-1"></i>
        	${srch}
      </button>
      <button type="button" onclick="fn_clearImportView()"
        	  class="text-primary-600 bg-primary-100 border border-primary-500 hover:bg-secondary-100 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none duration-300">
        <i class="fa-regular fa-times mr-1"></i>
        	${clear}
      </button>
    </div>
    <label class="col-start-1 row-start-1 col-span-1 row-span-1 flex items-center font-medium text-gray-900 pr-2">
      	${srchType} <!-- 검색구분 -->
    </label>
	<div class="flex flex-row flex-wrap gap-4 col-start-2 col-span-5 row-start-1 items-center *:flex *:flex-row *:items-center *:gap-2 font-medium text-gray-900">
      <label for="default-radio-1">
        <input id="default-radio-1" type="radio" value="01" name="importView_srch1" checked
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${all}</span> <!-- 전체 -->
      </label>
      <label for="default-radio-2">
        <input id="default-radio-2" type="radio" value="02" name="importView_srch1"
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${acceptance}</span> <!-- 수리 -->
      </label>
      <label for="default-radio-3">
        <input id="default-radio-3" type="radio" value="03" name="importView_srch1"
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${pending}</span> <!-- 대기 -->
      </label>
      <label for="default-radio-4">
        <input id="default-radio-4" type="radio" value="04" name="importView_srch1"
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${approval}</span> <!-- 결재 -->
        </label>
      <label for="default-radio-5">
        <input id="default-radio-5" type="radio" value="05" name="importView_srch1"
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${fail}</span> <!-- 미결 -->
        </label>
      <label for="default-radio-6">
        <input id="default-radio-6" type="radio" value="06" name="importView_srch1"
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${beforeDeclare}</span> <!-- 신고 전 -->
      </label>
      <label for="default-radio-7">
        <input id="default-radio-7" type="radio" value="07" name="importView_srch1"
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <span>${afterDeclare}</span> <!-- 신고 후 -->
      </label>
    </div>
  	<label class="col-start-1 row-start-2 col-span-1 row-span-1 flex items-center font-medium text-gray-900 pr-2">
      	${srchDate} <!-- 검색기간 -->
    </label>
    <select id="importViewDateType" class="row-start-2 col-start-2 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5">
      <option value="01" selected>${rptday}</option> <!-- 신고일자 -->
      <option value="02">${lisDay}</option> <!-- 수리일자 -->
    </select>
    <div class="col-start-3 row-start-2 col-span-4 flex flex-wrap md:flex-nowrap items-center gap-1">
		 <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
			<input type="text" class="form-control band-calendar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="importView_srch2" name="importView1_date"
				onKeypress="javascript:if(event.keyCode==13) {$('.calendar-popup-container').removeClass('calendar-popup-container_active'); $(this).blur()}" onkeyUp="fn_dateInputForm($(this))" 
				autocomplete="off">
		</div>
		 <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
			<input type="text" class="form-control band-calendar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="importView_srch3" name="importView2_date"
				onKeypress="javascript:if(event.keyCode==13) {$('.calendar-popup-container').removeClass('calendar-popup-container_active'); $(this).blur()}" 
				onkeyUp="fn_dateInputForm($(this))"
				autocomplete="off">
		</div>  
    </div> 
 
    <div id="importUp_div1" class="flex items-center gap-1 col-start-7 row-start-2 col-span-4">
      <button type="button" onclick="fn_impViewchgDate1()"
          class="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
	      ${today} <!-- 당일 -->
      </button>
      <button type="button" onclick="fn_impViewchgDate2()"
          class="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
	      ${week} <!-- 이번주 -->
      </button>
      <button type="button" onclick="fn_impViewchgDate3()"
          class="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
      	  ${month} <!-- 당월 -->
      </button>
      <button type="button" onclick="fn_impViewchgDate4()"
          class="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
          ${lastMonth} <!--  전월 -->
      </button>
    </div>
    
    <label for="n0" class="row-start-3 col-start-1 flex items-center font-medium text-gray-900 pr-2">
      	${rptNo} <!-- 신고번호 -->
    </label>
    <input type="text" id="importView_srch4" onkeyup="enterkey()"
      class="row-start-3 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
      placeholder="${msgInputImpRptNo}">
      
    <label for="n2" class="row-start-3 col-start-7 flex items-center font-medium text-gray-900 px-2">
    	${blNo} <!-- B/L 번호 -->
    </label>
    
    <input type="text" id="importView_srch5" onkeyup="enterkey()"
            class="row-start-3 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="${msgInputBlNo}">
    <select id="importViewSrchType1" style="width:100px;"
      		class="row-start-4 col-start-1 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-1 py-1">
      <option value="" selected>${select}</option> <!-- 조건선택 -->
      <option value="nab_firm">${nabFirm}</option> <!-- 납세의무자 -->
      <option value="sup_firm">${tradePartner}</option> <!-- 무역거래처 -->
      <option value="Exc_Cot">${tradeType}</option> <!-- 거래구분 -->
      <option value="Con_Ki_Cot">${payment}</option> <!-- 결제방법 -->
      <option value="Con_Cod">${incoterms}</option> <!-- 인도조건 -->
      <option value="sup_st">${overseasNationMark}</option> <!-- 해외공급자부호 -->
      <option value="fod_mark">${mark}</option> <!-- 적출국(부호) -->
      <option value="ori_st_prf_yn">${FtaStatus}</option> <!-- FTA적용여부 -->
      <option value="reporter">${reporter}</option> <!-- 신고인 -->
    </select>
    <input type="text" id="importViewSrchText1" onkeyup="enterkey()" 
      	   class="row-start-4 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      			  focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1">
      
    <select id="importViewSrchType2" style="width:100px;"
      class="row-start-4 col-start-7 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-1 py-1">
      <option value="" selected>${select}</option> <!-- 조건선택 -->
      <option value="nab_firm">${nabFirm}</option> <!-- 납세의무자 -->
      <option value="sup_firm">${tradePartner}</option> <!-- 무역거래처 -->
      <option value="Exc_Cot">${tradeType}</option> <!-- 거래구분 -->
      <option value="Con_Ki_Cot">${payment}</option> <!-- 결제방법 -->
      <option value="Con_Cod">${incoterms}</option> <!-- 인도조건 -->
      <option value="sup_st">${overseasNationMark}</option> <!-- 해외공급자부호 -->
      <option value="fod_mark">${mark}</option> <!-- 적출국(부호) -->
      <option value="ori_st_prf_yn">${FtaStatus}</option> <!-- FTA적용여부 -->
      <option value="reporter">${reporter}</option> <!-- 신고인 -->
    </select>
    <input type="text" id="importViewSrchText2" onkeyup="enterkey()"
      	   class="row-start-4 col-span-5 col-start-8 bg-gray-50 border border-gray-300 text-gray-900
      			  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
      	   placeholder="">
  </form>
  
<!-- '.impToday-cell' -->
<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
  <div class="flex items-center space-x-4">
    <p class="card-title inline">${impDeclareToday}</p> <!-- 당일수입신고요약 -->
    <!-- <label for="default-checkbox"><i class="fa-solid fa-check"></i>&nbsp;타관세사 포함
    <input onclick="fn_impTodayInclOth()" 
           name="importView_srch7" id="default-checkbox" type="checkbox" value="01" 
           class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 
                  dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	</label>    -->   
  </div>

  <div class="impToday-row">
    <div class="impToday-cell" data-type="1">
      <div>${impDeclareReq}</div> <!-- 수입신고의뢰 -->
      <div id="reqCnt"></div>
    </div>
    <div class="impToday-cell" data-type="2">
      <div>${impDeclareIng}</div> <!-- 수입신고진행중 -->
      <div id="ingCnt"></div>
    </div>
    <div class="impToday-cell" data-type="3">
      <div>${impDeclareFail}</div> <!-- 수입신고미결 -->
      <div id="failCnt"></div>
    </div>
    <div class="impToday-cell" data-type="4">
      <div>${impDeclarePending}</div> <!-- 수입신고수리대기 -->
      <div id="stbCnt"></div>
    </div>
    <div class="impToday-cell" data-type="5">
      <div>${impDeclareAccept}</div> <!-- 수입신고수리(결재) -->
      <div id="apvCnt"></div>
    </div>
    <div class="impToday-cell" data-type="6">
      <div>${impDeclareCmp}</div> <!-- 수입신고수리완료 -->
      <div id="cmpCnt"></div>
    </div>
  </div>
</div>


<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
  <div class="flex items-center justify-between mb-3">
    <p class="card-title inline"><i class="fa-duotone fa-chart-network text-primary-900"></i>&nbsp;
    	${impViewCnt}: <span id="importViewCnt">0</span> <!-- 수입신고현황 결과 -->
    </p>
    <div class="flex items-center gap-2">
      <button type="button" onclick="fn_importViewExcelDownload()"
        class="text-white bg-primary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-2.5 py-1.5 focus:outline-none duration-300 row-start-1 text-base">
        <i class="fa-regular fa-download"></i>${statusExcelDown} <!-- 현황 Excel 다운로드 -->
      </button>
      <button type="button" onclick="fn_impDetailModalShow()"
        class="text-white bg-primary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-2.5 py-1.5 focus:outline-none duration-300 row-start-1 text-base">
        <i class="fa-regular fa-download"></i>${detailExcelDown} <!-- 상세 Excel 다운로드 -->
      </button>
      <select id="importViewPageCnt" name="importViewPageCnt"
        class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <option value="50">ROWS[50]</option>
        <option value="100">ROWS[100]</option>
        <option value="150">ROWS[150]</option>
        <option value="200">ROWS[200]</option>
      </select>
    </div>
  </div>
  <input id="impTodayType" type="hidden">
  <div id="importViewTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0"></div>
</div>
 

<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
	<section class="import-status-container w-full">
	  <div class="table-block w-full my-1.5 rounded overflow-hidden">
	    <div class="pl-0 text-xl text-white flex items-center" style="padding-left: 0; text-align: left;">
	      <button class="flex items-center w-full justify-between py-2.5 pr-4" onclick="lanAndSpecToggle()" style="color: black;">
	        	${lanAndSpecInfo} <!-- 란, 규격 정보 -->
	        <i id="table-toggle-icon" class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	      </button>
	    </div>
	    <div id="impLanSpecContainer" class="hidden">
	      <div class="grow grid grid-cols-2 min-h-[7rem] grid-rows-[1fr] gap-0">
	        <div class="bg-white shadow-sm rounded-lg border border-slate-200" id="importViewLanTable"></div>
	        <div class="bg-white shadow-sm rounded-lg border border-slate-200" id="importViewSpecTable"></div>
	      </div>
	    </div>
	  </div>
	</section>
</div>

<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
	<p class="card-title inline">${impAndshipProgressInfo}</p> <!-- 수입신고 및 운송 진행정보  -->
	<div id="impShipViewTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0"></div>
</div>


<div style="height: 20px;" class="footer-placeholder"></div>
<div id="impViewFileListPopUp" class="modal fade fixed top-0 left-0 h-full w-full z-[200] bg-black/50 items-center justify-center duration-300" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
		aria-hidden="true" style="display: none; ">
<div class="modal-close absolute top-0 left-0 w-full h-full"></div>
	<div class="modal-dialog modal-xl" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width:800px;" >
		<div class="modal-content bg-white shadow-lg relative rounded min-w-80 overflow-hidden">
			<div class="pl-7 pr-5 py-2 text-white bg-primary-900 flex items-center justify-between">
				<h1 class="impModal-title">
					<span></span>
				</h1>
				<button type="button" onclick="impViewFileListClose()" class="modal-close text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
			</div>
			<div class="pl-7 pr-5 py-2 flex items-center justify-end">
			    <button type="button" onclick="fn_impViewFileDown()" class="px-3 py-2 rounded-lg text-white hover:opacity-50 border-2 border-transparent duration-150 bg-primary-700 ">
		        <i class="fa-regular fa-download"></i>&nbsp;${download} <!-- 다운로드 -->
		        </button>
			</div>
			<div class="modal-body">
				<div id="impViewListPopupTable" class="grow bg-white shadow-sm h-full max-h-[100rem] rounded-lg border border-slate-200 z-0"></div>
				  <form name="impViewZipDownForm" method="post">
					<input type="hidden" name="impViewZipDown" id="impViewZipDown" />
					<input type="hidden" name="impDocuOrgFile" id="impDocuOrgFile" />
					<input type="hidden" name="impDocuFile" id="impDocuFile" />
					<input type="hidden" name="impDocuPath" id="impDocuPath" />
				  </form>
			</div> 
		</div>
	</div>
</div>


<div class="modal fade fixed top-0 left-0 h-full w-full z-[200] bg-black/50 items-center justify-center duration-300" 
  		id="impDetailViewListPopUp" tabindex="-1" aria-labelledby="exampleModalCenterTitle"
    	style="display: none;">
    <div class="modal-close absolute top-0 left-0 w-full h-full"></div>
    <div class="modal-dialog" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px;">
        <div class="modal-content bg-white shadow-lg relative rounded min-w-80 overflow-hidden">
            <div class="pl-5 pr-3 py-2 text-white bg-primary-900 flex items-center justify-between">
               <h1>
                  <span style="margin-left: 16px;">${selectToDeadLine}</span>
               </h1>
            <div class="flex items-center">
		        <button type="button" onclick="impDetailModalClose()" class="modal-close text-xl px-1 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center">
		            <i class="far fa-xmark"></i>
		        </button>
    		</div>
            </div>
            <div id="transInfo-container" class="container mx-auto p-3 border border-gray-300">
	            <p class="card-title text-center" 
				   style="line-height: 24px; font-weight: bold; color: rgb(45, 126, 98); font-size: 14px;">
				   ${msgDetailExcelDown} <!-- 상세 Excel 다운로드는 전일까지의 데이터만 다운 가능합니다. -->
				</p>
               <div class="grid grid-cols-8 gap-1">
                  <select id="impDetailDateType" class="row-start-2 col-start-2 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5">
				      <option value="01" selected>${lisDay}</option> <!-- 수리일자 -->
			      </select>
			    <div class="col-start-3 row-start-2 col-span-4 flex flex-wrap md:flex-nowrap items-center gap-1">
					<div class="relative grow">
			        	<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
				            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
				          </svg>
			        	</div>
						<input type="text" class="form-control calenar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							id="impDetailDate" name="impDetailDate"
							autocomplete="off" onclick="dateDeadLine(this)">
					</div>
					 <div class="relative grow">
			        	<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
				            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
				          </svg>
			        	</div>
						<input type="text" class="form-control band-calenar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							id="impDetailDate2" name="impDetailDate2"
							autocomplete="off" onclick="dateDeadLine2(this)">
					</div>
				 	<button type="button" onclick="impDetailExcelDown()" 
				        class="px-2 py-1.5 rounded-md text-white hover:opacity-50 border-2 border-transparent duration-150 bg-primary-700">
				        <i class="fa-regular fa-download"></i>
				    </button>
			    </div> 
                </div>
                <div class="p-5">
		           	<div class="progress-container w-full bg-gray-200 rounded">
		               <div id="progressBar" class="progress-bar bg-blue-500 text-white text-center text-sm h-4 rounded" style="width: 0%;">0%</div>
		           	</div>
        		</div>
           </div>
        </div>
    </div>
</div>
<script>
	var state = "${state}";
	var shipState = "${shipState}";
	var rptNo = "${rptNo}";
	var blNo = "${blNo}";
	var nabFirm = "${nabFirm}";
	var tradePartner = "${tradePartner}"; /* 무역거래처 */
	var entryDt = "${entryDt}"; /* 반입일자 */
	var rptday = "${rptday}"; /* 신고일자 */
	var lisDay = "${lisDay}"; /* 수리일자 */
	var tradeType = "${tradeType}"; /* 거래구분 */
	var payment = "${payment}"; /* 결제방법 */
	var incoterms = "${incoterms}"; /* 인도조건 */
	var freight = "${freight}"; /* 운임 */
	var insurance = "${insurance}"; /* 보험료 */
	var totWeight = "${totWeight}"; /* 총중량 */
	var totPackCnt = "${totPackCnt}"; /* 총포장개수 */
	var currency = "${currency}"; /* 통화단위 */
	var declarePrice = "${declarePrice}"; /* 신고금액 */
	var taxPaid = "${taxPaid}"; /* 납부세액 */
	var overseasNationMark = "${overseasNationMark}"; /* 해외공급자국가부호 */
	var mark = "${mark}"; /* 적출국부호 */
	var FtaStatus = "${FtaStatus}"; /* FTA적용여부 */
	var reporter = "${reporter}"; /* 신고인 */
	
	var lanNo = "${lanNo}"; /* 란번호 */
	var hsCd = "${hsCd}"; /* 세번부호 */
	var type = "${type}"; /* 구분 */
	var taxRate = "${taxRate}"; /* 세율 */
	var description1 = "${description1}"; /* 품명 */
	var goodsName = "${goodsName}"; /* 거래품명 */
	var dutiableVal = "${dutiableVal}"; /* 과세가격(KRW) */
	var tax = "${tax}"; /* 관세 */
	var vat = "${vat}"; /* 부가세 */
	var cs = "${cs}"; /* CS */
	var abetment = "${abetment}"; /* 감면여부 */
	var netWeight = "${netWeight}"; 
	
	var lanNo = "${lanNo}"; /* 란번호 */
	var specNo = "${specNo}"; /* 규격번호 */
	var description1 = "${description1}"; /* 품명 */
	var qty = "${qty}"; /* 수량 */
	var unit = "${unit}"; /* 단위 */
	var unitPrice = "${unitPrice}"; /* 단가 */
	var price = "${price}"; /* 금액 */
	var description2 = "${description2}"; /* 품명2 */
	var ingredient = "${ingredient}"; /* 성분1 */
	var ingredient2 = "${description2}"; /* 성분2 */
	
	var shipProcess = "${shipProcess}"; /* 처리단계 */
	var shipDt = "${shipDt}"; /* 처리일시 */
	var arrivalAdress = "${arrivalAdress}"; /* 도착지주소/장치장/장치위치 */
	var blockName = "${blockName}"; /* 장치장명 */
	var packCnt = "${packCnt}"; /* 포장개수 */
	var weight = "${weight}"; /* 중량 */
	var impExpDt = "${impExpDt}"; /* 반출입일시 */
	var impExpContent = "${impExpContent}"; /* 반출입내용 */
	var rptNo = "${rptNo}"; /* 신고번호 */
	var impExpNo = "${impExpNo}"; /* 반출입근거번호 */
	
	var fileType = "${fileType}";
	var fileName = "${fileName}";
	var uploadDt = "${uploadDt}";
	
	var msgSelectFile = "${msgSelectFile}";
	var msgDetailExcelDown = "${msgDetailExcelDown}";
</script>
</main>
</body>
</html>
