package egovframework.pf.rpt.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.cmmn.service.UserSessionVO;
import egovframework.pf.item.service.SaveMemoVO;
import egovframework.pf.rpt.service.CalculService;
import egovframework.pf.rpt.service.SaveBankInfoVO;
import egovframework.pf.rpt.service.SaveCalCodeVO;
import egovframework.pf.rpt.service.SaveCalculInfoVO;
import egovframework.pf.rpt.service.SaveCalculateVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : KPIServiceImpl.java
 * @Description : KPIServiceImpl Class
 * @Modification Information
 * @
 * @         수정일            		       수정자           			수정내용
 * @    ----------------    ------------    ---------------------------
 * @       2024.04.04          	이재성         			최초 생성
 *
 * @author 이재성
 * @since 2024.04.04
 * @version 1.0
 * @see
 *
 *  Copyright (C) by KordSystems All right reserved.
 */

@Service("calculService")
public class CalculServiceImpl extends EgovAbstractServiceImpl implements CalculService {


	@Resource(name="calculMapper")
	private CalculMapper calculMapper;

	@Override
	public String saveCalExcel(List<SaveCalculateVO> voList, UserSessionVO userVO) throws Exception {
		
		for(SaveCalculateVO vo : voList) {
			vo.setTaxNo(userVO.getCorpNo());
			vo.setCmpnyNm(userVO.getCmpnyCd());
			
			calculMapper.insertCalExcel(vo);
			
		}
		
		return "success";
	}
	
	@Override
	public String saveCalExcel2(List<SaveCalculateVO> voList, UserSessionVO userVO)throws Exception {
		
		for(SaveCalculateVO vo : voList) {
			vo.setTaxNo(userVO.getCorpNo());
			vo.setCmpnyNm(userVO.getCmpnyCd());
			vo.setId(userVO.getId());
			
			calculMapper.insertCalExcel2(vo);
		}
		
		return "success";
	}
	

	@Override
	public List<?> selectCalculPartnList(SearchVO vo) throws Exception {
		return calculMapper.selectCalculPartnList(vo);
	}

	@Override
	public String partnCmpnySave(SearchVO vo, UserSessionVO userVO) throws Exception {
		
		vo.setCorpNo(userVO.getCorpNo());
		vo.setCmpnyCd(userVO.getCmpnyCd());
		calculMapper.partnCmpnySave(vo);
		
		return "success";
	}

	@Override
	public List<?> selectCalculCodeList(SearchVO vo) throws Exception {
		return calculMapper.selectCalculCodeList(vo);
	}

	@Override
	public String calCodeSave(SearchVO vo, UserSessionVO userVO) throws Exception {
		vo.setCorpNo(userVO.getCorpNo());
		vo.setCmpnyCd(userVO.getCmpnyCd());
		calculMapper.calCodeSave(vo);
		
		return "success";
	}

	@Override
	public String saveCalCodeList(List<SaveCalCodeVO> calList, UserSessionVO userVO) throws Exception {
		
		for(SaveCalCodeVO vo : calList) {
			calculMapper.insertCalCodeList(vo);
		}
		return "success";
	}

	@Override
	public List<?> selectCalCodeList(SearchVO vo) throws Exception {
		return calculMapper.selectCalCodeList(vo);
	}

	@Override
	public List<?> selectCmmnCodeList(SearchVO vo) throws Exception {
		return calculMapper.selectCmmnCodeList(vo);
	}

	@Override
	public List<?> selectCalculInfo(SearchVO vo) throws Exception {
		List<?> resultList = null;
		
		if(vo.getSrch1().equals("01")) {
			resultList = calculMapper.selectCalculInfo(vo);
		} else {
			resultList = calculMapper.selectCalculInfoExp(vo);
		}
		
		return resultList;
	}
	
	@Override
	public List<?> selectCalculInfo2(SearchVO vo) throws Exception {
			
			List<?> resultList = calculMapper.selectCalculInfo2(vo);
			
			return resultList;
	}

	@Override
	public List<?> selectCalculDetailInfo(SearchVO vo) throws Exception {
		List<?> resultList = null;
		
		if(vo.getSearchType().equals("01")) {
			resultList = calculMapper.selectCalculDetailInfo(vo);
		} else {
			resultList = calculMapper.selectCalculDetailInfo2(vo);
		}
		
		return resultList;
	}
	

