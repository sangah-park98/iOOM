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
  <title>ITEM 정보</title>
  <script type="module" src="/pf/assets/dropdown-init.js"></script>
  <script src="/pf/js/function.js"></script>
  <script>
	var itemGoodsInfo = "${itemGoodsInfo}";
	var transactionStatus = "${transactionStatus}";
	var restrictedItem = "${restrictedItem}";
	var hsCode = "${hsCode}";
	var goodsName = "${goodsName}";
	var description = "${description}";
	var itemUnit = "${itemUnit}";
	var itemPrice = "${itemPrice}";
	var itemAvgPrice = "${itemAvgPrice}";
	var hsCodeType = "${hsCodeType}";
	var requirement = "${requirement}";
	var itemHsStatus = "${itemHsStatus}";
	var itemCheckList = "${itemCheckList}";
	var firstLisday = "${firstLisday}";
	var lastLisday = "${lastLisday}";
	var memo = "${memo}";
	var check = "${check}";
	var transUnit = "${transUnit}";
	var currency = "${currency}";
	var checkDt = "${checkDt}";
	var insepctor = "${insepctor}";
	var viewDetail = "${viewDetail}";
	
	var nabFirm = "${nabFirm}";
	var rptNo = "${rptNo}";
	var lanNo = "${lanNo}";
	var specNo = "${specNo}";
	var taxType = "${taxType}";
	var taxRate = "${taxRate}";
	var settlingPrice = "${settlingPrice}";
	var curOfSettlement = "${curOfSettlement}";
	var taxPaid = "${taxPaid}";
	var reporter = "${reporter}";
	var maxPrice = "${maxPrice}";
	var minPrice = "${minPrice}";
	var avgPrice = "${avgPrice}";
	var nabFirm = "${nabFirm}";
	var impAvgPrice = "${impAvgPrice}";
	var expAvgPrice = "${expAvgPrice}";
	
	var blNo = "${blNo}";
	var lisDay = "${lisDay}";
	var declartionPrice = "${declartionPrice}";
	var declartionUnit = "${declartionUnit}";
	var curOfMethod = "${curOfMethod}";
	var overseas = "${overseas}";
	var curOfSettlement = "${curOfSettlement}";
	var wonPrice = "${wonPrice}";
	var itemAvgPrice = "${itemAvgPrice}";
	var priceAvgDiff = "${priceAvgDiff}";
	
	var customsCheckTarget = "${customsCheckTarget}";
	var includeRequirement = "${includeRequirement}";
	var excludeRequirement = "${excludeRequirement}";
	var requirementDocu = "${requirementDocu}";
	var approvalNo = "${approvalNo}";
	var excludeCd = "${excludeCd}";
	var excludeReason = "${excludeReason}";
	var reporter = "${reporter}";
	
	var msgInputInspectionRsn  = "${msgInputInspectionRsn}";
	var msgSelectInspectHistory  = "${msgSelectInspectHistory}";
	var msgDelInspectionHistory  = "${msgDelInspectionHistory}";
	var msgFileDel  = "${msgFileDel}";
	var msgZeroToHundred  = "${msgZeroToHundred}";
	var msgQuestExcelDown  = "${msgQuestExcelDown}";
	var msgDataCollectInProgress2  = "${msgDataCollectInProgress2}";
	var msgCheckDown  = "${msgCheckDown}";
</script>
<script src="/pf/js/item/itemView.js?v=<%=fmt.format(today)%>" charset="UTF-8"></script>
<style>
   .htRowFocused {
	  background-color: #e8f0fe !important; /* 스타일을 강제 적용 */
	  outline: 2px solid #4285f4 !important; /* 예시: 테두리 색상 변경 */
   }
