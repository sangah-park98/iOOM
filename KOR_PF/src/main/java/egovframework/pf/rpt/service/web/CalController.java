package egovframework.pf.rpt.service.web;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.pf.cmmn.service.CmmnService;
import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.cmmn.service.UserSessionVO;
import egovframework.pf.item.service.SaveMemoVO;
import egovframework.pf.rpt.service.CalculService;
import egovframework.pf.rpt.service.SaveBankInfoVO;
import egovframework.pf.rpt.service.SaveCalCodeVO;
import egovframework.pf.rpt.service.SaveCalculateListVO;
import egovframework.pf.rpt.service.SaveCalculateVO;
import egovframework.pf.util.ExcelUtil;

/**
 * @Class Name : KPIController.java
 * @Description : KPI 컨트롤러
 * @Modification Information
 * @
 * @  수정일          			 수정자              			 수정내용
 * @ ---------        ----------     -------------------------------
 * @ 2024.04.02			이재성              				 최초생성
 *
 * @author 이재성
 * @since 2024.04.02
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class CalController {

	@Resource(name = "CmmnService")
	private CmmnService CmmnService;
	
	@Resource(name = "calculService")
	private CalculService calculService;
	
	// kpi 화면 호출
	@RequestMapping(value = "/rpt/calculate2.do")
	public String calculate(HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		String lang = userVO.getLang();
		vo.setLang(lang);
		vo.setCmpnyCd(userVO.getCmpnyCd());
		model.addAttribute("lang", lang);
		model.addAttribute("userCmpnyCd", userVO.getCmpnyCd());
			
		return "rpt/calculate2";
	}
	
	
	@RequestMapping(value = "/rpt/saveCalExcel.do", method = RequestMethod.POST)
	@ResponseBody
	public String saveBomInfo(@RequestBody SaveCalculateListVO calculateList, HttpServletRequest request) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		
		List<SaveCalculateVO> voList = calculateList.getDbArray();
		List<SaveCalCodeVO> calList = calculateList.getCalCode();
		
		System.out.println(calList);
		for (SaveCalCodeVO vo : calList) {
			System.out.println("111 : " + vo.getPartnType());
			System.out.println("222 : " + vo.getPartnCmpnyNm());
			System.out.println("333 : " + vo.getCalCode());
		}
		String SaveStatus = calculService.saveCalCodeList(calList, userVO);
		String SaveStatus2 = calculService.saveCalExcel(voList, userVO);
		/*if(!SaveStatus.equals("success") && !SaveStatus2.equals("success")) {
			return "fail";
		}*/
		return "success";
	}
	
	
	@RequestMapping(value = "/rpt/saveCalExcel2.do", method = RequestMethod.POST)
	@ResponseBody
	public String saveCalExcel2(@RequestBody SaveCalculateListVO dbArrayList, HttpServletRequest request) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		
		List<SaveCalculateVO> voList = new ArrayList<>();
		String status = "";
		// dbArray에서 데이터 추출 및 SaveCalculateVO 객체에 저장
		
		for (List<String> row : dbArrayList.getDbArrayList()) {
		    
			SaveCalculateVO vo = new SaveCalculateVO();
		    
		    vo.setDescription(row.get(1));   // 두 번째 값 (Description)
		    vo.setBlNo(row.get(2));      // 세 번째 값 (B/L 번호)
		    vo.setSupAmt(row.get(3));  // 네 번째 값 (공급가액)
		    vo.setVat(row.get(4));           // 다섯 번째 값 (VAT)
		    vo.setTotalAmt(row.get(5));   // 여섯 번째 값 (총합계)
		    vo.setRemarks(row.get(6));        // 일곱 번째 값 (비고)
		    vo.setPartnCmpnyNm(row.get(7)); // 여덟 번째 값 (벤더명)

		    // vo 객체를 리스트에 추가
		    voList.add(vo);
		    
		}
		
		System.out.println("voList"+voList);
		//String SaveStatus = calculService.saveCalCodeList(calList, userVO);
		String SaveStatus = calculService.saveCalExcel2(voList, userVO);
		if(SaveStatus != null) {
		 status =  "success";
		}else {
		 status = "fail";
		}
		return status;
	}
	
	