	@Override
	public List<?> selectCalculDetailViewInfo(SearchVO vo) throws Exception {
		List<?> resultList = null;
		
		if(vo.getSearchType().equals("01")) {
			resultList = calculMapper.selectCalculDetailViewInfo(vo);
		} else {
			resultList = calculMapper.selectCalculDetailViewInfo2(vo);
		}
		
		return resultList;
	}
	
	@Override
	public List<?> selectCalculDetailViewInfo2(SearchVO vo) throws Exception {
		
		List<?> resultList = calculMapper.selectCalculDetailViewInfo3(vo);
		return resultList;
	}


	@Override
	public List<?> selectCalculDetailViewInfoExp(SearchVO vo) throws Exception {
		List<?> resultList = null;
		
		if(vo.getSearchType().equals("01")) {
			resultList = calculMapper.selectCalculDetailViewInfoExp(vo);
		} else {
			resultList = calculMapper.selectCalculDetailViewInfo2(vo);
		}
		
		return resultList;
	}

	@Override
	public List<?> selectBankinoutlView(SearchVO vo) throws Exception {
		List<?> resultList  = calculMapper.selectBankinoutlView(vo);
		return resultList;
	}
	
	@Override
	public List<?> selectBankEditView(SearchVO vo) throws Exception {
		List<?> resultList  = calculMapper.selectBankEditView(vo);
		return resultList;
	}


	@Override
	public void saveBankCheckData(List<SaveBankInfoVO> voList, UserSessionVO userVO) throws Exception {
		String tableType = "";
		String id = userVO.getId();
		String taxNo = userVO.getCorpNo();
		
		for(SaveBankInfoVO vo : voList) {
			tableType = vo.getTableType();
				
			System.out.println("tableType"+tableType);
			
			if(tableType.equals("edit")) {
				vo.setId(id);
				vo.setTaxNo(taxNo);
				calculMapper.updatetBankInOut(vo);
			
			}else if(tableType.equals("enrol")) {
				vo.setId(id);
				vo.setTaxNo(taxNo);
				calculMapper.insertBankInOut(vo);
			}
			
		}
	}

	@Override
	public void savePaymentYn(SearchVO vo) throws Exception {
		calculMapper.savePaymentYn(vo);
	}

	@Override
	public void savePaymentYn2(SearchVO vo) throws Exception {
		calculMapper.savePaymentYn2(vo);
	}

	@Override
	public void saveUploadFile(SaveCalculInfoVO vo) throws Exception {
		calculMapper.saveUploadFile(vo);
		
	}

	//편집 저장
	@Override
	public void saveCalculSave(List<SaveCalculInfoVO> voList, UserSessionVO userVO) throws Exception {
		for(SaveCalculInfoVO vo : voList) {
			vo.setRegId(userVO.getId());
			vo.setCmpnyNm(userVO.getCmpnyCd());
			vo.setTaxNo(userVO.getCorpNo());
			vo.setPartnCmpnyNm(vo.getPartnCmpny());
			System.out.println("vo"+vo);
			//calculMapper.saveCalculSave(vo);
			calculMapper.saveUploadFile(vo);
		}
		
	}

	@Override
	public void saveCloseDown(List<SaveCalculInfoVO> voList, UserSessionVO userVO) throws Exception {
		System.out.println("voList"+voList);
		for(SaveCalculInfoVO vo : voList) {
			vo.setRegId(userVO.getId());
			vo.setCmpnyNm(userVO.getCmpnyCd());
			vo.setTaxNo(userVO.getCorpNo());
			calculMapper.saveCloseDown(vo);
		}
		
	}

	@Override
	public void saveCloseCancel(List<SaveCalculInfoVO> voList, UserSessionVO userVO) throws Exception {
		System.out.println("voList"+voList);
		for(SaveCalculInfoVO vo : voList) {
			vo.setRegId(userVO.getId());
			vo.setCmpnyNm(userVO.getCmpnyCd());
			vo.setTaxNo(userVO.getCorpNo());
			calculMapper.saveCloseCancel(vo);
		}
		System.out.println("444");
	}

	
	
	
	

	
	
}
