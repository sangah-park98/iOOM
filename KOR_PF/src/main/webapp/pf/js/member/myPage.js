var cmmnCmpnyPopHot;
var fnPopupCallback;
var popupData;
var calFormat;
var gridCalFormat;
var cmpnyInfoHot;

var cmpnyInfoPopupElement = document.querySelector('#cmpnyPopupListTable');
var cmpnyInfoPopupElementContainer = cmpnyInfoPopupElement.parentNode;
cmpnyInfoPopupSettings = fn_handsonGridcmpnyInfoPopupOption();
cmpnyInfoHot = new Handsontable(cmpnyInfoPopupElement, cmpnyInfoPopupSettings);


$(document).ready(function() {
    // 예: 초기화 함수 호출
    cmpnyInfo();
});

function cmpnyInfo(){
	$.ajax({
	    type: "POST",
	    url: "/member/cmpnyInfo.do",
	    success: function (data) {
	        userCmpnyInfo(data);
	    },
	    error: function (e, textStatus, errorThrown) {
	        if (e.status == 400) {
	            alert("Your request is up. Please log back in if you wish to continue");
	            location.href = document.referrer;
	        } else {
	            console.log(errorThrown);
	            alert("An error occurred while checking the ID.");
	        }
	    }
	});
}

function userCmpnyInfo(data) {
    var parsedData = JSON.parse(data); // JSON 형식으로 파싱하여 데이터를 객체로 변환
    var count1 = 0; // 인덱스 초기값 설정

    // 각 업체 정보에 대해 반복적으로 처리
    parsedData.resultList.forEach(function(company) {
        var companyName = company.comp_NAME2; // 업체명
        var companyNumber = company.comp_REG_NO2; // 사업자 등록 번호
        
        // 업체명과 사업자 등록 번호를 가져와서 화면에 출력 또는 다른 작업 수행
        //console.log("업체명: " + companyName + ", 사업자 등록 번호: " + companyNumber);
        
        var companySet1 = document.getElementById("companySet1");
        var companyInfoDiv = document.createElement("div");
        companyInfoDiv.classList.add("companySets", "grid", "grid-cols-[1fr_2.4fr_1fr]", "gap-x-2", "gap-y-1", "items-center");
        companyInfoDiv.innerHTML =
            '<label for="company_name" class="text-primary-700 font-semibold px-2 text-left row-start-2">사업자 명</label>' +
            '<input type="text" readonly id="company_name"  name="COMP_NAME[' + count1 + ']" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5 text-lg row-start-2" value="' + companyName + '">' +
            '<label for="company_number" class="text-primary-700 font-semibold px-2 text-left ">사업자 번호</label>' +
            '<input type="text" readonly id="company_number" name="COMP_REG_NO[' + count1 + ']" oninput="removeHyphen(event)" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5 text-lg" value="' + companyNumber + '">' +
            '<input type="hidden" id="REGNO_CHECK_' + count1 + '" name="REGNO_CHECK[' + count1 + ']" value="N"/>'+ 
            '<button type="button" id="cmpnyButton" class="block w-full py-1 px-2.5 font-semibold text-center text-white border border-secondary-00 bg-secondary-700 rounded-lg hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800 leading-6" onclick="toggleButton1(' + count1 + ')">사업자 수정</button>'+
            '<svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#b71f1f" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" onclick="removeRow(this)"/></svg>' +
            '<div class="col-span-3 my-3 h-[1px] bg-gray-200 mx-10 row-start-3"></div>';
        companySet1.appendChild(companyInfoDiv);

        count1++; // 다음 인덱스 값으로 증가
    });
}

let Editing = false;

function toggleButton1(count) {
    
	 const button = document.querySelector('#companySet1 div:nth-child(' + (count + 1) + ') button');
	 const compname = document.querySelector('#companySet1 div:nth-child(' + (count + 1) + ') input[name="COMP_NAME[' + count + ']"]');
     const compregno = document.querySelector('#companySet1 div:nth-child(' + (count + 1) + ') input[name="COMP_REG_NO[' + count + ']"]');

     let isEditing = button.getAttribute('data-editing') === 'true';
     
     if (!isEditing) {
         button.textContent = '사업자 번호 인증'; // Change button text
         compregno.removeAttribute('readonly'); // Enable input field
     } else {
         regNoValidation(count); // Call validation function
     }
     button.setAttribute('data-editing', !isEditing);
}



