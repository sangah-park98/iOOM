package egovframework.pf.member.service.impl;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Service;

import com.itextpdf.text.log.SysoCounter;

import egovframework.pf.cmmn.service.SearchVO;
import egovframework.pf.member.sevice.MemberService;
import egovframework.pf.member.sevice.SaveCompnyVO;
import egovframework.pf.member.sevice.SaveMemberVO;
import egovframework.pf.member.utill.EmailUtill;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : MemberService.java
 * @Description : MemberService Class
 * @Modification Information
 * @
 * @         수정일            		       수정자           			수정내용
 * @    ----------------    ------------    ---------------------------
 * @       2024.01.17          	권예지         			최초 생성
 *
 * @author 권예지
 * @since 2024.01.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by KordSystems All right reserved.
 */
@Service("memberService")
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService  {
	
	@Resource(name="memberMapper")
	private MemberMapper memberMapper;
	
	// 중복아이디 체크

	@Override
	public int idcheck(String usrId) throws Exception {
		return memberMapper.selectIdCheck(usrId);
	}
	//난수 
		public int randomNum() {
			Random random = new Random();
			int certNumber = random.nextInt(900000)+100000;
			return certNumber;
		}
	// 인증메일 insert
	@Override
	public String insertCertNumber(Map<String, Object> param) throws Exception {
		
		memberMapper.updateCertNumberTimeOut(param);
		
		int result = 0;
		while(result == 0) {
			param.put("cert_num", randomNum());
			result = memberMapper.insertCertNumber(param);
		}
		
		System.out.println("email>"+param.get("email").toString());
		System.out.println("cert_num>"+param.get("cert_num").toString());
		System.out.println("lang>"+param.get("lang").toString());
		
		
		
		return EmailUtill.sendEmail(null,
				null,
				param.get("email").toString(),
				"CERTNUMBER",
				param.get("cert_num").toString(),
				param.get("lang").toString());
	}
	
	// 마이페이지 인증번호 발송 
	@Override
	public String insertCertNumberMyPage(Map<String, Object> param) throws Exception {
		memberMapper.updateCertNumberTimeOut(param);
		
		int result = 0;
		while(result == 0) {
			param.put("cert_num", randomNum());
			result = memberMapper.insertCertNumber(param);
		}
		
		System.out.println("email>"+param.get("email").toString());
		System.out.println("cert_num>"+param.get("cert_num").toString());
		System.out.println("lang>"+param.get("lang").toString());
		
		
		
		return EmailUtill.sendEmail(null,
				null,
				param.get("email").toString(),
				"CERTNUMBERMYPAGE",
				param.get("cert_num").toString(),
				param.get("lang").toString());
	}
	
	
	// 인증메일 문자
	@Override
	public Map<String, Object> getMailCode(Map<String, Object> param) {
		System.out.println("param"+param);
		return memberMapper.selectMailCode(param);
	}
	// 인증메일 시간초과
	@Override
	public int updateCertTimeout(String email) throws Exception {
		return memberMapper.updateMailTimeout(email);
	}
	
	@Override
	public int certNumberConfirm(Map<String, Object> param) {
		return memberMapper.selectcertNumber(param);
	}
	@Override
	public int updateCertNumber(Map<String, Object> param) {
		return memberMapper.updateCertNumber(param);
	}
	@Override
	public int companyCheck(Map<String, Object> param) {
		return memberMapper.selectCompnyCheck(param);
	}
	
	
	
	@Override
	public int memberJoin(SaveMemberVO member, SaveCompnyVO compny, List<String> compNames, List<String> compRegNos)
	throws Exception {

			// 회원 등록
			int result = memberMapper.insertMember(member);
			if(result == 0) {
				return result;
			}
			 
			// 회사 등록	
			for (int i = 0; i < compNames.size(); i++) {
				String compName = "";
				String compRegNo = "";	
				compName = compNames.get(i);
		        compRegNo = compRegNos.get(i);
		        	
		       if(compName == null || compRegNo == null) {
		    	   continue;
		       }
		        System.out.println("사업자명: " + compName + ", 등록번호: " + compRegNo);
		        
		        Map<String, Object> params = new HashMap<>();
		        params.put("USER_ID", member.getMEMBER_ID());
		        params.put("TAX_NO", compRegNo);
		        params.put("CMPNY_NM", compName);
		        params.put("CMPNY_MANER", "");
		        params.put("DEL_YN", "N");
		        params.put("REG_ID", member.getMEMBER_ID());
		        
		        
		        result = memberMapper.insertUserCompny(params);
		        
		        /*int compnyselect = memberMapper.selectCompny(params);
		        System.out.println("compnyselect"+compnyselect);
		        if(compnyselect == 0) {
	        	System.out.println("회사를 등록해야되는 경우");
	        	 result = memberMapper.insertUserCompny(params);
		         int compnyInsert = memberMapper.insertCompny(params);
		        }else {
	        	System.out.println("이미 회사가 등록된 경우");
		        	result = memberMapper.insertUserCompny(params);
		        }*/
		        
				if(result == 0) {
					return result;
				}
				
		    }
			System.out.println("result");
			return result;
	}
/*	@Override
	public int compnyManager(SaveCompnyVO compny) {
		
		 int count = memberMapper.selectCompnyManager(compny);
		 
		 if(count == 0) {
			 return 0;
		 } else {
			 return 1;
		 }
	}*/
	
	@Override
	public List compnyManagerEmail(SaveMemberVO member, SaveCompnyVO compny, List<String> compNames,
			List<String> compRegNos) {
			
		List<String> managerEmails = new ArrayList<>();
		
		for (int i = 0; i < compNames.size(); i++) {
			String compName = compNames.get(i);
			String compRegNo = compRegNos.get(i);

	        System.out.println("매니저사업자명: " + compName + ", 등록번호: " + compRegNo);
	        
	        Map<String, Object> params = new HashMap<>();
	        params.put("USER_ID", member.getMEMBER_ID());
	        params.put("TAX_NO", compRegNo);
	        params.put("CMPNY_NM", compName);
	        
	        
	        String managerEmail  = memberMapper.selectManagerEmail(params);
	        System.out.println("managerEmail"+managerEmail);
	        
	        if (managerEmail != null && !managerEmail.isEmpty()) {
	            managerEmails.add(managerEmail);
	        }
		}
		return managerEmails;
	}
	//기존회원 체크
	public int memberCheck(Map<String, Object> param) {
		System.out.println("param"+param);
		return memberMapper.selectMemberCheck(param);
	}
	
	public String idSendEmail(Map<String,Object>param)throws Exception {
		try {
			List<Map<String,Object>> userMap = memberMapper.selectMemberSearch(param);
			Map<String,Object> userMap2 = memberMapper.selectMemberSearch(param).get(0);
					System.out.println("MEMBER_NAME"+(String)userMap2.get("USR_NM"));									
					System.out.println("MEMBER_ID"+(String)userMap2.get("USR_ID"));									
			if(!userMap.isEmpty()) {
				return EmailUtill.sendEmail((String)userMap2.get("USR_NM"), (String)userMap2.get("USR_ID"), 
						(String)userMap2.get("USR_EMAIL"), "SEARCHID", null, "kr");
			}else {
				return "false";
			}
		}catch(Exception e) {
			e.printStackTrace();
			System.out.println("아이디 메일로 전송 에러메세지: "+e.toString());
				return "false";
		}
		
	}
	@Override
	public String pwSendEmail(Map<String, Object> param) throws Exception {
		try {
			Map<String,Object> userMap = memberMapper.selectMemberSearch(param).get(0);
			String newPwd = insertRandomPwd(RandomStringUtils.random(12, true, true));
			userMap.put("USR_PW", newPwd);
			System.out.println("userMap"+userMap);
			int result = memberMapper.updateNewPassword(userMap);
		
			if(result > 0) {
				return EmailUtill.sendEmail((String)userMap.get("USR_NM"), (String)userMap.get("USR_ID"), 
						   (String)userMap.get("USR_EMAIL"), "SEARCHPWD", (String)userMap.get("USR_PW").toString(), "kr");
			}else {
				return "false";
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println("새 비밀번호 업데이트 에러메시지 : "+e.toString());
			return "false";
		}
	}
	
	/* 특수기호 포함 새 비밀번호 생성 로직 */
	public String insertRandomPwd(String originWord) throws Exception {
		Random random = new Random();
		String specialChars = "!@#$%^&*";
        int randomIndex = random.nextInt(originWord.length() + 1);
        char randomChar = specialChars.charAt(random.nextInt(specialChars.length()));
        
        StringBuilder newWord = new StringBuilder(originWord);
        newWord.insert(randomIndex, randomChar);
        return newWord.toString();
	}
	@Override
	public List<?> selectMyPageUserInfo(SaveMemberVO vo) throws Exception {
		return memberMapper.selectMyPageUserInfo(vo);
	}
	@Override
	public List<?> selectMyPageCmpnyInfo(SaveCompnyVO vo) throws Exception {
		return memberMapper.selectMyPageCmpnyInfo(vo);
	}
	@Override
	public int passCheck(Map<String, Object> param) throws Exception {
		return memberMapper.selectPassCheck(param);
	}
	@Override
	public int myPageUpdate(SaveMemberVO member, SaveCompnyVO compny, List<String> compNames, List<String> compRegNos)
			throws Exception {
			
			// 회원 업데이트
			memberMapper.updateMember(member);
			System.out.println("회원 업데이트");
			
			
			List<String> taxNum = memberMapper.selectMyPageCmpnyTaxNo(compny);
			System.out.println("compNames"+compNames);
			System.out.println("taxNum"+taxNum);
			// 회사 insert
			/*for (int i = 0; i < compNames.size(); i++) {
				String compName = "";
				String compRegNo = "";	
				compName = compNames.get(i);
		        compRegNo = compRegNos.get(i);
		        
		        if (compName == null || compRegNo == null) {
		            continue;
		        }
		        System.out.println("111");
		        
		        if(taxNum.contains(compRegNo)) {
		        	System.out.println("존재하는 사업자번호 :"+compRegNo);
	        	    System.out.println("22");
		        }else {
	        		//회사 delete
		        	for (String taxNumber : taxNum) {
		        	    System.out.println("회사 delete");
		        	    compny.setManerEmail(taxNumber);
		        	    System.out.println("memberid: " + compny.getMEMBER_ID());
		        	    System.out.println("taxNumber: " + compny.getManerEmail());
		        	   // memberMapper.deleteCmpnyUserInfo(compny);
		        	}
		        	
		        	System.out.println("사업자명: " + compName + ", 등록번호: " + compRegNo);
			        
			        Map<String, Object> params = new HashMap<>();
			        params.put("USER_ID", compny.getMEMBER_ID());
			        params.put("TAX_NO", compRegNo);
			        params.put("CMPNY_NM", compName);
			        params.put("DEL_YN", "N");
			        params.put("REG_ID", member.getMEMBER_ID());
			        System.out.println("회사 insert");
			       // int	result = memberMapper.insertUserCompny(params);
			        // 매니저 이메일 가져오기 
			        String email = memberMapper.selectMyPageCmpnyManger(compRegNo);
			        if(email.isEmpty() || email == null) {
			        	EmailUtill.sendEmail(member.getMEMBER_NAME(),
							   member.getMEMBER_ID(),
							   "ioom@kordsystems.com",
							   "JOIN2",
							   null,
							   "kr");
			        }else{
			        	EmailUtill.sendEmail(member.getMEMBER_NAME(),
								   member.getMEMBER_ID(),
								   email,
								   "JOIN2",
								   null,
								   "kr");
			        }
		        }
			}*/
		
			  for (int i = 0; i < compNames.size(); i++) {
			        String compName = compNames.get(i);
			        String compRegNo = compRegNos.get(i);

			        if (compName == null || compRegNo == null) {
			            continue;
			        }

			        if (!taxNum.contains(compRegNo)) {
			            // compRegNo가 taxNum에 존재하지 않으면 삽입
			            System.out.println("사업자명: " + compName + ", 등록번호: " + compRegNo);

			            Map<String, Object> params = new HashMap<>();
			            params.put("USER_ID", compny.getMEMBER_ID());
			            params.put("TAX_NO", compRegNo);
			            params.put("CMPNY_NM", compName);
			            params.put("DEL_YN", "N");
			            params.put("REG_ID", member.getMEMBER_ID());
			            System.out.println("회사 insert");
			            int result = memberMapper.insertUserCompny(params);

			            // 매니저 이메일 가져오기
			            String email = memberMapper.selectMyPageCmpnyManger(compRegNo);
			            if (email == null || email.isEmpty()) {
			                EmailUtill.sendEmail(member.getMEMBER_NAME(),
			                                     member.getMEMBER_ID(),
			                                     "ioom@kordsystems.com",
			                                     "JOIN2",
			                                     null,
			                                     "kr");
			            } else {
			                EmailUtill.sendEmail(member.getMEMBER_NAME(),
			                                     member.getMEMBER_ID(),
			                                     email,
			                                     "JOIN2",
			                                     null,
			                                     "kr");
			            }
			        } else {
			            System.out.println("존재하는 사업자번호: " + compRegNo);
			        }
			    }

			    // 삭제할 항목 찾기 및 삭제
			    for (String taxNumber : taxNum) {
			        if (!compRegNos.contains(taxNumber)) {
			            // taxNumber가 compRegNos에 존재하지 않으면 삭제
			            System.out.println("회사 delete");
			            compny.setManerEmail(taxNumber);
			            System.out.println("memberid: " + compny.getMEMBER_ID());
			            System.out.println("taxNumber: " + compny.getManerEmail());
			            memberMapper.deleteCmpnyUserInfo(compny);
			        }
			    }
			
		return 0;
	}
	@Override
	public int comRegNoConfirm(String compRegNo) throws Exception {
		// TODO Auto-generated method stub
		return memberMapper.comRegNoConfirm(compRegNo);
	}
	@Override
	public List<?> selectCmpnyInfo(String compRegNo) throws Exception {
		// TODO Auto-generated method stub
		return memberMapper.selectCmpnyInfo(compRegNo);
	}
	//매니저 승인 후 DB에 N>Y 로 변경 
	@Override
	public String managerApprove(String id, String email) throws Exception {
	    System.out.println("id"+id);
	    System.out.println("email"+email);
	    SearchVO vo = new SearchVO();
	    vo.setSrch1(id);
	    vo.setSrch2(email);
		List<String> taxNoList = memberMapper.selectCmpnyTaxNo(vo);

	    for (String taxNo : taxNoList) {
	    	Map<String, String> paramMap = new HashMap<>(); 
	    	 paramMap.put("id", id);
	         paramMap.put("email", email);
	         paramMap.put("taxNo", taxNo);
	    	memberMapper.updateManagerApprove(paramMap);
	    }
	    
	    return "Success";
	}
	
	@Override
	public void insertMangerEmail(SaveMemberVO member, SaveCompnyVO compny, List<String> compNames,
			List<String> compRegNos) {
	
		for(int i = 0; i < compRegNos.size(); i++) {
	        String compRegNo = compRegNos.get(i);
	    	String memberEmail = member.getMEMBER_EMAIL();
	    	 SearchVO vo = new SearchVO();
	    	 vo.setSrch1(compRegNo);
	    	 vo.setSrch2(memberEmail);
	    	System.out.println("memberEmail"+memberEmail);
	        System.out.println("compRegNo"+compRegNo);
	        List<String> compnyList = memberMapper.selectCmpnyManger(compRegNo);
	        System.out.println("compnyList"+compnyList);
	        for(String manager : compnyList) {
	        	if(manager.isEmpty()) {
		        	//회사 매니저 insert
		        	memberMapper.insertMangerEmail(vo);
		        }else {
		        	continue;
		        	
		        }
	        }
	        
	    }
	
	}
	
}
