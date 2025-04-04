package egovframework.pf.rpt.service.web;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpStatus;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Objects;
import com.itextpdf.text.log.SysoCounter;
import com.itextpdf.text.pdf.hyphenation.TernaryTree.Iterator;

import egovframework.pf.cmmn.service.CmmnService;
import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.cmmn.service.UserSessionVO;
import egovframework.pf.item.service.SaveMemoVO;
import egovframework.pf.rpt.service.CalculService;
import egovframework.pf.rpt.service.SaveBankInfoVO;
import egovframework.pf.rpt.service.SaveCalCodeVO;
import egovframework.pf.rpt.service.SaveCalculInfoVO;
import egovframework.pf.rpt.service.SaveCalculateListVO;
import egovframework.pf.rpt.service.SaveCalculateVO;
import egovframework.pf.util.ExcelUtil;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.bind.annotation.*;




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
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
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
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
		
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
	
	//엑셀 다운로드 
	@RequestMapping(value="/rpt/downloadcalculExcel.do")
	public ModelAndView dowloadExcel(@RequestParam("partnCmpnyNm")String partnCmpnyNm,@ModelAttribute("searchVO")SearchVO vo, HttpServletRequest request,HttpServletResponse response)throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		// 띄어쓰기 경우, 인식이 안되어 - 로 삽입 후 -> "" 공백 처리  
		String decodedPartnCmpnyNm = partnCmpnyNm.replace("-", " ");
		 System.out.println("Decoded value: " + decodedPartnCmpnyNm);
		vo.setLang(userVO.getLang());      
		vo.setList(userVO.getCorpNos());
		vo.setRecordCountPerPage(99999999);
		vo.setStartPage(0);
		vo.setSrch1(decodedPartnCmpnyNm);
		
		System.out.println("partnCmpnyNm"+vo.getSrch1());
		System.out.println("vo.type"+vo.getExType());
		ModelAndView mv = new ModelAndView("jsonView");
		ModelAndView dataMv = new ModelAndView();
		String resultCode="200";
		XSSFSheet sheet;
		 System.out.println("선택된 RPT_NO: " + vo.getList2());
		 List<String> rptList = vo.getList2();

		// null 제외 및 "-" 제거
		List<String> modifiedRptList = new ArrayList<>();
		for (String rptNo : rptList) {
		    if (rptNo != null) { // null 제외
		        modifiedRptList.add(rptNo.replace("-", "")); // "-" 제거
		    }
		}

		// 수정된 리스트를 다시 vo의 List2에 설정
		vo.setList2(modifiedRptList);

		// 결과 출력 (디버깅용)
		System.out.println("Modified List: " + vo.getList2());
				
		
		try { 
			//전체
			if(vo.getExType().equals("01")) {
				vo.setSrch10("edit");
				dataMv = this.selectCalculInfo2(vo, request, new ModelMap());
				List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
				System.out.println("4");
				System.out.println("exCol"+vo.getExCol());
				System.out.println("extit"+vo.getExTit());
				System.out.println("resultList111"+resultList);
				
				XSSFWorkbook workBook = new XSSFWorkbook();
				 sheet = ExcelUtil.createSheetWithTitleRow(workBook, "비용정산", vo.getExCol().split("\\|\\|").length);
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
				//vo.setSrch1(vo.getSearchType());
				dataMv = this.selectCalculDetailInfo2(vo, request, new ModelMap());
				List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
				
				System.out.println("resultList111"+resultList);
				XSSFWorkbook workBook = new XSSFWorkbook();
				 sheet = ExcelUtil.createSheetWithTitleRow(workBook, "포워더비용", vo.getExCol().split("\\|\\|").length);
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
				ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat("포워더비용"), response);
				/*ExcelUtil.generateExcelFile(workBook, userVO.getCmpnyCd().concat("_수입기한관리"), response);*/
			}else if(vo.getExType().equals("03")) {
				dataMv = this.bankinoutlView(vo, request, new ModelMap());
				List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
				
				System.out.println("resultList111"+resultList);
				XSSFWorkbook workBook = new XSSFWorkbook();
				 sheet = ExcelUtil.createSheetWithTitleRow(workBook, "이체정보", vo.getExCol().split("\\|\\|").length);
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
	
	@ResponseBody
	@RequestMapping(value="/rpt/saveCloseDown.do" ,method = RequestMethod.POST)
	public String saveCloseDown(@RequestBody List<SaveCalculInfoVO> voList, HttpServletRequest request,HttpServletResponse response)throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		calculService.saveCloseDown(voList, userVO);
	return "success";
	}	
	
	@ResponseBody
	@RequestMapping(value="/rpt/saveCloseCancel.do" ,method = RequestMethod.POST)
	public String saveCloseCancel(@RequestBody List<SaveCalculInfoVO> voList, HttpServletRequest request,HttpServletResponse response)throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		calculService.saveCloseCancel(voList, userVO);
	return "success";
	}	
	
	//편집 저장 
	@ResponseBody
	@RequestMapping(value="/rpt/saveCalculSave.do",method = RequestMethod.POST)
	public String saveCalculSave(@RequestBody List<SaveCalculInfoVO> voList, HttpServletRequest request,HttpServletResponse response)throws Exception{
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		calculService.saveCalculSave(voList, userVO);
		return "success";
	}
	//엑셀 저장 
	@ResponseBody
	@RequestMapping(value="/rpt/saveUploadFile.do", method = RequestMethod.POST)
	public Map<String, String> saveUploadFile(@RequestParam("file") MultipartFile file,HttpServletRequest request) {
		Map<String, String> response = new HashMap<>();    
		try {
	        	
	        	HttpSession httpSession = request.getSession(true);
	    		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	        	
	        	// 업로드된 파일을 InputStream으로 읽기
	            InputStream inputStream = file.getInputStream();

	            // 엑셀 파일을 워크북 객체로 읽기
	            Workbook workbook = new XSSFWorkbook(inputStream);
	            Sheet sheet = workbook.getSheetAt(0); // 첫 번째 시트 가져오기

	            // 6행부터 시작 (엑셀 인덱스는 0부터 시작하므로 6행은 index 5)
	            int startRowIndex = 5; // 6행은 index 5에 해당

	            // A열부터 N열까지 데이터를 읽기
	            int startColumnIndex = 1; // A열은 0번 인덱스
	            int columIndex = 0; // A열은 0번 인덱스
	            int endColumnIndex = 13; // N열은 13번 인덱스 (0부터 시작)

	            // 실제 데이터가 있는 행 수를 얻고, 그 범위 내에서 데이터를 읽기
	            int rowCount = sheet.getPhysicalNumberOfRows(); // 실제 행의 개수를 가져옴

	            // 6행부터 시작하여 데이터 읽기
	            for (int i = startRowIndex; ; i++) {
	                Row row = sheet.getRow(i);
	                if (row == null) {
	                    break; // 행이 비어 있으면 종료
	                }

	                // 첫 번째 열이 비어있으면 종료
	                Cell firstCell = row.getCell(columIndex);
	                if (firstCell == null || 
	                	    firstCell.getCellType() == CellType.BLANK || 
	                	    (firstCell.getCellType() == CellType.STRING && firstCell.getStringCellValue().trim().isEmpty())) {
	                	    break; // 반복문 종료
                	}
	                
	                SaveCalculInfoVO vo = new SaveCalculInfoVO();
	                vo.setTaxNo(userVO.getCorpNo());
	                vo.setCmpnyNm(userVO.getCmpnyCd());
	                vo.setRegId(userVO.getId());
	                vo.setPartnCmpnyNm(getCellValue(row.getCell(1)));
	                vo.setBlNo(getCellValue(row.getCell(2)));
	                vo.setRptNo(getCellValue(row.getCell(3)));
	                vo.setShippingFee(getCellValue(row.getCell(7)));
	                vo.setFareFee(getCellValue(row.getCell(8)));
	                vo.setFareFeeVat(getCellValue(row.getCell(9)));
	                vo.setWareFee(getCellValue(row.getCell(10)));
	                vo.setWareFeeVat(getCellValue(row.getCell(11)));
	                vo.setEtcFee(getCellValue(row.getCell(12)));
	                vo.setEtcFeeVat(getCellValue(row.getCell(13)));
	                
	                calculService.saveUploadFile(vo);
	                /*if (vo.getPartnCmpnyNm() != null && !vo.getPartnCmpnyNm().isEmpty() ||
	                	    vo.getBlNo() != null && !vo.getBlNo().isEmpty() ||
	                	    vo.getRptNo() != null && !vo.getRptNo().isEmpty()) {
	                	    // 데이터가 유효하면 저장
	                	    System.out.println("INSERT: " + vo);
	                	    calculService.saveUploadFile(vo);
	                	} else {
	                	    System.out.println("EMPTY ROW SKIPPED: " + vo);
	                	}
	                
	                
	                // 각 열을 A열부터 N열까지 읽기
	               for (int col = startColumnIndex; col <= endColumnIndex; col++) {
	                    Cell cell = row.getCell(col);
	                    if (cell != null) {
	                        String cellValue = getCellValue(cell); // 셀 값을 문자열로 변환
	                        //System.out.println("행 " + (row.getRowNum() + 1) + " 열 " + (col + 1) + " 값: " + cellValue);
	                        // 데이터 처리 로직 (예: 데이터베이스에 삽입 등)
	                        System.out.println("cellValue"+cellValue);
	                    }
	                }*/
	            }

	            workbook.close(); // 워크북 닫기

	            // 파일 업로드 및 데이터 삽입 성공 메시지 반환
	            response.put("status", "success");

	        } catch (Exception e) {
	            e.printStackTrace();
	            response.put("status", "fail");
	        }
	    System.out.println("response"+response);   
		return response;
	    }

// 셀 값 읽기 (숫자, 문자열 등 다양한 타입 처리)
	private String getCellValue(Cell cell) {
	    if (cell == null) {
	        return ""; // 셀이 null인 경우 빈 문자열 반환
	    }
	
	    switch (cell.getCellType()) {
	        case STRING:
	            return cell.getStringCellValue();
	        case NUMERIC:
	            double numericValue = cell.getNumericCellValue();
	            // 소수점 이하가 없으면 정수로 변환, 있으면 그대로 문자열로 변환
	            if (numericValue % 1 == 0) {
	                return String.valueOf((int) numericValue); // 정수로 변환
	            } else {
	                return String.valueOf(numericValue); // 소수 포함
	            }
	        case BOOLEAN:
	            return String.valueOf(cell.getBooleanCellValue());
	        default:
	            return "";
	    }
	}
	

	
	// ResponseMessage 클래스
	public class ResponseMessage {
	    private String message;

	    // 기본 생성자
	    public ResponseMessage(String message) {
	        this.message = message;
	    }

	    // 메시지를 가져오는 getter 메서드
	    public String getMessage() {
	        return message;
	    }

	    // 메시지를 설정하는 setter 메서드
	    public void setMessage(String message) {
	        this.message = message;
	    }
	}
}