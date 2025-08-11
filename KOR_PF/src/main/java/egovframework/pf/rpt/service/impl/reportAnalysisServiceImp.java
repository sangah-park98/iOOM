package egovframework.pf.rpt.service.impl;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.rpt.service.AnalysisService;
import egovframework.pf.rpt.service.reportAnalysisService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : reportAnalysisServiceImp.java
 * @Description : reportAnalysisServiceImp Class
 * @Modification Information
 * @
 * @         수정일            		       수정자           			수정내용
 * @    ----------------    ------------    ---------------------------
 * @       2025.03.24          	권예지         			최초 생성
 *
 * @author 권예지
 * @since 2025.03.24
 * @version 1.0
 * @see
 *
 *  Copyright (C) by KordSystems All right reserved.
 */

@Service("reportAnalysisService")
public class reportAnalysisServiceImp extends EgovAbstractServiceImpl implements reportAnalysisService {
	 
	 @Resource(name="reportAnalysisMapper")
	private reportAnalysisMapper reportAnalysisMapper;
	
	 // 수입통관현황
	@Override
	public List<?> selectImportStatus(SearchVO vo) throws Exception {
		return reportAnalysisMapper.selectImportStatus(vo);
	}
	//수입통관 세액현황
	@Override
	public List<?> selectTaxStatus(SearchVO vo) throws Exception {
		return reportAnalysisMapper.selectTaxStatus(vo);
	}
	// 전년 동월 대비 건수 비교 
	@Override
	public List<?> selectTaxCount(SearchVO vo) throws Exception {
		return reportAnalysisMapper.selectTaxCount(vo);
	}
	// 수입물품 과세현황
	@Override
	public List<?> selectTaxList(SearchVO vo) throws Exception {
		
		// curYear: 202503
        String curYear = vo.getSrch4();
        
        
        int year = Integer.parseInt(curYear.substring(0, 4));  // 연도 추출 (2025)
        int month = Integer.parseInt(curYear.substring(4, 6)); // 월 추출 (03)
        
        // 현재 월에서 한 달을 빼서 이전 월 계산
        Calendar cal = Calendar.getInstance();
        cal.set(year, month - 1, 1);
        System.out.println("cal"+cal);

        // 그 전달의 첫째 날
        cal.add(Calendar.MONTH, -1);  // 한 달을 빼서 전달로 이동
        String firstDayOfLastMonth = String.format("%04d%02d01", cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1);  // 전달의 첫날

        // 그 전달의 마지막 날 계산
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH)); // 그 달의 마지막 날로 설정
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String lastDayOfLastMonth = sdf.format(cal.getTime());  // 전달의 마지막 날

        // 결과 출력
        System.out.println("First day of last month: " + firstDayOfLastMonth);
        System.out.println("Last day of last month: " + lastDayOfLastMonth);
        
        vo.setSrch5(firstDayOfLastMonth);
		vo.setSrch6(lastDayOfLastMonth);
		
		List<?> HscodeList = reportAnalysisMapper.selectHscodeList(vo);
		
		List<String> hsList = new ArrayList<>();

		for (Object item : HscodeList) {
		    if (item instanceof Map) { 
		        Map<?, ?> mapItem = (Map<?, ?>) item;
		        Object hsValue = mapItem.get("hs");  
		        if (hsValue != null) {
		            hsList.add(hsValue.toString());  
		        }
		    }
		}

		vo.setList2(hsList);
		
		System.out.println("vo.getList(): " + vo.getList2());
		
		return reportAnalysisMapper.selectTaxList(vo);
	}
	// 수입물품 적용세율
	@Override
	public List<?> selectTaxRate(SearchVO vo) throws Exception {
		return reportAnalysisMapper.selectTaxRate(vo);
	}
	//수입정정
	@Override
	public List<?> selectImportUpdateList(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectImportUpdateList(vo);
	}
	//fta 사후적용
	@Override
	public List<?> selectFtaAmoutList(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectFtaAmoutList(vo);
	}
	// 주요 해외 거래처
	@Override
	public List<?> selectNationSales(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectNationSales(vo);
	}
	//평균 관세율
	@Override
	public String avgRate(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.avgRate(vo);
	}
	// 상위 10개 관세율
	@Override
	public String topAvgRate(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.topAvgRate(vo);
	}
	//수출 현황
	@Override
	public List<?> selectExportStatus(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectExportStatus(vo);
	}
	//주요 해외 거래처(수출)
	@Override
	public List<?> selectNationSalesExport(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectNationSalesExport(vo);
	}
	// 수출입 정정 귀책자별 비율
	@Override
	public List<?> selectUpdateCount(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectUpdateCount(vo);
	}
	//인코텀즈
	@Override
	public List<?> selectIncoterms(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectIncoterms(vo);
	}
	//세관별 신고건수 및 금액(수입)
	@Override
	public List<?> selectImpCus(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectImpCus(vo);
	}
	//세관별 신고건수 및 금액(수출)
	@Override
	public List<?> selectExpCus(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectExpCus(vo);
	}
	// FTA 관세 절감효과
	@Override
	public List<?> selectFtaSavingList(SearchVO vo) throws Exception {
			
		    /* LocalDate today = LocalDate.now();
			
			 LocalDate before364 = today.minusDays(364);
			
			 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
			    String todayStr = today.format(formatter);         
			    String beforeStr = before364.format(formatter);   
			
			    vo.setSrch20(todayStr);
			    vo.setSrch21(beforeStr);*/
			
		return reportAnalysisMapper.selectFtaSavingList(vo);
	}
	// // FTA 적용으로 SAVING추가가능한 금액 
	@Override
	public List<?> selectFtaSavingAddList(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectFtaSavingAddList(vo);
	}
	// 전담 관세사 
	@Override
	public List<?> selectCmpnyManagerList(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return reportAnalysisMapper.selectCmpnyManagerList(vo);
	}

}