function toggleButton2(count) {
    
	 const button = document.querySelector('#companySet1 div:nth-child(' + (count + 1) + ') button');
	 const compname = document.querySelector('#companySet1 div:nth-child(' + (count + 1) + ') input[name="COMP_NAME[' + count + ']"]');
     const compregno = document.querySelector('#companySet1 div:nth-child(' + (count + 1) + ') input[name="COMP_REG_NO[' + count + ']"]');

     regNoValidation(count);
    
}



function regNoValidation(count){
	console.log("count123"+count);
	let compRegNo = document.querySelector('input[name="COMP_REG_NO[' + count + ']"]').value;
	 console.log("compRegNo value: " + compRegNo);
	 /*if (!compRegNo.value) {
	        alert('사업자번호를 입력해 주세요.');
	        return false;
	    }*/
	 
	 $.ajax({
		    type: "POST",
		    url: "/member/comRegNoConfirm.do",
		    data: {compRegNo: compRegNo},
		    success: function (data) {
		        console.log("NumberSend : " + data);
		        alert('사업자번호가 확인되었습니다.');
		        document.querySelector('input[name="REGNO_CHECK[' + count + ']"]').value = "Y"; // ID도 count와 함께 변경
		        fn_selectCmpnyPop1(data,count);
		    },
		    error: function (e, textStatus, errorThrown) {
		        if (e.status == 400) {
		            alert("Your request is up. Please log back in if you wish to continue");
		            //location.href = document.referrer;
		        } else {
		            console.log(errorThrown);
		            alert("사업자 번호가 등록되어 있지 않습니다. 관리자에게 문의해 주세요.");
		        }
		    }
		});
}


let isEditing = false;

function toggleButton() {
    
	const button = document.getElementById('emailButton');
	const emailInput = document.getElementById('MEMBER_EMAIL');
	const numInput = document.getElementById('CERT_NUM');

    if (!isEditing) {
        // 처음 버튼 클릭 시
        button.textContent = '인증번호 발송'; // 버튼 텍스트 변경
        emailInput.removeAttribute('readonly'); // 이메일 입력란 readonly 해제
        numInput.removeAttribute('readonly'); // 인증번호 입력란 readonly 해제
    } else {
        // 두 번째 버튼 클릭 시
        emailValidation(); // 사업자번호 인증 발송 함수 호출
    }

    isEditing = !isEditing; // 상태 토글
}

function fn_searchInfoCmpny(cnt){
	$("#searchCmpnyInfoPopUp").modal("show");

    fn_searchInfoCmpnyInfoPopup(cnt);
};

function cmpnySearchPopupClose(cnt){
	$("#searchCmpnyInfoPopUp").modal("hide");
}


function enterKeyPopUp(cnt) {
	if (window.event.keyCode == 13) {
		fn_searchInfoCmpnyInfoPopup(cnt);
    }
}


