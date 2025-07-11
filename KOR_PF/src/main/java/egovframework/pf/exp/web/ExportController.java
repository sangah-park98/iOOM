package egovframework.pf.exp.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.sql.Connection;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import java.util.concurrent.SynchronousQueue;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import org.antlr.grammar.v3.ANTLRParser.exceptionGroup_return;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.itextpdf.text.log.SysoCounter;

import egovframework.pf.util.ExcelUtil;
import egovframework.pf.util.FileUtil;
import egovframework.pf.util.importUpdate_ExcelUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.pf.cmmn.service.CmmnService;
import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.cmmn.service.UserSessionVO;
import egovframework.pf.docu.service.SaveDocuFileVO;
import egovframework.pf.exp.service.SaveCoEnrollVO;
import egovframework.pf.exp.service.SaveExpFileVO;
import egovframework.pf.exp.service.SaveExpInvoiceVO;
import egovframework.pf.exp.service.SaveExpMainVO;
import egovframework.pf.exp.service.SaveExportCoVO;
import egovframework.pf.exp.service.pfExportService;
import egovframework.pf.imp.service.ImportService;
import egovframework.pf.item.service.SaveSpecVO;
import egovframework.pf.member.utill.EmailUtill;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRPdfExporterParameter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;

//대용량 엑셀
import org.apache.poi.ss.SpreadsheetVersion;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;


@Controller
public class ExportController {

	@Resource(name = "pfExportService")
	private pfExportService pfexportService;
	
	@Resource(name = "importService")
	private ImportService importService;
	private Connection conn;
	
	@Resource(name = "fileProperties")
	private Properties fileProperties;
	
	@Resource(name = "CmmnService")
	private CmmnService CmmnService;
	
	@RequestMapping(value = "/export/exportIn.do")
	public String exportIn(HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		vo.setLang(userVO.getLang());
		vo.setSrch2("expIn");
		List<?> msgList = CmmnService.selectMsgList(vo);
		for(int i=0; i<msgList.size(); i++) {
			EgovMap map = (EgovMap)msgList.get(i);
			model.addAttribute((String)map.get("msgId"), map.get("msgNm"));
		}
		model.addAttribute("corpNos", userVO.getCorpNos());
		return "export/exportIn";
	}
	
	@RequestMapping(value = "/export/exportMakeIn.do")
	public String exportMakeIn(HttpServletRequest request, Model model) throws Exception {
		return "export/exportMakeIn";
	}
	
	@RequestMapping(value = "/export/exportMakeIn2.do")
	public String exportMakeIn2(HttpServletRequest request, Model model) throws Exception {
		return "export/exportMakeIn2";
	}
	
	@RequestMapping(value = "/export/exportMakePk.do")
	public String exportMakePk(HttpServletRequest request, Model model) throws Exception {
		return "export/exportMakePk";
	}
	
	@RequestMapping(value = "/export/exportView.do")
	public String exportView(HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		vo.setLang(userVO.getLang());
		vo.setSrch2("expView");
		List<?> msgList = CmmnService.selectMsgList(vo);
		for(int i=0; i<msgList.size(); i++) {
			EgovMap map = (EgovMap)msgList.get(i);
			model.addAttribute((String)map.get("msgId"), map.get("msgNm"));
		}
		model.addAttribute("grpCd", userVO.getGrpCd());
		return "export/exportView";
	}
	
	@RequestMapping(value = "/export/exportUpdate.do")
	public String exportUpdate(HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		vo.setLang(userVO.getLang());
		vo.setSrch2("expUpdate");
		List<?> msgList = CmmnService.selectMsgList(vo);
		for(int i=0; i<msgList.size(); i++) {
			EgovMap map = (EgovMap)msgList.get(i);
			model.addAttribute((String)map.get("msgId"), map.get("msgNm"));
		}
		return "export/exportUpdate";
	}
	
	@RequestMapping(value = "/export/exportCoView.do")
	public String exportCoView(HttpServletRequest request, Model model) throws Exception {
		return "export/exportCoView";
	}
	
	@RequestMapping(value = "/export/saveInvoice.do")
	@ResponseBody
	public String saveInvoice(@RequestBody List<SaveExpMainVO>voList, HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		String lang = userVO.getLang();
		
		SearchVO schVo = new SearchVO();
		schVo.setSrch1(voList.get(0).getInvoiceNo());
		String result = pfexportService.checkInvoiceNumber(schVo);
		
		vo.setLang(lang);
		vo.setCmpnyCd(userVO.getCmpnyCd());
		model.addAttribute("lang", lang);
		model.addAttribute("userCmpnyCd", userVO.getCmpnyCd());
		if(result == null) {
			pfexportService.saveInvoiceMainList(voList,userVO);
			String index = voList.get(0).getInvoiceNo();
			System.out.println("index: "+index);
			String mainSeq = pfexportService.selectInvoiceMainIdex(index);
			
			System.out.println("mainSeq: "+mainSeq);
			pfexportService.saveInvoiceSubList(voList,userVO,mainSeq);
			return "success";	
		} else { 
			return "fail";
		}
	}
	// --------------------Invoice Ver2--------------------
	@RequestMapping(value = "/export/exportSaveInvoice2.do")
	@ResponseBody
	public String exportSaveInvoice2(@RequestBody List<SaveExpInvoiceVO>voList, HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO schVo = new SearchVO();
		schVo.setSrch1(voList.get(0).getMainCd());
		String result = pfexportService.checkInvoiceNumber2(schVo);
		if(result == null) {
			pfexportService.saveInvoiceInfoList2(voList,userVO);
			String index = voList.get(0).getMainCd();
			System.out.println("index: "+index);
			
			String mainSeq = pfexportService.selectInvoiceMainIdex2(index);
			System.out.println("mainSeq: "+mainSeq);
			
			pfexportService.saveInvoiceSubList2(voList,userVO,mainSeq);
			return "success";
		} else { 
			return "fail";
		}
	}
	
private JasperPrint makeJasperPage(JasperPrint jprint, String realPath, String templetNm, Map jasperPrms, boolean isFirst, boolean isOnePage) {
			
		
		
		try {
			String reportPath = realPath + templetNm;   // "/templet/Form_B.jrxml"

		    JasperDesign jasperd = JRXmlLoader.load(reportPath);  // 레포트 파일을 Load
		    JasperReport jasperReport = JasperCompileManager.compileReport(jasperd);

			// sub report
			jasperReport = JasperCompileManager.compileReport(reportPath);

			
			
			int lastInx = 0;
			if(jprint != null) {
				lastInx = jprint.getPages().size();
				System.out.println("A");
				System.out.println("jasper lastInx = " + lastInx);
				System.out.println("jprint.getPages().size()  :  " + jprint.getPages().size());
				System.out.println("A-END");
			}
			else {
				jasperPrms.put("i_prm10", 0);
				JasperPrint newJprint = JasperFillManager.fillReport(jasperReport, jasperPrms, conn);
				System.out.println("jasperPrms = " + jasperPrms);
				//jprint = new JasperPrint();
				jprint = newJprint;
			}

					
					JasperPrint newJprint = JasperFillManager.fillReport(jasperReport, jasperPrms, conn);
					System.out.println("jasperPrms = " + jasperPrms);
					if(!isFirst) {
						// 한페이지 짜리는 1개 덜 붙이기
						if(!isOnePage) {
							jprint.addPage(newJprint.getPages().get(0)); // 2 page
							System.out.println("B");
							System.out.println("jprint.getPages().size()  :  " + jprint.getPages().size());
							System.out.println("B-end");
						}
						isOnePage = false;
					}
					isFirst = false;
					System.out.println("C");
					System.out.println("jprint.getPages().size()  :  " + jprint.getPages().size());
					System.out.println("C=end");
		} catch (JRException e) {
			System.err.println(e.getMessage());
		}
		System.out.println("jprint.getPages().size()  :  " + jprint.getPages().size());
		return jprint;
	}
	
	public static class CIRequest {
	    private String ciNo;
	    private String stsCd; // 추가적인 파라미터
	    
	    public String getCiNo() {
	        return ciNo;
	    }
	    public void setCiNo(String ciNo) {
	        this.ciNo = ciNo;
	    }
	    public String getStsCd() {
	        return stsCd;
	    }
	    public void setStsCd(String stsCd) {
	        this.stsCd = stsCd;
	    }
	}
	
	@RequestMapping(value = "/export/makeCIPdf2.do", method = RequestMethod.POST)
	public ResponseEntity<String> makeCIPdf2(@RequestBody CIRequest param, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		Map parameters = new HashMap();
		String cmpny = userVO.getCmpnyCd();
		String reportName = "";
		List allPrint = new ArrayList();
		String addReportName = "";
		JasperReport jasperReport;
		JasperPrint jasperPrint = null;

		JasperPrint allJasperPrint;
		
		String ciNo = param.getCiNo();
		String stsCd = param.getStsCd();
		
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMdd");
		String tempDate = formatter.format(new java.util.Date());

	    String ul = request.getServletContext().getRealPath("");
	    System.out.println("======================================================================== start");
	    
	 // DB 연결
 		BeanFactory factory = new XmlBeanFactory(new ClassPathResource("egovframework/spring/context-datasource.xml"));
 		DataSource ds = (DataSource) factory.getBean("dataSource");
 		conn = ds.getConnection();
	    
	    OutputStream os = null;
	    JRPdfExporter exp = new JRPdfExporter();
	    
	    String pdfUrl = fileProperties.getProperty("pdf.url");
		String path = pdfUrl + "CI_"+ciNo+".pdf";
		
		String templetNm = "";
		
		int totItemsCnt = pfexportService.selectExportItemCntList2(ciNo);
		int pageItemCnt = 4;
		int addPageItemCnt = 16;
	    
	    parameters.put("i_prm1", ciNo);
	    parameters.put("i_prm3", ul);
	    parameters.put("i_prm8", totItemsCnt);
	    
	    
	    if(totItemsCnt <= pageItemCnt) {
			templetNm = "/templet/Invoice.jrxml";
			// C/O 1PAGE당 출력 갯수
			parameters.put("i_prm2", 0);
			parameters.put("i_prm4", pageItemCnt);
			parameters.put("i_prm7",1);
			parameters.put("i_prm6",1);
//			jasperPrms.put("i_prm8", docissuVO.getJdgmntSeq());
			System.out.println(parameters);
			jasperPrint = makeJasperPage(jasperPrint, ul, templetNm, parameters, false, true);
			if(jasperPrint != null) {
				System.out.println("Build Success!");
			}
		} else if(totItemsCnt > pageItemCnt) {
			//만약 총 아이템 갯수가 한 페이지 출력 갯수보다 크다면 다른 양식에 맞는 출력 갯수를 출력
			parameters.put("i_prm4", pageItemCnt);
			parameters.put("i_prm5", addPageItemCnt);
			int printPageCnt = 0;
			int addPrintPageCnt = 0;
			if(addPageItemCnt > 0) {
				addPrintPageCnt = (totItemsCnt - pageItemCnt) / addPageItemCnt;
				if((totItemsCnt - pageItemCnt) % addPageItemCnt != 0) addPrintPageCnt = addPrintPageCnt + 1;
				printPageCnt = addPrintPageCnt +1 ;
			}

			int lastCnt = 0;
			for (int i = 0; i < printPageCnt; i++) {
				// C/O 1PAGE당 출력 갯수
				if(i == 0) {
					templetNm = "/templet/Invoice.jrxml";
					System.out.println("templetNm = " + templetNm);
					parameters.put("i_prm2", lastCnt);
					parameters.put("i_prm7",i+1);
					parameters.put("i_prm6", printPageCnt);
					System.out.println(parameters);
					jasperPrint = makeJasperPage(jasperPrint, ul, templetNm, parameters, true, false);
				}
				else if(i == 1) {
					templetNm = "/templet/InvoiceList.jrxml";
					lastCnt = lastCnt + pageItemCnt;
					parameters.put("i_prm2", lastCnt);
					parameters.put("i_prm7",i+1);
					parameters.put("i_prm6", printPageCnt);
					System.out.println(parameters);
					jasperPrint = makeJasperPage(jasperPrint, ul, templetNm, parameters, false, false);
				} // C/O 2 페이지부터는 본페이지에서 나온 아이템 갯수부터 아이템
				else {
					templetNm = "/templet/InvoiceList.jrxml";
					if(addPageItemCnt == 0) lastCnt = lastCnt + pageItemCnt;
					else lastCnt = lastCnt + addPageItemCnt;
					parameters.put("i_prm2", lastCnt);
					parameters.put("i_prm7",i+1);
					parameters.put("i_prm6", printPageCnt);
					System.out.println(parameters);
					jasperPrint = makeJasperPage(jasperPrint, ul, templetNm, parameters, false, false);
				} // 2 페이지 이 후 부터 additional page 리스트 행 수 만큼 나와야함
			}// end for
		}
		
		System.out.println("======================================================================== end");
		System.out.println("allPrint : " + allPrint);

		System.out.println("allPrint : 111");
		String realPath = request.getServletContext().getRealPath("");
		String orgFile = realPath + "/pdf/" + "CI_"+ciNo+".pdf";
        
        JasperExportManager.exportReportToPdfFile(jasperPrint, orgFile);

        String pafPath = fileProperties.getProperty("pdf.path");
        String savePath;

        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            savePath = "c:\\home\\files\\" + "CI_" + ciNo + ".pdf";
        } else {
            savePath = pafPath + "CI_" + ciNo + ".pdf";
        }

