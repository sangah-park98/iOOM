 <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <!DOCTYPE html>
 <html lang="ko">
 <head>
 	<meta charset="UTF-8" />
	<script src="/pf/js/function.js"></script>
	<script src="/pf/js/cmmn/ftamenu.js"  charset="UTF-8"></script>
 </head>

 <script type="text/javascript">

 	/* 메시지 */
 	var colMenuId = "${menuId}";
 	var colMenuNmVn = "${menuNmVn}";
 	var colMenuNmEn = "${menuNmEn}";
 	var colMenuNmKr = "${menuNmKr}";
 	var colUpprMenuId = "${upprMenuId}";
 	var colOrderSn = "${orderSn}";
 	var colMenuType = "${menuType}";
 	var coldispYn = "${dispYn}";

 	var msgSearchError = "${searchError}"; //조회중 에러가 발생하였습니다.
 	var msgSaveEmpty = "${saveEmpty}"; //저장할 데이터가 없습니다.
 	var msgSaveCheck = "${saveCheck}"; //데이터 정합성을 체크해주세요.
 	var msgSaveConfirm = "${saveConfirm}"; //저장하시겠습니까?
 	var msgSaveSuccess = "${saveSuccess}"; //저장 되었습니다.
 	var msgSaveError = "${saveError}"; //저장중 에러가 발생하였습니다.

 </script>

