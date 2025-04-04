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
  <title>통계분석</title>
  <script>
	var fiveYrImpResult = "${fiveYrImpResult}"; 
	var fiveYrExpResult = "${fiveYrExpResult}"; 
	var overseasImpResult = "${overseasImpResult}"; 
	var overseasExpResult = "${overseasExpResult}"; 
	var freightCompare = "${freightCompare}"; 
	var insuranceCompare = "${insuranceCompare}";
	var impGoodsCompare = "${impGoodsCompare}";
	var paidUnpaidImpValCompare = "${paidUnpaidImpValCompare}";
	var identicalTrans = "${identicalTrans}";
	var total = "${total}";
	var all = "${all}";
	var tradeType = "${tradeType}"; /* 거래구분 */
	var impCnt = "${impCnt}"; /* 수입(건) */
	var impKrw = "${impKrw}"; /* 수입(KRW) */
	
	// analysis2ViewHead
	var expCnt = "${expCnt}"; /* 수출(건) */
	var expKrw = "${expKrw}"; /* 수출(KRW) */
	
	// analysis3ViewHead
	var overseas = "${overseas}"; /* 해외거래처 */
	var generalImpCnt = "${generalImpCnt}"; /* 일반수입(건) */
	var etcImpCnt = "${etcImpCnt}"; /* 기타수입(건) */
	var impSumCnt = "${impSumCnt}"; /* 수입합계(건) */
	
	// analysis4ViewHead
	var generalExpCnt = "${generalExpCnt}"; /* 일반수출(건) */
	var etcExpCnt = "${etcExpCnt}"; /* 기타수출(건) */
	var expSumCnt = "${expSumCnt}"; /* 수출합계(건) */
	var expSumKrw = "${expSumKrw}"; /* 수출합계(KRW) */
	var impSumKrw = "${impSumKrw}"; /* 수입합계(KRW) */
	
	// analysis5ViewHead
	var nabFirm = "${nabFirm}";
	var country = "${country}"; /* 적출국 */
	var overseasRptNo = "${overseasRptNo}"; /* 해외거래처 - 신고번호 */
	var shipForm = "${shipForm}"; /* 운송형태 */
	var incoterms = "${incoterms}"; /* 인도조건 */
	var declareCnt = "${declareCnt}"; /* 신고건수 */
	var freight = "${freight}"; /* 운임 */
	var totWeight = "${totWeight}"; /* 총중량 */
	var dutiableVal = "${dutiableVal}"; /* 과세가격(KRW) */
	var freightWeight = "${freightWeight}"; /* 운임/중량(KRW) */
	var customsVal = "${customsVal}"; /* 운임/과세가격(%) */
	
	// analysis6ViewHead
	var insurance = "${insurance}"; /* 보험료 */
	var insuranceWeight = "${insuranceWeight}"; /* 보험료/중량(KRW) */
	var insuranceVal = "${insuranceVal}"; /* 보험료/과세가격(%) */
	
	// analysis7ViewHead
	var po = "${po}";
	var invoiceNo = "${invoiceNo}";
	var rptNo = "${rptNo}";
	var lisDay = "${lisDay}";
	var declarePrice = "${declarePrice}"; /* 신고금액 */
	var expCd = "${expCd}"; /* 수출코드 */
	var foreignExpStatus = "${foreignExpStatus}"; /* 외환신고대상여부 */
	
	// analysisCost1ViewHead
	var blNo = "${blNo}";
	var lanNo = "${lanNo}";
	var specNo = "${specNo}";
	var hsCode = "${hsCode}";
	var declartionPrice = "${declartionPrice}"; /* 신고단가 */
	var declartionUnit = "${declartionUnit}"; /* 신고단위 */
	var curOfMethod = "${curOfMethod}"; /* 결제방법 */
	var curOfSettlement = "${curOfSettlement}"; /* 결제통화 */
	var wonPrice = "${wonPrice}";
	var maxPrice = "${maxPrice}";
	var minPrice = "${minPrice}";
	var avgPrice = "${avgPrice}";
	var priceMaxDiff = "${priceMaxDiff}"; /* 단가차이(최고) */
	var priceMinDiff = "${priceMinDiff}"; /* 단가차이(최저) */
	var priceAvgDiff = "${priceAvgDiff}"; /* 단가차이(평균) */
	var priceMaxDiffRate = "${priceMaxDiffRate}"; /* 단가차이 비율(최고) */
	var priceMinDiffRate = "${priceMinDiffRate}"; /* 단가차이 비율(최저) */
	var priceAvgDiffRate = "${priceAvgDiffRate}"; /* 단가차이 비율(평균) */
	var plantCd = "${plantCd}";
	
	var declareKrwPrice = "${declareKrwPrice}"; /* 신고금액(원화) */
	
	// analysisEtc1ViewHead
	var hsCd = "${hsCd}"; /* 세번부호 */
	var goodsName = "${goodsName}";
	var impRptNo = "${impRptNo}";
	var tariffType = "${tariffType}"; /* 관세구분 */
	var tariffRate = "${tariffRate}";
	var origin = "${origin}";
	var qty = "${qty}";
	var settlingPrice = "${settlingPrice}"; /* 결제금액 */
	var taxPaidPrice = "${taxPaidPrice}"; /* 납부관세액 */
	
	// analysisEtc3ViewHead
	var abetmentApplyCnt = "${abetmentApplyCnt}"; /* 관세감면적용 건 수 */
	var abetmentNotApplyCnt = "${abetmentNotApplyCnt}"; /* 관세감면미적용 건 수 */
	var totCustomsPrice = "${totCustomsPrice}"; /* 총관세액 */
	var totVat = "${totVat}"; /* 총부가세액 */
	var customsAbetment = "${customsAbetment}"; /* 관세감면세액 */
	var vatAbetment = "${vatAbetment}"; /* 부가세감면세액 */
	
	// analysisEtc3ViewHead
	var customsPrice = "${customsPrice}" /* 관세액 */
	var vatType = "${vatType}" /* 부가세구분 */
	var totVatRate = "${totVatRate}" /* 부가세율 */
	var vatAmount = "${vatAmount}" /* 부가세액 */
	var customsAbetmentMark = "${customsAbetmentMark}" /* 관세감면부호 */
	var customsAbetmentRate = "${customsAbetmentRate}" /* 관세감면율 */
	var vatAbetmentMark = "${vatAbetmentMark}" /* 부가세감면부호 */
	var vatAbetmentRate = "${vatAbetmentRate}" /* 부가세감면율 */
	var vatAbetment = "${vatAbetment}" /* 부가세감면세액 */
	
	// analysisEtc4ViewHead
	var taxType = "${taxType}"; /* 세종 */
	var taxRate = "${taxRate}"; /* 세율 */
	var impDeclareAcDt = "${impDeclareAcDt}";
	
	// 수입 analysis1Chart
	var cnt = "${cnt}";
	var price = "${price}";
	var generalImpCntElv = "${generalImpCntElv}"; // 11
	var otherImpApproval = "${otherImpApproval}"; // 94
	var freeGoodsName = "${freeGoodsName}"; // 87
	var reImpAfterApproval = "${reImpAfterApproval}"; // 83
	var replaceImpGoods = "${replaceImpGoods}"; // 93
	var otherFactoryEtc = "${otherFactoryEtc}"; // etc
	
	// 수출 analysis2Chart
	var generalExpCntElv = "${generalExpCntElv}"; // 11
	var consignmentExp = "${consignmentExp}"; // 29
	var reExpAfterApproval = "${reExpAfterApproval}"; // 83
	var otherExpApproval = "${otherExpApproval}"; // 94
	var otherFactoryExpEtc = "${otherFactoryExpEtc}"; // etc
	
	var impCntTopSeven = "${impCntTopSeven}";
	var expCntTopSeven = "${expCntTopSeven}";
	var impPriceTopSeven = "${impPriceTopSeven}";
	var expPriceTopSeven = "${expPriceTopSeven}";
	var priceCompareTopSeven = "${priceCompareTopSeven}";
	var unpaidAvgPrice = "${unpaidAvgPrice}"; // 무상단가 평균
	var paidAvgPrice = "${paidAvgPrice}"; // 유상단가 평균
	var unpaidAvgPriceTopSv = "${unpaidAvgPriceTopSv}"; // 무상 평균단가 Top7
	
	var identicalTariffChk = "${identicalTariffChk}" // 동일자재코드 품목분류 상이점검
	var identicalCustomsChk = "${identicalCustomsChk}" // 동일자재코드 관세구분 상이점검
	var abetmentApplyChk = "${abetmentApplyChk}" // 감면 적용 일관성 검토
	var ftaDirectTrans = "${ftaDirectTrans}" // FTA 직접운송원칙
	
	var msgSearchError = "${msgSearchError}"; // 조회중 에러가 발생하였습니다.
	var msgInputUnitRatio = "${msgInputUnitRatio}"; // 단가비율을 입력해주세요.
	var msgZeroToHundred = "${msgZeroToHundred}"; // 0~100 이하의 값만 유효합니다.
	var msgQuestExcelDown = "${msgQuestExcelDown}";
	var msgDataCollectInProgress2 = "${msgDataCollectInProgress2}";
	var msgCheckDown = "${msgCheckDown}";
	var msgSelectItem = "${msgSelectItem}";