        System.out.println("file copy");
        System.out.println(orgFile);
        System.out.println(savePath);

	    FileUtil.copyFile(orgFile, savePath);
		
		System.out.println("allPrint : 333");
		SaveExpFileVO vo = new SaveExpFileVO();
		
		if(stsCd.equals("10")) {
		vo.setInvoiceNo(ciNo);
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setOrgFileName("CI_"+ciNo+".pdf");
		vo.setUploadDt(tempDate);
		pfexportService.saveMakeInFile(vo);
		}
		
		
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/export/saveTempExpMakeInList2.do")
	@ResponseBody
	public String saveTempExpMakeInList2(@RequestBody List<SaveExpInvoiceVO>voList, HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		SearchVO schVo = new SearchVO();
		SearchVO schVo2 = new SearchVO();
		vo.setCmpnyCd(userVO.getCmpnyCd());
		schVo.setSrch10(voList.get(0).getCiNo());
		
		model.addAttribute("userCmpnyCd", userVO.getCmpnyCd());
		
		String mainSeq = pfexportService.checkTempInvoiceNumber2(schVo);
		System.out.println(mainSeq);
		schVo2.setSrch1(mainSeq);
		
		if(mainSeq == null) {
			pfexportService.saveTempExpMakeInList2(voList,userVO);
			String index = voList.get(0).getCiNo();
			String mainSeq2 = pfexportService.selectTempInvoiceMainIdex2(index);
			
			pfexportService.saveTempExpMakeInSubList2(voList,userVO,mainSeq2);
		} else { // 덧붙이기
			pfexportService.deleteTempExpMakeInList2(schVo2);
			pfexportService.deleteTempExpMakeInSubList2(schVo2);
			
			pfexportService.saveTempExpMakeInList2(voList,userVO);
			pfexportService.saveTempExpMakeInSubList2(voList,userVO,mainSeq);
			return "fail";
		}
		return "success";	
	}
	
	@RequestMapping(value = "/export/selectLoadDataList2.do")
	public ModelAndView selectLoadDataList2(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, 
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	    vo.setSrch1(userVO.getCorpNo());
		List<?> resultList = pfexportService.selectLoadDataList2(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/selectLoadDataView2.do")
	public ModelAndView selectLoadDataView2(@ModelAttribute("searchVO") SaveExpInvoiceVO vo, HttpServletRequest request, 
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setCmpnyCd(userVO.getCmpnyCd());
			vo.setCorpNo(userVO.getCorpNo());
		}
		List<?> resultList = pfexportService.selectLoadDataMainView2(vo);
		model.addAttribute("resultList", resultList);
		List<?> resultList2 = pfexportService.selectLoadDataSubView2(vo);
		model.addAttribute("resultList2", resultList2);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/loadDataDelete2.do", method = RequestMethod.POST)
	@ResponseBody
	public void loadDataDelete2(@RequestBody List<ZipFileDownload> delList, HttpServletRequest request, ModelMap model) throws Exception {
		SearchVO vo = new SearchVO();
		  for (ZipFileDownload list : delList) {
			  vo.setSrch1(list.getMainCd());
			  pfexportService.deleteLoadDataSubView2(vo);
			  pfexportService.deleteLoadDataMainView2(vo);
		  }
	}
	
	@RequestMapping(value = "/export/selectTempInvoiceMainList2.do")
	public ModelAndView selectTempInvoiceMainList2(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setCmpnyCd(userVO.getCmpnyCd());
			vo.setCorpNo(userVO.getCorpNo());
		}
		System.out.println("srch1 Temp: " + vo.getSrch1());
		List<?> resultList = null;
		List<?> resultList2 = null;
	   
	    resultList = pfexportService.selectTempInvoiceMainList2(vo);
		model.addAttribute("resultList", resultList);
		System.out.println("invoice temp main: " + resultList);
		
		resultList2 = pfexportService.selectTempInvoiceSubList2(vo);
		model.addAttribute("resultList2", resultList2);
		System.out.println("invoice temp sub: " + resultList2);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/selectExportMkInConditionList.do")
	public ModelAndView selectExportMkInConditionList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
	    List<?> resultList = pfexportService.selectExportMkInConditionList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	// --------------------Invoice Ver2--------------------
	// 임시저장
	@RequestMapping(value = "/export/saveTempExpMakeInList.do")
	@ResponseBody
	public String saveTempExpMakeInList(@RequestBody List<SaveExpMainVO>voList, HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		SearchVO schVo = new SearchVO();
		SearchVO schVo2 = new SearchVO();
		vo.setCmpnyCd(userVO.getCmpnyCd());
		schVo.setSrch10(voList.get(0).getInvoiceNo());
		
		model.addAttribute("userCmpnyCd", userVO.getCmpnyCd());
		
		String mainSeq = pfexportService.checkTempInvoiceNumber(schVo);
		System.out.println(mainSeq);
		schVo2.setSrch1(mainSeq);
		
		if(mainSeq == null) {
			pfexportService.saveTempExpMakeInList(voList,userVO);
			String index = voList.get(0).getInvoiceNo();
			String mainSeq2 = pfexportService.selectTempInvoiceMainIdex(index);
			
			pfexportService.saveTempExpMakeInSubList(voList,userVO,mainSeq2);
			return "success";	
		} else { // 덧붙이기
			pfexportService.deleteTempExpMakeInList(schVo2);
			pfexportService.deleteTempExpMakeInSubList(schVo2);
			
			pfexportService.saveTempExpMakeInList(voList,userVO);
			pfexportService.saveTempExpMakeInSubList(voList,userVO,mainSeq);
			return "fail";
		}
	}
	
	@RequestMapping(value = "/export/selectTempInvoiceMainList.do")
	public ModelAndView selectTempInvoiceMainList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setLang(userVO.getLang());
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setCmpnyCd(userVO.getCmpnyCd());
			vo.setCorpNo(userVO.getCorpNo());
		}
		System.out.println("srch1 Temp: " + vo.getSrch1());
		List<?> resultList = null;
		List<?> resultList2 = null;
	   
	    resultList = pfexportService.selectTempInvoiceMainList(vo);
		model.addAttribute("resultList", resultList);
		System.out.println("invoice temp main: " + resultList);
		
		resultList2 = pfexportService.selectTempInvoiceSubList(vo);
		model.addAttribute("resultList2", resultList2);
		System.out.println("invoice temp sub: " + resultList2);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/savePackingList.do")
	@ResponseBody
	public String savePackingList(@RequestBody List<SaveExpMainVO>voList, HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		String lang = userVO.getLang();
		System.out.println("-------------packing List-------------");
	
		vo.setLang(lang);
		vo.setCmpnyCd(userVO.getCmpnyCd());
		model.addAttribute("lang", lang);
		model.addAttribute("userCmpnyCd", userVO.getCmpnyCd());
		
		String index = voList.get(0).getInvoiceNo();
		SearchVO schVo = new SearchVO();
		schVo.setSrch1(voList.get(0).getManufact());
		schVo.setSrch2(voList.get(0).getPlLoadPort());
		schVo.setSrch3(voList.get(0).getPlDestination());
		schVo.setSrch4(voList.get(0).getPlDepDate());
		schVo.setSrch5(voList.get(0).getPlFlight());
		schVo.setSrch6(voList.get(0).getTotalQuantity());
		schVo.setSrch7(voList.get(0).getTotalNet());
		schVo.setSrch8(voList.get(0).getTotalGross());
		schVo.setSrch9("KG");
		schVo.setSrch11(voList.get(0).getTotalPlCnt());
		schVo.setSrch12(voList.get(0).getPlComments());
		schVo.setSrch10(index);
		
		pfexportService.updateManufactPackList(schVo);
		System.out.println("index: " + index);
		
		String mainSeq = pfexportService.selectPackingListMainIdex(index);
		System.out.println("mainSeq: " + mainSeq);
		
		String result = pfexportService.checkInvoiceNumber(schVo);
		System.out.println("result: " + result);
		
		pfexportService.insertPackingListSubList(voList, userVO, mainSeq);

		return "success";
	}

	@RequestMapping(value = "/export/saveTempExpMakePlList.do")
	@ResponseBody
	public String saveTempExpMakePlList(@RequestBody List<SaveExpMainVO>voList, HttpServletRequest request, Model model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		SearchVO vo = new SearchVO();
		SearchVO schVo = new SearchVO();
		String lang = userVO.getLang();
		String index = voList.get(0).getInvoiceNo();
	
		vo.setLang(lang);
		vo.setCmpnyCd(userVO.getCmpnyCd());
		model.addAttribute("lang", lang);
		model.addAttribute("userCmpnyCd", userVO.getCmpnyCd());
		
		schVo.setSrch1(voList.get(0).getManufact());
		schVo.setSrch2(voList.get(0).getPlLoadPort());
		schVo.setSrch3(voList.get(0).getPlDestination());
		schVo.setSrch4(voList.get(0).getPlDepDate());
		schVo.setSrch5(voList.get(0).getPlFlight());
		schVo.setSrch6(voList.get(0).getTotalQuantity());
		schVo.setSrch7(voList.get(0).getTotalNet());
		schVo.setSrch8(voList.get(0).getTotalGross());
		schVo.setSrch9("KG");
		schVo.setSrch10(index);
		schVo.setSrch11(voList.get(0).getTotalPlCnt());
		schVo.setSrch12(voList.get(0).getPlComments());
		System.out.println("plLoad: " + voList.get(0).getPlLoadPort());
		System.out.println("final: " + voList.get(0).getPlDestination());
		System.out.println("flight: " + voList.get(0).getPlFlight());
		System.out.println("quantity: " + voList.get(0).getTotalQuantity());
		System.out.println("net: " + voList.get(0).getTotalNet());
		System.out.println("gross: " + voList.get(0).getTotalGross());
		System.out.println("kg: " + voList.get(0).getTotalKg());
		pfexportService.updateTempManufactPlList(schVo);
		
		String mainSeq = pfexportService.selectTempPlMainIdex(index);
		System.out.println("mainSeq: " + mainSeq);
		
		String result = pfexportService.checkTempInvoiceNumber(schVo);
		System.out.println("result: " + result);
		
		pfexportService.saveTempExpMakePlSubList(voList, userVO, mainSeq);

		return "success";
	}
	
	// Invoice 등록
	@RequestMapping(value = "/export/selectExportInList.do")
	public ModelAndView selectExportInList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
		    vo.setList(userVO.getCmpnyCds());
		}