<body class="text-left" id="menu">
	<div class="main-content">
		<div class="row">
			<div class="col-md-12">
				<div class="tab-content" id="myTabContent">
					<div class="accordion" id="accordionRightIcon">
						<div class="card">
							<div class="card-header header-elements-inline">
								<h6 class="card-title ul-collapse__icon--size ul-collapse__right-icon mb-0"><a class="text-default" data-toggle="collapse" href="#accordion-item-icon-right-1" aria-expanded="true">${search}</a></h6>
							</div>
							<div class="collapse show" id="accordion-item-icon-right-1" data-parent="#accordionRightIcon" style="">
								<div class="card-body">
									<div class="form-group col-xl-12 row">
										<!-- 검색구분 -->
										<!-- xl lg md sm xs  -->
										<div class="col-xl-12 col-lg-12 rowflex">
					                		<label class="ul-form__label ul-form--margin col-lg-1 col-form-label" for="">${menuType}</label>
					                		<div class="col-xl-11 col-lg-11" style="justify-content:flex-start; display:flex; width:inherit">
					                			<div class="ul-form__radio-inline inline" id="item-radio" >
													<label class="ul-radio__position radio radio-primary form-check-inline">
					                					<input type="radio" name="menu_srch4" value="01"  checked="checked" /><span class="ul-form__radio-font">${upprMenu}</span><span class="checkmark" ></span>
					                				</label>
					                				<label class="ul-radio__position radio radio-primary form-check-inline">
					                					<input type="radio" name="menu_srch4" value="02"  /><span class="ul-form__radio-font">${smallMenu}</span><span class="checkmark"></span>
					                				</label>
					                			</div>
					                			<div class="" style="margin-left:auto; display:flex" >
						                			<button class="btn btn-outline-secondary m-1" type="button" onclick="fn_clearMenu()">${clear}</button>
						            				<button class="btn btn-primary m-1" type="button" onclick="fn_searchMenu();">${search}</button>
						                		</div>
					                		</div>
						                </div>
					                </div>

					                <div class="custom-separator"></div>

					                <div class="form-group col-xl-12 row">
					                	<!-- 메뉴명(VN) -->
										<div class="col-xl-4 col-lg-4 rowflex">
					                		<label class="ul-form__label ul-form--margin col-lg-3 col-form-label" for="">${menuNmVn}</label>
					                		<div class="col-lg-9">
					                			<input class="form-control" id="menu_srch1" type="text" onkeyup="enterkey()" placeholder="${menuNmVnMsg}" />
					                		</div>
					                	</div>

					                	<!-- 메뉴명(EN) -->
										<div class="col-xl-4 col-lg-4 rowflex">
					                		<label class="ul-form__label ul-form--margin col-lg-3 col-form-label" for="">${menuNmEn}</label>
					                		<div class="col-lg-9">
					                			<input class="form-control" id="menu_srch2" type="text" onkeyup="enterkey()" placeholder="${menuNmEnMsg}" />
					                		</div>
					                	</div>

										<!-- 메뉴명(KR) -->
					                	<div class="col-xl-4 col-lg-4 rowflex">
					                		<label class="ul-form__label ul-form--margin col-lg-3 col-form-label" for="">${menuNmKr}</label>
					                		<div class="col-lg-9">
					                			<input class="form-control" id="menu_srch3" type="text" onkeyup="enterkey()" placeholder="${menuNmKrMsg}" />
					                		</div>
					                	</div>
					                </div>

					                <div class="custom-separator"></div>

					                <div class="form-group col-xl-12 row">
					                	<!-- 표시여부 -->
					                	<div class="col-xl-4 col-lg-4 rowflex">
					                		<label class="ul-form__label ul-form--margin col-lg-3 col-form-label" for="">${dispYn}</label>
					                		<div class="col-lg-9">
					                			<div class="ul-form__radio-inline inline">
					                				<label class="ul-radio__position radio radio-primary form-check-inline">
					                					<input type="radio" name="menu_srch5" value=""  checked="checked" /><span class="ul-form__radio-font">ALL</span><span class="checkmark" ></span>
					                				</label>
					                				<label class="ul-radio__position radio radio-primary form-check-inline">
					                					<input type="radio" name="menu_srch5" value="Y"  /><span class="ul-form__radio-font">Y</span><span class="checkmark"></span>
					                				</label>
					                				<label class="ul-radio__position radio radio-primary">
					                					<input type="radio" name="menu_srch5" value="N" /><span class="ul-form__radio-font">N</span><span class="checkmark"></span>
					                				</label>
					                			</div>
					                		</div>
					                	</div>

					                	<!-- 상위메뉴ID -->
					                	<div class="col-xl-4 col-lg-4 rowflex" id="menu_div1">
					                		<label class="ul-form__label ul-form--margin col-lg-3 col-form-label" for="">${upprMenuId}</label>
					                		<div class="col-lg-9">
					                			<input class="form-control" id="menu_srch6" type="text" onkeyup="enterkey()" placeholder="${upprMenuId}" />
					                		</div>
					                	</div>
					                </div>
						        </div>
						    </div>
						</div>
					</div>

					<div class="accordion" id="accordionRightIconTable" style="margin-top:2em;">
						<div class="card">
							<div class="card-header header-elements-inline">
								<h6 class="card-title ul-collapse__icon--size ul-collapse__right-icon mb-0"><a class="text-default" data-toggle="collapse" href="#accordion-item-icon-right-table-1" aria-expanded="true">${menuInfo}</a></h6>
							</div>
							<div class="collapse show" id="accordion-item-icon-right-table-1" data-parent="#accordionRightIconTable" style="">
								<div class="card-body">
									<div class="card-header bg-transparent form-row" style="padding:0 1.25rem">
										<div class="card-header bg-transparent form-row" style="padding:0 1.25rem">
											<p class="card-title inline" style="line-height:35px; height:35px">${result} : <span id="menuCnt">0</span></p>
											<c:if test="${writable eq 'Y'}">
												<div class="form-group inline">
													<div class="ul-form__radio-inline">
														<label class="ul-radio__position radio radio-primary form-check-inline">
															<input type="radio" name="menuType" value="read" checked="checked" /><span class="ul-form__radio-font">${readOnly}</span><span class="checkmark"></span>
														</label>
														<label class="ul-radio__position radio radio-primary form-check-inline">
															<input type="radio" name="menuType" value="edit" /><span class="ul-form__radio-font">${edit}</span><span class="checkmark"></span>
														</label>
														<label class="ul-radio__position radio radio-primary form-check-inline">
															<input type="radio" name="menuType" value="enrol" /><span class="ul-form__radio-font">${enrollment}</span><span class="checkmark"></span>
														</label>
													</div>
												</div>
											</c:if>
										</div>

										<div class="text-right" style="flex:auto; margin-left:auto; padding-right:10px; margin-top:1.5px">
											<button class="btn btn-primary" style="padding-right:10px" type="button" id="btnMenuSave" onclick="fn_saveMenuCheck()">${save}</button>
											<%-- <form id="formid" method="POST" action="/cmmn/excelDownload.do">
      											<input type="hidden" name="srch39" value="${menuId},${menuNmVn},${menuNmEn},${menuNmKr},${upprMenuId},${orderSn},${menuType},${dispYn}" />
      											<input type="hidden" name="srch40" value="excel" />
	  											<input class="btn btn-primary" type="submit" id="unitpriceExcel" value="${excelDownload}"/>
	  					  					</form> --%>
										</div>

										<div class="text-right inline-right">
											<div class="rowWrap">
												<select class="form-control" id="alignMenu" name="alignMenu" style="text-align:center">
													<option value="" selected>${orderby} </option>
													<option value="MENU_ID">${menuId} &uarr; </option>
													<option value="MENU_ID_DESC">${menuId} &darr; </option>
													<option value="ORDR_SN">${orderSn} &uarr; </option>
													<option value="ORDR_SN_DESC">${orderSn} &darr; </option>
												</select>
												<div class="select-arrow"></div>
											</div>
										</div>

										<div class="text-right inline-right-last">
											<div class="rowWrap">
												<select class="form-control" id="menuPageCnt" name="menuPageCnt" style="text-align:right">
													<option value="50" selected>Rows [50]</option>
													<option value="100">Rows [100]</option>
													<option value="200">Rows [200]</option>
													<option value="500">Rows [500]</option>
												</select>
												<div class="select-arrow"></div>
											</div>
										</div>
									</div>

									<!-- handson table -->
									<div id="menuItem" style="margin:10px;"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>