</style>
</head>
<body class="flex flex-col max-h-fit">
<main class="p-2 grow flex flex-col gap-2">
<form class="w-full shrink-0 grid grid-rows-3 grid-cols-[auto_repeat(2,1fr)_auto_repeat(2,1fr)auto_repeat(2,1fr)auto_repeat(2,1fr)] row-start-1 col-start-1 col-span-2 bg-white dark:bg-slate-800 shadow-sm rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 gap-1 z-1 text-base *:text-base items-center">
  	<input type="hidden" id="grpCd" value="${grpCd}">
	<div class="row-start-1 col-start-7 col-span-6 flex items-end justify-end gap-4">
		<button type="button" onclick="fn_searchItemView();"
	    	  class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700
	    			focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none duration-300">
	    	<i class="fa-regular fa-search mr-1"></i>
	    	${srch}
	  	</button>
	  	<button type="button" onclick="fn_clearItemView()"
	    	  class="text-primary-600 bg-primary-100 border border-primary-500 hover:bg-secondary-100
	    			focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none duration-300">
	    	<i class="fa-regular fa-times mr-1"></i>
	    	${clear}
	  	</button>
	</div>
    <label class="col-start-1 row-start-1 col-span-1 row-span-1 flex items-center font-medium text-gray-900 pr-2">
		${srchType}
   	</label>
    <div class="flex flex-row flex-wrap gap-4 col-start-2 col-span-5 row-start-1 items-center *:flex *:flex-row *:items-center *:gap-2 font-medium text-gray-900">
      	<label for="default-radio-1">
        	<input id="default-radio-1" name="itemView_srch1" onclick="handleSearchTypeChange()" 
        			type="radio" value="01" checked="checked"
            		class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        	<span>${all}</span>
      	</label>
      	<label for="default-radio-2">
        	<input id="default-radio-2"
          			type="radio" name="itemView_srch1" onclick="handleSearchTypeChange()"
          			value="02" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        	<span>${imp}</span>
      	</label>
      	<label for="default-radio-5">
        	<input id="default-radio-5"
		          type="radio" name="itemView_srch1" onclick="handleSearchTypeChange()"
		          value="03" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        	<span>${exp}</span>
      	</label>
    </div>
    <label class="col-start-1 row-start-2 col-span-1 row-span-1 flex items-center font-medium text-gray-900 pr-2">
      	${srchDate}
    </label>
    <select id="itemView_srch10" class="row-start-2 col-start-2 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5">
    	<option selected value="01">${lisDay}</option>
    </select>
    <div class="col-start-3 row-start-2 col-span-4 flex flex-wrap md:flex-nowrap items-center gap-1">
      <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input type="text" class="form-control band-calendar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="itemView_srch2" name="itemView1_date"
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
			id="itemView_srch3" name="itemView2_date"
			onKeypress="javascript:if(event.keyCode==13) {$('.calendar-popup-container').removeClass('calendar-popup-container_active'); $(this).blur()}" 
			onkeyUp="fn_dateInputForm($(this))"
			autocomplete="off">
      </div>
    </div>
    <div class="flex items-center gap-1 col-start-7 row-start-2 col-span-4">
      <button type="button" onclick="fn_chgDate1()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
      		${sixMonth}
      </button>
      <button type="button" onclick="fn_chgDate2()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
        	${oneYr}
      </button>
      <button type="button" onclick="fn_chgDate3()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
        	${threeYr}
      </button>
      <button type="button" onclick="fn_chgDate4()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border text-nowrap
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700">
        	${fiveYr}
      </button>&nbsp;
       <!-- <input onclick="fn_checkboxClick()" name="itemView_srch13" id="default-checkbox" 
      		 type="checkbox" value="01" 
           	 class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    	<label for="default-checkbox">
    		중복허용
    	</label>  -->
    </div>
    <!-- <label for="n0" class="row-start-3 col-start-1 flex items-center font-medium text-gray-900 pr-2">
	      자재코드
    </label>
    <input type="text" id="itemView_srch5" onkeyup="enterkey()"
      		class="row-start-3 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
      		placeholder="자재코드를 입력해주세요.">
    <label for="n2" class="row-start-3 col-start-7 flex items-center font-medium text-gray-900 px-2">
    	Description
    </label>
    <input type="text" id=itemView_srch6 onkeyup="enterkey()"
            class="row-start-3 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="Description을 입력해주세요."> -->
   	<select id="itemViewSrchType1" style="width:100px;"
      		class="row-start-3 col-start-1 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-1 py-1">
    	<option value="" selected>${select}</option>
      	<option value="itemCode">${hsCode}</option> <!-- 자재코드 -->
      	<option value="goodsName">${goodsName}</option> <!-- 거래품명 -->
      	<option value="description">Description</option> <!-- Description -->
      	<option value="qtyUnit">${itemUnit2}</option> <!-- 거래물량 -->
      	<option value="price">${itemPrice2}</option> <!-- 거래금액 -->
      	<option value="average">${avgPrice}</option> <!-- 평균단가 -->
      	<option value="hs">${latestHs}</option> <!-- 최신세번 -->
      	<option value="hsCnt">${hsCodeType}</option> <!-- HS CODE 종류 -->
      	<option value="lawCd">${requirement}</option> <!-- 요건 -->
    </select>
    <input type="text" id="itemViewSrchText1" onkeyup="enterkey()" 
      		class="row-start-3 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      				focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1">
    
    <div class="flex items-center gap-1 col-start-8 row-start-3 col-span-5">
    								<!-- 관리현황 -->
    <span class="whitespace-nowrap">${itemHsStatus}</span>&nbsp;&nbsp;
    
    <label for="check-status-1" class="flex flex-row items-center space-x-1">
        <input id="check-status-1" name="itemView_srch4"
               type="radio" value="01" checked
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500">
        <span>${all}</span>
    </label>&nbsp;
    <label for="check-status-2" class="flex flex-row items-center space-x-1">
        <input id="check-status-2" name="itemView_srch4"
               type="radio" value="02" 
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500">
        <span>${itemFine}</span> <!-- 양호 -->
    </label>&nbsp;
    
    <label for="check-status-3" class="flex flex-row items-center space-x-1">
        <input id="check-status-3" name="itemView_srch4"
               type="radio" value="03" 
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500">
        <span>${itemWarn}</span> <!-- 점검 필요 -->
    </label>&nbsp;

    <label for="check-status-4" class="flex flex-row items-center space-x-1">
        <input id="check-status-4" name="itemView_srch4"
               type="radio" value="04" 
               class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500">
        <span>${itemCmp}</span> <!-- 점검 완료 -->
    </label>
