package egovframework.pf.news.service;

import java.util.List;

import egovframework.pf.cmmn.service.SearchVO;

public interface pfNewsService {

	List<?> selectNewsViewList(SearchVO vo) throws Exception;

	int selectNewsViewtotCnt(SearchVO vo) throws Exception;

	List<?> selectNewsModalViewList(SearchVO vo) throws Exception;
	
	void deleteNewsViewList(SearchVO vo) throws Exception;

	void updateNewsActive(SearchVO vo) throws Exception;

	List<?> selectNewsActiveStatus(SearchVO vo) throws Exception;

	List<?> selectNewsViewAllList(SearchVO vo) throws Exception;
}