</script>
<script type="module" src="/pf/assets/dropdown-init.js"></script>
<script src="/pf/js/function.js"></script>
<script src="/pf/js/rpt/analysis.js?v=<%=fmt.format(today)%>" charset="UTF-8"></script>
<style>
  .loadingTable {
    	margin: auto;
	    height: 20px;
	    display: table-cell;
	    align-items: center;
	    vertical-align: middle;
    }
  .completeTable {
    	margin: auto;
	    height: 20px;
	    display: table-cell;
	    align-items: center;
	    vertical-align: middle;
    }
</style>
</head>
<body class="flex flex-col max-h-fit">
<main class="p-2 grow flex flex-col gap-2">
  <form
    class="w-full shrink-0 grid grid-rows-3 grid-cols-[auto_repeat(5,1fr)_auto_repeat(5,1fr)]
    row-start-1 col-start-1 col-span-2 bg-white dark:bg-slate-800 shadow-sm rounded-lg
    border border-slate-200 dark:border-slate-700 px-4 py-3 gap-1 z-1 text-base *:text-base
    items-center
  ">
    <div
      class="row-start-1 col-span-6 col-end-13 flex flex-row gap-2 items-end justify-end"
    >
      <button
      type="button"
      onclick="fn_searchWithCallbackAnalysis()"
        class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700
        focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none
        duration-300 row-start-1
      ">
        <i class="fa-regular fa-search mr-1"></i>
			${srch}
      </button>
      <button
      type="button"
      onclick="fn_analysisClearSerachOption()"
        class="text-primary-600 bg-primary-100 border border-primary-500 hover:bg-secondary-100
        focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none duration-300
      ">
        <i class="fa-regular fa-times mr-1"></i>
			${clear}
      </button>
      <button
	      	type="button"
	      	onclick="fn_ananlysisExcleDownload()"
	        class="text-white bg-primary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-2.5 py-1.5 focus:outline-noneduration-300 row-start-1 text-base">
         <i class="fa-regular fa-download"></i>
        	${excelDown}
      	</button>	
    </div>
    <label class="col-start-1 row-start-1 col-span-1 row-span-1 flex items-center font-medium text-gray-900 pr-2">
		${srchType} <!-- 검색구분 -->
    </label>
    <div class="flex flex-row flex-wrap gap-4 col-start-2 col-span-5 row-start-1
      items-center *:flex *:flex-row *:items-center *:gap-2 font-medium text-gray-900">
      <label for="current-mode">
        <input
          type="radio"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          value="01" 
          name="analysisView_srch1"
          checked="checked"
        >
        <span>${impExpView}</span> <!-- 수출입 현황 -->
      </label>
      <label for="cost-mode">
        <input
          type="radio"
          value="02"
          name="analysisView_srch1"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <span>${unitPriceAnal}</span> <!-- 단가분석 -->
      </label>
      <label for="analysis-mode">
        <input
          type="radio"
          value="03"
          name="analysisView_srch1"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <span>${impExpDataAnal}</span> <!-- 수출입 데이터 분석 -->
      </label>
    </div>
    <label class="col-start-1 row-start-2 col-span-2 row-span-1 flex items-center font-medium text-gray-900 pr-2" style="width: 60px;">
		${regDt} <!-- 등록일자 -->
    </label>
    <!-- Calendar -->
    <div date-rangepicker31 class="col-start-2 row-start-2 col-span-4 flex flex-wrap md:flex-nowrap items-center gap-1">
      <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
         <input type="text" class="form-control band-calendar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="analysisView_srch3" name="analysisView1_date"
				onKeypress="javascript:if(event.keyCode==13) {$('.calendar-popup-container').removeClass('calendar-popup-container_active'); $(this).blur()}" onkeyUp="fn_dateInputForm($(this))" 
				autocomplete="off">   
      </div>
      <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        
       <input type="text" class="form-control band-calendar text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="analysisView_srch4" name="analysisView2_date"
				onKeypress="javascript:if(event.keyCode==13) {$('.calendar-popup-container').removeClass('calendar-popup-container_active'); $(this).blur()}" 
				onkeyUp="fn_dateInputForm($(this))"
				autocomplete="off">
      </div>
    </div>
    <!-- Range Button -->
    <div class="col-start-6 row-start-2 col-span-4 flex items-center gap-1">
      <button
          type="button"
          onclick="fn_analysisChgDate1()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700
        ">
		${sixMonth}
      </button>
      <button
          type="button"
          onclick="fn_analysisChgDate2()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700
        ">
		${oneYr}
      </button>
      <button
          type="button"
          onclick="fn_analysisChgDate3()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700
        ">
		${threeYr}
      </button>
      <button
          type="button"
          onclick="fn_analysisChgDate4()"
          class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
          border-primary-200 hover:text-white hover:bg-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700
        ">
        ${fiveYr}
      </button>
    </div>
	<!-- 단가차이 이하-->
    <label for="n2" class="row-start-3 col-start-1 flex items-center font-medium text-gray-900 pr-2">
		${priceRate} <!-- 단가비율 -->
    </label>
    <input
      type="text"
      onkeyup="analysisEnterkey()"
      id="analysisView_srch5"
      class="row-start-3 col-start-2 col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-algin:right rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
      style="text-align:right;"
      placeholder=""
      value="20"
      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
    >
	<label for="n3" class="row-start-3 col-start-3 flex items-center font-medium text-gray-900 pr-2">
    	%
    </label>
    
    <label for="n4" class="row-start-3 col-start-4 flex items-center font-medium text-gray-900 pr-2">
		${hsCode} <!-- 자재코드 -->
    </label>
    <input
      type="text"
      onkeyup="analysisEnterkey()"
      id="analysisView_srch6"
      class="row-start-3 col-start-5 col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-algin:left rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
    >
    <!-- 범위 선택 스크립트 로딩 -->
    <!-- / 범위 선택 스크립트 로딩 -->
    <!-- 신고번호 -->
  </form>
	<section class="analytics-status-container w-full">
		<!-- 수입실적 -->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkAnalysisExcel" value="1" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${fiveYrImpResult}</span> <!-- 5년치 수입실적 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	      	<div class="w-full h-[215px] overflow-auto">
		    	<div class="analysis1Chart" style="position: relative;margin: 10 10 10 10;height: 33vh;width: 100%">
		        	<canvas id="analysis1Chart" style="border: 1px dotted gray;"></canvas>
		         </div>
		    </div>
	        <div id="analysis1Table"></div>
	      </div>
	    </article>
		<!-- 수출실적 -->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkAnalysisExcel" value="2" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${fiveYrExpResult}</span> <!-- 5년치 수출실적 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	      	<div class="w-full h-[215px] overflow-auto">
		    	<div class="analysis2Chart" style="position: relative;margin: 10 10 10 10;height: 33vh;width: 100%">
		        	<canvas id="analysis2Chart" style="border: 1px dotted gray;"></canvas>
		         </div>
		    </div>
	        <div id="analysis2Table"></div>
	      </div>
	    </article>
	    <!-- 해외거래처별 수입실적 -->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox"  name="checkAnalysisExcel" value="3" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${overseasImpResult}</span> <!-- 해외거래처별 수입실적 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	      	<div style="text-align: center;">
		    	<div class="analysis3_1Chart" style="display: inline-block;margin: 10 10 10 10;height: 40vh;width: 49%">
		        	<canvas id="analysis3_1Chart" style="border: 1px dotted gray;"></canvas>
		        </div>
		        <div class="analysis3_2Chart" style="display: inline-block;margin: 10 10 10 10;height: 40vh;width: 49%">
		        	<canvas id="analysis3_2Chart" style="border: 1px dotted gray;"></canvas>
		        </div>
		    </div>
	        <div id="analysis3Table"></div>
	      </div>
	    </article>
	    <!-- 해외거래처별 수출실적 -->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox"  name="checkAnalysisExcel" value="4" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${overseasExpResult}</span> <!-- 해외거래처별 수출실적 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	      	<div style="text-align: center;">
		    	<div class="analysis4_1Chart" style="display: inline-block;margin: 10 10 10 10;height: 40vh;width: 49%">
		        	<canvas id="analysis4_1Chart" style="border: 1px dotted gray;"></canvas>
		        </div>
		        <div class="analysis4_2Chart" style="display: inline-block;margin: 10 10 10 10;height: 40vh;width: 49%">
		        	<canvas id="analysis4_2Chart" style="border: 1px dotted gray;"></canvas>
		        </div>
		    </div>
	        <div id="analysis4Table"></div>
	      </div>
	    </article>
	    <!-- 운임 비교 -->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox"  name="checkAnalysisExcel" value="5" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${freightCompare}</span> <!-- 운임 비교 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysis5Table"></div>
	      </div>
	    </article>
	    <!-- 보험료 비교 -->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkAnalysisExcel" value="6" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4" >
	          <span class="ms-2 block w-full text-left" style="color: black">${insuranceCompare}</span> <!-- 보험료 비교 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysis6Table"></div>
	      </div>
	    </article>
	    <!-- 외환신고대상 수출-->
	  	<article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox"  name="checkAnalysisExcel" value="7" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${foreignExpReport}</span> <!-- 외환신고대상 수출 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysis7Table"></div>
	      </div>
	    </article>		    		    		    	    
	    <!-- 수입물품 단가비교 -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-import-result" type="checkbox" name="checkCostExcel" value="1" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${impGoodsCompare}</span> <!-- 수입물품 단가비교 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
		    <div class="w-full h-[200px]">
		           <div class="analysisCost1Chart" style="height: 40vh; width: 100%">
		          	<canvas id="analysisCost1Chart" style="border: 1px dotted gray; width:100%; hight: 100%"></canvas>
		          </div>
            </div>	 	      
			<div class="flex items-center justify-between w-full shrink-0 p-1">
			    <div class="flex items-center gap-4">
			      <h2 class="shrink-0 flex items-center gap-1">
			      	<i class="fa-duotone fa-feather text-primary-900"></i>
			      </h2>
			      <!-- <p class="text-gray-500 text-base">결과:<span id="exportViewCnt">0</span> -->
			    </div>
			    <div class="flex items-center gap-2">
			      <select class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			      		  id="analysisCost1Option">
			      	<option value="max">${maxPriceCompare}</option> <!-- 최고단가비교 -->
			        <option value="min">${minPriceCompare}</option> <!-- 최저단가비교 -->
			        <option value="avg">${avgPriceCompare}</option> <!-- 평균단가비교 -->
			      </select>
			    </div>
		    </div>
	        <div id="analysisCost1Table"></div>
	      </div>
	    </article>
	    <!-- 유무상 수입건 과세가격 비교 -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkCostExcel" value="2" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${paidUnpaidImpValCompare}</span> <!-- 유무상 수입건 과세가격 비교 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
		    <div class="w-full h-[215px] overflow-auto">
		    	<div class="analysisCost2Chart" style="position: relative;margin: 10 10 10 10;height: 33vh;width: 100%">
		       		<canvas id="analysisCost2Chart" style="border: 1px dotted gray;"></canvas>
		        </div>
		    </div>	 	      	
	        <div id="analysisCost2Table"></div>
	      </div>
	    </article>
	    <!-- 동일거래, 결제통화 변경점검 (유사거래건없음) -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkCostExcel" value="3" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${identicalTrans}</span> <!-- 동일거래, 결제통화 변경점검 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysisCost3Table"></div>
	      </div>
	    </article>
	    <!-- 동일자재코드 품목분류 상이점검 -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkEtcExcel" value="1" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${identicalTariffChk}</span> <!-- 동일자재코드 품목분류 상이점검 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysisEtc1Table"></div>
	      </div>
	    </article>
	    <!-- 동일자재코드 관세구분 상이점검 -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkEtcExcel" value="2" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${identicalCustomsChk}</span> <!-- 동일자재코드 관세구분 상이점검 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysisEtc2Table"></div>
	      </div>
	    </article>
	    <!-- 감면 적용 일관성 검토 -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white ">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkEtcExcel" value="3" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left" style="color: black">${abetmentApplyChk}</span> <!-- 감면 적용 일관성 검토 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysisEtc3Table"></div>
	      </div>
	    </article>
	    <!-- FTA 직접운송원칙 -->
	    <article class="table-block w-full my-1.5 rounded overflow-hidden bg-white " style="display:none">
	      <div class="pl-4 text-xl bg-primary-800 text-white flex items-center " style="background: #E8F0EC">
	        <input id="analytics-export-result" type="checkbox" name="checkEtcExcel" value="4" checked class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	        <button class="flex items-center w-full justify-between py-2.5 pr-4">
	          <span class="ms-2 block w-full text-left " style="color: black">${ftaDirectTrans}</span> <!-- FTA 직접운송원칙 -->
	          <i class="fa-solid fa-chevron-down text-2xl shrink-0 duration-200"></i>
	        </button>
	      </div>
	      <div class="table-container">
	        <div id="analysisEtc4Table"></div>
	      </div>
    </article>
    <form id="analysisExcelForm" action="" method="POST">
  	</form>
    </section>
  