		List<?> resultList = null;
	    resultList = pfexportService.selectExportInList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}

	// Invoice 등록 돋보기
	@RequestMapping(value = "/export/selectInFilesList.do")
	public ModelAndView selectInFilesList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> expInList = pfexportService.selectInFilesList(vo);
		model.addAttribute("expInList", expInList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}

	// 수출신고현황 rptNo fileList popUp
	@RequestMapping(value = "/export/selectExpViewFilesList.do")
	public ModelAndView selectExpViewFilesList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> expViewList = pfexportService.selectExpViewFilesList(vo);
		model.addAttribute("expViewList", expViewList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@PostMapping(value = "/export/expViewZipCreate.do")
	public void expViewZipCreate(@RequestBody List<ZipFileDownload> downloadFile,
	        @ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model,
	        HttpServletResponse response) throws Exception {
	    System.out.println("---------------expViewZipCreate---------------");
		String saveDir = "/home/files";
		String saveDir2 = "";
		String zipFileName = downloadFile.get(0).getInvoiceNo() + "_" + downloadFile.get(0).getRptNo() + ".zip";
		try {
			FileOutputStream fos = new FileOutputStream(saveDir + File.separator + zipFileName);
			ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(fos);
            // 파일 목록을 순회하며 압축 파일에 추가
            for (ZipFileDownload file : downloadFile) {
        		saveDir2 = file.getDocuPath();
                addFileToZip(saveDir2, file.getDocuFile(), zipOut, file.getDocuOrgFile());
            }
	        zipOut.close(); // ZIP 출력 스트림 닫기
		} catch (Exception e) {
			e.printStackTrace();
		} finally {}
	}
	
	@RequestMapping(value = "/export/downloadViewFile.do")
  	public void downloadViewFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
  		String zipName = request.getParameter("expViewZipDown"); // jsp name="expViewZipDown"
  		System.out.println("zipName : " + zipName);
  		String saveDir = "/home/files";
  		File file = new File(saveDir + "/" + zipName + ".zip");
  		response.setHeader("Content-Disposition","attachment;filename=\"" + zipName + ".zip\";");

  		FileInputStream fileInputStream = new FileInputStream(file);
  		ServletOutputStream servletOutputStream = response.getOutputStream();

  		byte b [] = new byte[1024];
  		int data = 0;

  		while((data=(fileInputStream.read(b, 0, b.length))) != -1)
  		{
  			servletOutputStream.write(b, 0, data);
  		}
  		servletOutputStream.flush();
  		servletOutputStream.close();
  		fileInputStream.close();
  	}
	
	@PostMapping(value = "/export/downLoadZipFileInList.do")
	public void downLoadZipFileBlList(@RequestBody List<ZipFileDownload> downloadFile,
			@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model,
			HttpServletResponse response) throws Exception {
		System.out.println("---------------downLoadZipFileInList---------------");
		String saveDir = "/home/files";
		String saveDir2 = "";
		String zipFileName = downloadFile.get(0).getInvoiceNo() + ".zip";
		System.out.println(zipFileName);

		try {
			FileOutputStream fos = new FileOutputStream(saveDir + File.separator + zipFileName);
			ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(fos);
            for (ZipFileDownload file : downloadFile) {
            	saveDir2 = file.getDocuPath();
                addFileToZip(saveDir2, file.getDocuFile(), zipOut, file.getDocuOrgFile());
            }
	        zipOut.close(); 
		} catch (Exception e) {
			e.printStackTrace();
		} finally {}
	}
	
	// 파일을 ZIP 파일에 추가하는 메서드
	private void addFileToZip(String directoryPath, String fileName, ZipArchiveOutputStream zipOut, String fileOrgName) throws IOException {
	    String docuFile = fileName;
	    String docuOrgFile = fileOrgName;
	    System.out.println("docuFile"+docuFile);
	    System.out.println("docuOrgFile"+docuOrgFile);
	    File file = new File(directoryPath, docuFile);
	    FileInputStream fis = new FileInputStream(file);
	    // 한글 파일명을 UTF-8로 인코딩
	    ZipArchiveEntry zipEntry = new ZipArchiveEntry(file, docuOrgFile);
	    zipOut.putArchiveEntry(zipEntry);
	    
	    byte[] bytes = new byte[1024];
	    int length;
	    while ((length = fis.read(bytes)) >= 0) {
	        zipOut.write(bytes, 0, length);
	    }

	    zipOut.closeArchiveEntry();
	    fis.close();
	}

	// --------------------------------------------------------------------------------

	private String extractInvoiceNumber(String orgFileName) {
		if (orgFileName != null && !orgFileName.isEmpty()) {
			String fileNameWithoutExtension = orgFileName.substring(0, orgFileName.lastIndexOf('.'));
			return fileNameWithoutExtension.substring(fileNameWithoutExtension.indexOf("CI_") + 3);
		}
		return "";
	}

	// Invoice 등록 '업로드' 파일 저장
	@RequestMapping(value = "/export/insertExportFilesInfo.do")
	public ModelAndView insertExportFilesInfo(
			@RequestParam("fileBl[]") MultipartFile[] filesBl,
			@RequestParam("fileIn[]") MultipartFile[] filesIn,
			@RequestParam("filePl[]") MultipartFile[] filesPl,
			@RequestParam("fileOt[]") MultipartFile[] filesOt,
			@RequestParam("invoiceNo") String invoice,
			@RequestParam("rptNo") String rpt,
			HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		System.out.println("회사명: " + userVO.getCmpnyCd());
		System.out.println("invoice: " + invoice);
		System.out.println("rpt: " + rpt);
		
		String invoiceNo = "";
		String cmpnyCd = userVO.getCmpnyCd();
		String regId = userVO.getId();
		String expInvoiceNumber = "";
		
		for (MultipartFile file : filesIn) {
		  	System.out.println("Received file In: " + file.getOriginalFilename());
		    String name = file.getOriginalFilename();
			String fileName = UUID.randomUUID().toString();
			String directory = "/home/files";
			expInvoiceNumber = extractInvoiceNumber(name);
			String filepath = Paths.get(directory, fileName).toString();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(file.getBytes());
			stream.close();
			
			SaveExpFileVO vo = new SaveExpFileVO();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar date = Calendar.getInstance();
			String uploadDt = sdf.format(date.getTime());
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
			Calendar date2 = Calendar.getInstance();
			String regDt = sdf2.format(date2.getTime());
			
			vo.setOrgFileName(name);
			vo.setName("CI");
			vo.setFileName(fileName);
			if(invoice.equals("")) {
				invoiceNo = expInvoiceNumber;
			} else {
				invoiceNo = invoice;
			}
			vo.setInvoiceNo(invoiceNo);
			vo.setRptNo(rpt);
			vo.setUploadDt(uploadDt);
			vo.setRegDt(regDt);
			vo.setRegId(regId);
			vo.setCmpnyCd(cmpnyCd);
			
			pfexportService.insertExportFilesInfo(vo);
		}
		
		for (MultipartFile file : filesBl) {
            System.out.println("Received file Bl: " + file.getOriginalFilename());
            String name = file.getOriginalFilename();
			String fileName = UUID.randomUUID().toString();
			String directory = "/home/files";
			String filepath = Paths.get(directory, fileName).toString();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(file.getBytes());
			stream.close();
			
			SaveExpFileVO vo = new SaveExpFileVO();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar date = Calendar.getInstance();
			String uploadDt = sdf.format(date.getTime());
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
			Calendar date2 = Calendar.getInstance();
			String regDt = sdf2.format(date2.getTime());
			
			vo.setOrgFileName(name);
			vo.setName("BL");
			vo.setFileName(fileName);
			if(invoice.equals("")) {
				invoiceNo = expInvoiceNumber;
			} else {
				invoiceNo = invoice;
			}
			vo.setInvoiceNo(invoiceNo);
			vo.setRptNo(rpt);
			vo.setUploadDt(uploadDt);
			vo.setRegDt(regDt);
			vo.setRegId(regId);
			vo.setCmpnyCd(cmpnyCd);
			
			pfexportService.insertExportFilesInfo(vo);
	    }
		 
		for (MultipartFile file : filesPl) {
		  	System.out.println("Received file PL: " + file.getOriginalFilename());
		    String name = file.getOriginalFilename();
			String fileName = UUID.randomUUID().toString();
			String directory = "/home/files";
			String filepath = Paths.get(directory, fileName).toString();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(file.getBytes());
			stream.close();
			
			SaveExpFileVO vo = new SaveExpFileVO();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar date = Calendar.getInstance();
			String uploadDt = sdf.format(date.getTime());
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
			Calendar date2 = Calendar.getInstance();
			String regDt = sdf2.format(date2.getTime());
			
			vo.setOrgFileName(name);
			vo.setName("PL");
			vo.setFileName(fileName);
			if(invoice.equals("")) {
				invoiceNo = expInvoiceNumber;
			} else {
				invoiceNo = invoice;
			}
			vo.setInvoiceNo(invoiceNo);
			vo.setRptNo(rpt);
			vo.setUploadDt(uploadDt);
			vo.setRegDt(regDt);
			vo.setRegId(regId);
			vo.setCmpnyCd(cmpnyCd);
			
			pfexportService.insertExportFilesInfo(vo);
		}
		  
		for (MultipartFile file : filesOt) {
		  	System.out.println("Received file Re: " + file.getOriginalFilename());
		    String name = file.getOriginalFilename();
			String fileName = UUID.randomUUID().toString();
			String directory = "/home/files";
			String filepath = Paths.get(directory, fileName).toString();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(file.getBytes());
			stream.close();
			
			SaveExpFileVO vo = new SaveExpFileVO();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar date = Calendar.getInstance();
			String uploadDt = sdf.format(date.getTime());
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
			Calendar date2 = Calendar.getInstance();
			String regDt = sdf2.format(date2.getTime());
			
			vo.setOrgFileName(name);
			vo.setName("OT");
			vo.setFileName(fileName);
			if(invoice.equals("")) {
				invoiceNo = expInvoiceNumber;
			} else {
				invoiceNo = invoice;
			}
			vo.setInvoiceNo(invoiceNo);
			vo.setRptNo(rpt);
			vo.setUploadDt(uploadDt);
			vo.setRegDt(regDt);
			vo.setRegId(regId);
			vo.setCmpnyCd(cmpnyCd);
			
			pfexportService.insertExportFilesInfo(vo);
		}
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}

	@RequestMapping(value = "/export/selectExportViewList.do", method = RequestMethod.POST)
	public ModelAndView selectExportViewList(@RequestBody SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
	    HttpSession httpSession = request.getSession(true);
	    UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
		List<?> resultList = pfexportService.selectExportViewList(vo);
	    ModelAndView mav = new ModelAndView("jsonView");
	    mav.addObject("resultList", resultList);
	    return mav;
	}

	@RequestMapping(value = "/export/selectExportViewLanList.do")
	public ModelAndView selectExportViewLanList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportViewLanList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	public ModelAndView selectExportViewLanListExcel(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setList(userVO.getCorpNos());
		
		List<?> resultList = pfexportService.selectExportViewLanListExcel(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}

	@RequestMapping(value = "/export/selectExportViewSpecList.do")
	public ModelAndView selectExportViewSpecList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportViewSpecList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	public ModelAndView selectExportViewSpecListExcel(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setList(userVO.getCorpNos());
		
		List<?> resultList = pfexportService.selectExportViewSpecListExcel(vo);
		model.addAttribute("resultList", resultList);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/selectExpProgressViewList.do")
	public ModelAndView selectExpProgressViewList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		String rptNo = vo.getSrch1();
		List<Map<String, String>> resultList = new ArrayList<>();
		JsonNode callExpUnipassApi = callExpUnipassApi(rptNo);

		// System.out.println("callExpUnipassApi: " + callExpUnipassApi);
		if (callExpUnipassApi != null && callExpUnipassApi.has("expDclrNoPrExpFfmnBrkdQryRsltVo")) {
		    JsonNode expDclrNoPrExpFfmnBrkdQry = callExpUnipassApi.get("expDclrNoPrExpFfmnBrkdQryRsltVo");
		    Map<String, String> dataMap = new HashMap<>();
	        expDclrNoPrExpFfmnBrkdQry.fields().forEachRemaining(entry -> {
	            String fieldName = entry.getKey();
	            String fieldValue = entry.getValue().asText();
	            dataMap.put(fieldName, fieldValue);
	        });

	        // 데이터 가공
	        String shpmPckGcnt = dataMap.getOrDefault("shpmPckGcnt", "");
	        String shpmPckUt = dataMap.getOrDefault("shpmPckUt", "");
	        String csclPckGcnt = dataMap.getOrDefault("csclPckGcnt", "");
	        String csclPckUt = dataMap.getOrDefault("csclPckUt", "");

	        if (!shpmPckGcnt.isEmpty() && !shpmPckUt.isEmpty()) {
	            dataMap.put("shpmCnt", shpmPckGcnt + " " + shpmPckUt);
	        }
	        if (!csclPckGcnt.isEmpty() && !csclPckUt.isEmpty()) {
	        	dataMap.put("csclCnt", csclPckGcnt + " " + csclPckUt);
	        }
	        if (callExpUnipassApi.has("expDclrNoPrExpFfmnBrkdDtlQryRsltVo")) {
	            JsonNode expDclrNoPrExpFfmnBrkdDtlQry = callExpUnipassApi.get("expDclrNoPrExpFfmnBrkdDtlQryRsltVo");
	            String tkofDtl = expDclrNoPrExpFfmnBrkdDtlQry.get("tkofDt").asText();
	            String blNo = expDclrNoPrExpFfmnBrkdDtlQry.get("blNo").asText();
	            if (!tkofDtl.isEmpty()) {
	                dataMap.put("tkofDtl", tkofDtl);
	            }
	            if (!blNo.isEmpty()) {
	                dataMap.put("blNo", blNo);
	            }
	        }
	        resultList.add(dataMap);
		}
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("resultList", resultList);
		return mav;
	}
	
	private JsonNode callExpUnipassApi(String rptNo) {
		if(rptNo == null || "".equals(rptNo)) {
			return null;
		}
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_XML_VALUE + ";charset=UTF-8");
			URI uri = UriComponentsBuilder.fromHttpUrl("https://unipass.customs.go.kr:38010/ext/rest/expDclrNoPrExpFfmnBrkdQry/retrieveExpDclrNoPrExpFfmnBrkd")
					.queryParam("crkyCn", "f240w222k102t142w090e040n0")
					.queryParam("expDclrNo", rptNo)
					.build()
					.encode("UTF-8")
					.toUri();	
			
			HttpComponentsClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
	        httpRequestFactory.setConnectTimeout(5000);
	        httpRequestFactory.setReadTimeout(5000);
	        
	        RestTemplate restTpl = new RestTemplate(httpRequestFactory);
	        HttpEntity<?> entity = new HttpEntity<>(headers);
			
	        restTpl.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
	        ResponseEntity<String>  responseEntity = restTpl.exchange(uri.toString(), HttpMethod.GET, entity, String.class);
	        // System.out.println("API value: " + responseEntity.getBody());
	        
	        if(responseEntity.getStatusCodeValue() == 200) {
	        	XmlMapper xmlMapper = new XmlMapper();
	        	String str = responseEntity.getBody().toString();
	        	JsonNode node = xmlMapper.readValue(str, new TypeReference<JsonNode>() { });
	        	return node;
	        } else {
	        	return null;
	        }
		} catch (Exception e) {e.printStackTrace();return null;}
	}

	@RequestMapping(value = "/export/selectExportUpdateList.do")
	public ModelAndView selectExportUpdateList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
		List<?> resultList = pfexportService.selectExportUpdateList(vo);
	    ModelAndView mav = new ModelAndView("jsonView");
	    mav.addObject("resultList", resultList);
	    return mav;
	}
	
	@RequestMapping(value = "/export/selectExpDtlUpdViewList.do")
	public ModelAndView selectExpDtlUpdViewList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
		List<?> resultList = pfexportService.selectExpDtlUpdViewList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	// ----------------------------------------------------------
	// Invoice 생성 페이지의 LOADING PORT 데이터 가져오기
	@RequestMapping(value = "/export/selectExportMkInLoadList.do")
	public ModelAndView selectExportMkInList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
	    List<?> resultList = pfexportService.selectExportMkInList(vo);
		model.addAttribute("resultList", resultList);
		// System.out.println("load Port: " + resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	// Invoice 생성 페이지의 incoterms 데이터 가져오기
	@RequestMapping(value = "/export/selectExportMkInIncotermsList.do")
	public ModelAndView selectExportMkInIncotermsList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportMkInIncotermsList(vo);
		model.addAttribute("resultList", resultList);
		// System.out.println("terms of trade: " + resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	// Invoice 생성 페이지의 FINAL DESTINATION 데이터 가져오기
	@RequestMapping(value = "/export/selectExportMkInAprPortList.do")
	public ModelAndView selectExportMkInAprPortList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportMkInAprPortList(vo);
		model.addAttribute("resultList", resultList);
		// System.out.println("도착 항구: " + resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	// Invoice 생성 페이지의 '원산지' 가져오기
	@RequestMapping(value = "/export/selectExportMkInNationList.do")
	public ModelAndView selectExportMkInNationList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportMkInNationList(vo);
		model.addAttribute("resultList", resultList);
		// System.out.println("원산지: " + resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	// Invoice 생성 페이지의 UOM(단위) 데이터 가져오기
	@RequestMapping(value = "/export/selectExportMkInUOMList.do")
	public ModelAndView selectExportMkInUOMList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportMkInUOMList(vo);
		model.addAttribute("resultList", resultList);
		// System.out.println("UOM_단위: " + resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	// Invoice 생성 페이지의 UOM(단위) 데이터 가져오기
	@RequestMapping(value = "/export/selectExportMkInCurrencyList.do")
	public ModelAndView selectExportMkInCurrencyList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportMkInCurrencyList(vo);
		model.addAttribute("resultList", resultList);
		// System.out.println("통화 단위: " + resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/selectExportMkPLtotCntList.do")
	public ModelAndView selectExportMkPLtotCntList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request,
			ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExportMkPLtotCntList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	// ----------------------------------------------------------
	
	@RequestMapping(value = "/export/downloadInFile.do")
  	public void downloadInFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
  		String zipName = request.getParameter("zipInName");
  		System.out.println("zipName : " + zipName);
  		String saveDir = "/home/files";
  		File file = new File(saveDir + "/" + zipName + ".zip");
  		response.setHeader("Content-Disposition","attachment;filename=\"" + zipName + ".zip\";");

  		FileInputStream fileInputStream = new FileInputStream(file);
  		ServletOutputStream servletOutputStream = response.getOutputStream();

  		byte b [] = new byte[1024];
  		int data = 0;

  		while((data=(fileInputStream.read(b, 0, b.length))) != -1)
  		{
  			servletOutputStream.write(b, 0, data);
  		}
  		servletOutputStream.flush();
  		servletOutputStream.close();
  		fileInputStream.close();
  	}
	
	@RequestMapping(value = "/export/makeCIPdf.do", method = RequestMethod.POST)
	public ResponseEntity<String> makeCIPdf(@RequestBody String invoiceNo, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		Map parameters = new HashMap();
		String cmpny = userVO.getCmpnyCd();
		String reportName = "";
		List allPrint = new ArrayList();
		String addReportName = "";
		JasperReport jasperReport;
		JasperPrint jasperPrint = null;

		JasperPrint allJasperPrint;
		
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMdd");
		String tempDate = formatter.format(new java.util.Date());

	    String ul = request.getServletContext().getRealPath("");
	    System.out.println("======================================================================== start");
	    
	    
	    OutputStream os = null;
	    JRPdfExporter exp = new JRPdfExporter();
	    
	    String pdfUrl = fileProperties.getProperty("pdf.url");
		String path = pdfUrl + "CI_"+invoiceNo+".pdf";
	    
	    parameters.put("i_prm1", invoiceNo);
	    parameters.put("i_prm3", ul);
	    
			System.out.println(parameters);
			try {
				
				List<JasperPrint> jasperPrintList = new ArrayList<JasperPrint>();
				List annexList = new ArrayList();
				annexList.add("Invoice");
				int cnt = 0;
				cnt = pfexportService.selectExportItemCntList(invoiceNo);
				if (cnt > 2) {
				annexList.add("InvoiceList");
				}
				annexList.add("PackingList2");
				for(int j=0; j<annexList.size(); j++) {
					System.out.println("Crtfissuhist : " + annexList.get(j).toString());
				
				//reportName = selectReportName(vo);
				reportName = annexList.get(j).toString();
				//reportName = "2_Annex_DO";
				System.out.println(parameters);
				String reportPath = ul + "/templet/"+reportName+".jrxml";
				JasperDesign jasperd = JRXmlLoader.load(reportPath);  // 레포트 파일을 Load
			    jasperReport = JasperCompileManager.compileReport(jasperd);

			    System.out.println("start1");
				System.out.println("start2");

				BeanFactory factory = new XmlBeanFactory(new ClassPathResource("egovframework/spring/context-datasource.xml"));
				DataSource ds = (DataSource) factory.getBean("dataSource");
				conn = ds.getConnection();

				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);
				allPrint.add(jasperPrint);
				
				}
			} catch (JRException e) {
				System.err.println(e.getMessage());
			} finally {
				if(os != null) try{ os.close(); }catch(Exception x) { conn.close(); }
			}
			System.out.println("======================================================================== end");
			
			
		
		System.out.println("======================================================================== end");
		System.out.println("allPrint : " + allPrint);

		System.out.println("allPrint : 111");
		String realPath = request.getServletContext().getRealPath("");
		String orgFile = realPath + "/pdf/" + "CI_"+invoiceNo+".pdf";
		// was 밖의 폴더로 생성안됨
		JRPdfExporter exporter = new JRPdfExporter();
        exporter.setExporterInput(SimpleExporterInput.getInstance(allPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(orgFile));
        exporter.exportReport();

        String pafPath = fileProperties.getProperty("pdf.path");
        String savePath;

        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            savePath = "c:\\home\\files\\" + "CI_" + invoiceNo + ".pdf";
        } else {
            savePath = pafPath + "CI_" + invoiceNo + ".pdf";
        }

        System.out.println("file copy");
        System.out.println(orgFile);
        System.out.println(savePath);

	    FileUtil.copyFile(orgFile, savePath);
		
		System.out.println("allPrint : 333");
		SaveExpFileVO vo = new SaveExpFileVO();
		vo.setInvoiceNo(invoiceNo);
		vo.setCmpnyCd(userVO.getCmpnyCd());
		vo.setOrgFileName("CI_"+invoiceNo+".pdf");
		vo.setUploadDt(tempDate);
		pfexportService.saveMakeInFile(vo);
		
		
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/export/downloadAnnex.do")
	public void downloadAnnex(HttpServletRequest request, HttpServletResponse response) throws Exception {
	    String saveDir = "/home/files/";
	    String invoiceNo = request.getParameter("downCINo");

	    File file = new File(saveDir + "CI_" + invoiceNo + ".pdf");
	    String encodedFileName = URLEncoder.encode("CI_" + invoiceNo+".pdf", "UTF-8").replaceAll("\\+", "%20");
	    response.setHeader("Content-Disposition", "attachment;filename=\"" + encodedFileName + "\";");

	    FileInputStream fileInputStream = new FileInputStream(file);
	    ServletOutputStream servletOutputStream = response.getOutputStream();

	    byte[] buffer = new byte[1024];
	    int bytesRead;

	    while ((bytesRead = fileInputStream.read(buffer)) != -1) {
	        servletOutputStream.write(buffer, 0, bytesRead);
	    }

	    servletOutputStream.flush();
	    servletOutputStream.close();
	    fileInputStream.close();
	}
	
	@RequestMapping(value = "/export/exportSendEmail.do")
  	public void exportSendEmail(HttpServletRequest request, HttpServletResponse response) throws Exception {
  		String sendInvoiceNo = request.getParameter("sendInvoiceNo");
  		String sendCmpnyCd = request.getParameter("sendCmpnyCd");
  		System.out.println("sendInvoiceNo : " + sendInvoiceNo);
  		System.out.println("sendCmpnyCd : " + sendCmpnyCd);
  		SearchVO vo = new SearchVO();
  		vo.setSrch1(sendInvoiceNo);
  		vo.setSrch2(sendCmpnyCd);
  		
  		/*String sendEmail = "";
			
  		sendEmail =  importService.impSendEmail(vo);
  		if(sendEmail == null ) {
  			sendEmail = "isseo@kordsystems.com";
  		}*/
  		
  		pfexportService.expRequestBl(vo); // 통관의뢰 -> 통관진행중
  		List<?> expInList = pfexportService.selectInFilesList(vo);
  		
  		String saveDir = "/home/files";
  		String saveDir2 = "";
		String zipFileName = sendInvoiceNo + ".zip";

		try {
			FileOutputStream fos = new FileOutputStream(saveDir + File.separator + zipFileName);
			ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(fos);
            
            for (Object obj : expInList) {
     			 if (obj instanceof Map) {
     		        Map<?, ?> map = (Map<?, ?>) obj;
     		        String docuPath = (String) map.get("docuPath");
     		        String docuFile = (String) map.get("docuFile");
     		        String docuOrgFile = (String) map.get("docuOrgFile");
     		        saveDir2 = docuPath;
     		        addFileToZip(saveDir2, docuFile, zipOut, docuOrgFile);
     		    }
     		}
	            zipOut.close();
	            
		} catch (Exception e) {
			e.printStackTrace();
		} finally {}
  		
  		EmailUtill.sendEmailWithFile(sendInvoiceNo, sendCmpnyCd, "ioom@kordsystems.com", "EXPORT", null, "kr", zipFileName);
  	}
	
	
	@RequestMapping(value = "/export/deleteExpInFile.do", method = RequestMethod.POST)
	@ResponseBody
	public void deleteExpInFile(@RequestBody List<ZipFileDownload> downloadFile, HttpServletRequest request, ModelMap model) throws Exception {
		SearchVO vo = new SearchVO();
		for (ZipFileDownload file : downloadFile) {
		  vo.setSrch1(file.getDocuFile());
		  vo.setSrch2(file.getDocuOrgFile());
		  vo.setSrch3(file.getDocuPath());
		  vo.setSrch4(file.getUploadDt());
		  
		  pfexportService.deleteExpInFile(vo);
		}
		
	}
	
	@RequestMapping(value = "/export/saveExpUserMemo.do" , method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView saveExpUserMemo(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		pfexportService.saveExpUserMemo(vo);
		model.addAttribute("SaveStatus", "success");
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	/*@RequestMapping(value="/export/expUpdExcelDownload.do")
	public ModelAndView expUpdExcelDownload(@ModelAttribute("searchVO")SearchVO vo, HttpServletRequest request,HttpServletResponse response)throws Exception{
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		//vo.setList(userVO.getCorpNos());
		//vo.setRecordCountPerPage(99999999);
		//vo.setStartPage(0);
		ModelAndView mv = new ModelAndView("jsonView");
		String resultCode="200";
		String sheetName;
		String name;
		
		switch (vo.getExType()) {
		case "01":
			sheetName = "수출신고정정";
			name = "_수출신고정정";
			break;
		case "02":
			sheetName = "수출신고정정(전체)";
			name = "_수출신고정정(전체)";
			break;
		case "03":
			sheetName = "수출신고정정(미결)";
			name = "_수출신고정정(미결)";
			break;
		case "04":
			sheetName = "수출신고정정(승인)";
			name = "_수출신고정정(승인)";
			break;
		default:
			sheetName = "수출신고정정";
			name = "_수출신고정정";
			break;
		}
		
		try {
			ModelAndView dataMv = new ModelAndView();
	        List<?> resultList = new ArrayList<>();

	        XSSFWorkbook workBook = new XSSFWorkbook();
	        String[] colUnion = {};
	        String[] haedUnion = {};
	        String[] divUnion = {};
	        int unionIdx = 0;

	        colUnion = vo.getExCol().split("\\|\\|\\|");
	        haedUnion = vo.getExTit().split("\\|\\|\\|\\|");
	        divUnion = vo.getExTitDiv().split("\\|\\|", -1);

	        // 테두리 스타일 생성
	        XSSFCellStyle borderStyle = workBook.createCellStyle();
	        borderStyle.setBorderTop(BorderStyle.THIN);
	        borderStyle.setBorderBottom(BorderStyle.THIN);
	        borderStyle.setBorderLeft(BorderStyle.THIN);
	        borderStyle.setBorderRight(BorderStyle.THIN);

	        for (String div : divUnion) {
	            String divIdx = div.split("\\|")[0];
	            String divName = div.split("\\|")[1];
	            Boolean summary = false;
	            ArrayList<Double> summaryDats = null;

	            XSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, divName, colUnion[unionIdx].split("\\|\\|").length);
	            SearchVO sheetSearchVo = new SearchVO();

	            sheetSearchVo.setList(userVO.getCorpNos());
	            sheetSearchVo.setRecordCountPerPage(99999999);
	            sheetSearchVo.setStartPage(0);

	            sheetSearchVo.setSrch1((String) vo.getSrch1());
	            sheetSearchVo.setSrch2((String) vo.getSrch2());
	            sheetSearchVo.setSrch3((String) vo.getSrch3());
	            sheetSearchVo.setSrch4((String) vo.getSrch4());
	            sheetSearchVo.setSrch5((String) vo.getSrch5());
	            sheetSearchVo.setSrch6((String) vo.getSrch6());
	            sheetSearchVo.setSrch8((String) vo.getSrch8());


                dataMv = this.selectExportUpdateList(sheetSearchVo, request, new ModelMap());
                resultList = (List<?>) dataMv.getModel().get("resultList");
                
                summary = true;
				ArrayList<String> conts = new ArrayList<String>();
				conts.add("1");
				sheetSearchVo.setExCol(colUnion[unionIdx]);
				sheetSearchVo.setExTit(haedUnion[unionIdx]);
				sheet = ExcelUtil.createMainTable(sheet, resultList, sheetSearchVo);
				
				unionIdx++;
			}

	        int sheetCnt = workBook.getNumberOfSheets();
	        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date now = new Date();
	        String nowTime = sdf1.format(now);

	        for (int i = 0; i < sheetCnt; i++) {
	            XSSFSheet tempSheet = workBook.getSheetAt(i);
	            //int columnToHide = 18;
	            //tempSheet.setColumnHidden(columnToHide, true); //SN 히든
	            int cellCnt = tempSheet.getPhysicalNumberOfRows();

	            for (int j = 1; j < cellCnt; j++) {
	                tempSheet.autoSizeColumn(j);
	            }

	            tempSheet.createRow(tempSheet.getLastRowNum() + 1);
	            XSSFRow row = tempSheet.createRow(tempSheet.getLastRowNum() + 1);
	            XSSFCell cell = row.createCell(0);
	            cell.setCellValue(nowTime);
	        }

	        int cnt = 0;
	        String ExcelTitle = "";
	        if (userVO.getCorpNos().size() > 1) {
	            cnt = userVO.getCorpNos().size() - 1;
	            ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
	        } else {
	            ExcelTitle = userVO.getCmpnyCd();
	        }
	        ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat(vo.getSrch40().replace("_", " ")), response);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    mv.addObject("resultCode", resultCode);
	    return mv;
	}*/
	
	
	@RequestMapping(value = "/export/expUpdExcelDownload.do")
	public ModelAndView expUpdExcelDownload(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    HttpSession httpSession = request.getSession(true);
	    UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	    ModelAndView mv = new ModelAndView("jsonView");
	    String resultCode = "200";

	    try {
	        ModelAndView dataMv = new ModelAndView();
	        List<?> resultList = new ArrayList<>();

	        XSSFWorkbook workBook = new XSSFWorkbook();
	        String[] colUnion = {};
	        String[] haedUnion = {};
	        String[] divUnion = {};
	        int unionIdx = 0;

	        colUnion = vo.getExCol().split("\\|\\|\\|");
	        haedUnion = vo.getExTit().split("\\|\\|\\|\\|");
	        divUnion = vo.getExTitDiv().split("\\|\\|", -1);

	        String sheetName;
	        String name;
	        switch (vo.getExType()) {
	            case "01":
	                sheetName = "수출신고정정(전체)";
	                name = "수출신고정정(전체)";
	                break;
	            case "02":
	                sheetName = "수출신고정정(승인)";
	                name = "수출신고정정(승인)";
	                break;
	            case "03":
	                sheetName = "수출신고정정(미결)";
	                name = "수출신고정정(미결)";
	                break;
	            default:
	                sheetName = "수출신고정정(전체)";
	                name = "수출신고정정(전체)";
	                break;
	        }

	        for (String div : divUnion) {
	            String divIdx = div.split("\\|")[0];
	            String divName = div.split("\\|")[1];

	            XSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, divName, colUnion[unionIdx].split("\\|\\|").length);
	            SearchVO sheetSearchVo = new SearchVO();

	            sheetSearchVo.setList(userVO.getCorpNos());
	            sheetSearchVo.setRecordCountPerPage(99999999);
	            sheetSearchVo.setStartPage(0);

	            sheetSearchVo.setSrch1(vo.getSrch1());
	            sheetSearchVo.setSrch2(vo.getSrch2());
	            sheetSearchVo.setSrch3(vo.getSrch3());
	            sheetSearchVo.setSrch4(vo.getSrch4());
	            sheetSearchVo.setSrch5(vo.getSrch5());
	            sheetSearchVo.setSrch6(vo.getSrch6());
	            sheetSearchVo.setSrch8(vo.getSrch8());

	            dataMv = this.selectExportUpdateList(sheetSearchVo, request, new ModelMap());
	            resultList = (List<?>) dataMv.getModel().get("resultList");

	            sheetSearchVo.setExCol(colUnion[unionIdx]);
	            sheetSearchVo.setExTit(haedUnion[unionIdx]);
	            sheet = ExcelUtil.createMainTable(sheet, resultList, sheetSearchVo);

	            unionIdx++;
	        }

	        int sheetCnt = workBook.getNumberOfSheets();
	        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date now = new Date();
	        String nowTime = sdf1.format(now);

	        for (int i = 0; i < sheetCnt; i++) {
	            XSSFSheet tempSheet = workBook.getSheetAt(i);
	            int columnToHide = 1;
	            tempSheet.setColumnHidden(columnToHide, true);
	            int cellCnt = tempSheet.getPhysicalNumberOfRows();

	            for (int j = 1; j < cellCnt; j++) {
	                tempSheet.autoSizeColumn(j);
	            }

	            tempSheet.createRow(tempSheet.getLastRowNum() + 1);
	            XSSFRow row = tempSheet.createRow(tempSheet.getLastRowNum() + 1);
	            XSSFCell cell = row.createCell(0);
	            cell.setCellValue(nowTime);
	        }

	        int cnt = 0;
	        String ExcelTitle = "";
	        if (userVO.getCorpNos().size() > 1) {
	            cnt = userVO.getCorpNos().size() - 1;
	            ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
	        } else {
	            ExcelTitle = userVO.getCmpnyCd();
	        }

	        String finalTitle = ExcelTitle.concat(" ").concat(name).concat("_");
	        ExcelUtil.generateExcelFile(workBook, finalTitle, response);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    mv.addObject("resultCode", resultCode);
	    return mv;
	}

	
	@RequestMapping(value = "/export/exportDownloadExcel.do")
	public ModelAndView exportDownloadExcel(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		
		ModelAndView mv = new ModelAndView("jsonView");
		String resultCode="200";
		
		try {
			ModelAndView dataMv = new ModelAndView();
			List<?> reslutList = new ArrayList<>();
	    
			XSSFWorkbook workBook = new XSSFWorkbook();
			String[] colUnion = {};
			String[] haedUnion =  {};
			String[] divUnion = {};
			int unionIdx = 0;
			
			
				
			colUnion = vo.getExCol().split("\\|\\|\\|");
			haedUnion = vo.getExTit().split("\\|\\|\\|\\|");
			divUnion = vo.getExTitDiv().split("\\|\\|", -1);
			
			for(String div : divUnion) {
				String divIdx = div.split("\\|")[0];
				String divName = div.split("\\|")[1];
				
				Boolean summary = false;
				ArrayList<Double> summaryDats = null;
				
				XSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, divName, colUnion[unionIdx].split("\\|\\|").length);
				
				SearchVO sheetSearchVo = new SearchVO();
				sheetSearchVo.setList(userVO.getCorpNos());
				sheetSearchVo.setRecordCountPerPage(99999999);
				sheetSearchVo.setStartPage(0);
				
				sheetSearchVo.setSrch2((String) vo.getSrch2());
				sheetSearchVo.setSrch3((String) vo.getSrch3());
				sheetSearchVo.setSrch4((String) vo.getSrch4());
				sheetSearchVo.setSrch5((String) vo.getSrch5());
				sheetSearchVo.setSrch8((String) vo.getSrch8());
				
				
				if("01".equals(vo.getExType())) {
				
					switch (divIdx) {
					case "1":
						dataMv = this.selectExportViewList(sheetSearchVo, request, new ModelMap());
						reslutList = (List<?>) dataMv.getModel().get("resultList");
						summary = true; 
						break;
					case "2":
						dataMv = this.selectExportViewLanListExcel(sheetSearchVo, request, new ModelMap());
						reslutList = (List<?>) dataMv.getModel().get("resultList");
						summary = true;
						break;
					case "3":
						dataMv = this.selectExportViewSpecListExcel(sheetSearchVo, request, new ModelMap());
						reslutList = (List<?>) dataMv.getModel().get("resultList");
						summary = true;
						break;
					default:
						break;
					}
				}
				
				ArrayList<String> conts = new ArrayList<String>();
				conts.add("1");
				//sheet = ExcelUtil.createSummaryCont(sheet, conts);
				
				sheetSearchVo.setExCol(colUnion[unionIdx]);
				sheetSearchVo.setExTit(haedUnion[unionIdx]);
				sheet = ExcelUtil.createMainTable(sheet, reslutList, sheetSearchVo);
				
				// data건수가 0이면  summary 동작안함
				
				unionIdx++;
			}
			
			// cell 너비 조정 및 하단 타임 스탬프
			int sheetCnt = workBook.getNumberOfSheets();
			SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date now = new Date();
			String nowTime = sdf1.format(now);
			
			for(int i=0; i < sheetCnt; i++) {
				XSSFSheet tempSheet = workBook.getSheetAt(i);
				int columnToHide1 = 1;
			    int columnToHide2 = 2;
			    tempSheet.setColumnHidden(columnToHide1, true);
			    tempSheet.setColumnHidden(columnToHide2, true);
				int cellCnt = tempSheet.getPhysicalNumberOfRows();
				
				for(int j=1; j < cellCnt; j++) {
					tempSheet.autoSizeColumn(j);
				}
				
				tempSheet.createRow(tempSheet.getLastRowNum() +1);
				XSSFRow row = tempSheet.createRow(tempSheet.getLastRowNum() +1);
				XSSFCell cell = row.createCell(0);
				cell.setCellValue(nowTime);
			}
			
			int cnt = 0;
			String ExcelTitle = "";
			if(userVO.getCorpNos().size() > 1) {
				cnt = userVO.getCorpNos().size() - 1;
				ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
			} else {
				ExcelTitle = userVO.getCmpnyCd();
			}
			ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat(vo.getSrch40().replace("_", " ")), response);

		}catch (Exception e) {
			e.printStackTrace();
		}
		
		mv.addObject("resultCode", resultCode);
		return mv;
	}
	
	
	@RequestMapping(value = "/export/selectExpDetailView.do")
	public ModelAndView selectExpDetailView(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		List<?> resultList = pfexportService.selectExpDetailView(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}
	
	@RequestMapping(value = "/export/expDetailExcelDown.do")
	public ModelAndView expDetailExcelDown(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    HttpSession httpSession = request.getSession(true);
	    UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	    ModelAndView mv = new ModelAndView("jsonView");
	    String resultCode = "200";
	    int colSize = 0;

	    try {
	    	vo.setSrch10(userVO.getCorpNo());
		    vo.setSrch11(userVO.getId());
	    	importService.deleteExcelStatus(vo);
	    	
	        ModelAndView dataMv = new ModelAndView();
	        List<?> resultList = new ArrayList<>();
	        
	        String tempDir;
	        String os = System.getProperty("os.name").toLowerCase();

	        if (os.contains("win")) {
	            tempDir = "C:\\home\\files";
	        } else {
	            tempDir = "/home/files";
	        }

	        System.setProperty("java.io.tmpdir", tempDir);	        

	        SXSSFWorkbook workBook = new SXSSFWorkbook();
	        String[] colUnion = {};
	        String[] haedUnion = {};
	        String[] divUnion = {};
	        int unionIdx = 0;

	        colUnion = vo.getExCol().split("\\|\\|\\|");
	        haedUnion = vo.getExTit().split("\\|\\|\\|\\|");
	        divUnion = vo.getExTitDiv().split("\\|\\|", -1);

	        CellStyle borderStyle = workBook.createCellStyle();
	        borderStyle.setBorderTop(BorderStyle.THIN);
	        borderStyle.setBorderBottom(BorderStyle.THIN);
	        borderStyle.setBorderLeft(BorderStyle.THIN);
	        borderStyle.setBorderRight(BorderStyle.THIN);

	        CellStyle numberStyle = workBook.createCellStyle();
	        DataFormat dataFormat = workBook.createDataFormat();
	        numberStyle.setDataFormat(dataFormat.getFormat("#,##0.00"));

	        // 숫자 + 테두리
	        CellStyle combinedStyle = workBook.createCellStyle();
	        combinedStyle.cloneStyleFrom(numberStyle); 
	        combinedStyle.setBorderTop(BorderStyle.THIN);
	        combinedStyle.setBorderBottom(BorderStyle.THIN);
	        combinedStyle.setBorderLeft(BorderStyle.THIN);
	        combinedStyle.setBorderRight(BorderStyle.THIN);

	        for (String div : divUnion) {
	            String divIdx = div.split("\\|")[0];
	            String divName = div.split("\\|")[1];
	            colSize = colUnion[unionIdx].split("\\|\\|").length;
	            SXSSFSheet sheet = ExcelUtil.createSheetWithTitleRow(workBook, divName, colSize);
	            
            	// 열 너비 자동 조정
	            for (int j = 1; j < colSize; j++) {
	            	sheet.trackColumnForAutoSizing(j);
	            	sheet.autoSizeColumn(j);
	            }	      
	            
	            SearchVO sheetSearchVo = new SearchVO();

	            sheetSearchVo.setList(userVO.getCorpNos());
	            sheetSearchVo.setRecordCountPerPage(99999999);
	            sheetSearchVo.setStartPage(0);

	            sheetSearchVo.setSrch1((String) vo.getSrch1());
	            sheetSearchVo.setSrch2((String) vo.getSrch2());
	            sheetSearchVo.setSrch3((String) vo.getSrch3());

	            if ("01".equals(vo.getExType())) {

	                switch (divIdx) {
	                    case "1":
	                        dataMv = this.selectExpDetailView(sheetSearchVo, request, new ModelMap());
	                        resultList = (List<?>) dataMv.getModel().get("resultList");
	                        break;
	                    default:
	                        break;
	                }
	            }

	            ArrayList<String> conts = new ArrayList<String>();
	            conts.add("1");
	            sheetSearchVo.setExCol(colUnion[unionIdx]);
	            sheetSearchVo.setExTit(haedUnion[unionIdx]);
	            
	            sheet = createMainTableDetail(sheet, resultList, sheetSearchVo, userVO.getCorpNo(), userVO.getId());

	            unionIdx++;
	        }

	        int sheetCnt = workBook.getNumberOfSheets();
	        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date now = new Date();
	        String nowTime = sdf1.format(now);

	        for (int i = 0; i < sheetCnt; i++) {
	            SXSSFSheet tempSheet = workBook.getSheetAt(i);
	            int cellCnt = tempSheet.getPhysicalNumberOfRows();

	            for (int j = 1; j < colSize; j++) {
	            	tempSheet.trackColumnForAutoSizing(j);
	                tempSheet.autoSizeColumn(j);
	            }

	            tempSheet.createRow(tempSheet.getLastRowNum() + 1);
	            SXSSFRow row = tempSheet.createRow(tempSheet.getLastRowNum() + 1);
	            SXSSFCell cell = row.createCell(0);
	            cell.setCellValue(nowTime);
	        }

	        int cnt = 0;
	        String ExcelTitle = "";
	        if (userVO.getCorpNos().size() > 1) {
	            cnt = userVO.getCorpNos().size() - 1;
	            ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
	        } else {
	            ExcelTitle = userVO.getCmpnyCd();
	        }
	        ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat(vo.getSrch40().replace("_", " ")), response);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    mv.addObject("resultCode", resultCode);
	    return mv;
	}
	
	public SXSSFSheet createMainTableDetail(SXSSFSheet sheet, List<?> resultList, SearchVO vo, String cmpnyCd, String id) throws Exception {
		
		SXSSFWorkbook wb = sheet.getWorkbook();
		SXSSFRow row = sheet.createRow(sheet.getLastRowNum() + 1);
		SXSSFCell cell = null;
		CellStyle headerStyle = createHeaderCellStyle(wb);
		CellStyle dataStyleCenter = createDataCellStyle(wb, HorizontalAlignment.CENTER);
		CellStyle dataStyleLeft = createDataCellStyle(wb, HorizontalAlignment.LEFT);
		CellStyle dataStyleRight = createDataCellStyle(wb, HorizontalAlignment.RIGHT);
		DataFormat df = wb.createDataFormat();
		
		// 헤더부
		for (String str : vo.getExTit().split("\\|\\|\\|")) {
			String[] header = str.split("\\|\\|");
			row = sheet.createRow(sheet.getLastRowNum() + 1);
			row.setHeight((short) 400);
			
			SXSSFCell firstCell = row.createCell(0);
			
			firstCell.setCellStyle(headerStyle);
			
			for (String headerOptions : header) {
				String[] valueAndOption = headerOptions.split("\\|");
				valueAndOption[1] = "".equals(valueAndOption[1]) ? "0" : valueAndOption[1];
				
				cell = row.createCell(row.getLastCellNum());
				
				cell.setCellStyle(headerStyle);
				cell.setCellValue("null".equals(valueAndOption[0]) ? "" : valueAndOption[0]);
				sheet.setColumnWidth(cell.getColumnIndex(), 5000);
				
				int mergeCnt = 0;
				
				if (!"null".equals(valueAndOption[1])) {
					mergeCnt = Integer.parseInt(valueAndOption[1]);
				}
				
				if (mergeCnt > 1) {
					int startIdx = cell.getColumnIndex();
					
					for (int i = 0; i < (mergeCnt - 1); i++) {
						cell = row.createCell(row.getLastCellNum());
						cell.setCellStyle(headerStyle);
					}
					
					sheet.addMergedRegion(new CellRangeAddress(row.getRowNum(), row.getRowNum(), startIdx, cell.getColumnIndex()));
				}
			}
		}
		
		// 데이터부
		if (resultList == null || resultList.size() < 1) {
			row = sheet.createRow(sheet.getLastRowNum() + 1);
			cell = row.createCell(0);
			cell.setCellValue("조회된 데이터가 없습니다.");
		}
		
		String[] colOptios = vo.getExCol().split("\\|\\|");
		boolean completeSetWidth = false;
		int rowNum = 1;
		
        CellStyle numberStyle = wb.createCellStyle();
        DataFormat dataFormat = wb.createDataFormat();
        numberStyle.setDataFormat(dataFormat.getFormat("#,##0.00"));			
		
        CellStyle combinedStyle = wb.createCellStyle();
        combinedStyle.cloneStyleFrom(numberStyle); 
        combinedStyle.setBorderTop(BorderStyle.THIN);
        combinedStyle.setBorderBottom(BorderStyle.THIN);
        combinedStyle.setBorderLeft(BorderStyle.THIN);
        combinedStyle.setBorderRight(BorderStyle.THIN);		
		
		for (Object result : resultList) {
			EgovMap map = (EgovMap) result;
			row = sheet.createRow(sheet.getLastRowNum() + 1);
			
			SXSSFCell firstCell = row.createCell(0);
			firstCell.setCellStyle(dataStyleCenter);
			firstCell.setCellValue(String.valueOf(rowNum));
			
			sheet.setColumnWidth(0, 1200);
			
			for (String options : colOptios) {
				String[] attrs = options.split("\\|");
				cell = row.createCell(row.getLastCellNum());
				
				switch (attrs[1]) {
				case "htCenter":
					cell.setCellStyle(dataStyleCenter);
					cell.setCellValue(map.containsKey(attrs[0]) ? String.valueOf(map.get(attrs[0])) : "");
					break;
				case "htLeft":
					cell.setCellStyle(dataStyleLeft);
					cell.setCellValue(map.containsKey(attrs[0]) ? String.valueOf(map.get(attrs[0])) : "");
					break;
				case "htRight":
				    String rightVal = map.containsKey(attrs[0]) ? String.valueOf(map.get(attrs[0])) : "";
				    if (rightVal.matches("[-+]?[0-9]*\\.?[0-9]+%?")) { 
				        if (rightVal.contains("%")) {
				            rightVal = rightVal.replaceAll("%", "");
				            rightVal = StringUtils.isNotEmpty(rightVal) ? rightVal : "0";
				            cell.setCellStyle(dataStyleRight);
				            cell.setCellType(CellType.NUMERIC);
				            cell.setCellStyle(combinedStyle);
				            cell.setCellValue(Double.parseDouble(rightVal) / 100);
				        } else {
				            rightVal = rightVal.replaceAll(",", "");
				            double dVal = Double.parseDouble(StringUtils.isNotEmpty(rightVal) ? rightVal : "0");
				            cell.setCellStyle(dataStyleRight);
				            cell.setCellType(CellType.NUMERIC);
				            cell.setCellStyle(combinedStyle);
				            cell.setCellValue(dVal);
				        }
				    } else {
				        cell.setCellStyle(dataStyleLeft);
				        cell.setCellValue(rightVal);
				    }
				    break;
				}
				if (!completeSetWidth) {
					if ("htCenter".equals(attrs[1])) {
						sheet.setColumnWidth(cell.getColumnIndex(), 4000);
					} else if ("htLeft".equals(attrs[1])) {
						sheet.setColumnWidth(cell.getColumnIndex(), 8000);
					} else if ("htRight".equals(attrs[1])) {
						sheet.setColumnWidth(cell.getColumnIndex(), 5000);
					}
				}
			}
			
			completeSetWidth = true;
			
			int jobCnt = rowNum;
			int totCnt = resultList.size();
			
			if (jobCnt == 1 || jobCnt%1000 == 0 || jobCnt == totCnt)
			{
				SearchVO svo = new SearchVO();
				String CorpNo = cmpnyCd;
				
				svo.seteExcelBuffer(jobCnt);
				svo.setsExcelBuffer(totCnt);
				svo.setCmpnyCd(CorpNo);
				svo.setId(id);
				// --------------------------------
				pfexportService.insertExpExcelStatus(svo);		
			}
			rowNum++;
		}
		
		return sheet;
	}
	
	private static CellStyle createHeaderCellStyle(SXSSFWorkbook wb) {
	    CellStyle style = wb.createCellStyle();
	    Font font = wb.createFont();
	
	    font.setFontHeightInPoints((short) 10);
	    font.setFontName("맑은 고딕");
	    font.setBold(true);
	
	    style.setAlignment(HorizontalAlignment.CENTER);
	    style.setVerticalAlignment(VerticalAlignment.CENTER);
	    style.setBorderTop(BorderStyle.THIN);
	    style.setBorderRight(BorderStyle.THIN);
	    style.setBorderBottom(BorderStyle.THIN);
	    style.setBorderLeft(BorderStyle.THIN);
	    style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
	    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	    style.setFont(font);
	
	    return style;
	}	
	
	private static CellStyle createDataCellStyle(SXSSFWorkbook wb, HorizontalAlignment alignment) {
        CellStyle style = wb.createCellStyle();
        Font font = wb.createFont();

        font.setFontHeightInPoints((short) 10);
        font.setFontName("맑은 고딕");

        style.setAlignment(alignment);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setFont(font);

        return style;
    }	
	
	@RequestMapping(value = "/export/selectExpDetailProgress.do", method = RequestMethod.POST)
	public ModelAndView selectExpDetailProgress(@RequestBody SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setSrch1(userVO.getCorpNo());
		
		List<?> resultList = pfexportService.selectExpDetailProgress(vo);
		
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/selectLoadDataList.do")
	public ModelAndView selectLoadDataList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, 
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	    vo.setSrch1(userVO.getCorpNo());
		List<?> resultList = pfexportService.selectLoadDataList(vo);
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value = "/export/selectLoadDataView.do")
	public ModelAndView selectLoadDataView(@ModelAttribute("searchVO") SaveExpMainVO vo, HttpServletRequest request, 
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setCmpnyCd(userVO.getCmpnyCd());
			vo.setCorpNo(userVO.getCorpNo());
		}
		List<?> resultList = pfexportService.selectLoadDataMainView(vo);
		model.addAttribute("resultList", resultList);
		List<?> resultList2 = pfexportService.selectLoadDataSubView(vo);
		model.addAttribute("resultList2", resultList2);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}

	@RequestMapping(value = "/export/loadDataDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public void loadDataDelete(@RequestBody List<ZipFileDownload> delList, HttpServletRequest request, ModelMap model) throws Exception {
		SearchVO vo = new SearchVO();
		  for (ZipFileDownload list : delList) {
			  vo.setSrch1(list.getInvoiceNo());
			  pfexportService.deleteLoadDataSubView(vo);
			  pfexportService.deleteLoadDataMainView(vo);
		  }
	}
	//팝업 
	@RequestMapping(value = "/export/selectCoRequset.do")
	public ModelAndView selectCoRequset(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, 
			ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		List<?> resultList1 = null;
		List<?> resultList2 = null;
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setCorpNo(userVO.getCorpNo());
		}
		if(vo.getSrch3().equals("0")) {
			// 의뢰
			/*String blno = pfexportService.selectBlno(vo);
			System.out.println("blno"+blno);
			vo.setSrch1(blno);*/
			resultList1 = pfexportService.selectCoRequset(vo);
		}else {
			// 임시저장 , 요청
			 resultList2 = pfexportService.selectCoStorage(vo);
		}
		
		model.addAttribute("resultList1", resultList1);
		model.addAttribute("resultList2", resultList2);
		
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	
	@RequestMapping(value="/export/exportCoTempSave.do")
	public ResponseEntity<String> saveTempData(
			@ModelAttribute SaveCoEnrollVO vo,
			@RequestParam(value = "fileName[]", required = false) List<MultipartFile> files,
			HttpServletRequest request) {
        
		
		/*StringBuilder fileNames = new StringBuilder();  // 저장할 파일 이름들을 담을 StringBuilder
        StringBuilder orgFileNames = new StringBuilder();  // 원본 파일 이름들을 담을 StringBuilder
*/		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setRegId(userVO.getId());
		vo.setCorpNo(userVO.getCorpNo());
		try {
            // 로그로 입력 데이터 확인
            System.out.println("rptNo: " + vo.getRptNo());
            System.out.println("invoice: " + vo.getInvoiceNo());
            System.out.println("getCmpnyNm: " + vo.getCmpnyNm());
            System.out.println("getMangerNm: " + vo.getMangerNm());
            System.out.println("getManagerNum: " +vo.getManagerNum());
            System.out.println("getManagerEmail: " + vo.getManagerEmail());
            System.out.println("state"+vo.getState());
            
           
            System.out.println("getBillCmpnyNm: " + vo.getBillCmpnyNm());
            System.out.println("getCorpNo: " + vo.getCorpNo());
            System.out.println("getBillManagerNm: " + vo.getBillManagerNm());
            System.out.println("getBillManagerEmail: " + vo.getBillManagerEmail());
            
            // 파일 처리 (선택적)
          /*  if (files != null && !files.isEmpty()) {
            //파일이 있을때 
            	for (MultipartFile file : files) {
                    System.out.println("Received file: " + file.getOriginalFilename());
                    String orgFileName = file.getOriginalFilename();
		            orgFileName = orgFileName.replaceAll(" ", "_");
		            String[] fileFormat = orgFileName.split("[.]");
	
		            if (fileFormat[fileFormat.length-1].toUpperCase().matches("PDF|JPG|SIZ|7Z|PPT|XLS|XLSX|PPTX|TXT|DOCX|DOC|HWP")) {
		                String fileName = UUID.randomUUID().toString();
		                String directory = "/home/files";
		                String filepath = Paths.get(directory, fileName).toString();
	
		                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
		                stream.write(file.getBytes());
		                stream.close();
	
		                // 파일 이름을 StringBuilder에 추가 (구분자로 "/" 사용)
		                if (fileNames.length() > 0) fileNames.append("/");
		                if (orgFileNames.length() > 0) orgFileNames.append("/");
	
		                System.out.println("orgFileNames"+orgFileNames);
		                System.out.println("fileNames"+fileNames);
		            } else {
		            }
            	}
            }else {*/
            	//파일이 없는 경우 
            	if(vo.getState().equals("0")) {
            	// 의뢰일때	
            		pfexportService.saveCoTempData(vo);
            	}else if(vo.getState().equals("1")) {
            	// 임시저장일때
            		pfexportService.updateCoTempData(vo);
            	}
            	
            	
            	
           /* }*/
            

            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail");
        }
    }
	
	//저장
	@RequestMapping(value="/export/exportCoSave.do")
	public ResponseEntity<String> saveCoData(
			@ModelAttribute SaveCoEnrollVO vo,
			@RequestParam(value = "fileName[]", required = false) List<MultipartFile> files,
			HttpServletRequest request) {
        
		
		StringBuilder fileNames = new StringBuilder();  // 저장할 파일 이름들을 담을 StringBuilder
        StringBuilder orgFileNames = new StringBuilder();  // 원본 파일 이름들을 담을 StringBuilder
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setRegId(userVO.getId());
		vo.setCorpNo(userVO.getCorpNo());
		vo.setCmpnyName(userVO.getCmpnyCd());
		
	
		
		
		String sendEmail = "";
		String zipFileName = "";
		String saveDir = "";
		
		  System.out.println("rptNo: " + vo.getRptNo());
          System.out.println("invoice: " + vo.getInvoiceNo());
          System.out.println("사용자입력 회사: " + vo.getCmpnyNm());
          System.out.println("이음내 회사: " + vo.getCmpnyName());
          System.out.println("getMangerNm: " + vo.getMangerNm());
          System.out.println("getManagerNum: " +vo.getManagerNum());
          System.out.println("getManagerEmail: " + vo.getManagerEmail());
          System.out.println("state"+vo.getState());
          
         
          System.out.println("getBillCmpnyNm: " + vo.getBillCmpnyNm());
          System.out.println("getCorpNo: " + vo.getCorpNo());
          System.out.println("getBillManagerNm: " + vo.getBillManagerNm());
          System.out.println("getBillManagerEmail: " + vo.getBillManagerEmail());
		
		
		
		try {
            // 로그로 입력 데이터 확인
            // 파일 처리 (선택적)
           if (files != null && !files.isEmpty()) {
            //파일이 있을때 
        	  // 1. 저장
            	for (MultipartFile file : files) {
                    System.out.println("Received file: " + file.getOriginalFilename());
                    String orgFileName = file.getOriginalFilename();
		            orgFileName = orgFileName.replaceAll(" ", "_");
		            String[] fileFormat = orgFileName.split("[.]");
	
		            if (fileFormat[fileFormat.length-1].toUpperCase().matches("PDF|JPG|SIZ|7Z|PPT|XLS|XLSX|PPTX|TXT|DOCX|DOC|HWP")) {
		                String fileName = UUID.randomUUID().toString();
		                String directory = "/home/files";
		                String filepath = Paths.get(directory, fileName).toString();
	
		                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
		                stream.write(file.getBytes());
		                stream.close();
	
		                // 파일 이름을 StringBuilder에 추가 (구분자로 "/" 사용)
		                if (fileNames.length() > 0) fileNames.append("/");
		                if (orgFileNames.length() > 0) orgFileNames.append("/");
	
		                fileNames.append(fileName);
		                orgFileNames.append(orgFileName);
		                System.out.println("orgFileNames"+orgFileNames);
		                System.out.println("fileNames"+fileNames);
		               
		                vo.setFileNm(fileNames.toString());
		                vo.setFileOrgNm(orgFileNames.toString());
		                
		                if(vo.getState().equals("0")) {
		                //insert
		                pfexportService.saveCoData(vo);
		                }else {
		                //update 
		                pfexportService.updateCoData(vo);	
		                }
		                
		             }
            	}
            	//2. zip 파일로 만들기
            	List<?> exportCoList = pfexportService.selectCoFilesList(vo);
            	System.out.println("exportCoList"+exportCoList);
            		
            	 saveDir = "/home/files";
            	 zipFileName = vo.getInvoiceNo() + "_" + vo.getRptNo() + ".zip";
            	
            	try {
            		FileOutputStream fos = new FileOutputStream(saveDir + File.separator + zipFileName);
            		ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(fos);
            		
            	    for (Object obj : exportCoList) {
            	        if (obj instanceof Map) {
            	            Map<?, ?> map = (Map<?, ?>) obj;

            	            String docuFiles = (String) map.get("fileNm");
            	            String docuOrgFiles = (String) map.get("fileOrgNm");

            	            // '/'로 파일 이름 분리
            	            String[] fileArray = docuFiles.split("/");
            	            String[] orgFileArray = docuOrgFiles.split("/");

            	            // 각 파일 추가
            	            for (int i = 0; i < fileArray.length; i++) {
            	                String docuFile = fileArray[i];
            	                String docuOrgFile = orgFileArray[i];
            	                addFileToZip(saveDir, docuFile, zipOut, docuOrgFile);
            	            }
            	        }
            	    }

            	    zipOut.close();
            	    fos.close();
            	} catch (Exception e) {
            	    e.printStackTrace();
            	}
            }else {
            	vo.setFileNm("");
                vo.setFileOrgNm("");
            	//파일이 없는 경우 
                if(vo.getState().equals("0")) {
	                //insert
	                pfexportService.saveCoData(vo);
	                }else {
	                //update 
	                pfexportService.updateCoData(vo);	
	                }
            }
           String invoiceRptNo = 
          vo.getRptNo() + "/" + vo.getInvoiceNo() + "/" + vo.getCmpnyNm()+"/"+vo.getCmpnyName()+"/"+vo.getMangerNm()+"/"+vo.getManagerNum()+"/"+vo.getManagerEmail();
          
           vo.setInvoiceRptNo(invoiceRptNo); 
  
        //3. 담당자 이메일  
       	String managerEmail = pfexportService.selectmanagerEmail(vo);
       	System.out.println("managerEmail: "+managerEmail);
       	//4. 화주 이메일 
       	String cmpnyEmail = vo.getManagerEmail();
       	
       	// 5. 메일 보내기 
       	System.out.println("zipFileName"+zipFileName);
       	if(!zipFileName.isEmpty()) {
       		// 파일이 있는경우 
       		//담당자 발송
       		EmailUtill.sendEmailWithFile(vo.getInvoiceRptNo(), vo.getCmpnyName(), managerEmail, "FTACO", null, "kr", zipFileName);
       		// 화주 발송 
       		EmailUtill.sendEmailWithFile(vo.getInvoiceRptNo(), vo.getCmpnyName(), cmpnyEmail, "FTACOCMPNY", null, "kr", zipFileName);
       	}else {
       		//파일이 없는 경우 
       		//담당자 발송
       		EmailUtill.sendEmailWithFile(vo.getInvoiceRptNo(), vo.getCmpnyName(), managerEmail, "FTACO", null, "kr",null);
       		//화주 발송
       		EmailUtill.sendEmailWithFile(vo.getInvoiceRptNo(), vo.getCmpnyName(), cmpnyEmail, "FTACOCMPNY", null, "kr",null);
       	}
      //6. co_info insert
      pfexportService.insertCoInfo(vo);
      		
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail");
        }
    }
	
	//첨부파일 다운로드
	@RequestMapping(value = "/export/downloadFile.do")
	public void downloadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
	    String fileNm = request.getParameter("fileNm");
	    String fileOrgNm = request.getParameter("fileOrgNm");

	    // 로그 출력
	    System.out.println("Requested fileNm: " + fileNm);
	    System.out.println("Requested fileOrgNm: " + fileOrgNm);

	    String saveDir = "/home/files";
	    File file = new File(saveDir + "/" + fileNm);

	    // 파일 존재 여부 확인
	    if (!file.exists()) {
	        System.out.println("File not found: " + file.getAbsolutePath());
	        response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
	        return;
	    }

	    // 파일 이름 인코딩
	    String encodedFileName = java.net.URLEncoder.encode(fileOrgNm, "UTF-8").replace("+", "%20");
	    response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\";");
	    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	    response.setHeader("Pragma", "no-cache");
	    response.setDateHeader("Expires", 0);

	    // 파일 전송
	    try (FileInputStream fileInputStream = new FileInputStream(file);
	         ServletOutputStream servletOutputStream = response.getOutputStream()) {

	        byte[] buffer = new byte[1024];
	        int bytesRead;
	        while ((bytesRead = fileInputStream.read(buffer)) != -1) {
	            servletOutputStream.write(buffer, 0, bytesRead);
	        }
	        servletOutputStream.flush();
	    } catch (Exception e) {
	        System.out.println("Error during file download: " + e.getMessage());
	        e.printStackTrace();
	    }
	}
	
	@RequestMapping(value="/export/selectCoList.do", method=RequestMethod.POST)
	public ModelAndView selectCoList(@RequestBody SearchVO vo, HttpServletRequest request, 
			ModelMap model) throws Exception {
		
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		vo.setCmpnyCd(userVO.getCmpnyCd());
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
		System.out.println("list"+vo.getList2());
	    List<?>	resultList = pfexportService.selectCoList(vo);
		
		model.addAttribute("resultList", resultList);
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav;
	}
	//파일업로드 
	@RequestMapping(value="/export/insertDocuFilesInfo.do",method=RequestMethod.POST)
	public ModelAndView insertDocuFilesInfo(
			@RequestParam("fileType") String fileType,
			@RequestParam("coDate") String coDate,
			@RequestParam("coName") String coName,
			@RequestParam("rptNo") String rptNo,
			@RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("files") MultipartFile[] files,
			 HttpServletRequest request, ModelMap model
			)  throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		String cmpnyCd = userVO.getCmpnyCd();
		System.out.println("fileType"+fileType);
		
			for(MultipartFile file : files) {
				System.out.println("파일"+file.getOriginalFilename());
				String name = file.getOriginalFilename();
				String fileName = UUID.randomUUID().toString();
				String directory = "/home/files";
				String filepath = Paths.get(directory, fileName).toString();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
				stream.write(file.getBytes());
				stream.close();
				
				SaveDocuFileVO vo = new SaveDocuFileVO();
				
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
				 Calendar date = Calendar.getInstance();
				 String uploadDt = sdf.format(date.getTime());

				System.out.println("name"+name);
				System.out.println("fileName"+fileName);
				System.out.println("coDate"+coDate);
				System.out.println("coName"+coName);
				System.out.println("cmpnyCd"+cmpnyCd);
				System.out.println("rptNo"+rptNo);
				System.out.println("invoiceNo"+invoiceNo);
				
				vo.setOrgFileName(name);
				vo.setFileName(fileName);
				vo.setRegDt(coDate);
				vo.setRegId(coName);
				vo.setCmpnyCd(cmpnyCd);
				vo.setRptNo(rptNo);
				vo.setInvoiceNo(invoiceNo);
				vo.setUploadDt(uploadDt);
				
			if(fileType.equals("coFile")) {	
					vo.setFileType("CO");
					vo.setDocuType("COFILE");
				}else if(fileType.equals("summitFile")) {
					vo.setFileType("CO");
					vo.setDocuType("SUMMITFILE");
				}
		pfexportService.insertCoFilesInfo(vo);
	}
		ModelAndView mav = new ModelAndView("jsonView", model);
		return mav ;
	}

