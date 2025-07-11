<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%
    Date today = new Date();
    SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
%>
<!DOCTYPE html>
<html lang="ko">
<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <title>메인 공지사항</title>
 <script src="/pf/js/function.js"></script>
 <script src="/pf/js/cmmn/mainNotice.js?v=<%=fmt.format(today)%>" charset="UTF-8"></script>
 <script src="https://gcore.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
 
 <script>
 var loginUserId = "${userId}";
 var totCnt = ${totCnt};
 var grpCd = "${grpCd}";
 </script>
 <style>
 	td {white-space: nowrap;overflow:hidden;text-overflow: ellipsis;max-width: 800px;height : 60px;}
	table {border-spacing: 0 100px; width:90%;}
	footer {position: fixed;bottom: 0;width: 90%;}
	#noticeFileInput {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    outline: none;
    color:black;
}
.custom-file-upload {
    padding: 8px 12px;
    background-color: rgb(71 140 114);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    display: inline-block;
}
#selectedFileName {display: flex;align-items: center;}
 </style>
 </head>
<body class="text-left" id="notice">
 <main class="w-full h-full flex flex-col items-center justify-start relative overflow-hidden p-2 z-0">
    <h2 class="w-full p-2 shrink-0 font-semibold text-slate-800 dark:text-slate-100 truncate flex items-center justify-start gap-2 text-xl">
    </h2>
    <table class="bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
    	 <colgroup>
            <col style="width: 10%;">
            <col style="width: 50%;">
            <col style="width: 20%;">
            <col style="width: 20%;">
        </colgroup>
        <thead>
       	   <tr>
       		  <th style="text-align : center;">${number}</th> <!-- 번호 -->
       		  <th style="text-align : center;">${title}</th> <!-- 제목 -->
       		  <th style="text-align : center;">${writer}</th> <!-- 작성자명 -->
       		  <th style="text-align : center;">${date}</th> <!-- 일자 -->
       	   </tr>
        </thead>
        <tbody id="noticeList">
          <c:forEach var="notice" items="${resultList}">
		    <tr>
	          <td><c:out value="${notice.noticeSeq}" /></td>
	          <td><c:out value="${notice.titleKr}"/></td>
	          <td><c:out value="${notice.userName}" /></td>
	          <c:set var="formattedDate" value="${notice.noticeDt}" />
	          <fmt:parseDate var="parsedDate" value="${formattedDate}" pattern="yyyyMMdd" />
	          <fmt:formatDate value="${parsedDate}" pattern="yyyy-MM-dd" var="formattedDate" />
	          <td><c:out value="${formattedDate}" /></td>
		    </tr>
		  </c:forEach>
        </tbody>
    </table>
    
    <!-- Page Nation -->
    <div class="shrink-0 w-full flex items-center justify-center">
  	  <div class="flex gap-2 pagenation-component pagenation-component-news py-2 text-lg">
        <button class="noticeFirstButton-link hover:text-primary-400 duration-200" type="button" onclick="fn_noticeSearch()">
            &lt;&lt;
        </button>&nbsp;
     	<button class="noticeBackButton-link hover:text-primary-400 duration-200" type="button" onclick="noticeBackBtn()">
            &lt;
        </button>&nbsp;
        <div id="noticePagingButtons"></div> <!-- Button -->
        <button class="noticeNextButton-link hover:text-primary-400 duration-200" type="button" onclick="noticeNextBtn()">
            &gt;
        </button>&nbsp;
     	<button class="noticeEndButton-link hover:text-primary-400 duration-200" type="button" onclick="noticeEndPage(${totCnt})">
            &gt;&gt;
        </button>
      </div>
   </div>
    <!-- Page Nation -->
   
   <c:if test='${grpCd eq "KORD Mst"}'>
   <div class="w-full flex flex-row gap-2 items-end justify-end">
      <button type="button" style="margin-right:9%;" onclick="noticeWrite()" class="modal-close px-3 py-2 rounded-lg text-white hover:opacity-50 duration-150 bg-primary-700 shrink-0">
         <i class="fa-regular fa-pen text-primary-100"></i>
                  글쓰기
      </button>
    </div>
   </c:if>
   
 </main>
   <!-- Page Nation -->
<!-- Modal -->
<div id="noticeTitlePopUp" class="modal fixed top-0 left-0 h-full w-full z-[200] bg-black/50 items-center justify-center flex" style="display: none;">
  <div class="modal-close absolute top-0 left-0 w-full h-full"></div>
 
