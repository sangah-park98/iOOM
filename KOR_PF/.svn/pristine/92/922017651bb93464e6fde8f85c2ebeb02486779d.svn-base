package egovframework.pf.rpt.service.impl;


import java.util.List;

import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.rpt.service.SaveBankInfoVO;
import egovframework.pf.rpt.service.SaveCalCodeVO;
import egovframework.pf.rpt.service.SaveCalculInfoVO;
import egovframework.pf.rpt.service.SaveCalculateVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;




/**
 * 리포트분석 매퍼 클래스
 *
 * @author  권예지
 * @since 2025.03.17
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 * @         수정일            		       수정자           			수정내용
 * @    ----------------    ------------    ---------------------------
 * @       2025.03.17         	권예지         			최초 생성
 *
 * </pre>
 */
@Mapper("reportAnalysisMapper")
public interface reportAnalysisMapper {

	List<?> selectImportStatus(SearchVO vo);

	List<?> selectTaxStatus(SearchVO vo);

	List<?> selectTaxCount(SearchVO vo);

	List<?> selectHscodeList(SearchVO vo);

	List<?> selectTaxList(SearchVO vo);

	List<?> selectTaxRate(SearchVO vo);

	List<?> selectImportUpdateList(SearchVO vo);

	List<?> selectFtaAmoutList(SearchVO vo);

	List<?> selectNationSales(SearchVO vo);

	String avgRate(SearchVO vo);

	String topAvgRate(SearchVO vo);

	List<?> selectExportStatus(SearchVO vo);

	List<?> selectNationSalesExport(SearchVO vo);

	List<?> selectUpdateCount(SearchVO vo);

	List<?> selectIncoterms(SearchVO vo);

	List<?> selectCusAmt(SearchVO vo);

	List<?> selectImpCus(SearchVO vo);

	List<?> selectExpCus(SearchVO vo);

	List<?> selectFtaSavingList(SearchVO vo);

	List<?> selectFtaSavingAddList(SearchVO vo);

	List<?> selectCmpnyManagerList(SearchVO vo);
	
}