</main>

<!-- <div class="loading-table" id="lodingBack">
		<img class="loadingTable" id="loadingImg2" src="/pf/css/images/loading_table.gif" />
</div>
 -->
<div class="modal-popup-analysis fixed top-0 left-0 h-full w-full z-[200] bg-black/50 items-center justify-center duration-300 hidden">
  <div class="modal-close absolute top-0 left-0 w-full h-full"></div>
  <!-- Uploader Modal content -->
  <div class="modal-analysis hidden modal-content bg-white shadow-xl relative rounded min-w-96 overflow-hidden">
    <div class="pl-3 pr-3 py-2 text-white bg-primary-900 flex items-center justify-between">
      <h2 class="font-bold text-lg">
      	${msgDataCollectInProgress}<br/>
      	${msgDataCollectInProgress2}
      	<!-- 데이터를 수집 및 분석 중입니다.<br/>
      	수집량에 따라 시간이 다소 소요될 수 있습니다. -->
      </h2>
      <button type="button" class="modal-close-analysis text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
    </div>
	<div class="flex items-center justify-center w-full">
	 <table class="anaylsis-table w-full">
       	<thead id="dashHead1" style=" position: sticky; top: 0;">
			<tr>
				<th>${reportTitle}</th> <!-- 리포트 제목 -->
				<th>${status}</th> <!-- 상태 -->
			</tr>
	   </thead>
       <tbody id="anaylsisInfo"></tbody>
     </table>
	</div>
  </div>
</div>

</body>
</html>
