package egovframework.pf.cmmn.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : CmmnService.java
 * @Description : CmmnService Class
 * @Modification Information
 * @
 * @         수정일            수정자           수정내용
 * @    ----------------    ------------    ---------------------------
 * @       2020.01.15          심창무          최초 생성
 *
 * @author 심창무
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface CmmnService {

	//로그인체크
	Map<String, String> selectCmpnyIdCheck(SearchVO vo) throws Exception;

	//회사목록 조회
	List<?> selectUsrCmpnyList(SearchVO vo) throws Exception;

	//대메뉴 조회
	List<?> selectLargeMenuList(SearchVO vo) throws Exception;

	//소메뉴 조회
	List<?> selectSmallMenuList(SearchVO vo) throws Exception;

	//특정메뉴정보 조회
	List<?> selectDashboardInfo(SearchVO vo) throws Exception;


	//메시지 조회
	List<?> selectMsgList(SearchVO vo) throws Exception;

	//코드 조회(팝업)
	List<?> selectCmmnCdPop(SearchVO vo) throws Exception;

	//공통코드 갯수 조회(팝업)
	int selectCmmnCdPopCnt(SearchVO vo) throws Exception;

	//공통코드 조회
	List<?> selectCmmnCdList(SearchVO vo) throws Exception;

	//작성권한 체크
	String selectWriteCheck(String param, UserSessionVO userVO) throws Exception;

	//플랜트코드 조회
	List<?> selectPlntCdList(SearchVO vo, UserSessionVO userVO) throws Exception;

	//그룹코드 조회
	List<?> selectGroupCdList(SearchVO vo, UserSessionVO userVO) throws Exception;

	//대륙코드 조회
	List<?> selectOceanCdList(SearchVO vo) throws Exception;

	List<?> selectAllCmpnyList(SearchVO vo);

}

