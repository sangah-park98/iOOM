<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>시스템 코드</title>
<script src="/pf/js/function.js"></script>
<script src="/pf/js/cmmn/pfcmmncd.js" charset="UTF-8"></script>
<script src="https://gcore.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
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
      <button type="button"
      onclick="fn_searchCmmnCd()"
        class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700
        focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none
        duration-300 row-start-1
      ">
        <i class="fa-regular fa-search mr-1"></i>
        검색
      </button>
      <button type="button"
        onclick="fn_clearCmmnCd()"
        class="text-primary-600 bg-primary-100 border border-primary-500 hover:bg-secondary-100
        focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none duration-300
      ">
        <i class="fa-regular fa-times mr-1"></i>
        초기화
      </button>
    </div>
    <!-- 검색구분 -->
    <label class="col-start-1 row-start-1 col-span-1 row-span-1
       flex items-center font-medium text-gray-900 pr-2">
      검색구분
    </label>
    <div
      class="flex flex-row flex-wrap gap-4 col-start-2 col-span-5 row-start-1
      items-center *:flex *:flex-row *:items-center *:gap-2 font-medium text-gray-900
    ">
 <!--   <label for="default-radio-1">
        <input
          id="default-radio-1"
          name="cmmnCd_srch6" 
          value="01"
          type="radio"
          checked
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <span>그룹코드</span>
      </label> -->
      <label for="default-radio-2">
        <input
          id="default-radio-2"
          type="radio"
          name="cmmnCd_srch6" 
          value="02"
          checked
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>공통코드</span>
      </label>
      
    </div>
    <!-- 검색기간 -->

    <!-- 코드명 -->
    
    <label
      for="cmmnCd_srch3"
      class="row-start-2 col-start-1 flex items-center font-medium text-gray-900 pr-2"
    >
      코드명
    </label>
    <input
      type ="text"
      id = "cmmnCd_srch3"
      onkeyup="enterkey()"
      class="row-start-2 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
      placeholder="코드명을 입력해주세요.
    ">
    <!-- 코드명(EN) -->
    <label for="cmmnCd_srch2" class="cmpnyNum1 userName row-start-2 col-start-7 flex items-center font-medium text-gray-900 px-2">코드명(영문)</label>
    <input type="text"  id="cmmnCd_srch2" onkeyup="enterkey()"
            class="cmpnyNum1 userName row-start-2 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="코드명(영문)을 입력해주세요.">
            
    <!-- 그룹코드 -->
    <label for="cmmnCd_srch4" class="userName row-start-3 col-start-7 flex items-center font-medium text-gray-900 px-2">그룹코드</label>
    <input type="text"  id="cmmnCd_srch4" onkeyup="enterkey()"
            class="userName row-start-3 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="그룹코드를 입력해주세요.">
       
    <!-- 승인여부 -->
    <label class="approveUser col-start-1 row-start-3 col-span-2 row-span-2
       flex items-center font-medium text-gray-900 pr-2">
      화면표시
    </label>
    <div 
      class="approveUser flex flex-row flex-wrap gap-4 col-start-2 col-span-2 row-start-3
      items-center *:flex *:flex-row *:items-center *:gap-2 font-medium text-gray-900
    ">
    
      <label for="default-radio-2">
        <input
          id="default-radio-2"
          type="radio"
          name="cmmnCd_srch5" 
          value="Y"
          checked
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>Y</span>
      </label>
        <label for="default-radio-3">
        <input
          id="default-radio-3"
          type="radio"
          name="cmmnCd_srch5" 
          value="N"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>N</span>
      </label>
    </div> 
  </form>

	<div class="flex items-center justify-between w-full shrink-0">
	    <div class="flex items-center gap-4" id="importUp_div6">
	        <h2 id="cmpnyView" class="shrink-0 flex items-center gap-1"><i class="fa-duotone fa-chart-network text-primary-900"></i></h2>
	        <p class="shrink-0 flex items-center gap-1">결과: <span id="cmmnCdCnt">0</span></p>
	        <label for="default-radio-7">
	            <input name="cmmnCdType" id="default-radio-7" type="radio" value="read" checked
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>읽기</span>
	        </label> 
	        <label for="pfUserType">
	            <input name="cmmnCdType" id="pfUserType" type="radio" value="enrol" 
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>등록</span>
	        </label>
	        <label for="default-radio-9">
	            <input name="cmmnCdType" id="default-radio-9" type="radio" value="edit"
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>편집</span>
           
	        </label>
	    </div>
	    <div class="flex items-center gap-4">
	         <button
		        type="button"
		        id="btnCmmnCdSave" onclick="fn_saveCmmnCdCheck()"
		        class="upload-button h-9 text-white bg-secondary-700 hover:bg-primary-800 font-medium rounded px-2.5 py-2 text-base border border-secondary-700 hover:border-primary-400"
		      >
		        <i class="fa-regular fa-floppy-disk"></i>
		              저장
	      </button>
	        <select 
	            id="alignCmmnCd"
	            name="alignCmmnCd"
	            class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
	            <option value="" selected>정렬기준</option>
				<option value="GRP_CD">그룹코드 &uarr; </option>
				<option value="GRP_CD_DESC">그룹코드 &darr; </option>
				<option value="GRP_NM_KR">코드명 &uarr; </option>
				<option value="GRP_NM_KR_DESC">코드명 &darr; </option>
				<option value="GRP_NM_EN">코드명(영문) &uarr; </option>
				<option value="GRP_NM_EN_DESC">코드명(영문) &darr; </option>
	        </select>
	        <select 
	            id="pfCmpnyPageCnt"
	            name="pfCmpnyPageCnt"
	            class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
	            <option value="50" selected>Rows [50]</option>
	            <option value="100">Rows [100]</option>
	            <option value="200">Rows [200]</option>
	            <option value="500">Rows [500]</option>
	        </select>
	    </div>
	</div>
  </div>
  <!-- MainTable -->
  <div id="cmmnCdTable" class="grow bg-white shadow-sm min-h-[32rem] rounded-lg border border-slate-200 z-0"></div>
</main>
</body>
</html>