@RequestMapping(value = "/export/selectFileModalUpdateList.do")
public ModelAndView selectDocuImpModalUpdateList(@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
	HttpSession httpSession = request.getSession(true);
	UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	vo.setLang(userVO.getLang());
	vo.setCmpnyCd(userVO.getCmpnyCd());
	List<?> resultList = null;
	if(vo.getSrch4().equals("coFile")) {
		resultList = pfexportService.selectCoFileModalUpdateList(vo);
	}else if(vo.getSrch4().equals("summitFile")) {
		resultList = pfexportService.selectSummitFileModalUpdateList(vo);
	}
	ModelAndView mav = new ModelAndView("jsonView");
    mav.addObject("resultList", resultList);
    return mav;
}

@RequestMapping(value = "/export/deleteCoDocuFile.do", method = RequestMethod.POST)
@ResponseBody
public void deleteCoDocuFile(@RequestBody List<ZipFileDownload> downloadFile, HttpServletRequest request, ModelMap model) throws Exception {
	HttpSession httpSession = request.getSession(true);
	UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	SearchVO vo = new SearchVO();
	  for (ZipFileDownload file : downloadFile) {
		  vo.setSrch1(file.getDocuFile());
		  vo.setSrch2(file.getDocuOrgFile());
		  vo.setSrch3(file.getUploadDt());
		  vo.setSrch4(userVO.getCmpnyCd());
		  vo.setSrch5(file.getDocuType());
		  
		  pfexportService.deleteCoDocuFile(vo);
	  }
	}

