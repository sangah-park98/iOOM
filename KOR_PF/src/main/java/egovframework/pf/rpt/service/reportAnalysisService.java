package egovframework.pf.rpt.service;

import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFSheet;

import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.cmmn.service.UserSessionVO;

/**
 * @Class Name : reportAnalysisService.java
 * @Description : reportAnalysisService Class
 * @Modification Information
 * @
 * @         수정일            		       수정자           			수정내용
 * @    ----------------    ------------    ---------------------------
 * @       2025.03.17         	권예지         			최초 생성
 *
 * @author 권예지
 * @since 2025.03.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by KordSystems All right reserved.
 */

public interface reportAnalysisService {
	 // 수입통관현황
	 List<?> selectImportStatus(SearchVO vo) throws Exception;
	 //수입통관 세액현황
	 List<?> selectTaxStatus(SearchVO vo)throws Exception;
	 // 전년 동월 대비 건수 비교 
	 List<?> selectTaxCount(SearchVO vo)throws Exception;
	 // 수입물품 과세현황
	 List<?> selectTaxList(SearchVO vo)throws Exception;
	 //수입물품 적용 세율 
	 List<?> selectTaxRate(SearchVO vo)throws Exception;
	 // 수입정정현황
	 List<?> selectImportUpdateList(SearchVO vo)throws Exception;
	 // FTA 사후적용
	 List<?> selectFtaAmoutList(SearchVO vo)throws Exception;
	 // 주요 해외 거래처
	 List<?> selectNationSales(SearchVO vo)throws Exception;
	 //평균 관세율
	 String avgRate(SearchVO vo)throws Exception;
	// 상위 10개 관세율
	 String topAvgRate(SearchVO vo)throws Exception;
	// 수출통관현황
	 List<?> selectExportStatus(SearchVO vo)throws Exception;
	// 주요 해외 거래처(수출)
	 List<?> selectNationSalesExport(SearchVO vo)throws Exception;
	// 수출입 정정 귀책자별 비율
	 List<?> selectUpdateCount(SearchVO vo)throws Exception;
	//인코텀즈
	List<?> selectIncoterms(SearchVO vo)throws Exception;
	//세관별 신고건수 및 금액(수입)
	List<?> selectImpCus(SearchVO vo)throws Exception;
	//세관별 신고건수 및 금액(수출)
	List<?> selectExpCus(SearchVO vo)throws Exception;
	// FTA 관세 절감효과
	List<?> selectFtaSavingList(SearchVO vo)throws Exception;
	// FTA 적용으로 SAVING추가가능한 금액 
	List<?> selectFtaSavingAddList(SearchVO vo)throws Exception;
	// 전담 관세사
	List<?> selectCmpnyManagerList(SearchVO vo)throws Exception;
	
}