</div>
</form>

<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
  <div class="flex items-center justify-between mb-3">
    <p class="card-title inline"><i class="fa-duotone fa-chart-network text-primary-900"></i>&nbsp;
    	${itemViewCnt}: <span id="itemViewCnt">0</span>
    </p>
    <div class="flex items-center gap-2">
      <button type="button" onclick="fn_itemViewExcelDownload()"
        class="text-white bg-primary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-2.5 py-1.5 focus:outline-none duration-300 row-start-1 text-base">
        <i class="fa-regular fa-download"></i> ${excelDown}
      </button>
      <select id="itemViewPageCnt" name="itemViewPageCnt"
      		  class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      	<option value="50" selected>Rows [50]</option>
		<option value="100">Rows [100]</option>
		<option value="200">Rows [200]</option>
		<option value="500">Rows [500]</option>
      </select>
    </div>
  </div>
  <div id="itemViewTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0"></div>
</div>
<!---------------------------------------------------------------------------->
<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
  <div class="flex items-center justify-between mb-3">
    <p class="card-title inline"><i class="fa-duotone fa-chart-network text-primary-900"></i>&nbsp;
    	${itemHsDiffList} <!-- HS CODE 적용내역 -->
    </p>
  </div>
  <div id="itemHsCodeDiffTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0"></div>
</div>
<!---------------------------------------------------------------------------->
<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
  <div class="flex items-center justify-between mb-3">
    <p class="card-title inline"><i class="fa-duotone fa-chart-network text-primary-900"></i>&nbsp;
    	${unitPrice} <!-- 단가 -->
    </p>
  </div>
  <div class="flex">
    <div id="itemPriceTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0 w-1/2"></div>
    <div class="flex items-center space-x-4 w-1/2 pl-4">
        <label for="n0" class="text-base text-gray-900">
		    ${baseRatio} <!-- 기준비율 -->
		</label>
        <input type="text" id="itemOutOfRate" value="10" onkeyup="enterkey2()" style="font-size: 13px;"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5 w-20">%
        <button type="button" onclick="fn_searchItemOutOfRate(itemCode);"
		    class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-4 py-1.5 text-sm focus:outline-none duration-300">
		    <i class="fa-regular fa-search mr-1"></i>
		    ${srch}
		</button>
     </div>
  </div>
  <div style="height: 20px;"></div>
  <div class="table-container">
  	<div class="row-start-1 col-span-6 col-start-7 flex flex-col items-start justify-start">
        <div class="flex items-center gap-1 w-full justify-between">
	       	<p class=" my-2 truncate flex items-center gap-1 shrink-0 ml-3"><i class="fa-duotone fa fa-minus text-primary-900 text-xs"></i>
	       		${itemPriceChart} <!-- 직전 2년 단가변동 그래프 -->
	        </p>
        </div>
        <div class="w-full h-[255px] overflow-auto">
        	<div class="itemPriceChart" >
          		<canvas id="itemPriceChart" style="height:220px;"></canvas>
          	</div>
        </div>
     </div>
  </div>
  <div style="height: 20px;"></div>