@RequestMapping(value="/export/downloadCoFileZip.do")
public void downloadFileZip(@RequestBody List<ZipFileDownload> downloadFile,
		@ModelAttribute("searchVO") SearchVO vo, HttpServletRequest request, ModelMap model,
		HttpServletResponse response) throws Exception {
		 Date now = new Date();
	     // 날짜를 yymmdd 형식으로 변환
	     SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMdd");
	     String formattedDate = dateFormat.format(now);
	
	     // zip 파일 이름 생성
	     String zipFileName = "FTA document" + "_" + formattedDate + ".zip";
		 String saveDir = "/home/files";
		
		try {
			FileOutputStream fos = new FileOutputStream(saveDir + File.separator + zipFileName);
			ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(fos);
	        // 파일 목록을 순회하며 압축 파일에 추가
	        for (ZipFileDownload file : downloadFile) {
	        	  System.out.println("file.getDocuFile()"+file.getDocuFile());
	        	  System.out.println("file.getDocuOrgFile()"+file.getDocuOrgFile());
	        	addFileToZip(saveDir, file.getDocuFile(), zipOut, file.getDocuOrgFile());
	        }
	            zipOut.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}
	}

@RequestMapping(value = "/export/downloadCoDocuFile.do")
	public void downloadDocuFile(
			HttpServletRequest request, HttpServletResponse response) throws Exception {
	String zipName = request.getParameter("zipDownloadName");
	System.out.println("zipName: " + zipName);
		String saveDir = "/home/files";
		File file = new File(saveDir + "/" + zipName + ".zip");
		response.setHeader("Content-Disposition","attachment;filename=\"" + zipName + ".zip\";");

		FileInputStream fileInputStream = new FileInputStream(file);
		ServletOutputStream servletOutputStream = response.getOutputStream();

		byte b [] = new byte[1024];
		int data = 0;

		while((data=(fileInputStream.read(b, 0, b.length))) != -1)
		{
			servletOutputStream.write(b, 0, data);
		}

		servletOutputStream.flush();
		servletOutputStream.close();
		fileInputStream.close();
	}

