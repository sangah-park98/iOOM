<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>접속정보</title>
<script src="/pf/js/function.js"></script>
 <script src="/pf/js/cmmn/conectinfo.js"  charset="UTF-8"></script>
 <script src="/pf/js/cmmn/pfconectinfoCalendar.js" charset="UTF-8"></script>
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
      onclick="fn_searchConectInfo()"
        class="text-white bg-primary-700 hover:bg-secondary-800 border border-primary-700
        focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none
        duration-300 row-start-1
      ">
        <i class="fa-regular fa-search mr-1"></i>
        검색
      </button>
      <button type="button"
        onclick="fn_clearConectInfo()"
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
          name="conectInfo_srch1" 
          value="01"
          type="radio"
          checked
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <span>접속정보</span>
      </label>
      <!-- <label for="default-radio-2">
        <input
          id="default-radio-2"
          type="radio"
          name="conectInfo_srch1" 
          value="02"
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500
          dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
        ">
        <span>변경이력</span>
      </label> -->
      
    </div>
    <!-- 검색기간 -->

    <!-- 메뉴명 -->
    
    <label
      for="conectInfo_srch2"
      class="row-start-2 col-start-1 flex items-center font-medium text-gray-900 pr-2"
    >
      사용자명
    </label>
    <input
      type ="text"
      id = "conectInfo_srch2"
      onkeyup="enterkey()"
      class="row-start-2 col-start-2 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
      focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5"
      placeholder="사용자를 입력해주세요.
    ">
    <!-- 접속회사명 -->
    <label for="conectInfo_srch3" class="row-start-2 col-start-7 flex items-center font-medium text-gray-900 px-2">접속회사명</label>
    <input type="text"  id="conectInfo_srch3" onkeyup="enterkey()"
            class="cmpnyNum1 userName row-start-2 col-start-8 col-span-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1"
            placeholder="접속회사명을 입력해주세요.">
      <!-- 검색기간 -->
    <label
      class="col-start-1 row-start-3 col-span-1 row-span-1
      flex items-center font-medium text-gray-900 pr-2
    ">
      접속일
    </label>
    <!-- Calendar -->
    <div
      date-rangepicker76
      class="col-start-2 row-start-3 col-span-4 flex flex-wrap md:flex-nowrap items-center gap-1
    ">
      <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input name="cone1_date" 
        		id="conectInfo_srch4"
        		type="text"
                class="text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
                placeholder="시작일자">
      </div>
      <div class="relative grow">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </div>
        <input
          name="cone2_date"
          type="text"
          id="conectInfo_srch5"
          class="text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 py-1 px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="종료일자"
        >
      </div>
      </div>
      <!-- /Calendar -->
  </form>

	<div class="flex items-center justify-between w-full shrink-0">
	    <div class="flex items-center gap-4" id="importUp_div6">
	        <h2 id="cmpnyView" class="shrink-0 flex items-center gap-1"><i class="fa-duotone fa-chart-network text-primary-900"></i></h2>
	        <p class="shrink-0 flex items-center gap-1">결과: <span id="conectInfoCnt">0</span></p>
	        <!--< label for="default-radio-7">
	            <input name="menuType" id="default-radio-7" type="radio" value="read" name="pfCmpnyType" checked
	                   class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	            <span>읽기</span>
	        </label>  -->
	    </div>
	    <div class="flex items-center gap-4">
	        <select 
	            id="alignConectInfo"
	            name="alignConectInfo"
	            class="w-36 h-9 text-gray bg-primary-100 hover:bg-primary-200 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded text-base px-2.5 py-1.5 text-center inline-flex items-center border-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
	            <option value="" selected>정렬기준</option>
				<option value="REG_DT">변경일 &uarr; </option>
				<option value="REG_DT_DESC">변경일 &darr; </option>
	        </select>
	        <select 
	            id="conectInfoPageCnt"
	            name="conectInfoPageCnt"
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
  <div id="conectInfoTable" class="grow bg-white shadow-sm min-h-[32rem] rounded-lg border border-slate-200 z-0"></div>
</main>
</body>
</html>