<!---------------------------------------------------------------------------->
  <p class="card-title inline ml-3"><i class="fa-duotone fa fa-minus text-primary-900 text-xs"></i>
    	${outOfRateRptNoList} <!-- 기준비율 초과 신고내역 -->
    </p>
  <div id="itemRptNoTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0"></div>
</div>
<!---------------------------------------------------------------------------->
<div id="transInfo-container" class="mx-auto p-3 border border-gray-300 w-full">
  <div class="flex items-center justify-between mb-3">
    <p class="card-title inline"><i class="fa-duotone fa-chart-network text-primary-900"></i>&nbsp;
    	${requirementStatus} <!-- 요건적용여부 -->
    </p>
  </div>
  <div id="itemLawCdTable" class="grow bg-white shadow-sm rounded-lg border border-slate-200 z-0"></div>
</div>
</main>
<!---------------------------------------------------------------------------->
<div style="height: 20px;" class="footer-placeholder"></div>
<div id="itemCodeChkPopUp" class="modal fade fixed top-0 left-0 h-full w-full z-[200] items-center justify-center duration-300" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: none;">
	<div class="modal-close absolute top-0 left-0 w-full h-full"></div>
	<div class="modal-dialog modal-xl" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width:800px; height: 330px;">
		<div class="modal-content bg-white shadow-lg relative rounded min-w-80 overflow-hidden">
			<div class="pl-7 pr-5 py-2 text-white bg-primary-900 flex items-center justify-between">
				<h1 class="itemCodeChkTitle">
					<span></span>
				</h1>
				<button type="button" onclick="itemCodeChkClose()" class="modal-close text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
			</div>
			<div class="modal-body">
			    <div id="itemCodeChkPopupTable" class="grow bg-white shadow-sm h-full max-h-[100rem] rounded-lg border border-slate-200 z-0"></div>
			    <div id="memoDiv" class="flex items-center gap-2 mt-4"></div>
			    <div id="itemchkDoneBtn"></div>
			</div>
		</div>
	</div>
</div>
<div id="itemMemoPopUp" class="modal fade fixed top-0 left-0 h-full w-full z-[200] items-center justify-center duration-300" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: none;">
	<div class="modal-close absolute top-0 left-0 w-full h-full"></div>
	<div class="modal-dialog modal-xl" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width:800px; height: 330px;">
		<div class="modal-content bg-white shadow-lg relative rounded min-w-80 overflow-hidden">
			<div class="pl-7 pr-5 py-2 text-white bg-primary-900 flex items-center justify-between">
				<h1 class="itemMemoTitle">
					<span></span>
				</h1>
				<button type="button" onclick="itemMemoPopUpClose()" class="modal-close text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
			</div>
			<div class="modal-body">
			    <div id="itemMemoTable" class="grow bg-white shadow-sm h-full max-h-[100rem] rounded-lg border border-slate-200 z-0"></div>
			    <div id="memoDiv" class="flex justify-center items-center mt-4"></div>
			    <div id="itemMemoBtn"></div>
			</div>
		</div>
	</div>
</div> 

<div id="itemChkDetailPopUp" class="modal fade fixed top-0 left-0 h-full w-full z-[200] items-center justify-center duration-300" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: none;">
	<div class="modal-close absolute top-0 left-0 w-full h-full"></div>
	<div class="modal-dialog modal-xl" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width:800px; height: 330px;">
		<div class="modal-content bg-white shadow-lg relative rounded min-w-80 overflow-hidden">
			<div class="pl-7 pr-5 py-2 text-white bg-primary-900 flex items-center justify-between">
				<h1 class="itemChkDetailTitle">
					<span></span>
				</h1>
				<button type="button" onclick="itemDetailPopUpClose()" class="modal-close text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
			</div>
			<div class="modal-body">
			    <div id="itemChkDetailTable" class="grow bg-white shadow-sm h-full max-h-[100rem] rounded-lg border border-slate-200 z-0"></div>
			</div>
			 <div class="flex justify-center items-center mt-4">
                <button type="button" onclick="fn_itemChkDetailDel()"
                        class="text-primary-500 bg-primary-100 border border-primary-500 hover:bg-secondary-100
                            focus:ring-4 focus:ring-secondary-300 font-medium rounded px-4 py-1.5 focus:outline-none duration-300 text-sm">
                    <i class="fa-regular fa-xmark"></i>
                    	${del}
                </button>
            </div>
		</div>
	</div>
</div>
<form id="itemViewExcelForm" action="" method="POST"></form>
</body>
</html>