@RequestMapping(value = "/export/saveCoInfo.do", method = RequestMethod.POST)
@ResponseBody
public String saveCoInfo(@RequestBody List<SaveExportCoVO> voList,HttpServletRequest request)throws Exception{
	  System.out.println("Received voList: " + voList);
	    try {
	        HttpSession httpSession = request.getSession(true);
	        UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	        if (userVO == null) {
	            return "error: User not logged in";
	        }

	        pfexportService.saveCoInfo(voList, userVO);
	        return "success";
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "error: " + e.getMessage();
	    }
	}
@RequestMapping(value = "/export/downloadexportCoExcel.do", method = RequestMethod.POST)
@ResponseBody
public ModelAndView dowloadExcel(@ModelAttribute("searchVO")SearchVO vo, HttpServletRequest request,HttpServletResponse response)throws Exception{
	HttpSession httpSession = request.getSession(true);
	UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
	// 띄어쓰기 경우, 인식이 안되어 - 로 삽입 후 -> "" 공백 처리  
	vo.setLang(userVO.getLang());      
	vo.setList(userVO.getCorpNos());
	vo.setRecordCountPerPage(99999999);
	vo.setStartPage(0);
	
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
			dataMv = this.selectCoList(vo, request, new ModelMap());
			List<?> resultList = (List<?>) dataMv.getModel().get("resultList"); 
			System.out.println("exCol"+vo.getExCol());
			System.out.println("extit"+vo.getExTit());
			System.out.println("resultList111"+resultList);
			
			XSSFWorkbook workBook = new XSSFWorkbook();
			 sheet = ExcelUtil.createSheetWithTitleRow(workBook, "FTA원산지증명서현황", vo.getExCol().split("\\|\\|").length);
			ArrayList<String> conts = new ArrayList<String>();
			conts.add("1");
			System.out.println("1");
			sheet = ExcelUtil.createSummaryCont(sheet, conts);
			System.out.println("2");
			sheet = ExcelUtil.createMainTable(sheet, resultList, vo);
			System.out.println("3");
			int cnt = 0;
			String ExcelTitle = "";
			if(userVO.getCorpNos().size() > 1) {
				cnt = userVO.getCorpNos().size() - 1;
				ExcelTitle = userVO.getCmpnyCd() + " 외 " + cnt + "개";
			} else {
				ExcelTitle = userVO.getCmpnyCd();
			}
			ExcelUtil.generateExcelFile(workBook, ExcelTitle.concat(" ").concat("FTA원산지증명서현황"), response);
			/*ExcelUtil.generateExcelFile(workBook, userVO.getCmpnyCd().concat("_수입기한관리"), response);*/
	}catch(Exception e){
		e.printStackTrace();
	}
	mv.addObject("resultCode", resultCode);
	return mv;
	}

	@RequestMapping(value = "/export/selectExpTodayViewList.do", method = RequestMethod.POST)
	public ModelAndView selectExpTodayViewList(@RequestBody SearchVO vo, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession httpSession = request.getSession(true);
		UserSessionVO userVO = (UserSessionVO) httpSession.getAttribute("USER");
		if(!userVO.getCorpNo().equals("00000000000")) {
			vo.setList(userVO.getCorpNos());
		}
		
		List<?> resultList = null;
		List<?> resultList2 = null;
	    if (vo.getSrch7() != null) {
	        resultList = pfexportService.selectExpTodayInclOthViewList(vo);
	    } else {
	        resultList = pfexportService.selectExpTodayViewList(vo);
	        resultList2 = pfexportService.selectExpTodayViewList2(vo);
	    }
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("resultList", resultList);
		mav.addObject("resultList2", resultList2);
		return mav;
	}

	@RequestMapping(value = "/export/selectInvoice.do", method = RequestMethod.POST)
	@ResponseBody
	public String selectInvoice(@ModelAttribute("searchVO")SearchVO vo, HttpServletRequest request,HttpServletResponse response)throws Exception{
	
		String blno ;
		
		blno = pfexportService.selectBlno(vo);
		System.out.println("blno"+blno);
		
		
	return blno;
	}
}
