<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>사업자 관리</title>
<script src="/pf/js/function.js"></script>
<script src="/pf/js/cmmn/pfcompany.js" charset="UTF-8"></script>
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
      onclick="fn_searchPfCmpny()"
        class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700
        focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none
        duration-300 row-start-1
      ">
        <i class="fa-regular fa-search mr-1"></i>
        검색
      </button>
      <button type="button"
        onclick="fn_clearPfCmpny()"
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
      <label for="default-radio-1">
        <input
          id="default-radio-1"
          name="pfcompny_srch1" 
          value="01"
          type="radio"
          checked
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <span>사업자관리</span>
      </label>
      <!-- <label for="default-radio-2">
        <input
          id="default-radio-2"
          type="radio"
          name="pfcompny_srch1" 
          value="02"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>사업자 - 지사</span>
      </label> -->
    </div>
    <!-- 검색기간 -->

   
    <!-- 회사 -->
    
    <label
      for="pfCompny_srch2"
      class="cmpnyName row-start-2 col-start-1 flex items-center font-medium text-gray-900 pr-2"
    >
      회사명
    </label>
    <input
      type ="text"
      id = "pfCompny_srch2"
      onkeyup="enterkey()"
      class="cmpnyName row-start-2 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
      placeholder="회사명을 입력해주세요.
    ">
    <!-- 사업자번호 -->
    <label for="pfUser_srch3" class="cmpnyNum1 userName row-start-2 col-start-7 flex items-center font-medium text-gray-900 px-2">사업자번호</label>
    <input type="text"  id="pfCompny_srch3" onkeyup="enterkey()"
            class="cmpnyNum1 userName row-start-2 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="사업자번호를 입력해주세요.">
    <!-- 지사코드 -->
    <label for="pfCmpny_srch6" class="jisaCode compnyInfo row-start-2 col-start-7 flex items-center font-medium text-gray-900 px-2">지사코드</label>
    <input type="text"  id="pfCmpny_srch6" onkeyup="enterkey()"
            class="jisaCode compnyInfo row-start-2 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="지사코드를 입력해주세요.">
            
     <!-- 지사 사업자번호 -->
    <label for="pfCmpny_srch5" class="cmpnyNum2 row-start-3 col-start-1 flex items-center font-medium text-gray-900 pr-2">사업자번호</label>
    <input type="text"  id="pfCmpny_srch5" onkeyup="enterkey()"
            class="cmpnyNum2 row-start-3 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
            placeholder="사업자번호를 입력해주세요.">       
    <!-- 승인여부 -->
    <!-- <label class="approveUser col-start-1 row-start-3 col-span-2 row-span-2
       flex items-center font-medium text-gray-900 pr-2">
      승인여부
    </label>
    <div 
      class="approveUser flex flex-row flex-wrap gap-4 col-start-2 col-span-2 row-start-3
      items-center *:flex *:flex-row *:items-center *:gap-2 font-medium text-gray-900
    ">
      <label for="default-radio-1">
        <input
          id="default-radio-1"
          name="pfCmpny_srch4" 
          value="ALL"
          type="radio"
          checked
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <span>ALL</span>
      </label>
      <label for="default-radio-2">
        <input
          id="default-radio-2"
          type="radio"
          name="pfCmpny_srch4" 
          value="Y"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>Y</span>
      </label>
        <label for="default-radio-3">
        <input
          id="default-radio-3"
          type="radio"
          name="pfCmpny_srch4" 
          value="N"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>N</span>
      </label>
    </div> -->
            
    
  </form>

	<div class="flex items-center justify-between w-full shrink-0">
	    <div class="flex items-center gap-4" id="importUp_div6">
	        <h2 id="cmpnyView" class="shrink-0 flex items-center gap-1"><i class="fa-duotone fa-chart-network text-primary-900"></i>사업자 관리</h2>
	        <p class="shrink-0 flex items-center gap-1">결과: <span id="pfCmpnyCnt">0</span></p>
	        <label for="default-radio-7">
	            <input id="default-radio-7" type="radio" value="read" name="pfCmpnyType" checked
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>읽기</span>
	        </label> 
	        <label for="pfUserType">
	            <input id="pfUserType" type="radio" value="enrol" name="pfCmpnyType"
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>등록</span>
	        </label>
	        <label for="default-radio-9">
	            <input id="default-radio-9" type="radio" value="edit" name="pfCmpnyType"
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>편집</span>
           
	        </label>
	    </div>
	    <div class="flex items-center gap-4">
	         <button
		        type="button"
		        id="btnPfCmpnySave" onclick="fn_savePfCmpnyCheck()"
		        class="upload-button h-9 text-white bg-secondary-700 hover:bg-primary-800 font-medium rounded px-2.5 py-2 text-base border border-secondary-700 hover:border-primary-400"
		      >
		        <i class="fa-regular fa-floppy-disk"></i>
		              저장
	      </button>
	        <select 
	            id="alignPfCmpny"
	            name="alignPfCmpny"
	            class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
	            <option value="" selected>정렬기준</option>
				<option value="CMPNY_NM">회사명 &uarr; </option>
				<option value="CMPNY_NM_DESC">회사명 &darr; </option>
				<option value="TAX_NO">사업자번호 &uarr; </option>
				<option value="TAX_NO_DESC">사업자번호 &darr; </option>
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
  <div id="pfCmpnyTable" class="grow bg-white shadow-sm min-h-[32rem] rounded-lg border border-slate-200 z-0"></div>
</main>
</body>
</html>
