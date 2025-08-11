package egovframework.pf.docu.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.docu.service.SaveDocuFileVO;
import egovframework.pf.docu.service.pfDocumentService;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Service("pfDocumentService")
public class pfDocumentServiceImpl extends EgovAbstractMapper implements pfDocumentService {

	@Resource(name="pfDocumentMapper")
	private pfDocumentMapper pfDocumentMapper;

	@Override
	public List<?> selectDocumentViewListByRptNo(String rptNo) throws Exception {
		return pfDocumentMapper.selectDocumentViewListByRptNo(rptNo);
	}
	@Override
	public List<?> selectDocumentImpViewList(SearchVO vo) throws Exception {
		return pfDocumentMapper.selectDocumentImpViewList(vo);
	}
	@Override
	public int selectDocuViewImpTotCnt(SearchVO vo) throws Exception {
		return pfDocumentMapper.selectDocuViewImpTotCnt(vo);
	}
	@Override
	public int selectDocuViewExpTotCnt(SearchVO vo) throws Exception {
		return pfDocumentMapper.selectDocuViewExpTotCnt(vo);
	}
	@Override
	public List<?> selectDocumentExpViewList(SearchVO vo) throws Exception {
		return pfDocumentMapper.selectDocumentExpViewList(vo);
	}
	@Override
	public int selectMthTaxBillCnt(String rptNo) throws Exception {
		return pfDocumentMapper.selectMthTaxBillCnt(rptNo);
	}
	@Override
	public void insertImpDocuFilesInfo(SaveDocuFileVO vo) throws Exception {
		pfDocumentMapper.insertImpDocuFilesInfo(vo);
	}
	@Override
	public List<?> selectDownloadFileList(Object paramMap) throws Exception {
		return pfDocumentMapper.selectDownloadFileList(paramMap);
	}
	@Override
	public void insertExpDocuFilesInfo(SaveDocuFileVO vo) throws Exception {
		pfDocumentMapper.insertExpDocuFilesInfo(vo);
	}
	@Override
	public List<?> selectDocuImpModalUpdateList(SearchVO vo) throws Exception {
		return pfDocumentMapper.selectDocuImpModalUpdateList(vo);
	}
	@Override
	public List<?> selectDocuExpModalUpdateList(SearchVO vo) throws Exception {
		return pfDocumentMapper.selectDocuExpModalUpdateList(vo);
	}
	@Override
	public void deleteDocuFile(SearchVO vo) throws Exception {
		pfDocumentMapper.deleteDocuFile(vo);
	}
	@Override
	public Map<String, Object> selectMthTaxBill(String rptNo) throws Exception {
		return pfDocumentMapper.selectMthTaxBill(rptNo);
	}
	@Override
	public List<Map<String, Object>> selectMthTaxBillSub(String rptNo) throws Exception {
		return pfDocumentMapper.selectMthTaxBillSub(rptNo);
	}
	@Override
	public int selectIndivTaxBillCnt(String rptNo) throws Exception {
		return pfDocumentMapper.selectIndivTaxBillCnt(rptNo);
	}
	@Override
	public List<?> selectVatType(String rptNo) throws Exception {
		return pfDocumentMapper.selectVatType(rptNo);
	}
}