function fn_searchInfoCmpnyInfoPopup(cnt){
	var sData = {};
	// console.log("sData: " + sData);
	sData["srch1"] = $('#cmpnySrch1').val();
	sData["srch2"] = cnt;
	//console.log(sData["srch1"]);
	
	
	fn_loading(true);
	$.ajax({
		type : "POST",
		url : "/member/selectSearchCmpnyList.do",
		data : sData,
		beforeSend : function(xmlHttpRequest){
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		dataType : 'json',
		async: false,
        success : function(data) {
        	console.log("count11"+data.count);
        	var getData = data.resultList;
        	// 각 객체에 count 속성 추가
        	getData.forEach(function(item) {
        	    item.count = data.count;
        	})
        	cmpnyInfoHot.loadData([]);
        	cmpnyInfoHot.loadData(getData);
        	//console.log("getData", JSON.stringify(getData));
			setTimeout(function() {cmpnyInfoHot.render()}, 200);
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

function fn_handsonGridcmpnyInfoPopupOption() {
	cmpnyInfoPopupSettings = {
        columns: [
        	{ data: 'taxNo', type: 'text', className: "htCenter", readOnly: true },
        	{ data: 'cmpnyNm', type: 'text', className: "htCenter", readOnly: true },
        	{ data: 'count', type: 'text', className: "htCenter", readOnly: true},
        ],
        stretchH: 'all',
        width: '100%',
        autoWrapRow: true,
        height: 250,
        rowHeights: 25,
        rowHeaders: true,
        columnHeaderHeight: 25,
        colHeaders: ["사업자 번호", "회사 명","count"], 
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
        hiddenColumns: { copyPasteEnabled: false, indicators: false, columns: [2] },
        
        afterOnCellMouseDown : function(event, coords, td) {
        	console.log("coords: " + JSON.stringify(coords));
        	console.log("event: " + JSON.stringify(event));
        	console.log("td: " + JSON.stringify(td));
			var now = new Date().getTime();
			/*if (!(td.lastClick && now - td.lastClick < 200)
					|| coords.row < 0 || coords.col < 0) {
				td.lastClick = now;
				return;
			}*/

			//fn_selectCmpnyPop1(coords);
		}
    };

    return cmpnyInfoPopupSettings;
}


function fn_selectCmpnyPop1(coords,count) {
	
	let coordsObj = JSON.parse(coords);;
    
    const taxNo1 = coordsObj.resultList[0].taxNo;
	const cmpnyNm1 = coordsObj.resultList[0].cmpnyNm;
 

    console.log("taxNo: " + taxNo1);
    console.log("cmpnyNm: " + cmpnyNm1);
    console.log("count: " + count);
    
    
    $("#searchCmpnyInfoPopUp").modal("hide");
    
    // 선택된 업체 정보를 사용하여 companyName와 companyNumber 설정
    var companyNameInput = document.getElementsByName("COMP_NAME[" + count + "]")[0];
    var companyNumberInput = document.getElementsByName("COMP_REG_NO[" + count + "]")[0];
    
    companyNameInput.value = cmpnyNm1;
    companyNumberInput.value = taxNo1;
	
    
};





function getJoinCodeArray(){
    let url = window.location.href;
    document.querySelector('#LANG').value = url.split("=")[1];
    param = {CODE_GROUP_ID : "joinCode", LANG : url.split("=")[1]}
    jsonAjaxAsync("joinCode", "/code/commonCodeList", param, "POST", joinCodeArraySet)
}

function joinCodeArraySet(reData){

    for(let data of reData) {
        for(let code of joinCodeArray) {
            if(code["CODE_COMMON_ID"] == data["CODE_COMMON_ID"]) {
                code["CODE_NAME"] = data["CODE_NAME"];
            }
        }
    }
    $.unblockUI();
}
// 사업자 추가
var addCount = 1;  // Initialize a counter

function addRow(event) {
	// 기존 사업자 중 가장 큰 인덱스 찾기
    let maxIndex = 0;
    $('input[name^="COMP_NAME"]').each(function() {
        let index = parseInt($(this).attr('name').match(/\[(\d+)\]/)[1]);
        if (index > maxIndex) {
            maxIndex = index;
        }
    });
    
    console.log("maxIndex>>"+maxIndex);
    // 다음 카운트 값 설정
    addCount = maxIndex + 1;
    
    newRow =
        '<div class="companySets grid grid-cols-[1fr_2.4fr_1fr] gap-x-2 gap-y-1 items-center">'+
        '<label for="company_name" class="text-primary-700 font-semibold px-2 text-left row-start-2">사업자 명</label>' +
        '<input type="text" readonly id="company_name" name="COMP_NAME[' + addCount + ']" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5 text-lg row-start-2" placeholder="사업자 명을 선택해주세요.">' +
        '<label for="company_number" class="text-primary-700 font-semibold px-2 text-left">사업자 번호</label>' +
        '<input type="text" id="company_number" name="COMP_REG_NO[' + addCount + ']" oninput="removeHyphen(event)" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1 px-2.5 text-lg" placeholder="사업자 번호를 선택해주세요.">'+
        '<input type="hidden" id="REGNO_CHECK_' + addCount + '" name="REGNO_CHECK[' + addCount + ']" value="N"/>'+ 
        '<button type="button" id="cmpnyButton" class="block w-full py-1 px-2.5 font-semibold text-center text-white border border-secondary-00 bg-secondary-700 rounded-lg hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800 leading-6" onclick="toggleButton2(' + addCount + ')">사업자 번호 인증</button>'+
        '<svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#b71f1f" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" onclick="removeRow(this)"/></svg>' +
        '<div class="col-span-3 my-3 h-[1px] bg-gray-200 mx-10 row-start-3"></div>';
    $('#companySet1').append(newRow);

    addCount++;
    
}

function removeRow(button) {
    // 현재 행을 찾아 삭제.
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function showDetails(id) {
	   var details = document.getElementById(id);
	   if (details.style.display === "none") {
	     details.style.display = "block";
	   } else {
	     details.style.display = "none";
	   }
	 }


// 사업자 + 
function collectData() {
    var compnyRows = document.querySelectorAll('#cmpnyRows tr');
    var formData = { compnyList: [] };

    compnyRows.forEach(function (row, index) {
        var compName = row.querySelector('input[name^="compnyList["][name$="].compName"]').value;
        var compRegNo = row.querySelector('input[name^="compnyList["][name$="].compRegNo"]').value;

        formData.compnyList.push({
            compName: compName,
            compRegNo: compRegNo
        });
    });

    return formData;
}


/* - 없애기 */
function removeHyphen(){
	
	var phoneNumber = document.getElementById('MEMBER_TEL').value;
	var cmpyRegNo = document.getElementById('COMP_REG_NO').value;
	 	
		phoneNumber = phoneNumber.replace(/-/g, '');
	 	cmpyRegNo = cmpyRegNo.replace(/-/g, '');
	 	
	 	document.getElementById('MEMBER_TEL').value = phoneNumber;
	 	document.getElementById('COMP_REG_NO').value = cmpyRegNo;
}

/* 비밀번호 체크 */
function passChk(){
	
	if(!document.querySelector('#MEMBER_PASSWORD').value){
		alert("비밀번호를 입력해 주세요.");
		document.querySelector('#MEMBER_PASSWORD').focus();
		return false;
	}

	var param = document.querySelector('#MEMBER_PASSWORD').value;
	console.log('param'+param);
	$.ajax({
	    type: "POST",
	    url: "/member/passCheck.do",
	    data: {usrPwd: param}, // 객체를 그대로 전송
	    /*beforeSend: function (xmlHttpRequest) {
	        xmlHttpRequest.setRequestHeader("AJAX", "true");
	    },*/
	    dataType: "text",
	    success: function (data) {
	        console.log("Returned data: " + data);
	        passCheckCallback(data);
	    },
	    error: function (e, textStatus, errorThrown) {
	        if (e.status == 400) {
	            alert("Your request is up. Please log back in if you wish to continue");
	            location.href = document.referrer;
	        } else {
	            console.log(errorThrown);
	            alert("An error occurred while checking the ID.");
	        }
	    }
	});
}
/*현재 비밀번호 체크*/
function passCheckCallback(data){
	 var xmlDoc = new DOMParser().parseFromString(data, "text/xml"); // XML 파싱
	 var parsedData = parseInt(xmlDoc.querySelector("Integer").textContent); // XML에서 숫자 추출
	const passInput = document.getElementById('MEMBER_PASS');
	const repassInput = document.getElementById('MEMBER_PASS_CHK');
	if (parsedData > 0) {
      alert("비밀번호가 확인되었습니다. 새 비밀번호를 설정해 주세요");
      passInput.removeAttribute('readonly');
      repassInput.removeAttribute('readonly');
    } else {
    	alert("비밀번호가 일치하지 않습니다.")
    	return;
    }
}

/*새 비밀번호 체크 */
function memberPassChk(str){
	console.log("str>>"+str);
	let memberPass = document.querySelector('#MEMBER_PASS'); //비밀번호
	let memberPassChk = document.querySelector('#MEMBER_PASS_CHK'); //비밀번호확인
	let passCheck1 = document.querySelector('.passCheck1'); //비밀번호
	let passCheck2 = document.querySelector('.passCheck2'); //비밀번호 확인
	if (str == 'pw') {
        if (memberPass.value != "") {
            let chk_num = memberPass.value.search(/[0-9]/g);
            let chk_small_eng = memberPass.value.search(/[a-z]/);
            let chk_large_eng = memberPass.value.search(/[A-Z]/);
            let chk_spe = memberPass.value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

            if (!/^(?=.*[a-zA-Z0-9])((?=.*\d)|(?=.*\W)).{5,20}$/.test(memberPass.value)) {
                passCheck1.innerHTML = '● 비밀번호(대문자, 소문자, 특수문자, 숫자 포함, 5~20자리)를 입력해주세요';
                passCheck1.style.color = "red";
                return;
            } else if (chk_small_eng < 0) {
                passCheck1.innerHTML = '● 비밀번호에 하나 이상의 영문 소문자가 포함되어야 합니다.';
                passCheck1.style.color = "red";
                return;
            } else if(chk_large_eng < 0){
                passCheck1.innerHTML = '● 비밀번호에 하나 이상의 영문 대문자가 포함되어야 합니다.';
                passCheck1.style.color = "red";
                return;
           } else if (chk_spe < 0) {
                passCheck1.innerHTML = '● 비밀번호에 하나 이상의 특수문자가 포함되어야 합니다.';
                passCheck1.style.color = "red";
                return;
            } else if (chk_num < 0) {
				passCheck1.innerHTML = '● 비밀번호에 하나 이상의 숫자가 포함되어야 합니다.';
                passCheck1.style.color = "red";
                return;
			} else {
                passCheck1.innerHTML = '● 사용가능한 비밀번호입니다.';
                passCheck1.style.color = "#55A5B7";
                return;
            }
        } else {
            passCheck1.innerHTML = '● 비밀번호를 입력해주세요.';
            passCheck1.style.color = "red";
            return;
        }
	} else {
        if (memberPass.value != "" && memberPassChk.value != "") {
            if (memberPassChk.value != memberPass.value) {
                passCheck2.innerHTML = '● 비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요.';
                passCheck2.style.color = "red";
                document.getElementById('passwordIndicator').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><path fill="#990f0f" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>';
                return;
            } else {
                passCheck2.innerHTML = '● 비밀번호가 일치합니다.';
                passCheck2.style.color = "#55A5B7";
                document.getElementById('passwordIndicator').innerHTML = '<i class="fa-duotone fa-check bg-primary-200 rounded-full flex items-center justify-center p-1"></i>';
                return;
            }
        } else {
            passCheck2.innerHTML = '● 비밀번호를 확인해주세요.';
            passCheck2.style.color = "red";
            return;
        }
	}
}

/* 이메일 검증 */
function emailValidation(){
	let url = window.location.href;
	let memberEmail = document.querySelector('#MEMBER_EMAIL').value;
    //이메일 정규식 확인
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(!regex.test(memberEmail)) {
        alert(joinCodeArray[16].CODE_NAME);
        return false;
    }else{
    emailSend(memberEmail, url.split("=")[1]);
    }
   /* //이메일 중복여부 체크
    let url = window.location.href;
    let param={MEMBER_EMAIL : memberEmail, LANG : url.split("=")[1]};
    jsonAjaxAsync('emailCheck', '/member/emailCheck', param, 'POST', function(reData){
        if (reData == 1) {
            alert(joinCodeArray[17].CODE_NAME);
            $.unblockUI();
            return false;
        } else {
            emailSend(memberEmail, url.split("=")[1]);
        }
    });*/
}

/* 이메일 전송 */
function emailSend(email, lang){
	
	console.log('email>'+email);
	console.log('lang>'+lang);
	
    let param = {email : email, lang : 'kr'}
    console.log('param', param);
    $.ajax({
	    type: "POST",
	    url: "/member/myPageCertNumberSend.do",
	    data: JSON.stringify(param),
	    contentType: "application/json; charset=utf-8",
	    success: function (data) {
	        console.log("NumberSend : " + data);
	        emailSendResult(data);
	    },
	    error: function (e, textStatus, errorThrown) {
	        if (e.status == 400) {
	            alert("Your request is up. Please log back in if you wish to continue");
	            //location.href = document.referrer;
	        } else {
	            console.log(errorThrown);
	            alert("An error occurred while checking the ID.");
	        }
	    }
	});
    
}

/* 이메일 전송 결과 */
function emailSendResult(data){
    if(data == "success") {
        alert('인증번호를 발송하였습니다. 인증번호를 입력해 주시기 바랍니다.');
        startTimer();
       // $.unblockUI();
    } else {
        alert('인증번호 발송에 실패하였습니다. 관리자에게 문의 바랍니다.');
       // $.unblockUI();
        return false;
    }
}
/* 인증번호 타이머 */
let minutes = 5;
let seconds = 0;
let timer;
function startTimer(){
    timer = setInterval(updateTimer, 1000);
}

/* 타이머  */
function updateTimer() {
    console.log("11");
    let timerElement = document.querySelector(".timer");
    if (minutes == 0 && seconds == 0) {
        clearInterval(timer);
        timerElement.innerHTML = '● 인증시간이 초과 되었습니다.';
        let param = { MEMBER_EMAIL: document.querySelector('#MEMBER_EMAIL').value };
        $.ajax({
            type: "post",
            url: "/member/certTimeOut.do",
            data: { email: param },
            dataType: "text",
            success: function (data) {
                alert('인증시간이 초과되었습니다. 다시 인증을 받아주세요.');
                return;
            },
            error: function () {
                console.error('에러가 났습니다');
            }
        });
        return;
    } 
    if (seconds == 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    timerElement.innerHTML = ''; 
    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("viewBox", "0 0 512 512");
    svgElement.setAttribute("width", "18"); 
    svgElement.setAttribute("height", "18"); 
    svgElement.innerHTML = '<path fill="#55A5B7" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>';
    let textNode = document.createTextNode(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    timerElement.appendChild(svgElement);
    timerElement.appendChild(textNode);
}


/* 인증확인 */
function certNumberConfirm(){
    console.log("인증");
	let certNum = document.querySelector('#CERT_NUM');
    let memberEmail = document.querySelector('#MEMBER_EMAIL').value;
    console.log("certNum"+certNum);
    console.log("memberEmail"+memberEmail);
    
    if (!certNum.value) {
        alert('인증번호를 입력해 주세요.');
        return false;
    }

    let param = {
            MEMBER_EMAIL : memberEmail,
            CERT_NUM : Number(certNum.value)
        }
    console.log('param', param);
    $.ajax({
	    type: "POST",
	    url: "/member/certNumberConfirm.do",
	    data: JSON.stringify(param),
	    contentType: "application/json; charset=utf-8",
	    success: function (data) {
	        console.log("NumberSend : " + data);
	        certNumberConfirmResult(data);
	    },
	    error: function (e, textStatus, errorThrown) {
	        if (e.status == 400) {
	            alert("Your request is up. Please log back in if you wish to continue");
	            //location.href = document.referrer;
	        } else {
	            console.log(errorThrown);
	            alert("An error occurred while checking the ID.");
	        }
	    }
	});
}

function certNumberConfirmResult(data){
    if (data == "notFoundData") {
        alert('인증번호를 확인해 주시기 바랍니다.');
        //$.unblockUI();
        return false;
    } else if (data == "Timeout") {
        alert('인증시간이 초과되었습니다.');
        //$.unblockUI();
        return false;
    } else {
        alert('인증되었습니다.');
        clearInterval(timer);
        document.querySelector(".timer").innerHTML = "● 인증되었습니다.";
        document.querySelector(".timer").style.color = "#55A5B7";
        document.querySelector("#CERT_CHECK").value = "Y";
        //$.unblockUI();
        return false;
    }
}
/* 회원가입 데이터 체크 */
function myPageDataConfirm(){
	let frm = document.querySelector('#myPageFrm');

	
	if(!frm.querySelector('#MEMBER_PASS').readOnly){
		if(!frm.querySelector('#MEMBER_PASS').value) {
		    alert("비밀번호를 입력해 주세요.");
	        frm.querySelector('#MEMBER_PASS').focus();
	        return false;
		}
	}
	
	if(!frm.querySelector('#MEMBER_PASS_CHK').readOnly){
		if(!frm.querySelector('#MEMBER_PASS_CHK').value){
		    alert("비밀번호 중복을 확인해 주세요.")
		    frm.querySelector('#MEMBER_PASS_CHK').focus();
	        return false;
		}
	}
	if(!frm.querySelector('#MEMBER_PASS').readOnly){
		if (frm.querySelector('#MEMBER_PASS').value != frm.querySelector('#MEMBER_PASS_CHK').value) {
			alert("비밀번호를 확인해 주세요.");
			frm.querySelector('#MEMBER_PASS_CHK').focus();
			return false;
		}
	}
	
	/*if (!frm.querySelector('#COMP_REG_NO').value) {
		alert("사업자 번호를 입력해 주세요.");
		frm.querySelector('#COMP_REG_NO').focus();
		return false;
	}
	if (!frm.querySelector('#COMP_NAME').value) {
		alert("사업장 상호를 입력해 주세요.");
		frm.querySelector('#COMP_NAME').focus();
		return false;
	}*/
	
	if (!frm.querySelector('#MEMBER_TEL').value) {
		alert("전화번호를 입력해 주세요");
		frm.querySelector('#MEMBER_TEL').focus();
		return false;
	}

	if(!frm.querySelector('#MEMBER_NAME').value){
		alert('이름을 입력해 주세요.');
		frm.querySelector('#MEMBER_NAME').focus();
		return false;
	}

	if(!frm.querySelector('#MEMBER_EMAIL').readOnly){ 
		if(frm.querySelector('#CERT_CHECK').value != 'Y') {
	        alert('이메일 인증을 해주세요.');
	        return false;
	    }
	}
	// 추가한 조건: 회사 이름과 사업자 번호가 둘 다 비어있거나, 사업자 번호가 입력되지 않은 경우 알림 표시
    const companySets = frm.querySelectorAll('.companySets');
    for (let i = 0; i < companySets.length; i++) {
        const companyNameInput = companySets[i].querySelector('input[name^="COMP_NAME"]');
        const companyRegNoInput = companySets[i].querySelector('input[name^="COMP_REG_NO"]');
        
        // 회사 이름과 사업자 번호가 모두 비어있는 경우 알림 표시
       if(!companyNameInput.value.trim() && companyRegNoInput.value.trim()){
    	   alert('사업자 번호를 인증해 주세요.');
    	   return false;
       }
        if (!companyNameInput.value.trim() && !companyRegNoInput.value.trim()) {
            alert('사업자 정보를 등록해 주세요.');
            return false;
        }
    } 
    var remainingRows = $('.companySets').length;
    if (remainingRows === 0) {
        alert('최소 1개의 사업자 정보가 필요합니다.');
        return false;
    }
   
      
    // 비밀번호 조합체크
    let memberPass = frm.querySelector('#MEMBER_PASS').value;
    if(!frm.querySelector('#MEMBER_PASS').readonly){ 
	    if(memberPass != ""){
	        let chk_num = memberPass.search(/[0-9]/g);
	        let chk_small_eng = memberPass.search(/[a-z]/);
	        let chk_large_eng = memberPass.search(/[A-Z]/);
	        let chk_spe = memberPass.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
	
	        if (!/^(?=.*[a-zA-Z0-9])((?=.*\d)|(?=.*\W)).{5,20}$/.test(memberPass)) {
	            alert('비밀번호는 숫자와 영문자, 특수문자를 포함한 5~20자리 문자를 입력해야 합니다.');
	            return false;
	        } else if (chk_small_eng < 0) {
	            alert('비밀번호는 한 개 이상의 영문 소문자가 포함되어야 합니다.');
	            return false;
	        } else if(chk_large_eng < 0){
	            alert('비밀번호는 한 개 이상의 영문 대문자가 포함되어야 합니다.');
	            return false;
	        } else if (chk_spe < 0) {
	            alert('비밀번호는 특수문자가 한 개 이상 포함되어야 합니다.');
	            return false;
	        }
	    }
    }
    alert('회원수정이 완료되었습니다.');
    $("#myPageFrm").submit();
    
 /*   let param = {COMP_REG_NO : frm.querySelector('#COMP_REG_NO').value};
    $.ajax({
	    type: "POST",
	    url: "/member/companyCheck.do",
	    data: JSON.stringify(param),
	    contentType: "application/json; charset=utf-8",
	    success: function (data) {
	        console.log("NumberSend : " + data);
	        resultJoinDataConfirm(data);
	    },
	    error: function (e, textStatus, errorThrown) {
	        if (e.status == 400) {
	            alert("Your request is up. Please log back in if you wish to continue");
	            //location.href = document.referrer;
	        } else {
	            console.log(errorThrown);
	            alert("An error occurred while checking the ID.");
	        }
	    }
	});*/
}

/*function resultJoinDataConfirm(data){
    if (data == 0){
       alert('등록되지 않은 업체입니다. 관리자에게 문의  바랍니다.');
       return false;
    } else {
    	alert('회원수정이 완료되었습니다.');
    	$("#myPageFrm").submit();
    }
}*/