/*	@RequestMapping(value = "/rpt/saveCalExcel.do", method = RequestMethod.POST)
	@ResponseBody
	public String saveBomInfo(@RequestBody List<SaveCalculateVO> voList, HttpServletRequest request) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		String SaveStatus = calculService.saveCalExcel(voList, userVO);
		if(!SaveStatus.equals("success")) {
			return "fail";
		}
		return "success";
	}
*/	
	@RequestMapping(value = "/rpt/selectCalculInfo.do")
	public ModelAndView selectCalculInfo(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());

		List<?> resultList = calculService.selectCalculInfo(vo);
		model.addAttribute("resultList", resultList);

		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/selectCalculInfo2.do")
	public ModelAndView selectCalculInfo2(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());

		List<?> resultList = calculService.selectCalculInfo2(vo);
		model.addAttribute("resultList", resultList);

		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/selectCalculDetailInfo.do")
	public ModelAndView selectCalculDetailInfo(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		System.out.println(vo.getSrch3());
		List<?> resultList = calculService.selectCalculDetailInfo(vo);
		List<?> resultList2 = null;
		if(vo.getSrch3().equals("01")) {
			resultList2 = calculService.selectCalculDetailViewInfo(vo);
		} else {
			resultList2 = calculService.selectCalculDetailViewInfoExp(vo);
		}
		
		model.addAttribute("resultList", resultList);
		model.addAttribute("resultList2", resultList2);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/selectCalculDetailInfo2.do")
	public ModelAndView selectCalculDetailInfo2(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		
		List<?> resultList = calculService.selectCalculDetailViewInfo2(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/bankinoutView.do")
	public ModelAndView bankinoutlView(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		List<?> resultList = calculService.selectBankinoutlView(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	// 이체정보 편집 view
	@RequestMapping(value = "/rpt/bankEditView.do")
	public ModelAndView bankEditView(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		List<?> resultList = calculService.selectBankEditView(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	// 이체정보저장
	@RequestMapping(value="/rpt/saveBankCheckData.do")
	@ResponseBody
	public String saveBankCheckData(@RequestBody List<SaveBankInfoVO> voList,HttpServletRequest request)throws Exception{
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		//System.out.println("voList"+voList);
		SaveBankInfoVO saveVo = voList.get(0);
		
		System.out.println("saveVo.getTableType()"+saveVo.getTableType());
		
		calculService.saveBankCheckData(voList, userVO);
		
		return "success";
		
	}
	
	//대납정보 저장
	@RequestMapping(value = "/rpt/savePaymentYn.do", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView savePaymentYn(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCorpNo(userVO.getCorpNo());
		vo.setId(userVO.getId());
		calculService.savePaymentYn(vo);
		
		model.addAttribute("SaveStatus", "success");
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	//대납정보 저장
		@RequestMapping(value = "/rpt/savePaymentYn2.do", method = RequestMethod.POST)
		@ResponseBody
		public ModelAndView savePaymentYn2(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
			HttpSession httpSession = request.getSession(true);
			UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
			vo.setCorpNo(userVO.getCorpNo());
			vo.setId(userVO.getId());
			calculService.savePaymentYn2(vo);
			
			model.addAttribute("SaveStatus", "success");
			ModelAndView mav = new ModelAndView("jsonView", model);
			return mav ;
		}
	
	@RequestMapping(value = "/rpt/selectCalculPartnList.do")
	public ModelAndView selectCalculPartnList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		
		List<?> resultList = calculService.selectCalculPartnList(vo);
		model.addAttribute("resultList", resultList);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/partnCmpnySave.do" , method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView partnCmpnySave(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		String SaveStatus = calculService.partnCmpnySave(vo, userVO);
		model.addAttribute("SaveStatus", SaveStatus);

		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/calCodeSave.do" , method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView partnCmpncalCodeSaveySave(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		String SaveStatus = calculService.calCodeSave(vo, userVO);
		model.addAttribute("SaveStatus", SaveStatus);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/rpt/selectCalculCodeList.do")
	public ModelAndView selectCalculCodeList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());

		List<?> resultList = calculService.selectCalculCodeList(vo);
		List<?> resultList2 = calculService.selectCmmnCodeList(vo);
		model.addAttribute("resultList", resultList);
		model.addAttribute("resultList2", resultList2);

		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	
	@RequestMapping(value = "/rpt/selectCalCodeList.do")
	public ModelAndView selectCalCodeList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setCorpNo(userVO.getCorpNo());
		
		List<?> resultList = calculService.selectCalCodeList(vo);
		model.addAttribute("resultList", resultList);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	// 전체 엑셀 다운로드 
	@RequestMapping(value="/rpt/downloadcalculExcel.do")
	public ModelAndView dowloadExcel(@ModelAttribute("searchVO")SearchVO vo, HttpServletRequest request,HttpServletResponse response)throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		
		vo.setLang(userVO.getLang());      
		vo.setList(userVO.getCorpNos());
		vo.setRecordCountPerPage(99999999);
		vo.setStartPage(0);
		
		ModelAndView mav = new ModelAndView("jsonView");
		ModelAndView mv = new ModelAndView("jsonView");
		ModelAndView dataMv = new ModelAndView();
		String resultCode="200";
		
		
		try { 
			//전체
			if(vo.getExType().equals("01")) {
				dataMv = this.selectCalculInfo2(vo, request, new ModelMap());
				List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
				
				System.out.println("resultList111"+resultList);
				XSSFWorkbook workBook = new XSSFWorkbook();
				XSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, "비용정산", vo.getExCol().split("\\|\\|").length);
				ArrayList<String> conts = new ArrayList<String>();
				conts.add("1");
				sheet = ExcelUtil.createSummaryCont(sheet, conts);
				sheet = ExcelUtil.createMainTable(sheet, resultList, vo);
				int cnt = 0;
				String ExcelTitle = "";
				if(userVO.getCorpNos().size() > 1) {
					cnt = userVO.getCorpNos().size() - 1;
					ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
				} else {
					ExcelTitle = userVO.getCmpnyCd();
				}
				ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat("비용정산"), response);
				/*ExcelUtil.generateExcelFile(workBook, userVO.getCmpnyCd().concat("_수입기한관리"), response);*/
			//비용요약
			}else if(vo.getExType().equals("02")) {
				vo.setSrch1(vo.getSearchType());
				dataMv = this.selectCalculDetailInfo2(vo, request, new ModelMap());
				List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
				
				System.out.println("resultList111"+resultList);
				XSSFWorkbook workBook = new XSSFWorkbook();
				XSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, "비용요약", vo.getExCol().split("\\|\\|").length);
				ArrayList<String> conts = new ArrayList<String>();
				conts.add("1");
				sheet = ExcelUtil.createSummaryCont(sheet, conts);
				sheet = ExcelUtil.createMainTable(sheet, resultList, vo);
				int cnt = 0;
				String ExcelTitle = "";
				if(userVO.getCorpNos().size() > 1) {
					cnt = userVO.getCorpNos().size() - 1;
					ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
				} else {
					ExcelTitle = userVO.getCmpnyCd();
				}
				ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat("비용요약"), response);
				/*ExcelUtil.generateExcelFile(workBook, userVO.getCmpnyCd().concat("_수입기한관리"), response);*/
			}else if(vo.getExType().equals("03")) {
				dataMv = this.bankinoutlView(vo, request, new ModelMap());
				List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
				
				System.out.println("resultList111"+resultList);
				XSSFWorkbook workBook = new XSSFWorkbook();
				XSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, "이체정보", vo.getExCol().split("\\|\\|").length);
				ArrayList<String> conts = new ArrayList<String>();
				conts.add("1");
				sheet = ExcelUtil.createSummaryCont(sheet, conts);
				sheet = ExcelUtil.createMainTable(sheet, resultList, vo);
				int cnt = 0;
				String ExcelTitle = "";
				if(userVO.getCorpNos().size() > 1) {
					cnt = userVO.getCorpNos().size() - 1;
					ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
				} else {
					ExcelTitle = userVO.getCmpnyCd();
				}
				ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat("이체정보"), response);
			}
				
			// 수출
		}catch(Exception e){
			e.printStackTrace();
		}
		
		mv.addObject("resultCode", resultCode);
		return mv;
		}
	
	 
}