<div class="notice-modal modal-content bg-white shadow-xl relative rounded max-w-[800px] min-w-[42rem] overflow-hidden" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <div class="pl-7 pr-5 py-4 text-white bg-primary-900 flex items-center justify-between">
      <h2 class="font-bold text-xl"></h2>
      <button type="button" onclick="noticePopUpClose()" class="modal-close text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
    </div>
    <div class="pl-7 pr-5 py-6">
      <h3 class="text-2xl text-primary-700 font-semibold"></h3> <!-- title -->
      <span class="text-sm text-gray-500"></span> <!-- date -->
      <input type="text" id="noticeSeq" style="display:none;" >
      <div id="noticeTypeDiv" class="flex justify-between items-center px-7" style="display: none;">
		  <div></div>
		  <div class="flex items-center">
		    <label for="noticeType" class="text-lg text-gray-700 font-medium mr-2">상단 고정</label>
		    <input type="checkbox" id="noticeType" value="Y" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
		  </div>
	   </div>
    </div>
      <textarea id="noticeContent" class="mt-4 pt-4 border-t text-lg" style="width:800px; height:300px;" readonly></textarea> <!-- content -->
	  <div class="mx-5 py-4 border-t-2 flex justify-between gap-2">
	    <div class="text-base text-gray-500"></div>
	    <div class="flex gap-2">
	        <button type="button" id="noticeEdit" onclick="noticeUpdate()"
	        	  class="block py-2 px-3 font-semibold text-center text-white border border-secondary-700 bg-secondary-700 rounded-lg hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800 leading-6">
	                       수정
	        </button>
	        <button type="button" id="noticeDelete" onclick="noticeDelete()"
	        	  class="block py-2 px-3 font-semibold text-center text-white border-red-500 bg-red-500 rounded-lg focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600">
	                      삭제
	        </button>
	        <button type="button" id="noticeUpdateSave" style="display:none;" onclick="noticeUpdateSave()" class="modal-close px-3 py-2 rounded-lg text-white hover:opacity-50 duration-150 bg-primary-700 shrink-0">
	           <i class="fa-solid fa-check"></i> 
	                        저장
	        </button>
	        <button type="button" onclick="noticePopUpClose()" class="modal-close px-3 py-2 rounded-lg text-white hover:opacity-50 duration-150 bg-primary-700 shrink-0">
	           <i class="fa-solid fa-check"></i> 
	           ${confirm}
	        </button>
	    </div>
	</div>
</div>
	<form name="noticesFileDownForm" method="post"
		  action="/cmmn/noticesFileDown.do">
		<input type="hidden" name="noticesFileDown" id="noticesFileDown"/>
    </form>
</div>
<!--ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ> -->
<!-- Write Modal -->
<div id="noticeWritePopUp" class="modal fixed top-0 left-0 h-full w-full z-[200] bg-black/50 items-center justify-center flex" style="display: none;">
  <div class="modal-close absolute top-0 left-0 w-full h-full"></div>
  <div class="notice-modal modal-content bg-white shadow-xl relative rounded max-w-[800px] min-w-[42rem] overflow-hidden" style="width:50%; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <div class="pl-7 pr-5 py-4 text-white bg-primary-900 flex items-center justify-between">
      <h2 class="font-bold text-xl"></h2>
      <button type="button" onclick="noticeWriteClose()" class="modal-close text-2xl px-1.5 py-1 rounded-lg hover:bg-rose-500/70 border-2 border-transparent hover:border-white duration-300 flex items-center justify-center"><i class="far fa-xmark"></i></button>
    </div>
    <div class="pl-7 pr-5 py-6 flex items-center">
        <h2 class="font-bold text-xl mr-3">제목 </h2>
        <input type="text" 
               id="noticeTitleInput"
               style="width: 700px;"
               class="w-40 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary-500">
      <span class="text-sm text-gray-500"></span> <!-- date -->
    </div>
	<div class="pl-6 pr-5 py-0 flex items-center justify-between">
	    <h2 class="font-bold text-xl mr-3">&nbsp;내용 </h2>
	    <div class="flex items-center">
	        <h2 class="font-bold text-xl mr-3">상단 고정</h2>
	        <input type="checkbox" id="noticeType" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
	    </div>
	</div>
      <textarea id="noticeContentInput" class="mt-4 pt-4 border-t text-lg" style="width:800px; height:300px; resize: none;"></textarea> <!-- content -->
    <div class="mx-5 py-4 botder-t-2 flex justify-between gap-2 ">
      <div class="mx-5 py-4 border-t-2 flex gap-2" >
       <label for="noticeFileInput" class="custom-file-upload">
       <i class="fa-duotone fa-file-circle-check"></i>
		    파일 선택
		</label>
		<input type="file" id="noticeFileInput" name="noticeFileInput" style="display: none;">
		<span style="align-item:center;" id="selectedFileName"></span>
      </div>
      <div class="mx-5 py-4 border-t-2 flex justify-end gap-2 ">
	    <button type="button" id="noticeSave" onclick="noticeWriteSave()" 
	    		class="modal-close px-3 py-2 rounded-lg text-white hover:opacity-50 duration-150 bg-primary-700 shrink-0 text-md">
	        <i class="fa-duotone fa-envelope"></i>
	             저장
	    </button>
	    <button type="button" onclick="fn_clearNoticeWrite()" 
	    		class="text-primary-600 bg-primary-100 border border-primary-500 hover:bg-secondary-100 focus:ring-4 focus:ring-secondary-300 font-medium rounded px-5 py-2 focus:outline-none duration-300 text-md">
	        <i class="fa-regular fa-times mr-1"></i>
	            초기화
	    </button>
	  </div>
    </div>
  </div>
</div>
</body>
</html>